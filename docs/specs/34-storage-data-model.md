# Spec 34 — Speicher- & Datei-Datenmodell (physische Ablage)

**Status:** APPROVED · **Bau:** MVP · **Bezug:** D-006, D-012, D-014, D-023, D-071, D-077, D-084…D-087, D-092, D-093, D-094
**Source of Truth für:** physisches Datei-/Objektmodell (`stored_objects`, Derivate), Storage-Pfad-Schema, Versionierung der Dateiebene, Quota-Zähler-Mechanik
**Verfeinert:** das frühere `photo_files`-Konzept aus [[05-media-pipeline]]/[[10-data-model]] → vereinheitlicht in `stored_objects`.

## 1 Plain-Language-Zusammenfassung

Jede hochgeladene Datei (Foto, Video, Plan, Dokument, Audio) ist physisch **ein unveränderliches Objekt in S3** und
**eine Zeile in `stored_objects`** — mit Größe, Typ, Checksumme, Scan-Status und Verarbeitungsstatus. Fachliche
Einheiten (`photos`, `plan_versions`, `documents`, …) verweisen auf dieses Objekt. Abgeleitete Dateien (Thumbnails,
Video-Poster, transkodiertes Video, EXIF-bereinigte Auslieferkopie) liegen in `derivatives`. Speicherverbrauch wird je
Organisation/Projekt als Zähler geführt. Trennung von **logisch** (Fachzeile) und **physisch** (Objekt) macht Scan,
Derivate, Versionierung, Quota und Löschung an je einer Stelle korrekt.

## 2 Kernidee: zentrale Datei-Abstraktion (D-092)

- **`stored_objects`** = genau eine physische Originaldatei. Trägt alle Storage-Querschnittsdaten.
- **`derivatives`** = aus einem `stored_object` erzeugte Dateien (n Stück).
- **Fachtabellen referenzieren `stored_objects`** statt eigene Dateifelder zu führen.

## 3 Tabellen (PostgreSQL-DDL, gekürzt auf das Wesentliche)

```sql
-- Physische Datei (Bytes in S3). Eine Zeile je Original-Upload.
CREATE TYPE scan_status     AS ENUM ('pending','clean','infected','error');
CREATE TYPE processing_state AS ENUM ('pending','processing','ready','failed');
CREATE TYPE object_kind     AS ENUM ('photo','video','plan','document','audio');

CREATE TABLE stored_objects (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(), -- nicht erratbar (Storage-Key)
  organization_id  bigint NOT NULL REFERENCES organizations(id),
  project_id       bigint NOT NULL REFERENCES projects(id),
  kind             object_kind NOT NULL,
  storage_key      text NOT NULL UNIQUE,          -- S3-Objektschlüssel (Haupt-Bucket)
  original_filename text NOT NULL,
  mime_type        text NOT NULL,
  byte_size        bigint NOT NULL CHECK (byte_size >= 0),
  checksum_sha256  char(64) NOT NULL,             -- Integrität + Dedupe-Erkennung
  width            int, height int,               -- Bild/Video
  duration_seconds int,                           -- Video/Audio
  exif             jsonb,                          -- extrahiert; aus Auslieferung gestrippt (D-014)
  scan_status      scan_status NOT NULL DEFAULT 'pending',
  processing_status processing_state NOT NULL DEFAULT 'pending',
  counts_to_quota  boolean NOT NULL DEFAULT true,
  uploaded_by      bigint NOT NULL REFERENCES users(id),
  created_at       timestamptz NOT NULL DEFAULT now(),
  deleted_at       timestamptz,                    -- Soft-Delete
  purged_at        timestamptz                     -- Hard-Delete (Bytes entfernt)
);

-- Abgeleitete Dateien (Thumbnails, Poster, transkodiert, EXIF-bereinigte Auslieferkopie).
CREATE TYPE derivative_variant AS ENUM
  ('thumb_sm','thumb_md','thumb_lg','poster','transcoded','web_stripped');

CREATE TABLE derivatives (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id  bigint NOT NULL REFERENCES organizations(id),
  stored_object_id uuid NOT NULL REFERENCES stored_objects(id) ON DELETE CASCADE,
  variant          derivative_variant NOT NULL,
  storage_key      text NOT NULL UNIQUE,
  mime_type        text NOT NULL,
  byte_size        bigint NOT NULL CHECK (byte_size >= 0),
  width int, height int,
  created_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (stored_object_id, variant)              -- je Variante max. eine Datei
);

-- Fachliche Foto-Einheit (verweist auf das Original-Objekt).
CREATE TABLE photos (
  id               bigserial PRIMARY KEY,
  organization_id  bigint NOT NULL REFERENCES organizations(id),
  project_id       bigint NOT NULL REFERENCES projects(id),
  stored_object_id uuid NOT NULL REFERENCES stored_objects(id),
  bezeichnung      text,                           -- D-078 Kurztitel
  beschreibung     text,                           -- D-078 Freitext
  weather          jsonb,                          -- D-077 unveränderlicher Snapshot
  status           text NOT NULL DEFAULT 'neu',     -- Workflow [[25-status-approval-workflow]]
  captured_at      timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now(),
  deleted_at       timestamptz
);

-- Planversion: unveränderlich, eigenes Objekt je Version.
CREATE TABLE plan_versions (
  id               bigserial PRIMARY KEY,
  organization_id  bigint NOT NULL REFERENCES organizations(id),
  plan_id          bigint NOT NULL REFERENCES plans(id),
  stored_object_id uuid NOT NULL REFERENCES stored_objects(id),
  version_no       int NOT NULL,
  calibration      jsonb,                          -- D-013/D-081 (Referenzpunkte, affine Transform, Nordrotation)
  created_by       bigint NOT NULL REFERENCES users(id),
  created_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (plan_id, version_no)
);

-- Dokumentversion (optionale einfache Versionierung).
CREATE TABLE document_versions (
  id               bigserial PRIMARY KEY,
  organization_id  bigint NOT NULL REFERENCES organizations(id),
  document_id      bigint NOT NULL REFERENCES documents(id),
  stored_object_id uuid NOT NULL REFERENCES stored_objects(id),
  version_no       int NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (document_id, version_no)
);

-- Speicher-Zähler (D-084/D-087).
CREATE TABLE organization_storage (
  organization_id    bigint PRIMARY KEY REFERENCES organizations(id),
  quota_bytes        bigint NOT NULL,              -- konfigurierbar; Billing setzt später (D-086)
  used_bytes         bigint NOT NULL DEFAULT 0 CHECK (used_bytes >= 0)
);
CREATE TABLE project_storage (
  project_id  bigint PRIMARY KEY REFERENCES projects(id),
  used_bytes  bigint NOT NULL DEFAULT 0 CHECK (used_bytes >= 0)
);
```

## 4 Relationen & Kardinalität

- `organizations` 1—n `stored_objects` (Mandant).
- `stored_objects` 1—n `derivatives` (Original → abgeleitete Dateien).
- `photos` n—1 `stored_objects` (jedes Foto ein Original; Korrektur = neues Foto).
- `plans` 1—n `plan_versions` n—1 `stored_objects` (jede Version eigenes, unveränderliches Objekt).
- `documents` 1—n `document_versions` n—1 `stored_objects`.
- `photo_audio_comments` n—1 `stored_objects` (Audio).

## 5 Keys & Constraints

- PK: `stored_objects.id`/`derivatives.id` = uuid (nicht erratbar, taugt als Storage-Key-Bestandteil).
- FK überall mit `organization_id` + fachlichem Parent; `derivatives` CASCADE bei Objekt-Purge.
- UNIQUE: `storage_key`, `(stored_object_id, variant)`, `(plan_id, version_no)`, `(document_id, version_no)`.
- CHECK: Größen ≥ 0; (optional) `checksum_sha256` Länge 64.
- NOT NULL: `organization_id`, `project_id`, `byte_size`, `mime_type`, `checksum_sha256`.

## 6 Indizes (an erwartete Queries gebunden)

- `stored_objects (organization_id)`, `(project_id)`, `(scan_status)` (Scan-Worker-Queue),
  `(processing_status)` (Verarbeitungs-Queue), `(checksum_sha256)` (Dedupe), partial `(deleted_at) WHERE deleted_at IS NULL`.
- `derivatives (stored_object_id)`.
- `photos (project_id, captured_at)` (chronologische Galerie [[27-gallery-filter-search]]), `(organization_id)`, `(status)`.
- `plan_versions (plan_id, version_no)`, `document_versions (document_id, version_no)`.

## 7 Storage-Pfad-Schema & Quarantäne (D-094)

- **Haupt-Bucket-Key:** `org/{org_id}/project/{project_id}/{kind}/{yyyy}/{mm}/{object_id}/original.{ext}`
- **Derivate:** `.../{object_id}/{variant}.{ext}` (gleiches Präfix, leicht aufräumbar bei Purge).
- **Quarantäne (D-094):** Upload landet zunächst im **separaten Quarantäne-Bucket**
  `quarantine/org/{org_id}/{object_id}`. Erst nach `scan_status='clean'` wird das Objekt in den Haupt-Bucket
  verschoben/kopiert und verarbeitet. → Infizierte Bytes liegen nie im ausgelieferten Bucket.

## 8 RLS & Zugriff (Sicherheit)

- **RLS auf allen** Tabellen oben: `organization_id = current_setting('app.current_org_id')::bigint`
  ([[01-tenant-isolation-rls]]). App-DB-Rolle ohne `BYPASSRLS`.
- **Keine öffentlichen URLs.** Eine signierte URL wird nur ausgestellt, wenn (1) RBAC erlaubt (`photo.view`/`download`,
  [[02-rbac-permissions]]) **und** (2) `scan_status='clean'`. Auch Derivate (Thumbnails) nur signiert.
- **EXIF** in `stored_objects.exif` (DB), aus Auslieferkopie (`web_stripped`) + Thumbnails entfernt (D-014).
- Jede URL-Ausstellung + Download wird auditiert ([[03-audit-logging]]).
- **Rolle pro Datentyp:** Betrachter → nur signierte View-URL; download-berechtigte Rollen → Download-URL;
  Schreiben/Löschen nur mit entsprechender Permission; Org-Grenze immer durch RLS.

### 8a Sicherheits-Kontrollen (aus Security-Review, verbindlich)

- **F1/F5 Aktive Inhalte:** Auslieferung von einer **separaten Sandbox-Domain**; Dokumente/Pläne als `attachment`;
  `Content-Type` serverseitig aus Magic Bytes + `X-Content-Type-Options: nosniff`; SVG verboten/sanitisiert; strikte CSP (D-095).
- **F2 Signed-URL-Autorisierung:** nur nach frischer RLS+RBAC-Prüfung über die geprüfte Query ausstellen, **nie per
  Roh-ID**; vollständige signierte URLs nicht loggen (D-096).
- **F3 Nur bereinigte Variante:** View **und** Download liefern ausschließlich `web_stripped`; Roh-Original nie signierbar (D-097).
- **F4 Scan-Gate-Invariante:** keine Derivate/Embeddings/Wetter, kein Move in den Haupt-Bucket, keine Signed-URL,
  solange `scan_status ≠ clean` (D-098).
- **F6 Fremdreferenz-Validierung:** referenzierte `stored_object_id`/`plan_version_id` müssen zur selben
  `organization_id`/`project_id` gehören (Composite-FK oder Transaktions-Validierung) (D-099).
- **F7 Soft-Delete-Filter:** Serving/Listing erzwingen `deleted_at IS NULL` (D-100).

## 9 Quota-Zähler-Mechanik (D-093)

- **DB-Trigger** auf `stored_objects` und `derivatives`: `+byte_size` bei INSERT, `−byte_size` bei Hard-Delete/Purge.
  **Soft-Delete senkt nicht** (Bytes liegen noch, D-087). Trigger statt App-Logik, weil er atomar mit der Mutation
  läuft und nicht umgangen werden kann (begründete Ausnahme zur „keine Trigger"-Regel).
- **Upload-Gate:** vor Annahme prüft die App `used_bytes + erwartete Größe ≤ quota_bytes` ([[32-storage-accounting-quotas]]).
- **Reconcile-Job:** periodisch Zähler gegen reale S3-Belegung abgleichen (Drift-Korrektur).

## 10 Beispiel-Flows

1. **Foto-Upload:** Datei → Quarantäne-Bucket + `stored_objects(pending)` → Scan → clean → in Haupt-Bucket; EXIF
   extrahieren, Derivate + Embeddings erzeugen, Wetter abrufen, Quota++ (Trigger); `photos`-Zeile angelegt; Audit.
2. **Foto ansehen:** RBAC-Check → `scan_status=clean` → signierte URL für `thumb_*`/Original → Audit.
3. **Neue Planversion:** neues `stored_object` + `plan_versions(version_no+1)`; alte Version + Objekt bleiben; Benachrichtigung.
4. **Löschen:** `deleted_at` setzen (Quota unverändert) → Purge-Job nach Retention → S3-Objekt+Derivate löschen, `purged_at`, Quota−− (Trigger); Audit-Eintrag bleibt.

## 11 Risiken & Annahmen

- **Annahme:** `organization_id`/`project_id` sind `bigint`; `stored_objects.id` ist `uuid` (Enumeration-Schutz im Key).
- **Vereinheitlichung `stored_objects`** ersetzt verstreute `*_files`-Tabellen — Refinement zu [[05-media-pipeline]]/[[10-data-model]] (dort als `photo_files` skizziert).
- **Quarantäne-Move** kostet eine zusätzliche Kopie; Alternative (gleicher Bucket + Zugriffs-Gate) wäre einfacher, aber unsicherer → bewusst Move gewählt.
- **Trigger-basierte Quota** weicht von der „keine Trigger"-Default-Regel ab; begründet durch Atomarität/Nicht-Umgehbarkeit.
- **Dedupe** via `checksum_sha256` ist vorbereitet (Index), aber im MVP optional.

## 12 Test-Plan

- **Constraints:** negativer `byte_size`, fehlende `organization_id`, doppelter `storage_key` → müssen scheitern.
- **RLS (kritisch):** Org A kann `stored_objects`/`derivatives`/`photos` von Org B nicht lesen, auch per Raw-Query.
- **Signed-URL-Gate:** Objekt mit `scan_status≠clean` liefert **keine** URL; unberechtigte Rolle bekommt 403.
- **Quota:** Upload erhöht `used_bytes` (inkl. Derivate); Soft-Delete ändert nichts; Purge senkt; Reconcile gleicht Drift aus.
- **Versionierung:** zweite Planversion lässt Version 1 + deren Objekt unverändert; `(plan_id, version_no)` eindeutig.
- **Purge:** nach Retention sind S3-Objekt + Derivate weg, Audit-Eintrag bleibt.
- **F1/F5 Aktiver Inhalt:** SVG/HTML-Upload wird als `attachment` von der Sandbox-Domain mit korrektem Content-Type + `nosniff` ausgeliefert, **nie inline** auf der App-Origin.
- **F2 IDOR:** Anfrage einer fremden (bekannten) `object_id` liefert **keine** Signed-URL (403), auch mit gültiger Session einer anderen Org.
- **F3 PII:** Download liefert die EXIF-bereinigte Variante (kein GPS im File); das Roh-Original ist über keine Route signierbar.
- **F4 Scan-Gate:** Objekt mit `scan_status` pending/infected liefert keine URL und erzeugt keine Derivate/Embeddings.
- **F6/F7:** Insert mit fremder `stored_object_id` scheitert; ein soft-gelöschtes Objekt ist nicht abrufbar.

## Offene Punkte

- Endgültige ID-Typen (bigint vs. uuid) projektweit bestätigen.
- Dedupe aktiv schalten (ja/nein) + Verhalten bei geteilten Objekten.
- Purge-Retention-Frist (mit [[21-hosting-compliance-legal]] abstimmen).

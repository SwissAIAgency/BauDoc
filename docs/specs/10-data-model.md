# Spec 10 — Datenmodell-Strategie & Konsolidierung

**Status:** APPROVED · **Bau:** MVP · **Bezug:** D-004, D-017
**Source of Truth für:** Datenbank-Strategie, konsolidiertes Modell-Delta

## Zweck

Ein PostgreSQL als alleiniger Datenkern (relational + dokumentartig + vektoriell); konsolidiertes Modell.
Basis = `docs/08_datenmodell.md`; hier die Strategie + Deltas der Komponenten.

## Festlegungen (Strategie)

- Strikte, typisierte Spalten für Kernfelder (Filter, Joins, Integrität, RLS).
- **JSONB** für flexible/halbstrukturierte Metadaten (rohes EXIF, KI-Tags) — indexierbar.
- **pgvector** für Embeddings (semantische Suche) — **aktiv ab MVP** (D-071), nicht erst post-MVP.
- Suche: Postgres **FTS** (Dateiname/Kommentare/Tags) **plus** semantische Suche (Text- + Bild-Embeddings) bereits im MVP (D-071).
- **Keine** separate NoSQL-/Vektor-Nebeninfrastruktur.

## Konsolidiertes Modell-Delta (Hoheit jeweils in der Komponenten-Spec)

- **Tenancy:** `organization_id NOT NULL` + RLS in allen Fachtabellen → [[01-tenant-isolation-rls]].
- **RBAC:** spatie `roles`/`permissions`/`model_has_roles` (`team_id = project_id`) → [[02-rbac-permissions]].
- **Pläne:** `plan_versions.calibration` (JSONB) → [[06-plan-management-viewer]].
- **Medien/Dateien:** zentrale `stored_objects` + `derivatives` (physisches Datei-Modell, EXIF/Storage-Key/Scan-/Verarbeitungsstatus) → [[34-storage-data-model]]; ersetzt das frühere `photo_files` aus `docs/08_datenmodell.md` (D-092).
- **Foto-Felder:** `photos.bezeichnung`, `photos.beschreibung`, `photos.weather` (JSONB, unveränderlich) → [[30-photo-metadata-fields]] (D-077/D-078).
- **Begriff:** „Gattung" = „Gewerk" (eine Dimension, kanonisch „Gewerk", D-079); „Plangattung" bleibt davon getrennt ein Plan-Attribut.
- **Speicher:** `organizations.storage_quota_bytes` / `storage_used_bytes`, `project_storage_usage` → [[32-storage-accounting-quotas]] (D-084/D-087).
- **Planpositionen:** `photo_locations` + `source`/`confidence`/`gps_accuracy`/`auto_suggested_at` → [[07-auto-plan-assignment]].
- **Dokumente:** `documents` → [[08-documents]].
- **Audit:** `audit_logs` append-only + Hash-Chain → [[03-audit-logging]].
- **KI:** `photo_ai_descriptions`, `photo_tags`, Embedding-Spalten (pgvector) → [[11-ai-integration]].
- **Agenten:** Identitätsklasse „Agent" → [[12-agent-mcp-readiness]].
- **Erfassung:** `rooms.qr_token`, Mangel-Felder auf `photos`, `photo_audio_comments` → [[18-capture-features]].
- **Soft-Delete:** `deleted_at` auf fachlichen Tabellen (außer append-only Audit) → [[21-hosting-compliance-legal]].

## Index-Kandidaten

Siehe `docs/08_datenmodell.md`; zusätzlich `organization_id` in allen Fachtabellen (RLS).

## Akzeptanzkriterien

- Alle Fachtabellen besitzen `organization_id` mit Index.
- EXIF/KI-Metadaten in JSONB sind abfragbar; pgvector-Extension installierbar.
- Migrationen sind versioniert und reproduzierbar.

## Offene Punkte

- Panorama-Metadaten (360-Viewer ist Nicht-Ziel; Felder evtl. vorbereiten).

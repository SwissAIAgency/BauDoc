# Spec 32 — Speicher-Accounting & Quotas

**Status:** APPROVED · **Bau:** MVP · **Bezug:** D-084, D-085, D-086, D-087 (revidiert D-037)
**Source of Truth für:** Speicher-Verbrauchsmessung, Org-Quota, Limit-Durchsetzung, Verbrauchs-Anzeige

## Zweck

Cloud-Speicherverbrauch je Mandant messen, anzeigen und begrenzen — als **Infrastruktur-Fähigkeit ab MVP**,
unabhängig vom späteren Billing. Verhindert unbegrenzte S3-Kosten.

## Festlegungen

- **Quota-Ebene (D-084):** pro **Organisation**; Verbrauch je Projekt nur zur Anzeige/Transparenz.
- **Limit-Verhalten (D-085):** Schwellen-Warnung (z.B. 80/90 %, via [[13-notifications]]) + **harter Upload-Stopp bei
  100 %** mit klarer Meldung (Aufräumen/Upgrade); **nie** automatisches Löschen. Lesen/Ansehen bleibt immer möglich.
- **Billing-Entkopplung (D-086):** Verbrauchsmessung + konfigurierbare Org-Quota (großzügiger Default) sind MVP;
  das Abo-Modul ([[22-operating-model-saas]]) setzt später nur den Quota-Wert pro Plan.
- **Quota-Basis (D-087):** Originale + Derivate (Thumbnails/Transkodierung/**Embeddings**) + soft-gelöschte bis Purge;
  archivierte Projekte zählen weiter.

## Technik

- **Inkrementeller Zähler** je Org (und je Projekt für Anzeige): +Größe bei Upload/Derivat-Erzeugung, −Größe bei Purge.
  Soft-Delete reduziert den Zähler **nicht** (Daten liegen noch).
- **Reconcile-Job** (periodisch) gleicht Zähler gegen die tatsächliche S3-Belegung ab (Drift-Korrektur).
- **Upload-Gate:** Pipeline ([[05-media-pipeline]]) prüft vor Annahme `used + neu ≤ quota`; bei Überschreitung 4xx
  mit klarer Fehlermeldung. Auch der Bulk-Import ([[17-data-import-migration]]) respektiert das Gate.
- **Anzeige:** Verbrauchs-Balken (used / quota) in Einstellungen + Archiv-Statleiste; Projekt-Aufschlüsselung in der Projektsicht.

## Datenmodell (Delta)

- `organizations.storage_quota_bytes` (konfigurierbar, Default), `organizations.storage_used_bytes` (Zähler).
- `project_storage_usage` (project_id → bytes, für Anzeige).
- Hoheit Gesamtmodell: [[10-data-model]].

## Abhängigkeiten / Verweise

- [[05-media-pipeline]] (Upload-Gate, Derivate) · [[17-data-import-migration]] (Bulk respektiert Gate) ·
  [[21-hosting-compliance-legal]] (Purge/Löschung) · [[13-notifications]] (Schwellen-Warnung) ·
  [[22-operating-model-saas]] (Plan→Quota später) · [[24-project-structure-master-data]] (Archiv zählt weiter) · [[34-storage-data-model]] (Zähler-Trigger + Datei-Modell)

## Akzeptanzkriterien

- Verbrauch wird je Org korrekt fortgeschrieben (Upload erhöht, Purge senkt; Soft-Delete nicht) und stimmt nach Reconcile mit S3.
- Bei 100 % werden neue Uploads (inkl. Bulk-Import) blockiert; bestehende Daten + Lesezugriff bleiben unberührt.
- Schwellen-Warnung wird an Org-Verantwortliche ausgelöst.
- Quota ist pro Org konfigurierbar, ohne dass ein Billing-Modul existiert.
- Derivate + Embeddings sind im Verbrauch enthalten.

## Offene Punkte

- Konkreter Default-Quota-Wert (realistisch für Foto/Video) + Schwellen-Prozentsätze.
- Purge-Frist für soft-gelöschte Dateien (mit [[21-hosting-compliance-legal]] abstimmen).

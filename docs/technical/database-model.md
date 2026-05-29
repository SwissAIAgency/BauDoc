# Database Model

## Status

Phase-1-Datenmodellplanung. Details werden vor Migrationen in Phase 2/3 finalisiert.

## Kernobjekte

```text
organizations
users
roles
permissions
projects
project_members
buildings
floors
rooms
room_zones
trades
work_types
plans
plan_versions
plan_categories
photos
photo_files
photo_locations
photo_comments
photo_audio_comments
photo_trade_assignments
photo_ai_descriptions
photo_tags
audit_logs
notifications
external_systems
external_project_mappings
integration_logs
```

## Zentrale Modellregel

Ein Foto mit Planmarkierung muss eine konkrete Planversion referenzieren. Planpositionen werden relativ zum Plan gespeichert, nicht als absolute Bildschirmkoordinaten.

## Beziehungen

- Organisation hat Benutzer, Projekte, Rollen und Standard-Gewerke.
- Projekt gehört zu Organisation.
- Projekt hat Gebäude, Etagen, Räume, Pläne, Fotos und Mitglieder.
- Benutzer haben projektbezogene Rollen über `project_members`.
- Plan hat viele Planversionen.
- Foto hat Datei-Metadaten und optional Kommentare, Gewerke, Planpositionen und spätere KI-Metadaten.
- Audit-Logs referenzieren Benutzer, Projekt, Aktion und Ressource.

## Schlüssel und Indizes

- Primärschlüssel: technische IDs pro Tabelle.
- Fremdschlüssel zwischen Organisation, Projekt, Struktur, Plan, Foto und Audit.
- Index-Kandidaten:
  - `projects.organization_id`
  - `project_members.project_id`
  - `project_members.user_id`
  - `plans.project_id`
  - `plan_versions.plan_id`
  - `photos.project_id`
  - `photos.captured_at`
  - `photo_locations.plan_version_id`
  - `audit_logs.user_id`
  - `audit_logs.project_id`
  - `audit_logs.created_at`

## Audit-Felder

Für fachliche Tabellen prüfen:

- `created_at`
- `updated_at`
- `created_by`
- `updated_by`
- `archived_at`
- `deleted_at`, falls Soft Delete fachlich nötig ist

## Personenbezogene Daten

- `users`: Name, E-Mail, Auth-Daten.
- `project_members`: Rollen und Projektzuordnung.
- `photo_files`: Bildinhalt kann Personen zeigen.
- `photo_comments`: Kommentare können Personen nennen.
- `audit_logs`: Benutzer, Aktion, Zeitpunkt, optional IP/User-Agent.
- `notifications`: Empfänger und Versandstatus.

## Offene DB-Fragen

- Mandantenfähigkeit über `organization_id` in allen fachlichen Tabellen finalisieren.
- Rollenpaket oder eigenes Permission-System entscheiden.
- Audit-Retention festlegen.
- IP-Adresse und User-Agent im Audit bewerten.
- Panoramafoto-Metadaten für spätere Version planen.

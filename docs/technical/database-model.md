# Database Model

## Status

Phase-2-Planungsbaseline. Keine Migrationen wurden in Phase 2 erzeugt.

## Kernobjekte

```text
organizations
users
roles
permissions
project_members
projects
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
photo_trade_assignments
audit_logs
notifications
```

Spätere Erweiterungen:

```text
photo_audio_comments
photo_ai_descriptions
photo_tags
external_systems
external_project_mappings
integration_logs
```

## Zentrale Modellregeln

- Jede fachliche Tabelle erhält Mandanten- oder Projektbezug, soweit relevant.
- Eine Planposition referenziert immer eine konkrete Planversion.
- Koordinaten werden relativ zum Plan gespeichert.
- Planversionen sind unveränderliche historische Referenzen.
- Dateien liegen im Object Storage; die Datenbank speichert nur Metadaten.

## Wichtige Beziehungen

- Organisation hat Benutzer, Projekte, Rollen und Standard-Gewerke.
- Projekt gehört zu Organisation.
- Projekt hat Gebäude, Etagen, Räume, Pläne, Fotos und Mitglieder.
- Benutzer haben projektbezogene Rollen über `project_members`.
- Plan hat viele Planversionen.
- Foto hat Datei-Metadaten, optional Kommentare, Gewerke und eine Planposition.
- Audit-Logs referenzieren Benutzer, Projekt, Aktion und Ressource.

## Schlüssel und Indizes

- Primärschlüssel: technische IDs pro Tabelle.
- Fremdschlüssel zwischen Organisation, Projekt, Struktur, Plan, Foto und Audit.
- Index-Kandidaten:
  - `projects.organization_id`
  - `project_members.project_id`
  - `project_members.user_id`
  - `buildings.project_id`
  - `floors.building_id`
  - `rooms.floor_id`
  - `plans.project_id`
  - `plan_versions.plan_id`
  - `photos.project_id`
  - `photos.captured_at`
  - `photo_locations.plan_version_id`
  - `photo_trade_assignments.trade_id`
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

## Datenklassifizierung

- Benutzer, Rollen und Projektmitgliedschaften: personenbezogen.
- Fotos und Pläne: vertraulich, potenziell personenbezogen.
- Kommentare: vertraulich, potenziell personenbezogen.
- Audit-Logs: personenbezogen.
- Benachrichtigungen: personenbezogen.

## Lösch- und Aufbewahrungslogik

- Projektarchivierung und endgültige Löschung trennen.
- Audit-Logs nicht unkontrolliert löschen.
- Datei- und Datenbanklöschung konsistent behandeln.
- Backup-Retention in Phase vor Produktivbetrieb klären.

## Offene DB-Fragen

- Exakte Retention für Audit-Logs.
- Speicherung von IP-Adresse und User-Agent.
- Konkretes Rollen-/Permission-Schema.
- Soft Delete je Tabelle.

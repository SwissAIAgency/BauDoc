# 08 Datenmodell

## Fachliche Kernobjekte

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

Jedes Bild muss immer mit einem konkreten Plan und einer konkreten Planversion verknüpft werden, wenn es auf einem Plan markiert wurde. Sonst wird die Dokumentation bei späteren Planupdates unzuverlässig.

## Planposition

```text
photo_id
project_id
building_id
floor_id
room_id
trade_id
plan_id
plan_version_id
x_coordinate
y_coordinate
direction_angle
captured_at
uploaded_by
```

## Wichtige Relationen

- Eine Organisation hat viele Benutzer, Projekte, Rollen und Standard-Gewerke.
- Ein Projekt gehört zu einer Organisation.
- Ein Projekt hat Gebäude, Etagen, Räume, Pläne, Fotos und Mitglieder.
- Ein Benutzer kann über `project_members` unterschiedliche Projektrollen haben.
- Ein Gebäude hat Etagen.
- Eine Etage hat Räume.
- Ein Raum kann optionale Zonen haben.
- Ein Plan hat viele Planversionen.
- Eine Planversion ist unveränderliche Referenz für historische Planpositionen.
- Ein Foto hat mindestens eine Datei und optional Kommentare, Planpositionen, Gewerke und KI-Metadaten.
- Audit-Logs referenzieren Benutzer, Organisation, Projekt, Aktion und optional Ressource.

## Personenbezogene Daten

| Tabelle | Personenbezogene Daten | Hinweis |
|---|---:|---|
| users | Ja | Name, E-Mail, Auth-Daten |
| project_members | Ja | Rolle und Projektzuordnung |
| photo_files | Möglich | Bildinhalt kann Personen zeigen |
| photo_comments | Möglich | Kommentare können Personen nennen |
| photo_audio_comments | Möglich | Stimme und Transkript später |
| audit_logs | Ja | Benutzer, Aktion, Zeitpunkt, IP/User-Agent optional |
| notifications | Ja | Empfänger und Versandstatus |

## Sensible oder vertrauliche Daten

- Baustellenfotos können Personen, private Bereiche, Sicherheitsmängel oder vertrauliche Projektinformationen zeigen.
- Pläne können vertrauliche Gebäudedaten enthalten.
- Audit-Logs können Rückschlüsse auf Verhalten und Arbeitszeiten ermöglichen.
- KI-Metadaten können fehlerhafte oder sensible Interpretationen enthalten.

## Index-Kandidaten

- `projects.organization_id`
- `project_members.project_id`, `project_members.user_id`
- `buildings.project_id`
- `floors.building_id`
- `rooms.floor_id`
- `plans.project_id`
- `plan_versions.plan_id`
- `photos.project_id`, `photos.captured_at`
- `photo_locations.project_id`, `photo_locations.room_id`, `photo_locations.plan_version_id`
- `photo_trade_assignments.trade_id`
- `audit_logs.user_id`, `audit_logs.project_id`, `audit_logs.action`, `audit_logs.created_at`

## Geklärte DB-Fragen

Geklärt am 2026-06-23, Details in `docs/specs/` (Komponenten-Specs) und `docs/06_entscheidungen.md`.

- Mandantenfähigkeit strikt über `organization_id` in allen fachlichen Tabellen? **Ja** — zusätzlich PostgreSQL-RLS
  als Sicherheitsnetz (Defense-in-Depth, D-008).
- Rechte über eigenes Permission-System oder Paket? **`spatie/laravel-permission`**, projekt-scoped über Teams
  (`team_id = project_id`), D-009.
- Aufbewahrung Audit-Logs? **24 Monate** (D-010).
- IP/User-Agent im Audit? **Ja, aber gehasht/pseudonymisiert** (D-010). Audit ist append-only + Hash-Chain.

## Offene DB-Fragen

- Welche Metadaten sind für Panoramafotos nötig, obwohl der 360-Viewer nicht MVP ist?
- Retention der Medien (separat von der Audit-Retention) festlegen.

# 0003 Database Model

Datum: 29.05.2026

## Status

Entschieden als Planungsbaseline.

## Entscheidung

Das Datenmodell folgt einer mandantenfähigen Projektstruktur:

- `organizations` als Mandantenwurzel.
- `users`, `roles`, `permissions`, `project_members` für Identität und Zugriff.
- `projects`, `buildings`, `floors`, `rooms`, `room_zones` für Ortsstruktur.
- `plans` und `plan_versions` für Planhistorie.
- `photos`, `photo_files`, `photo_locations`, `photo_comments` für Dokumentation.
- `audit_logs` und `notifications` für Nachvollziehbarkeit und Kommunikation.

## Zentrale Regel

Jede Planposition referenziert eine konkrete Planversion. Koordinaten werden relativ zum Plan gespeichert.

## Begründung

Planversionen sind fachlich kritisch: Ein Foto darf nicht auf einen später geänderten Plan umgedeutet werden.

## Konsequenzen

- Migrationen müssen Mandanten- und Projektbezug konsequent abbilden.
- Galerie- und Filterabfragen brauchen Indizes.
- Audit- und Retention-Regeln müssen vor produktiver Nutzung finalisiert werden.

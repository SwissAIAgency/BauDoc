# DB Migration Review

## Ziel

Datenbankänderungen sicher planen und prüfen.

## Prüfen

- Welche Tabellen sind betroffen?
- Gibt es Datenverlust?
- Sind Relationen korrekt?
- Sind Constraints nötig?
- Sind Indizes nötig?
- Gibt es Rollback?
- Sind personenbezogene Daten betroffen?
- Ist Datenschutzprüfung nötig?
- Bleiben Planversionen historisch stabil?
- Sind Planpositionen relativ und versioniert gespeichert?

## Verboten

- Felder löschen ohne Migrationsplan.
- produktive Daten gefährden.
- sensible Daten ohne Zweck speichern.
- Migration ohne Tests.
- Planpositionen ohne Planversion speichern.

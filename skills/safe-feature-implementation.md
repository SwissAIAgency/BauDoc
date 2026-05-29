# Safe Feature Implementation

## Ziel

Ein Feature klein, sicher und prüfbar umsetzen.

## Ablauf

1. Task lesen.
2. `AGENTS.md` lesen.
3. Erlaubte Dateien prüfen.
4. Gesperrte Bereiche prüfen.
5. Minimalen Implementierungsplan erstellen.
6. Nur notwendige Änderungen durchführen.
7. Tests ausführen.
8. Bericht schreiben.
9. QA-Review anfordern.

## Verboten

- grosse Refactorings
- Nebenfeatures
- globale Änderungen
- neue Dependencies ohne Freigabe
- UI-Änderungen ohne UI-Task
- DB-Änderungen ohne DB-Agent
- öffentliche Datei-URLs
- Berechtigungen nur im Frontend

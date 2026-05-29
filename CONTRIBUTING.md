# Contributing

## Arbeitsmodell

Dieses Projekt arbeitet nach dem standardisierten Codex-Agentenmodell.

- Kein Agent arbeitet direkt auf `main`.
- `develop` ist der Integrationsbranch.
- Jeder Task bekommt einen eigenen Branch.
- Jede Änderung braucht Task, zuständigen Agenten, erlaubte Dateien, Akzeptanzkriterien und QA.
- Kein Merge ohne QA-Review.

## Branches

- `feature/...` für neue Funktionen
- `fix/...` für Fehlerbehebungen
- `docs/...` für Dokumentation
- `chore/...` für Setup und Wartung
- `release/...` für Release-Vorbereitung

## Commit-Stil

- `feat:` neue Funktion
- `fix:` Fehlerbehebung
- `docs:` Dokumentation
- `refactor:` Refactoring ohne Fachänderung
- `test:` Tests
- `chore:` Setup, Wartung, Konfiguration

## Vor jedem Pull Request

- AGENTS.md gelesen
- relevante Docs gelesen
- erlaubte Dateien eingehalten
- keine Secrets hinzugefügt
- Datenschutz/Security geprüft, falls Daten betroffen sind
- UI/Brand geprüft, falls UI betroffen ist
- Tests oder manuelle Checks dokumentiert

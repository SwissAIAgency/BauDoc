# 04 Restriktionen

## Technische Restriktionen

- Keine neuen Frameworks ohne Architekturfreigabe.
- Keine neuen Dependencies ohne Begründung.
- Keine direkten Änderungen an `main`.
- Keine Secrets im Repository.
- Keine produktiven Daten in Tests.
- Keine externen Dienste ohne Datenschutz- und Security-Prüfung.
- Keine produktive KI-Verarbeitung im MVP.
- Keine öffentlichen Datei-URLs.
- Keine Berechtigungslogik ausschliesslich im Frontend.

## Projektbezogene Restriktionen

- Der MVP bleibt auf Foto, Plan, Ort, Zeit, Gewerk, Rechte, Chronologie und Audit begrenzt.
- Planpositionen müssen relativ zum Plan gespeichert werden.
- Planpositionen müssen bei historischer Dokumentation auf konkrete Planversionen verweisen.
- Planversionen dürfen nach Veröffentlichung nicht stillschweigend verändert werden.
- Jede Datei braucht Projektbezug, Besitzer, Metadaten und Zugriffskontext.
- Downloadrechte werden separat von Ansichtsrechten behandelt.
- KI-Ergebnisse gelten nie als rechtlich verbindliche Wahrheit.

## Namenskonventionen

- Branches: `feature/`, `fix/`, `chore/`, `docs/`, `release/`
- Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- Dateien: sprechende Namen, keine kryptischen Abkürzungen.
- API-Routen: konsistent, versionierbar und ressourcenorientiert.
- Datenbanktabellen: englische, pluralisierte Namen.

## Dokumentationspflicht

Jede relevante Entscheidung kommt in:

- `docs/06_entscheidungen.md`

Jede DB-Änderung kommt in:

- `docs/08_datenmodell.md`

Jede Datenschutzentscheidung kommt in:

- `docs/09_datenschutzkonzept.md`

Jede UI-Grundregel kommt in:

- `docs/13_ui_brand_guidelines.md`

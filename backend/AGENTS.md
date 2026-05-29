# Backend Agent

## Rolle des Bereichs

Der Backend Agent verantwortet API, Businesslogik, Authentifizierung, Autorisierung, Services, Validierung, Fehlerbehandlung und serverseitige Integrität.

## Aufgaben

- Laravel-API-Struktur gemäß Architektur umsetzen.
- Controller, Services, Validierung und Datenzugriff trennen.
- Auth und Rollenmodell serverseitig durchsetzen.
- Konsistente API-Antworten und Fehlerfälle definieren.
- Audit-Events für kritische Aktionen erzeugen.

## Qualitätsregeln

- Businesslogik in Services kapseln.
- Eingaben serverseitig validieren.
- Fehlerbehandlung explizit lösen.
- Keine unnötigen Dependencies.
- API-Verträge dokumentieren.

## Sicherheitsregeln

- Keine sensiblen Daten loggen.
- Keine internen Fehlerdetails ausgeben.
- Rechte pro Organisation, Projekt und Ressource prüfen.
- Downloads und Datei-Ansichten separat autorisieren.

## Verboten

- Berechtigungsprüfung dem Frontend überlassen.
- Secrets im Code speichern.
- Produktivdaten in Tests oder Seeds verwenden.
- Direkte öffentliche Datei-URLs ausgeben.

## Zuerst lesen

- `AGENTS.md`
- `PROJECT_DEFINITION.md`
- `LEISTUNGSKATALOG.md`
- `ARCHITECTURE.md`
- `SECURITY_PRIVACY.md`
- `docs/technical/api-contracts.md`
- `TESTING.md`

## Tests oder Checks

- Unit- und Feature-Tests für Businesslogik.
- API-Tests für Auth, Rollen, Fehlerfälle.
- Security Checks für Datei- und Projektzugriff.

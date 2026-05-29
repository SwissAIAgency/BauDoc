# API Contracts

## Status

Phase-1-Planungsdokument. Konkrete Endpunkte werden in Phase 2/3 finalisiert.

## Grundregeln

- JSON API über HTTPS.
- Geschützte Endpunkte erfordern Authentifizierung.
- Jede Ressource wird serverseitig autorisiert.
- Fehlerantworten sind konsistent und enthalten keine internen Details.
- Eingaben werden serverseitig validiert.

## Ressourcengruppen

- Auth: Login, Logout, Passwort-Reset, Benutzerkontext.
- Organisationen und Benutzer.
- Projekte und Projektmitglieder.
- Gebäude, Etagen, Räume und Zonen.
- Gewerke und Arbeitstypen.
- Pläne und Planversionen.
- Fotos und Datei-Metadaten.
- Planpositionen.
- Kommentare.
- Audit-Logs.
- Benachrichtigungen.

## Antwortregeln

- Erfolgsantworten enthalten nur notwendige Felder.
- Listen unterstützen Pagination, sobald Datenmengen wachsen.
- Fehler unterscheiden Validierung, Authentifizierung, Autorisierung, Nicht-Gefunden und Serverfehler.
- Autorisierungsfehler dürfen keine fremde Ressourcenexistenz offenlegen, wenn dies sicherheitsrelevant ist.

## Sicherheitsanforderungen

- Keine Secrets in Antworten.
- Keine öffentlichen Datei-URLs.
- Dateiabruf nur nach Rechteprüfung über kontrollierten Stream oder kurzlebige URL.
- Rollen- und Projektkontext nicht aus Frontend-Eingaben vertrauen.

## Offene Entscheidungen

- Session- oder Token-Strategie.
- Konkrete API-Versionierung.
- Frontend-Stack und API-Client-Struktur.

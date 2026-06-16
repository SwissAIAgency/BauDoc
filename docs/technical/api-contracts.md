# API Contracts

## Status

Phase-2-Planungsbaseline. Konkrete Request- und Response-Felder werden bei Umsetzung je Modul finalisiert.

## Grundregeln

- JSON API über HTTPS.
- Geschützte Endpunkte erfordern Laravel-Sanctum-Authentifizierung.
- Jede Ressource wird serverseitig autorisiert.
- Fehlerantworten sind konsistent und enthalten keine internen Details.
- Eingaben werden serverseitig validiert.
- Listen unterstützen Pagination, Filter und stabile Sortierung.

## Fehlerformat

Geplant:

```json
{
  "message": "Kurz verständliche Fehlermeldung",
  "code": "VALIDATION_ERROR",
  "errors": {}
}
```

## Ressourcengruppen

### Auth

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/auth/password/forgot`
- `POST /api/auth/password/reset`

### Projekte und Mitglieder

- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/{project}`
- `PATCH /api/projects/{project}`
- `POST /api/projects/{project}/archive`
- `GET /api/projects/{project}/members`
- `POST /api/projects/{project}/members`
- `PATCH /api/projects/{project}/members/{member}`

### Projektstruktur

- Gebäude, Etagen, Räume, Zonen, Gewerke und Arbeitstypen jeweils projektbezogen.
- Zugriff immer über Projektkontext autorisieren.

### Pläne

- `GET /api/projects/{project}/plans`
- `POST /api/projects/{project}/plans`
- `GET /api/plans/{plan}`
- `POST /api/plans/{plan}/versions`
- `GET /api/plan-versions/{planVersion}/view`

### Fotos

- `GET /api/projects/{project}/photos`
- `POST /api/projects/{project}/photos`
- `GET /api/photos/{photo}`
- `PATCH /api/photos/{photo}`
- `GET /api/photos/{photo}/file`

### Planpositionen

- `POST /api/photos/{photo}/location`
- `PATCH /api/photos/{photo}/location`
- `DELETE /api/photos/{photo}/location`

### Kommentare

- `GET /api/photos/{photo}/comments`
- `POST /api/photos/{photo}/comments`

### Audit und Benachrichtigungen

- `GET /api/projects/{project}/audit-logs`
- `GET /api/notifications`
- `PATCH /api/notifications/{notification}`

## Sicherheitsanforderungen

- Keine Secrets in Antworten.
- Keine öffentlichen Datei-URLs.
- Dateiabruf nur nach Rechteprüfung über kontrollierten Stream oder kurzlebige URL.
- Rollen- und Projektkontext nicht aus Frontend-Eingaben vertrauen.
- Autorisierungsfehler dürfen fremde Ressourcenexistenz nicht unnötig offenlegen.

## Offene Detailentscheidungen

- Exakte API-Versionierung.
- Pagination-Standard.
- Fehlercode-Katalog.
- Downloadrecht vs. Ansichtsrecht im Rollenmodell.

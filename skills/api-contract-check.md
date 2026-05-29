# API Contract Check

## Ziel

API-Verträge konsistent, versionierbar und sicher halten.

## Prüfen

- Route ist versionierbar.
- Ressourcennamen sind konsistent.
- Request- und Response-Formate sind dokumentiert.
- Fehlerantworten sind konsistent.
- Auth und Berechtigung sind definiert.
- Pagination, Filter und Sortierung sind bei Listen klar.
- Dateioperationen geben keine öffentlichen Pfade aus.
- Audit-relevante Aktionen sind markiert.

## Verboten

- UI-spezifische Sonderrouten ohne fachliche Begründung.
- nicht dokumentierte Breaking Changes.
- direkte Storage-Pfade in API-Responses.
- Rechteprüfung dem Frontend überlassen.

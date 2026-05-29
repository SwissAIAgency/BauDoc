# 11 Löschkonzept

## Ziele

- Personenbezogene Daten sollen nachvollziehbar gelöscht oder anonymisiert werden können.
- Projektdokumentation darf nicht unbeabsichtigt historisch zerstört werden.
- Audit- und Nachweispflichten müssen mit Löschpflichten abgewogen werden.

## Löscharten

| Datenbereich | Standardaktion | Hinweis |
|---|---|---|
| Benutzer | deaktivieren, später anonymisieren | Projektverlauf kann Referenzen behalten |
| Projekte | archivieren, nicht sofort löschen | Bauhistorie und Nachweise berücksichtigen |
| Fotos | soft delete, physische Löschung nach Freigabe | Datei und Metadaten getrennt behandeln |
| Pläne | Versionen archivieren | historische Referenzen nicht brechen |
| Kommentare | soft delete oder anonymisieren | personenbezogene Inhalte prüfen |
| Audit-Logs | nach Retention löschen/anonymisieren | Retention noch festlegen |
| KI-Metadaten später | mit Quelle löschen oder anonymisieren | eigene Prüfung nötig |

## Mindestregeln

- Keine harte Löschung, wenn historische Plan- oder Fotoreferenzen dadurch inkonsistent werden.
- Löschungen müssen auditierbar sein.
- Physische Dateilöschung muss Storage und Datenbank abgleichen.
- Exporte müssen Löschstatus berücksichtigen.

## Offene Fragen

- Welche Aufbewahrungsfristen gelten je Kunde und Projekt?
- Braucht es rechtliche Aufbewahrungspflichten für bestimmte Bauprojekte?
- Wie werden Kundenexporte bei Löschanfragen behandelt?
- Werden Audit-Logs anonymisiert oder gelöscht?

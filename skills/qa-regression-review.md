# QA Regression Review

## Ziel

Regressionen nach Änderungen verhindern.

## Prüfen

- Ursprünglicher Task erfüllt?
- Bestehende Kernflows weiterhin intakt?
- Upload, Planposition und Rechte weiterhin konsistent?
- Audit-Events nicht entfernt?
- Keine ungewollten Refactorings?
- Tests passend zum Risiko?
- Dokumentation aktualisiert?

## Kritische Regressionen

- unberechtigter Zugriff auf fremde Projekte.
- öffentliche Datei-URLs.
- Planposition ohne Planversion.
- fehlender Audit-Eintrag bei kritischer Aktion.
- Datenverlust bei Plan- oder Fotoupdates.

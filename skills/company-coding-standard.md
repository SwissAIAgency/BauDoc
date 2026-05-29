# Company Coding Standard

## Ziel

Einheitliche, wartbare und nachvollziehbare Softwareentwicklung im Unternehmen.

## Regeln

- Kleine, klar abgegrenzte Änderungen.
- Keine versteckten Nebenfeatures.
- Keine grossen Refactorings ohne Auftrag.
- Bestehende Projektkonventionen beibehalten.
- Fachlogik gehört in Backend-Services, nicht in UI-Hacks.
- API-Verträge dokumentieren.
- Fehlerzustände bewusst modellieren.
- Tests proportional zum Risiko schreiben.
- Keine Secrets im Code.

## Für dieses Projekt zusätzlich

- Serverseitige Rechteprüfung ist Pflicht.
- Planpositionen relativ zum Plan speichern.
- Planversionen historisch stabil halten.
- Private Dateien nie direkt öffentlich verlinken.
- Audit-Events für kritische Aktionen erzeugen.

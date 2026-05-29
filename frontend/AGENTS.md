# Frontend/UI Agent

## Rolle des Bereichs

Der Frontend/UI Agent verantwortet Web-App, Mobile/PWA-Oberfläche, Layout, Komponenten, Barrierefreiheit und UI-Integration.

## Aufgaben

- UI nach `UI_STANDARDS.md` umsetzen.
- Mobile Aufnahmeflows und Desktop-Arbeitsansichten planen.
- API-Zugriffe über gekapselte Client-Services verwenden.
- Lade-, Fehler- und Leerzustände berücksichtigen.
- Responsiveness und Accessibility prüfen.

## Qualitätsregeln

- Keine Businesslogik direkt in UI-Komponenten.
- Keine eigenmächtigen Designänderungen.
- Keine horizontalen Scrollflächen auf mobilen Ansichten.
- Komponenten wiederverwendbar und klar benennen.

## Sicherheitsregeln

- Berechtigungen nur anzeigen, aber nicht erzwingen; Durchsetzung liegt im Backend.
- Keine Secrets im Frontend.
- Keine sensiblen Daten unnötig im Browser speichern.
- Datei-URLs nur kontrolliert über API verwenden.

## Verboten

- UI ohne vorheriges Lesen von `UI_STANDARDS.md` ändern.
- Businessregeln im Frontend verstecken.
- Auth- oder Rollenlogik nur clientseitig lösen.
- Brandfarben, Abstände oder Layouts eigenmächtig ändern, wenn ein Design-Export existiert.

## Zuerst lesen

- `AGENTS.md`
- `PROJECT_DEFINITION.md`
- `LEISTUNGSKATALOG.md`
- `UI_STANDARDS.md`
- `docs/ux/design-system.md`
- `docs/ux/user-flows.md`
- `docs/ux/accessibility.md`

## Tests oder Checks

- Responsive Check.
- Accessibility Check.
- UI-Regression für betroffene Flows.
- Frontend-Build und Lint, sobald vorhanden.

# Agent Structure

## Lead Software Architect Agent

- Ziel: Gesamtarchitektur, Modulgrenzen und Technologieentscheidungen steuern.
- Eingaben: `PROJECT_DEFINITION.md`, `LEISTUNGSKATALOG.md`, `ARCHITECTURE.md`.
- Output: Architekturentscheidungen, Risiken, technische Leitplanken.
- Prüfpunkte: API-first, Modultrennung, Security-Grenzen.
- Nicht tun: Produktivcode ohne Planungsfreigabe starten.

## Product & Requirements Agent

- Ziel: Anforderungen in User Stories, Akzeptanzkriterien und Tasks übersetzen.
- Eingaben: Projektdefinition, Leistungskatalog, Master-Dokument.
- Output: priorisierte Anforderungen und Entwicklungsplan.
- Prüfpunkte: MVP-Grenze, Nicht-Ziele, Akzeptanzkriterien.
- Nicht tun: Features außerhalb des MVP einschleusen.

## Backend Agent

- Ziel: API, Services, Auth, Rollen, Validierung und Fehlerbehandlung umsetzen.
- Eingaben: Architektur, API-Verträge, Security/Privacy.
- Output: Backend-Struktur und Tests.
- Prüfpunkte: serverseitige Rechte, klare Services, keine sensiblen Logs.
- Nicht tun: Businesslogik in Routen verstecken.

## Frontend/UI Agent

- Ziel: Arbeitsfähige Web-/PWA-Oberfläche nach UI-Standards.
- Eingaben: UI-Standards, UX-Dokumente, API-Verträge.
- Output: Layouts, Komponenten, UI-Flows.
- Prüfpunkte: Responsiveness, Accessibility, keine Businesslogik in UI.
- Nicht tun: Design eigenmächtig verändern.

## Database Agent

- Ziel: Datenmodell, Migrationen, Indizes und Datenklassifizierung.
- Eingaben: Datenmodell, Security/Privacy, Löschkonzept.
- Output: Datenbankschema und Migrationsplan.
- Prüfpunkte: Relationen, Planversionen, Audit, Retention.
- Nicht tun: personenbezogene Felder ohne Zweck hinzufügen.

## Security Agent

- Ziel: Auth, Rollen, Input Validation, Secrets, Logging und Abuse Cases prüfen.
- Eingaben: Security/Privacy, Architektur, API- und Datenmodelle.
- Output: Risiken, Fixes, Security-Testfälle.
- Prüfpunkte: Autorisierung, Dateiablage, Fehlerausgaben.
- Nicht tun: Risiken als gelöst markieren, wenn sie nur geplant sind.

## Datenschutz / DSGVO / Schweizer DSG Agent

- Ziel: Datenminimierung, Datenklassifizierung, Löschung, Aufbewahrung und externe Übertragungen prüfen.
- Eingaben: Datenschutzkonzept, Datenmodell, Integrationen.
- Output: Datenschutzrisiken, Anforderungen, Freigaben oder Blocker.
- Prüfpunkte: personenbezogene Daten, Zweck, Retention, Hosting.
- Nicht tun: juristische Freigabe vortäuschen.

## API & Integration Agent

- Ziel: Externe APIs, Webhooks, Adapter, Timeouts und Retries planen.
- Eingaben: API-Verträge, Integrationsdokumentation, Security/Privacy.
- Output: Adapterkonzepte und Integrationsregeln.
- Prüfpunkte: Secrets, Datenschutz, Fehlerfälle.
- Nicht tun: produktive Drittintegrationen ohne Freigabe anbinden.

## Testing & QA Agent

- Ziel: Teststrategie, Regression und Akzeptanzkriterien prüfen.
- Eingaben: Testing, Leistungskatalog, Architektur.
- Output: Testfälle, Prüfergebnisse, Release-Einschätzung.
- Prüfpunkte: Auth, Rechte, Upload, UI, Datenschutz.
- Nicht tun: fehlende Tests verschweigen.

## DevOps & Deployment Agent

- Ziel: lokale Umgebung, CI/CD, Deployment, Monitoring, Backup und ENV.
- Eingaben: Deployment-Dokument, `.env.example`, Security/Privacy.
- Output: Setup- und Betriebsdokumentation.
- Prüfpunkte: Secrets, Hosting, HTTPS, Backups.
- Nicht tun: produktive Secrets speichern.

## Code Review Agent

- Ziel: Änderungen neutral auf Anforderungen, Architektur, Security, Datenschutz und Tests prüfen.
- Eingaben: Diff, Dokumente, Testresultate.
- Output: Befunde nach Schweregrad und Freigabeempfehlung.
- Prüfpunkte: Scope, Qualität, Risiken, fehlende Tests.
- Nicht tun: kosmetische Refactors erzwingen.

## Documentation Agent

- Ziel: README, Architektur, API, Setup, Changelog und Entscheidungen aktuell halten.
- Eingaben: geänderte Dateien und Entscheidungen.
- Output: konsistente Dokumentation.
- Prüfpunkte: Widersprüche, offene Fragen, veraltete Setup-Hinweise.
- Nicht tun: Annahmen als Fakten dokumentieren.

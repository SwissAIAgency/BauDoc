# Development Plan

Datum: 29.05.2026

## Foundation

### BD-001 Technische Foundation

- Ziel: Laravel API, Vue PWA und lokale Dienststruktur ohne Fachlogik anlegen.
- Agent: DevOps & Deployment Agent, Lead Software Architect Agent.
- Dateien: `backend/`, `frontend/`, `.env.example`, `docs/technical/deployment.md`.
- Abhängigkeiten: Entscheidung `DECISIONS/0004-technology-stack.md`.
- Akzeptanzkriterien: Backend und Frontend starten lokal; PostgreSQL, Redis und MinIO sind dokumentiert.
- Tests: Start-/Health-Check, keine Secrets.
- Risiken: Zu frühe Fachlogik.
- Definition of Done: Foundation läuft lokal und README ist aktualisiert.

## Datenmodell

### BD-002 Datenmodell-Grundstruktur

- Ziel: Kernmigrationen für Organisationen, Benutzer, Projekte, Struktur, Pläne, Fotos und Audit planen und anlegen.
- Agent: Database Agent.
- Dateien: `database/`, `docs/technical/database-model.md`.
- Abhängigkeiten: BD-001.
- Akzeptanzkriterien: Planversionen und Mandantenbezug sind abgebildet.
- Tests: Migrationen, FK-Integrität.
- Risiken: Fehlende Mandantentrennung.
- Definition of Done: Migrationen sind nachvollziehbar und dokumentiert.

## Auth & Rollen

### BD-003 Authentifizierung und Rollenmodell

- Ziel: Laravel Sanctum, Rollen und serverseitige Autorisierung implementieren.
- Agent: Backend Agent, Security Agent.
- Dateien: `backend/`, `security/security-tests.md`.
- Abhängigkeiten: BD-001, BD-002.
- Akzeptanzkriterien: Geschützte Endpunkte blockieren unberechtigte Zugriffe.
- Tests: Login, Logout, Zugriff erlaubt, Zugriff verboten.
- Risiken: Rechteprüfung nur im Frontend.
- Definition of Done: Rechte greifen serverseitig und sind getestet.

## Backend-Grundstruktur

### BD-004 API-Schicht und Fehlerformat

- Ziel: API-Struktur, Request Validation, Fehlerantworten und Service-Grenzen einführen.
- Agent: Backend Agent.
- Dateien: `backend/`, `docs/technical/api-contracts.md`.
- Abhängigkeiten: BD-003.
- Akzeptanzkriterien: Konsistente JSON-Antworten und Fehler.
- Tests: API-Validierung und Fehlerfälle.
- Risiken: Interne Details in Fehlern.
- Definition of Done: API-Konventionen sind umgesetzt und dokumentiert.

## Frontend-Grundstruktur

### BD-005 Vue PWA-Grundstruktur

- Ziel: Vue 3 + Vite + TypeScript PWA mit Routing, Layout und API-Client anlegen.
- Agent: Frontend/UI Agent.
- Dateien: `frontend/`, `UI_STANDARDS.md`, `docs/ux/`.
- Abhängigkeiten: BD-001, BD-004.
- Akzeptanzkriterien: Frontend startet lokal und zeigt Login-/Shell-Struktur.
- Tests: Build, responsive Grundcheck.
- Risiken: Businesslogik im UI.
- Definition of Done: UI-Grundstruktur ohne Fachlogik steht.

## Kernmodul 1

### BD-006 Projektstruktur

- Ziel: Organisation, Projekt, Gebäude, Etage, Raum, Zone, Gewerk und Mitgliedschaften abbilden.
- Agent: Backend Agent, Database Agent, Frontend/UI Agent.
- Dateien: Backend, Frontend, Datenmodell.
- Abhängigkeiten: BD-003, BD-004, BD-005.
- Akzeptanzkriterien: Projektleiter kann Struktur verwalten; unberechtigte Zugriffe werden blockiert.
- Tests: CRUD, Rechte, Validierung.
- Risiken: Mandantenleck.
- Definition of Done: Projektstruktur ist API- und UI-seitig nutzbar.

## Kernmodul 2

### BD-007 Planverwaltung

- Ziel: Pläne privat speichern, versionieren und anzeigen.
- Agent: Backend Agent, Database Agent, Security Agent, Frontend/UI Agent.
- Dateien: Backend, Frontend, Storage-Konfiguration.
- Abhängigkeiten: BD-006.
- Akzeptanzkriterien: Neue Planversionen erhalten Historie.
- Tests: Upload, Versionierung, Zugriff verboten/erlaubt.
- Risiken: Öffentliche Planlinks.
- Definition of Done: Pläne sind privat, versioniert und berechtigt abrufbar.

## Kernmodul 3

### BD-008 Fotoaufnahme und Planpositionen

- Ziel: Fotos uploaden, privat speichern und optional mit Planposition verknüpfen.
- Agent: Backend Agent, Frontend/UI Agent, Database Agent, Security Agent.
- Dateien: Backend, Frontend, Storage, Datenmodell.
- Abhängigkeiten: BD-007.
- Akzeptanzkriterien: Foto referenziert bei Marker eine konkrete Planversion.
- Tests: Upload, Dateityp, Koordinaten, fremder Zugriff.
- Risiken: Fehlende Planversion oder öffentliche Dateien.
- Definition of Done: Upload und Planposition sind sicher getestet.

## Galerie und Kommentare

### BD-009 Galerie, Filter und Kommentare

- Ziel: Fotos chronologisch anzeigen, filtern und kommentieren.
- Agent: Backend Agent, Frontend/UI Agent, Testing & QA Agent.
- Dateien: Backend, Frontend.
- Abhängigkeiten: BD-008.
- Akzeptanzkriterien: Filter nach Zeitraum, Ort und Gewerk; Kommentare berechtigt.
- Tests: Filter, leere Zustände, Rechte.
- Risiken: Filter legen fremde Daten offen.
- Definition of Done: Galerie ist nutzbar und berechtigt.

## Audit und Benachrichtigung

### BD-010 Audit-Log und Planbenachrichtigung

- Ziel: Kritische Aktionen protokollieren und bei neuer Planversion benachrichtigen.
- Agent: Backend Agent, Security Agent, Datenschutz Agent.
- Dateien: Backend, Datenmodell, `.env.example`.
- Abhängigkeiten: BD-007, BD-008.
- Akzeptanzkriterien: Login, Upload, Ansicht, Download und Rechteänderung werden auditiert.
- Tests: Audit-Events und Mail-Log.
- Risiken: Zu viele personenbezogene Logdaten.
- Definition of Done: Audit ist datensparsam und getestet.

## Security Hardening

### BD-011 Security Review und Härtung

- Ziel: Auth, Rollen, Upload, Storage, Fehler und Logs prüfen.
- Agent: Security Agent, Code Review Agent.
- Dateien: `security/`, Backend, Frontend.
- Abhängigkeiten: BD-010.
- Akzeptanzkriterien: Keine kritischen oder hohen offenen Risiken.
- Tests: `security/security-tests.md`.
- Risiken: Scheinsicherheit ohne Testabdeckung.
- Definition of Done: Security-Freigabe für MVP-Kern.

## Datenschutzfunktionen

### BD-012 Datenschutz Review und Retention

- Ziel: Datenklassifizierung, Löschung, Retention und Exportfähigkeit finalisieren.
- Agent: Datenschutz / DSGVO / Schweizer DSG Agent.
- Dateien: `docs/legal/`, Backend.
- Abhängigkeiten: BD-010.
- Akzeptanzkriterien: Retention und Löschprozess sind dokumentiert.
- Tests: Lösch-/Archivierungsfälle, Logprüfung.
- Risiken: Audit-Logs zu lang oder zu detailliert.
- Definition of Done: Datenschutzfreigabe für MVP-Kern vorbereitet.

## Tests

### BD-013 Testausbau

- Ziel: Unit-, Feature-, API-, UI- und Security-Tests für Kernflows ausbauen.
- Agent: Testing & QA Agent.
- Dateien: `tests/`, Backend, Frontend.
- Abhängigkeiten: BD-009 bis BD-012.
- Akzeptanzkriterien: Kernflows und kritische Rechtefälle sind abgedeckt.
- Tests: Voller verfügbarer Testlauf.
- Risiken: Testdaten bilden Baustellenrealität nicht ab.
- Definition of Done: Regressionsfähige Testsuite.

## Deployment

### BD-014 Deployment-Vorbereitung

- Ziel: Deployment-Konfiguration, ENV, Queue, Storage, Monitoring und Backups vorbereiten.
- Agent: DevOps & Deployment Agent.
- Dateien: `devops/`, `.env.example`, `docs/technical/deployment.md`.
- Abhängigkeiten: BD-013.
- Akzeptanzkriterien: Deploy-Readiness dokumentiert.
- Tests: Build, Start, Health, Backup-/Restore-Konzept.
- Risiken: Externe Dienste ohne Prüfung.
- Definition of Done: Deployment-Checkliste erfüllt.

## Release Check

### BD-015 MVP Release Check

- Ziel: Abschlussprüfung vor Übergabe.
- Agent: Code Review Agent, QA Agent, Security Agent, Datenschutz Agent.
- Dateien: `CHANGELOG.md`, `README.md`, Release-Dokumentation.
- Abhängigkeiten: BD-014.
- Akzeptanzkriterien: Keine kritischen Blocker, bekannte Risiken dokumentiert.
- Tests: Regression, Security, Datenschutz, UI.
- Risiken: Code und Dokumentation driften auseinander.
- Definition of Done: Release-Empfehlung liegt vor.

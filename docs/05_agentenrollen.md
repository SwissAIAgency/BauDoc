# 05 Agentenrollen

## Standardrollen

| Agent | Aufgabe | Darf ändern? | Wann einsetzen? |
|---|---|---:|---|
| Orchestrator-Agent | Koordiniert Projekt, Tasks, Agenten, Reihenfolge und Reviews. | Nur Dokumentation/Planung, wenn erlaubt. | Immer. |
| Architektur-Agent | Plant Struktur, Module, Schnittstellen und Risiken. | Nein, primär Analyse und Dokumentation. | Vor Projektstart und bei Architekturänderungen. |
| Backend-Agent | API, Services, Businesslogik, Validierung, Backendtests. | Ja, nur Backend-Dateien. | Bei API- und Logik-Tasks. |
| Frontend-/UI-Agent | UI, Komponenten, Layouts, Responsiveness, Interaktionen. | Ja, nur Frontend-Dateien. | Bei UI-Tasks. |
| DB-Agent | Datenmodell, Migrationen, Relationen, Indizes, Constraints. | Ja, nur DB-/Schema-Dateien nach Freigabe. | Bei jeder DB-Änderung. |
| Datenschutz- & Compliance-Agent | DSG/nDSG, DSGVO-Risiken, Datenflüsse, Löschung, Consent. | Nein, prüft und definiert Anforderungen. | Bei personenbezogenen Daten, Uploads, KI und Logs. |
| DevOps-/Security-Agent | Docker, Deployments, CI/CD, Env, Secrets, Hosting, Security. | Ja, nur Infrastrukturdateien. | Bei Deployment, Ports, Secrets, CI/CD. |
| QA-/Review-Agent | Prüft Änderungen gegen Auftrag, Tests, Standards und Regressionen. | Nein, ausser Reparatur ausdrücklich erlaubt. | Nach jeder Implementierung. |

## Projektbezogene Spezialrollen

| Agent | Verantwortung | Output |
|---|---|---|
| Auth-/Security-Agent | Login, Rollen, Rechte, Zugriffsschutz. | Policies, Middleware, Tests. |
| Projektstruktur-Agent | Projekte, Gebäude, Etagen, Räume, Gewerke. | CRUD, APIs, UI-Komponenten. |
| Plan-Agent | Planverwaltung, Versionen, Viewer. | Planmodule, Uploads, Versionierung. |
| Foto-Agent | Fotoaufnahme, Upload, Galerie, Kommentare. | Foto-API, Upload-UI, mobile Aufnahme. |
| Planposition-Agent | Koordinatenlogik, Planmarker, Ortssuche. | Planmarker, Suchlogik, Tests. |
| Audit-Agent | Zugriffsprotokolle und Admin-Ansichten. | Audit Events, Audit UI, Filter. |
| KI-Agent | Bildanalyse, Transkription, semantische Suche. | Worker, KI-Metadaten, Suchschnittstelle. |
| Test-Agent | Feature Tests, Rechte-Tests, Upload-Tests. | Test-Suite und Testbericht. |

## Rollenregel

Ein Agent darf nie eigenmächtig ausserhalb seiner Rolle arbeiten. Der Backend-Agent ändert keine DB-Struktur ohne DB-Agent. Der Frontend-Agent ändert keine API-Verträge. Der DevOps-Agent ändert keine Businesslogik.

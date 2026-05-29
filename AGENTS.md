# AGENTS.md

## Unternehmensstandard

Dieses Projekt folgt dem standardisierten Codex-Agentenmodell aus der bereitgestellten Unternehmensanleitung.

Alle Agenten müssen vor Änderungen lesen:

- `docs/00_projektdefinition.md`
- `docs/01_anforderungen.md`
- `docs/02_architektur.md`
- `docs/04_restriktionen.md`
- `docs/13_ui_brand_guidelines.md`
- `docs/14_repository_workflow.md`
- relevante Skills aus `skills/`

## Projektkontext

Projekt: Planbasierte Baufortschrittsdokumentation.

Hauptquelle für fachliche und technische Anforderungen ist:

- `docs/references/leistungskatalog_baufortschritt_dokumentation.html`

Die Applikation soll Baufortschritte mit Fotos, Panoramafotos, Plänen, Planpositionen, Kommentaren, Rollen, Berechtigungen, Audit-Logs und späterer KI-Suche dokumentieren. Der MVP bleibt klar begrenzt auf Foto, Plan, Ort, Zeit, Gewerk, Rechte, Chronologie und Audit.

## Grundregeln

- Arbeite nur am aktuellen Task.
- Ändere nur erlaubte Dateien.
- Keine grossen Refactorings ohne Freigabe.
- Keine neuen Dependencies ohne Begründung und Architekturfreigabe.
- Keine Produktivfeatures während der Setup- und Planungsphase.
- Keine bestehenden Funktionen entfernen.
- Keine globalen Konfigurationsänderungen ohne Auftrag.
- Keine Ports ändern ohne DevOps-/Security-Agent.
- Keine UI-Änderungen bei Backend-Tasks.
- Keine Backend-Änderungen bei UI-Tasks.
- Keine DB-Änderung ohne DB-Agent.
- Keine personenbezogenen Daten ohne Datenschutz- & Compliance-Agent.
- Keine Secrets, Tokens oder privaten Credentials im Repository.
- Kein Merge ohne QA-Review.

## Fachliche Sicherheitsregeln

- Berechtigungen müssen serverseitig geprüft werden.
- Keine öffentlichen Direktlinks auf Fotos, Pläne, Panoramen oder Audiodateien.
- Jede Datei braucht Metadaten, Besitzer, Projektbezug und Zugriffskontext.
- Planpositionen werden relativ zum Plan gespeichert, nicht als absolute Bildschirmkoordinaten.
- Planversionen sind unveränderliche Referenzen für historische Bilder.
- KI-Funktionen laufen asynchron, werden als automatisch generiert gekennzeichnet und sind nicht Teil des MVP.
- Audit-Logs sind Teil des Sicherheitskonzepts und nicht nur Reporting.

## Rollenpflicht

Jeder Task muss einem Agenten zugeordnet werden:

- Orchestrator-Agent
- Architektur-Agent
- Backend-Agent
- Frontend-/UI-Agent
- DB-Agent
- Datenschutz- & Compliance-Agent
- DevOps-/Security-Agent
- QA-/Review-Agent

Projektbezogene Spezialrollen:

- Auth-/Security-Agent
- Projektstruktur-Agent
- Plan-Agent
- Foto-Agent
- Planposition-Agent
- Audit-Agent
- KI-Agent
- Test-Agent

## Definition of Done

Ein Task ist fertig, wenn:

- Ziel erfüllt
- erlaubte Dateien eingehalten
- Tests/Checks dokumentiert
- QA geprüft
- Datenschutz/Security geprüft, falls relevant
- UI-/Brand-Standards eingehalten, falls relevant
- Dokumentation aktualisiert
- PR bereit oder gemerged

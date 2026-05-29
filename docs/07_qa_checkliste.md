# 07 QA Checkliste

## Nach jedem Task

- [ ] Nur erlaubte Dateien geändert.
- [ ] Keine gesperrten Bereiche verändert.
- [ ] Akzeptanzkriterien erfüllt.
- [ ] Tests/Checks dokumentiert.
- [ ] QA-Agent geprüft.
- [ ] PR-Template ausgefüllt.
- [ ] Keine Secrets im Repository.

## Backend

- [ ] API-Endpunkte sind geschützt, wo erforderlich.
- [ ] Berechtigungen werden serverseitig geprüft.
- [ ] Validierung ist vorhanden.
- [ ] Fehlerantworten sind konsistent.
- [ ] Audit-Events werden bei kritischen Aktionen erzeugt.

## Datenbank

- [ ] Migration vorhanden.
- [ ] Rollback-Risiko dokumentiert.
- [ ] Relationen korrekt.
- [ ] Constraints und Indizes geprüft.
- [ ] Personenbezogene Daten markiert.
- [ ] Datenschutz-Agent einbezogen, falls nötig.

## Dateien und Uploads

- [ ] Keine öffentlichen Direktlinks.
- [ ] Datei-Metadaten vorhanden.
- [ ] Besitzer, Projektbezug und Zugriffskontext vorhanden.
- [ ] Downloadrechte separat geprüft.
- [ ] Unberechtigter Zugriff blockiert.

## Planpositionen

- [ ] Koordinaten relativ zum Plan gespeichert.
- [ ] Planversion wird referenziert.
- [ ] Historische Bilder bleiben stabil.
- [ ] Marker verhalten sich responsive korrekt.

## Frontend/UI

- [ ] Mobile Ansicht geprüft.
- [ ] Kein horizontaler Scroll.
- [ ] Kamera-/Upload-Fluss verständlich.
- [ ] Planviewer bedienbar.
- [ ] Fehler-, Lade- und Leerzustände vorhanden.
- [ ] Accessibility geprüft.

## Datenschutz/Security

- [ ] Datenarten dokumentiert.
- [ ] Zweck definiert.
- [ ] Löschung möglich.
- [ ] Externe Anbieter geprüft.
- [ ] Logs minimiert.
- [ ] Consent/Informationspflicht geprüft.
- [ ] KI-Datenverarbeitung abgegrenzt.

## Integrationsprüfung

- [ ] Backend startet.
- [ ] Frontend startet.
- [ ] API-Verträge stimmen.
- [ ] DB-Migrationen laufen.
- [ ] Tests sind grün oder Abweichungen dokumentiert.
- [ ] UI-/Brand-Standards sind eingehalten.
- [ ] Datenschutzdokumente sind aktuell.
- [ ] Keine nicht dokumentierten Dependencies.
- [ ] Roadmap und Ist-Zustand stimmen überein.

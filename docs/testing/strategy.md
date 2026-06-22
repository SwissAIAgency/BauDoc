# Teststrategie

**Zuletzt aktualisiert:** 2026-06-22  
**Verantwortlich:** Testing & QA Agent  
**Status:** APPROVED  
**Bezug:** `docs/technical/development-plan.md` (BD-013), `docs/architecture/overview.md`, `docs/security/overview.md`

> **Kanonischer Ort dieser Datei:** `docs/testing/strategy.md`  
> Die Datei `TESTING.md` im Root leitet hierher weiter.

---

## Zweck

Diese Datei definiert Testziele, Testarten, Testdaten-Regeln und Merge-/Release-Checklisten für BauDoc. Tests sichern Authentifizierung, Rollen, private Dateiablage, Planversionen, Planpositionen, Fotozuordnung, Audit und UI-Kernflows ab.

## Geltungsbereich

Verbindlich ab BD-001. Kritische Rechte- und Datenschutzfälle sind ausdrücklich zu prüfen.

---

## Testarten

| Art | Scope | Tools |
|---|---|---|
| Unit Tests | Businesslogik in Services | Laravel PHPUnit |
| Feature Tests | Laravel-Controller & -Jobs | Laravel PHPUnit |
| API Tests | HTTP-Verträge, Auth, Validierung | Laravel PHPUnit |
| Integration Tests | DB, Storage, Queue | Laravel PHPUnit |
| E2E Tests | Kernflows end-to-end | Playwright |
| Security Tests | Auth, Rechte, Uploads, Fehlerausgaben | Manuell + automatisiert |
| Datenschutz Tests | Logs, Exports, KI-Deaktivierung | Manuell |
| UI Tests | Responsive, Zustände, Flows | Vitest + Playwright |
| Accessibility Tests | Tastatur, Kontrast, ARIA | axe-core + manuell |
| Performance Checks | Upload, Galerie, Planviewer | Manuell / Lighthouse |
| Regression Tests | Kernflows nach größeren Änderungen | Playwright |

## Unit Tests

- Businessregeln in Services.
- Berechnung und Validierung von Planpositionen.
- Rollen- und Berechtigungslogik, soweit isolierbar.

## Integration Tests

- Datenbankzugriffe.
- Storage-Abstraktion.
- Queue-Jobs.
- Benachrichtigungen.

## API Tests

- Login, Logout und geschützte Endpunkte.
- Projekt-, Plan-, Foto-, Kommentar- und Audit-Endpunkte.
- Fehlerantworten und Validierung.
- Unberechtigte direkte API-Aufrufe.

## E2E Tests

- Minimaler Aufnahmefluss.
- Plan öffnen, Marker setzen, Foto speichern.
- Galerie filtern.
- Login und Rollenwechsel für Testnutzer.

## Security Tests

- Zugriff ohne Anmeldung.
- Zugriff mit falscher Rolle.
- Zugriff auf fremde Organisation oder fremdes Projekt.
- Direkter Dateizugriff ohne Recht.
- Ungültige Uploads.
- Fehlerausgaben ohne interne Details.

## Datenschutz Tests

- Keine produktiven personenbezogenen Testdaten.
- Logs ohne Secrets und unnötige personenbezogene Daten.
- Export- und Löschkonzept prüfen, sobald implementiert.
- KI-Verarbeitung bleibt im MVP deaktiviert.

## UI Tests

- Mobile Aufnahmeoberfläche.
- Desktop-Planviewer.
- Galerie und Filter.
- Fehler-, Lade- und Leerzustände.
- Keine horizontalen Scrollflächen.

## Accessibility Tests

- Tastaturnavigation.
- Fokuszustände.
- Kontrast.
- Labels und ARIA, wo nötig.
- Informationen nicht nur über Farbe.

## Performance Checks

- Upload-Verhalten.
- Galerie mit längerer Projekthistorie.
- Planviewer mit großen Dateien.
- Queue-Verarbeitung für spätere Jobs.

## Regression Tests

- Kernflows nach jeder größeren Änderung erneut prüfen.
- Rechte- und Dateioperationen besonders schützen.

## Testdaten-Regeln

- Keine produktiven personenbezogenen Daten.
- Testbilder nur anonym oder synthetisch.
- Keine echten Baupläne ohne Freigabe.
- Secrets und echte Tokens niemals in Fixtures.

## Was vor jedem Merge geprüft werden muss

- [ ] Relevante Tests ausgeführt oder begründet ausgelassen.
- [ ] Keine Secrets.
- [ ] Keine produktiven Daten.
- [ ] Dokumentation aktualisiert.
- [ ] Security-/Datenschutzprüfung bei betroffenen Bereichen.
- [ ] UI-/Accessibility-Check bei UI-Änderungen.

## Was vor jedem Release geprüft werden muss

- [ ] Vollständige Regression der Kernflows.
- [ ] Auth- und Rechte-Tests.
- [ ] Upload- und private Dateiablage.
- [ ] Backup-/Restore-Konzept.
- [ ] Security Review.
- [ ] Datenschutz Review.
- [ ] Release-Checkliste.

## Änderungshistorie

| Datum | Änderung | Autor |
|---|---|---|
| 2026-06-22 | Migriert nach `docs/testing/strategy.md` (kanonisch) | Restructuring |

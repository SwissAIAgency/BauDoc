# Testing

> **Kanonischer Ort:** `docs/testing/strategy.md`  
> Diese Datei bleibt als Referenz erhalten. Änderungen bitte nur in `docs/testing/strategy.md` vornehmen.



## Ziel der Tests

Tests sichern Authentifizierung, Rollen, private Dateiablage, Planversionen, Planpositionen, Fotozuordnung, Audit und UI-Kernflows ab. Kritische Rechte- und Datenschutzfälle sind ausdrücklich zu prüfen.

## Testarten

- Unit Tests.
- Feature Tests.
- Integration Tests.
- API Tests.
- E2E Tests.
- Security Tests.
- Datenschutz Tests.
- UI Tests.
- Accessibility Tests.
- Performance Checks.
- Regression Tests.

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

- Relevante Tests ausgeführt oder begründet ausgelassen.
- Keine Secrets.
- Keine produktiven Daten.
- Dokumentation aktualisiert.
- Security-/Datenschutzprüfung bei betroffenen Bereichen.
- UI-/Accessibility-Check bei UI-Änderungen.

## Was vor jedem Release geprüft werden muss

- Vollständige Regression der Kernflows.
- Auth- und Rechte-Tests.
- Upload- und private Dateiablage.
- Backup-/Restore-Konzept.
- Security Review.
- Datenschutz Review.
- Release-Checkliste.

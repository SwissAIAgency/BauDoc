# Security Tests

## Authentifizierung

- Login mit gültigen Daten.
- Login mit ungültigen Daten.
- Zugriff ohne Session/Token.
- Zugriff mit abgelaufener Session.
- Logout invalidiert Zugriff.

## Autorisierung

- Projektleiter sieht eigenes Projekt.
- Projektleiter sieht fremdes Projekt nicht.
- Gewerk-Benutzer sieht nur freigegebene Gewerke/Bereiche.
- Betrachter kann nicht ändern.
- Direkter API-Aufruf auf fremde Ressource wird blockiert.

## Dateien

- Foto-Upload mit erlaubtem Dateityp.
- Upload mit falschem Dateityp wird abgelehnt.
- Upload mit zu großer Datei wird abgelehnt.
- Direkter Dateizugriff ohne Berechtigung wird blockiert.
- Downloadrecht und Ansichtsrecht werden getrennt geprüft.

## Pläne und Planpositionen

- Planposition ohne Planversion wird abgelehnt.
- Koordinaten außerhalb des Plans werden abgelehnt.
- Neue Planversion verändert alte Foto-Planposition nicht.

## Logging und Fehler

- Fehlerantworten enthalten keine Stacktraces.
- Logs enthalten keine Passwörter, Tokens oder Secrets.
- Audit-Events entstehen bei Login, Upload, Ansicht, Download und Rechteänderung.

## Integrationen

- Webhooks bleiben deaktiviert, bis Signaturen definiert sind.
- KI-Verarbeitung bleibt im MVP deaktiviert.

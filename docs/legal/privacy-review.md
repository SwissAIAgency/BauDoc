# Datenschutz Review vor Implementierung

Datum: 29.05.2026

## Ergebnis

Status: bedingt planungsfähig. Keine juristische Freigabe.

## Personenbezogene Daten

- Benutzername, E-Mail, Organisation und Rollen.
- Projektmitgliedschaften.
- Audit-Logs mit Benutzer, Aktion und Zeitpunkt.
- Kommentare.
- Potenziell Personen auf Fotos.
- Benachrichtigungsempfänger.

## Datenminimierung

- IP-Adresse und User-Agent im Audit nur speichern, wenn Zweck und Retention festgelegt sind.
- Kommentare nicht für personenbezogene Zusatzinformationen optimieren.
- KI-Metadaten im MVP nicht erzeugen.
- Bildinhalte nicht automatisch extern übertragen.

## Speicherorte

- PostgreSQL für relationale Daten.
- Privater Object Storage für Fotos und Pläne.
- Redis für Cache, Sessions und Queues.
- Logs nur technisch notwendig.

## Löschung und Aufbewahrung

- Projektarchivierung und endgültige Löschung trennen.
- Audit-Retention vor produktiver Nutzung festlegen.
- Backups in Löschkonzept einbeziehen.

## Externe Dienstleister

Vor produktiver Nutzung zu prüfen:

- Hosting-Anbieter.
- Object-Storage-Anbieter.
- Mail-Anbieter.
- Spätere KI-Anbieter.

## Risiken

- Baustellenfotos enthalten Personen oder private Bereiche.
- Pläne enthalten vertrauliche Gebäudedaten.
- Audit-Logs machen Arbeitsverhalten sichtbar.
- Externe Anbieter können Datenübertragung auslösen.

## Technische Anforderungen

- Private Dateiablage.
- Serverseitige Rechteprüfung.
- Datensparsame Audit-Logs.
- Keine KI-Verarbeitung ohne separate Prüfung.
- Export-/Auskunftsfähigkeit konzeptionell vorbereiten.

## Blocker vor Produktivbetrieb

- Hosting- und Dienstleisterprüfung.
- Audit-Retention.
- Lösch- und Backup-Prozess.
- Menschliche Datenschutzfreigabe.

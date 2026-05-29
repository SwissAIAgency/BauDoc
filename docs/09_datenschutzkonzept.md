# 09 Datenschutzkonzept

## Einordnung

Schweizer DSG/nDSG ist relevant, weil Benutzerkonten, Rollen, Audit-Logs, Baustellenfotos, Kommentare und Benachrichtigungen personenbezogene Daten enthalten können. DSGVO-Risiken entstehen bei EU-Bezug durch Benutzer, Projekte, Auftraggeber, Hosting oder Dienstleister.

Dies ist keine finale juristische Freigabe, sondern eine technische Datenschutzgrundlage für Planung und Umsetzung.

## Grundsätze

- Datenminimierung.
- Zweckbindung.
- Serverseitige Zugriffskontrolle.
- Private Dateiablage.
- Auditierbarkeit kritischer Aktionen.
- Lösch- und Archivierungskonzept.
- KI-Funktionen erst nach gesonderter Prüfung.

## Personenbezogene Daten

- Benutzername, E-Mail, Organisation und Rollen.
- Projektmitgliedschaften.
- Upload- und Bearbeitungsaktionen.
- Kommentare.
- potenziell Personen auf Fotos.
- später Stimme und Transkript bei Sprachkommentaren.

## Zweck

- Authentifizierung und Autorisierung.
- Baufortschrittsdokumentation.
- fachliche Zuordnung von Fotos, Plänen und Kommentaren.
- Nachvollziehbarkeit von Zugriffen und Änderungen.
- Benachrichtigung über relevante Planänderungen.

## Risiken

- Fotos zeigen Personen oder private Bereiche.
- Pläne enthalten vertrauliche Gebäudedaten.
- öffentliche Datei-URLs führen zu unkontrolliertem Zugriff.
- Audit-Logs können Arbeitsverhalten sichtbar machen.
- KI kann Bildinhalte falsch interpretieren.
- externe KI- oder Storage-Anbieter können Datenübermittlung auslösen.

## Auflagen für MVP

- Keine öffentlichen Direktlinks für Bilder und Pläne.
- Rollen- und Projektberechtigungen serverseitig prüfen.
- Ansichtsrecht und Downloadrecht trennen.
- Audit-Logs auf notwendige Daten begrenzen.
- Lösch- und Archivierungsregeln dokumentieren.
- Hosting in Schweiz oder EU prüfen.
- Externe Anbieter vor Nutzung prüfen.
- Keine KI-Verarbeitung im MVP ohne separate Datenschutzprüfung.

## Freigabe

Status: bedingt planungsfähig.

Auflagen:

- Datenschutz-Agent muss vor produktiver Nutzung erneut prüfen.
- Security-Agent muss Dateizugriff, Auth, Token, Storage und Audit prüfen.
- Menschliche Projektfreigabe bleibt erforderlich.

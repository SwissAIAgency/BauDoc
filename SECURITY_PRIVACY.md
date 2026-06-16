# Security & Privacy

## Sicherheitsziel

BauDoc schützt Projekte, Pläne, Fotos, Kommentare, Benutzerkonten und Audit-Informationen durch Authentifizierung, serverseitige Autorisierung, private Dateiablage, Eingabevalidierung und nachvollziehbare Protokollierung.

## Datenschutz-Ziel

Die Anwendung verarbeitet nur notwendige personenbezogene Daten, dokumentiert Zwecke und Datenflüsse, minimiert Logs und ermöglicht spätere Lösch-, Export- und Aufbewahrungsprozesse.

## Datenklassifizierung

- Öffentlich: keine MVP-Produktivdaten.
- Intern: technische Dokumentation, nicht vertrauliche Projektdaten.
- Vertraulich: Pläne, Baustellenfotos, Projektstruktur, Kommentare.
- Personenbezogen: Benutzer, Rollen, Projektmitgliedschaften, Audit-Logs, potenziell Foto- und Kommentarinhalte.
- Besonders schützenswert: nur falls Fotos oder Kommentare entsprechende Inhalte zeigen; nicht gezielt erfassen.

## Personenbezogene Daten

- Name, E-Mail, Organisation, Rolle.
- Projektmitgliedschaften.
- Upload-, Ansichts-, Download- und Änderungsaktionen.
- Kommentare.
- Potenziell Personen auf Fotos.
- Später Stimme und Transkript bei Sprachkommentaren.

## Besonders schützenswerte Daten

Die Anwendung soll keine besonders schützenswerten Daten gezielt erfassen. Baustellenfotos können dennoch sensible Situationen enthalten und sind deshalb restriktiv zu schützen.

## Rollen und Berechtigungen

- Systemadministrator.
- Organisationsadministrator.
- Projektleiter.
- Bauleiter.
- Planer.
- Gewerk-Benutzer.
- Betrachter.

Berechtigungen gelten pro Organisation, Projekt und Ressource.

## Authentifizierung

- Geschützte Bereiche nur mit gültiger Anmeldung.
- Passwort-Reset sicher umsetzen.
- Admin-2FA prüfen.
- Laravel Sanctum für First-Party-PWA-Authentifizierung verwenden.
- Token-Strategie für spätere native Apps erst bei Bedarf prüfen.

## Autorisierung

- Serverseitig für jede geschützte API-Aktion.
- Kein Vertrauen in Frontend-Zustand.
- Projekt-, Plan-, Foto-, Kommentar- und Downloadrechte getrennt prüfen.

## Session-Handling

- Session- oder Token-Laufzeiten begrenzen.
- Abmeldung und Token-Invalidierung unterstützen.
- Fehlerfälle ohne interne Details zurückgeben.

## Input Validation

- Alle API-Eingaben serverseitig validieren.
- Datei-Metadaten, Planpositionen und Rollenänderungen besonders prüfen.
- Ungültige Koordinaten, Dateitypen und Berechtigungen ablehnen.

## File Upload Security

- Private Buckets.
- Keine öffentlichen Direktlinks.
- Dateityp und Größe prüfen.
- Datei-Metadaten mit Besitzer, Projekt und Zugriffskontext speichern.
- Malware-Prüfung für spätere produktive Härtung bewerten.

## API Security

- Auth für geschützte Endpunkte.
- Autorisierung pro Ressource.
- Konsistente Fehlerantworten.
- Rate Limiting prüfen.
- Keine sensiblen Daten in API-Antworten.

## Webhook Security

Webhooks sind nicht MVP. Falls später umgesetzt:

- Signaturen prüfen.
- Replay-Schutz vorsehen.
- Timeouts und Retries begrenzen.
- Payloads validieren.

## Secrets Management

- Keine Secrets im Repository.
- `.env.example` enthält nur Platzhalter.
- Produktive Secrets über sichere Umgebungskonfiguration verwalten.

## Logging-Regeln

- Keine Passwörter, Tokens, Secrets oder vollständigen sensiblen Payloads loggen.
- Personenbezogene Logdaten minimieren.
- Audit-Logs bewusst und zweckgebunden führen.

## Fehlermeldungen

- Benutzerfreundlich und ohne Stacktraces.
- Keine internen Pfade, SQL-Details oder Storage-Details ausgeben.
- Sicherheitsrelevante Fehler generisch halten.

## Datenaufbewahrung

- Audit-Retention ist offen und vor produktiver Nutzung festzulegen.
- Projekt- und Dateiaufbewahrung pro Kunde/Projekt definieren.
- Backups in Retention-Konzept einbeziehen.

## Löschkonzept

- Projektarchivierung und spätere Löschung trennen.
- Personenbezogene Daten nach Zweckende löschen oder anonymisieren, soweit rechtlich und fachlich möglich.
- Datei-Löschung und Datenbank-Löschung konsistent behandeln.

## Export- und Auskunftsfähigkeit

- Projektbezogener Export ist konzeptionell vorzubereiten.
- Auskunft über personenbezogene Daten muss bei produktiver Nutzung organisatorisch und technisch möglich sein.

## Externe Dienstleister

- Hosting, Storage, Mail und spätere KI-Anbieter vor Nutzung prüfen.
- Datenstandort Schweiz oder EU bevorzugen.
- Auftragsbearbeitung und Datenübertragung dokumentieren.

## Schweizer DSG

Relevant wegen Benutzerkonten, Rollen, Audit-Logs, Fotos, Kommentaren und möglichen Personenbezügen in Bauprojekten.

## DSGVO

Zu prüfen bei EU-Benutzern, EU-Projekten, EU-Auftraggebern, EU-Hosting oder EU-Dienstleistern.

## Security Review Checklist

- [x] Authentifizierung als Laravel Sanctum geplant.
- [ ] Autorisierung serverseitig umgesetzt.
- [ ] Rollen und Rechte getestet.
- [ ] Eingaben validiert.
- [ ] Dateiablage privat.
- [ ] Keine Secrets im Repository.
- [ ] Logs ohne sensible Daten.
- [ ] Fehlerantworten ohne interne Details.
- [ ] Rate Limiting geprüft.
- [ ] Externe Dienste geprüft.

## Privacy Review Checklist

- [x] Personenbezogene Daten identifiziert.
- [x] Datenminimierung geprüft.
- [x] Zwecke dokumentiert.
- [ ] Lösch- und Aufbewahrungsregeln final definiert.
- [ ] Export-/Auskunftsfähigkeit geprüft.
- [ ] Externe Dienstleister final dokumentiert.
- [ ] Hosting Schweiz/EU geprüft.
- [x] KI-Verarbeitung als nicht-MVP markiert.

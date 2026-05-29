# Projektdefinition

## Projektname

BauDoc - planbasierte Baufortschrittsdokumentation.

## Kurzbeschreibung

BauDoc dokumentiert Baufortschritt mit Fotos, Plänen, Planpositionen, Räumen, Gewerken, Kommentaren, Rollen, Berechtigungen und Audit-Logs. Die Anwendung wird als Web-App und Mobile/PWA geplant.

## Problemstellung

Baufortschritt wird häufig über lose Fotogalerien, Chats oder Ordnerstrukturen dokumentiert. Dadurch fehlen Planbezug, Raumbezug, Gewerk, Zeitpunkt, Verantwortlichkeit, Berechtigungen und Nachvollziehbarkeit.

## Ziel der Software

Die Software soll Baufortschritte strukturiert erfassen, verorten, schützen, filtern und nachvollziehbar auditieren. Der MVP konzentriert sich auf Foto, Plan, Ort, Zeit, Gewerk, Rechte, Chronologie und Audit.

## Zielgruppe

- Bauherren und Eigentümervertretungen.
- Generalunternehmer und Bauleitungen.
- Projektleiter.
- Planer und Fachplaner.
- Gewerke und ausführende Unternehmen.
- Qualitäts-, Sicherheits- und Dokumentationsverantwortliche.

## Hauptnutzerrollen

- Systemadministrator.
- Organisationsadministrator.
- Projektleiter.
- Bauleiter.
- Planer.
- Gewerk-Benutzer.
- Betrachter.

## Kernprozesse

- Anmeldung und rollenbasierter Zugriff.
- Projekt, Gebäude, Etage, Raum und Zone verwalten.
- Pläne hochladen, kategorisieren und versionieren.
- Fotos mobil aufnehmen oder hochladen.
- Fotos mit Projektstruktur, Gewerk und Planposition verknüpfen.
- Chronologische Galerie filtern.
- Kommentare erfassen.
- Zugriffe und Änderungen auditieren.
- Benutzer bei neuer Planversion benachrichtigen.

## Kernfunktionen

- Laravel API als Backend-Ziel.
- Web-App/Mobile PWA als Frontend-Ziel.
- PostgreSQL als relationale Datenbank.
- Private S3-kompatible Dateiablage oder MinIO lokal.
- Redis und Laravel Queues für asynchrone Aufgaben.
- Rollen- und Berechtigungsmodell.
- Audit-Log für kritische Aktionen.

## Nicht-Ziele

- Native Mobile App.
- Offline-Synchronisation.
- 360-Grad-Viewer im MVP.
- KI-Bildanalyse im MVP.
- Semantische Suche im MVP.
- Vollständiges Mängelmanagement.
- Vollständiges Bautagebuch.
- BIM-/IFC-Anbindung.
- Produktive Drittprodukt-Integrationen.

## Datenarten

- Benutzer- und Organisationsdaten.
- Rollen, Rechte und Projektmitgliedschaften.
- Projekt-, Gebäude-, Etagen-, Raum- und Zonendaten.
- Pläne, Planversionen und Planmetadaten.
- Fotos, Datei-Metadaten, Planpositionen und Kommentare.
- Audit-Logs und Benachrichtigungen.
- Spätere KI-Metadaten, Sprachkommentare und Transkripte.

## Externe Schnittstellen

- E-Mail-Versand für Benachrichtigungen.
- S3-kompatibler Object Storage oder MinIO.
- Spätere Integrationen über Webhooks oder Adapter.
- Späterer KI-Processing-Layer nur nach separater Datenschutzprüfung.

## Sicherheitsanforderungen

- Authentifizierung für geschützte Bereiche.
- Serverseitige Autorisierung pro Organisation, Projekt und Ressource.
- Private Dateiablage ohne öffentliche Direktlinks.
- Servervalidierung aller Eingaben.
- Auditierbarkeit kritischer Aktionen.
- Secrets nur über Umgebungskonfiguration.

## Datenschutzanforderungen

- Schweizer DSG beachten.
- DSGVO-Risiken bei EU-Bezug prüfen.
- Datenminimierung.
- Zweckbindung.
- Lösch- und Aufbewahrungsregeln.
- Keine produktiven personenbezogenen Daten in Tests oder Dokumentation.
- Externe Dienstleister vor Nutzung prüfen.

## Performance-Anforderungen

- Mobile Aufnahmeflows müssen auf Baustellen-Smartphones nutzbar bleiben.
- Galerie und Filter sollen für längere Projekthistorien ausgelegt werden.
- Datei-Uploads und Bildverarbeitung laufen kontrolliert und bei Bedarf asynchron.

## Verfügbarkeitsanforderungen

- MVP zunächst lokal und in einer sicheren Betriebsumgebung planbar.
- Späterer Betrieb benötigt Backup, Restore, Monitoring und Queue-Betrieb.

## UI-/UX-Anforderungen

- Arbeitswerkzeug statt Marketingoberfläche.
- Mobile-first für Aufnahme.
- Desktop für Planviewer, Galerie und Administration.
- Keine horizontalen Scrollflächen auf mobilen Geräten.
- Barrierefreiheit und sichtbare Fokuszustände.

## Geräte und Plattformen

- Moderne Desktop-Browser.
- Moderne mobile Browser als PWA-Ziel.
- Native Apps sind nicht Teil des MVP.

## Erfolgsdefinition

- Ein berechtigter Nutzer kann ein Foto erfassen, einem Projekt, Ort, Gewerk und optional einer Planversion zuordnen.
- Ein unberechtigter Nutzer kann fremde Projekte, Pläne, Bilder und Datei-URLs nicht öffnen.
- Planpositionen bleiben trotz Planupdates historisch nachvollziehbar.
- Galerie, Filter und Audit machen den Baufortschritt nachvollziehbar.

## Offene Fragen

- Frontend-Stack finalisieren: Vue 3, React oder Inertia.
- Lizenzmodell festlegen.
- Audit-Retention final bestimmen.
- IP-Adresse und User-Agent im Audit rechtlich und fachlich bewerten.
- Hosting Schweiz oder EU konkret entscheiden.

## Risiken

- MVP wird zu groß.
- Rechte werden versehentlich nur im Frontend geprüft.
- Öffentliche Datei-URLs führen zu Datenabfluss.
- Planpositionen werden ohne feste Planversion modelliert.
- KI-Funktionen werden zu früh aktiviert.

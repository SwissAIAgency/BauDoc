# Leistungskatalog

## Hauptquelle

Die fachliche Hauptquelle ist `docs/references/leistungskatalog_baufortschritt_dokumentation.html`. Dieses Dokument fasst Phase-1-relevante Module zusammen und dient als kanonische Arbeitsgrundlage im Repository.

## Modulübersicht

### Authentifizierung und Rollen

#### Zweck
Nutzer anmelden, Sessions oder Tokens verwalten und Zugriff nach Organisation, Projekt und Rolle steuern.

#### Nutzerrollen
Systemadministrator, Organisationsadministrator, Projektleiter, Bauleiter, Planer, Gewerk-Benutzer, Betrachter.

#### Funktionen
Login, Logout, Passwort-Reset, Rollenmodell, projektbezogene Mitgliedschaften, serverseitige Berechtigungsprüfung.

#### Eingaben
E-Mail, Passwort, Rollen, Projektmitgliedschaften.

#### Ausgaben
Session oder Token, Benutzerkontext, erlaubte Aktionen.

#### Fachliche Regeln
Berechtigungen gelten pro Organisation, Projekt und Ressource.

#### Sicherheitsanforderungen
Keine reine Frontend-Autorisierung. Fehler dürfen keine internen Details verraten.

#### Datenschutzanforderungen
Benutzerdaten und Rollen sind personenbezogen und zweckgebunden zu speichern.

#### Fehlerfälle
Ungültige Anmeldung, fehlende Rolle, Zugriff auf fremde Projekte, abgelaufene Session.

#### Akzeptanzkriterien
Ungültige und unberechtigte Zugriffe werden serverseitig blockiert.

#### Testszenarien
Login erfolgreich, Login fehlgeschlagen, Zugriff erlaubt, Zugriff verboten, fehlender Token, falsche Projektrolle.

### Projektstruktur

#### Zweck
Organisationen, Projekte, Gebäude, Etagen, Räume, Zonen, Gewerke und Arbeitstypen verwalten.

#### Nutzerrollen
Organisationsadministrator, Projektleiter, Bauleiter, Planer.

#### Funktionen
Projekt anlegen, Projekt archivieren, Struktur bearbeiten, Mitglieder zuweisen, Gewerke verwalten.

#### Eingaben
Projektstammdaten, Gebäude, Etagen, Räume, Zonen, Gewerke, Mitglieder.

#### Ausgaben
Strukturierte Projekt- und Ortsdaten für Fotos, Pläne und Filter.

#### Fachliche Regeln
Fotos und Planpositionen müssen eindeutig einer Projektstruktur zuordenbar sein.

#### Sicherheitsanforderungen
Projektzugriff wird serverseitig geprüft.

#### Datenschutzanforderungen
Projektmitgliedschaften sind personenbezogen.

#### Fehlerfälle
Doppelte Namen, fehlende Projektberechtigung, Archivierung mit aktiven Abhängigkeiten.

#### Akzeptanzkriterien
Ein Projektleiter kann Projektstruktur und Mitglieder nachvollziehbar pflegen.

#### Testszenarien
Projekt anlegen, Mitglied zuweisen, fremden Zugriff blockieren, Archivierung prüfen.

### Planverwaltung

#### Zweck
Pläne projektbezogen hochladen, kategorisieren und versionieren.

#### Nutzerrollen
Projektleiter, Bauleiter, Planer.

#### Funktionen
Plan-Upload, Planversion erstellen, Plan anzeigen, Plan kategorisieren, Benachrichtigung bei neuer Version.

#### Eingaben
Plan-Datei, Kategorie, Version, Beschreibung.

#### Ausgaben
Planmetadaten, Planversionen, private Anzeige- oder Downloadzugriffe.

#### Fachliche Regeln
Planversionen sind unveränderliche Referenzen für historische Planpositionen.

#### Sicherheitsanforderungen
Pläne liegen privat und sind nicht über öffentliche Direktlinks abrufbar.

#### Datenschutzanforderungen
Pläne können vertrauliche Gebäudedaten enthalten.

#### Fehlerfälle
Falscher Dateityp, fehlende Berechtigung, ersetzte Planversion ohne Historie.

#### Akzeptanzkriterien
Neue Planversionen zerstören keine bestehenden Foto-Plan-Bezüge.

#### Testszenarien
Plan hochladen, Version anlegen, alten Marker erhalten, unberechtigten Download blockieren.

### Foto- und Dateiablage

#### Zweck
Fotos und Datei-Metadaten sicher speichern und mit Projekt, Ort, Gewerk und Plan verknüpfen.

#### Nutzerrollen
Bauleiter, Projektleiter, Gewerk-Benutzer, Planer.

#### Funktionen
Fotoaufnahme, Upload, private Speicherung, Thumbnail-Vorbereitung, Metadaten, Datei-Zugriff.

#### Eingaben
Bilddatei, Aufnahmezeit, Projektstruktur, Gewerk, Kommentar, Planposition.

#### Ausgaben
Fotoeintrag, Datei-Metadaten, private Datei-URL oder kontrollierter Stream.

#### Fachliche Regeln
Fotos mit Planmarker referenzieren eine konkrete Planversion.

#### Sicherheitsanforderungen
Keine öffentlichen Datei-URLs. Zugriff vor Ansicht und Download prüfen.

#### Datenschutzanforderungen
Fotos können Personen, private Bereiche oder vertrauliche Informationen zeigen.

#### Fehlerfälle
Zu große Datei, falscher Dateityp, fehlende Zuordnung, Zugriff ohne Recht.

#### Akzeptanzkriterien
Ein Foto kann berechtigt hochgeladen, verortet, angezeigt und auditiert werden.

#### Testszenarien
Upload erlaubt, Upload abgelehnt, fremden Zugriff blockieren, Datei privat halten.

### Planpositionen

#### Zweck
Fotos relativ zu einer konkreten Planversion verorten.

#### Nutzerrollen
Bauleiter, Projektleiter, Gewerk-Benutzer.

#### Funktionen
Marker setzen, Koordinaten speichern, Richtung optional speichern, Position anzeigen.

#### Eingaben
Planversion, relative X-/Y-Koordinaten, optional Richtung.

#### Ausgaben
Nachvollziehbare Planposition für Foto und Galerie.

#### Fachliche Regeln
Koordinaten sind relativ zum Plan, nicht absolute Bildschirmkoordinaten.

#### Sicherheitsanforderungen
Plan- und Fotozugriff müssen beide erlaubt sein.

#### Datenschutzanforderungen
Positionen können Rückschlüsse auf Arbeiten und Personen zulassen.

#### Fehlerfälle
Marker ohne Planversion, Koordinaten außerhalb des Plans, fehlende Rechte.

#### Akzeptanzkriterien
Planposition bleibt bei späteren Planupdates historisch korrekt.

#### Testszenarien
Marker speichern, Marker anzeigen, ungültige Koordinaten ablehnen, fremde Planposition blockieren.

### Galerie, Filter und Kommentare

#### Zweck
Baufortschritt chronologisch und fachlich durchsuchbar machen.

#### Nutzerrollen
Projektleiter, Bauleiter, Planer, Gewerk-Benutzer, Betrachter.

#### Funktionen
Chronologische Galerie, Filter nach Zeitraum, Ort und Gewerk, Kommentare anzeigen und erfassen.

#### Eingaben
Filter, Kommentartext, Projektauswahl.

#### Ausgaben
Gefilterte Fotoansichten, Kommentarverlauf, Kontextinformationen.

#### Fachliche Regeln
Berechtigungen beeinflussen sichtbare Fotos und Kommentare.

#### Sicherheitsanforderungen
Filter dürfen keine fremden Daten offenlegen.

#### Datenschutzanforderungen
Kommentare können personenbezogene Inhalte enthalten.

#### Fehlerfälle
Leere Filterergebnisse, unberechtigter Kommentarzugriff, ungültige Filter.

#### Akzeptanzkriterien
Nutzer sehen nur berechtigte Fotos und können nach Kernkriterien filtern.

#### Testszenarien
Zeitraumfilter, Ortsfilter, Gewerkfilter, Kommentarberechtigung, leere Zustände.

### Audit und Benachrichtigung

#### Zweck
Kritische Aktionen nachvollziehbar machen und relevante Nutzer informieren.

#### Nutzerrollen
Administratoren, Projektleiter, Bauleiter.

#### Funktionen
Audit-Events für Login, Upload, Ansicht, Download, Planansicht und Rechteänderung; E-Mail bei neuer Planversion.

#### Eingaben
Aktion, Benutzer, Ressource, Zeitpunkt, Projektkontext.

#### Ausgaben
Audit-Log, Benachrichtigungseintrag, Versandstatus.

#### Fachliche Regeln
Audit ist Sicherheitsfunktion, nicht nur Reporting.

#### Sicherheitsanforderungen
Audit-Logs dürfen nicht manipulierbar sein und sollen sensible Daten minimieren.

#### Datenschutzanforderungen
Audit-Logs sind personenbezogen und brauchen Retention-Regeln.

#### Fehlerfälle
Nicht protokollierte kritische Aktion, zu umfangreiche Logs, Versandfehler.

#### Akzeptanzkriterien
Kritische Aktionen sind nachvollziehbar und datensparsam dokumentiert.

#### Testszenarien
Audit bei Upload, Audit bei Zugriff, Rechteänderung auditieren, Benachrichtigungsversand simulieren.

## Priorisierung

- Muss: Auth, Rollen, Projektstruktur, Pläne, Fotos, Planpositionen, Galerie, Filter, private Dateien, Audit.
- Soll: Mandantenfähigkeit vorbereiten, 2FA prüfen, getrennte Downloadrechte, Exportkonzept, MinIO lokal.
- Kann: PDF/ZIP-Export, QR-Code, Mängel-Light, Sprachkommentare, KI, Webhooks, Integrationslogs.

## Abhängigkeiten zwischen Modulen

- Auth und Rollen vor allen geschützten Modulen.
- Projektstruktur vor Plänen, Fotos und Galerie.
- Planversionen vor Planpositionen.
- Private Dateiablage vor produktivem Upload.
- Audit parallel zu kritischen Aktionen.

## Schnittstellen zu anderen Systemen

- S3-kompatibler Object Storage oder MinIO.
- E-Mail-Dienst.
- Spätere Webhooks und Drittprodukt-Adapter.
- Späterer KI-Service.

## Nicht erlaubte Verhaltensweisen

- Öffentliche Datei-URLs.
- Planmarker ohne Planversion.
- Rechteprüfung nur im Frontend.
- Produktive Drittintegrationen im MVP.
- KI-Verarbeitung ohne separate Freigabe.

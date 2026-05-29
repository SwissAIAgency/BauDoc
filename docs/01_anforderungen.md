# 01 Anforderungen

## Muss-Anforderungen

- Login und Logout.
- API-Authentifizierung für Web und Mobile.
- Rollenmodell für Admin, Projektleiter, Bauleiter, Planer, Gewerk und Betrachter.
- Serverseitige Berechtigungsprüfung für alle geschützten Ressourcen.
- Projekte erstellen, bearbeiten und archivieren.
- Gebäude, Etagen, Räume und optionale Zonen verwalten.
- Gewerke und Arbeitstypen verwalten.
- Pläne pro Projekt hochladen, kategorisieren und versionieren.
- Planviewer für PDF/Bild.
- Fotoaufnahme und Foto-Upload über Web/PWA.
- Fotozuordnung zu Projekt, Gebäude, Etage, Raum, Gewerk und Plan.
- Planpunkt setzen und relativ zum Plan speichern.
- Textkommentare.
- Chronologische Galerie.
- Filter nach Zeitraum, Ort und Gewerk.
- Private Dateiablage ohne öffentliche Direktlinks.
- Audit-Log für Login, Upload, Ansicht, Plandownload, Planansicht und Rechteänderungen.
- E-Mail-Benachrichtigung bei neuer Planversion.

## Sollte-Anforderungen

- Mandantenfähigkeit von Anfang an vorbereiten.
- 2-Faktor-Authentifizierung für Admins prüfen.
- Downloadrechte separat von Ansichtsrechten steuern.
- Projektmitglieder mit Rollen und Gewerken verwalten.
- Zeitlich begrenzte Anzeige- oder Download-URLs.
- Retention-Regeln für Audit-Logs definieren.
- Datenexport je Projekt konzeptionell vorbereiten.
- MinIO für lokale Entwicklung vorbereiten.

## Kann-Anforderungen

- PDF- und ZIP-Export.
- QR-Code pro Raum oder Planbereich.
- Mängel- und Issue-Light.
- Sprachkommentare und Transkription.
- KI-Bildbeschreibung.
- Semantische Suche.
- Vektorsuche mit pgvector.
- Webhook-Events.
- Integrationslogs für Drittprodukte.

## Nicht-Ziele Version 1

- Native Mobile App.
- Offline-Synchronisation.
- 360-Grad-Viewer.
- Vollständiges Mängelmanagement.
- Vollständiges Bautagebuch.
- BIM-/IFC-Anbindung.
- Automatische Planverortung.
- Automatische Fortschrittserkennung.
- Produktive Drittprodukt-Integrationen.
- KI-Ausgaben als rechtlich verbindliche Wahrheit.

## Akzeptanzkriterien Version 1

- Geschützte API-Endpunkte sind ohne gültige Anmeldung nicht erreichbar.
- Ein Gewerk-Benutzer sieht nur freigegebene Projekte, Pläne und Bilder.
- Direkte API-Aufrufe auf fremde Daten werden blockiert.
- Ein Projektleiter kann ein Projekt mit Grunddaten anlegen und Benutzer zuweisen.
- Ein Bild kann mindestens Projekt, Gebäude, Etage und Raum zugeordnet werden.
- Pläne und Bilder können gewerkespezifisch gefiltert und berechtigt werden.
- Ein Bild mit Planmarkierung verweist auf eine konkrete Planversion.
- Fotos sind chronologisch sichtbar und nach Zeitraum, Ort und Gewerk filterbar.
- Dateien können privat gespeichert werden.
- Es ist nachvollziehbar, wer ein Bild hochgeladen oder angeschaut hat.
- Ein unberechtigter Benutzer kann Datei-URLs nicht direkt öffnen.

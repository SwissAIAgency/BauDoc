# 00 Projektdefinition

## Projektname

Planbasierte Baufortschrittsdokumentation

## Kurzbeschreibung

Die Applikation dokumentiert Baufortschritte mit normalen Fotos und Panoramafotos. Bilder werden strukturiert Projekten, Gebäuden, Etagen, Räumen, Planpositionen, Gewerken und Arbeiten zugeordnet. Pläne werden verwaltet, versioniert und nach Plangattungen organisiert; beim Erfassen eines Bildes kann der Aufnahmepunkt direkt auf dem Plan markiert werden. Dadurch entsteht eine chronologische, ortsbezogene und fachlich nachvollziehbare Baudokumentation.

## Hauptquelle

- `docs/references/leistungskatalog_baufortschritt_dokumentation.html`

## Zielgruppe

- System Admins
- Organisations Admins
- Projektleiter
- Bauleiter
- Planer / Architekten
- Gewerk-Benutzer
- Externe Betrachter mit kontrollierter Einsicht

## Problem

Baufortschritte werden häufig als unstrukturierte Bilder, Chatverläufe oder lose Ordner dokumentiert. Dadurch sind Planbezug, Raumbezug, Gewerk, Zeitpunkt, Verantwortlichkeit, Zugriff und spätere Nachvollziehbarkeit schwach. Historische Bilder werden unzuverlässig, wenn sie nicht auf konkrete Planversionen und relative Planpositionen verweisen.

## Nutzenversprechen

- Baufortschritt wird nachvollziehbar und prüfbar dokumentiert.
- Fotos sind über Plan, Raum, Zeitraum und Gewerk auffindbar.
- Planänderungen werden kontrolliert kommuniziert.
- Zugriffe und kritische Aktionen werden revisionsnah protokolliert.
- Spätere KI-Suche auf Bildinhalt, Kommentaren und Transkripten wird vorbereitet.

## Kernfunktionen Version 1

1. Login und Rollenmodell.
2. Projektverwaltung.
3. Gebäude-, Etagen- und Raumstruktur.
4. Gewerke und Arbeitstypen.
5. Planverwaltung mit Versionen.
6. Planviewer für PDF/Bild.
7. Fotoaufnahme über mobile Web-App.
8. Foto-Upload über Web-App.
9. Fotozuordnung zu Projekt, Raum, Gewerk und Plan.
10. Planpunkt setzen.
11. Textkommentare.
12. Chronologische Galerie.
13. Filter nach Zeitraum, Ort und Gewerk.
14. Private Dateiablage.
15. Audit-Log.
16. E-Mail-Benachrichtigung bei neuer Planversion.

## Spätere Erweiterungen

- Sprachkommentare und Transkription.
- KI-Bildanalyse.
- Semantische Suche.
- PDF- und ZIP-Export.
- QR-Code pro Raum oder Planbereich.
- Mängel- und Issue-Light.
- Drittprodukt-Integrationen.
- BIM-/IFC-Anbindung.
- Automatische Planverortung.
- Automatische Fortschrittserkennung.

## Nicht-Ziele

Diese Dinge werden bewusst nicht im MVP gebaut:

- Native Mobile App.
- Offline-Synchronisation.
- 360-Grad-Viewer.
- Vollständiges Mängelmanagement.
- Vollständiges Bautagebuch.
- BIM-/IFC-Anbindung.
- Automatische Planverortung.
- Automatische Fortschrittserkennung.
- Drittprodukt-Integrationen.
- Vollständige Baumanagement-Plattform.
- Reality-Capture-System.

## Datenarten

| Datenart | Beispiel | Personenbezogen? | Sensibel? | Zweck |
|---|---|---:|---:|---|
| Benutzerstammdaten | Name, E-Mail, Organisation, Rolle | Ja | Nein | Anmeldung, Rechte, Verantwortlichkeit |
| Projektstruktur | Projekt, Gebäude, Etage, Raum, Zone | Nein | Nein | Ordnung und Filterung |
| Gewerkdaten | Elektro, Sanitär, Heizung, Arbeitstyp | Teilweise | Nein | Fachliche Zuordnung und Berechtigung |
| Fotos und Panoramen | Baustellenbilder, Thumbnails | Möglich | Möglich | Baufortschritt dokumentieren |
| Pläne und Planversionen | Architekturplan, Sanitärplan, PDF/Bild | Möglich | Möglich | Ortsreferenz und Historie |
| Planpositionen | X/Y-Koordinate, Richtung, Planversion | Nein | Nein | Verortung der Aufnahme |
| Kommentare | Textkommentare am Foto | Möglich | Möglich | Kontext und fachliche Erklärung |
| Audit-Logs | Login, Upload, Ansicht, Rechteänderung | Ja | Nein | Nachvollziehbarkeit und Sicherheit |
| Benachrichtigungen | neue Planversion per E-Mail | Ja | Nein | operative Kommunikation |
| KI-Metadaten später | Tags, Beschreibung, Embeddings | Möglich | Möglich | semantische Suche |

## UI-/Brand-Anforderungen

- Logo: noch offen, nur freigegebene Logo-Dateien verwenden.
- Farben: ruhige Arbeitsoberfläche, dunkles Dokumentationsschema aus Referenz möglich; konkrete Produktfarben in `docs/13_ui_brand_guidelines.md`.
- Schriften: Systemschrift oder freigegebene UI-Schrift, hohe Lesbarkeit auf Baustelle.
- Button-Stil: klare Primary/Secondary/Danger-Varianten.
- Layout-Prinzip: mobile-first Aufnahmefluss, dichter Desktop-Arbeitsbereich für Planviewer, Galerie und Filter.
- Mobile-Anforderungen: PWA zuerst, Kamera-Upload, klare Touch-Ziele, kein horizontaler Scroll.

## Technische Anforderungen

- Frontend: Mobile PWA / Web-App; konkrete Entscheidung zwischen Vue 3, React oder Inertia in Architekturphase finalisieren.
- Backend: Laravel API.
- Datenbank: PostgreSQL, später optional pgvector.
- Auth: API-Authentifizierung für Web und Mobile, Login, Logout, Token, Passwort-Zurücksetzen.
- Hosting: Schweiz oder EU prüfen.
- Dateien: private S3-kompatible Ablage oder MinIO lokal.
- Queue: Redis + Laravel Queues.
- Externe APIs: keine im MVP, Integrationsgrundlage vorbereiten.
- KI/RAG/Voice: späterer separater Processing Layer, nicht MVP.

## Datenschutz / Compliance

- Schweizer DSG/nDSG relevant: Ja.
- DSGVO-Risiko bei EU-Bezug: Ja, falls EU-Personen, EU-Projekte oder EU-Hosting betroffen sind.
- Besondere Risiken: Baustellenbilder können Personen, private Bereiche, Sicherheitsmängel oder vertrauliche Pläne enthalten.
- Datenlöschung erforderlich: Ja.
- Exportfunktion erforderlich: mittel- bis langfristig ja, im MVP mindestens Konzept.

## Erfolgskriterien

Das Projekt ist erfolgreich, wenn:

1. Ein berechtigter Benutzer ein Foto einem Projekt, Raum, Gewerk, Plan und einer Planposition zuordnen kann.
2. Ein Bild bei Planmarkierung immer auf eine konkrete Planversion referenziert.
3. Berechtigungen serverseitig greifen und direkte Datei-URLs nicht öffentlich zugänglich sind.
4. Projektleiter chronologisch und nach Zeitraum, Ort und Gewerk filtern können.
5. Audit-Logs Upload, Ansicht, Download und Rechteänderungen nachvollziehbar machen.

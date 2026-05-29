# 02 Architektur

## Architekturziel

Die Applikation wird als API-first-System aufgebaut: eine modulare Laravel-API stellt Authentifizierung, Rollen, Projektstruktur, Pläne, Fotos, Planpositionen, Audit-Log und Benachrichtigungen bereit. Die Web-App/PWA konsumiert diese API und bietet mobile Fotoaufnahme sowie Desktop-Ansichten für Planviewer, Galerie, Filter und Administration.

## Referenzarchitektur

```text
Mobile PWA / Web-App
        |
        | HTTPS / JSON API
        v
Laravel Backend
        |
        |-- Authentifizierung
        |-- Rollen und Berechtigungen
        |-- Projektverwaltung
        |-- Planverwaltung
        |-- Fotoverwaltung
        |-- Planpositionen
        |-- Audit-Log
        |-- Benachrichtigungen
        |-- KI-Job-Dispatcher
        |
        v
PostgreSQL + optional pgvector
        |
        |-- Relationale Projektdaten
        |-- Planpositionen
        |-- Rechte
        |-- Audit
        |-- Such- und KI-Metadaten
        |
        v
S3-kompatibler Object Storage
        |
        |-- Fotos
        |-- Thumbnails
        |-- Panoramen
        |-- Pläne
        |-- Audiodateien
        |
        v
Queue / Worker / KI-Service
        |
        |-- Bildanalyse
        |-- Transkription
        |-- Embeddings
        |-- Benachrichtigungen
```

## Technische Entscheidungen

| Bereich | Empfehlung | Status |
|---|---|---|
| Backend | Laravel API | festgelegt durch Leistungskatalog |
| Frontend | Vue 3, React oder Inertia | offen, vor Implementierung entscheiden |
| Mobile | PWA zuerst | festgelegt |
| Datenbank | PostgreSQL | festgelegt |
| Vektorsuche | pgvector später | vorbereitet, nicht MVP |
| Dateien | S3-kompatibler Object Storage oder MinIO lokal | festgelegt |
| Queue | Redis + Laravel Queues | festgelegt |
| KI | separater Processing Layer | später |

## Backend-Module

- Authentifizierung.
- Rollen und Berechtigungen.
- Organisationen und Mandanten.
- Projektverwaltung.
- Gebäude, Etagen, Räume und Zonen.
- Gewerke und Arbeitstypen.
- Planverwaltung und Planversionierung.
- Fotoverwaltung und Datei-Metadaten.
- Planpositionen.
- Kommentare.
- Audit-Log.
- Benachrichtigungen.
- KI-Job-Dispatcher als spätere Erweiterung.
- Integrationsgrundlage als spätere Erweiterung.

## Frontend-Module

- Login und Passwort-Zurücksetzen.
- Projektübersicht.
- Projektstrukturverwaltung.
- Planverwaltung und Planviewer.
- Mobile Aufnahmeoberfläche.
- Foto-Upload.
- Planmarker setzen.
- Chronologische Galerie.
- Filter nach Zeitraum, Ort, Gewerk und Berechtigung.
- Kommentaransicht.
- Admin-Ansichten für Rollen und Audit-Logs.

## Datenflüsse

- Anmeldung: Benutzer authentifiziert sich, erhält Session/Token, danach serverseitige Rechteprüfung je Ressource.
- Fotoaufnahme: Bild wird aufgenommen, Metadaten werden erfasst, Datei privat gespeichert, Datenbankeintrag angelegt, Audit-Event erzeugt.
- Planposition: Nutzer setzt Marker auf Planversion, Koordinaten werden relativ zum Plan gespeichert.
- Planversion: neue Version erzeugt unveränderliche Referenz, Benachrichtigung wird per Queue versendet.
- Ansicht/Download: Backend prüft Berechtigung, erzeugt zeitlich begrenzte URL oder streamt Datei, Audit-Event wird geschrieben.
- KI später: Upload erzeugt Job, KI-Service analysiert asynchron, Ergebnis wird als automatisch generiert gespeichert.

## Umsetzungsreihenfolge

1. Projektfundament, Repository-Regeln und lokale Basisdienste.
2. Laravel-Basis, Auth und Rollen.
3. Datenmodell und Migrationen für Organisation, Projekte, Räume, Gewerke, Pläne, Fotos und Audit.
4. Private Dateiablage und Upload-Pipeline.
5. Planviewer und Planpositionen.
6. Mobile Aufnahmeoberfläche.
7. Galerie, Filter und Kommentare.
8. Audit-Ansichten und Benachrichtigung.
9. QA, Datenschutz, Security-Härtung und Release-Vorbereitung.

## Risiken

- MVP wird zu gross.
- Planpositionen werden falsch oder ohne Planversion modelliert.
- Rechte werden nur im Frontend geprüft.
- Öffentliche Datei-URLs führen zu Datenabfluss.
- KI-Funktionen werden zu früh gebaut.
- Drittintegrationen werden vor stabilem Kern gestartet.

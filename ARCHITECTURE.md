# Architektur

## Architekturziel

BauDoc wird als API-first-System aufgebaut. Eine modulare Laravel-API stellt Authentifizierung, Rollen, Projektstruktur, Pläne, Fotos, Planpositionen, Audit-Log und Benachrichtigungen bereit. Eine Web-App/Mobile PWA konsumiert diese API.

## Systemübersicht

```text
Web-App / Mobile PWA
        |
        | HTTPS / JSON API
        v
Laravel API
        |
        |-- Authentifizierung
        |-- Rollen und Berechtigungen
        |-- Projektstruktur
        |-- Planverwaltung
        |-- Fotoverwaltung
        |-- Planpositionen
        |-- Kommentare
        |-- Audit-Log
        |-- Benachrichtigungen
        v
PostgreSQL
        |
        |-- relationale Projektdaten
        |-- Rechte und Mitgliedschaften
        |-- Planpositionen
        |-- Audit
        v
S3-kompatibler Object Storage / MinIO
        |
        |-- Fotos
        |-- Pläne
        |-- Thumbnails
        |-- spätere Panoramen und Audiodateien
        v
Redis / Queue Worker
        |
        |-- Benachrichtigungen
        |-- spätere Bildverarbeitung
        |-- spätere KI-Jobs
```

## Frontend-Struktur

- Mobile-first Aufnahmefluss.
- Desktop-Ansichten für Planviewer, Galerie, Filter und Administration.
- Keine Businesslogik direkt in UI-Komponenten.
- API-Zugriffe über klar gekapselte Client-Services.
- Konkreter Frontend-Stack bleibt offen bis zur Technologieentscheidung in Phase 2.

## Backend-Struktur

- Laravel API als Zielarchitektur.
- Controller für HTTP-Verträge.
- Services für Businesslogik.
- Policies oder vergleichbare serverseitige Berechtigungsprüfung.
- Request Validation für Eingaben.
- Jobs für asynchrone Aufgaben.
- Storage-Abstraktion für private Dateien.

## Datenbankstruktur

- PostgreSQL als relationale Hauptdatenbank.
- Organisationen, Benutzer, Rollen, Projekte, Projektstruktur, Pläne, Fotos, Kommentare, Audit-Logs und Benachrichtigungen.
- pgvector wird nur für spätere KI-/Suchfunktionen vorbereitet.
- Migrationen werden versioniert und nachvollziehbar erstellt.

## Authentifizierung

- Geschützte Bereiche erfordern gültige Anmeldung.
- Session- oder Token-Mechanismus wird mit Laravel-Stack final entschieden.
- Admin-2FA wird geprüft, aber nicht ohne Entscheidung als MVP-Pflicht eingeführt.

## Rollen und Rechte

- Rollen gelten organisations- und projektbezogen.
- Ressourcenzugriffe werden serverseitig geprüft.
- Ansicht und Download von Dateien können getrennte Rechte haben.

## Externe Schnittstellen

- Object Storage für private Dateien.
- E-Mail für Benachrichtigungen.
- Spätere Webhooks und Drittintegrationen nur über Adapter.
- Späterer KI-Service nur nach Security- und Datenschutzprüfung.

## Datenflüsse

- Anmeldung: Benutzer authentifiziert sich, erhält Kontext, API prüft Rechte pro Anfrage.
- Fotoaufnahme: Datei wird privat gespeichert, Metadaten werden validiert, Datenbankeintrag und Audit-Event entstehen.
- Planposition: Marker wird relativ zu einer konkreten Planversion gespeichert.
- Planversion: neue Version erzeugt unveränderliche Referenz und Benachrichtigung.
- Ansicht/Download: Backend prüft Recht und erzeugt kontrollierten Zugriff.

## Sicherheitsgrenzen

- Browser ist nicht vertrauenswürdig.
- Backend ist zentrale Autorisierungsgrenze.
- Object Storage ist privat.
- Secrets liegen außerhalb des Repositorys.
- Queue- und KI-Verarbeitung dürfen keine Rechteprüfung umgehen.

## Datenschutzanforderungen

- Personenbezogene Daten minimieren.
- Baustellenfotos und Kommentare als potenziell personenbezogen behandeln.
- Audit-Logs datensparsam und mit Retention planen.
- Externe Dienstleister vor Nutzung prüfen.

## Logging

- Technische Logs ohne Secrets und ohne unnötige personenbezogene Daten.
- Audit-Logs für kritische fachliche Aktionen.
- Fehlerausgaben an Benutzer ohne interne Details.

## Monitoring

- Phase 1 definiert nur Anforderungen.
- Später zu planen: Health Checks, Queue-Monitoring, Storage-Fehler, Upload-Fehler und Backup-Status.

## Deployment

- Hosting in Schweiz oder EU prüfen.
- HTTPS erzwingen.
- PostgreSQL, Redis, Object Storage und Queue Worker betreiben.
- Backup und Restore dokumentieren.

## Tests

- Unit-/Feature-Tests für Businesslogik.
- API-Tests für Auth, Rechte und Fehlerfälle.
- Upload- und Storage-Tests.
- UI-Tests für Kernflows und responsive Darstellung.

## Technologieentscheidungen

| Bereich | Entscheidung | Status |
|---|---|---|
| Backend | Laravel API | entschieden |
| Frontend | Vue 3, React oder Inertia | offen |
| Mobile | PWA zuerst | entschieden |
| Datenbank | PostgreSQL | entschieden |
| Vektorsuche | pgvector später | vorbereitet |
| Dateien | S3-kompatibler Object Storage / MinIO lokal | entschieden |
| Queue | Redis + Laravel Queues | entschieden |
| KI | separater Processing Layer später | nicht MVP |

## Risiken

- Frontend-Stack wird zu spät entschieden.
- MVP-Umfang wächst über den Kern hinaus.
- Rechteprüfung wird versehentlich in UI verlagert.
- Dateiablage wird öffentlich konfiguriert.
- Planpositionen werden ohne Planversion gespeichert.

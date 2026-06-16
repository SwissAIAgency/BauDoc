# Architektur

## Architekturziel

BauDoc wird als API-first-System aufgebaut. Eine modulare Laravel-API stellt Authentifizierung, Rollen, Projektstruktur, Pläne, Fotos, Planpositionen, Audit-Log und Benachrichtigungen bereit. Eine eigenständige Vue 3 + Vite + TypeScript PWA konsumiert diese API.

## Systemübersicht

```text
Vue 3 PWA
        |
        | HTTPS / JSON API
        v
Laravel API
        |
        |-- Laravel Sanctum
        |-- Rollen und Policies
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
        |-- Mandanten- und Projektdaten
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
        |-- Cache, Sessions und Queue
        |-- Benachrichtigungen
        |-- spätere Bildverarbeitung
```

## Frontend-Struktur

- Vue 3 + Vite + TypeScript als eigenständige PWA.
- Vue Router für App-Navigation.
- Pinia nur bei Bedarf für komplexeren Zustand.
- Nativer `fetch`-Wrapper als API-Client in der Foundation.
- Mobile-first Aufnahmefluss.
- Desktop-Ansichten für Planviewer, Galerie, Filter und Administration.
- Keine Businesslogik direkt in UI-Komponenten.

## Backend-Struktur

- Laravel API.
- Laravel Sanctum für First-Party-SPA/PWA-Authentifizierung.
- Controller für HTTP-Verträge.
- Services für Businesslogik.
- Policies/Middleware für serverseitige Berechtigungsprüfung.
- Form Request Validation für Eingaben.
- Jobs für asynchrone Aufgaben.
- Laravel Filesystem S3-Disk für private Dateien.

## Datenbankstruktur

- PostgreSQL als relationale Hauptdatenbank.
- Eloquent und Laravel Migrations.
- `organizations` als Mandantenwurzel.
- Projektstruktur über Gebäude, Etagen, Räume und Zonen.
- `plans` und `plan_versions` als unveränderliche Planhistorie.
- `photos`, `photo_files`, `photo_locations` und Kommentare als Dokumentationskern.
- `audit_logs` für kritische Aktionen.
- pgvector bleibt spätere Option und ist nicht MVP.

## Authentifizierung

- Laravel Sanctum als MVP-Standard.
- First-Party-PWA-Authentifizierung mit Session/Cookie-Kontext.
- Token-Strategie für spätere native Apps erst bei Bedarf.
- Admin-2FA bleibt Prüfpunkt vor produktiver Nutzung.

## Rollen und Rechte

- Rollen gelten organisations- und projektbezogen.
- Ressourcenzugriffe werden serverseitig geprüft.
- Ansicht und Download von Dateien können getrennte Rechte haben.
- Rollenänderungen sind auditrelevant.

## Externe Schnittstellen

- Object Storage für private Dateien.
- E-Mail für Benachrichtigungen.
- Webhooks und Drittintegrationen nicht im MVP.
- KI-Service nicht im MVP und nur nach separater Security-/Datenschutzprüfung.

## Datenflüsse

- Anmeldung: PWA authentifiziert sich über Laravel Sanctum, API prüft Rechte pro Anfrage.
- Fotoaufnahme: Datei wird privat gespeichert, Metadaten werden validiert, Datenbankeintrag und Audit-Event entstehen.
- Planposition: Marker wird relativ zu einer konkreten Planversion gespeichert.
- Planversion: neue Version erzeugt unveränderliche Referenz und Benachrichtigung.
- Ansicht/Download: Backend prüft Recht und erzeugt kontrollierten Zugriff.

## Sicherheitsgrenzen

- Browser/PWA ist nicht vertrauenswürdig.
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

- Health Check für API.
- Queue-Fehler erfassen.
- Upload- und Storage-Fehler beobachten.
- Backup-Status vor produktivem Betrieb prüfen.

## Deployment

- Lokale Dienste über Docker Compose planen: PostgreSQL, Redis, MinIO.
- Produktives Hosting in Schweiz oder EU prüfen.
- HTTPS erzwingen.
- Queue Worker betreiben.
- Backup und Restore dokumentieren.

## Tests

- Backend: Laravel Unit- und Feature-Tests.
- Frontend: Vitest nach Frontend-Anlage.
- E2E: Playwright für stabile Kernflows.
- Security: Auth, Rechte, Upload, Dateiabruf, Fehlerausgaben.

## Technologieentscheidungen

| Bereich | Entscheidung | Status |
|---|---|---|
| Backend | Laravel API | entschieden |
| Auth | Laravel Sanctum | entschieden |
| Frontend | Vue 3 + Vite + TypeScript | entschieden |
| Mobile | PWA zuerst | entschieden |
| Datenbank | PostgreSQL | entschieden |
| ORM | Eloquent + Laravel Migrations | entschieden |
| Cache/Queue | Redis + Laravel Queues | entschieden |
| Dateien | S3-kompatibler Object Storage / MinIO lokal | entschieden |
| Vektorsuche | pgvector später | nicht MVP |
| KI | separater Processing Layer später | nicht MVP |

## Risiken

- MVP-Umfang wächst über den Kern hinaus.
- Rechteprüfung wird versehentlich in UI verlagert.
- Dateiablage wird öffentlich konfiguriert.
- Planpositionen werden ohne Planversion gespeichert.
- Audit-Retention bleibt zu lange offen.

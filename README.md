# BauDoc

BauDoc ist das Projektfundament für eine Web- und Mobile/PWA-Applikation zur planbasierten Baufortschrittsdokumentation.

## Status

Phase: Projektfundament und Orchestrator-Setup.

Dieses Repository enthält bewusst noch keinen Produktivcode und keine installierten Dependencies. Es setzt zuerst die im Unternehmensstandard geforderte Struktur, Dokumentation, Agentenrollen, Skills, Repository-Regeln und fachliche Projektdefinition auf.

## Kurzbeschreibung

Die Applikation soll Baufortschritte mit normalen Fotos und Panoramafotos dokumentieren. Bilder werden strukturiert Projekten, Gebäuden, Etagen, Räumen, Planpositionen, Gewerken und Arbeiten zugeordnet. Pläne werden versioniert und als räumliche Referenz verwendet, damit der Baufortschritt chronologisch, ortsbezogen und fachlich nachvollziehbar bleibt.

## Zweck / Problem

Baufortschritt wird in vielen Projekten über lose Fotogalerien, Chats oder Ordnerstrukturen dokumentiert. Dadurch fehlen häufig Planbezug, Raumbezug, Gewerk, Zeitpunkt, Verantwortlichkeit, Berechtigungen und Nachvollziehbarkeit. BauDoc löst dieses Problem durch strukturierte Fotoerfassung, Planpositionen, private Dateiablage, Rollenmodell und Audit-Logs.

## Features

Geplanter MVP:

- Login und Rollenmodell
- Projektverwaltung
- Gebäude-, Etagen- und Raumstruktur
- Gewerke und Arbeitstypen
- Planverwaltung mit Versionen
- Planviewer für PDF/Bild
- Fotoaufnahme über mobile Web-App/PWA
- Foto-Upload über Web-App
- Fotozuordnung zu Projekt, Raum, Gewerk und Plan
- Planpunkt setzen
- Textkommentare
- chronologische Galerie
- Filter nach Zeitraum, Ort und Gewerk
- private Dateiablage
- Audit-Log
- E-Mail-Benachrichtigung bei neuer Planversion

Nicht im MVP:

- Native Mobile App
- Offline-Synchronisation
- 360-Grad-Viewer
- KI-Bildanalyse
- semantische Suche
- vollständiges Mängelmanagement
- BIM-/IFC-Anbindung
- produktive Drittprodukt-Integrationen

## Hauptquellen

- `docs/references/leistungskatalog_baufortschritt_dokumentation.html`
- `docs/references/unternehmensstandard-codex-agenten.txt`

## Zielarchitektur

- Backend: Laravel API
- Frontend: Mobile PWA / Web-App, Stackentscheidung zwischen Vue 3, React oder Inertia noch offen
- Datenbank: PostgreSQL, später optional pgvector
- Queue/Cache: Redis + Laravel Queues
- Dateien: S3-kompatibler Object Storage oder MinIO lokal
- KI: späterer separater Processing Layer für Bildanalyse, Transkription, Embeddings und semantische Suche

## Projektstruktur

```text
BauDoc/
├── AGENTS.md
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── .env.example
├── .gitignore
├── docs/
├── prompts/
├── skills/
├── frontend/
├── backend/
├── database/
├── tests/
├── scripts/
└── .github/
```

## Voraussetzungen

Für die spätere Umsetzung werden voraussichtlich benötigt:

- PHP und Composer für Laravel
- Node.js und Paketmanager für das Frontend
- PostgreSQL
- Redis
- S3-kompatibler Object Storage oder MinIO für lokale Entwicklung
- Git und GitHub-Zugang

TODO: konkrete Versionen festlegen, sobald Laravel- und Frontend-Stack final entschieden sind.

## Installation

Derzeit gibt es noch keine installierbare Anwendung. Dieses Repository enthält das Projektfundament und die technische Planung.

Späterer Ablauf, sobald Produktivcode angelegt ist:

```bash
# Backend
cd backend
composer install

# Frontend
cd ../frontend
npm install
```

TODO: Befehle anpassen, sobald die konkrete Laravel-/Frontend-Struktur angelegt ist.

## Lokale Entwicklung / Start

Noch nicht verfügbar, da bewusst kein Produktivcode und keine Dependencies installiert wurden.

Geplanter lokaler Start nach Implementierung:

```bash
# Backend API
php artisan serve

# Queue Worker
php artisan queue:work

# Frontend
npm run dev
```

TODO: endgültige Startbefehle nach Stackentscheidung dokumentieren.

## Umgebungsvariablen

Beispielwerte liegen in `.env.example`.

Wichtig:

- keine echten Secrets committen
- lokale `.env`-Dateien bleiben ignoriert
- Zugangsdaten für Datenbank, Redis, Storage und Mail lokal setzen

## Deployment-Hinweise

Noch nicht final definiert.

Bekannte Anforderungen:

- Hosting in der Schweiz oder EU prüfen
- HTTPS erzwingen
- private Dateiablage verwenden
- Queue Worker betreiben
- Backups für Datenbank und Object Storage planen
- Secrets über sichere Umgebungskonfiguration verwalten

## GitHub Repository

https://github.com/SwissAIAgency/BauDoc.git

## Lizenz

TODO: Es ist noch keine Lizenzdatei definiert. Vor öffentlicher oder externer Nutzung muss entschieden werden, ob und unter welcher Lizenz BauDoc veröffentlicht wird.

## Nächster empfohlener Schritt

Der Orchestrator sollte den ersten sicheren Umsetzungstask erstellen:

1. Stackentscheidung für Frontend dokumentieren.
2. Laravel-Projektanlage planen.
3. Lokale Basisdienste PostgreSQL, Redis und MinIO entscheiden.
4. Danach erst Produktivcode oder Dependencies anlegen.

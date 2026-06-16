# 0004 Technology Stack

Datum: 29.05.2026

## Status

Entschieden für die erste Implementierung.

## Entscheidung

- Frontend: Vue 3 + Vite + TypeScript als eigenständige PWA.
- Frontend-Routing: Vue Router.
- Frontend-State: Pinia nur bei Bedarf ab dem ersten komplexeren Zustand.
- API-Client: nativer `fetch`-Wrapper, keine zusätzliche HTTP-Dependency in der Foundation.
- Backend: Laravel API.
- Auth: Laravel Sanctum für First-Party-SPA/PWA-Authentifizierung.
- ORM/Query Layer: Eloquent und Laravel Migrations.
- Datenbank: PostgreSQL.
- Cache/Queue/Session: Redis.
- Dateien: Laravel Filesystem S3-Disk, MinIO lokal.
- Tests Backend: Laravel Feature-/Unit-Tests auf PHPUnit-Basis.
- Tests Frontend: Vitest nach Frontend-Anlage.
- E2E: Playwright erst bei stabilen Kernflows.
- Lokale Dienste: Docker Compose für PostgreSQL, Redis und MinIO.

## Begründung

Vue 3 + Vite + TypeScript passt zur eigenständigen PWA, hält das Frontend klar vom Backend getrennt und bleibt leichter als eine React-Stackentscheidung mit zusätzlichem UI-Ökosystem. Laravel Sanctum passt zur First-Party-PWA und vermeidet unnötige OAuth-Komplexität im MVP.

## Nicht entschieden

- Produktiver Hosting-Anbieter.
- Produktiver Mail-Anbieter.
- Produktiver Storage-Anbieter.
- Lizenzmodell.

## Konsequenzen

- Phase 3 kann Foundation, Laravel API und Vue PWA konkret anlegen.
- API-Verträge werden verbindlich zwischen Backend und Frontend.
- Inertia wird nicht verwendet, solange API-first gilt.

# Deployment

## Status

Phase-2-Planungsbaseline. Es gibt noch keine deploybare Anwendung.

## Lokale Entwicklung

Geplant:

- Laravel API in `backend/`.
- Vue 3 PWA in `frontend/`.
- Docker Compose für PostgreSQL, Redis und MinIO.
- `.env.example` als Vorlage ohne echte Secrets.

## Zielumgebung

- Hosting in der Schweiz oder EU prüfen.
- HTTPS im produktiven Betrieb erzwingen.
- Backend, Frontend, PostgreSQL, Redis, Queue Worker und Object Storage getrennt betreibbar halten.

## Umgebungskonfiguration

- Produktive Secrets nicht ins Repository.
- Datenbank-, Redis-, Storage- und Mail-Konfiguration über Umgebungsvariablen.
- Object Storage immer privat konfigurieren.

## Betrieb

- Queue Worker für Benachrichtigungen und spätere Verarbeitung.
- Private Dateiablage.
- Backups für Datenbank und Object Storage.
- Restore-Test vor produktiver Freigabe.

## Monitoring

Zu planen:

- API Health Check.
- Queue-Fehler.
- Upload-Fehler.
- Storage-Erreichbarkeit.
- Datenbank-Erreichbarkeit.
- Backup-Status.

## Release-Anforderungen

- Build und Tests erfolgreich, sobald vorhanden.
- Security Review.
- Datenschutz Review.
- Keine offenen kritischen Bugs.
- Dokumentation aktuell.
- Keine echten Secrets im Repository.

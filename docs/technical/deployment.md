# Deployment

## Status

Phase-1-Planungsdokument. Es gibt noch keine deploybare Anwendung.

## Zielumgebung

- Hosting in der Schweiz oder EU prüfen.
- HTTPS im produktiven Betrieb erzwingen.
- Backend, Frontend, PostgreSQL, Redis, Queue Worker und Object Storage getrennt planbar halten.

## Lokale Entwicklung

Voraussichtlich benötigt:

- PHP und Composer.
- Node.js und Paketmanager.
- PostgreSQL.
- Redis.
- MinIO oder S3-kompatibler lokaler Storage.

Konkrete Versionen werden nach Technologieentscheidung dokumentiert.

## Umgebungskonfiguration

- `.env.example` enthält nur Platzhalter.
- Produktive Secrets nicht ins Repository.
- Datenbank-, Redis-, Storage- und Mail-Konfiguration über Umgebungsvariablen.

## Betrieb

- Queue Worker für Benachrichtigungen und spätere Verarbeitung.
- Private Dateiablage.
- Backups für Datenbank und Object Storage.
- Restore-Test vor produktiver Freigabe.

## Monitoring

Zu planen:

- Health Check.
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

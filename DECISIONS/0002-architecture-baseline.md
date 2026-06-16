# 0002 Architecture Baseline

Datum: 29.05.2026

## Status

Entschieden.

## Kontext

BauDoc verarbeitet vertrauliche Baupläne, Baustellenfotos und personenbezogene Daten. Die Architektur muss Rechteprüfung, private Dateiablage, Auditierbarkeit und spätere Erweiterbarkeit unterstützen.

## Entscheidung

Das System wird API-first aufgebaut:

- Laravel API als Backend.
- Eigenständige Vue 3 + Vite + TypeScript PWA als Frontend.
- PostgreSQL als relationale Hauptdatenbank.
- Redis für Cache, Sessions und Queue.
- S3-kompatibler Object Storage mit MinIO lokal.
- KI und Drittintegrationen nur vorbereitet, nicht MVP.

## Begründung

API-first trennt fachliche Autorisierung und Datenhaltung klar vom Frontend. Eine eigenständige PWA passt besser zu mobiler Baustellennutzung als ein serverzentriertes Inertia-Frontend.

## Konsequenzen

- API-Verträge müssen früh dokumentiert werden.
- Frontend darf keine Businesslogik oder Autorisierung erzwingen.
- Backend ist zentrale Sicherheitsgrenze.
- Lokale Entwicklung benötigt getrennte Dienste für DB, Redis und Storage.

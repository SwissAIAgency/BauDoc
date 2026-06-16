# Integrations

## Status

Produktive Drittintegrationen sind nicht Teil des MVP. Phase 2 definiert nur Integrationsregeln und vorbereitete Schnittstellen.

## MVP-nahe Dienste

- MinIO lokal oder S3-kompatibler Object Storage für private Dateien.
- Mail-Transport für Benachrichtigungen; lokal zunächst Log-Mailer.
- Redis für Queue, Cache und Sessions.

## Spätere Integrationen

- Webhooks.
- Drittprodukt-Adapter.
- KI-Processing-Layer.
- Externe semantische Suche oder Embedding-Dienste.

## Adapter-Regeln

- Externe APIs werden über Adapter oder Services gekapselt.
- Keine direkte API-Logik in Frontend-Komponenten.
- Timeouts definieren.
- Retries kontrolliert und begrenzt einsetzen.
- Fehlerfälle dokumentieren.
- Integrationslogs ohne sensible Payloads.

## Security-Regeln

- Keine Secrets im Frontend.
- API Keys nur über Umgebungskonfiguration.
- Webhooks mit Signaturprüfung und Replay-Schutz.
- Keine öffentlichen Datei-URLs.

## Datenschutz-Regeln

- Vor externer Datenübertragung Dienstleister, Zweck, Datenarten und Datenstandort prüfen.
- KI-Verarbeitung separat freigeben.
- Personenbezogene oder vertrauliche Daten nicht ohne dokumentierte Grundlage übertragen.

## Offene Entscheidungen

- Konkreter produktiver Mail-Anbieter.
- Konkreter produktiver Storage-Anbieter.
- Webhook-Umfang.
- KI-Anbieter und Datenstandort, falls später relevant.

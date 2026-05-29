# Integrations

## Status

Produktive Drittintegrationen sind nicht Teil des MVP. Phase 1 dokumentiert nur Regeln und vorbereitete Integrationsflächen.

## Geplante oder mögliche Integrationen

- S3-kompatibler Object Storage oder MinIO.
- E-Mail-Dienst für Benachrichtigungen.
- Spätere Webhooks.
- Spätere Drittprodukt-Integrationen.
- Späterer KI-Processing-Layer.

## Adapter-Regeln

- Externe APIs werden über Adapter oder Services gekapselt.
- Keine direkte API-Logik in Frontend-Komponenten.
- Timeouts definieren.
- Retries kontrolliert und begrenzt einsetzen.
- Fehlerfälle dokumentieren.

## Security-Regeln

- Keine Secrets im Frontend.
- API Keys nur über Umgebungskonfiguration.
- Webhooks mit Signaturprüfung und Replay-Schutz.
- Logs ohne sensible Payloads.

## Datenschutz-Regeln

- Vor externer Datenübertragung Dienstleister, Zweck, Datenarten und Datenstandort prüfen.
- KI-Verarbeitung separat freigeben.
- Personenbezogene oder vertrauliche Daten nicht ohne dokumentierte Grundlage übertragen.

## Offene Entscheidungen

- Konkreter Mail-Anbieter.
- Konkreter Storage-Anbieter für produktiven Betrieb.
- Webhook-Umfang.
- KI-Anbieter und Datenstandort, falls später relevant.

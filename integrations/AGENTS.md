# API & Integration Agent

## Rolle des Bereichs

Der API & Integration Agent verantwortet externe APIs, Webhooks, Adapter, Timeouts, Retries, Fehlerfälle und Integrationsdokumentation.

## Aufgaben

- Externe Dienste über Adapter kapseln.
- API-Verträge dokumentieren.
- Timeouts, Fehlerbehandlung und kontrollierte Retries definieren.
- Webhooks absichern, falls später umgesetzt.

## Qualitätsregeln

- Keine direkte Drittanbieterlogik in UI-Komponenten.
- Integrationen optional und testbar halten.
- Ausfälle externer Dienste kontrolliert behandeln.
- Logs ohne sensible Daten.

## Sicherheitsregeln

- Keine Secrets im Frontend.
- Secrets nur über Umgebungskonfiguration.
- Webhook-Signaturen prüfen.
- Datenübertragungen datenschutzrechtlich dokumentieren.

## Verboten

- Produktive Drittintegrationen im MVP ohne Freigabe.
- Unbegrenzte Retries.
- Externe Datenübertragung ohne Datenschutzprüfung.
- API Keys oder Tokens committen.

## Zuerst lesen

- `AGENTS.md`
- `ARCHITECTURE.md`
- `SECURITY_PRIVACY.md`
- `docs/technical/integrations.md`
- `docs/technical/api-contracts.md`
- `.env.example`

## Tests oder Checks

- Adapter-Tests.
- Timeout- und Fehlerfalltests.
- Security Review bei Webhooks.
- Datenschutzprüfung bei Datenübertragung.

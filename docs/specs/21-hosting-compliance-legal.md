# Spec 21 — Hosting, Datenschutz, Datenlebenszyklus & Recht

**Status:** APPROVED · **Bau:** MVP · **Bezug:** D-019, D-020, D-038
**Source of Truth für:** Hosting-Standort, Löschung/Aufbewahrung, Einwilligungen/AVV

## Zweck

DSG/nDSG-konformer Betrieb mit maximaler Datenhoheit; rechtssichere Einwilligungen.

## Festlegungen

### Hosting
- **CH primär, EU-Fallback** für einzelne Dienste/Backups. App/Postgres/S3/KI in CH-Rechenzentren.
- Primär CH-DSG/nDSG; DSGVO bei EU-Bezug. HTTPS erzwingen.
- **KI-/GPU-Infrastruktur** (self-hosted, CH/EU) ist wegen der MVP-Suche (D-071) bereits **MVP-relevant**, nicht erst post-MVP.
- Konkrete Infrastruktur-Topologie & Anforderungen (Plattform, Managed-Grad, Deployment, GPU-Standort): [[33-hosting-infrastructure]].

### Datenlebenszyklus
- Normale Löschung = **Soft-Delete** (`deleted_at`, gefiltert, wiederherstellbar).
- DSG-Löschbegehren = **harte Löschung / Crypto-Shred** der Medien; der Audit-Eintrag über die Löschung bleibt
  (Audit append-only, [[03-audit-logging]]; Personenbezug dort gehasht).
- Projekt-Export für Portabilität → [[16-export-reporting]]. Siehe auch `docs/11_loeschkonzept.md`.

### Recht & Einwilligungen
- **In-App-Zustimmung** zu ToS/Datenschutz beim Onboarding ([[04-auth-onboarding-sessions]]) mit **Versionierung**
  (wer/wann/welche Version).
- Internes **AVV-Register** für verbleibende Dritte: S3-Provider, E-Mail-Versand, Backup-Standort. Dank self-hosted
  KI ([[11-ai-integration]]) überschaubar.

## Abhängigkeiten / Verweise

- [[03-audit-logging]] · [[04-auth-onboarding-sessions]] · [[11-ai-integration]] · [[16-export-reporting]]
- `docs/09_datenschutzkonzept.md` · `docs/11_loeschkonzept.md` · `docs/12_tom_security.md`

## Akzeptanzkriterien

- Produktivdaten liegen in CH (Fallback EU dokumentiert); kein Bild-/Audiodatenabfluss an externe APIs.
- DSG-Löschbegehren entfernt Medien hart, Audit-Nachweis der Löschung bleibt erhalten.
- Einwilligungen sind versioniert nachweisbar; AVV-Register ist vollständig.

## Offene Punkte

- Konkreter CH-Provider; finale Rechtstexte mit Jurist.

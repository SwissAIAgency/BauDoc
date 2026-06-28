# Spec 33 — Hosting & Infrastruktur

**Status:** APPROVED (Richtung); konkreter Anbieter offen · **Bau:** MVP · **Bezug:** D-088, D-089, D-090, D-091 (Standort/Recht: D-019, [[21-hosting-compliance-legal]])
**Source of Truth für:** Infrastruktur-Topologie, zu hostende Komponenten + Anforderungen, Deployment-Form

## Zweck

Wie die Anwendung betrieben wird und welche Infrastruktur-Anforderungen gelten. Ergänzt [[21-hosting-compliance-legal]]
(Standort/Recht) und [[15-observability-backup-dr]] (Betrieb/Backup).

## Zu hostende Komponenten + Anforderung

| Komponente | Anforderung |
|---|---|
| Laravel-App + Worker | CPU, horizontal skalierbar; Queue-Worker getrennt von Web |
| PostgreSQL + pgvector | Persistenz, PITR-Backups, Vektor-Index; **managed bevorzugt** |
| Redis | Queue + Cache |
| S3-kompatibler Object Storage | privat, signierte URLs, versioniert/repliziert |
| ClamAV | Malware-Scan-Worker (self-hosted) |
| **GPU-Inferenz** | Text-/Bild-Embeddings für KI-Suche (D-071) — **CH-Standort** |
| E-Mail-Versand | Transaktionsmails (Dritt-Dienst, AVV) |
| Observability | self-hosted (Error/Logs/Metriken), CH/EU ([[15-observability-backup-dr]]) |

## Festlegungen

- **Plattform (D-088):** CH-primär; CH-Cloud/IaaS favorisiert (Exoscale/Infomaniak/Swisscom-Klasse), EU-Hyperscaler nur
  Fallback (D-019). Konkreter Anbieter offen → Auswahl nach GPU-/Kosten-/Verfügbarkeitsabklärung.
- **Managed-Grad (D-089):** Mischung nach Reifegrad; Postgres wo möglich managed (PITR), GPU + ClamAV self-hosted.
- **Deployment (D-090):** klassische VMs + Deploy-Skripte im MVP (Container optional später). Siehe `docs/technical/ci-cd.md`,
  `docs/technical/deployment.md`.
- **GPU (D-091):** beim CH-Provider, gleicher Datenstandort; keine Bild-/Embedding-Daten verlassen die CH.
- **Umgebungen:** dev / staging / prod getrennt.

## Nicht-funktionale Anforderungen

- **Sicherheit:** HTTPS erzwungen, Netz-Segmentierung (DB/Storage nicht öffentlich), Secrets-Management, least-privilege DB-Rollen ([[01-tenant-isolation-rls]]).
- **Backup/DR:** PITR + replizierte Medien, RPO < 15 Min / RTO < 4 h ([[15-observability-backup-dr]], D-026).
- **Skalierung:** Web-, Queue- und GPU-Worker unabhängig skalierbar; GPU-Last entkoppelt über die Queue ([[05-media-pipeline]]).
- **Medienauslieferung:** direkt von S3 über signierte URLs ([[05-media-pipeline]]); CDN optional (offen).
- **Kostentreiber:** GPU-Inferenz + Object-Storage-Wachstum ([[32-storage-accounting-quotas]]).

## Abhängigkeiten / Verweise

- [[21-hosting-compliance-legal]] (Standort/Recht) · [[15-observability-backup-dr]] · [[11-ai-integration]] (GPU) ·
  [[05-media-pipeline]] · [[32-storage-accounting-quotas]] · `docs/technical/ci-cd.md` · `docs/technical/deployment.md`

## Akzeptanzkriterien

- Alle Produktivdaten (DB, S3, GPU-Verarbeitung) liegen im CH-Standort; EU nur dokumentierter Fallback.
- DB/Storage sind nicht öffentlich erreichbar; App nur über HTTPS.
- Queue-/GPU-Worker sind unabhängig von der Web-Schicht skalier-/neustartbar.
- Getrennte dev/staging/prod-Umgebungen; reproduzierbares Deployment per Skript.
- Backup/Restore erfüllt RPO/RTO-Ziele (getesteter Restore).

## Offene Punkte

- **Konkreter CH-Anbieter** + GPU-Instanztyp/-Sizing + Kostenmodell.
- HA-/SLA-Ziel (Single-Node vs. redundant) für MVP.
- CDN für Medien ja/nein.
- Container-Migration: Schwelle/Zeitpunkt (Risiko aus D-090).

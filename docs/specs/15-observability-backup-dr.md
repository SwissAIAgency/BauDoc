# Spec 15 — Observability, Backup & Disaster Recovery

**Status:** APPROVED · **Bau:** MVP · **Bezug:** D-025, D-026
**Source of Truth für:** Monitoring/Error-Tracking/Logs, Backup & DR

## Zweck

Technische Fehler schnell erkennen/diagnostizieren und Datenverlust minimieren.

## Festlegungen

### Observability (getrennt vom Audit)
- **Self-hosted Stack** in CH/EU: Error-Tracking (Sentry/GlitchTip self-hosted) + Logs/Metriken (Grafana/Loki/Prometheus).
- Strukturiertes App-Logging + Health-Checks.
- **Audit-Log bleibt rein fachlich/forensisch** ([[03-audit-logging]]) — niemals Debug-Kanal.

### Backup & Disaster Recovery
- Postgres **PITR** (kontinuierliches WAL-Archiv) + objekt-replizierte/versionierte Medien.
- **Ziel: RPO < 15 Min, RTO < 4 h.**
- Backups **verschlüsselt**, Restore **regelmäßig getestet**.

## Abhängigkeiten / Verweise

- [[03-audit-logging]] · [[21-hosting-compliance-legal]] · `docs/12_tom_security.md`

## Akzeptanzkriterien

- Fehler erscheinen im Error-Tracking mit Kontext; Personendaten in Logs minimiert.
- Dokumentierter, getesteter Restore erfüllt RPO < 15 Min / RTO < 4 h.
- Observability-Daten verlassen die CH/EU-Infrastruktur nicht.

## Offene Punkte

- Konkrete Alerting-Regeln/Schwellen.

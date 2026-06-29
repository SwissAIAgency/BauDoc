# Spec 03 — Audit-Log (append-only + Hash-Chain)

**Status:** APPROVED · **Bau:** MVP · **Bezug:** D-010, D-011
**Source of Truth für:** Audit-Log, Manipulationsschutz, SuperAdmin-Zugriff

## Zweck

Lückenlose, manipulationssichere Nachvollziehbarkeit kritischer Aktionen (forensisch verwertbar, DSG-konform).

## Festlegungen

- Zentrale `audit_logs`-Tabelle, **append-only** (UPDATE/DELETE per DB-Trigger + RLS unterbunden).
- **Hash-Chain:** jeder Eintrag enthält `prev_hash` + `entry_hash` (Hash über Inhalt + `prev_hash`).
  Entfernte/geänderte Einträge brechen die Kette nachweisbar.
- **Felder:** `actor_user_id`, `organization_id`, `project_id?`, `action`, `resource_type`, `resource_id?`,
  `changes` (JSON-Diff bei Mutationen), `created_at`, `ip_hash`, `user_agent_hash`.
- **Events:** Login/Logout, Upload, Ansicht, Download, Löschen, Rechte-/Rollenänderung, neue Planversion,
  org-übergreifender SuperAdmin-Zugriff, Agent-Aktionen (mit Agent-Identität, [[12-agent-mcp-readiness]]).
- **Retention:** 24 Monate. IP & User-Agent **gehasht/pseudonymisiert**.
- **SuperAdmin-Zugriff:** eigene privilegierte DB-Verbindung mit `BYPASSRLS`, strikt getrennt von der App-Verbindung;
  jeder org-übergreifende Zugriff erzeugt selbst einen Audit-Eintrag; 2FA-Pflicht.

## Datenmodell (Delta)

- `audit_logs` mit `prev_hash`, `entry_hash`, `ip_hash`, `user_agent_hash`; kein `updated_at`/`deleted_at`.

## Abhängigkeiten / Verweise

- [[01-tenant-isolation-rls]] · [[02-rbac-permissions]] · [[21-hosting-compliance-legal]] (Retention/DSG)

## Akzeptanzkriterien

- UPDATE/DELETE auf `audit_logs` schlägt fehl (auch für privilegierte App-Rolle ohne Sonderrecht).
- Hash-Chain-Verifizierung erkennt jeden manipulierten/entfernten Eintrag.
- Jeder org-übergreifende SuperAdmin-Zugriff erscheint als eigener Audit-Eintrag.
- IP/User-Agent sind nur gehasht gespeichert.

## Offene Punkte

- Archivierung/Verdichtung nach 24 Monaten (Export vor Löschung) konzeptionell festlegen.

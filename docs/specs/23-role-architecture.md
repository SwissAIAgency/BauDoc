# Spec 23 — Rollenarchitektur

**Status:** APPROVED · **Bau:** MVP · **Bezug:** D-009, D-050, D-051, D-052, D-053
**Source of Truth für:** Identitätsklassen, Scope-Ebenen & Vererbung, effektive Rechte, Rollen-Delegation, Gewerk-Scope, Gast-Zugang, Rollen-Invarianten

## Zweck

Das **strukturelle** Rollenmodell hinter der Permission-Matrix: *wie* Rollen aufgebaut, zugewiesen, vererbt und
aufgelöst werden. Die konkrete „welche Rolle darf was"-Matrix bleibt in [[02-rbac-permissions]].

## Identitätsklassen

Drei klar getrennte Klassen (keine Vermischung):

1. **Internal User** — Mitglied einer Organisation; trägt globale/Org-/Projekt-Rollen.
2. **External Guest** — externer Betrachter, **kein** vollwertiges Org-Mitglied (siehe „Gast-Zugang").
3. **Agent / Service Account** — maschinelle Identität pro Org mit konfigurierbarem Rechteprofil → [[12-agent-mcp-readiness]].

Alle drei unterliegen [[01-tenant-isolation-rls]] (RLS) und [[03-audit-logging]] (Audit), unterscheidbar im Audit.

## Scope-Ebenen & Vererbung

Hierarchie: **System → Organisation → Projekt → Gewerk** (Gewerk = orthogonale Sub-Dimension, s.u.).

- **Systemadministrator:** plattformweit (Konfiguration). Fachliche Mandantendaten nur über den separaten
  BYPASSRLS-Support-Pfad ([[03-audit-logging]]), nicht im Default.
- **Organisationsadministrator:** **automatischer org-weiter Zugriff** auf alle Projekte der eigenen Organisation —
  ohne explizite Projektmitgliedschaft (D-050).
- **Projekt-Rollen** (`Projektleiter`, `Bauleiter`, `Planer`, `Gewerk-Benutzer`, `Betrachter`): erfordern **explizite
  Projektmitgliedschaft** (`project_members`, `team_id = project_id`). Keine implizite Vererbung zwischen Projekten.

## Effektive Rechte (Mehrfachrollen)

- Ein Nutzer kann mehrere Rollen tragen (z.B. Projekt A „Planer", Projekt B „Betrachter", plus ggf. Org-Rolle).
- Auflösung **additiv/Union** je Scope: die permissivste zutreffende Rolle gewinnt *innerhalb* des jeweiligen
  Projekts/der Org.
- **Gewerk-Scope wirkt einschränkend** (Schnittmenge auf Datenebene): hat eine Mitgliedschaft eine Gewerk-Beschränkung,
  gelten ihre Rechte nur für diese Gewerke.

## Rollen-Delegation (Schutz vor Privilege Escalation)

- **Hierarchische Delegation, kein Self-Upgrade** (D-051): man kann nur Rollen vergeben/entziehen, die die eigene
  effektive Berechtigung **nicht übersteigen**.
- Rang (absteigend): `Systemadministrator` > `Organisationsadministrator` > `Projektleiter` >
  `Bauleiter`/`Planer` > `Gewerk-Benutzer` > `Betrachter`.
- `Org-Admin` vergibt org-weit (inkl. `Projektleiter`); `Projektleiter` vergibt Projektrollen ≤ eigenem Rang im
  **eigenen** Projekt. Niemand kann sich selbst höherstufen oder eine höhere Rolle erteilen.
- Jede Zuweisung/Änderung/Entziehung ist auditrelevant ([[03-audit-logging]], `docs/business/user-roles.md`).

## Gewerk-Scope (orthogonale Dimension)

- Gewerk-Zuordnung ist **unabhängig von der Rolle**: jede Projektmitgliedschaft kann optional auf eine Menge Gewerke
  beschränkt werden (D-052) — nicht nur die Rolle `Gewerk-Benutzer`.
- Ohne Gewerk-Beschränkung gilt die Rolle für alle Gewerke des Projekts.

## Gast-Zugang (External Guest)

- Eigene Identitätsklasse, **projekt-scoped + befristet** (D-053): Zugriff nur auf explizit freigegebene
  Projekte/Bereiche, optional mit `expires_at` (automatischer Ablauf).
- Gäste erhalten keine Management-Permissions; default read-only gemäß [[02-rbac-permissions]].
- Sauber getrennt von internen Nutzern und Agenten; voll auditiert.

## Rollen-Invarianten

- Jede Organisation muss **mindestens einen** `Organisationsadministrator` behalten; der letzte kann nicht
  entzogen/herabgestuft werden (Lock-out-Schutz).
- Selbst-Entzug der eigenen letzten eskalierenden Rolle wird verhindert, wenn dadurch die Org/das Projekt
  verwaltungslos würde.
- Gäste können keine Rollen vergeben.

## Datenmodell (Delta)

- `users.identity_class` (`internal` | `guest` | `agent`) bzw. äquivalente Trennung.
- `project_members` (user_id, project_id, role) — Projektrollen-Zuweisung (spatie Teams, `team_id = project_id`).
- `project_member_trades` (project_member_id ↔ trade_id, n:m) — optionale Gewerk-Beschränkung.
- `guest_accesses` (identity, project_id/scope, granted_by, expires_at?).

## Abhängigkeiten / Verweise

- [[02-rbac-permissions]] (Permission-Matrix) · [[01-tenant-isolation-rls]] · [[04-auth-onboarding-sessions]] (Einladung/Onboarding)
- [[03-audit-logging]] · [[12-agent-mcp-readiness]] · `docs/business/user-roles.md`

## Akzeptanzkriterien

- Org-Admin sieht/verwaltet alle Projekte seiner Org ohne explizite Mitgliedschaft; fachliche Projektrollen ohne
  Mitgliedschaft sehen nichts.
- Ein Nutzer mit mehreren Projektrollen erhält je Projekt die korrekt aufgelösten (additiven) Rechte.
- Ein Projektleiter kann **keine** Org-/System-Rolle und sich selbst nicht höherstufen (serverseitig + auditiert).
- Eine gewerk-beschränkte Mitgliedschaft sieht ausschließlich Daten der zugewiesenen Gewerke.
- Gast-Zugang ist auf freigegebene Projekte begrenzt und läuft am `expires_at` automatisch ab.
- Der letzte Org-Admin einer Organisation kann nicht entfernt/herabgestuft werden.

## Offene Punkte

- Ob `Projektleiter` einen weiteren `Projektleiter` (gleicher Rang) im eigenen Projekt ernennen darf — Default: ja.
- Optionale custom Rollen (post-MVP); aktuell feste Presets ([[02-rbac-permissions]]).

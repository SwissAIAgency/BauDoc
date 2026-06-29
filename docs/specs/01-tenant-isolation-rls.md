# Spec 01 — Mandantentrennung & Row-Level Security

**Status:** APPROVED · **Bau:** MVP · **Bezug:** D-008
**Source of Truth für:** Tenant-Isolation, PostgreSQL-RLS

## Zweck

Sicherstellen, dass kein Mandant (Organisation) Daten eines anderen sehen oder verändern kann — auch nicht bei einem
Bug in der Anwendungsschicht. Grundlage für DSG-Konformität und Vertrauen.

## Festlegungen (Defense-in-Depth)

- `organization_id NOT NULL` als verpflichtende Spalte in **allen** fachlichen Tabellen.
- **App-Schicht:** Laravel Global Scope (Trait `BelongsToOrganization`) filtert automatisch nach aktueller Organisation.
  Middleware löst die aktuelle Organisation aus dem authentifizierten User/Token auf.
- **DB-Schicht (Sicherheitsnetz):** PostgreSQL Row-Level Security auf jeder Fachtabelle.
  - Policy: `organization_id = current_setting('app.current_org_id')::bigint`.
  - Laravel setzt pro Request `SET LOCAL app.current_org_id = ?` innerhalb der Request-Transaktion.
  - Die App-DB-Rolle ist **nicht** Tabelleneigentümer und besitzt **kein** `BYPASSRLS`.
- SuperAdmin-Ausnahme siehe [[03-audit-logging]] / [[04-auth-onboarding-sessions]] (separate BYPASSRLS-Rolle).

## Abhängigkeiten / Verweise

- [[02-rbac-permissions]] (Autorisierung *innerhalb* des Mandanten)
- [[10-data-model]] (organization_id in allen Tabellen)

## Akzeptanzkriterien

- Integrationstest mit zwei Organisationen: User A erhält über direkten API-/Query-Zugriff **keine** Daten von Org B,
  auch bei manipuliertem `organization_id`-Parameter.
- RLS greift selbst bei umgangenem App-Scope (z.B. Raw-Query).
- Verifiziert: App-DB-Rolle ist kein Owner und hat kein `BYPASSRLS`.
- Fehlt `app.current_org_id`, liefert jede Abfrage auf Fachtabellen 0 Zeilen (fail-closed).

## Offene Punkte

- Keine.

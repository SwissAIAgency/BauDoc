# Spec 12 — AI-Agenten & MCP-Readiness

**Status:** APPROVED (Vorbereitung jetzt, MCP-Server später) · **Bau:** post-MVP · **Bezug:** D-039, D-040
**Source of Truth für:** Agent-Identität, Agent-Rechteprofile, MCP-Anbindung

## Zweck

Das System so gestalten, dass später AI-Agenten über MCP angedockt werden können — ohne die Sicherheits-Guardrails zu umgehen.

## Festlegungen

- **Zugang:** MCP-Server als **dünner Adapter über die versionierte REST-API** ([[19-api-design]]) — kein zweiter
  DB-Zugang. Agenten erben automatisch Auth, RBAC, RLS und Audit. OpenAPI-Beschreibungen dienen als Tool-Beschreibungen.
- **Agent-Identität:** eigene, klar gekennzeichnete **Identitätsklasse „Agent"** (Service Account pro Organisation,
  kein verkleideter Nutzer). Kein God-Token.
- **Agent-Rechteprofil:** frei konfigurierbar aus dem granularen Permission-Katalog ([[02-rbac-permissions]]) —
  von „nur lesen" bis „alles bearbeiten", pro Agent auswählbar; least privilege als Default-Empfehlung.
- **Audit:** jede Agent-Aktion wird mit Agent-Identität protokolliert (unterscheidbar von Menschen, [[03-audit-logging]]).
- **Vorbereitung jetzt:** saubere OpenAPI-Beschreibungen + maschinenlesbare, stabile JSON-Outputs; Identitätsklasse
  „Agent" im Auth-/RBAC-Modell vorsehen. MCP-Server selbst wird später gebaut.

## Datenmodell (Delta)

- Identitätsklasse „Agent" (Service Account) im Auth-/RBAC-Modell; eigener Token; Rechteprofil = Subset der Permissions.

## Abhängigkeiten / Verweise

- [[19-api-design]] · [[02-rbac-permissions]] · [[01-tenant-isolation-rls]] · [[03-audit-logging]]

## Akzeptanzkriterien

- Ein Agent kann ausschließlich die ihm zugewiesenen Permissions ausführen (z.B. read-only).
- Agent-Aktionen sind im Audit als Agent (nicht als Mensch) erkennbar.
- Ein Agent kann die Mandantengrenze nicht überschreiten (RLS greift wie bei Menschen).
- OpenAPI-Beschreibungen sind vollständig genug, um als Tool-Definitionen zu dienen.

## Offene Punkte

- Konkreter MCP-Server-Tooling-Schnitt (welche Endpunkte als Tools) bei Umsetzung.

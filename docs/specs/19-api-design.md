# Spec 19 — API-Design

**Status:** APPROVED · **Bau:** MVP · **Bezug:** D-029, D-030
**Source of Truth für:** API-Stil, Versionierung, Fehlerformat, Pagination

## Zweck

Stabile, maschinen- und frontend-freundliche API als Vertrag zwischen Backend, PWA und späteren Agenten.

## Festlegungen

- **Stil:** REST, **OpenAPI-first** — die OpenAPI-Spec (`docs/architecture/openapi.yaml`) ist der Vertrag; Client-Typen
  werden daraus generiert. Entkoppelt Backend/Frontend trotz offenem Frontend-Framework (D-005).
- **Versionierung:** Version im Pfad (`/api/v1`).
- **Fehlerformat:** einheitlich **Problem Details (RFC 9457, `application/problem+json`)**.
- **Pagination:** Cursor-basiert (stabil bei großen, chronologischen Medienlisten).
- Saubere, vollständige OpenAPI-Beschreibungen (dienen auch als Tool-Beschreibungen für MCP, [[12-agent-mcp-readiness]]).

## Abhängigkeiten / Verweise

- [[09-system-architecture]] · [[12-agent-mcp-readiness]] · [[20-mobile-pwa]] · `docs/architecture/openapi.yaml`

## Akzeptanzkriterien

- Alle Endpunkte liegen unter `/api/v1` und sind in der OpenAPI-Spec beschrieben.
- Fehler werden konsistent als `problem+json` zurückgegeben.
- Listen-Endpunkte nutzen Cursor-Pagination.
- Aus der Spec generierte Client-Typen kompilieren.

## Offene Punkte

- OpenAPI-Skeleton finalisieren (BD-004).

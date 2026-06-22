# ADR-0005: Komponentendokumentation — Storybook vs. Alternativen

**Datum:** 2026-06-22
**Status:** ACCEPTED
**Entscheider:** Lead Software Architect Agent
**Bezug:** docs/design/vue-components.md, docs/design/system.md, PROTOTYP.md

---

## Kontext

Mit BD-005 entsteht die Vue-Komponentenbibliothek. Für Konsistenz, Wartbarkeit und Onboarding brauchen wir eine Strategie, wie Komponenten dokumentiert und isoliert entwickelt werden. Drei Ansätze wurden evaluiert:

1. **Storybook** — Industrie-Standard, breite Vue-3-Unterstützung, großer Footprint
2. **Histoire** — Vue-natives Storybook-Äquivalent, leichter, jünger
3. **Komponenten-Manifest + Living Styleguide** — markdown-basiert, kein Build-Tool nötig, bereits etabliert im Prototyp

---

## Entscheidung

**Phase 1 (MVP bis BD-013): Komponenten-Manifest + Living Styleguide**

Kein Storybook oder Histoire für den MVP. Dokumentation läuft über:
- `docs/design/vue-components.md` — Konventionen und Anatomie
- `frontend/prototypes/COMPONENTS.md` — Manifest aller Komponenten mit Status (LIVE / EXPERIMENT / READ-ONLY / FROZEN)
- `frontend/prototypes/DESIGN.md` — Operative Design-Tokens

**Phase 2 (nach BD-013, optional): Storybook oder Histoire evaluieren**

Nach dem Accessibility-Audit (BD-013) und sobald die Komponentenbibliothek stabil ist, wird entschieden, ob ein isoliertes Komponenten-Entwicklungstool eingeführt wird. Kriterien:
- Mehr als 3 Entwickler gleichzeitig aktiv
- Mehr als 20 produktive Komponenten
- Bedarf für visuelles Regressionstest-Setup

---

## Begründung

**Für Manifest-Ansatz in Phase 1:**
- Kein zusätzlicher Build-Schritt, keine neue Dependency.
- Prototyp (`PROTOTYP.md`) ist bereits die lebendige Referenz.
- Team-Größe und Komponentenzahl rechtfertigen Storybook noch nicht.
- Weniger Tooling-Overhead, mehr Fokus auf produktive Komponenten.

**Gegen Storybook in Phase 1:**
- Signifikanter Einrichtungsaufwand und laufende Wartung.
- Vue 3 + Vite + TypeScript + Storybook-Konfiguration komplex.
- Doppelter Betrieb (Storybook + App) erhöht CI-Zeit und Kosten.
- Nutzen erst bei stabiler Komponentenbibliothek spürbar.

**Gegen Histoire in Phase 1:**
- Gleiche Problematik wie Storybook, aber noch weniger ausgereiftes Ökosystem.
- Kleinere Community, weniger Integrationsmöglichkeiten.

---

## Konsequenzen

- `frontend/prototypes/COMPONENTS.md` bleibt primäres Komponenten-Manifest.
- Neue Komponenten werden bei Erstellung dort eingetragen mit Status-Flag.
- Storybook-Evaluation ist ein expliziter Post-MVP-Task (nach BD-013).
- ADR-0005 wird bei Storybook-Einführung auf SUPERSEDED gesetzt und durch ADR-0006 ersetzt.

---

## Alternativen, die abgelehnt wurden

| Alternative | Grund der Ablehnung |
|---|---|
| Storybook (Phase 1) | Overhead zu hoch für aktuelle Team- und Komponentengröße |
| Histoire (Phase 1) | Unreifes Ökosystem, gleicher Overhead wie Storybook |
| Docusaurus-Integration | Fokus liegt auf Code-naher Doku, nicht auf Marketing-Site |

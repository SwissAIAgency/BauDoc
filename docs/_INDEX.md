# Dokumentations-Index

**Letzte Aktualisierung:** 2026-06-22  
**Zweck:** Navigationsdatei — alle `docs/`-Inhalte auf einen Blick

> Neue Dateien in `docs/` immer hier eintragen. Veraltete Einträge mit `[DEPRECATED]` markieren.

---

## Projekt

| Dokument | Pfad | Status | Inhalt |
|---|---|---|---|
| Projektdefinition | `docs/project/definition.md` (→ Quelle: `PROJECT_DEFINITION.md`) | APPROVED | Scope, Ziele, Nicht-Ziele, MVP-Abgrenzung |
| Leistungskatalog | `docs/project/leistungskatalog.md` (→ Quelle: `LEISTUNGSKATALOG.md`) | APPROVED | Module, Funktionen, Akzeptanzkriterien |
| Roadmap | `docs/project/roadmap.md` | DRAFT | Phasen & Meilensteine |

## Architektur

| Dokument | Pfad | Status | Inhalt |
|---|---|---|---|
| Systemarchitektur | `docs/architecture/overview.md` (→ Quelle: `ARCHITECTURE.md`) | APPROVED | Laravel + Vue + PostgreSQL, System-Übersicht |
| API-Verträge | `docs/technical/api-contracts.md` | DRAFT | Request/Response-Formate |
| Datenbankmodell | `docs/technical/database-model.md` | DRAFT | Entity-Beziehungen |

## Entwicklung

| Dokument | Pfad | Status | Inhalt |
|---|---|---|---|
| Entwicklungsplan | `docs/technical/development-plan.md` | APPROVED | BD-001..BD-015, Akzeptanzkriterien |
| Deployment | `docs/technical/deployment.md` | DRAFT | Lokale Umgebung, Produktions-Deployment |
| Code-Konventionen | `docs/development/code-conventions.md` | PLANNED | Naming, Struktur, Kommentar-Standards |

## Design & UI/UX

| Dokument | Pfad | Status | Inhalt |
|---|---|---|---|
| Prototype-Spec | `PROTOTYP.md` (Root, 847 Zeilen) | APPROVED | HTML-Prototype Single Source of Truth |
| Operativer Design-Spec | `frontend/prototypes/DESIGN.md` | APPROVED | Tokens, Farben, Typografie |
| Komponenten-Manifest | `frontend/prototypes/COMPONENTS.md` | APPROVED | Komponenten, Status, Orte |
| Modal-Definitionen | `frontend/prototypes/MODALS.md` | APPROVED | 4 Modal-Typen + Flows |
| UI-Standards | `UI_STANDARDS.md` (Root) | APPROVED | Globale UI/Brand/Accessibility-Regeln |
| Barrierefreiheit | `docs/ux/accessibility.md` | DRAFT | WCAG-Anforderungen |
| Design-System | `docs/ux/design-system.md` | DRAFT | Token-System, Komponenten-Hierarchie |

### UX-Konzepte (Spezifikationen)

| Dokument | Pfad | Status | Inhalt |
|---|---|---|---|
| Dashboard-Spec | `docs/ux/concepts/dashboard-spec.md` | DRAFT | Dashboard-Layout und KPI-Aufbau |
| Preview-Card-Spec | `docs/ux/concepts/preview-card-spec.md` | DRAFT | Karten-Geometrie (READ-ONLY) |
| Scrollbar-Spec | `docs/ux/concepts/scrollbar-spec.md` | DRAFT | Custom-Scrollbar-Verhalten |
| Sidebar-Brand-Spec | `docs/ux/concepts/sidebar-brand-spec.md` | DRAFT | Sidebar + Marken-Auftritt |

## Testing

| Dokument | Pfad | Status | Inhalt |
|---|---|---|---|
| Teststrategie | `TESTING.md` (Root) | APPROVED | Testebenen, Coverage-Ziele |

## Sicherheit

| Dokument | Pfad | Status | Inhalt |
|---|---|---|---|
| Sicherheits-Übersicht | `SECURITY_PRIVACY.md` (Root) | APPROVED | Sicherheits- & Datenschutz-Grundlagen |
| Bedrohungsmodell | `security/threat-model.md` | DRAFT | Threat-Analyse |
| Risiko-Register | `security/risk-register.md` | DRAFT | Identifizierte Risiken |

## Datenschutz & Recht

| Dokument | Pfad | Status | Inhalt |
|---|---|---|---|
| Datenschutz-Review | `docs/legal/privacy-review.md` | DRAFT | Swiss DSG + EU GDPR |
| Datenklassifizierung | `docs/legal/data-classification.md` | DRAFT | Daten-Kategorien und Schutzlevel |
| Löschung & Aufbewahrung | `docs/legal/deletion-retention.md` | DRAFT | Retention-Policies |

## Fachlich / Business

| Dokument | Pfad | Status | Inhalt |
|---|---|---|---|
| Benutzerrollen | `docs/business/user-roles.md` | APPROVED | 6 Rollen, Rechte-Matrix |
| Benutzerflüsse | `docs/ux/user-flows.md` | DRAFT | Happy-Paths, Edge-Cases |

## Architektur-Entscheidungen (ADR)

| ADR | Pfad | Thema |
|---|---|---|
| ADR-0001 | `DECISIONS/0001-project-baseline.md` | Projektbasis |
| ADR-0002 | `DECISIONS/0002-architecture-baseline.md` | Architektur-Baseline |
| ADR-0003 | `DECISIONS/0003-database-model.md` | Datenbank-Modell |
| ADR-0004 | `DECISIONS/0004-technology-stack.md` | Technology-Stack |

---

## Verweise auf Nicht-docs-Dateien

| Beschreibung | Pfad |
|---|---|
| Globale Arbeitsregeln | `AGENTS.md` |
| Neustrukturierungsplan | `RESTRUKTURIERUNG.md` |
| Prototyp (Main) | `frontend/prototypes/index.html` |
| Design-Explorationen | `design-explorations/` (EXPERIMENT — nicht produktionsrelevant) |

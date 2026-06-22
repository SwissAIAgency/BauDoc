# Dokumentations-Index

**Letzte Aktualisierung:** 2026-06-22  
**Zweck:** Navigationsdatei — alle `docs/`-Inhalte auf einen Blick

> Neue Dateien in `docs/` immer hier eintragen. Veraltete Einträge mit `[DEPRECATED]` markieren.  
> Kanonische Quellen sind in `docs/` — Root-Dateien (PROJECT_DEFINITION.md etc.) leiten hierher weiter.

---

## Projekt

| Dokument | Pfad | Status | Inhalt |
|---|---|---|---|
| Projektdefinition | `docs/project/definition.md` | APPROVED | Scope, Ziele, Nicht-Ziele, MVP-Abgrenzung, Erfolgskriterien |
| Leistungskatalog | `docs/project/leistungskatalog.md` | APPROVED | Module, Funktionen, Akzeptanzkriterien, Testszenarien |

## Architektur

| Dokument | Pfad | Status | Inhalt |
|---|---|---|---|
| Systemarchitektur | `docs/architecture/overview.md` | APPROVED | Laravel + Vue + PostgreSQL, Systemübersicht, Datenflüsse |
| API-Verträge | `docs/technical/api-contracts.md` | DRAFT | Request/Response-Formate |
| Datenbankmodell | `docs/technical/database-model.md` | DRAFT | Entity-Beziehungen |

## Entwicklung

| Dokument | Pfad | Status | Inhalt |
|---|---|---|---|
| Entwicklungsplan | `docs/technical/development-plan.md` | APPROVED | BD-001..BD-015, Akzeptanzkriterien, Agents |
| Code-Konventionen | `docs/development/code-conventions.md` | APPROVED | Naming, Struktur, Kommentar-Standards, Git |
| Deployment | `docs/technical/deployment.md` | DRAFT | Lokale Umgebung, Produktions-Deployment |

## Design & UI/UX

| Dokument | Pfad | Status | Inhalt |
|---|---|---|---|
| Prototype-Spec (SSoT) | `PROTOTYP.md` (Root) | APPROVED | HTML-Prototyp Single Source of Truth (847 Zeilen) |
| Prototype-Übersicht | `docs/design/prototype-spec.md` | APPROVED | Redirect → PROTOTYP.md + Kurzreferenz |
| UI-Standards (produktiv) | `docs/design/system.md` | APPROVED | UI-Regeln, Farben, Typografie, Formatierung ab BD-005 |
| Design-Tokens (operativ) | `frontend/prototypes/DESIGN.md` | APPROVED | CSS-Variablen, Token-System |
| Komponenten-Manifest | `frontend/prototypes/COMPONENTS.md` | APPROVED | Komponenten, Status (LIVE/EXPERIMENT/READ-ONLY/FROZEN) |
| Modal-Definitionen | `frontend/prototypes/MODALS.md` | APPROVED | 4 Modal-Typen + Flows |
| Barrierefreiheit | `docs/ux/accessibility.md` | DRAFT | WCAG-Anforderungen |
| Design-System (ux) | `docs/ux/design-system.md` | DRAFT | Token-System, Komponenten-Hierarchie |

### UX-Konzepte

| Dokument | Pfad | Status | Inhalt |
|---|---|---|---|
| Dashboard-Spec | `docs/ux/concepts/dashboard-spec.md` | DRAFT | Dashboard-Layout und KPI-Aufbau |
| Preview-Card-Spec | `docs/ux/concepts/preview-card-spec.md` | DRAFT | Karten-Geometrie (READ-ONLY) |
| Scrollbar-Spec | `docs/ux/concepts/scrollbar-spec.md` | DRAFT | Custom-Scrollbar-Verhalten |
| Sidebar-Brand-Spec | `docs/ux/concepts/sidebar-brand-spec.md` | DRAFT | Sidebar + Marken-Auftritt |

## Testing

| Dokument | Pfad | Status | Inhalt |
|---|---|---|---|
| Teststrategie | `docs/testing/strategy.md` | APPROVED | Testarten, Merge-/Release-Checklisten, Testdaten-Regeln |

## Sicherheit

| Dokument | Pfad | Status | Inhalt |
|---|---|---|---|
| Sicherheits-Übersicht | `docs/security/overview.md` | APPROVED | Einstiegspunkt → SECURITY_PRIVACY.md, Threat Model, Risk Register |
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

| ADR | Pfad | Thema | Status |
|---|---|---|---|
| ADR-0001 | `DECISIONS/0001-project-baseline.md` | Projektbasis | ACCEPTED |
| ADR-0002 | `DECISIONS/0002-architecture-baseline.md` | Architektur-Baseline | ACCEPTED |
| ADR-0003 | `DECISIONS/0003-database-model.md` | Datenbank-Modell | ACCEPTED |
| ADR-0004 | `DECISIONS/0004-technology-stack.md` | Technology-Stack | ACCEPTED |

---

## Root-Dateien (weiterhin gültig, leiten auf docs/ weiter)

| Root-Datei | Kanonischer Ort in docs/ | Hinweis |
|---|---|---|
| `PROJECT_DEFINITION.md` | `docs/project/definition.md` | Redirect-Header vorhanden |
| `LEISTUNGSKATALOG.md` | `docs/project/leistungskatalog.md` | Redirect-Header vorhanden |
| `ARCHITECTURE.md` | `docs/architecture/overview.md` | Redirect-Header vorhanden |
| `UI_STANDARDS.md` | `docs/design/system.md` | Redirect-Header vorhanden |
| `TESTING.md` | `docs/testing/strategy.md` | Redirect-Header vorhanden |
| `PROTOTYP.md` | — bleibt kanonisch in Root | SSoT, zu groß für Migration |
| `SECURITY_PRIVACY.md` | `docs/security/overview.md` (Einstieg) | Vollinhalt bleibt in Root |
| `AGENTS.md` | — bleibt in Root | Globale Binding Rules |

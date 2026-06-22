# Projekt-Neustrukturierung: BauDoc / VisiDoc

**Erstellt:** 2026-06-22  
**Status:** Leitfaden — verbindlich für Phase 3+  
**Scope:** Struktur, Dokumentation, Specs, Code/UI, Beschriftung

---

## 1. Ausgangslage & Befunde

### Ist-Zustand (Phase 2 abgeschlossen)

| Bereich | Befund | Priorität |
|---|---|---|
| **Dokumenten-Duplizierung** | Root-Level-Docs (ARCHITECTURE.md, PROJECT_DEFINITION.md etc.) + nummerierte `docs/00-15_*.md` überlappen inhaltlich | 🔴 Kritisch |
| **Untracked Files** | 5 Dateien nicht committed: `design-explorations/timeline-filmstrip.html`, 4x `docs/ux/concepts/*.md` | 🟠 Hoch |
| **Fehlende Produktionscode-Konventionen** | Kein Laravel/Vue-Code → keine Konventionen definiert; erst jetzt anlegen (BD-001) | 🟠 Hoch |
| **Keine einheitliche Beschriftungs-Systematik** | `AGENTS.md` (binding rules) fragmentiert auf 5+ Stellen; kein zentrales Glossar | 🟡 Mittel |
| **Component Status ist klar** | `COMPONENTS.md` gut gepflegt — Muster für alles andere | ✅ Gut |
| **ADR-Prozess vorhanden** | `DECISIONS/` korrekt eingesetzt | ✅ Gut |

### Klärung: Was bleibt, was ändert sich

> **Keine inhaltlichen Änderungen** an Projektzielen, Architektur-Entscheidungen oder MVP-Scope  
> ohne explizite Freigabe. Diese Neustrukturierung betrifft **Form, nicht Inhalt**.

---

## 2. Ziel-Struktur (Soll)

```
baufortschritt-dokumentation-app/
│
├── ─ PROJEKT-EBENE (Root: nur Navigationsdokumente)
│   ├── README.md          ← Einstiegspunkt, Links zu allem
│   ├── AGENTS.md          ← Binding Rules (Root = globale Regeln)
│   ├── CHANGELOG.md       ← Release-Historie
│   ├── CONTRIBUTING.md    ← Contribution-Guide
│   ├── .env.example       ← Environment-Template
│   └── netlify.toml       ← Deploy-Config
│
├── ─ ENTSCHEIDUNGEN (unveränderlich nach Abschluss)
│   └── DECISIONS/
│       ├── 0001-project-baseline.md
│       ├── 0002-architecture-baseline.md
│       ├── 0003-database-model.md
│       └── 0004-technology-stack.md
│
├── ─ DOKUMENTATION (alle Specs, Plans, Policies)
│   └── docs/
│       ├── _INDEX.md                    ← Navigationsdatei (neu)
│       ├── project/                     ← Projektziele & Scope
│       │   ├── definition.md            ← (= alt: PROJECT_DEFINITION.md)
│       │   ├── leistungskatalog.md      ← (= alt: LEISTUNGSKATALOG.md)
│       │   └── roadmap.md               ← Phasen & Meilensteine
│       ├── architecture/                ← Systemarchitektur
│       │   ├── overview.md              ← (= alt: ARCHITECTURE.md)
│       │   ├── api-contracts.md
│       │   └── database-model.md
│       ├── development/                 ← Entwicklungsplan & Aufgaben
│       │   ├── plan.md                  ← BD-001..BD-015 (= alt: development-plan.md)
│       │   └── deployment.md
│       ├── design/                      ← UI/UX Spezifikationen
│       │   ├── system.md               ← (= alt: UI_STANDARDS.md)
│       │   ├── prototype-spec.md        ← (= alt: PROTOTYP.md → hier konsolidiert)
│       │   └── concepts/               ← Dashboard, Preview-Card etc.
│       ├── testing/                     ← Teststrategie
│       │   └── strategy.md             ← (= alt: TESTING.md)
│       ├── security/                    ← Sicherheit
│       │   ├── overview.md             ← (= alt: SECURITY_PRIVACY.md)
│       │   ├── threat-model.md
│       │   └── risk-register.md
│       ├── legal/                       ← Datenschutz & Compliance
│       │   ├── privacy-review.md
│       │   ├── data-classification.md
│       │   └── deletion-retention.md
│       └── business/                   ← Fachlich
│           ├── user-roles.md
│           └── user-flows.md
│           └── ux/
│               └── (Accessibility, design-system Specs, etc.)
│
├── ─ FRONTEND
│   └── frontend/
│       ├── AGENTS.md                   ← Frontend-spezifische Regeln
│       └── prototypes/                 ← Prototype-Artefakte (READ-ONLY-Pfad)
│           ├── DESIGN.md               ← Operative Design-Spec (bleibt hier)
│           ├── COMPONENTS.md           ← Komponenten-Manifest (bleibt hier)
│           ├── MODALS.md               ← Modal-Definitionen (bleibt hier)
│           ├── ARCHITECTURE.md         ← Prototype-Struktur
│           ├── app-shell.css           ← Single-Source CSS-Tokens
│           ├── index.html              ← Main Prototype (LIVE)
│           └── components/             ← Extrahierte Web Components
│
├── ─ DESIGN-EXPLORATIONS (abgegrenzt, kein Produktionseinfluss)
│   └── design-explorations/            ← EXPERIMENT-Dateien, niemals direkt referenziert
│
├── ─ BACKEND / DATABASE / (leer bis BD-001)
│   └── backend/ | database/ | ...
│
└── ─ QUALITÄTSSICHERUNG
    └── .github/
        ├── pull_request_template.md
        └── workflows/
```

---

## 3. Milestones & Deliverables

### SHORT TERM (Sofort, vor BD-001)

| # | Aufgabe | Deliverable | Abhängigkeit |
|---|---|---|---|
| S-1 | Untracked Files committen | `git add` + commit der 5 Dateien | — |
| S-2 | `docs/_INDEX.md` anlegen | Navigationsdatei für alle docs/ | — |
| S-3 | Root-Docs-Inventar erstellen | Liste welche Root-Docs migriert/archiviert werden | S-2 |
| S-4 | `RESTRUKTURIERUNG.md` (diese Datei) committen | Leitfaden verfügbar | — |
| S-5 | Naming-Conventions-Entscheid dokumentieren | Abschnitt 5 dieser Datei finalisieren | S-3 |

**Ziel:** Sauberer Ausgangspunkt für Phase 3 (BD-001). Keine losen Dateien, klare Navigierbarkeit.

---

### MID TERM (Parallel zu BD-001 bis BD-005)

| # | Aufgabe | Deliverable | Abhängigkeit |
|---|---|---|---|
| M-1 | Root-Docs nach `docs/` migrieren | `docs/project/definition.md` etc. | S-2 |
| M-2 | `ARCHITECTURE.md` → `docs/architecture/overview.md` | Architektur zentralisiert | M-1 |
| M-3 | `PROTOTYP.md` → `docs/design/prototype-spec.md` | Prototype-Spec in docs/ | M-1 |
| M-4 | `AGENTS.md` konsolidieren | Klare Hierarchie: Root (global) vs. Layer (spezifisch) | M-1 |
| M-5 | Code-Konventionen definieren | `docs/development/code-conventions.md` (Template Abschnitt 6) | BD-001 Start |
| M-6 | API-Kommentar-Standard einführen | PHPDoc + JSDoc Templates | BD-004 Start |
| M-7 | `README.md` aktualisieren | Zeigt auf neue Struktur | M-1..M-6 |

**Ziel:** Alle Informationen haben genau einen, klar beschrifteten Ort. Keine Duplikate.

---

### LONG TERM (BD-006+, MVP-Vorbereitung)

| # | Aufgabe | Deliverable | Abhängigkeit |
|---|---|---|---|
| L-1 | Vue-Komponenten-Konventionen dokumentieren | `docs/design/vue-components.md` | BD-005 |
| L-2 | OpenAPI-Spec generieren | `docs/architecture/openapi.yaml` | BD-004 |
| L-3 | Komponenten-Storybook-Konzept (oder ADR: warum nicht) | ADR-0005 | BD-005 |
| L-4 | CI/CD-Pipeline Dokumentation | `.github/workflows/` + `docs/development/deployment.md` | BD-014 |
| L-5 | Release-Prozess definieren | `CONTRIBUTING.md` aktualisieren | MVP-Release |
| L-6 | Accessiblity-Audit-Prozess | `docs/testing/accessibility.md` | BD-013 |

**Ziel:** Produktionsreife Codebasis mit vollständiger, navigierbarer Dokumentation.

---

## 4. Dokumentations-Template

Jede Dokumentationsdatei in `docs/` folgt diesem Template:

```markdown
# [Dokumenttitel]

**Zuletzt aktualisiert:** YYYY-MM-DD  
**Verantwortlich:** [Rolle oder Agent-Name]  
**Status:** `DRAFT` | `REVIEW` | `APPROVED` | `DEPRECATED`  
**Bezug:** [Verlinkung zu verwandten Docs, ADRs oder Tasks]

---

## Zweck

Ein Satz: Was regelt dieses Dokument, und warum existiert es?

## Geltungsbereich

Was ist eingeschlossen, was explizit ausgeschlossen.

## Inhalt

[Eigentlicher Inhalt — keine feste Struktur, aber klare Abschnitte mit ## Überschriften]

## Offene Punkte / Änderungshistorie

| Datum | Änderung | Autor |
|---|---|---|
| YYYY-MM-DD | Erstellt | [Name] |
```

### Spezial: ADR-Template (`DECISIONS/`)

```markdown
# ADR-XXXX: [Kurztitel der Entscheidung]

**Datum:** YYYY-MM-DD  
**Status:** `PROPOSED` | `ACCEPTED` | `SUPERSEDED` | `DEPRECATED`  
**Ersetzt durch / Ersetzt:** [ADR-YYYY, falls relevant]

## Kontext

Welches Problem musste gelöst werden? Welche Kräfte spielten eine Rolle?

## Entscheidung

Was wurde entschieden?

## Begründung

Warum diese Option, nicht die Alternativen?

## Alternativen (verworfen)

| Option | Warum verworfen |
|---|---|
| ... | ... |

## Konsequenzen

Was wird einfacher/schwieriger durch diese Entscheidung?
```

---

## 5. Naming Conventions

### 5.1 Dateinamen

| Kontext | Konvention | Beispiel |
|---|---|---|
| **Docs-Dateien** | `kebab-case.md` | `api-contracts.md`, `database-model.md` |
| **ADR-Dateien** | `NNNN-kurztitel.md` (4-stellig) | `0005-caching-strategy.md` |
| **Root-Level-Docs** | `GROSSBUCHSTABEN.md` (nur Navigation/Binding) | `README.md`, `AGENTS.md`, `CHANGELOG.md` |
| **HTML-Prototypen** | `screen-name.html` oder `feature-variant.html` | `galerie-v2.html`, `filter-b2-responsive.html` |
| **CSS-Dateien** | `scope-purpose.css` | `app-shell.css`, `preview-card-spec.css` |
| **Vue-Komponenten** | `PascalCase.vue` | `ProjectCard.vue`, `FilterPill.vue` |
| **Web Components (Prototype)** | `vd-kebab-case.js` | `vd-theme-toggle.js`, `vd-filter-pill.js` |
| **Laravel PHP** | Laravel-Standard: `StudlyCase.php` | `ProjectController.php`, `PhotoUploadService.php` |
| **Laravel Migrations** | `YYYY_MM_DD_HHMMSS_description.php` | `2026_06_22_000001_create_projects_table.php` |
| **Tests** | `DescriptiveTest.php` / `*.spec.ts` | `ProjectApiTest.php`, `project-card.spec.ts` |

### 5.2 CSS-Klassen (VisiDoc Prefix-System)

```
Prefix     Bedeutung                     Beispiel
─────────────────────────────────────────────────────
.vd-        globale App-Shell-Elemente   .vd-app, .vd-sidebar, .vd-topbar
.vd-proj-   Projekte-Screen              .vd-proj-pill, .vd-proj-card
.vd-gal-    Galerie-Screen               .vd-gal-row, .vd-gal-thumb
.vd-det-    Projekt-Detail               .vd-det-tabs, .vd-det-workspace
.vd-arch-   Archiv-Screen               .vd-arch-table, .vd-arch-kpi
.vd-set-    Einstellungen-Screen        .vd-set-section, .vd-set-nav
.vd-m-      Modals (global)              .vd-m-overlay, .vd-m-header
.vd-pw-     Projekt-Wizard              .vd-pw-step, .vd-pw-footer
.vd-uw-     Upload-Wizard               .vd-uw-dropzone, .vd-uw-preview
.vd-ex-     Export-Wizard               .vd-ex-format, .vd-ex-timerange
```

**Regeln:**
- Kein globales Override ohne Prefix (kein `button { ... }` direkt)
- `data-*`-Attribute für JavaScript-Hooks: `data-bind`, `data-active-screen`, `data-theme`
- Modifier mit `--`: `.vd-proj-card--archived`, `.vd-status--danger`

### 5.3 Vue-Komponenten (ab BD-005)

```
VisiDoc-Komponente: vd + PascalCase
  VdProjectCard.vue
  VdFilterPill.vue
  VdTimelineRow.vue
  VdMediaModal.vue

Composables: use + PascalCase
  useProjectFilter.ts
  useMediaUpload.ts

Stores (Pinia): kebab + Store Suffix
  projectStore.ts → useProjectStore()
  authStore.ts    → useAuthStore()

Types/Interfaces:
  types/Project.ts
  types/Photo.ts
```

### 5.4 Laravel Backend (ab BD-003)

```
Controller:   [Resource]Controller.php     → ProjectController, PhotoController
Service:      [Domain]Service.php          → PhotoUploadService, AuditService
Policy:       [Resource]Policy.php         → ProjectPolicy, PhotoPolicy
Request:      [Action][Resource]Request.php → CreateProjectRequest, UploadPhotoRequest
Resource:     [Resource]Resource.php       → ProjectResource, PhotoResource
Migration:    [date]_[action]_[table]_table.php
Test:         [Resource]ApiTest.php        → ProjectApiTest, AuthTest
```

### 5.5 API-Endpunkte

```
RESTful, pluralisiert, kebab-case:

GET    /api/v1/projects
POST   /api/v1/projects
GET    /api/v1/projects/{id}
PATCH  /api/v1/projects/{id}
DELETE /api/v1/projects/{id}

GET    /api/v1/projects/{id}/photos
POST   /api/v1/projects/{id}/photos

GET    /api/v1/projects/{id}/plans
POST   /api/v1/projects/{id}/plans

Prefix: /api/v1/  (versioniert ab Tag 1)
Auth:   Bearer-Token (Sanctum SPA) via Cookie für PWA
```

---

## 6. Code-Kommentar-Konventionen

### 6.1 Wann kommentieren

**Kommentare nur** wenn das "Warum" nicht aus dem Code selbst ersichtlich ist:
- Versteckter Constraint (z.B. "Laravel bug #12345")
- Business-Regel, die nicht selbst-dokumentierend ist
- Sicherheits-relevante Besonderheit
- Workaround mit Ablaufdatum (`// TODO: entfernen nach BD-008`)

**Nie kommentieren:** was der Code tut (Methodenname erklärt es), wer es geschrieben hat, wann es geändert wurde (→ git log).

### 6.2 PHPDoc (Laravel Backend)

```php
/**
 * Lädt und validiert ein Foto zur Plan-Position.
 *
 * Gibt null zurück wenn das Projekt nicht im aktiven Zustand ist,
 * weil externe Systeme Uploads an archivierte Projekte senden können.
 *
 * @throws PhotoStorageException wenn S3 nicht erreichbar
 */
public function uploadToPosition(Photo $photo, PlanPosition $position): ?PhotoResource
```

**Pflicht-Tags:** `@throws` bei checked Exceptions, `@deprecated` mit Version und Alternative  
**Optionale Tags:** `@param`, `@return` nur wenn der Typ nicht aus Signatur ersichtlich  
**Keine Tags für:** `@author`, `@since`, `@version` (→ git blame)

### 6.3 TypeScript/Vue JSDoc

```typescript
/**
 * Filtert Fotos nach Trade und Zeitraum.
 *
 * Leerer Array wird zurückgegeben (nie null) — Konsument muss
 * nicht auf null prüfen.
 */
function filterPhotos(photos: Photo[], filter: GalleryFilter): Photo[]
```

```vue
<!-- 
  VdProjectCard: Karte für ein einzelnes Projekt in der Listen- und Grid-Ansicht.
  
  Archivierte Projekte erhalten opacity:0.6 via CSS [data-archived="true"],
  weil wir keine separate Variante pflegen wollen (DRY).
-->
<template>
  ...
</template>
```

### 6.4 CSS-Kommentare (`app-shell.css`)

```css
/* ═══════════════════════════════════════════════════════
   SECTION: Sidebar Navigation
   Scope: .vd-sidebar
   Tokens: --vd-sidebar-*, --vd-nav-*
   ═══════════════════════════════════════════════════════ */

/* Sub-Section: Collapse-Zustand (getriggert via body[data-sidebar-collapsed]) */
```

---

## 7. UI-Komponenten: Beschriftungs-Standard

Jede Komponente in `COMPONENTS.md` hat:

```markdown
| Komponente          | Status       | Datei / Ort              | CSS-Scope  | Beschreibung |
|---------------------|--------------|--------------------------|------------|--------------|
| [Klarer Name]       | 🔵 LIVE      | `index.html` Zeile XXX   | `.vd-xxx-` | [1-Satz-Zweck] |
```

**Beschriftungs-Regeln:**
- Status immer aus der Status-Legende (LIVE / EXPERIMENT / READ-ONLY / FROZEN)
- Datei + Zeile (für inline Elemente) oder Pfad (für extrahierte Komponenten)
- CSS-Scope = Prefix-Klasse
- Beschreibung = **ein Satz**, beginnt mit dem Nomen (was ist es), nicht dem Verb
- Keine Doppelspurigkeit: Detaillierte Beschreibung in `DESIGN.md`, nur Referenz hier

---

## 8. Checklisten

### 8.1 Struktur-Check (vor jedem Merge nach `dev`)

- [ ] Keine neuen Dateien im Root außer erlaubten Typen (README, AGENTS, CHANGELOG, CONTRIBUTING, .env.example, netlify.toml)
- [ ] Alle neuen Docs-Dateien in `docs/[bereich]/` abgelegt
- [ ] Dateinamen folgen Konvention (Section 5.1)
- [ ] ADRs bei Architektur-Entscheidungen erstellt
- [ ] `docs/_INDEX.md` aktualisiert wenn neue Dateien hinzukommen
- [ ] Keine `file://`-inkompatiblen Links in HTML-Prototypen (kein CDN)
- [ ] `design-explorations/` enthält keine produktionsrelevante Logik

### 8.2 Dokumentations-Check

- [ ] Neues Dokument hat korrekten Header (Status, Verantwortlich, Bezug)
- [ ] Keine inhaltliche Duplizierung mit bestehenden Dokumenten
- [ ] Veraltete Dokumente sind mit `Status: DEPRECATED` markiert und zeigen auf Nachfolger
- [ ] CHANGELOG.md aktualisiert (bei User-facing Änderungen)
- [ ] Untracked Dateien committed vor PR-Erstellung

### 8.3 Code/UI-Check (ab BD-001)

- [ ] Laravel: Naming-Konventionen (Section 5.4) eingehalten
- [ ] Vue: Komponenten in `components/Vd*.vue` (Section 5.3)
- [ ] CSS: VisiDoc-Prefix-System (Section 5.2) eingehalten
- [ ] API-Endpunkte: RESTful, versioniert `/api/v1/` (Section 5.5)
- [ ] PHPDoc bei public Methoden mit nicht-trivialem Verhalten
- [ ] Keine Business-Logik in Vue-Komponenten (→ Composable oder Backend)
- [ ] Serverseitige Autorisierung in Policies (nie nur im Frontend)
- [ ] Keine Secrets, Tokens oder Credentials im Code
- [ ] Keine direkten S3-URLs als public Links
- [ ] Datumsformat in UI: `dd.mm.yyyy`, Währung: `CHF`

### 8.4 Pre-Commit-Check

- [ ] `git status` zeigt keine ungewollten Dateien
- [ ] Commit-Message folgt Konvention (Section 9)
- [ ] Gemini-Validierung bei src/-Änderungen (gemäß globalem CLAUDE.md)

---

## 9. Git-Konventionen

### Commit-Message-Format (Conventional Commits)

```
<type>(<scope>): <prägnante Beschreibung auf Deutsch>

[optionaler Body: Warum, nicht Was]

[optionale Footer: Breaking Change, Closes #issue]
```

**Types:**
```
feat      — neue Funktion
fix       — Bugfix
docs      — Dokumentationsänderung
style     — Formatierung (kein logischer Effekt)
refactor  — Umstrukturierung ohne Feature/Fix
test      — Tests hinzufügen/ändern
chore     — Build, Dependencies, Tooling
perf      — Performance-Verbesserung
security  — Sicherheits-Fix
```

**Scopes (Beispiele):**
```
(prototypes)  — HTML-Prototypen
(backend)     — Laravel-Code
(frontend)    — Vue-Code
(database)    — Migrationen/Seeds
(docs)        — Dokumentation
(ci)          — CI/CD-Pipelines
(auth)        — Authentifizierung/Autorisierung
```

**Beispiele:**
```
feat(prototypes): Timeline-Filmstrip-Variante in design-explorations
fix(prototypes): galerie inner-padding für konsistenten sidebar-gap
docs(architecture): API-Vertrags-Spezifikation ergänzen
feat(backend): PhotoUploadService mit S3-Adapter einführen
```

### Branch-Strategie

```
main      — Production-Branch (=dev in diesem Projekt)
dev       — Integration-Branch, Basis für alle Feature-Branches
fix/      — Bugfixes: fix/beschreibung-YYYY-MM-DD
feat/     — Features: feat/bd-001-technical-foundation
docs/     — Nur-Doku: docs/restructuring-2026-06
```

---

## 10. Risikobewertung

| Risiko | Wahrscheinlichkeit | Auswirkung | Massnahme |
|---|---|---|---|
| Migrations überschreiben wichtige Informationen beim Konsolidieren | Mittel | Hoch | Immer erst kopieren (neue Datei), dann alten Inhalt auf DEPRECATED setzen |
| Naming-Konventionen werden nicht konsistent eingehalten | Hoch | Mittel | Checkliste in PR-Template einbauen |
| `PROTOTYP.md` (847 Zeilen) und `docs/design/prototype-spec.md` divergieren | Mittel | Mittel | Redirect in PROTOTYP.md einfügen, Inhalt nur in `docs/design/` pflegen |
| `AGENTS.md` auf Root-Level vs. Layer-Level widersprechen sich | Niedrig | Hoch | Klare Hierarchie: Root = globale Defaults, Layer = Overrides (explizit benannt) |
| Design-Explorations werden irrtümlich in Produktion referenziert | Niedrig | Hoch | `design-explorations/README.md` mit EXPERIMENT-Warning |

---

## 11. Verantwortlichkeiten (Agent-Zuordnung)

| Bereich | Agent | Entscheidungsebene |
|---|---|---|
| Projekt-Struktur & Docs | Lead Software Architect Agent | Bindet alle anderen |
| Backend-Code | Backend Agent | Innerhalb der durch ARCHITECTURE.md definierten Grenzen |
| Frontend/Prototype | Frontend Agent | Innerhalb DESIGN.md + COMPONENTS.md |
| Datenbank | Database Agent | Innerhalb DATABASE-ADR + Schema-Docs |
| Security | Security Agent | Konsultiert bei BD-011, Veto-Recht |
| Privacy | Privacy/Legal Agent | Konsultiert bei BD-012, Veto-Recht |
| Deployment | DevOps Agent | BD-014 |

---

## 12. Sofort-Massnahmen (Kurzfristige Aktionsliste)

Diese Massnahmen sind **vor BD-001** auszuführen:

```bash
# S-1: Untracked Files committen
git add design-explorations/timeline-filmstrip.html
git add docs/ux/concepts/dashboard-spec.md
git add docs/ux/concepts/preview-card-spec.md
git add docs/ux/concepts/scrollbar-spec.md
git add docs/ux/concepts/sidebar-brand-spec.md
git commit -m "chore(docs): untracked UX-Konzepte und Design-Exploration committen"

# S-4: Diese Datei committen
git add RESTRUKTURIERUNG.md
git commit -m "docs: Neustrukturierungsplan und Konventionen definieren"
```

Danach: `docs/_INDEX.md` anlegen (S-2), Root-Docs-Inventar erstellen (S-3).

---

*Letzte Aktualisierung: 2026-06-22 | Nächste Review: vor BD-005*

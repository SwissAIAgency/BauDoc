# Code-Konventionen

**Zuletzt aktualisiert:** 2026-06-22  
**Verantwortlich:** Lead Software Architect Agent  
**Status:** APPROVED  
**Bezug:** `RESTRUKTURIERUNG.md` (Sections 5–6), `docs/architecture/overview.md`, `AGENTS.md`

---

## Zweck

Verbindliche Konventionen für Dateinamen, Klassen, Routen, Kommentare und Code-Struktur in BauDoc. Gilt ab BD-001. Änderungen am Stack erfordern Aktualisierung dieser Datei.

## Geltungsbereich

Backend (Laravel/PHP), Frontend (Vue 3/TypeScript), Datenbank (PostgreSQL Migrations), CSS (VisiDoc Prototype-System).

---

## 1. Dateinamen

| Kontext | Konvention | Beispiel |
|---|---|---|
| **Docs-Dateien** | `kebab-case.md` | `api-contracts.md` |
| **ADR-Dateien** | `NNNN-kurztitel.md` (4-stellig) | `0005-caching-strategy.md` |
| **Root-Level-Docs** | `GROSSBUCHSTABEN.md` (nur Navigation/Binding) | `README.md`, `AGENTS.md` |
| **HTML-Prototypen** | `screen-name.html` oder `feature-variante.html` | `galerie-v2.html` |
| **CSS-Dateien** | `scope-zweck.css` | `app-shell.css` |
| **Vue-Komponenten** | `PascalCase.vue` | `ProjectCard.vue` |
| **Web Components (Prototype)** | `vd-kebab-case.js` | `vd-theme-toggle.js` |
| **Laravel PHP** | Laravel-Standard `StudlyCase.php` | `ProjectController.php` |
| **Laravel Migrations** | `YYYY_MM_DD_HHMMSS_beschreibung.php` | `2026_06_22_000001_create_projects_table.php` |
| **Tests** | `DescriptiveTest.php` / `*.spec.ts` | `ProjectApiTest.php` |

---

## 2. CSS-Klassen (VisiDoc Prefix-System)

```
Prefix       Geltungsbereich                Beispiel
────────────────────────────────────────────────────────
.vd-         App-Shell (global)             .vd-app, .vd-sidebar, .vd-topbar
.vd-proj-    Projekte-Screen                .vd-proj-pill, .vd-proj-card
.vd-gal-     Galerie-Screen                 .vd-gal-row, .vd-gal-thumb
.vd-det-     Projekt-Detail                 .vd-det-tabs, .vd-det-workspace
.vd-arch-    Archiv-Screen                  .vd-arch-table, .vd-arch-kpi
.vd-set-     Einstellungen                  .vd-set-section, .vd-set-nav
.vd-m-       Modals (global)                .vd-m-overlay, .vd-m-header
.vd-pw-      Projekt-Wizard                 .vd-pw-step, .vd-pw-footer
.vd-uw-      Upload-Wizard                  .vd-uw-dropzone, .vd-uw-preview
.vd-ex-      Export-Wizard                  .vd-ex-format, .vd-ex-timerange
```

**Regeln:**
- Kein globales Override ohne Prefix (kein `button { ... }` direkt)
- `data-*`-Attribute für JS-Hooks: `data-bind`, `data-active-screen`, `data-theme`
- Modifier mit `--`: `.vd-proj-card--archived`, `.vd-status--danger`
- States mit `:is()` oder Attribute-Selektoren bevorzugen

---

## 3. Vue-Komponenten (ab BD-005)

```
Komponente:    VdPascalCase.vue
  VdProjectCard.vue
  VdFilterPill.vue
  VdTimelineRow.vue
  VdMediaModal.vue

Composables:   use + PascalCase
  useProjectFilter.ts
  useMediaUpload.ts

Pinia Stores:  kebab + Store Suffix
  projectStore.ts   → useProjectStore()
  authStore.ts      → useAuthStore()

Typen:         types/DomainName.ts
  types/Project.ts
  types/Photo.ts
  types/PlanVersion.ts

API-Client:    services/api.ts (nativer fetch-Wrapper)
```

**Komponentenregeln:**
- Keine Businesslogik direkt in `<script setup>` — in Composable auslagern
- Props mit `defineProps<{...}>()` typisieren
- Emits mit `defineEmits<{...}>()` typisieren
- Alle 5 Zustände abbilden: empty / loading / error / success / skeleton

---

## 4. Laravel Backend (ab BD-001)

```
Controller:    [Resource]Controller.php
  ProjectController, PhotoController, PlanController

Service:       [Domain]Service.php
  PhotoUploadService, AuditService, PlanVersionService

Policy:        [Resource]Policy.php
  ProjectPolicy, PhotoPolicy, PlanPolicy

Request:       [Aktion][Resource]Request.php
  CreateProjectRequest, UploadPhotoRequest, UpdatePlanRequest

Resource:      [Resource]Resource.php (JSON-Transformer)
  ProjectResource, PhotoResource, PlanVersionResource

Job:           [Aktion]Job.php
  ProcessPhotoThumbnailJob, SendPlanNotificationJob

Migration:     [datum]_[aktion]_[tabelle]_table.php

Test:          [Resource]ApiTest.php / [Domain]ServiceTest.php
  ProjectApiTest, PhotoUploadServiceTest
```

**Strukturregeln:**
- Controller: nur HTTP-Verträge (Request → Service → Resource)
- Services: Businesslogik, keine HTTP-Abhängigkeiten
- Policies: Autorisierung, immer serverseitig
- Jobs: asynchrone Tasks, idempotent gestalten

---

## 5. API-Endpunkte

```
Basis:     /api/v1/   (ab Tag 1 versioniert)
Format:    RESTful, pluralisiert, kebab-case

GET    /api/v1/projects
POST   /api/v1/projects
GET    /api/v1/projects/{id}
PATCH  /api/v1/projects/{id}
DELETE /api/v1/projects/{id}

GET    /api/v1/projects/{id}/photos
POST   /api/v1/projects/{id}/photos

GET    /api/v1/projects/{id}/plans
POST   /api/v1/projects/{id}/plans
GET    /api/v1/projects/{id}/plans/{planId}/versions

Auth:  Bearer-Token (Sanctum SPA Cookie für PWA)
```

**Response-Format (immer):**
```json
{
  "data": { ... },          // oder Array
  "meta": { "page": 1 },   // bei Listen
  "message": "..."          // bei Mutationen
}
```

**Fehler-Format (immer):**
```json
{
  "message": "Validierungsfehler.",
  "errors": { "field": ["Fehlermeldung"] }
}
```

---

## 6. Kommentar-Konventionen

### Wann kommentieren

Nur wenn das **Warum** nicht aus dem Code selbst ersichtlich ist:
- Versteckter Constraint (z. B. Laravel-Bug, Framework-Eigenart)
- Business-Regel, die sich nicht im Methodennamen ablesen lässt
- Sicherheitsrelevante Besonderheit
- Workaround mit Ablaufdatum: `// TODO: entfernen nach BD-008`

**Nie kommentieren:** was der Code tut, wer es geschrieben hat, wann es geändert wurde.

### PHPDoc (Laravel)

```php
/**
 * Gibt null zurück wenn das Projekt archiviert ist,
 * weil externe Systeme auch an archivierte Projekte uploaden können.
 *
 * @throws PhotoStorageException wenn S3 nicht erreichbar
 */
public function uploadToPosition(Photo $photo, PlanPosition $position): ?PhotoResource
```

**Pflicht:** `@throws` bei geprüften Exceptions, `@deprecated` mit Alternative  
**Nie:** `@author`, `@since`, `@version` — das gehört in `git blame`

### TypeScript/Vue JSDoc

```typescript
/**
 * Gibt immer einen Array zurück (nie null) —
 * Konsumenten müssen nicht auf null prüfen.
 */
function filterPhotos(photos: Photo[], filter: GalleryFilter): Photo[]
```

```vue
<!--
  Archivierte Projekte erhalten opacity:0.6 via CSS [data-archived="true"],
  weil wir keine separate Variante pflegen wollen.
-->
```

### CSS-Kommentare

```css
/* ═══════════════════════════════════════════════
   SECTION: Sidebar Navigation
   Scope: .vd-sidebar
   Tokens: --vd-sidebar-*, --vd-nav-*
   ═══════════════════════════════════════════════ */
```

---

## 7. Git-Konventionen

### Commit-Message-Format

```
<type>(<scope>): <prägnante Beschreibung auf Deutsch>

[optionaler Body: Warum, nicht Was]
```

**Types:** `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`, `security`

**Scopes:** `(prototypes)`, `(backend)`, `(frontend)`, `(database)`, `(docs)`, `(ci)`, `(auth)`

**Beispiele:**
```
feat(backend): PhotoUploadService mit S3-Adapter einführen
fix(frontend): Filter-State bei Seitennavigation zurücksetzen
docs(architecture): OpenAPI-Spec für Photo-Endpunkte ergänzen
test(auth): Rechteprüfung für fremde Projekte absichern
```

### Branch-Strategie

```
dev       ← Integration, Basis für alle Branches, Netlify-Production
main      ← Snapshot, nur Merge-Commits von dev

feat/bd-001-technical-foundation
fix/mobile-upload-validation-2026-07
docs/api-contract-update
```

---

## Änderungshistorie

| Datum | Änderung | Autor |
|---|---|---|
| 2026-06-22 | Erstellt aus `RESTRUKTURIERUNG.md` Sections 5–6 | Restructuring |

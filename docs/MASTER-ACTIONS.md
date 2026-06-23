# Master-Aktionsliste — VisiDoc

Stand: 2026-06-23 | Quellen: Architektur- & Sicherheits-Audit + Responsive Design Plan

Alle offenen Punkte aus beiden Audits, nach echter Dringlichkeit zusammengeführt.
Erledigt = Häkchen setzen + Datum eintragen.

> **Legende:** 🔴 Sofort / Blocker · 🟠 Vor BD-Phase · 🟡 Nächste Iteration · 🟢 Backlog

---

## Block 0 — Sofort-Fixes (kein Code nötig, < 1h)

Diese Punkte können heute erledigt werden und schließen aktive Sicherheitslücken.

- [ ] **`APP_DEBUG=false`** in `.env.example` setzen und Kommentar "NIEMALS true in Produktion" ergänzen 🔴
- [ ] **CSP + Security-Headers** in `netlify.toml` eintragen (Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, HSTS, Permissions-Policy) 🔴
- [ ] **Branch-Protection** auf `dev` in GitHub aktivieren: 1 Approval-Review vor Merge erforderlich 🔴
- [ ] **Netlify Password-Protection** aktivieren, solange Prototype öffentlich erreichbar ist 🔴

---

## Block 1 — Vor BD-002 (Datenbank-Migrations-Phase)

Diese Entscheidungen müssen vor der ersten Migration getroffen sein, sonst entstehen Breaking Changes.

- [ ] **D-1: Rollen-/Permissions-Schema** festlegen — Tabellen: `roles (id, name, org_id)`, `permissions (id, action, resource_type)`, `role_permissions`, `project_members (user_id, project_id, role_id)`. Ergebnis in `DECISIONS/0006-rollen-schema.md` festhalten 🟠
- [ ] **D-4: Soft-Delete-Strategie** entscheiden — welche Tabellen erhalten `SoftDeletes`, welche werden hard-deleted, welche nie gelöscht (audit_logs). Ergebnis in `DECISIONS/0007-soft-delete.md` 🟠
- [ ] **D-2: Composite Unique Constraints** in erster Migration miteinschließen: `(organization_id, slug)` auf `projects`, `(project_id, name)` auf `buildings`, `(building_id, name)` auf `floors` 🟠
- [ ] **D-6: CHECK-Constraints** auf `photo_locations.x/y` (Wertebereich 0.0–1.0 oder ≥ 0) in Migration aufnehmen 🟠
- [ ] **D-5: Audit-Log Partitionierung** — `audit_logs` von Beginn als Range-Partition (monthly) anlegen, nicht später nachrüsten 🟠
- [ ] **D-3: Index auf `photo_files.storage_key`** (UNIQUE) und `photo_files.photo_id` in Migration ergänzen 🟠

---

## Block 2 — Vor BD-003 (Auth & Sicherheits-Implementierung)

Sicherheitsentscheidungen die den Auth-Layer direkt formen — können nicht nachträglich eingebaut werden.

- [ ] **S-1: IDOR-Policy-Pflichtmuster** in `backend/AGENTS.md` als verbindliche Regel: jede Policy muss `organization_id` + `project_id` prüfen, kein Endpoint ohne `$this->authorize()` 🔴
- [ ] **S-7: 2FA für Admin-Rollen** als Hard Requirement in BD-003-Ticket: Laravel Fortify TOTP, `RequiresTwoFactor`-Middleware, kein API-Bypass 🔴
- [ ] **S-4: Rate Limiting** als BD-003-Akzeptanzkriterium: Login 5/min per E-Mail + 10/min per IP, API-Endpoints 60/min per User 🟠
- [ ] **S-2: CSRF/Sanctum-Konfiguration** — `SESSION_DOMAIN` und `SANCTUM_STATEFUL_DOMAINS` in `.env.example` ergänzen, `GET /sanctum/csrf-cookie` in `api-contracts.md` dokumentieren 🟠
- [ ] **S-10: Password-Reset-Sicherheit** spezifizieren — Token-TTL 60min, One-Time-Use, Session-Invalidierung nach Reset, kein Username-Enumeration 🟠

---

## Block 3 — Vor BD-004 (API-Implementierung)

Architekturentscheidungen die später Breaking Changes erzeugen wenn nicht vorab getroffen.

- [ ] **A-1: API-Versionierung** — ADR-0006 schreiben, `/api/v1/`-Präfix für alle Endpoints, alle bestehenden API-Contracts entsprechend updaten 🟠
- [ ] **A-5: Pinia State-Architektur** — ADR schreiben: Pinia als Pflicht, Store-Grenzen: `useAuthStore`, `useProjectStore`, `useNotificationStore`. Kein geteilter State in Local-Component 🟠
- [ ] **A-2: Laravel-Schichten-Pflicht** in `backend/AGENTS.md` als Regel: Controller → Service → Model. Kein Datenbankzugriff direkt im Controller 🟠

---

## Block 4 — Vor BD-005 (Frontend-Implementierung)

Frontend-Architektur-Entscheidungen die Prototype-zu-Vue-Übergabe betreffen.

- [ ] **A-4: Prototype-Entkopplung dokumentieren** — in `PROTOTYP.md` explizit festhalten: Theme-System, Screen-Switching und localStorage-Hacks sind Prototype-only, werden in Vue neu implementiert 🟠
- [ ] **A-3: PWA-Offline-Strategie** — vor BD-005 definieren: App-Shell Cache-First, API-Daten Network-First mit Fallback, Upload-Queue via IndexedDB. Vite-PWA-Plugin (Workbox) in ADR festhalten 🟠

---

## Block 5 — Vor BD-006–BD-009 (Feature-Implementierung)

Regeln die bei paralleler Feature-Entwicklung durch mehrere Agents eingehalten werden müssen.

- [ ] **P-1: Eager-Loading-Pflicht** in `backend/AGENTS.md`: jede Service-Methode die Relationen benötigt muss `with([...])` nutzen, kein lazy loading in Listings 🟠
- [ ] **P-3: Pagination-Limit** in BaseController/AppServiceProvider: Default 50, Max 100, kein unlimitierter Query möglich 🟠
- [ ] **S-5: MIME-Type Magic-Bytes-Check** in Upload-Spec ergänzen: `mimetypes:` statt `mimes:`, zusätzlich `finfo`-Check, Storage-Key immer UUID (nie Original-Filename) 🟠
- [ ] **P-2: File-Download via Pre-Signed URL** — kein `Storage::get()` in PHP-Memory, nur `temporaryUrl()` (5 Minuten) oder `StreamedResponse` 🟠

---

## Block 6 — Responsive Design P0 (Prototype — Parallelbetrieb zu Block 3–4)

Kritische Overflow- und Navigation-Bugs im Prototype, unabhängig vom Backend-Workstream.

- [x] **Galerie Overflow-Fix**: `padding-left/right: 80px` → `clamp(16px, 5vw, 80px)` in `index.html` — 2026-06-23
- [ ] **Galerie-v2 Mobile-Fallback**: JS-Boustrophedon-Layout bricht unter 500px — Single-Column-Fallback ergänzen
- [x] **Mobile Sidebar-Drawer CSS**: Hamburger-Button, Drawer mit translateX-Animation, Dark-Overlay in `app-shell.css` — 2026-06-23
- [x] **Sidebar-Drawer JS**: Focus-Trap, Escape-Key, `aria-expanded` — 2026-06-23 (Swipe-Geste: Backlog)
- [x] **`env(safe-area-inset-*)`** in `app-shell.css` + **`viewport-fit=cover`** in `index.html` — 2026-06-23
- [x] **480px-Breakpoint** für Mobile-S in `app-shell.css` — 2026-06-23

→ Detaillierter Phasenplan: [`docs/ux/responsive-plan.md`](ux/responsive-plan.md)

---

## Block 7 — Sicherheits-Härtung (Parallelbetrieb zu Block 5–6)

- [ ] **S-6: DB-User REVOKE** UPDATE/DELETE auf `audit_logs` — App-User hat nur INSERT + SELECT 🟡
- [ ] **S-9: Netlify Deploy-Previews** für Feature-Branches aktivieren (statt nur `dev`-Auto-Deploy)
- [ ] **P-4: Covering Index Plan-Viewer** — `(plan_version_id, x, y) INCLUDE (photo_id)` auf `photo_locations` 🟡

---

## Block 8 — Responsive Design P1/P2 (nach Block 6)

- [ ] Touch Targets Audit: alle interaktiven Elemente ≥ 44×44px auf `pointer: coarse`
- [ ] Fluid Typografie: `clamp()`-Skala, Body ≥ 16px auf Touch
- [ ] Modals: `max-height: calc(100dvh - 48px)`, Mobile-Width, sticky Footer
- [ ] Screen-spezifische Mobile-Ansichten (Dashboard, Galerie, Projekt-Detail, Einstellung)
- [ ] Tablet-Lücke 768–1099px schließen, Orientation-Queries

→ Vollständige Aufgaben: [`docs/ux/responsive-plan.md`](ux/responsive-plan.md) Phasen 3–7

---

## Erledigungsprotokoll

| Datum | Block | Punkt | Erledigt durch |
|---|---|---|---|
| — | — | — | — |

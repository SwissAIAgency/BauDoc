# Responsive Design Plan — VisiDoc Prototype

Stand: 2026-06-22 | Status: In Arbeit

Dieses Dokument beschreibt den aktuellen Ist-Stand der responsiven Umsetzung im Prototype-Layer (`frontend/prototypes/index.html` + `app-shell.css`) und legt einen verbindlichen Phasenplan fest. Sobald eine Aufgabe abgeschlossen ist, wird das Häkchen gesetzt und ein kurzer Kommentar mit Datum eingetragen.

---

## 1. Ist-Stand-Analyse

### Breakpoint-System (aktuell)

| Breakpoint | Media Query | Semantik |
|---|---|---|
| `1280px` | `max-width: 1280px` | Detail-Panel-Schwelle (Tablet-groß) |
| `1100px` | `max-width: 1100px` | Spalten-Reduktion in Listen |
| `900px` | `max-width: 900px` | Sidebar auto-collapse, Mobile-Übergang |
| `760px` | `max-width: 760px` | Galerie-Anpassung |
| `720px` | `max-width: 720px` | Topbar-Suche weg, Padding-Reduktion |
| `600px` | `max-width: 600px` | Single-Column, Stats-Collapse |

**Fehlende Breakpoints:**
- `480px` — sehr schmales Smartphone (iPhone SE, Galaxy A-Serie)
- `1440px+` — Ultra-Wide / Großbildschirm-Constraint
- `820px` — Lücke zwischen 900px und 720px (viele iPads)

### Screens und responsiver Status

| Screen | Mobile (≤720px) | Tablet (720–1100px) | Desktop (>1100px) | Kritische Lücken |
|---|---|---|---|---|
| **Dashboard** | ⚠ Teilweise | ✓ Gut | ✓ Gut | KPI-Grid bricht zwischen 600–720px unkontrolliert |
| **Projekte** | ⚠ Teilweise | ✓ Gut | ✓ Gut | Filter-Sidebar kein Mobile-Overlay |
| **Projekt-Detail** | ✗ Unvollständig | ⚠ Teilweise | ✓ Gut | Timeline + Workspace + Detail zu komplex für Mobile |
| **Galerie** | ✗ Unvollständig | ⚠ Teilweise | ✓ Gut | 80px festes Padding führt zu Overflow unter 500px |
| **Archiv** | ⚠ Teilweise | ✓ Gut | ✓ Gut | Callout-Grid, Tabellenspalten-Ordering |
| **Einstellung** | ⚠ Teilweise | ✓ Gut | ✓ Gut | Sticky-Nav fehlt auf Mobile |

### Bekannte Probleme (priorisiert)

#### Kritisch (P0)
- **Galerie-Horizontal-Scroll**: `padding-left: 80px` fixed → Overflow auf < 500px
- **Galerie-v2 Boustrophedon**: Y-Snapping + JavaScript-Layout nicht mobiltauglich
- **Kein Mobile-Overlay-Menü**: Sidebar kollabiert, Icons bleiben, aber Navigation ist blind (keine Labels)

#### Hoch (P1)
- **Modals auf kleinen Screens**: `max-width: 720px` ohne Höhen-Constraint → Modal größer als Viewport möglich
- **Touch Targets**: Inline-Actions, Chips (22px Höhe), Icon-Buttons (40px) teils unter 44×44px
- **Picker-Strips**: Können auf < 360px horizontal überlaufen
- **Typografie**: `font-size: 14px` body-text bleibt auf Mobile fix (WCAG empfiehlt 16px)

#### Mittel (P2)
- **Kein `viewport-fit=cover`**: Notch/Safe-Area bei neueren iPhones unberücksichtigt
- **Keine Orientation-Queries**: Portrait vs. Landscape auf Tablets unbehandelt
- **Print-Media**: In DESIGN.md dokumentiert, CSS-Umsetzung fehlt
- **Breakpoint-Benennung**: Breakpoints hardcoded in Dateien statt als CSS-Custom-Properties

#### Niedrig (P3)
- **Ultra-Wide (1440px+)**: Kein max-width-Constraint für Content-Bereiche jenseits des Hauptwrappers
- **Container Queries**: Noch nicht eingesetzt, würden komponentenweise Layouts verbessern
- **Fluid Typography**: `clamp()`-basierte Schriftgrößen fehlen

---

## 2. Zieldefinition Breakpoints (Soll)

```
Mobile S:   0 – 479px     (kleine Smartphones, One-Hand-Use)
Mobile L:   480 – 767px   (große Smartphones, ≥6")
Tablet:     768 – 1099px  (iPad, Surface, 9–12")
Desktop S:  1100 – 1279px (kleine Laptops, 13–14")
Desktop M:  1280 – 1439px (Standardlaptops, 15")
Desktop L:  1440px+       (große Monitore, max-width = 1440px Content)
```

**CSS Custom Properties Zielzustand (in `app-shell.css` Root):**
```css
:root {
  --bp-mobile-s: 480px;
  --bp-mobile-l: 768px;
  --bp-tablet:   1100px;
  --bp-desktop-s: 1280px;
  --bp-desktop-l: 1440px;
}
```

---

## 3. Phasenplan

> Jede Phase wird vollständig abgehakt, bevor die nächste beginnt.
> Format: `- [ ] Aufgabe` → `- [x] Aufgabe — erledigt 2026-XX-XX`

---

### Phase 1 — Fundament & Breakpoint-Bereinigung

**Ziel:** Einheitliches Breakpoint-System, bekannte Overflow-Bugs behoben.
**Dateien:** `app-shell.css`, `index.html`

- [x] CSS Custom Properties für alle Breakpoints in `:root` von `app-shell.css` eintragen — erledigt 2026-06-23
- [ ] Alle bestehenden Media Queries in `app-shell.css` auf neue BP-Namen umstellen (Kommentar-Kopf pro Query)
- [x] `480px`-Breakpoint für Mobile-S in `app-shell.css` ergänzen (Padding, Grid, Sidebar) — erledigt 2026-06-23
- [ ] `1440px` max-width Content-Constraint im Haupt-Wrapper (`vd-app-scroll`) prüfen und sicherstellen
- [x] `viewport-fit=cover` und `env(safe-area-inset-*)` in `app-shell.css` und `index.html` ergänzen — erledigt 2026-06-23
- [x] Galerie: `padding-left/right: 80px` auf `clamp(16px, 5vw, 80px)` umstellen → Overflow-Fix — erledigt 2026-06-23
- [ ] Galerie-v2: JS-Layout-Berechnung auf mobile Viewport-Breite testen und ggf. fallback Single-Column ergänzen

**Akzeptanzkriterien:**
- Kein horizontaler Scroll auf keinem Screen unter 320px Breite
- Alle Breakpoints konsistent aus CSS-Variablen abgeleitet (grep auf hardcoded px-Werte = 0)
- Galerie zeigt auf 375px (iPhone 14) keinen Overflow

---

### Phase 2 — Navigation & Sidebar Mobile

**Ziel:** Sidebar auf Mobile nutzbar, kein blinder Icon-Only-Modus.
**Dateien:** `app-shell.css`, `index.html` (JS-Block)

- [x] Mobile-Overlay-Muster entwerfen: Sidebar öffnet als Drawer (translateX-Animation) über Dark-Overlay — CSS erledigt 2026-06-23
- [x] Hamburger-Button in Topbar bei ≤900px einblenden (ersetzt bestehenden Sidebar-Toggle) — CSS erledigt 2026-06-23
- [x] Overlay (`vd-sidebar-overlay`) mit `pointer-events: auto` und Click-to-Close implementieren — CSS erledigt 2026-06-23
- [x] Focus-Trap für geöffneten Drawer (Tab-Reihenfolge innerhalb der Sidebar einschließen) — erledigt 2026-06-23
- [x] `aria-expanded` / `aria-controls` auf Hamburger-Button setzen — erledigt 2026-06-23
- [x] Sidebar-Close via Escape-Taste ergänzen — erledigt 2026-06-23
- [ ] Testen: iPhone 14 (375px), iPad Mini (768px), iPad Pro (1024px)

**Akzeptanzkriterien:**
- Sidebar auf 375px als Drawer öffnet/schließt korrekt
- Kein Inhalt ist hinter dem Drawer-Overlay erreichbar (Focus-Trap aktiv)
- Labels aller Nav-Items sichtbar wenn Drawer offen

---

### Phase 3 — Touch Targets & Mobile-Interaktionen

**Ziel:** Alle interaktiven Elemente erreichen 44×44px, Swipe-Gesten wo sinnvoll.
**Dateien:** `app-shell.css`, `index.html`

- [ ] Audit: alle interaktiven Elemente in `index.html` auf `min-height`/`min-width: 44px` prüfen (Script oder manuell)
- [x] Chips (`.vd-chip`): `min-height: 36px` auf `pointer: coarse` — erledigt 2026-06-23
- [x] Icon-Buttons: `44×44px` bei `pointer: coarse` — erledigt 2026-06-23
- [ ] Inline-Actions in Listen-Rows: größere Hit-Area via `padding` oder `::before`-Pseudo-Element
- [x] Picker-Strips: Snap-Scrolling + `overscroll-behavior: contain` für horizontale Scroller — erledigt 2026-06-23
- [x] `touch-action: manipulation` auf alle Buttons — erledigt 2026-06-23
- [ ] Swipe-Geste für Sidebar-Drawer (Touch-Start/Move/End Event, 50px Threshold)

**Akzeptanzkriterien:**
- Alle interaktiven Elemente ≥ 44×44px auf Touch-Geräten (Audit-Script bestätigt)
- Picker-Strips scrollen ohne Seiten-Overflow auf 375px
- Swipe-to-Open und Swipe-to-Close für Sidebar funktioniert

---

### Phase 4 — Typografie & Fluid Scaling

**Ziel:** Lesbarkeit auf allen Screens, keine fixe Body-Schriftgröße unter 16px.
**Dateien:** `app-shell.css`, DESIGN.md (Dokumentation)

- [ ] Body-Font-Size: `14px` → `clamp(14px, 1.75vw, 16px)` mit `@media (pointer: coarse)` Override auf `16px`
- [ ] Headings auf `clamp()`-Skala umstellen (H1: `clamp(20px, 2.5vw, 28px)`, H2: `clamp(16px, 2vw, 22px)`, etc.)
- [ ] Line-Height auf Mobile prüfen: ≥ 1.5 für Body-Text sicherstellen
- [ ] DESIGN.md §Typografie-Abschnitt mit Fluid-Scale dokumentieren
- [ ] Testen: 320px (iPhone SE), 375px, 768px, 1280px — keine Überschneidungen oder Overflow

**Akzeptanzkriterien:**
- Body-Text ≥ 16px auf `pointer: coarse`-Geräten
- Alle Headings brechen nicht unerwartet und überlaufen nicht
- DESIGN.md spiegelt neuen Typografie-Scale

---

### Phase 5 — Screen-spezifische Mobile-Optimierungen

**Ziel:** Jeder Screen funktioniert als vollständige Mobile-Ansicht.
**Dateien:** `index.html` (Screen-Abschnitte)

#### 5.1 Dashboard
- [ ] KPI-Grid bei 480–720px: gezielt `repeat(2, 1fr)` statt ungesteuertem 3er-Wrap
- [ ] Stats-Row (Fortschritt, Galerie, Aktivität) auf Mobile: Accordion oder Tab-Pattern statt Side-by-Side
- [ ] Quick-Actions als horizontaler Scroll-Strip auf Mobile

#### 5.2 Projekte
- [ ] Filter-Panel: Slide-in-Drawer auf Mobile (analog Sidebar-Drawer, Phase 2)
- [ ] Projekt-Karten: Touch-freundliche Tap-Targets auf gesamter Karten-Fläche
- [ ] Suchleiste: immer sichtbar auf Mobile (nicht hinter Topbar-Toggle)

#### 5.3 Projekt-Detail
- [ ] Tab-Navigation für Timeline / Workspace / Detail auf Mobile
- [ ] Timeline: vereinfachte Liste statt horizontalem Filmstrip auf < 768px
- [ ] Upload-Button: floating action button (FAB) auf Mobile

#### 5.4 Galerie
- [ ] Grid 1-Spalte auf < 480px, 2-Spalten auf 480–768px, ab 768px bestehende Logik
- [ ] Lightbox auf Mobile: Swipe-Geste zwischen Bildern
- [ ] Filter-Chips: horizontal scrollbar mit Snap

#### 5.5 Archiv
- [ ] Tabellen-Spalten-Priorität definieren: welche Spalten bleiben auf 480px sichtbar
- [ ] Callout-Grid: 1-Spalte unter 600px sicherstellen (bereits teilweise vorhanden — verifizieren)

#### 5.6 Einstellung
- [ ] Sticky-Side-Nav auf Desktop → Akkordeon auf Mobile
- [ ] Formular-Labels immer über Input (nie links daneben) auf < 768px

**Akzeptanzkriterien je Screen:**
- Jeder Screen nutzbar auf 375px ohne horizontalen Scroll
- Alle Primary-Actions erreichbar ohne zu scrollen (FAB oder sticky bar)
- Lighbox-Swipe auf Galerie funktioniert auf Touch

---

### Phase 6 — Modal & Overlay Responsiveness

**Ziel:** Modals auf allen Screens vollständig nutzbar.
**Dateien:** `modals-showcase.html`, `index.html` (Modal-Markup), `app-shell.css`

- [ ] Modal-Container: `max-height: calc(100dvh - 48px)` + `overflow-y: auto` auf Mobile
- [ ] Modal: `width: calc(100% - 32px)` auf < 600px (kein 720px-Max mehr)
- [ ] Modal-Footer (Actions) sticky am unteren Rand wenn Inhalt scrollt
- [ ] Modal öffnen/schließen via Swipe-Down (iOS-Pattern) auf Mobile ergänzen
- [ ] Bottom-Sheet-Variante für Kontext-Aktionen (teilt sich Modal-Logik)
- [ ] MODALS.md mit Mobile-Verhalten dokumentieren

**Akzeptanzkriterien:**
- Modals auf 375px vollständig sichtbar und scrollbar
- Footer-Actions immer sichtbar, auch wenn Modal-Inhalt lang ist
- Swipe-Down schließt Modal korrekt

---

### Phase 7 — Tablet-Optimierungen (768–1099px)

**Ziel:** Tablet-Erfahrung verbessern — Lücken zwischen Mobile und Desktop schließen.
**Dateien:** `app-shell.css`, `index.html`

- [ ] Lücken-Breakpoint `820px` einführen: Galerie 3-Spalten statt 2-Spalten
- [ ] Projekt-Detail auf Tablet: 2-Spalten (Timeline + Workspace), Detail-Panel als ausfahrbares Panel
- [ ] Orientation-Queries: `@media (orientation: landscape) and (max-width: 1024px)` für iPad-Landscape
- [ ] Sidebar auf Tablet: schmaler (200px statt 240px), Nav-Labels erhalten
- [ ] Split-View-Test: iPad Air (820px), iPad Pro (1024px), Surface Pro (912px)

**Akzeptanzkriterien:**
- Keine Layout-Brüche zwischen 768px und 1100px
- Orientation-Change auf iPad führt nicht zu Layout-Artifact
- Sidebar auf 820px korrekt positioniert

---

### Phase 8 — Print & Sonderfälle

**Ziel:** Druckansicht und Edge-Cases sauber.
**Dateien:** `app-shell.css`

- [ ] `@media print` Block in `app-shell.css`: Sidebar/Topbar verstecken, Content full-width
- [ ] Seitenumbrüche für Tabellen und Abschnitte (`page-break-inside: avoid`)
- [ ] Print-spezifische Farbkorrektur (keine Dark-Mode-Farben im Druck)
- [ ] Ultra-Wide (1440px+) testen: Content max-width 1440px zentriert, keine Stretching-Artefakte

**Akzeptanzkriterien:**
- Druckvorschau zeigt sinnvollen Inhalt ohne UI-Chrome
- Auf 2560px breiten Monitoren kein Stretching

---

### Phase 9 — QA & Dokumentation

**Ziel:** Verifizierten Stand dokumentieren, QA-Screenshots archivieren.
**Dateien:** `docs/ux/responsive-plan.md` (diese Datei), `DESIGN.md`, `docs/testing/`

- [ ] QA-Checkliste erstellen: alle Screens × alle Breakpoints als Tabelle
- [ ] Screenshots auf 375px, 768px, 1280px von allen 6 Screens erstellen → `frontend/prototypes/qa-shots/`
- [ ] `DESIGN.md` Abschnitt Responsive aktualisieren (Breakpoint-Tabelle, Mobile-Muster)
- [ ] `UI_STANDARDS.md` mit neuen Touch-Target-Regeln und Typografie-Scale aktualisieren
- [ ] `COMPONENTS.md` Component-Status-Tabelle um "Mobile-Status"-Spalte erweitern
- [ ] Finales Review-Meeting dokumentieren (Entscheidungen in `DECISIONS/`)

**Akzeptanzkriterien:**
- Alle 9 Phasen abgehakt
- QA-Screenshots in Repository vorhanden
- Kein offener P0/P1 Bug in Backlog

---

## 4. Nicht im Scope dieses Plans

- Vue/Framework-Migration (separater Milestone)
- Backend-API-Integration
- Native-App-Verhalten (iOS/Android App)
- I18n / Mehrsprachigkeit
- Container Queries (nach Framework-Migration sinnvoller)

---

## 5. Änderungsprotokoll

| Datum | Autor | Änderung |
|---|---|---|
| 2026-06-22 | Josh | Erstversion erstellt, Ist-Analyse und Phasen 1–9 |

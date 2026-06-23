# BauDocu / VisiDoc — Responsive-UX-Audit

**Datum:** 2026-06-23
**Auditor:** Senior UX/Frontend-Engineer
**Scope:** `frontend/prototypes/index.html` (11.989 Z., Single-File) + `frontend/prototypes/app-shell.css` (1.866 Z.)
**Geräteklassen:** Mobile ~375 px · Tablet ~768 px · Desktop ~1280 px+
**Bewertungsrahmen:** NN/g 10 Heuristiken · Refactoring UI · Material/iOS HIG · Web Vitals (INP/LCP/CLS) · WAI-ARIA
**Design-System-Referenz:** `DESIGN.md`, `UI_STANDARDS.md` (Tokens werden zitiert, nicht erfunden)

> **Methodik-Hinweis:** Der Prototyp wurde statisch gelesen, nicht gerendert. Wo das tatsächliche Pixel-Verhalten nur durch Rendering bestätigbar wäre, ist das mit **[Annahme]** markiert. Alle `datei:zeile`-Angaben sind verifiziert.

---

## Executive Summary — Top 3 kritische Probleme

| # | Problem | Geräte | Schwere |
|---|---------|--------|---------|
| **1** | **Filmstrip-/Timeline-Zone und Picker reservieren auf Mobile 264 px für eine nicht mehr vorhandene Sidebar.** `.vd-filmstrip-zone` und `.vd-picker` sind `position: fixed; left: calc(var(--sidebar-width,240px) + var(--space-6))`. Ab ≤900 px wird die Sidebar zum Overlay-Drawer (nicht mehr im Fluss), aber kein Media-Query setzt `left` zurück. Auf 375 px bleiben nur ~87 px nutzbare Breite → Timeline/Picker faktisch unbrauchbar. | Mobile, Tablet | **P1** |
| **2** | **Galerie-Spaltenzahl hat zwei konkurrierende Wahrheitsquellen.** JS `calcGalCols()` setzt `--gal-cols` dynamisch (3–8), aber `@media (max-width:720px)` erzwingt parallel hart `grid-template-columns: repeat(3,1fr)`. Unterhalb 720 px ignoriert das CSS den JS-Wert; der `galRows()`-Slot-Algorithmus rechnet aber weiter mit `PHOTOS_PER_ROW` aus `calcGalCols()` → Zeilen-Aufteilung (Empty-Slots, Serpentine-Pfad) und sichtbare Spaltenzahl driften auseinander. | Mobile, Tablet | **P1** |
| **3** | **Inkonsistenter Master-Breakpoint: Implementierung nutzt 900 px, Design-System definiert 768 px.** `DESIGN.md:296` legt den Mobile-Cutoff kanonisch auf **≤ 768 px** fest. Der Drawer, Workspace-Kollaps und die meisten Layout-Umschaltungen feuern aber bei **900 px** (`app-shell.css:1661`, `index.html:300/1345/2151/3116`). Folge: Tablet-Zone 768–900 px bekommt Mobile-Layout (Drawer + Single-Column), obwohl genug Platz für mehr da wäre. Token-Drift gegenüber dem dokumentierten Standard. | Tablet | **P1** |

---

## Breakpoint-Inventar

### CSS-Breakpoints

| Wert | Vorkommen (Auswahl) | Zweck | Bewertung |
|------|---------------------|-------|-----------|
| `max-width: 1280px` | `index.html:201, 1341, 3675` · `app-shell.css:201, 1341` | Detail-Panel/AUSWAHL ausblenden, Workspace 3→2-spaltig, Archiv-Tabelle | konsistent verwendet |
| `max-width: 1100px` | `index.html:772, 3681, 3901, 4106` | Tabellen-/Lightbox-Spalten reduzieren, Galerie-Padding | **Eigenständiger BP, nirgends sonst** |
| `max-width: 900px` | `index.html:300, 1233, 1325, 1345, 2151, 3116, 3688` · `app-shell.css:300, 1510, 1661` | **De-facto Master-Mobile-BP**: Drawer, Workspace single-col, Modal single-col, KPI-Grid, Toggle-Hide | **Weicht von DESIGN.md (768) ab** |
| `max-width: 768px` | `app-shell.css:1824` | **Nur** Suchfeld schmaler (`max-width:280px`) | **Verwaist** — der dokumentierte Master-BP wird für eine Trivialität verbraucht |
| `max-width: 720px` | `index.html:780, 3697, 3905` · `app-shell.css:1514` | Tabellen 4→2-spaltig, Galerie `repeat(3,1fr)` + Serpentine aus, Topbar/Suche kompakt | **Kollidiert mit JS `--gal-cols`** |
| `max-width: 640px` | `index.html:5442` | (lokal, modals-Kontext) | OK |
| `max-width: 600px` | `index.html:2738, 3020, 3124, 3129` | Modal-Grids → Flex-Column, Format-Grid 1-spaltig, Screen-Padding | **Block 3124 dupliziert + verwaiste `}` (3128)** |
| `max-width: 560px` | `app-shell.css:2572` | (modal-spezifisch) | OK |
| `max-width: 480px` | `app-shell.css:1782` | Topbar/Hero/Card kompakt, Brand-Text aus | **Versteckt `.vd-topbar-brand-text`, das im aktuellen Topbar-Markup nicht existiert** (toter Selector) |
| `max-width: 360px` | `app-shell.css:845, 2456` | (Sidebar-Pin-Item / Mini-Modal) | OK |
| `max-width: 920px` | `index.html:10346` | (lokaler Spätblock) | **Einzelner Ausreißer, kein BP-Token** |

### JS-Breakpoints

| Wert | Datei:Zeile | Zweck | Stimmt mit CSS? |
|------|-------------|-------|-----------------|
| `900` | `index.html:8667` | `if (innerWidth > 900) closeDrawer()` | ✅ passt zu `app-shell.css:1661` Drawer-BP |
| `THUMB_MIN=150, PAD=48, GAP=32` | `index.html:9303–9308` | `calcGalCols()` — dynamische Spaltenzahl 3–8 | ❌ **kollidiert mit `repeat(3,1fr)` @720px** (`index.html:3907`) |

### Inkonsistenz-Fazit

7 distinkte Breakpoint-Werte (1280/1100/900/768/720/600/480) plus Ausreißer 920/640/560/360. **Keine zentrale Breakpoint-Definition** (keine CSS-Custom-Properties wie `--bp-tablet`). Die drei nominellen „Stützpunkte" (Mobile/Tablet/Desktop) sind real auf **900 px** (Hauptumbruch) + **720 px** (Sekundärumbruch) verteilt, während das Design-System **768 px** vorgibt. **Empfehlung: Auf das Token-Trio konsolidieren (siehe Quick Win QW-1).**

---

## Findings pro Sektion

### A) App-Shell / Sidebar-Drawer

---

**[P1] · Mobile, Tablet · Filmstrip & Picker reservieren Platz für nicht vorhandene Sidebar**

- **Symptom:** Auf ≤900 px ist die Timeline-/Filmstrip-Leiste und der Medien-Picker um 264 px nach rechts geschoben und auf ~87 px (bei 375 px Viewport) zusammengequetscht.
- **Root Cause:**
  - `app-shell.css:1769–1772` — `.vd-filmstrip-zone { position: fixed; left: calc(var(--sidebar-width,240px) + var(--space-6,24px)); right: var(--space-6,24px); }`
  - `index.html:1463–1465` — `.vd-picker { position: fixed; left: var(--sidebar-width,240px); }`
  - Es existiert **kein** `@media (max-width:900px)`-Block, der `left` auf `0` / `var(--safe-left)` zurücksetzt. (Verifiziert: Grep nach `vd-filmstrip-zone`/`vd-picker` in den 900px-Blöcken liefert keine Treffer.)
- **Fix:** In den bestehenden Drawer-Block `app-shell.css:1661` ergänzen:
  ```css
  @media (max-width: 900px) {
    /* ... bestehende Drawer-Regeln ... */
    .vd-filmstrip-zone { left: var(--safe-left, 0px); right: 0; }
    .vd-picker        { left: 0; right: 0; width: 100%; }
    .vd-app-sidebar-collapsed .vd-filmstrip-zone { left: var(--safe-left, 0px); }
    .vd-app-sidebar-collapsed .vd-picker         { left: 0; }
  }
  ```
- **Token-Bezug:** `--safe-left` ist noch nicht definiert; in `:root` ergänzen analog zu `app-shell.css:59–60`: `--safe-left: env(safe-area-inset-left, 0px);`

---

**[P1] · Tablet · Master-Breakpoint 900 px weicht von DESIGN.md (768 px) ab**

- **Symptom:** Im Bereich 768–900 px (iPad Mini Portrait, große Phones Landscape) erscheint bereits der Mobile-Drawer und Single-Column-Workspace, obwohl die Fläche eine 2-spaltige Tablet-Ansicht trägt. Tablet-Nutzer verlieren die persistente Navigation früher als nötig.
- **Root Cause:** `DESIGN.md:296` definiert „**Mobile (≤ 768 px)**" als kanonische Grenze. Implementiert ist 900 px in: `app-shell.css:1510, 1661`; `index.html:300, 1325, 1345, 2151`. Das `768px`-Token wird stattdessen für eine Trivialität (`app-shell.css:1824` Suchfeld-Breite) „verschwendet".
- **Fix (Richtungsentscheidung erforderlich):** Zwei valide Wege —
  - **(a) Standard-konform:** Master-Mobile-BP auf 768 px ziehen (alle 900→768 px). Konsistenz mit DESIGN.md, aber 768–900 px wird dichter.
  - **(b) Design-System nachziehen:** Falls 900 px bewusst gewählt ist (Drawer-Komfort), `DESIGN.md:296` auf „≤ 900 px" aktualisieren **und** das verwaiste `app-shell.css:1824` (768px) entfernen/zusammenlegen.
  - **[Annahme]** Empfehlung (b) + Tablet-Zwischenstufe: 900 px als Drawer-Grenze behalten, aber bei 768–900 px den Workspace 2-spaltig lassen (Filter-Sidebar einklappbar statt `display:none`). Entscheidung dem Produkt-Owner vorlegen.
- **Quick Win Teil:** Verwaisten 768px-Block konsolidieren → siehe QW-2.

---

**[P2] · Mobile · Kein Body-Scroll-Lock bei offenem Drawer**

- **Symptom:** Bei geöffnetem Drawer scrollt der dahinterliegende Content beim Touch-Wischen mit (Scroll-Bleed). Verstößt gegen Material „Modal navigation drawer" (Scrim sperrt Interaktion) und NN/g #3 (User Control).
- **Root Cause:** `index.html:8608–8619` `openDrawer()` setzt nur `body.classList.add('vd-sidebar-open')`, kein `overflow:hidden` auf dem Scroll-Container. Die App-Struktur hat `html,body{overflow:hidden}` (`index.html:219`), aber der eigentliche Scroller ist `.vd-app-scroll` (`index.html:284 overflow-y:auto`) — der bleibt scrollbar. **[Annahme: Bleed über `.vd-app-scroll`, nicht über body.]**
- **Fix:** In `openDrawer()` / `closeDrawer()` (`index.html:8608, 8621`):
  ```js
  const scroller = document.querySelector('.vd-app-scroll');
  function openDrawer() {
    document.body.classList.add('vd-sidebar-open');
    if (scroller) scroller.style.overflow = 'hidden';   // Scroll-Lock
    // ... bestehender aria + focus code ...
  }
  function closeDrawer() {
    document.body.classList.remove('vd-sidebar-open');
    if (scroller) scroller.style.overflow = '';
    // ... bestehender code ...
  }
  ```
- **Token-Bezug:** keiner nötig (Verhaltensfix).

---

**[P3] · Mobile · Drawer-Focus-Trap greift erst nach manuellem Tab, `inert` fehlt für Hintergrund**

- **Symptom:** Screenreader-Nutzer können theoretisch in den (visuell verdeckten) Hintergrund-Content tabben, bis die Trap-Grenze erreicht ist. Der Focus-Trap (`index.html:8646–8663`) fängt nur Wrap-Around an erstem/letztem Element ab, macht aber den Rest des DOM nicht `inert`.
- **Root Cause:** `index.html:8646–8663` — korrekte Wrap-Logik, aber kein `aria-hidden`/`inert` auf `.vd-app-body`-Geschwistern. Positiv: `openDrawer` setzt initialen Fokus (`8615–8618`) und Escape schließt (`8639–8643`) — das ist bereits solide.
- **Fix:** Hintergrund während offenem Drawer inertisieren:
  ```js
  function openDrawer() {
    // ...
    const main = document.querySelector('.vd-app-body');
    if (main) main.setAttribute('inert', '');   // sperrt Tab + Pointer im Hintergrund
  }
  function closeDrawer() {
    const main = document.querySelector('.vd-app-body');
    if (main) main.removeAttribute('inert');
    // ...
  }
  ```
  Damit wird die manuelle Tab-Trap-Logik (8646–8663) optional/redundant — `inert` ist der robustere Standard (WAI-ARIA APG „Dialog Modal").

---

### B) Header / Topbar

---

**[P2] · Mobile · Topbar-Titel ohne Overflow-Schutz, Primary-CTA behält Label**

- **Symptom:** Langer Screen-Titel (z. B. „Projektansicht") + voller Primary-Button „Neues Projekt" + Icon-Button + Theme-Toggle können bei 375 px die Topbar überlaufen lassen bzw. den Titel abschneiden, ohne Ellipsis. **[Annahme zum konkreten Überlauf — durch Rendering bei 360–375 px zu verifizieren.]**
- **Root Cause:**
  - `index.html:264–269` — `.vd-topbar-title { white-space: nowrap; }` **ohne** `overflow:hidden; text-overflow:ellipsis;` (der Subtitle hat es bei `270–277`, der Titel nicht).
  - `index.html:4587–4592` — Primary-CTA `#vd-cta-label` „Neues Projekt" wird auf Mobile nie versteckt. Nur die Suche fällt bei ≤720 px weg (`app-shell.css:1516`).
  - `app-shell.css:1817` versteckt `.vd-topbar-brand-text` bei ≤480 px — diese Klasse existiert im aktuellen Topbar-Markup (`index.html:4575–4578`) jedoch **nicht mehr** → toter Selector.
- **Fix:**
  ```css
  /* index.html:264 — Titel kürzbar machen */
  .vd-topbar-title {
    font-size: 14px; font-weight: 600; color: var(--text-high);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    min-width: 0;
  }
  /* index.html: neuer Block — Primary-CTA-Label auf kleinen Phones zu Icon-Only */
  @media (max-width: 480px) {
    #vd-cta-label { display: none; }            /* Button wird Icon-Only */
    .vd-topbar-actions .vd-button--primary { padding: 0; width: 44px; justify-content: center; }
  }
  ```
- **Token-Bezug:** 44 px Touch-Target entspricht `DESIGN.md:505` („44 px auf Mobile und für Primäraktionen") + iOS HIG.

---

**[P1] · Touch · `.vd-button` erzwingt `height:32px` und überschreibt die 44px-Touch-Regel**

- **Symptom:** Auf Touch-Geräten bleiben Standard-Buttons real 32 px hoch statt 44 px — unter dem iOS-HIG-Minimum (44 px) und Material (48 dp). Verstößt gegen `UI_STANDARDS.md:32/98` und `DESIGN.md:505`.
- **Root Cause:** Spezifitäts-/Reihenfolge-Konflikt zweier Definitionen:
  - `app-shell.css:1737–1742` (`@media (pointer:coarse)`) setzt korrekt `.vd-button { min-height:44px; height:auto; }`.
  - `index.html:2520–2524` (inline `<style>`) definiert `.vd-button { height:32px; }` **ohne** `min-height`.
  - Ladereihenfolge: `<link app-shell.css>` (`index.html:8`) **vor** inline `<style>` (`index.html:18`). Bei gleicher Spezifität gewinnt die spätere Quelle → inline `height:32px` schlägt die `pointer:coarse`-Regel. Die `min-height:44px` greift zwar, aber `height:32px` (explizit) bleibt für `align`/Box dominanter; effektive Klickfläche bleibt zu klein. **[Annahme: durch DevTools-Computed bei `pointer:coarse` zu bestätigen.]**
- **Fix (sauberste Lösung — inline-Höhe entkoppeln):**
  ```css
  /* index.html:2524 — height durch min-height ersetzen, damit pointer:coarse aufstocken kann */
  .vd-button {
    min-height: 32px;     /* statt height: 32px */
    /* ... rest unverändert ... */
  }
  ```
  Dadurch kann `app-shell.css:1738` `min-height:44px` ohne Override greifen. Alternativ die `pointer:coarse`-Regel mit höherer Spezifität (`body .vd-button`) oder `!important` schreiben.
- **Token-Bezug:** `DESIGN.md:505` (44 px Mobile/Primär), `UI_STANDARDS.md:98` („Touch-Ziele nicht zugunsten von Dichte verkleinern").

---

### C) Galerie-Grid

---

**[P1] · Mobile, Tablet · Doppelte Wahrheitsquelle Spaltenzahl (JS `--gal-cols` vs. CSS `repeat(3,1fr)`)**

- **Symptom:** Unter 720 px zeigt das Grid visuell 3 Spalten (`repeat(3,1fr)`), aber der JS-Slot-Algorithmus füllt Zeilen nach `PHOTOS_PER_ROW = calcGalCols()` (kann 3 sein, ergibt bei sehr schmalen Viewports aber den Floor von 3 — Glück). Bei 720–~900 px berechnet `calcGalCols()` z. B. 4–5 Spalten und schreibt `--gal-cols:5`, **aber** sobald der Viewport ≤720 px fällt, überschreibt CSS hart auf 3, während `galRows()` weiter mit dem alten `PHOTOS_PER_ROW`-Wert Empty-Slots und Serpentine-Knoten generiert → falsche Slot-Zahl, Serpentine-Pfad verläuft ins Leere (Serpentine ist bei ≤720 px ohnehin `display:none`, `index.html:3908`, aber die Slot-Struktur bleibt inkonsistent).
- **Root Cause:**
  - `index.html:3899` — `.vd-gal-row { grid-template-columns: repeat(var(--gal-cols,6),1fr); }` (JS-gesteuert)
  - `index.html:3907` — `@media (max-width:720px) { .vd-gal-row { grid-template-columns: repeat(3,1fr); } }` (hart, überschreibt)
  - `index.html:9300–9309` — `calcGalCols()` `return Math.max(3, Math.min(8, cols))` ohne Kenntnis der CSS-720px-Regel.
- **Fix:** **Eine** Wahrheitsquelle. JS soll die Untergrenzen aus denselben Breakpoints ableiten, CSS-Override entfernen:
  ```css
  /* index.html:3905 — repeat(3,1fr) entfernen, nur Gap/Padding behalten */
  @media (max-width: 720px) {
    .vd-gal-rows { padding: 0 20px; }
    .vd-gal-row  { gap: 16px; }           /* grid-template-columns NICHT mehr hart setzen */
    .vd-gal-serpentine-svg { display: none; }
  }
  ```
  ```js
  // index.html:9303 — Curve-Pad auf Mobile reduzieren (passt zu CSS-Padding oben)
  function calcGalCols() {
    const rowsEl = document.getElementById('vd-gal-rows');
    if (!rowsEl || !rowsEl.clientWidth) return 6;
    const w = rowsEl.clientWidth;
    const PAD = w <= 720 ? 20 : 48;   // mit CSS-Padding synchron
    const GAP = w <= 1100 ? (w <= 720 ? 16 : 24) : 32;  // mit CSS-Gap synchron
    const THUMB_MIN = 150;
    const avail = w - 2 * PAD;
    const cols = Math.floor((avail + GAP) / (THUMB_MIN + GAP));
    return Math.max(2, Math.min(8, cols));   // Floor auf 2 für sehr schmale Phones
  }
  ```
  Damit ist `--gal-cols` die alleinige Quelle; Slot-Aufteilung und sichtbares Grid bleiben synchron. Auf 375 px ergibt `(375-40+16)/(150+16) ≈ 2,1 → 2 Spalten` (THUMB_MIN 150 bei 2 Spalten = realistisch).
- **Token-Bezug:** keine DESIGN.md-Token für Galerie-Spalten; Werte sind prototyp-intern, aber jetzt single-source.

---

**[P2] · Mobile · `THUMB_MIN=150` zu groß für 375 px → effektiv max. 2 Spalten mit gequetschten Thumbs**

- **Symptom:** Bei `min` 3 Spalten (alter Floor) auf 375 px: `(375 − 96 [PAD] − 64 [2·GAP]) / 3 ≈ 71 px` pro Thumb — weit unter `THUMB_MIN`. Mit dem Fix oben (Floor 2) sind es ~150 px, akzeptabel.
- **Root Cause:** `index.html:9305, 9308` Floor 3 + PAD 48 unrealistisch für Mobile.
- **Fix:** im Fix oben enthalten (Floor → 2, PAD mobil → 20).
- **Token-Bezug:** —

---

**[P3] · Mobile · Galerie-Resize feuert `renderGalerie()` (Full Re-Innerhtml) bei Orientierungswechsel**

- **Symptom:** Bei jedem Spaltenwechsel wird die gesamte Galerie per `root.innerHTML = …` neu aufgebaut (`index.html:9341, 9444`). Auf langsamen Baustellen-Phones potenzieller INP-/Jank-Spike bei Rotation. Doppelter `requestAnimationFrame` (`index.html:9438–9439`) dämpft, aber Re-Render bleibt teuer.
- **Root Cause:** `index.html:9436–9450` Resize-Handler ruft bei Spaltenänderung `renderGalerie()` (komplettes Markup + neues Event-Binding aller Cells/Dots).
- **Fix [Annahme — Optimierung]:** Bei reiner Spaltenänderung nur `--gal-cols` + Slot-Reflow statt Full-Rebuild; Event-Delegation auf `root` statt pro-Cell-Listener (`index.html:9376–9400`) reduziert Re-Bind-Kosten. Niedrige Prio, da nur bei Rotation.
- **Token-Bezug:** Web Vitals INP.

---

### D) Timeline / Filmstrip

> Hauptproblem (fixed `left`) siehe **A) [P1]**. Zusätzlich:

**[P2] · Mobile · Filmstrip-Höhe + Safe-Area-Bottom nicht kombiniert**

- **Symptom:** Der fixed Filmstrip sitzt `bottom:0` (`app-shell.css:1773`). Auf iPhones mit Home-Indicator überlappt der untere Strip-Rand die Gestenzone; `--safe-bottom` wird zwar global auf `.vd-app-scroll` angewandt (`app-shell.css:1721`), aber **nicht** auf den fixed Filmstrip.
- **Root Cause:** `app-shell.css:1769–1777` `.vd-filmstrip-zone` ohne `padding-bottom: var(--safe-bottom)`.
- **Fix:**
  ```css
  /* app-shell.css:1773 */
  .vd-filmstrip-zone { bottom: 0; padding-bottom: var(--safe-bottom, 0px); }
  ```
- **Token-Bezug:** `--safe-bottom` ist in `app-shell.css:60` definiert (`env(safe-area-inset-bottom,0px)`).

---

### E) Filter-Leiste / Pills

**[P2] · Mobile · Galerie-Filter-Pills ohne horizontalen Scroll-Container → Umbruch oder Overflow**

- **Symptom:** Die Galerie-Toolbar (`vd-proj-card` sticky, `index.html:3795`) enthält mehrere Filter-Pills (`[data-gal-pill]`, JS bei `index.html:9459`). Auf 375 px brechen sie mehrzeilig um und drücken die sticky Toolbar in die Höhe oder erzeugen horizontalen Overflow. **[Annahme — Pills-Container-CSS nicht mit `overflow-x:auto` gefunden.]**
- **Root Cause:** Es existiert `.vd-picker-strip { overflow-x:auto; scroll-snap }` (`app-shell.css:1833`) für den Medien-Picker, aber **kein** äquivalenter horizontaler Scroll-Container für die Galerie-Filter-Pill-Reihe. Die Tabs-Bar hat ihn (`index.html:1326 overflow-x:auto`), die Galerie-Filter nicht.
- **Fix:** Den Pill-Wrapper (Selektor aus dem Galerie-Toolbar-Markup, z. B. `.vd-gal-filters`) horizontal scrollbar machen, analog zur Tabs-Bar:
  ```css
  .vd-gal-filters {
    display: flex; gap: var(--space-2);
    overflow-x: auto; flex-wrap: nowrap;
    scroll-snap-type: x proximity;
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;          /* Pills brauchen keine sichtbare Scrollbar */
  }
  .vd-gal-filters > * { scroll-snap-align: start; flex-shrink: 0; }
  ```
  **Hinweis:** Exakten Wrapper-Klassennamen im Galerie-Toolbar-Markup verifizieren (Suche `data-gal-pill`-Elternelement) bevor angewandt.
- **Token-Bezug:** `--space-2` (`DESIGN.md:159`).

---

### F) Modals (Export etc.)

**[P2] · Mobile · Export-/Medien-Modal: Single-Column erst bei 900 px, Action-Buttons evtl. zu klein**

- **Symptom:** `.vd-modal` klappt bei ≤900 px auf 1 Spalte (`index.html:2151–2153`, Side-Panel `display:none`) — funktional korrekt. Aber `.vd-modal-actions .vd-button { height:32px }` (`index.html:2289`) erzwingt 32 px auch auf Touch → unter 44 px.
- **Root Cause:** `index.html:2289` fixe 32 px Höhe für Modal-Action-Buttons; selber Konflikt wie B)[P1].
- **Fix:** im Touch-Block (`app-shell.css:1737`) ergänzen oder `index.html:2289` auf `min-height:32px` ändern, damit `pointer:coarse` aufstocken kann:
  ```css
  /* index.html:2289 */
  .vd-modal-actions .vd-button { flex: 1; min-height: 32px; font-size: 12px; }
  ```
- **Token-Bezug:** `DESIGN.md:505`.

**[P2] · Mobile · Modal nutzt `max-height:96vh`, kein `dvh` → Adressleisten-Jump auf iOS Safari**

- **Symptom:** `.vd-modal { max-height: 96vh }` (`index.html:2152`). `vh` bezieht auf das größte Viewport (mit ausgeblendeter Safari-Adressleiste); beim Ein-/Ausblenden der Leiste springt die Modal-Höhe / wird unten abgeschnitten.
- **Root Cause:** `index.html:2145 (max-height:90vh)` und `2152 (96vh)` nutzen `vh` statt `dvh`. Positiv: Drawer-Sidebar nutzt bereits `height:100dvh` (`app-shell.css:1678`) — Konsistenz fehlt.
- **Fix:**
  ```css
  .vd-modal { max-height: 90dvh; }                 /* index.html:2145 */
  @media (max-width:900px){ .vd-modal{ max-height:96dvh; } }  /* index.html:2152 */
  ```
- **Token-Bezug:** — (Konsistenz mit `app-shell.css:1678` dvh-Nutzung).

---

### G) Globale Befunde

**[P2] · Mobile · `prefers-reduced-motion` nur teilweise abgedeckt**

- **Symptom:** DESIGN.md fordert `prefers-reduced-motion` „standardmässig aktiv" (`DESIGN.md:569, 578, 619`). `app-shell.css:1220` hat einen `@media (prefers-reduced-motion: reduce)`-Block, aber die vielen inline-`transition`/`@keyframes` in `index.html` (z. B. `vd-modal-in` `index.html:3092`, Workspace `padding-bottom`-Transition `index.html:1339`, Galerie-Serpentine-Transitions `index.html:3889`) sind nicht global neutralisiert.
- **Root Cause:** Kein globaler Reduced-Motion-Reset im inline-`<style>`.
- **Fix:** Globalen Reset am Ende des inline-`<style>` ergänzen:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
- **Token-Bezug:** `DESIGN.md:569/578/619`.

**[P3] · Alle · Duplizierter Media-Block + verwaiste `}` im inline-`<style>`**

- **Symptom:** Toter/duplizierter CSS-Code; erhöht Wartungsrisiko, potenzielles Style-Leck.
- **Root Cause:** `index.html:3124–3132` — `@media (max-width:600px){…}` (3124–3127) gefolgt von verwaister `}` (3128) und **identischem** Block (3129–3132).
- **Fix:** Zeilen **3128–3132 ersatzlos löschen** (der Block 3124–3127 bleibt). Die verwaiste `}` (3128) sollte keinen gültigen Block schließen — CSS-Parser sind tolerant, aber das gehört bereinigt.
- **Token-Bezug:** —

**[P3] · Alle · Toter Selector `.vd-topbar-brand-text` im 480px-Block**

- **Root Cause:** `app-shell.css:1817` versteckt `.vd-topbar-brand-text`, das im aktuellen Topbar-Markup (`index.html:4575–4578`) nicht mehr existiert (durch `.vd-topbar-titles` ersetzt).
- **Fix:** Zeile `app-shell.css:1817` entfernen oder auf `.vd-topbar-subtitle` (das real bei Platzmangel verzichtbar ist) ummünzen.
- **Token-Bezug:** —

---

## Quick Wins (< 30 min)

| ID | Fix | Datei:Zeile | Aufwand |
|----|-----|-------------|---------|
| **QW-1** | **Breakpoint-Tokens zentralisieren:** `--bp-mobile:768px; --bp-tablet:900px; --bp-desktop:1280px` in `:root` definieren und als Doku-Anker nutzen (Media-Queries können nicht direkt Custom-Props nutzen, aber als Single-Source-Kommentar + künftige Container-Queries). | `app-shell.css:~24` (`:root`) | 10 min |
| **QW-2** | Verwaisten 768px-Block (`app-shell.css:1824`, nur Such-Breite) in den 720px-Block (`app-shell.css:1514`) zusammenlegen. | `app-shell.css:1824` | 5 min |
| **QW-3** | Duplizierten 600px-Block + verwaiste `}` löschen. | `index.html:3128–3132` | 5 min |
| **QW-4** | Topbar-Titel `overflow:hidden; text-overflow:ellipsis; min-width:0`. | `index.html:264` | 5 min |
| **QW-5** | Filmstrip + Modal auf `dvh`/`safe-bottom` umstellen. | `app-shell.css:1773` · `index.html:2145,2152` | 10 min |
| **QW-6** | Globaler `prefers-reduced-motion`-Reset. | `index.html` (Ende `<style>`) | 5 min |
| **QW-7** | `.vd-button` `height:32px` → `min-height:32px` (entsperrt 44px-Touch-Regel). | `index.html:2524` · `index.html:2289` | 5 min |
| **QW-8** | Toten `.vd-topbar-brand-text`-Selector entfernen. | `app-shell.css:1817` | 2 min |

---

## Empfohlene Umsetzungsreihenfolge

**Phase 1 — Mobile-Blocker (P1, ~1–2 h):**
1. **Filmstrip/Picker fixed-`left` auf Mobile zurücksetzen** (A/P1) — größter sichtbarer Mobile-Defekt.
2. **Galerie-Spalten single-source** (C/P1) — CSS-`repeat(3,1fr)` entfernen, `calcGalCols()` mit CSS-Werten synchronisieren.
3. **`.vd-button` Touch-Höhe entsperren** (B/P1, QW-7) — Trivial-Fix mit hoher a11y-/HIG-Wirkung.
4. **Breakpoint-Entscheidung 768 vs. 900** (A/P1) — Produkt-Owner-Abstimmung, dann konsolidieren (QW-1/QW-2).

**Phase 2 — Robustheit & Standards (P2, ~1,5 h):**
5. Body-Scroll-Lock + `inert` für Drawer (A/P2+P3).
6. Topbar-Titel-Ellipsis + CTA-Icon-Only ≤480px (B/P2, QW-4).
7. Galerie-Filter-Pills horizontal scrollbar (E/P2).
8. `dvh` + `safe-bottom` für Modal/Filmstrip (D/F, QW-5).
9. Globaler `prefers-reduced-motion`-Reset (G/P2, QW-6).

**Phase 3 — Aufräumen (P3, ~30 min):**
10. Duplizierter 600px-Block + verwaiste `}` (QW-3).
11. Toter `.vd-topbar-brand-text`-Selector (QW-8).
12. Galerie-Resize-Optimierung (Event-Delegation statt Full-Rebuild) — optional.

---

## Verifikations-Checkliste (nach Umsetzung)

- [ ] Chrome DevTools Device-Emulation: iPhone SE (375), iPad Mini (768), iPad (810), Desktop (1280/1440) — je Screen Dashboard/Projekte/Detail/Galerie/Archiv durchklicken.
- [ ] Galerie bei 375/600/720/900/1100/1280 px: Spaltenzahl visuell == JS `--gal-cols` (Computed Style prüfen), keine leeren Phantom-Slots.
- [ ] Filmstrip/Picker bei 375 px: nutzt volle Breite, kein 264px-Versatz.
- [ ] Drawer offen: Hintergrund nicht scrollbar, Tab bleibt im Drawer, Escape schließt.
- [ ] Alle Buttons bei `pointer:coarse`: Computed `height` ≥ 44 px.
- [ ] iOS Safari real: Modal-Höhe stabil bei Adressleisten-Ein/Ausblenden; Home-Indicator überlappt Filmstrip nicht.
- [ ] `prefers-reduced-motion: reduce` (OS-Setting): keine Modal-/Serpentine-/Padding-Transitions.
- [ ] Kein horizontaler Scroll auf `<body>` bei 360 px (DevTools „scroll width > viewport"-Check).

---

*Erstellt als statische Code-Analyse. Pixel-genaue Bestätigung der mit **[Annahme]** markierten Punkte erfordert Rendering in DevTools-Emulation + echtem iOS-Gerät.*

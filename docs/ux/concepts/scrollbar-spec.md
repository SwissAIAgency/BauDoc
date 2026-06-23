# Scrollbar Spec

> **Geltungsbereich.** Verbindliche Spec für die Custom-Scrollbar
> in den App-Containern von `frontend/prototypes/index.html`.
> Quelle der Implementierung: `app-shell.css` (Tokens in beiden
> Theme-Blöcken + Sektion "SCROLLBAR – VisiDoc-Style" am Ende).
> Inline-Styles im `<style>`-Block wurden entfernt; alle
> Scrollbar-Styles sind zentral.

---

## 1. Scope

Custom-Styles greifen **nur** auf folgende Container:

| Container | Begründung |
|---|---|
| `.vd-app-scroll` | Haupt-Scrollbereich (rechts im Body, unter Topbar) |
| `.vd-sidebar` | Sidebar-internes Scrollen bei langem Nav-Inhalt |
| `.vd-modal-picker` | Horizontaler Streifen im Medien-Modal |
| `.vd-picker-strip` | Horizontaler Apple-Picker-Streifen (Projekt-Detail) |
| `.vd-gal-rows` | Galerie-Scrollbereich (vertikal, **thin-Variante**) |

`.vd-gal-rows` nutzt dieselben Farb-Tokens wie die anderen
Container, aber die **thin-Breite (6 px)**, weil die Galerie als
eigenständiger Container im Body-Slot sitzt und schmaler
gestaltet ist als der Haupt-Body-Scrollbereich.

**Bewusst ausgeschlossen:** Inputs, Textareas, Selects,
Code-Blöcke. Diese bleiben auf nativen Scrollbars, damit kein
unerwarteter 10-px-Layout-Shift in Formularen entsteht.

---

## 2. Design-Tokens

### Dark Theme (Default, `:root` + `[data-theme="dark"]`)

| Token | Wert | Verwendung |
|---|---|---|
| `--scrollbar-track` | `transparent` | Hintergrund der Rinne (verschwindet im Panel) |
| `--scrollbar-thumb` | `rgba(124, 132, 143, 0.32)` | Thumb idle (gedämpftes text-low @ 32 %) |
| `--scrollbar-thumb-hover` | `rgba(163, 172, 184, 0.55)` | Thumb hover (text-mid @ 55 %) |
| `--scrollbar-thumb-active` | `var(--color-primary)` (#668048) | Thumb active / drag (Salwei-Akzent) |
| `--scrollbar-size` | `10px` | Main-Scrollbar (vertikal + horizontal) |
| `--scrollbar-size-thin` | `6px` | Thin-Variante für Picker-Strips |

### Light Theme (`[data-theme="light"]`)

| Token | Wert |
|---|---|
| `--scrollbar-track` | `transparent` |
| `--scrollbar-thumb` | `rgba(124, 132, 143, 0.32)` |
| `--scrollbar-thumb-hover` | `rgba(90, 99, 108, 0.55)` (dunkleres text-low) |
| `--scrollbar-thumb-active` | `var(--color-primary)` |
| `--scrollbar-size` | `10px` |
| `--scrollbar-size-thin` | `6px` |

**Begründung der Hover-Tokens:** Auf hellem Panel-Background
muss der Hover dunkler werden (mehr Opazität, dunklerer
Basis-Ton), damit der Kontrast steigt. Auf dunklem Panel reicht
es, heller zu werden (mehr Opazität auf text-low).

---

## 3. Form & Verhalten

### Pill-Geometrie

- **Thumb** ist `border-radius: 999px` → Pill-Form, konsistent
  mit Pill-Buttons, Pills, Tags in der App.
- **2 px transparenter Rahmen** um den Thumb (`border: 2px solid
  transparent; background-clip: padding-box;`) → der Thumb sitzt
  visuell **mittig in der 10-px-Rinne**, klebt nicht am Rand.
  Effektive Thumb-Breite: 6 px (10 − 2 × 2).
- **Track** ist komplett `transparent` → kein sichtbarer
  Hintergrund, der Thumb steht allein.

### Zustände

| Zustand | Property | Visuelle Wirkung |
|---|---|---|
| **Idle** | `background: var(--scrollbar-thumb)` | gedämpftes Grau, niedrige Opazität |
| **Hover** | `background: var(--scrollbar-thumb-hover)` | heller/dunkler je nach Theme, höhere Opazität |
| **Active / Drag** | `background: var(--scrollbar-thumb-active)` | Salwei (#668048), eindeutiges Fokus-Feedback |
| **Focus (Tastatur)** | identisch zu Active | Salwei markiert die Scroll-Position |

### Transition

| Property | Wert |
|---|---|
| `transition` | `background 120ms ease` |

Reicht für sanfte Zustandswechsel, ohne träge zu wirken.

---

## 4. Browser-Implementierung

### Firefox (Standard-Properties)

```css
.vd-app-scroll,
.vd-sidebar,
.vd-modal-picker,
.vd-picker-strip {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
}
```

`thin` = Browser-interne "schmale" Variante (in Firefox 11 px).
`scrollbar-color: <thumb> <track>` = die zwei Hauptfarben.

### Webkit (Chrome / Safari / Edge)

Pseudo-Klassen pro Container (4× Selektor-Liste wegen DRY):

```css
.vd-app-scroll::-webkit-scrollbar,
.vd-sidebar::-webkit-scrollbar,
.vd-modal-picker::-webkit-scrollbar,
.vd-picker-strip::-webkit-scrollbar {
  width: var(--scrollbar-size);
  height: var(--scrollbar-size);
  background: var(--scrollbar-track);
}
```

Plus identisch für `::-webkit-scrollbar-track`,
`::-webkit-scrollbar-thumb`, `::-webkit-scrollbar-thumb:hover`,
`::-webkit-scrollbar-thumb:active`, `::-webkit-scrollbar-corner`.

### Thin-Variante (nur Picker-Strips + Galerie)

Die horizontalen Streifen und die vertikale Galerie bekommen
eine schmalere Optik:

```css
.vd-picker-strip::-webkit-scrollbar,
.vd-modal-picker::-webkit-scrollbar {
  height: var(--scrollbar-size-thin); /* 6px statt 10px */
}
.vd-picker-strip::-webkit-scrollbar-thumb,
.vd-modal-picker::-webkit-scrollbar-thumb {
  border-width: 1px; /* dünnerer Rand → etwas breiterer Thumb */
}
```

Begründung: Picker sind sekundäre Scroll-Bereiche (Streifen
innerhalb einer Card). Eine 10-px-Scrollbar wäre dort
überproportioniert. 6 px bleibt sichtbar und konsistent zur
Pill-Ästhetik der Tile-Strips.

### Galerie-Erweiterung (vertikales Thin-Pendant)

Die Galerie-Scrollbar nutzt dieselben Farb-Tokens wie der
Haupt-Body, aber die **6-px-thin-Breite** und eine eigene
Webkit-Definition (analog zu Picker-Strip). Inline-Definition
in `index.html` (kein Scope-Eintrag in `app-shell.css`, weil
die Galerie nur in `index.html` lebt und nicht zum generischen
App-Shell-Scope gehört):

```css
.vd-gal-rows {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
}
.vd-gal-rows::-webkit-scrollbar {
  width: var(--scrollbar-size-thin);   /* 6px – thin wie Picker-Strip */
  height: var(--scrollbar-size-thin);
  background: var(--scrollbar-track);
}
.vd-gal-rows::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: padding-box;
  transition: background 120ms ease;
}
.vd-gal-rows::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover);
}
.vd-gal-rows::-webkit-scrollbar-thumb:active {
  background: var(--scrollbar-thumb-active);
}
```

**Wichtig:** Vorher hatte die Galerie eine eigene Salwei-Farbe
(`rgba(102, 128, 72, 0.45)`) als dauerhafte Default-Farbe — das
war inkonsistent zum Body (grau) und brach die "Salwei nur im
Active-State"-Regel. Jetzt greifen die zentralen Tokens, und
Salwei erscheint nur beim Klicken/Ziehen — identisch zur
Body-Scrollbar in Dashboard und Projekten.

---

## 5. Touch / Mobile Override

```css
@media (pointer: coarse) {
  .vd-app-scroll,
  .vd-sidebar,
  .vd-modal-picker,
  .vd-picker-strip {
    scrollbar-width: auto;
  }
  .vd-app-scroll::-webkit-scrollbar,
  .vd-sidebar::-webkit-scrollbar,
  .vd-modal-picker::-webkit-scrollbar,
  .vd-picker-strip::-webkit-scrollbar {
    width: auto;
    height: auto;
  }
}
```

**Verhalten:** Auf Touch-Geräten (Smartphone, Tablet) zeigt der
Browser eine native **Overlay-Scrollbar**, die nur während des
Scrollens sichtbar wird und keinen reservierten Platz braucht.

**Begründung:**
- Kein Layout-Shift durch 10 px reservierten Bereich
- Touch-Geräte haben keine Maus → Affordance für "Drag-Scrollbar"
  ist nicht relevant
- Native Overlay-Scrollbar ist OS-konsistent (iOS / Android)

---

## 6. Auto-Hide vs. Always-Visible

| Aspekt | Entscheidung |
|---|---|
| Modus | **Always-visible (klassisch)** |
| Begründung | Konsistente Discoverability auf Desktop, kein Layout-Shift beim Ein-/Ausblenden, Standard-Erwartungshaltung auf Maus-basierten Systemen |
| Trade-off | 10 px permanenter Platz → bei sehr kleinen Viewports suboptimal, daher auf Mobile (≤ coarse pointer) Auto-Hide via Native |

---

## 7. Accessibility

| Aspekt | Spec |
|---|---|
| Kontrast Thumb vs. Track/Background | ≥ 3:1 (WCAG-AA für UI-Komponenten) |
| Kontrast Active | Salwei #668048 auf `bg-panel` = 4.83:1 (Dark) bzw. 3.91:1 (Light) — beide ≥ AA-Large |
| Tastatur-Scrolling | `Tab` in den Container → `Pfeile`, `Bild↑/Bild↓`, `Pos1/Ende` funktionieren unverändert |
| Fokus-Indikator | Salwei-Akzent beim Active-State dient als impliziter Fokus-Marker |
| `prefers-reduced-motion` | `transition: background 120ms ease` ist unter 120 ms — auch bei Reduced Motion akzeptabel (kein kritischer Effekt) |

---

## 8. Visibility-Matrix

| Container | Mode | Width | Thumb-Höhe | Hover | Active |
|---|---|---|---|---|---|
| `.vd-app-scroll` | Desktop | 10 px | Pill | heller/dunkler | Salwei |
| `.vd-app-scroll` | Touch | auto | Overlay | n/a | n/a |
| `.vd-sidebar` | Desktop | 10 px | Pill | heller/dunkler | Salwei |
| `.vd-modal-picker` | Desktop | 6 px (thin) | Pill | heller/dunkler | Salwei |
| `.vd-picker-strip` | Desktop | 6 px (thin) | Pill | heller/dunkler | Salwei |
| `.vd-gal-rows` | Desktop | 6 px (thin) | Pill | heller/dunkler | Salwei |

---

## 9. Siehe auch

- `app-shell.css` § Design-Tokens (Zeile ~50 ff. für Dark, ~85 ff. für Light)
- `app-shell.css` § SCROLLBAR – VisiDoc-Style (Zeile ~1484 ff.)
- `docs/ux/concepts/visidoc-DESIGN.md` § Farb-Tokens (für Theming-Konsistenz)
- `docs/ux/accessibility.md` (WCAG-AA-Validierung der Kontrastwerte)

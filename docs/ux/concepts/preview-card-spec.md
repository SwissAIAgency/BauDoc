# Preview-Card Spec

> **Geltungsbereich.** Verbindliche Geometrie-Spec für die VisiDoc-Preview-
> Card und die Galerie-Cells (Bild + Datum/Zeit-Stempel + vertikale
> Trendlinie + Anker-Dot + Serpentine-Connector).
> Quelle der Implementierung:
> `frontend/prototypes/preview-card-spec.css` (locked CSS-Custom-Properties-
> Modul, **einzige** Quelle der Wahrheit für Pixel-Werte).
>
> Pattern-Quelle: `frontend/prototypes/galerie-v2.html` (Serpentine-Layout-
> Sandbox, 🟠 READ-ONLY). Diese Spec extrahiert die geometrischen Werte
> aus galerie-v2 in ein wiederverwendbares Modul.
>
> Konsumenten:
> - `frontend/prototypes/index.html` (Haupt-App, Galerie-Tab)
> - `design-explorations/timeline-filmstrip.html` (V5-Prototyp)
>
> Diese Spec beschreibt das **gemeinsame** Geometrie-Gerüst, das
> automatisch für jedes neue Medium greift — egal ob Foto, Plan, Video
> oder Audio. Das Markup ist identisch, die JS-Datenbindung füllt nur
> Typ/Datum/Zeit, die Geometrie kommt allein aus der Spec.

---

## 1. Geometrie-Übersicht

```
[Bild]                              ← <div class="preview-photo">
   │
   │ 20 px (--preview-stamp-margin-top)
   │
   │  ┌──────────────────────────────────────────────┐
   │  │  DATUM       │      ZEIT                     │  ← Stempel-Reihe
   │  │  (links)     │ 1 px  (rechts)                │     (--preview-stamp-*)
   │  │  14 px Gap   │ Salwei│  14 px Gap            │
   │  │              │ 0.5   │                       │
   │  │              │ opac. │                       │
   │  └──────────────────────────────────────────────┘
   │ 10 px (--preview-stamp-line-height, nur die Text-Zeile)
   │
   │ 39 px (--preview-stamp-margin-bottom, Rest der Linie)
   │     [Stempel-Top = 20 px unter Bild]
   │
   ● 5 × 5 px Dot, center @ Y = 71.5 px ab Bildunterkante
   ⬭ 2 px Ring (--preview-dot-ring-width) → visuell 9 × 9 px
```

**Invariante (darf nicht gebrochen werden):**

```
--preview-stamp-margin-top  +  --preview-trendline-height  +  (--preview-dot-size / 2)
       (20 px)               +         (49 px)              +         (2.5 px)
                              = 71.5 px  ✓
```

Diese Y-Position ist der **Anker für die SVG-Timeline-Pfade** im
Filmstreifen. Wenn die Invariante bricht, wandert die Timeline.

---

## 2. Design-Tokens (Custom Properties)

Alle Werte leben in `frontend/prototypes/preview-card-spec.css`. Diese
Tabelle ist die menschliche Referenz — bei Unklarheit gewinnt die
CSS-Datei.

### Komponenten-Werte (atomar, einzeln überschreibbar)

| Token | Wert | Bedeutung |
|---|---|---|
| `--preview-stamp-margin-top` | `20px` | Luft Bild → Stempel-Reihe |
| `--preview-stamp-line-height` | `10px` | Höhe der Text-Zeile im Stempel |
| `--preview-stamp-margin-bottom` | `39px` | Rest-Trendline unter Text bis Dot |
| `--preview-trendline-width` | `1px` | Strich-Dicke (visuell 1 CSS-Pixel) |
| `--preview-trendline-color` | `var(--color-primary)` | Salwei #668048 |
| `--preview-trendline-opacity` | `0.5` | Halbtransparent — soll Hintergrund durchschimmern |
| `--preview-dot-size` | `5px` | Dot-Kern |
| `--preview-dot-color` | `var(--color-primary)` | Salwei |
| `--preview-dot-ring-width` | `2px` | Ring um den Dot (steigert Sichtbarkeit) |
| `--preview-dot-ring-color` | `var(--bg-base)` | Hintergrund-Farbe → "Loch"-Effekt |
| `--preview-stamp-gap` | `14px` | Datum↔Linie und Linie↔Zeit (symmetrisch) |
| `--preview-stamp-font-family` | `var(--font-mono)` | JetBrains Mono |
| `--preview-stamp-font-size` | `10px` | Kompakt, aber lesbar |
| `--preview-stamp-font-weight` | `500` | Medium, nicht zu fett |
| `--preview-stamp-font-color` | `var(--color-primary)` | Salwei (statt text-mid/low) |
| `--preview-stamp-font-opacity` | `0.7` | Halbtransparent — Linie + Dot kommunizieren bereits Akzent |
| `--preview-stamp-font-letter-spacing` | `0.08em` | Galerie-Atmung |
| `--preview-stamp-font-text-transform` | `uppercase` | Konsistent (Ziffern unverändert) |
| `--preview-stamp-font-line-height` | `1` | Kompakt |
| `--preview-stamp-time-color` | `var(--preview-stamp-font-color)` | Datum und Zeit: gleiche Farbe (Salwei) |
| `--preview-stamp-date-color` | `var(--preview-stamp-font-color)` | Datum und Zeit: gleiche Farbe (Salwei) |
| `--preview-cell-max-width` | `240px` | Bild-Begrenzung pro Cell |
| `--preview-image-aspect-ratio` | `16 / 9` | Bildformat (galerie-v2 Look) |
| `--preview-image-border-color` | `var(--border-subtle)` | Subtile Card-Optik |
| `--preview-image-border-width` | `1px` | Card-Outline |
| `--preview-image-border-radius` | `var(--radius-small)` | Sanfte Rundung |
| `--preview-serpentine-stroke-width` | `2.5px` | Serpentine-Linie Dicke |
| `--preview-serpentine-stroke-color` | `var(--color-primary)` | Salwei |
| `--preview-serpentine-stroke-opacity` | `0.7` | Halbtransparent |
| `--preview-serpentine-stroke-linecap` | `round` | Pill-Cap |
| `--preview-serpentine-stroke-linejoin` | `round` | Pill-Join |
| `--preview-serpentine-curve-radius` | `32px` | Viertelkreis-Radius (2026-06-23: 75→32, engerer Bogen am Bild) |
| `--preview-serpentine-side-offset` | `44px` | ⚠️ **Deprecated** seit 2026-06-23: nicht mehr gelesen. `updateSerpentinePath()` berechnet den Offset dynamisch (`cellHalf + 36px`). Wert nur als Fallback/Doku. |
| `--preview-serpentine-row-spacing` | `66px` | Vertikaler Abstand zwischen Zeilen |
| `--preview-serpentine-drop-shadow` | `0 0 6px rgba(102, 128, 72, 0.35)` | Salwei-Glow |
| `--gal-curve-pad` | `72px` | Galerie-Box-Padding links/rechts (Konsument: `index.html`). Muss ≥ Marge(36) + curve-radius(32) sein, damit der Bogen nicht abgeschnitten wird. |
| `--gal-cols` | `6` | Galerie-Spalten-Default. Wird von `calcGalCols()` zur Laufzeit nach verfügbarer Breite überschrieben (Sidebar offen/zu → ∓1 Spalte). |

### Berechnete Werte (NICHT direkt überschreiben)

| Token | Berechnung | Resultat | Bedeutung |
|---|---|---|---|
| `--preview-trendline-height` | `line-height + margin-bottom` | `49px` | Höhe der vertikalen Linie (Stempel-Top → Dot-Top) |
| `--preview-dot-top` | `= trendline-height` | `49px` | Y-Position Dot-Oberkante **relativ zum Stempel-Top** (Dot sitzt am Linien-Ende, innerhalb des Stempels) |
| `--preview-dot-center-y-from-image` | `margin-top + trendline-height + (dot-size/2)` | `71.5px` | **Invariante**: Y-Position des Dot-Mittelpunkts ab Bildunterkante. Anker für Timeline-SVG. |
| `--preview-dot-visual-size` | `dot-size + 2 × ring-width` | `9px` | Visueller Dot-Durchmesser inkl. Ring |

---

## 3. Markup-Struktur

```html
<aside class="preview-card">
  <div class="preview-photo preview-photo--{type}">
    <span class="preview-photo-type preview-photo-type--{type}">
      <span class="dot"></span><span>Foto</span>
    </span>
  </div>
  <div class="preview-stamp">
    <span class="preview-stamp-date">13.06.26</span>
    <span class="preview-stamp-time">09:14</span>
    <span class="preview-stamp-trendline" aria-hidden="true"></span>
    <span class="preview-dot" aria-hidden="true"></span>
  </div>
</aside>
```

| Klasse | Spec |
|---|---|
| `.preview-card` | Container, `position: relative` (Anker für Card-Chrome). Bildunabhängig. |
| `.preview-photo` | Bild, beliebige Aspect-Ratio. **Geometrie ist bildunabhängig** — neue Bilder funktionieren automatisch. |
| `.preview-stamp` | Relativer Anker für Datum/Zeit/Trendlinie/Dot. `margin-top: var(--preview-stamp-margin-top)`, `height: var(--preview-stamp-line-height)`, `margin-bottom: var(--preview-stamp-margin-bottom)`. |
| `.preview-stamp-date` | Datum, `position: absolute; right: calc(50% + var(--preview-stamp-gap))`, vertikal mittig |
| `.preview-stamp-time` | Zeit, `position: absolute; left: calc(50% + var(--preview-stamp-gap))`, vertikal mittig |
| `.preview-stamp-trendline` | Vertikale Linie, `position: absolute; left: 50%; transform: translateX(-50%); top: 0; width: var(--preview-trendline-width); height: var(--preview-trendline-height)` |
| `.preview-dot` | Anker-Punkt **innerhalb des Stempels** am Ende der Linie, `position: absolute; left: 50%; top: var(--preview-dot-top); transform: translate(-50%, 0)` |

**Wichtig — Dot ist Kind des Stempels, nicht Geschwister.** Grund:
Der Stempel ist der Anker für die Trendlinie (`top: 0` referenziert
Stempel-Top = 20 px unter Bild). Wenn der Dot ein Geschwister wäre,
müsste sein `top`-Wert in Card-relativen Koordinaten angegeben werden
— was bei variablem Bild-Seitenverhältnis (16:9, 4:3, 1:1, ...) nicht
möglich ist. Als Kind des Stempels ist die Position **bildunabhängig**
definiert: `top: var(--preview-trendline-height)` (= 49 px) ist
immer das Linien-Ende, egal wie hoch das Bild ist.

**Wichtig — Trendline ist echtes Element**, nicht `::before`. Grund:
- `::before` mit `top: 0` auf `.preview-card` würde auf den Cell-Top
  (= Bildoberkante) referenzieren und hinter dem Bild verschwinden.
- Echtes Element innerhalb von `.preview-stamp` mit `position: absolute;
  top: 0` referenziert auf den Stempel-Top (= 20 px unter Bild).

**Wichtig — Datum und Zeit sind absolute Positionierung** (kein Flex).
Grund: Ein `display: flex; justify-content: space-between` würde
links/rechts des Containers bündig ausrichten, aber die zentrierte
Linie würde die Texte nicht trennen. Mit `right: calc(50% + 14px)` und
`left: calc(50% + 14px)` sitzen beide Texte **exakt** 14 px neben der
Linie, symmetrisch.

---

## 4. CSS-Implementierung (Konsument)

```css
.preview-card {
  position: relative;
  /* ... Card-Chrome (Padding, Border, Background) -- seiten-spezifisch ... */
}

.preview-photo {
  position: relative;
  width: 100%;
  /* Aspect-Ratio frei wählbar (16/9, 4/3, 1/1, ...) -- Geometrie bleibt */
}

/* Stempel-Reihe: relativer Anker für Datum/Zeit/Trendlinie/Dot */
.preview-stamp {
  position: relative;
  margin-top: var(--preview-stamp-margin-top);
  height: var(--preview-stamp-line-height);
  margin-bottom: var(--preview-stamp-margin-bottom);
  font-family: var(--preview-stamp-font-family);
  font-size: var(--preview-stamp-font-size);
  font-weight: var(--preview-stamp-font-weight);
}

.preview-stamp-date {
  position: absolute;
  right: calc(50% + var(--preview-stamp-gap));
  top: 50%;
  transform: translateY(-50%);
  color: var(--preview-stamp-date-color);
  white-space: nowrap;
}

.preview-stamp-time {
  position: absolute;
  left: calc(50% + var(--preview-stamp-gap));
  top: 50%;
  transform: translateY(-50%);
  color: var(--preview-stamp-time-color);
  white-space: nowrap;
}

/* Vertikale Trendlinie: 1 px, 49 px hoch, von Stempel-Top bis Dot-Top */
.preview-stamp-trendline {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: var(--preview-trendline-width);
  height: var(--preview-trendline-height);
  background: var(--preview-trendline-color);
  opacity: var(--preview-trendline-opacity);
  pointer-events: none;
}

/* Anker-Dot INNERHALB des Stempels, am Linien-Ende.
   Effektive Bild-relative Y-Invariante:
     20 (margin-top) + 49 (trendline-height) + 2.5 (dot-offset) = 71.5 px */
.preview-dot {
  position: absolute;
  left: 50%;
  top: var(--preview-dot-top);
  transform: translate(-50%, 0);
  width: var(--preview-dot-size);
  height: var(--preview-dot-size);
  border-radius: 50%;
  background: var(--preview-dot-color);
  box-shadow:
    0 0 0 var(--preview-dot-ring-width) var(--preview-dot-ring-color),
    0 0 0 calc(var(--preview-dot-ring-width) * 2) var(--preview-dot-color);
}
```

---

## 5. Geometrie-Rechnung (Soll vs. Ist)

| Grösse | Formel | Wert |
|---|---|---|
| Luft Bild → Stempel | `--preview-stamp-margin-top` | 20 px |
| Text-Zeile | `--preview-stamp-line-height` | 10 px |
| Rest-Trendline | `--preview-stamp-margin-bottom` | 39 px |
| Trendline-Höhe (gesamt) | `line-height + margin-bottom` | **49 px** |
| Dot-Oberkante Y | `margin-top + trendline-height` | 69 px |
| Dot-Mittelpunkt Y | `dot-top + (dot-size / 2)` | **71.5 px** |
| Visueller Dot-Durchmesser | `dot-size + 2 × ring` | 9 px |

**Vertikale Verteilung Datum/Zeit ↔ Linie:**

| Position | X-Offset ab Linien-Center |
|---|---|
| Datum rechte Kante | -14 px (`calc(50% - 14px)` von rechts = 14 px links) |
| Linie | 0 px (Mitte) |
| Zeit linke Kante | +14 px |

→ **Symmetrisch** (14 px = 14 px). Beide Texte sind 14 px von der
Linie entfernt, visuell ausbalanciert.

---

## 6. Varianten & Erweiterungen

### 6.1 Bild-Typ-Variante

Die Bild-Hintergrundfarbe variiert pro Medientyp, aber **die Geometrie
bleibt identisch**:

| Typ | Hintergrund |
|---|---|
| Foto | `linear-gradient(135deg, #243442, #1a2632, #243442)` + scanlines |
| Plan | `#0e1a23` + Salwei-Crosshair-Overlay |
| Video | `radial-gradient(circle at 50% 45%, #2a3d4d, #0f1720)` |
| Audio | `linear-gradient(160deg, #1c2a35, #0f1720)` + Wellen-Pattern |

→ Für jeden neuen Medientyp nur die `.preview-photo--{type}`-Regel
ergänzen. Stempel + Linie + Dot bleiben **automatisch** an der
gleichen Y-Position.

### 6.2 Active-State (für JS-Bindung)

Wenn die Preview-Card das aktive Medium zeigt:

```css
.preview-card.is-active .preview-dot {
  /* z. B. grösserer Ring, andere Farbe -- visuelle Hervorhebung */
  box-shadow:
    0 0 0 var(--preview-dot-ring-width) var(--preview-dot-ring-color),
    0 0 0 calc(var(--preview-dot-ring-width) * 3) var(--preview-dot-color);
}
```

Geometrie (Y-Position, X-Position) bleibt unverändert.

### 6.3 Grössen-Variante (kompakt / expanded)

Falls die Preview-Card in einer Liste statt als Hero auftritt:

```css
.preview-card--compact {
  /* Nur Stempel-Margin-Top runter, Dot folgt automatisch via calc() */
  --preview-stamp-margin-top: 12px;
  /* Alles andere (Linienhöhe, Dot-Y) rechnet sich neu */
}
```

→ Die Y-Position des Dots passt sich automatisch an. **Kein
Copy-Paste** der Geometrie nötig.

---

## 7. Accessibility

| Aspekt | Spec |
|---|---|
| Bild-Alt | `<img alt="...">` oder `aria-label` am Container |
| Datum/Zeit | Sichtbarer Text, von Screenreadern direkt gelesen |
| Trendlinie | `aria-hidden="true"` (rein dekorativ, redundant zum Dot) |
| Dot | `aria-hidden="true"` (rein visueller Marker) |
| Kontrast Datum/Zeit | `text-mid`/`text-low` auf `bg-panel` ≥ 4.5:1 (AA Normal) |
| Kontrast Linie | Salwei 0.5 opacity auf `bg-panel` ≥ 3:1 (AA Large) |
| Kontrast Dot | Salwei auf `bg-base` = 4.83:1 (AA Normal) |
| Reduzierte Bewegung | Statisches Layout, keine Animation |

---

## 8. Lock-Disziplin

### Status: 🟠 READ-ONLY (Spec + CSS-Modul)

| Datei | Status | Rolle |
|---|---|---|
| `frontend/prototypes/preview-card-spec.css` | 🟠 READ-ONLY | Pixel-Werte, Custom Properties |
| `docs/ux/concepts/preview-card-spec.md` (diese Datei) | 🟠 READ-ONLY | Menschliche Dokumentation |
| `frontend/prototypes/COMPONENTS.md` | 🔵 LIVE | Lock-Status-Tracking |

### Änderungs-Workflow

1. **Diskussion**: Spec-Änderung in `docs/ux/concepts/` als PR-Diskussion
   mit Joshua + Designer.
2. **Spec zuerst**: Erst Markdown-Datei (`*-spec.md`) updaten, **dann**
   CSS-Modul (`preview-card-spec.css`) anpassen, **dann** Konsumenten.
3. **Eintrag in COMPONENTS.md**: "Änderungsjournal"-Zeile mit Datum,
   Komponente, Änderung, Begründung.
4. **Read-Only-Flag**: `attrib +R frontend/prototypes/preview-card-spec.css`
   (Windows) bzw. `chmod 444` (Linux/Mac) nach jeder Änderung setzen.
5. **PR-Review**: Mindestens ein Approval (Joshua + 1 weiterer).

### Was Konsumenten dürfen (ohne Spec-Update)

- Neue Typ-Klassen (`.preview-photo--neuer-typ`) für Bild-Hintergrund
- Eigene Card-Chrome (Padding, Border, Background auf `.preview-card`)
- Active/Selected-State-Styles
- Container-Wrapper (z. B. Grid-Item, List-Item)
- Animationen (Transitions auf Hover, etc.)

### Was Konsumenten NICHT dürfen

- Eigene Pixel-Werte für Trendline-Höhe, Dot-Grösse, Stempel-Margins
- `top:`-Werte für Trendline oder Dot, die nicht aus den Custom
  Properties kommen
- Theme-Overrides für Geometrie-Werte (Geometrie ist theme-unabhängig)
- Inline-Styles für `.preview-stamp-*` oder `.preview-dot`

---

## 9. Siehe auch

- [`galerie-timeline-spec.md`](galerie-timeline-spec.md) — **Verhaltens-Spec** der Galerie-Timeline (dynamische Spalten, Sidebar-Reaktion, Serpentine-Routing)
- `frontend/prototypes/preview-card-spec.css` — Custom-Properties-Modul
- `frontend/prototypes/COMPONENTS.md` — Lock-Status-Tracking
- `frontend/prototypes/app-shell.css` — Geteilte Styles, Design-Tokens
- `docs/ux/concepts/sidebar-brand-spec.md` — Beispiel-Spec (Pattern-Vorlage)
- `docs/ux/concepts/scrollbar-spec.md` — Beispiel-Spec (Pattern-Vorlage)
- `docs/13_ui_brand_guidelines.md` — Markenrichtlinien
- `UI_STANDARDS.md` — Verbindliche UI-Standards

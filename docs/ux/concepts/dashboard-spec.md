# Dashboard Spec

> **Geltungsbereich.** Verbindliche Spec für den Default-Screen
> `data-active-screen="dashboard"` in `frontend/prototypes/index.html`.
> Quelle der Implementierung: `index.html` (Markup + lokaler
> `<style>`-Block) und `app-shell.css` (nur globale Tokens +
> Screen-Container, alle Dashboard-spezifischen Klassen sind im
> HTML-`<style>`-Block).

---

## 1. Bildschirm-Einbettung

| Eigenschaft | Wert |
|---|---|
| Wrapper-Klasse | `.vd-screen` (siehe `app-shell.css` ~Zeile 260) |
| Data-Attribut | `data-screen="dashboard"` |
| Aktivierung | `<body data-active-screen="dashboard">` |
| Max-Breite | `1600px` (zentriert via `margin: 0 auto`) |
| Padding | `var(--space-5) var(--space-6) var(--space-8)` (20 / 24 / 32) |
| Background | erbt von `body` → `var(--bg-base)` |
| Local Tokens | nur im Dashboard-Scope aktiv: `--surface-1: #1A1F24`, `--surface-2: #20262C`, `--separator-soft: rgba(255,255,255,0.06)`, `--separator-strong: rgba(255,255,255,0.10)` |

---

## 2. Layout-Struktur (top-down)

```
.vd-screen[data-screen="dashboard"]
├── .vd-dash-hero                  ← Begrüssung + Stats + Aktionen
├── .vd-kpi-grid                   ← 6 Kennzahlen (1×6 Grid)
├── .vd-dash-row-3                 ← 3 Karten (2fr / 1fr / 1fr)
│   ├── .vd-dash-card              ← Letzte Aktivität
│   ├── .vd-dash-card              ← Anstehende Aufgaben
│   └── .vd-dash-card              ← Medien pro Woche (Bar-Chart)
├── .vd-dash-recent-head           ← Sektion-Titel
└── Projekt-Cards-Grid (auto-fill, min 300px) ← Zuletzt bearbeitete Projekte
```

---

## 3. Hero (`vd-dash-hero`)

Salwei-Radial-Glow oben rechts + `surface-1`-Panel + Edge-Highlight.

| Property | Wert |
|---|---|
| `display` | `flex` (row, space-between, align-end) |
| `gap` | `var(--space-4)` |
| `padding` | `var(--space-5) var(--space-6)` (20 / 24) |
| `background` | `radial-gradient(circle at 95% 0%, var(--color-primary-soft) 0%, transparent 55%), var(--surface-1)` |
| `border` | `none` (Edge via Box-Shadow) |
| `border-radius` | `14px` |
| `box-shadow` | `0 0 0 1px var(--separator-soft), 0 1px 0 rgba(255,255,255,0.04) inset` |

Unter-Klassen:

| Klasse | Font-Size | Weight | Color | Besonderheit |
|---|---|---|---|---|
| `vd-dash-hero-greeting` | 12 px | 400 | `text-mid` | margin-bottom 4 px |
| `vd-dash-hero-title` | 24 px | 600 | `text-high` | line-height 1.2, margin-bottom `space-2` |
| `vd-dash-hero-meta` | 12 px | 400 | `text-mid` | flex, gap `space-3`, `flex-wrap: wrap`; `<strong>` → `text-high` weight 600 |
| `vd-dash-hero-actions` | – | – | – | inline-flex, gap `space-2`, `flex-shrink: 0` |
| `vd-dash-hero-stats` | – | – | – | flex, gap `space-4`, `padding-right: space-4`, `border-right: 1px solid var(--border-subtle)` |
| `vd-dash-hero-stat-value` | 18 px | 600 | `text-high` | `font-mono`, line-height 1 |
| `vd-dash-hero-stat-label` | 11 px | 400 | `text-low` | margin-top 2 px |

---

## 4. KPI-Grid (`vd-kpi-grid` + `vd-kpi`)

6 Kennzahlen, 1 Zeile à 6 Spalten. Jede Karte hat einen 3-px-Akzent-Balken links.

| Property | Wert |
|---|---|
| Grid | `repeat(6, 1fr)`, gap `var(--space-3)` |
| Margin | `var(--space-4) 0` |
| Card-Background | `var(--surface-1)` |
| Card-Padding | `14px 14px 14px 18px` (links mehr wegen Akzent-Balken) |
| Card-Border-Radius | `12px` |
| Card-Box-Shadow | `0 0 0 1px var(--separator-soft), 0 1px 0 rgba(255,255,255,0.04) inset` |
| Akzent-Balken (`.vd-kpi::before`) | `position: absolute; left: 0; top: 14px; bottom: 14px; width: 3px; background: var(--color-primary); border-radius: 0 3px 3px 0` |

### Varianten (Akzent-Farbe)

| Modifier | Akzent-Farbe |
|---|---|
| `.vd-kpi` (Default) | `var(--color-primary)` (Salwei) |
| `.vd-kpi--info` | `var(--status-info)` |
| `.vd-kpi--warn` | `var(--status-warn)` |
| `.vd-kpi--error` | `var(--status-error)` |
| `.vd-kpi--muted` | `var(--text-low)` |

### KPI-Inhalt

| Klasse | Font-Size | Weight | Color | Besonderheit |
|---|---|---|---|---|
| `vd-kpi-label` | 11 px | 500 | `text-low` | `text-transform: uppercase`, `letter-spacing: 0.04em` |
| `vd-kpi-value` | 26 px | 600 | `text-high` | `font-mono`, `letter-spacing: -0.01em` |
| `vd-kpi-delta` | 11 px | 400 | `text-mid` | inline-flex, gap 4 px, margin-top 2 px |
| `vd-kpi-delta--up` | – | – | `color-primary` | positiver Trend |
| `vd-kpi-delta--down` | – | – | `status-error` | negativer Trend |
| `vd-kpi-spark` | – | – | – | Höhe 28 px, SVG füllt 100% |

---

## 5. 3-Spalten-Row (`vd-dash-row-3`)

| Property | Wert |
|---|---|
| Grid | `2fr 1fr 1fr`, gap `var(--space-3)` |
| Margin-Bottom | `var(--space-4)` |

### Karten-Basis (`vd-dash-card`)

| Property | Wert |
|---|---|
| Background | `var(--surface-1)` |
| Border | `none` |
| Border-Radius | `14px` |
| Padding | `var(--space-4)` |
| Box-Shadow | `0 0 0 1px var(--separator-soft), 0 1px 0 rgba(255,255,255,0.04) inset` |
| Innen-Layout | flex-column, gap `var(--space-3)` |

Karten-Kopf + Titel + Link:

| Klasse | Font-Size | Weight | Color | Besonderheit |
|---|---|---|---|---|
| `vd-dash-card-head` | – | – | – | flex, space-between, align-center |
| `vd-dash-card-title` | 13 px | 600 | `text-high` | `letter-spacing: 0.01em` |
| `vd-dash-card-link` | 12 px | 400 | `color-primary` | `text-decoration: none`, hover underline |

### Letzte Aktivität

| Klasse | Spec |
|---|---|
| `vd-activity-list` | flex-column, gap 2 px |
| `vd-activity-item` | flex, gap `space-3`, padding 8 px, border-radius 8 px, hover `surface-2` |
| `vd-activity-dot` | 8 × 8 px, border-radius 50%, Varianten: `--photo` = primary, `--plan` = info, `--video` = warn |
| `vd-activity-text` | 13 px, `text-high`, line-height 1.4, `<em>` → `color-primary`, weight 500 |
| `vd-activity-time` | 11 px, `font-mono`, `text-low` |

### Anstehende Aufgaben

| Klasse | Spec |
|---|---|
| `vd-quick-list` | flex-column, gap `space-2` |
| `vd-quick-item` | flex, gap `space-2`, padding `space-2`, `bg-raised`, border-radius `radius-small`, font 12.5 px |
| `vd-quick-item-main` | flex-column, gap 2 px, `min-width: 0`, flex 1 |
| `vd-quick-item-title` | weight 500, `text-high` |
| `vd-quick-item-sub` | 11 px, `text-mid` |
| `vd-quick-pill` | 10 px, weight 500, padding 2 px 8 px, `color-primary-soft` Default, `--warn` = `status-warn-soft`, `--info` = `status-info-soft` |

### Medien pro Woche (Bar-Chart)

| Klasse | Spec |
|---|---|
| `vd-chart-bars` | flex, align-end, gap 4 px, Höhe 120 px |
| `vd-chart-bar` | flex 1, flex-column, align-center, gap 4 px |
| `vd-chart-bar-stack` | 100% width, flex-column, gap 2 px, `justify-content: flex-end`, flex 1 |
| `vd-chart-bar-seg` | 100% width, `border-radius: 3px 3px 0 0`, Varianten: `--photo` = primary, `--plan` = info, `--video` = warn |
| `vd-chart-bar-label` | 10 px, `font-mono`, `text-low` |

---

## 6. Responsive

| Breakpoint | Verhalten |
|---|---|
| `≤ 900px` | `.vd-kpi-grid` → 2 Spalten; `.vd-dash-row-3` → 1 Spalte; `.vd-dash-hero` → column, align-items flex-start |
| `≤ 600px` | `.vd-screen` padding `space-4 space-3 space-6`; Subtopbar-Padding reduziert |

Quelle: `index.html` Zeile ~1879 (mobile-Media-Queries).

---

## 7. Daten-Bindung

| Element | Quelle |
|---|---|
| `vd-dash-hero-greeting` | hartcodiert im Showcase (`Freitag, 13. Juni 2026 · guten Morgen, Maria`) |
| KPIs mit `data-demo-counts="true"` | `window.VISIDOC_DEMO` (deterministisch) |
| Aktivitäts-Liste | Showcase-Seed; Datenmodell in Produktion: `GET /api/dashboard/activity` |
| Quick-Liste (Tasks) | Showcase-Seed; `GET /api/dashboard/tasks` |
| Chart-Bars | Showcase-Seed (12 KW22–KW33); `GET /api/dashboard/media-per-week` |

Counts werden in `index.html` per JS-Helper zur Laufzeit eingesetzt (siehe `data-demo-counts`-Selektor).

---

## 8. Accessibility

| Aspekt | Spec |
|---|---|
| Heading-Hierarchie | `<h1>` für Hero-Titel; Karten-Titel sind Sektions-`<span>` (visuell-heading, semantisch nicht `<h2>`, da Showcase). Produktion: `<section aria-labelledby>` |
| Kontrast Hero-Titel | `text-high` auf `surface-1` ≥ 12:1 |
| KPI-Akzent-Balken | nicht farb-allein (Status auch über Text-Label "überfällig" etc.) |
| Activity-Dot | rein visuell; Bedeutung trägt `<em>` im Text |
| Focus | Buttons nutzen `:focus-visible` Outline (`outline: 2px solid var(--color-primary)`) |
| Sparkline-SVGs | `aria-hidden="true"` (rein dekorativ) |

---

## 9. Siehe auch

- `docs/ux/concepts/visidoc-DESIGN.md` §1 (Zielgruppe), §3 (Farb-Tokens)
- `app-shell.css` § Design-Tokens, § Karten – freigegebene Varianten
- `index.html` § Dashboard-Styles (Zeile ~278 ff.)

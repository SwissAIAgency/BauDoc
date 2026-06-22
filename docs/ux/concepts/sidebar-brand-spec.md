# Sidebar Brand (Logo) Spec

> **Geltungsbereich.** Verbindliche Spec für den Brand-Block am
> oberen Rand der Sidebar in `frontend/prototypes/index.html`.
> Quelle der Implementierung: `app-shell.css` (`.vd-sidebar-brand`
> + Varianten) und die beiden PNG-Assets
> `frontend/prototypes/visidoc-logo.png` (Voll-Logo, Querformat)
> sowie `frontend/prototypes/visidoc-mark.png` (Mark-only,
> quadratisch).

---

## 1. Quellen-Assets

| Asset | Pfad | Dimension | Modus | Hintergrund |
|---|---|---|---|---|
| Voll-Logo | `frontend/prototypes/visidoc-logo.png` | 509 × 160 px | RGBA | transparent |
| Mark-only | `frontend/prototypes/visidoc-mark.png` | 398 × 227 px | RGBA | transparent |

**Ableitung:** aus `frontend/prototypes/VisiDoc Logo.png`
(1122 × 1402, RGB, Konzept-Blatt mit "Konzept 13"-Label und drei
Logo-Varianten auf weißem Hintergrund). Per Skript: Bildschirm-
plus-Wortmarke-Variante rechts unten gecroppt, weißer Hintergrund
auf transparent gesetzt (Pixel mit RGB ≥ 248 werden Alpha 0).

**Original-Farben** (aus dem Konzept-Blatt, sichtbar im PNG):
- Bildschirm-Icon / "Visi": Anthrazit (`#1F2429` ≈ `var(--color-ink)`)
- "Doc": Salwei (`#668048` = `var(--color-primary)`)

---

## 2. Markup-Container

```html
<aside class="vd-sidebar">
  <a class="vd-sidebar-brand" href="#" data-nav="dashboard"
     aria-label="VisiDoc – Startseite">
    <img class="vd-sidebar-brand-img vd-sidebar-brand-img--full"
         src="visidoc-logo.png" alt="VisiDoc"
         width="509" height="160">
    <img class="vd-sidebar-brand-img vd-sidebar-brand-img--mark"
         src="visidoc-mark.png" alt=""
         width="398" height="227" aria-hidden="true">
  </a>
  <!-- nav ... -->
</aside>
```

| Klasse | Spec |
|---|---|
| `.vd-sidebar-brand` | `<a>`-Container, klickbar (führt zu Dashboard) |
| `.vd-sidebar-brand-img--full` | Default-sichtbar; Querformat-Logo |
| `.vd-sidebar-brand-img--mark` | Default-versteckt; nur im Collapsed-Modus |

Beide `<img>` sind im DOM (kein JS-Toggle), CSS steuert die
Sichtbarkeit via `display: none` / `display: block`.

---

## 3. Expanded Mode (Default)

| Selector | Property | Wert |
|---|---|---|
| `.vd-sidebar-brand` | `display` | `flex` |
| | `flex-direction` | `column` |
| | `align-items` | `flex-start` |
| | `gap` | `var(--space-1)` (4 px) |
| | `padding` | `var(--space-4) var(--space-5) var(--space-3)` (16 / 20 / 12) |
| | `border-bottom` | `1px solid var(--border-subtle)` |
| | `color` | `var(--text-high)` |
| | `text-decoration` | `none` |
| | `flex-shrink` | `0` |
| `.vd-sidebar-brand:hover` | `color` | `var(--text-high)` (kein Wechsel — bewusst kein Hover-Akzent, der Brand-Block ist kein interaktives Element im eigentlichen Sinn) |
| `.vd-sidebar-brand-img` | `display` | `block` |
| | `height` | `auto` (Aspect-Ratio bleibt erhalten) |
| | `flex-shrink` | `0` |
| `.vd-sidebar-brand-img--full` | `width` | `100%` |
| | `max-width` | `132px` |
| `.vd-sidebar-brand-img--mark` | `display` | `none` |

**Resultat:** Logo sitzt kompakt oben in der Sidebar, max. 132 px
breit, Höhe skaliert mit Aspect Ratio (132 × 160/509 ≈ 41 px).
Plus Padding (16/20/12) ergibt sich ein **Brand-Block von ~70 px
Höhe** — vorher 168 px / ~53 px / 90 px. Spart ~20 px vertikalen
Raum, sodass die Nav-Sektion früher beginnt. Border-Bottom trennt
sauber zur Nav-Sektion.

> **Aenderungs-Historie:** 2026-06-20 — Logo von 168 px auf 132 px
> verkleinert, Padding von `space-5/5/4` auf `space-4/5/3` reduziert,
> Gap von `space-2` auf `space-1`. Grund: User-Feedback "Logo zu
> gross / passt nicht in den Sidebar". Bei 132 px bleibt das
> VisiDoc-Wortmarken-Lesbar (Wortmarke ≈ 12-13 px hoch).

---

## 4. Collapsed Mode (`body.vd-app-sidebar-collapsed`)

Sidebar ist 64 px breit; das Voll-Logo ist zu breit. Wir zeigen
stattdessen das quadratische Mark.

| Selector | Property | Wert |
|---|---|---|
| `.vd-app-sidebar-collapsed .vd-sidebar-brand` | `align-items` | `center` |
| | `padding` | `var(--space-4) var(--space-2)` (16 / 8) |
| `.vd-app-sidebar-collapsed .vd-sidebar-brand-img--full` | `display` | `none` |
| `.vd-app-sidebar-collapsed .vd-sidebar-brand-img--mark` | `display` | `block` |
| | `width` | `32px` |
| | `height` | `auto` |

**Resultat:** Nur das Bildschirm-Icon, 32 px breit, zentriert in
der 64-px-Sidebar.

---

## 5. Dark Mode

Das Original-PNG ist anthrazit auf transparent. Auf dem dunklen
Panel-Hintergrund (`--bg-panel: #1F2429`) würde es verschwinden.

| Selector | Property | Wert |
|---|---|---|
| `[data-theme="dark"] .vd-sidebar-brand-img` | `filter` | `invert(1) hue-rotate(180deg)` |

**Wirkung:**
- Anthrazit-Bildschirm-Icon → invertiert → hell (nahezu weiß)
- Anthrazit "Visi" → invertiert → hell
- Salwei "Doc" → invertiert → Magenta-Bereich → hue-rotate 180° → wieder im Salwei-Bereich

**Einschränkung:** Der Salwei-Akzent wird im Dark Mode nicht
exakt #668048 erreicht, sondern leicht magenta-stichig. Für
1:1-Treue wäre ein dediziertes Dark-Mode-Asset nötig. Aktueller
Trade-off: ein Asset deckt beide Modi ab, Dark Mode ist
"akzeptabel nahe" statt pixel-perfekt.

---

## 6. Accessibility

| Aspekt | Spec |
|---|---|
| Klickbar | `<a>` mit `href="#"` und `data-nav="dashboard"` → springt zum Dashboard |
| Aria-Label | `aria-label="VisiDoc – Startseite"` am `<a>` (nicht-redundant) |
| Alt-Text | Voll-Logo: `alt="VisiDoc"`; Mark-only: `alt="" aria-hidden="true"` (rein dekorativ) |
| Tastatur | `<a>` ist fokussierbar; `Tab` führt zum Brand; `Enter` aktiviert Navigation |
| Focus-Style | erbt vom globalen `:focus-visible` (`outline: 2px solid var(--color-primary); outline-offset: 2px`) |
| Kontrast | Logo ist Asset (nicht per CSS kontrollierbar); Salwei-Akzent #668048 auf Weiß = 3.91:1 (AA Large), auf `--bg-panel` = 4.83:1 (AA Normal). Dark Mode nach invert: helle Töne auf dunklem Panel ≥ 12:1 |
| Bildschirmleser | liest "VisiDoc – Startseite, link"; Mark-only wird ignoriert (`aria-hidden`) |

---

## 7. Asset-Wartung

| Aktion | Pfad / Hinweis |
|---|---|
| Quelle ersetzen | PNG unter `frontend/prototypes/` austauschen, gleicher Dateiname + Aspect-Ratio ungefähr beibehalten |
| Neues Aspect-Ratio | CSS `.vd-sidebar-brand-img--full { max-width: 168px }` bleibt; Höhe skaliert automatisch |
| Dark-Mode-Asset | Wenn Salwei-Treue wichtig wird: separates PNG mit helleren Farben anlegen, im Markup per `<picture>` mit `prefers-color-scheme` oder im CSS per `[data-theme="dark"]` mit anderer `src` (via JS-Swap) |
| Crop-Script | Python+PIL, Threshold ≥ 248 für transparent; als Referenz in Commit-Message dokumentieren |

---

## 8. Siehe auch

- `app-shell.css` § Brand-Block (Zeile ~164 ff.)
- `docs/13_ui_brand_guidelines.md` § Logo-Regeln
- `docs/ux/concepts/visidoc-DESIGN.md` § Marke

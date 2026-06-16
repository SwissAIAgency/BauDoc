# Stitch Prompt Pack — Galerie & Medienverwaltung (VisiDoc)

**Zielgruppe:** UI/UX-Designer
**Zweck:** Massgeschneiderte Prompts für Google Stitch, um die 5 Hauptscreens des Galerie-Moduls zu rendern.
**Brand-Quelle:** Salbei-Primärfarbe `#668048` und Drei-Schrift-System (Marcopro / Inter / JetBrains Mono) — siehe `visidoc-DESIGN.md`.
**Output:** Hochwertige Design-Screens als Vorlage für die spätere Frontend-Implementierung (siehe `galerie-medienverwaltung.md`).

---

## Vorbereitung in Stitch

1. Öffne `https://stitch.withgoogle.com`.
2. Erstelle ein neues Projekt: **„VisiDoc – Galerie"**.
3. Sprache: **English** (Stitch liefert konsistentere Resultate auf Englisch; die UI-Strings im Resultat sind auf Deutsch).
4. Output-Format: **Web/Dashboard, Desktop, 1440 × 900 px** für **alle 5 Screens**. Mobile-States (390 × 844) werden in einer späteren Pack-Runde nachgereicht — siehe „Mobile (deferred)" am Ende.
5. Theme: **Dark Mode only**. Versuche, die Schriften **Marcopro** (Display), **Inter** (Body), **JetBrains Mono** (technische Daten) zu setzen. Falls Marcopro nicht direkt verfügbar ist, generiere mit Inter und kennzeichne im Output, dass Display-Headlines gegen Marcopro ausgetauscht werden müssen.

> **Hinweis:** Stitch versteht keine strikten Token-Werte. Die Prompts übersetzen das VisiDoc-Design-System in **adjektivische Designsprache**. Nach dem Rendering kontrollierst du Farben, Schriften und Abstände gegen die Token-Tabelle unten und passt ggf. manuell nach.

---

## Globaler Design-Kontext (jeder Prompt referenziert diesen)

> **Brand:** VisiDoc is a Swiss SMB SaaS for construction progress documentation. The brand colour is a single muted olive-sage — "salbei green" — that reads as professional, calm, and earthy. Everything else is a neutral anthracite scale plus four saturated status colours. Aesthetic: Awwwards-tier dark-mode dashboard for B2B SaaS. Reference points: Linear, Vercel, Raycast, Madaster (construction-tech). No marketing hero, no decorative gradients, no emoji.
>
> **Design tokens (strict, keep consistent across all screens):**
>
> - Background base (Neutral):      `#12181B`  (almost black, deep)
> - Panel surface (Secondary):      `#232835`  (preview panel, cards, dropdowns)
> - Panel elevated (Tertiary):      `#3B4349`  (hover, selected rows, raised surfaces)
> - Border default:                 `#2C333D`  (panel borders; use 50% alpha for subtle lines)
> - Border subtle:                  `rgba(255, 255, 255, 0.06)` (row separators, almost invisible)
> - Text high:                      `#F2F4F7`
> - Text mid:                       `#A3ACB8`  (secondary metadata, default icon colour)
> - Text low:                       `#6B7480`  (placeholder, count labels)
> - Accent (Salbei):                `#668048`  — used ONLY for: app wordmark, active tab indicator (with a 14 px salbei check icon to its left), selected row left bar (2 px), primary action button fill, focus rings, "Öffnen" overlay on grid tiles
> - Accent hover:                   `#7A9359`
> - Accent press:                   `#566B3D`
> - Accent soft (12%):              `rgba(102, 128, 72, 0.12)`  (selected row background, brand-tinted surfaces)
> - Status Info (Blau):             `#5B8DEF`  (only in status pills: "Neu")
> - Status Warn (Gelb):             `#F5C768`  (only in status pills: "In Prüfung")
> - Status Success (Salbei-Bright): `#7FB069`  (only in status pills: "Freigegeben")
> - Status Error (Rot):             `#F26B6B`  (only in status pills: "Fehler", "Löschen" button outline)
>
> **Typography (three-family system, no substitutions):**
>
> - **Marcopro** — Display, wordmark, page titles, section headlines, empty-state headlines. SemiBold for titles, Medium for section/empty-state. Fallback: Inter.
> - **Inter** — Body, list rows, tab labels, buttons, form fields, table cells, filter dropdowns. Regular / Medium / SemiBold. Tabular figures for all numbers. Body 14 px / 1.45, secondary 13 px, micro 12 px, tab label 15 px / 1.2.
> - **JetBrains Mono** — Technical data: file sizes (1.4 MB), plan version numbers (v3.2), IDs, EXIF values, date stamps in metadata strips. Regular / Medium. 12 px / 1.4.
>
> **Iconography:** Lucide outline, stroke 1.5 px, monochromatic in `#A3ACB8`, 16 px inline / 18 px buttons / 24 px panel headers. No emoji. No filled icons. No two-tone icons.
>
> **Geometry:** Radius container 10 px, small 8 px, preview panel 12 px, status pills 999 px (full pill). Spacing scale 4 / 8 / 12 / 16 / 20 / 24 / 32 px. Border width 1 px (panel), 2 px (active indicator, focus ring).
>
> **Layout:** Two-column split, 60/40 desktop. Left: tabs + sub-header + media list. Right: sticky preview panel with sub-tabs.
>
> **App context:** VisiDoc is a construction documentation tool. The Gallery module stores photos, floor plans (with versions), and short site videos for a construction project. The user is a project or site manager reviewing documents chronologically on a desktop.
>
> **Critical constraints:**
>
> - NO emoji anywhere. All icons are line icons.
> - NO marketing hero sections, no decorative gradients.
> - Salbei green appears ONLY in the six allowed places listed above.
> - Status colours appear ONLY inside status pills and status icons. Never as decorative fills.
> - Status communication must always be icon + text, never colour alone.
> - Information hierarchy through type weight and spacing, not through coloured boxes.
> - Product name in the app header is "VisiDoc". Never "BauDoc" or any other product name.
> - Date format `tt.mm.yyyy`, time `hh:mm`, file sizes like `1.4 MB` / `348 KB`, all numbers in tabular figures.
> - All technical values in JetBrains Mono. All display headlines in Marcopro. All body in Inter.
> - German UI strings by default.
> - The Filter dropdown is a solid `#232835` panel with a soft shadow, not a backdrop-blur variant.

---

## Screen 1 — Hero / Default State (Plans tab active)

**Verwendung:** Default-Zustand des Moduls. Zeigt das vollständige Layout mit „Pläne" als aktivem Tab und einer Vorschau des ersten Plans.

**Stitch Prompt:**

```
Generate a desktop dashboard screen (1440x900) for the media
library module inside "VisiDoc", a Swiss construction
documentation SaaS for SMBs.

Layout: 60/40 split-screen. Left column 60% width contains a
top tab bar, a sub-header with search and filter, and a dense
list of 8 plan items. Right column 40% width contains a sticky
preview panel showing a floor plan thumbnail with metadata.

Aesthetic: Awwwards-tier dark mode, minimal, dense, technical,
calm. Single brand colour: salbei green (#668048) — used
ONLY for the active tab indicator, the selected row's left
accent bar, and primary action buttons. Everything else in
anthracite greyscale with four saturated colours reserved for
status pills only.

App header: small wordmark "VisiDoc" in Marcopro SemiBold 22px
on the left, project name "Neubau Bahnhofstr. 12" in Inter
13px secondary next to it, small user avatar on the right.
No marketing hero. No gradients.

Top of the module: small breadcrumb "Projekt / Galerie" in
Inter 12px secondary. Below it, three tabs in one row:
"Bilder 24", "Pläne 28" (active), "Videos 6". The active
"Pläne" tab shows a 2px salbei underline and a 14px salbei
check icon to its left, full opacity. Inactive tabs at 60%
opacity. No boxes around the tab row. The counts "24", "28",
"6" appear inline in #6B7480 12px Inter, not as pills.

Sub-header: one row, 56px tall. Left: large borderless search
field with a monochromatic magnifying glass icon (#A3ACB8) and
placeholder "Suchen…", subtle bottom border that strengthens
on focus. A faint 1px #2C333D divider 24px tall separates
search from filter. Right: a secondary "Filter" button
(#232835 fill, 1px #2C333D border, #F2F4F7 text) with a filter
icon and chevron. Far right: a two-icon view toggle (list /
grid) in a 36x36 touch target, list is active (filled
#3B4349 background, salbei icon).

List: 8 rows, each 64px tall, divided by ultra-faint lines
(rgba 255,255,255, 0.06) — almost invisible. First row is
selected: 2px salbei left bar + #3B4349 background, text in
#F2F4F7. Each row uses a 5-column grid: 40x40 thumbnail
(rounded 8px, leftmost), filename + plan version subtitle in
Inter (e.g. "EG-01_Bauleitplan_v3.pdf" with "v3" in
JetBrains Mono, secondary text in #A3ACB8), date "14.05.2026"
right-aligned in Inter tabular figures, file size "1.4 MB"
right-aligned in JetBrains Mono #A3ACB8, then 3 small
Lucide line icons (Download, MessageSquare, Trash2) in
#A3ACB8. Row hover state is #3B4349 background; the selected
row in the screenshot must look exactly like the hover.

Right column preview panel: rounded 12px, surface #232835,
border 1px #2C333D, p-5, sticky. Top: filename in Marcopro
Medium 18px "EG-01_Bauleitplan_v3.pdf", below it "Hochgeladen
von Maria B. · 14.05.2026, 14:32" in Inter 12px #A3ACB8.
Center: a large floor plan thumbnail in a darker area
(contained, with breathing room). Bottom: 4 sub-tabs
"Vorschau / Details / Kommentare / Versionen" with the same
salbei underline indicator on "Vorschau". Footer: three
outlined-secondary buttons left-aligned (Download, Planmarker
setzen, Teilen — all with salbei icon and transparent
background) and one outlined-danger button right-aligned
("Löschen" in #F26B6B).

Strict constraints: NO emoji, NO gradients, NO marketing copy,
NO coloured status pills. Salbei appears ONLY at: the active
tab underline and check icon, the selected row's left bar,
and the outlined action icons in the preview footer. Inter
for all body, Marcopro for the preview headline, JetBrains
Mono for the file size. German UI strings. Asymmetric but
perfectly aligned.
```

---

## Screen 2 — Tabs: Bilder active (Image-heavy variant)

**Verwendung:** Zeigt, dass derselbe Container mit Foto-Metadaten funktioniert. Beweist, dass das Design medientyp-agnostisch ist.

**Stitch Prompt:**

```
Same module and layout as before, but now the active tab is
"Bilder 24" — salbei underline, salbei check icon to its left,
full opacity. The other tabs go to 60% opacity. The Pläne and
Videos counts in the breadcrumb area shift accordingly.

Show 8 photo rows in the list, each with a real-looking
construction site thumbnail (e.g. scaffolding, rebar, concrete
pour, electrical conduit, drywall, tiling, roofing finishing,
facade) in a 40x40 rounded-8 thumbnail cell. The filename
column shows the file name in Inter Medium 14px, subtitle in
Inter Regular 12px #A3ACB8.

The first row is selected (2px salbei left bar + #3B4349
background). The right preview panel shows a larger 16:9
construction photo, contained on a dark area.

Footer of the preview panel shows only "Download", "Teilen"
and "Löschen" — no "Planmarker setzen" since this is a photo.
The action icons use the same outlined-secondary style with
salbei icons.

Everything else identical to the default state. Salbei
appears in exactly the same six allowed places.
```

---

## Screen 3 — Filter dropdown open

**Verwendung:** Demonstriert den Filter-Mechanismus. Beweist, dass das Dropdown das VisiDoc-Ästhetik-Niveau hält (solides Panel, scharf geschnitten, mit Status-farbenen Radio-Dots).

**Stitch Prompt:**

```
Same module, default state (Plans active, first row selected),
but the "Filter" button in the sub-header is in an active/open
state: background #3B4349, chevron rotated 180°.

A solid dropdown menu (280px wide, right-aligned to the
Filter button) appears below it. Background: #232835, border
1px #2C333D, radius 10px, large soft shadow. No backdrop
blur — this is a solid panel.

Dropdown content (top to bottom):
- Section header "Sortieren" in Inter Medium 13px #A3ACB8
  (not actually uppercase, just slightly bolder secondary)
- 4 radio options, each row 32px tall, hover background
  #3B4349:
    - "Datum (neueste zuerst)" — selected, with a small
      salbei radio dot (#668048 filled circle inside a
      #2C333D ring)
    - "Datum (älteste zuerst)"
    - "Name (A–Z)"
    - "Ersteller"
- Thin divider line 1px #2C333D
- Section header "Erweiterte Filter"
- 3 checkbox toggles, each 32px tall:
    - "Nur meine"
    - "Nur mit Kommentaren"
    - "Nur ohne Planzuordnung"
  All unchecked by default. Checkboxes: 16x16, border 1px
  #2C333D, radius 4px, checkmark in #F2F4F7 when checked,
  background stays #232835 (no salbei fill on checkbox).
- Footer: a text link "Filter zurücksetzen" in Inter Medium
  13px salbei #668048

Keep everything else identical to the default state. Salwei
appears only at: the active tab indicator, the selected row,
and the salwei radio dot + the "Filter zurücksetzen" link in
the dropdown.
```

---

## Screen 4 — Grid view (Tile mode) with empty preview

**Verwendung:** Demonstriert den List/Grid-Toggle. Wichtig: der Preview-Pane zeigt den Empty-State. Beweist auch, dass das Card-Layout auf Rastern funktioniert.

**Stitch Prompt:**

```
Same module, but the view toggle is now switched to "Grid"
mode. The Grid icon is active (#3B4349 background, salbei
icon), the List icon is inactive.

The list area shows a 3-column grid of media cards (within
the 60% left column), 12px gap, on the #12181B base.

Grid: 3 columns, 12px gap. Each card: #232835 surface,
radius 10px, padding 0. Inside the card: 1:1 thumbnail
(square, object-cover, no rounding inside the card), then
a metadata strip with the filename in Inter 12px Medium
#F2F4F7 (truncate with ellipsis) and below it the date +
file size in JetBrains Mono 11px #A3ACB8. 8 cards total,
filled with construction site photos and floor plan
thumbnails (mix).

The first card is selected: it has a 1px salbei ring at 40%
opacity around the thumbnail AND a centered "Öffnen" overlay
button in salbei (#668048 fill, white text, radius 8px, 14px
Inter Medium) shown as if hovered.

The right preview panel shows the empty state: a centered
area with a large outline Lucide "Image" icon (56px,
#A3ACB8 at 30% opacity, monochromatic), headline 18px
Marcopro Medium "Medium auswählen" in #F2F4F7, sub 13px
Inter "Wähle ein Foto, einen Plan oder ein Video in der
Liste, um Vorschau und Details zu sehen." in #A3ACB8.
No call-to-action buttons.

Salwei appears only at: the active tab indicator, the
selected card's ring + "Öffnen" overlay, the active grid
toggle icon. Empty state uses only typography.
```

---

## Screen 5 — Plan-Versionen Sub-Tab aktiv (Desktop)

**Verwendung:** Beweist, dass die Sub-Tabs im rechten Preview-Panel („Vorschau / Details / Kommentare / Versionen") funktionieren, und demonstriert das zentrale Alleinstellungsmerkmal von VisiDoc: **unveränderliche Plan-Versionen als historische Referenzen** (siehe `ARCHITECTURE.md` und `LEISTUNGSKATALOG.md`). Visuell anspruchsvoll, weil zwei Floor-Plans Side-by-Side verglichen werden — beweist, dass das Layout auch bei dichten Vergleichsansichten stabil bleibt.

**Stitch Prompt:**

```
Generate a desktop dashboard screen (1440x900) for the media
library module inside "VisiDoc", same setup as Screen 1
(dark mode, 60/40 split, "Pläne 28" tab active, first row
selected, all VisiDoc design tokens from the global context
strictly applied).

What's different in this state: the right preview panel is
now switched to its "Versionen" sub-tab. The four sub-tabs
"Vorschau / Details / Kommentare / Versionen" run along
the top of the preview panel; "Versionen" carries the same
2px salbei underline indicator as the active main tab. The
other three sub-tabs sit at 60% opacity.

The preview panel content (top to bottom):

1) Header strip (identical to Screen 1): filename in
   Marcopro Medium 18px "EG-01_Bauleitplan_v3.pdf", below
   it "Hochgeladen von Maria B. · 14.05.2026, 14:32" in
   Inter 12px #A3ACB8. To the right of the header, a small
   salbei-tinted info pill (12% salbei fill, salbei text
   12px Inter Medium): "3 Versionen · Immutable" with a
   small Lucide "Lock" line icon at 14px.

2) Version list — three rows, each 56px tall, divided by
   1px rgba(255,255,255,0.06) lines:
     - Row 1: "v3" in JetBrains Mono Medium 13px (active,
       2px salbei left bar + #3B4349 row background), then
       filename "EG-01_Bauleitplan_v3.pdf" in Inter Medium
       14px #F2F4F7, then "Aktuell" in Inter 12px Inter
       Medium salbei #668048, then "14.05.2026 · 14:32" in
       Inter 12px #A3ACB8, then file size "1.4 MB" in
       JetBrains Mono 12px #A3ACB8.
     - Row 2: "v2" in JetBrains Mono, filename
       "EG-01_Bauleitplan_v2.pdf", "28.04.2026 · 09:15",
       "1.3 MB". No status pill (it's a historical version).
       Subtle 1px #2C333D border on the right indicating
       "immutable".
     - Row 3: "v1" in JetBrains Mono, filename
       "EG-01_Bauleitplan_v1.pdf", "02.04.2026 · 11:48",
       "1.2 MB". Same styling as v2.

3) Side-by-side compare strip — sits below the version
   list, full panel width, 220px tall: a 2-column grid
   showing "v3" on the left and "v2" on the right as small
   floor-plan thumbnails (each in a #12181B inner area
   with 4px padding and 8px radius), separated by a 1px
   #2C333D vertical divider with a centered Lucide
   "ArrowLeftRight" icon in #A3ACB8 (16px) inside a 28x28
   #3B4349 circle. Below each thumbnail: version label
   "v3" / "v2" in JetBrains Mono Medium 12px #A3ACB8.

4) Footer of the preview panel (identical to Screen 1):
   three outlined-secondary buttons left-aligned (Download,
   Planmarker setzen, Teilen) and one outlined-danger
   "Löschen" right-aligned.

Left list: identical to Screen 1 (8 plan rows, first
selected). The selected row in the list is the v3 entry —
the version list in the right panel mirrors this selection.

Salwei appears only at: the active main tab indicator, the
selected row's left bar (in both list and version list),
the active "Versionen" sub-tab underline, the "Aktuell"
text label, and the version-info pill. NO emoji. Inter for
body, Marcopro for the filename in the preview header and
panel headlines, JetBrains Mono for version numbers and
file sizes.
```

---

## Visuelle Konsistenz-Checkliste

Nachdem Stitch alle 5 Screens gerendert hat, prüfe:

- [ ] App-Header zeigt **„VisiDoc"** in Marcopro SemiBold, niemals „BauDoc"
- [ ] Alle Hintergründe in `#12181B` / `#232835` / `#3B4349` (Neutral / Secondary / Tertiary)
- [ ] Salbei `#668048` erscheint **nur** an: App-Wordmark, aktivem Tab + Check-Icon, Selektion (2 px Balken), Primärbutton, Focus-Ring, „Öffnen"-Overlay
- [ ] Status-Pills (falls gerendert) nutzen Info Blau / Warn Gelb / Erfolg Salbei-Bright / Fehler Rot — nie als dekorative Flächen
- [ ] Status = Icon + Text, nie nur Farbe
- [ ] Zeilenhöhe 64 px Desktop / 72 px Mobile
- [ ] Radien 8 / 10 / 12 px konsequent, Status-Pills als 999 px
- [ ] Keine Emojis, keine Stock-Photo-Clipart-Optik
- [ ] Icon-Stil durchgängig Lucide (1.5 px stroke)
- [ ] Marcopro für Display (Wordmark, Section-Headlines, Preview-Header, Empty-State), Inter für Body, JetBrains Mono für File-Sizes / Versionen / EXIF
- [ ] Tabular Nums bei Datums- und Grössen-Spalten
- [ ] Empty-State ohne Call-to-Action, nur Typografie
- [ ] Filter-Dropdown solid `#232835`, nicht backdrop-blur
- [ ] Date-Format `tt.mm.yyyy` überall
- [ ] Touch-Targets ≥ 44 px

---

## Was Stitch gut kann & was nicht

**Gut:** Hero-Layout, Stimmungs-Setzung, Awwwards-Ästhetik-Vibe, Typografie-Hierarchie, Icon-Set-Auswahl.

**Nicht gut / manuell nachzuarbeiten:**

- Exakte Pixelwerte (Stitch „denkt" in 4er-/8er-Schritten, nicht zwingend 10 px Radien)
- Marcopro ist nicht in jeder Stitch-Version verfügbar — bei Bedarf manuell im Export ersetzen
- Echte Interaktionen (Hover, Fokus, Selektion müssen im Browser nachgebaut werden)
- Logische Zustandsübergänge (z. B. Selektions-Persistenz über Tab-Wechsel)
- Accessibility (Fokusringe, ARIA — Stitch blendet sie meist aus)
- Echte Backend-Daten (Stitch erfindet plausible Beispieldaten, evtl. anpassen)

**Workflow-Empfehlung:** Nutze die Stitch-Screens als **Design-Referenz** für das HTML/Tailwind-Bundle, das du danach entweder selbst baust oder von einem Frontend-Agent bauen lässt (siehe Konzept §1 und §13).

---

## Mobile (deferred)

Mobile-States (390 × 844) sind in diesem Pack bewusst **nicht enthalten** — alle 5 Prompts rendern auf Desktop 1440 × 900, damit Design-Sprache, Token und Komponenten-Hierarchie zuerst stabilisiert werden.

Geplant für eine spätere Pack-Runde:

- Screen M1 — Stacked Layout, „Pläne" aktiv, Selektion mit Bottom-Sheet
- Screen M2 — „Bilder" aktiv, Foto-Vorschau im Bottom-Sheet (Peek 40 vh, Expanded 90 vh)
- Screen M3 — Filter-Drawer (full-screen overlay, Touch-Optimierung)
- Screen M4 — Versionen-Sub-Tab im Bottom-Sheet (gleicher Inhalt wie Desktop Screen 5, in gestapelter Form)
- Screen M5 — Empty-State + Pull-to-Refresh-Affordance

Wenn du die Mobile-Runde starten willst, sag Bescheid — die Token, Schriften und Komponenten sind 1:1 wiederverwendbar.

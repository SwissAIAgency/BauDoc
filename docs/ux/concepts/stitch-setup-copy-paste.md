# VisiDoc — Stitch Projekt-Setup — Copy-Paste Vorlage

Reihenfolge wie im Dialog (siehe Screenshot). Jeder Block ist ready zum Reinkopieren.

> **Wichtig:** Das Produkt heisst **VisiDoc** (nicht BauDoc). Die DESIGN.md für VisiDoc liegt unter `visidoc-DESIGN.md` im selben Ordner. Der Inhalt von Feld 1 + Feld 7 ist hier zusätzlich inline, damit du nicht zwei Dateien offen haben musst.
>
> **Brand-Quelle:** Salbei-Primärfarbe `#668048` und das Drei-Schrift-System (Marcopro / Inter / JetBrains Mono) stammen aus deinem Brand-Export. Die DESIGN.md setzt diese Werte exakt um.

---

## Feld 1 — DESIGN.md-Datei (Hauptdokument)

Das ist das wichtigste Feld. Stitch liest es als **Single Source of Truth** für Tonalität, Struktur, Komponenten und Constraints. Je konkreter, desto besser das Resultat.

```markdown
# VisiDoc — DESIGN.md

## Product

VisiDoc is a web and mobile/PWA SaaS for plan-based
construction progress documentation, built for Swiss SMBs
(KMU) in the building trades. The MVP is a working tool for
site managers, project managers, planners, and trade users.
This DESIGN.md describes the **Gallery & Media Library**
module, which surfaces photos, floor plan versions, and
short site videos in a chronological, filterable, role-aware
view.

## Audience

- Primary: project managers, site managers (Bauleiter) —
  desktop power users who scroll, filter, and compare many
  files per session.
- Secondary: planners (Planer), trade users (Gewerk),
  observers (Betrachter). Roles affect what is visible, not
  the layout.
- Mobile: site staff capturing or quickly checking photos
  on a phone in daylight.
- Context: Swiss KMU. Bilingual UI where useful (de-CH
  primary, fr/it as later phase). Currency CHF, dates
  tt.mm.yyyy, amounts 1'230.00.

## Brand at a glance

VisiDoc is built on a single brand colour: salbei green
(#668048) — a muted, earthy, professional olive-sage that
reads as technical, calm, and trustworthy. Everything else
in the interface is a neutral anthracite scale, with one
saturated accent family reserved for status communication
(blue, yellow, red). Aesthetic: B2B software standard,
Awwwards-leaning, minimal, dense, technical, calm.
References: Linear, Vercel, Raycast, Madaster.

## Design tokens (strict, do not deviate)

### Brand & surface
- Primary (Salbei):         #668048
- Primary soft (12%):       rgba(102, 128, 72, 0.12)
- Primary hover:            #7A9359
- Primary press:            #566B3D
- Neutral / BG base:        #12181B
- Secondary / panel:        #232835
- Tertiary / panel hover:   #3B4349
- Border default:           #2C333D
- Border subtle:            rgba(255, 255, 255, 0.06)

### Text
- Text high:                #F2F4F7
- Text mid:                 #A3ACB8
- Text low:                 #6B7480
- Text on primary:          #FFFFFF

### Status (saturated, status communication only)
- Info / Blau:              #5B8DEF
- Warn / Gelb:              #F5C768
- Success / Salbei-Bright:  #7FB069
- Error / Rot:              #F26B6B

### Geometry
- Radius container: 10 px, small 8 px, panel 12 px, pill 999
- Spacing: 4 / 8 / 12 / 16 / 20 / 24 / 32 px
- Border: 1 px (panel), 2 px (active, focus)

## Typography (three-family system, no substitutions)

### Marcopro — Display / Headline
- App wordmark, page titles, section headlines, empty-state
  headlines.
- Weights: 400 / 500 / 600.

### Inter — Body / UI
- Body, list rows, tab labels, buttons, form fields, table
  cells, filter dropdowns.
- All numbers in tabular figures.
- Weights: 400 / 500 / 600.

### JetBrains Mono — Technical data
- File sizes, plan version numbers (v3.2), IDs, EXIF values,
  date stamps in metadata, URL slugs, hashes.
- Weights: 400 / 500.

### Scale
- App wordmark (Marcopro):       22 / 1.2 / 600
- Page title (Marcopro):          26 / 1.2 / 600
- Section headline (Marcopro):    18 / 1.25 / 500
- Tab label (Inter):              15 / 1.2 / 500
- Body (Inter):                   14 / 1.45 / 400
- Secondary metadata (Inter):     13 / 1.45 / 400
- Button label (Inter):           14 / 1.0 / 500
- Micro / counts (Inter):         12 / 1.4 / 400
- Mono data (JetBrains Mono):     12 / 1.4 / 400
- Empty-state headline (Marcopro): 18 / 1.3 / 500

No uppercase styling. German UI strings by default. Product
name in the app header: VisiDoc.

## Iconography

- Lucide outline, stroke-width 1.5.
- 16 px inline, 18 px buttons, 24 px panel headers.
- Default #A3ACB8, hover #F2F4F7, active state #668048
  (salbei). Status icons keep their semantic colour.
- No emoji, no filled, no two-tone.

## Layout

Two-column split, desktop 60/40. Left: tabs, sub-header,
list. Right: sticky preview panel.

Breakpoints:
- xl ≥ 1280 px: 60/40, 24 px padding
- lg 1024–1279: 55/45, 20 px padding
- md 768–1023: stacked, 40 vh bottom sheet
- sm < 768: full-screen list, preview as full-screen modal

No horizontal scroll. Touch targets ≥ 44 px.

## Components

### Tabs (segmented control)
Three tabs: Bilder / Pläne / Videos. Active tab: 2 px salbei
underline, 14 px salbei check icon to the left, full opacity.
Inactive: 60% opacity. No box. Counts inline in #6B7480 12 px,
not pills.

### Sub-header (filter & search)
56 px row. Borderless search field with magnifier icon and
"Suche…" placeholder, subtle bottom border that strengthens
on focus. Filter button (secondary) with rotating chevron on
open. View toggle (list/grid), active state #3B4349 fill with
salbei icon. 1 px #2C333D divider 24 px tall between search
and filter.

### Filter dropdown
280 px wide, right-aligned. Background #232835, border 1 px
#2C333D, radius 10 px, soft shadow. Two sections: Sortieren
(radios: Datum neueste/älteste, Name A–Z, Ersteller) with
salbei radio dot when selected, and Erweiterte Filter
(checkboxes: Nur meine, Nur mit Kommentaren, Nur ohne
Planzuordnung). Footer: "Filter zurücksetzen" text link in
salbei.

### Media list (rows)
64 px row height, internal grid 40 px / 1fr / 140 px /
120 px / auto. 40×40 thumbnail (radius 8), filename + plan
version subtitle, date tt.mm.yyyy (tabular nums), file size
1.4 MB in JetBrains Mono, action icons. Rows separated by
1 px rgba(255,255,255,0.06). Selected row: 2 px salbei left
bar + #3B4349 background. Hover: #3B4349. Whole row is a
semantic button.

### Media grid (tiles)
3 columns at xl, 2 at lg, 1 at sm. 1:1 thumbnails on a
#232835 card, radius 10 px. Metadata strip below: 12 px
Inter filename, 11 px JetBrains Mono date+size in secondary.
Hover: 1 px salbei ring at 40% opacity + centered "Öffnen"
overlay in salbei.

### Preview panel
Sticky, rounded 12 px, surface #232835, border 1 px #2C333D.
Header: filename 18 px Marcopro Medium, "Hochgeladen von
<name> · 14.05.2026, 14:32" 12 px Inter secondary. Hero
preview fills available space (image object-contain, plan
render, HTML5 video with controls). Sub-tabs Vorschau /
Details / Kommentare / Versionen with salbei underline.
Footer: outlined-secondary buttons left (Download, Planmarker
setzen for plans, Teilen), outlined-danger right (Löschen).

### Empty state (preview)
Centered: 56 px outline image icon at 30% opacity, headline
18 px Marcopro Medium "Medium auswählen", sub 13 px Inter
"Wähle ein Foto, einen Plan oder ein Video in der Liste, um
Vorschau und Details zu sehen." No CTA buttons.

### Empty state (list with active filter)
48 px dashed-border box #2C333D, SearchX icon 16 px, "Keine
Treffer für die aktuellen Filter." + "Filter zurücksetzen"
link in salbei.

## Buttons (VisiDoc button system)

- Primary: salbei #668048 fill, white text. Hover #7A9359,
  press #566B3D. One per view max.
- Secondary: #232835 fill, 1 px #2C333D border, #F2F4F7 text.
  Hover #3B4349.
- Inverted: light surface, dark text. Reserved for hero /
  marketing.
- Outlined: transparent, 1 px border, salbei text. For
  preview-panel actions.
- Label/icon-only: salbei icon, 36 × 36 px touch target.
- Danger: outlined #F26B6B for Löschen. Never filled-danger
  as default. Confirm dialog required.
- Disabled: 40% opacity, no pointer.

## Status communication

Status must always combine icon + text. Pills: 12 px Inter
Medium, radius 999, 4 px v / 10 px h padding.

- Freigegeben: CheckCircle2 + "Freigegeben" in #7FB069
- In Prüfung: Clock + "In Prüfung" in #F5C768
- Neu: Sparkles + "Neu" in #5B8DEF
- Upload läuft: UploadCloud + "Upload läuft" in secondary,
  subtle 1.2 s rotation
- Fehler: AlertCircle + "Fehler" in #F26B6B

## Accessibility

- Body contrast on #12181B: #F2F4F7 ≥ 15:1, #A3ACB8 ≥ 7:1,
  #6B7480 ≥ 4.6:1. All WCAG AAA for body.
- 2 px salbei focus ring with 2 px offset on all interactive
  elements.
- Tabs: role=tablist, aria-selected, arrow-key nav.
- List rows: role=listbox / role=option, aria-selected.
- Live region aria-live=polite for upload / filter counter.
- prefers-reduced-motion: all transitions disabled.
- Status never colour alone.

## Hard constraints

- No emoji, no decorative stock imagery, no gradients.
- Salbei (#668048) appears ONLY in: app wordmark, active
  tab indicator, selected row left bar, primary buttons,
  focus rings, Öffnen overlay.
- Status colours appear ONLY inside status pills and status
  icons. Never as decorative fills.
- No marketing copy, no "Get started" CTAs in production UI.
- No horizontal scroll on any breakpoint.
- German strings by default. Date tt.mm.yyyy, time hh:mm,
  currency CHF, amounts 1'230.00.
- Product name is VisiDoc in the app header. Never "BauDoc"
  or any other product name.
- Three-font system is mandatory: Marcopro / Inter /
  JetBrains Mono. No substitutions without design approval.
- Dark mode only in the MVP. Light mode is a later phase.

## What is out of scope (do not design these)

- Plan viewer (zoom/pan), plan marker editor, photo capture
  flow — separate modules.
- 360° panoramas, AI tagging, offline sync — future phase.
- Light mode, marketing site — future phase.
- fr / it / en localisation — German only in MVP.
```

---

## Feld 2 — DESIGN.md hochladen

**Nicht nötig, wenn du Feld 1 mit Copy-Paste befüllt.** Stitch akzeptiert den Text in beiden Feldern.

Falls du als Datei hochlädst: den oben stehenden Markdown-Block als `visidoc-DESIGN.md` ins Repo unter `docs/ux/concepts/visidoc-DESIGN.md` speichern (ist bereits dort).

---

## Feld 3 — Code, Bilder, Schriftarten und Logos hochladen

**Bewusst leer lassen für V1.** Begründung:

- Kein VisiDoc-Frontend-Code vorhanden.
- Kein VisiDoc-Logo als Datei im Repo (Brand-Export zeigt nur die Wortmarke inline).
- Kein Custom-Font-File im Repo.

Falls du **trotzdem etwas hochladen** willst, empfehle ich:

- **Marcopro** Schrift: kommerziell, lizenziert über Dinamo (https://www.dinamo.ch/). Wenn Lizenz vorliegt, die `.ttf`/`.otf` hier hochladen.
- **Inter** Variable Font: kostenlos, Quelle `https://rsms.me/inter/`. Hilft Stitch, die Schrift exakt zu treffen.
- **JetBrains Mono** Variable Font: kostenlos, Quelle `https://www.jetbrains.com/lp/mono/`. Selbe Funktion.
- **Logo/Wortmarke:** PNG mit „VisiDoc" in Marcopro, weiss auf transparent, idealerweise quadratisch (App-Header-Mockup).

---

## Feld 4 — FIG-Datei hochladen

**Feld überspringen**, kein Figma-Export vorhanden und nicht nötig. Die DESIGN.md oben enthält alle strukturellen Specs.

---

## Feld 5 — Öffentliches GitHub-Repository (Vorschau)

Wenn das VisiDoc-Repo öffentlich ist, hier der Link:

```
https://github.com/SwissAIAgency/VisiDoc
```

Falls das VisiDoc-Repo noch nicht existiert: **Feld leer lassen.** Die DESIGN.md in Feld 1 ist die massgebliche Quelle.

---

## Feld 6 — Website hinzufügen

Falls VisiDoc eine Marketing-Site hat:

```
https://visidoc.ch
```

(Domain raten, anpassen falls anders.) Wenn keine Site existiert: **Feld leer lassen.**

---

## Feld 7 — Zusätzliche Anweisungen

Dieses Feld ist die **geheime Waffe** — Stitch gewichtet es stark. Folgender Text ist exakt auf unsere DESIGN.md + die 5 Screen-Prompts aus `stitch-prompts.md` abgestimmt.

```markdown
Prioritize the Gallery & Media Library module over any other
part of the product. The product is dark-mode-only; do not
generate light variants.

Hard rules:
- Three fonts, in this exact pairing: Marcopro for display
  (wordmark, page titles, section headlines, empty-state
  headlines), Inter for body and UI, JetBrains Mono for
  technical data (file sizes, version numbers, IDs, EXIF).
  No substitutions, no mixing.
- Lucide outline icons, 1.5 px stroke. No filled, no
  two-tone, no emoji. Ever.
- The brand colour is salbei green #668048. It is the ONLY
  colour allowed besides the anthracite greyscale and the
  four status colours. Use salbei ONLY for: app wordmark,
  active tab underline (with a 14 px salbei check icon to
  its left), selected row (2 px salbei left bar + #3B4349
  background), primary action button, focus rings, and
  the "Öffnen" overlay on grid tiles.
- Status colours (info #5B8DEF, warn #F5C768, success
  #7FB069, error #F26B6B) appear ONLY inside status pills
  and status icons. Never as decorative fills.
- No decorative gradients, no marketing hero, no colourful
  status pills, no glow effects.
- Status must always be icon + text, never colour alone.
- Background is #12181B (neutral, almost black). The
  preview panel sits on #232835 (secondary) and must read
  as visually distinct from the left column.
- Layout is always 60/40 split on desktop ≥ 1280 px. The
  preview panel is sticky and never moves while the list
  scrolls.
- List rows are 64 px tall on desktop, 72 px on mobile, with
  ultra-faint dividers (rgba 255,255,255, 0.06) — not
  visible at first glance, only on close inspection.
- Selected row has a 2 px salbei left bar (not a full
  outline) and a #3B4349 background.
- All thumbnails are square, 40×40 in the list, 1:1 in the
  grid. Plan thumbnails are isometric/blueprint-style;
  photo thumbnails look like real construction site
  photography (scaffolding, rebar, concrete, electrical,
  drywall, tiling, roofing, facade).
- For empty states use ONLY typography and a single large
  outline icon at low opacity. No CTA buttons in the empty
  state.
- The Filter dropdown is a solid #232835 panel with a soft
  shadow, not a backdrop-blur variant.
- For the Mobile screen, use a 40 vh bottom sheet with a
  drag handle for the preview. Touch targets ≥ 44 px.
- Render in German by default for all UI labels.
- Product name in the app header is "VisiDoc". Do not write
  "BauDoc" or any other product name in the generated UI.
- Date format is tt.mm.yyyy, time hh:mm. File sizes in
  JetBrains Mono.

Generate the following 5 screens in this exact order. Each
screen must be visually consistent with the others — same
background, same panel, same tokens, same typography.

1. Gallery — Default (Plans tab active). 1440×900. List of
   8 plan rows, first row selected, preview shows a floor
   plan named "EG-01_Bauleitplan_v3.pdf". Footer of preview
   shows Download, Planmarker setzen, Teilen, and Löschen.

2. Gallery — Bilder tab active. 1440×900. Same structure,
   photo thumbnails, no Planmarker setzen action in footer.

3. Gallery — Filter dropdown open. 1440×900. Dropdown shows
   Sortieren section (4 radios, first one selected with
   salbei dot) and Erweiterte Filter section (3 checkboxes),
   Filter zurücksetzen footer in salbei.

4. Gallery — Grid view + empty preview. 1440×900. 3-column
   grid of media tiles on #232835 cards, first tile
   selected (1 px salbei ring + Öffnen overlay), right
   preview shows the empty state (no CTA, just typography:
   56 px outline icon + Marcopro Medium headline + Inter
   sub).

5. Gallery — Mobile. 390×844. Stacked layout, same three
   tabs horizontally scrollable, list of 6 rows, sticky
   40 vh bottom sheet showing preview with a drag handle.

After rendering, verify against these checks before showing
the result to the user:
- Salbei #668048 appears ONLY in the six allowed places.
- Body contrast on #12181B is at least 7:1.
- Selected row uses a 2 px salbei left bar, not a full
  outline.
- Empty state has no CTA button.
- All icons are line/outline, no filled glyphs.
- All numbers in tabular figures.
- All technical values (file sizes, version numbers, EXIF)
  in JetBrains Mono.
- All display text (wordmark, page titles, section
  headlines, empty-state headlines) in Marcopro.
- No emoji anywhere.
- App header shows "VisiDoc", never "BauDoc".
```

---

## Reihenfolge im UI

1. **DESIGN.md einfügen** → Block aus Feld 1
2. *DESIGN.md hochladen* → überspringen (oder `visidoc-DESIGN.md` aus dem Repo)
3. *Code/Bilder/Schriftarten/Logos* → leer lassen (oder Inter + JetBrains Mono + Logo)
4. *FIG-Datei* → leer lassen
5. *GitHub-Repo* → leer lassen (oder `https://github.com/SwissAIAgency/VisiDoc`)
6. *Website* → leer lassen (oder `https://visidoc.ch`)
7. **Zusätzliche Anweisungen** → Block aus Feld 7
8. **Weiter** klicken

---

## Was du danach tust

Sobald Stitch das Projekt angelegt hat und du im Screen-Generator bist, nimm die **5 Prompts aus `stitch-prompts.md`** in der dort angegebenen Reihenfolge. Die Prompts referenzieren dieselben Tokens, die du oben eingefüttert hast — das hält das Set visuell konsistent.

Bei Inkonsistenzen (Stitch schätzt Farbe/Raum mal daneben): im Stitch-Editor nachjustieren oder einen neuen Render-Pass mit präziserem Prompt machen. Die **Konsistenz-Checkliste** am Ende von `stitch-prompts.md` ist dein QA-Lauf danach.

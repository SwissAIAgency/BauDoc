# Konzept: Galerie- & Medienverwaltungs-Modul

**Status:** Konzept (Ready for Implementation)
**Bereich:** Frontend / UX
**Quell-Skizze:** Awwwards-Style Split-Layout (Bilder/Pläne/Videos)
**Bezug:** `LEISTUNGSKATALOG.md` → „Galerie, Filter und Kommentare", `UI_STANDARDS.md`, `docs/ux/concepts/visidoc-DESIGN.md` (massgebliche Brand-Tokens für **VisiDoc**), `docs/ux/design-system.md`
**Stack-Hinweis:** Framework-neutral (Vue 3 / React / Inertia); Implementierungsbeispiele in Tailwind-Klassen und Lucide-Icons. Frontend-Stack-Entscheidung ist laut `frontend/README.md` noch offen — Spec bleibt absichtlich portabel.

---

## 1. Zweck & Abgrenzung

Chronologische und fachliche Durchsuchbarkeit des Baufortschritts (Fotos, Pläne, Videos) nach Zeitraum, Ort und Gewerk. Filter, Kommentare und schnelle Vorschau stehen im Zentrum.

**Explizit nicht enthalten** (anderes Modul / spätere Phase):

- Planviewer (Zoom/Pan) — eigenes Modul
- Planpositionen / Marker-Editor — eigenes Modul
- 360°-Panoramen — Erweiterung
- KI-Tagging — Erweiterung
- Mobile-Aufnahmeflow (Foto schiessen) — eigenes Modul

**In Scope hier:** Listen-/Grid-Container, Filter, Vorschau-Pane, Selektionsmodell, Tabs nach Medientyp, Empty/Loading/Error-States, Tastatur-Bedienung, A11y.

---

## 2. Design-Prinzipien für dieses Modul

1. **Arbeitswerkzeug, kein Showroom.** Ruhig, dicht, wiederholbar — `UI_STANDARDS.md` ist verbindlich.
2. **Eine Brand-Farbe, vier Status-Farben.** Salbei `#668048` für Selektion/Aktiv/Primärbutton (siehe `visidoc-DESIGN.md` §Brand). Status-Pills nutzen die vier Status-Farben (Info Blau `#5B8DEF`, Warnung Gelb `#F5C768`, Erfolg Salbei-Bright `#7FB069`, Fehler Rot `#F26B6B`).
3. **Information durch Hierarchie, nicht durch Farbe.** Status immer zusätzlich textlich oder iconisch.
4. **Trennung durch Atemraum und Strich, nicht durch Boxen.** 1 px Linien in `rgba(255, 255, 255, 0.06)` reichen.
5. **Vorschau ist ein Bürger erster Klasse.** Rechte Spalte ist 40 % — bei Plänen oft das eigentliche Arbeitsobjekt.

---

## 3. Layout-Grid (Desktop ≥ 1280 px)

Zweispaltiges Split-Layout, Container `min-h-screen` mit globalem 24 px Außenrand.

| Eigenschaft | Linke Spalte | Rechte Spalte |
|---|---|---|
| Anteil | `60%` (Fluid, min 720 px) | `40%` (Fluid, min 420 px) |
| Inhalt | Tabs + Sub-Header + Medienliste | Preview-Pane (sticky) |
| Padding | 24 px horizontal, 20 px vertikal | 24 px rundum |
| Hintergrund | `bg-[#12181B]` (Neutral) | `bg-[#232835]` (Secondary-Panel, visuell abgesetzt) |
| Border | rechts 1 px `border-[#2C333D]` | keine (eigener Panelton) |

## 4. Visueller Stil (Dark Mode, VisiDoc Brand)

Direkt aus `visidoc-DESIGN.md` (massgebliche Quelle):

| Token | Wert | Verwendung |
|---|---|---|
| `--bg-base` | `#12181B` | Linke Spalte, App-Hintergrund (Neutral) |
| `--bg-panel` | `#232835` | Rechte Spalte (Preview), Cards im Grid-Modus (Secondary) |
| `--bg-panel-2` | `#3B4349` | Hover-Staat über Listenzeilen, aktiver Filter-Chip, selektierte Zeile (Tertiary) |
| `--text-hi` | `#F2F4F7` | Primärtext |
| `--text-mid` | `#A3ACB8` | Metadaten, Sekundärtext |
| `--text-lo` | `#6B7480` | Platzhalter, deaktive Icons, Mengenzähler |
| `--line-soft` | `rgba(255, 255, 255, 0.06)` | Zeilentrenner in der Liste |
| `--line` | `#2C333D` | Panel-Borders, Filter-Outline |
| `--accent` | `#668048` (Salbei) | Aktiv-Tab-Linie, Selektions-Akzent, Primärbutton, Focus-Ring, Brand-Marke |
| `--accent-soft` | `rgba(102, 128, 72, 0.12)` | Selektierter Zeilenhintergrund |
| `--status-info` | `#5B8DEF` (Blau) | „Neu"-Pill |
| `--status-warn` | `#F5C768` (Gelb) | „In Prüfung"-Pill |
| `--status-success` | `#7FB069` (Salbei-Bright) | „Freigegeben"-Pill |
| `--status-error` | `#F26B6B` (Rot) | „Fehler"-Pill |
| `--radius` | `10 px` | Standard für Container, Buttons, Pills |
| `--radius-sm` | `8 px` | Kleine Interaktionselemente |
| `--radius-pill` | `999 px` | Status-Pills |
| `--space-1..6` | `4 / 8 / 12 / 16 / 20 / 24 px` | Einheitliche Stufenleiter |

**Typografie (Drei-Familien-System, keine Substitutionen):**

- **Marcopro** (Display, semibold/medium) — App-Wordmark, Section-Headlines, Empty-State-Headlines, Preview-Header.
- **Inter** (Body, regular/medium) — Body, Tab-Labels, Buttons, Formularfelder, Filter-Dropdown, Listenzeilen.
- **JetBrains Mono** (Technical) — Dateigrössen, Plan-Versionen (`v3.2`), IDs, EXIF-Werte, Datums-Stempel in Metadata-Strips.

Skala: 22/26/18 px (Marcopro Headlines), 14/13/12 px (Inter Body/Secondary/Micro), 12 px (JetBrains Mono). Tabular Nums für alle Zahlen. Keine Uppercase.

**Responsive Breakpoints:**

- `≥ 1280 px` (xl): Split 60/40 wie oben.
- `1024–1279 px` (lg): Split 55/45, reduziertes Padding (20 px).
- `768–1023 px` (md): **Einspaltig**, Preview wird zu einem Sheet unter der Selektion (Sticky-Bottom-Pattern, Höhe 40 vh).
- `< 768 px` (sm): Listen-/Grid-Ansicht als Vollbild, Preview nur als Vollbild-Modal über Tap auf Medium.

Auf `< md` entfällt der Split komplett — keine horizontalen Scrollflächen, gem. `UI_STANDARDS.md`.

---

## 4. Visueller Stil (Dark Mode)

Direkt aus `visidoc-DESIGN.md` (VisiDoc-Brand, massgebliche Quelle). Siehe Abschnitt 4 oben für die vollständige Token-Tabelle und das Drei-Schrift-System (Marcopro / Inter / JetBrains Mono). Die hier nachfolgend verwendeten Tailwind-Beispiele nutzen CSS-Variablen (`bg-[--bg-panel]`), die auf diese Token mappen.

Line-Height 1.45 für Body, 1.2 für Headlines. Tabular Nums für Dateigrößen und Mengenangaben.

**Iconik:** Lucide, `stroke-width="1.5"`, 16 px (Inline in Zeilen), 18 px (Tabs, Buttons), 24 px (Preview-Header). Monochrom in `--text-mid`; nur aktive Zustände in `--accent`.

---

## 5. Komponenten-Spec

### 5.1 Tabs (Segmented Control)

Horizontale Tab-Leiste am Kopf der linken Spalte. Drei Tabs: **Bilder · Pläne · Videos**.

- Container: `flex items-end gap-6` (kein umschliessender Container mit Box-Look).
- Tab-Label: 18 px, `--text-mid`, `font-medium`, `tracking-tight`.
- Aktiver Tab (Default: **Pläne**): Textfarbe `--text-hi`, `opacity-100`.
- Inaktive Tabs: `opacity-60`, Hover `opacity-90`.
- Aktiv-Indikator: 2 px Linie unter dem aktiven Tab in `--accent`, 24 px breit, mittig, mit `transition-transform 200ms ease-out` beim Wechsel. Kein Box-Highlight.
- Mikro-Icon: Optional 14 px Check-Icon in `--accent` links vom aktiven Label (nicht bei allen drei, nur dem aktiven). Animiert per `scale + opacity` bei Aktivierung.
- Mengen-Badge: rechts vom Label, 12 px in `--text-lo`, Format „28". Optional.
- Tastatur: ←/→ navigiert, `Enter`/`Space` aktiviert, `Home`/`End` springt an die Enden. `role="tablist"`, `aria-selected`, `aria-controls`.

**Mengenindikatoren (optional, aus Skizze „15 Bilder / 28 Pläne"):** Wir zeigen sie als subtile Zahl rechts vom Label, in `--text-lo` 12 px, NICHT als Pill. Das verhindert visuelles Gekröse.

### 5.2 Sub-Header (Filter- & Suchleiste)

Direkt unter den Tabs, eine 56 px hohe Zeile.

Layout (Flex):

```
[ 🔍 Suchen…  (flex-1)         ]  [ ⇅ Filter  ▾ ]  [ ☰ | ▦ ]
```

**Suchfeld:**

- Rahmenlos (`border-none`), `bg-transparent`, `h-10`.
- Integriertes Lupen-Icon links (16 px, `--text-mid`).
- Placeholder „Suchen…" in `--text-lo`, 14 px.
- Trennlinie rechts vom Feld: 1 px `--line`, 24 px hoch, `mx-4`.
- Fokus: 1 px Linie in `--accent` unter dem Feld, `transition` 150 ms.

**Filter-Button:**

- Sekundär, `h-10 px-3`, `--text-mid`, 14 px.
- Icon `ListFilter` (Lucide) links, 16 px, Chevron-Down rechts (rotiert 180° bei offen).
- Hover: `--text-hi`.
- Aktiv (Dropdown offen): `--text-hi` + `bg-[--bg-panel-2]`.
- Dropdown (semi-transparent, `backdrop-blur-md`):
  - Breite 280 px, rechtsbündig am Button.
  - `bg-[--bg-panel]/95`, `border border-[--line]`, `rounded-[10px]`, `shadow-2xl`.
  - Sektion „Sortieren" mit Radio-Gruppe: **Datum (neueste zuerst)** · **Datum (älteste zuerst)** · **Name (A–Z)** · **Ersteller**.
  - Sektion „Erweiterte Filter" mit Checkbox-Toggles: **Nur meine** · **Nur mit Kommentaren** · **Nur ohne Planzuordnung**.
  - Footer: `Filter zurücksetzen` (Text-Link, `--text-mid`).
  - `Escape` schliesst, Klick ausserhalb schliesst, `aria-expanded` am Button.

**View-Toggle (rechts):**

- 2-State-Switch, 36 × 36 px Touch-Ziel, `rounded-[8px]`.
- Zwei Icons: `List` (Listenansicht, Default) und `LayoutGrid` (Kachelansicht).
- Aktiv: `bg-[--bg-panel-2]` + Icon in `--text-hi`. Inaktiv: Icon in `--text-mid`, Hover `--text-hi`.
- `role="radiogroup"`, `aria-checked`.

### 5.3 Medienliste (Listen-Ansicht, Default)

Vertikale Liste, jede Zeile ein semantisches `<button>` (nicht `<div>`!), damit Selektion + Tastatur out-of-the-box funktionieren.

**Zeilen-Spec:**

- Höhe: 64 px (h-16), `padding-x: 20`, `padding-y: 12`.
- Innen-Layout (Grid `grid-cols-[40px_1fr_140px_120px_auto] gap-4 items-center`):
  - Spalte 1 (40 px): Thumbnail — 40 × 40 px, `rounded-[8px]`, `object-cover`. Bei Plänen und Videos: Icon-Overlay wenn kein Thumbnail (`FileImage` / `Film`).
  - Spalte 2 (fluid): Name — 14 px `--text-hi`, `truncate` mit Tooltip bei Hover, `font-medium`. Darunter in 12 px `--text-mid`: optionaler Pfad/Plan-Version („Plan EG · v3").
  - Spalte 3 (140 px): Änderungsdatum — 13 px `--text-mid`, `tabular-nums`, Format `tt.mm.yyyy`.
  - Spalte 4 (120 px): Dateigröße — 13 px `--text-mid`, rechtsbündig, `tabular-nums`, Format `1.4 MB`.
  - Spalte 5 (auto, min 120 px): Aktions-Icons, `flex gap-1`, 16 px Lucide, `--text-mid` → Hover `--text-hi`.
    - `Download` (immer), `MessageSquare` (nur bei Plänen), `Trash2` (nur mit Recht), `Check`/`Circle` (Status-Toggle).
- Trennlinien: `border-bottom: 1px solid var(--line-soft)`. Letzte Zeile ohne Linie.
- Hover: `background: var(--bg-panel-2)`, 120 ms ease.
- Selektiert: `background: var(--accent-soft)`, links 2 px Balken in `--accent` (Indikator-Streifen, kein Outline).
- Fokus (Tastatur): sichtbarer 2 px Fokusring in `--accent` um die Zeile, 2 px Offset, gem. `UI_STANDARDS.md` Barrierefreiheit.
- Mehrfachauswahl: `Cmd/Ctrl + Klick` toggelt; in V1 nicht erforderlich, vorbereitet via `aria-selected`-Pattern.

**Status-Checkbox-Icon (rechts):** Zeigt Verarbeitungs-/Freigabe-Status. Immer Icon + Text, nie Icon allein (gem. UI-Standards „Informationen nicht nur über Farbe vermitteln"):

- `CheckCircle2` „Freigegeben" in `--success`
- `Clock` „In Prüfung" in `--warn`
- `UploadCloud` „Upload läuft" in `--text-mid`, dezent rotierende Animation
- `AlertCircle` „Fehler" in `--error`

Tooltip mit dem Klartext-Status bei Hover, immer sichtbar im Vorschau-Pane.

### 5.4 Medienliste (Grid-Ansicht)

Bei aktivem Grid-Toggle: Wechsel auf 3–4 Spalten Grid (responsive: 1 sm, 2 md, 3 lg, 4 xl).

- Card 1:1 Thumbnail, `rounded-[10px]`, `bg-[--bg-panel]`.
- Thumbnail ist das volle Card-Element (`object-cover`, `aspect-square`).
- Darunter Metadata-Strip: 12 px Name (`truncate`) + 11 px Datum in `--text-mid`.
- Hover: Thumbnail bekommt `ring-1 ring-[--accent]/40`, plus Overlay-Button „Öffnen" zentriert.
- Klick selektiert (nicht öffnet Modal — das macht die Vorschau-Spalte).

### 5.5 Preview-Pane (rechte Spalte)

Sticky-Container, `bg-[--bg-panel]`, `rounded-[12px]`, `border border-[--line]`, `p-5`, `min-h-[520px]`.

**Empty-State (keine Selektion):**

- Zentriert, 320 × 320 px logischer Block.
- Über schlichter `Image`-Icon-Stub (Lucide, 56 px, `--text-lo` 30 % Opazität, **kein Emoji**, gem. UI-Standards).
- Headline 18 px `--text-hi`: „Medium auswählen".
- Sub 13 px `--text-mid`: „Wähle ein Foto, einen Plan oder ein Video in der Liste, um Vorschau und Details zu sehen."
- Keine Call-to-Action-Buttons, solange keine Selektion (vermeidet leere Versprechen).

**Gefüllter Zustand:**

- Header: 18 px Dateiname, `truncate`, `font-medium`. Darunter 12 px `--text-mid`: „Hochgeladen von Maria B. · 14.05.2026, 14:32".
- Hero-Vorschau (flexibel, max-h 60 vh):
  - **Bild:** Vollbild mit `object-contain`, dunkler Hintergrund, 1:1 oder eingepasst.
  - **Plan:** PNG/PDF-Seite gerendert, Zoomen via Doppelklick, dezenter Zoom-Indikator unten rechts.
  - **Video:** HTML5-`<video controls>` mit `preload="metadata"`, Posterframe = erste Sekunde.
- Tab-Strip im Pane: **Vorschau · Details · Kommentare · Versionen**.
  - Tabs sind 14 px, Unterstreichungs-Indikator wie in 5.1, nur schmaler.
  - **Details-Tab:** Schlüssel-Wert-Liste, 13 px, Paare 8 px gap. Felder: Typ, Grösse, Auflösung, EXIF (Aufnahmezeit, Gerät, GPS falls vorhanden), Planbezug, Gewerk, Tags, Berechtigungen.
  - **Kommentare-Tab:** Thread-Ansicht, identisch zum globalen Kommentar-Modul, hier eingebettet.
  - **Versionen-Tab:** Nur Pläne, Liste der Planversionen v1…vN mit Datum, Ersteller, Änderungsnotiz. Klick auf eine Version öffnet diese in der Vorschau.
- Fusszeile im Pane: drei Sekundär-Buttons linksbündig: `Download`, `Planmarker setzen` (nur Pläne), `Teilen`. Rechtsbündig: `Löschen` (Danger) bei Berechtigung.

**Ladezustand:** Skeleton: 280 × 200 Block pulsierend, plus 3 Textzeilen.

**Fehlerzustand:** Kompakte Box, `border-l-2 border-[--error]`, 14 px Headline „Vorschau nicht verfügbar", 13 px Sub „Bitte versuche es erneut oder lade die Datei herunter." + `Erneut versuchen` Text-Link.

### 5.6 Empty-States (Filter ohne Treffer)

Wenn Filter aktiv und 0 Treffer: zwischen Sub-Header und Liste eine kompakte Info-Box, 48 px hoch, `border border-dashed border-[--line]`, `rounded-[10px]`, Inhalt:

- `SearchX` Icon 16 px `--text-mid`, Text „Keine Treffer für die aktuellen Filter." 13 px `--text-mid`. Rechts: `Filter zurücksetzen` Text-Link.

Wenn Tabs komplett leer (kein Medium je hochgeladen): zentrierter Block analog zu 5.5, mit `Upload`-Button (Primary) wenn der Nutzer die Berechtigung hat.

---

## 6. Interaktions-Spec

### 6.1 Selektion

- Single-Select (V1). Ein Klick auf eine Zeile/Card selektiert sie und befüllt die Vorschau.
- Selektion überlebt Tabs-Wechsel NICHT (Tabs wechseln die Datenmenge, nicht die Auswahl). Wird eine Selektion ungültig, fällt die Vorschau in den Empty-State.
- Selektion wird in der URL gehalten: `?type=plaene&selected=<id>&view=list&q=...&sort=date_desc&filter=mine`. Ermöglicht Deep-Links und Browser-Back.

### 6.2 Tastatur

| Taste | Aktion |
|---|---|
| `↑` / `↓` | Selektion in der Liste nach oben/unten |
| `Home` / `End` | Erste / letzte Zeile |
| `Enter` | Selektion bestätigen (öffnet Modal-Vollbild auf Mobile) |
| `Space` | Selektion toggeln (Vorbereitung Mehrfachauswahl) |
| `Delete` | Löschen-Dialog (nur bei Berechtigung) |
| `D` | Download (nur bei Berechtigung) |
| `Esc` | Dropdown schliessen / Fokus aus Liste |
| `Tab` | Standardreihenfolge: Tabs → Suchfeld → Filter → View-Toggle → Liste |
| `1` / `2` / `3` | Direkt zu Tab Bilder / Pläne / Videos |
| `G` / `L` | Wechsel Grid/Listen-Ansicht |

### 6.3 Touch / Mobile

- Touch-Ziel mind. 44 × 44 px (UI-Standards: „ausreichend grosse Touch-Ziele").
- Listenzeilen-Höhe mobil 72 px, Grid-Card-Tap öffnet Preview-Vollbild.
- Swipe-Down auf Preview-Sheet (mobile Bottom-Sheet) schliesst.
- Long-Press auf Liste öffnet Aktionen-Sheet (Download, Teilen, Löschen) — vorbereitet, V1 einfaches Tap-Verhalten.

### 6.4 Performance

- Virtualisierte Liste ab > 200 Einträgen (z. B. `vue-virtual-scroller` / `react-virtuoso`).
- Thumbnails: WebP 200 × 200, vom Backend serviert (siehe §9 API-Hinweise). Im Grid-Modus: 400 × 400.
- Debounce der Suche: 250 ms.
- Filter-State in der URL hält die History sauber; kein doppelter Server-Roundtrip bei Popstate (Back/Forward).

---

## 7. A11y-Spec

Gem. `UI_STANDARDS.md`:

- Kontrast Body-Text ≥ 7:1 (`#F2F4F7` auf `#12181B`: ~15.5:1 — passt, AAA).
- Kontrast Sekundärtext ≥ 4.5:1 (`#A3ACB8` auf `#12181B`: ~7.3:1 — passt, AAA).
- Kontrast Salwei als Text auf BG: `#668048` auf `#12181B` ~5.1:1 — passt für 14 px+, nicht für 12 px Mikrotext. Auf weissem Salbei-Button-Text (`#FFFFFF`) immer ≥ 4.5:1.
- Fokusring IMMER sichtbar, 2 px `--accent` + 2 px Offset, nicht entfernen.
- Status-Kommunikation nie nur über Farbe — immer Icon + Text (Spec 5.3).
- `aria-live="polite"` Region für Upload-Status, Filter-Trefferzahl und Fehler-Banner.
- Listenmodus: `role="listbox"` + jede Zeile `role="option"`, `aria-selected`.
- Grid-Modus: `role="grid"` + Zellen `role="gridcell"`, `aria-selected`.
- Tabs: `role="tablist"` mit `aria-orientation="horizontal"`, `aria-selected`, Pfeiltasten-Nav.
- Suchfeld: `<label class="sr-only">Suche</label>` + `aria-describedby` für Treffer-Counter.
- Reduzierte Bewegung: alle Transitions über `@media (prefers-reduced-motion)` deaktivieren (200 ms → 0).
- Vollständige Tastatur-Bedienung, keine Maus-only-Funktionen.

---

## 8. Formatregeln (gem. UI_STANDARDS.md)

- Datum: `tt.mm.yyyy`, z. B. `14.05.2026`
- Zeit: `14:32`
- Dateigröße: binär (KiB/MiB/GiB) lokalisiert, z. B. `1.4 MB`, `348 KB`
- Währung: nicht relevant für Galerie
- Tabular Nums für Zahlen

---

## 9. API-Hinweise (Backend-Vertrag)

Folgende Endpunkte werden vom Frontend erwartet (zur Abstimmung mit Backend Agent):

| Methode | Pfad | Zweck |
|---|---|---|
| `GET` | `/api/projects/{id}/media?type=image|plan|video&cursor=…&q=…&sort=…&filter=…` | Paginierte Liste, Cursor-basiert |
| `GET` | `/api/media/{id}` | Metadaten + Berechtigungsstatus |
| `GET` | `/api/media/{id}/thumbnail?w=200` | Thumbnail (signierte, kurzlebige URL) |
| `GET` | `/api/media/{id}/preview?w=1600` | Hero-Preview |
| `GET` | `/api/media/{id}/download` | Signierte Download-URL (Audit!) |
| `DELETE` | `/api/media/{id}` | Löschen (Audit, weicher Delete im MVP) |
| `GET` | `/api/media/{id}/versions` | Planversionen (nur Pläne) |
| `GET` | `/api/media/{id}/comments` | Kommentare |

**Wichtig (Sicherheit/Privacy, `SECURITY_PRIVACY.md`):** Alle Datei-URLs sind kurzlebige signierte URLs, niemals öffentlich. Berechtigung wird serverseitig pro Request geprüft, nicht im Frontend. Audit-Eintrag bei Download, Ansicht, Löschung (gem. Leistungskatalog Abschnitt „Audit und Benachrichtigung").

---

## 10. Test- & Akzeptanzkriterien

Aus `LEISTUNGSKATALOG.md` (Galerie, Filter, Kommentare) abgeleitet:

1. **Zeitraumfilter** setzt + kombiniert, Liste reduziert sich korrekt.
2. **Ortsfilter** (aus Projektstruktur) wirkt, leere Treffer zeigen Empty-State 5.6.
3. **Gewerkfilter** funktioniert mit Multi-Select.
4. **Berechtigungstrennung**: Nutzer mit Rolle „Betrachter" sieht Download-Button NICHT, kann nicht löschen, sieht nur ihm zugeordnete Medien.
5. **Leere Zustände** für: keine Medien, Filter ohne Treffer, Vorschau-Fehler.
6. **Tastatur-Bedienung** 100 % möglich (6.2).
7. **A11y-Audit** ohne Findings (Kontraste, ARIA, Fokus).
8. **Responsive** auf 360 / 768 / 1024 / 1440 px getestet, kein horizontaler Scroll.
9. **Performance**: 1000-Medien-Liste bleibt scroll-flüssig (60 fps Drossel 4x CPU).
10. **Reduzierte Bewegung** respektiert.
11. **URL-Persistenz**: Filter + Selektion überleben Reload, Back/Forward funktioniert.
12. **Audit**: Download, Ansicht, Löschung erzeugen serverseitig Einträge.

---

## 11. Edge-Cases

- **Sehr lange Dateinamen** → truncate mit Tooltip + Volltext im Preview-Header.
- **Viele Tags / Gewerke** → max. 3 sichtbar + `+N mehr`-Link im Preview.
- **EXIF fehlt** → Feld wird im Detail-Tab mit `—` angezeigt, nicht ausgeblendet (sonst wirkt es wie ein Fehler).
- **Plan-Versionierung**: Anzeige der aktuellen Version in Liste, ältere Versionen über Versions-Tab im Preview.
- **Duplikaterkennung** (Vorbereitung): gleicher Hash → im Detail-Tab Hinweis „Mögliches Duplikat: <Link>", V1 read-only.
- **Offline-Verhalten**: Out of Scope (gehört zur PWA-Phase).

---

## 12. Was bewusst NICHT in V1 ist

- Drag-and-Drop-Sortierung
- Mehrfachauswahl mit Bulk-Aktionen
- Inline-Rename in der Liste
- Plan-Marker-Editor (eigenes Modul)
- KI-Tagging
- Offline-Cache
- Foto-Aufnahme (eigenes Modul)
- Echtzeit-Kollaboration (WebSocket)

---

## 13. Übergabe

- **Frontend/UI Agent:** setzt Komponenten um, nutzt dieses Dokument + `UI_STANDARDS.md` als verbindliche Quelle.
- **Backend Agent:** bestätigt API-Vertrag (Abschnitt 9), liefert signierte URLs.
- **Security Agent:** prüft, dass keine Datei-URL direkt im Frontend hartkodiert wird, Audit-Events für Download/Ansicht/Löschung.
- **Datenschutz-Agent:** prüft, dass EXIF-GPS standardmäßig serverseitig gestrippt wird (ausser Nutzer entscheidet bewusst zum Teilen).
- **Testing Agent:** Akzeptanzkriterien §10 als Test-Suite (Unit + E2E).
- **Documentation Agent:** ergänzt `docs/ux/user-flows.md` um den Galerie-Flow mit Verweis auf dieses Konzept.

## 14. Design-Referenz aus Stitch

Massgeschneiderte Prompts für Google Stitch (`stitch.withgoogle.com`) liegen unter `stitch-prompts.md` im selben Ordner. Sie liefern 5 Design-Screens als Vorlage für die Implementierung: Hero (Pläne aktiv), Bilder-Tab-Variante, Filter-Dropdown offen, Grid-Modus + Empty-State, Mobile (Bottom-Sheet). Jeder Prompt referenziert denselben Design-Token-Block, damit das Set visuell konsistent rendert.

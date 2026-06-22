# Komponenten-Manifest

> Welche UI-Elemente gibt es in den VisiDoc-Prototypen, welchen Status
> haben sie, und wer darf sie ändern? Verbindlich, wird bei jeder
> Komponenten-Änderung aktualisiert.

## Status-Legende

- 🔵 **LIVE** — aktiv in `index.html` oder `components/` eingebunden,
  wird weiterentwickelt
- 🟡 **EXPERIMENT** — in `experiments/`, kurzlebig, nicht für User
- 🟠 **READ-ONLY** — fertig, dokumentiert, **nicht mehr anfassen**
- 🔴 **FROZEN** — in `archive/vN/`, **niemals** ändern

---

## App-Shell (immer in `index.html`)

| Komponente         | Status | Datei / Ort | Notizen |
|--------------------|--------|-------------|---------|
| App-Shell Layout (`.vd-app`) | 🔵 LIVE | `index.html` Zeile ~2118 | Sidebar + Topbar + View-Slot |
| Sidebar            | 🔵 LIVE | `index.html` Zeile ~2122 | Logo, Navigation, User-Karte, Org-Switcher, Collapse-Toggle |
| Topbar             | 🔵 LIVE | `index.html` Zeile ~2207 | Titel, Suche, Primary-CTA, Notifications, Theme-Toggle |
| Theme-Toggle       | 🔵 LIVE | `index.html` Zeile ~2228 | Migration zu `components/vd-theme-toggle.js` geplant (siehe POC) |
| Screen-Routing     | 🔵 LIVE | `index.html` `<script>` | `body[data-active-screen="..."]` Switch, Navigation via Hash |

## Screens (in `index.html`, ein `<section class="vd-screen">` pro Screen)

| Screen            | Status | Notizen |
|-------------------|--------|---------|
| Dashboard         | 🔵 LIVE | Hero, KPI-Grid, 3-Spalten-Row (Aktivität / Projekte / Tipps) |
| Projekte          | 🔵 LIVE | Toolbar mit Status-Segmenten + Projekt-Karten-Grid |
| Projekt-Detail    | 🔵 LIVE | Sub-Topbar, Tabs-Bar, Filter-Sidebar, Workspace |
| Galerie           | 🔵 LIVE | Filter-Card (Pills) + Galerie-Zeilen mit Timeline-Streifen |
| Archiv            | 🔵 LIVE | Hero + KPI-Bar (4 Stats) + Toolbar (Suche + Jahr-Segmente + Sort) + Jahr-gruppierte Projekt-Tabelle (8 Mockups) mit Retention-Bar + Audit-Log-Sektion (5 Einträge) + DSG-Callout-Grid (Aufbewahrung / Audit-Log / Export) |
| Einstellung/Profil| 🔵 LIVE | 9 Sektionen, sticky Sub-Nav |

## Modals (in `index.html`, `data-bind="..."`-getriggert)

| Modal                  | data-bind                | Status | Notizen |
|------------------------|--------------------------|--------|---------|
| Medien-Detail          | `media-modal`            | 🔵 LIVE | Lightbox mit Prev/Next, Picker-Streifen, Side-Panel |
| Upload-Wizard          | `wizard-modal`           | 🔵 LIVE | 3-Step: Datei → Metadaten → Bestätigen (Foto/Plan/Datei-Variante) |
| Projekt-Wizard (Neu)   | `project-wizard-modal`   | 🔵 LIVE | 3-Step: Eckdaten → Planung → Bestätigen (CSS-Scope `.vd-pw-*`, max-width 720) |
| Export-Wizard          | `export-modal`           | 🔵 LIVE | 2-Step: Quelle+Format → Zeitraum+Optionen (CSS-Scope `.vd-ex-*`, max-width 720) |

## Übersichtsseiten (eigenständige HTML-Dateien, `file://`-kompatibel)

| Datei          | Status | Zweck |
|----------------|--------|-------|
| `modals.html`  | 🔵 LIVE | Modals-Übersicht: Trigger-Liste links, Detail rechts mit Step-Indikator, Screenshots aus `qa-shots/`, Ablauf-Schritte, State-Tabelle (idle/loading/success/error), Accessibility-Hinweise, Vergleichsmatrix aller 4 Modals.

## UI-Bausteine (Kandidaten für `components/`)

| Baustein          | Aktueller Ort | Künftiger Ort | Priorität |
|-------------------|---------------|---------------|-----------|
| Theme-Toggle (Sun/Moon Pill) | `index.html` Inline | `components/vd-theme-toggle.js` | 🟢 P0 (POC geplant) |
| Filter-Pill (`.vd-proj-pill`) | `index.html` Inline | `components/vd-filter-pill.js` | 🟡 P1 |
| Galerie-Zeile mit Timeline-Streifen | `index.html` Inline (JS) | `components/vd-timeline-row.js` | 🟡 P1 |
| Projekt-Karte (`.vd-project-card`) | `index.html` Inline + JS-Template | `components/vd-project-card.js` | 🟡 P2 |
| KPI-Kachel (`.vd-kpi`) | `index.html` Inline | `components/vd-kpi-tile.js` | 🟢 P3 |
| Stat-Tile (`.vd-stat-tile`) | bereits in `app-shell.css` als Utility | bleibt dort | — |
| Tab-Bar (`.vd-tabs-bar`) | `index.html` Inline | `components/vd-tabs-bar.js` | 🟡 P2 |
| Filter-Sidebar (`.vd-filter-sidebar`) | `index.html` Inline | `components/vd-filter-sidebar.js` | 🟡 P2 |

## Standalone-Sandboxes (nicht in `index.html` referenziert)

Diese Dateien sind eigenständige HTML-Showcases mit eigenem App-Chrome
oder eigenem Datenpool. Sie sind **🟠 READ-ONLY** und werden nicht
von der Live-App instanziiert.

| Datei | Status | Zweck | Datenquelle |
|---|---|---|---|
| `galerie-v2.html` | 🟠 READ-ONLY | Serpentine-Galerie-Layout, Layout-Sandboxing für alternative Visualisierungsidee. Eigener `MEDIA`-Pool (32 Bilder aus `assets/generated/`), **NICHT** `window.VISIDOC_DEMO`. Datei trägt `<!-- LAYOUT-SANDBOX -->` Header-Kommentar. | Eigener statischer Pool |
| `modals-showcase.html` | 🟠 READ-ONLY | Interaktive Demo aller 4 Modals (Wizard, Foto-Upload, Video-Upload, Export) mit echten Vollbild-Overlays, Live-Validierung, Submit-Mocks. | Übernimmt `window.VISIDOC_DEMO` |
| `modals.html` | 🟠 READ-ONLY | Modals-Übersicht mit Step-Vorschau, State-Tabelle, Vergleichsmatrix. Stub-Buttons verlinken auf `index.html`. | Übernimmt `window.VISIDOC_DEMO` |
| `preview-card-spec.css` | 🟠 READ-ONLY | Locked CSS-Custom-Properties-Modul: **einzige Quelle der Wahrheit** für die Preview-Card-Geometrie (Stempel + Trendlinie + Dot). Konsumiert von `index.html` und `design-explorations/timeline-filmstrip.html`. Datei trägt `LOCKED SPEC — DO NOT EDIT`-Header und ist via `attrib +R` OS-seitig schreibgeschützt. | — |
| `verify-preview-card-spec.py` | 🔵 LIVE | Python-Skript: prüft die Geometrie-Invariante (`20 + 49 + 2.5 = 71.5 px`) und Symmetrie (`14 px = 14 px`). Laufen lassen nach jeder Spec-Änderung, vor PR. | — |

**Regel.** Sandboxes sind READ-ONLY. Änderungsvorschläge werden in
`index.html` umgesetzt, nicht in der Sandbox. Wenn die Sandbox-Idee
obsolet ist, kommt sie in `archive/vN/` (zusammen mit `.frozen`-
Marker), wird aber **nicht** gelöscht — die Sandbox-Historie ist
wertvoll für die Design-Diskussion.

**Wichtig — Datenquellen nicht mischen.** `galerie-v2.html` nutzt
**bewusst** einen eigenen statischen `MEDIA`-Pool statt
`window.VISIDOC_DEMO`. Das ist kein Bug: das Serpentine-Layout ist
ein Visualisierungs-Sandboxing mit deterministischen Demo-Bildern,
nicht an die App-Daten gekoppelt. Wer App-Daten erwartet, ist auf
`index.html` falsch.

## Utilities (in `app-shell.css`, kein JS nötig)

| Utility-Klasse       | Verwendung |
|----------------------|-------------|
| `.vd-card--warm`     | Salwei-Gradient-Karte (Hero, Highlight) |
| `.vd-card--glow`     | Karte mit Salwei-Innenschein |
| `.vd-card-header--accent` | Header mit 36px Salwei-Linie darunter |
| `.vd-stat-tile` (+ Varianten) | Kompakte Stat-Kachel mit Icon |
| `.vd-chip` (+ Varianten) | Tag-Chip mit Icon und Farb-Variante |
| `.vd-badge` | Inline-Badge |
| `.vd-inline-tag` | Salwei-Punkt + Text |
| `.vd-live-dot` | Pulsierender Punkt für „Neu" |
| `.vd-section-eyebrow` | Sektions-Eyebrow mit Salwei-Linie |
| `.vd-divider-accent` | Salwei-Gradient-Trennlinie |
| `.vd-callout` | Hinweis-Karte |
| `.vd-photo-stub` | Foto-Platzhalter |
| `.vd-empty` | Empty-State |

Utilities sind **READ-ONLY**. Sie sind geteilt und werden von
mehreren Screens verwendet — Änderungen wirken systemweit.

## Daten / Scripts (in `index.html` inline)

| Daten / Script       | Status | Notizen |
|----------------------|--------|---------|
| `window.VISIDOC_DEMO` (Demo-Daten) | 🔵 LIVE | Inline in `<script>`, deterministisch via Seed |
| Galerie-Renderer (Zeilen + Timeline-Streifen) | 🔵 LIVE | Inline in `<script>`, dom-targets `#vd-gal-rows` |
| Projekt-Detail-Logik (Filter, Picker, Tabs) | 🔵 LIVE | Inline in `<script>` |
| Navigation-Logik (Sidebar → Body-Attribut) | 🔵 LIVE | Inline in `<script>` |
| Theme-Persistenz | 🔵 LIVE | `localStorage["visidoc-theme"]`, Mutation auf `<html>` |

---

## Änderungsjournal

| Datum       | Komponente | Änderung | Begründung |
|-------------|------------|----------|------------|
| 2026-06-19  | (alle)     | Snapshot `archive/v1/` | Konsolidierung auf `index.html` als Master; Vorbereitung Komponenten-Extraktion |
| 2026-06-19  | Theme-Toggle | Plan: Extraktion als `vd-theme-toggle.js` Custom Element | Kleinstes sinnvolles POC für Komponenten-Disziplin |
| 2026-06-19  | galerie-v2.html (live) | Status auf 🟠 READ-ONLY gesetzt | Klare Trennung der Sandbox-Datenquelle von `index.html`; Dokumentation der zwei Datenpools |
| 2026-06-19  | modals-showcase.html, modals.html | Status auf 🟠 READ-ONLY gesetzt | Standalone-Modals-Showcase mit eigenem App-Chrome, nicht von `index.html` referenziert |
| 2026-06-19  | galerie-v2.html, modals-showcase.html, modals.html | Neue Sektion „Standalone-Sandboxes" hinzugefügt | Manifest-Eintrag für die Sandboxes, vorher fehlte sie im Register |
| 2026-06-20  | preview-card-spec.css, docs/ux/concepts/preview-card-spec.md | Neu angelegt als 🟠 READ-ONLY Spec-Modul + Spec-Doku | Iterative Geometrie-Findung (Datum|Trendlinie|Zeit + Dot @ Y=71.5px) in formale Spec überführt; zukünftige Bilder greifen automatisch auf identische Geometrie zu |
| 2026-06-21  | Archiv (Screen 5) | Vollständig ersetzt: Hero + 4-Stat-Bar + Toolbar + 2× Projekt-Tabelle (8 Mockups, Jahr-gruppiert) mit Retention-Bar + Audit-Log + 3 DSG-Callouts | Bisherige Sektion war 3-Placeholder-Karten ohne CSS. Jetzt produktives Layout mit Retention-Aufbewahrung (10 J DSG-konform), Audit-Highlight für Wohnsiedlung Horgen (88 % verbraucht) und strukturierten Mockup-Daten |

---

Wenn du eine Komponente **ändern** willst: erst hier prüfen, dann
`ARCHITECTURE.md` § „Workflow bei Änderungen" folgen.

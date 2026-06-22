# Frontend-Prototypen

Statische UI-Prototypen für BauDoc. Dependency-frei, jede HTML-Datei kann direkt
im Browser geöffnet werden. Geteilte Stile (Tokens, Sidebar, Topbar, Buttons)
liegen in `app-shell.css`, jede Seite hat nur ihre eigenen Komponenten-Stile
inline.

> **Pflicht-Doku für diesen Ordner:**
> - **`ARCHITECTURE.md`** — Folder-Aufbau, Lock-Disziplin, Workflow.
>   Lies das ZUERST, bevor du etwas anfasst.
> - **`COMPONENTS.md`** — Komponenten-Manifest mit Status (LIVE /
>   EXPERIMENT / READ-ONLY / FROZEN). Vor jeder Änderung prüfen.
> - **`PROTOTYP.md`** (Projekt-Root) — Verbindliche Beschreibung aller
>   Screens, Komponenten und des Designs.

## Marken- und Designbasis

- `DESIGN.md` in diesem Ordner — operative Single Source of Truth für die
  Prototypen. Salwei `#668048` + Anthrazit `#1F2429`, Schweizer Hochdeutsch,
  Token-System, Komponenten-Konventionen.
- `VisiDoc Logo.png` — freigegebene Wort-Bildmarke.

## Wo finde ich was?

| Ich will … | Datei |
|---|---|
| **Die Live-App mit allen 6 Screens sehen** | **`index.html`** (Dashboard, Projekte, Projekt-Detail, Galerie, Archiv, Einstellung/Profil) |
| **Eine alternative Galerie-Visualisierung (Serpentine-Layout) testen** | **`galerie-v2.html`** (Standalone-Sandbox, eigener Datenpool) |
| **Modals klickbar testen** | **`modals-showcase.html`** |
| **Modals-Übersicht mit Doku-Layout** | **`modals.html`** (verlinkt Stub-Buttons auf `index.html`) |
| **Wissen, wie die Modals aufgebaut sind / Specs** | **`MODALS.md`** |
| Verstehen, welche Komponenten es gibt und welchen Status sie haben | `COMPONENTS.md` |
| Verstehen, welche Folder-Disziplin und Lock-Regeln gelten | `ARCHITECTURE.md` |
| Design-Tokens und Layout-Konventionen nachschlagen | `DESIGN.md` |
| Den Versions-Verlauf eines Screens nachverfolgen | `PROTOTYP.md` (im Projekt-Root) |

## Dateien

- `index.html` — **Haupt-Prototyp (App-Shell + alle 6 Screens monolithisch)**.
  Dashboard, Projekte, Projekt-Detail, Galerie, Archiv, Einstellung/Profil
  inkl. App-Shell (Sidebar, Topbar, Theme-Toggle) und alle Modals.
  Konsumiert `window.VISIDOC_DEMO` (deterministische Demo-Daten,
  Mulberry32-PRNG pro Projekt-Seed). Datei kann direkt im Browser
  geöffnet werden (`file://`-kompatibel). Spec: `PROTOTYP.md` (Root) §3.
- `galerie-v2.html` — **Standalone-Sandbox: Serpentine-Galerie-Layout**.
  Layout-Visualisierung mit eigenem statischen `MEDIA`-Pool (32 Bilder
  aus `assets/generated/`). **Nicht** referenziert von `index.html`,
  nicht Teil der Live-App. Status: 🟠 READ-ONLY (siehe `COMPONENTS.md`).
  Dient nur als Layout-Sandboxing für eine alternative Galerie-Idee.
- `modals-showcase.html` — **Modals-Showcase (interaktiv)**. Eigene Seite mit
  4 Trigger-Buttons ("Neues Projekt hinzufügen", "Neue Bilder laden",
  "Video hinzufügen", "Export") und 4 echten Vollbild-Overlays. Jedes Modal
  hat klickbare Step-Indikatoren, Live-Validierung, Status-Single-Select,
  Tag-Picker mit Enter/Backspace, Cover-Frame-Auswahl (Video),
  Datums-Quick-Pills (Export) und einen Submit-Mock mit Spinner + Auto-Close.
  → **Spec: `MODALS.md`** im gleichen Ordner (Layout, JS-API, States, A11y,
  Datenattribute-Kontrakte, Keyboard, Submit-Mock-Details).
- `modals.html` — **Modals-Übersicht**. Eigene Seite mit Sidebar + Topbar,
  links eine Trigger-Liste (4 Modals), rechts der Detail-Block pro Modal
  mit Step-Indikator, Step-Vorschau-Karten, Screenshot-Reel aus
  `qa-shots/`, nummeriertem Ablauf, State-Tabelle
  (idle / file-selected / loading / submitting / success / error) und
  Accessibility-Hinweisen. Stub-Buttons verlinken auf `index.html`, wo
  die echten Modals leben. Plus Vergleichsmatrix am Seitenende.
- `MODALS.md` — **Specs & Interaktions-Doku für die Modals**.
  Verbindliche Referenz für `modals-showcase.html` und `modals.html`.
  Layout-Diagramm, Modal-für-Modal-Beschreibung aller Felder und
  Validierungen, JS-API (`openModal` / `closeAll` / `goStep`),
  DOM-Datenattribute als Kontrakt, UI-States, Keyboard-Bindings,
  Accessibility-Checkliste, Submit-Mock-Spec.
- `app-shell.css` — geteilte Stile: Design-Tokens, App-Layout, Sidebar, Topbar,
  Schaltflächen, Fokus-Ring, responsive Regeln, **Farb-Akzent-Utilities**
  (Salwei-Tints, Tag-Chips, Stat-Kacheln, Tipp-Karten, Live-Dot,
  Foto-Stub, Empty-State). Wird von jeder HTML-Datei
  per `<link rel="stylesheet">` eingebunden.

## Sidebar-Navigation

Jede Seite hat die gleiche Sidebar mit folgenden Bereichen:

- **Arbeit**: Dashboard, Projekte (12), Galerie (1'284), Archiv
- **Konto**: Einstellung/Profil
- Footer: aktive Benutzerin (Maria Brunner, Bauleiterin)
- Organisationskopf: "Muster Hochbau AG" / `muster-hochbau`

Aktiver Zustand: 2px Salwei-Balken links + Salwei-Soft Hintergrund + Salwei-
Icon. Zähler-Chips rechts (`12`, `1'284`) in JetBrains Mono.

## Theme

- Default: Dark (`data-theme="dark"`).
- Persistenz: `localStorage["visidoc-theme"]`.
- Fallback: `prefers-color-scheme: light`.
- Umschalter: Sun/Moon-Icon in der Topbar.

## Farb-Akzente (App-Shell)

Innerhalb der Markenpalette (Salwei `#668048` + Anthrazit `#1F2429` +
Status-Farben) stehen folgende geteilte Utility-Klassen zur Verfügung:

| Klasse | Verwendung |
|---|---|
| `.vd-card--warm` | Karte mit warmem Salwei-Gradient (Hero, Highlight) |
| `.vd-card--glow` | Karte mit subtilem Salwei-Innenschein + weicher Schatten |
| `.vd-card-header--accent` | Karten-Header mit 36 px Salwei-Akzent-Linie darunter |
| `.vd-stat-tile` / `.vd-stat-tile--{primary,info,warn,error}` | Kompakte Stat-Kachel mit farbiger Icon-Kachel |
| `.vd-chip` / `.vd-chip--{primary,info,warn,error,ink,sm,lg}` | Tag-Chip mit optionalem Icon und Farb-Variante |
| `.vd-badge` / `.vd-badge--{primary,neutral}` | Inline-Badge mit Salwei-Hintergrund |
| `.vd-inline-tag` | Salwei-Punkt + Text (für Metadaten-Reihen) |
| `.vd-live-dot` | Sanft pulsierender Salwei-Punkt (für "Neu"-Indikatoren) |
| `.vd-section-eyebrow` | Sektions-Eyebrow mit Salwei-Linie davor |
| `.vd-divider-accent` | Salwei-Gradient-Trennlinie |
| `.vd-callout` | Hinweis-Karte (neutral, mit Icon-Kachel) |
| `.vd-photo-stub` | Foto-Platzhalter mit Salwei-Gradient |
| `.vd-empty` | Empty-State mit Salwei-Icon-Kachel |

## Beispieldaten

Alle Personennamen, Projekte, Adressen und Zahlen sind **frei erfunden**. Keine
echten Klarnamen, keine Personen des öffentlichen Lebens, keine echten
Baustellenfotos. Adressen in der Schweiz (4-stellige Postleitzahlen),
Währung CHF, Telefon +41 xx xxx xx xx.

## Nutzung

Die HTML-Dateien können direkt im Browser geöffnet werden. Sie benötigen nur
die `app-shell.css` im gleichen Ordner und JavaScript ist eingebettet.

## Lock-Disziplin

> Kurzfassung — ausführlich in `ARCHITECTURE.md`.

- **`archive/vN/`** ist **frozen**. Niemals ändern, auch nicht für
  „kleine Fixes". Vor Architektur-Umstellungen wird hier ein
  Snapshot des aktuellen Live-Stands abgelegt.
- **Fertige UI-Elemente** sind **READ-ONLY**. Wenn du etwas an einem
  fertigen Element ändern willst, baue parallel eine neue Komponente
  in `components/` oder `experiments/`, nicht die alte ändern.
- **`components/`** enthält Vanilla Custom Elements
  (`<vd-theme-toggle>`, `<vd-sidebar>`, …). file://-kompatibel,
  keine ES-Modules.
- **`experiments/`** ist für kurzlebige Tests und Varianten.
  Alles hier ist WIP und darf die Live-Komponenten nicht duplizieren.
- **`COMPONENTS.md`** ist das Register. Bei jeder Änderung wird der
  Status dort mit Datum und Begründung aktualisiert.

## Workflow

1. Du willst etwas ändern? → `COMPONENTS.md` prüfen, welchen Status
   die Komponente hat.
2. READ-ONLY oder FROZEN? → STOP, klären, ggf. neue Komponente bauen.
3. LIVE? → Änderung machen, danach Status in `COMPONENTS.md` updaten.
4. Architektur-Umstellung? → Erst Snapshot in `archive/v(N+1)/`.

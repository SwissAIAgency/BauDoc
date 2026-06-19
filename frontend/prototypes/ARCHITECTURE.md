# Frontend-Prototypen – Architektur

> Verbindlich für alle AI-Sessions, Entwickler und Stakeholder, die an
> `frontend/prototypes/` arbeiten. Single Source of Truth für **Aufbau**,
> **Lock-Disziplin** und **Workflow** im Prototype-Folder.

Inhaltlich (Was ist was, Welcher Screen hat welche Sections, Welche
Komponenten gibt es): **`PROTOTYP.md` im Projekt-Root.**
Datei-Aufbau und Prozess: dieses Dokument.

## TL;DR

- `index.html` ist die **lebende** App-Shell + alle Screens.
- `components/` enthält **einzelne UI-Elemente** (Timeline, Filter-Bar,
  Theme-Toggle, …) als Vanilla Custom Elements, file://-tauglich.
- `experiments/` enthält **kurzlebige** Tests und Varianten — dürfen die
  Live-Komponenten **nicht** duplizieren.
- `archive/vN/` enthält **read-only Snapshots** alter Stände. Werden
  nie mehr angefasst.
- `app-shell.css` und `assets/` sind **geteilt** und dürfen nicht
  stillschweigend gebrochen werden.

## Folder-Aufbau

```
frontend/prototypes/
├── index.html              ← LIVE: App-Shell + alle Screens (Monolith, wird schrittweise ausgedünnt)
├── galerie-v2.html         ← 🟠 READ-ONLY: Standalone-Sandbox, Serpentine-Layout, eigener Datenpool
├── app-shell.css           ← LIVE: Tokens, Layout, Komponenten-Utilities (geteilt)
├── README.md               ← Kurzanleitung für Nutzer
├── ARCHITECTURE.md         ← dieses Dokument
├── COMPONENTS.md           ← Komponenten-Manifest (Status, Pflichten)
├── DESIGN.md               ← Design-System, Salwei-Tokens, Konventionen
├── MODALS.md               ← Specs für die 4 Modals (Wizard, Foto, Video, Export)
├── PROTOTYP.md             ← Komplette Screen- und Komponenten-Beschreibung (im Projekt-Root)
│
├── modals-showcase.html    ← 🟠 READ-ONLY: Interaktive Modals-Demo
├── modals.html             ← 🟠 READ-ONLY: Modals-Übersicht mit Step-Vorschau
│
├── components/             ← LIVE: Vanilla Custom Elements, file://-kompatibel
│   ├── README.md
│   ├── vd-theme-toggle.js
│   ├── vd-sidebar.js
│   ├── vd-topbar.js
│   └── vd-timeline-row.js
│
├── experiments/            ← LIVE: Kurzlebige Tests, WIP, Varianten
│   └── (noch leer)
│
├── assets/                 ← LIVE: Bilder, Icons, generierte Medien
│   └── generated/
│
├── qa-shots/               ← READ-ONLY: QA-Screenshots aus alten Iterationen
├── screenshots/            ← READ-ONLY: Live-Workflow-Screenshots
│
├── archive/                ← 🔒 FROZEN: Niemals ändern
│   ├── v1/                 ← Snapshot 2026-06-19 vor Komponenten-Extraktion
│   │   ├── .frozen         ← maschinenlesbarer Marker
│   │   ├── LOCK.md         ← Begründung, Regel, Workflow
│   │   ├── index-2026-06-19.html
│   │   ├── galerie-v2-2026-06-19.html
│   │   └── app-shell-2026-06-19.css
│   └── (ältere Versionen wenn nötig)
│
└── VisiDoc Logo.png        ← Brand-Material, READ-ONLY
    Dashboard+Einstellung.png
    Timeline+Projektansicht.png
```

## Status-Schema

Jede Datei im Prototype-Folder hat einen von vier Status. Der Status
bestimmt, ob die Datei angefasst werden darf.

| Status        | Marker        | Darf angefasst werden? |
|---------------|---------------|------------------------|
| **LIVE**      | (kein Marker) | ✅ Ja, mit Workflow-Regeln |
| **EXPERIMENT**| in `experiments/` | ⚠️ Vorsichtig, kurze Lebensdauer |
| **READ-ONLY** | nicht in `archive/`, aber dokumentiert in `COMPONENTS.md` | ❌ Nein, nur lesen |
| **FROZEN**    | in `archive/vN/` mit `.frozen` | 🚫 Niemals, Snapshot bleibt |

### Standalone-Sandboxes (`🟠 READ-ONLY`)

Diese Dateien leben direkt im Prototype-Folder (nicht in `archive/`
oder `components/`), sind aber bewusst **kein** Teil der Live-App.
Sie existieren als **Layout-Sandboxing** für alternative
Visualisierungen, die im echten App-Flow nicht eingebunden sind.

| Datei | Zweck | Datenquelle | Beziehung zu `index.html` |
|---|---|---|---|
| `galerie-v2.html` | Serpentine-Galerie-Layout (alternative Visualisierungsidee) | Eigener statischer `MEDIA`-Pool (32 Bilder aus `assets/generated/`) | Nicht referenziert, nicht über Sidebar erreichbar, eigener App-Chrome |
| `modals-showcase.html` | Interaktive Demo der 4 Modals (Wizard, Foto, Video, Export) | Übernimmt `window.VISIDOC_DEMO` | Nicht referenziert, dedizierte Testseite |
| `modals.html` | Modals-Übersicht mit Step-Vorschau und State-Tabelle | Übernimmt `window.VISIDOC_DEMO` | Nicht referenziert, Stub-Buttons verlinken auf `index.html` |

**Regel.** Sandboxes sind **READ-ONLY** und werden **nie** von
`index.html` instanziiert oder referenziert. Wenn eine Sandbox-Idee
in die Live-App übernommen werden soll: zuerst Diskussion +
Joshua-Freigabe, dann Implementation in `index.html` (parallel kann
die Sandbox bestehen bleiben, bis `index.html` produktiv ist), dann
Sandbox in `archive/vN/` snapshoten.

**Wichtig — Datenquellen nicht mischen.** `galerie-v2.html` hat
eigene Daten (kein `window.VISIDOC_DEMO`). Das ist **kein Bug**,
sondern Absicht — die Sandbox visualisiert ein Layout-Pattern mit
deterministischen Demo-Bildern, nicht die App-Daten. Wer App-Daten
sehen will, nutzt `index.html`. Wer die Serpentine-Idee isoliert
begutachten will, öffnet `galerie-v2.html`.

## Lock-Disziplin (die wichtigste Regel)

**Sobald ein UI-Element fertig ist und von einer anderen Stelle
referenziert oder vom Benutzer akzeptiert wird, wird es nicht mehr
angefasst.**

Praktisch heisst das:

1. **Fertig = Status ändert sich auf READ-ONLY oder FROZEN.**
   Der Wechsel wird in `COMPONENTS.md` mit Datum und Begründung
   dokumentiert.

2. **Was nie in `index.html` lebt**, wenn es fertig ist:
   - Einzelne UI-Bausteine (Filter-Pills, Timeline-Zeile, Theme-Toggle)
     → Custom-Element in `components/`, `index.html` instanziiert es
   - Token-Konstanten → `app-shell.css` (geteilt)
   - Brand-Assets → `assets/` oder Root

3. **Was in `index.html` leben darf:**
   - Die App-Shell selbst (Sidebar, Topbar, View-Slots)
   - Screen-spezifisches Markup (Dashboard-Hero, Projekt-Listen, …)
   - Screen-Routing-Logik
   - Inline-Daten / Demo-Daten

4. **Was in `experiments/` muss:**
   - Alles, was noch nicht stabil ist
   - Varianten eines UI-Elements zum Vergleich
   - WIP vor Review

5. **Was in `archive/` muss:**
   - Alles, was vorher LIVE war und jetzt durch etwas Besseres
     ersetzt wurde
   - Vor jeder größeren Architektur-Umstellung: Snapshot der
     aktuellen Live-Files

## Workflow bei Änderungen

### „Ich will eine bestehende Komponente ändern"

1. **Lesen**: `COMPONENTS.md` prüfen — ist die Komponente LIVE,
   EXPERIMENT, READ-ONLY oder FROZEN?
2. **Wenn READ-ONLY oder FROZEN**: STOP. Erst klären, ob die Änderung
   wirklich nötig ist. Wenn ja: neue Komponente parallel anlegen,
   nicht die alte ändern.
3. **Wenn LIVE**: Änderung machen, danach Status auf LIVE lassen oder
   auf READ-ONLY setzen (mit Begründung in `COMPONENTS.md`).

### „Ich will eine neue Komponente bauen"

1. **Planen**: Welche Datei, welche Daten, welche Interaktion?
   Spec in `COMPONENTS.md` unter "Geplant" eintragen.
2. **Implementieren**: In `experiments/` oder direkt in
   `components/`, je nach Reifegrad.
3. **Review**: Joshua oder Stakeholder anschauen lassen.
4. **Übernehmen**: Wenn LIVE-fähig, in `index.html` einbinden,
   Snapshot der alten Version in `archive/vN/`.
5. **Dokumentieren**: Status in `COMPONENTS.md` auf LIVE setzen,
   mit Datum.

### „Ich will ein bestehendes Experiment live nehmen"

1. **Snapshot der aktuellen Live-Version** in `archive/v(N+1)/`.
2. **Verschieben** aus `experiments/` nach `components/` oder in
   `index.html` integrieren.
3. **`COMPONENTS.md` updaten** (Status LIVE).
4. **`CHANGELOG.md` im Projekt-Root** ergänzen.

### „Ich will sehen, wie es vorher aussah"

→ `archive/vN/index-YYYY-MM-DD.html` öffnen. Direkt im Browser,
funktioniert ohne Server (file://).

## Technische Constraints

### file://-Kompatibilität

Alle Prototypen müssen ohne lokalen Web-Server funktionieren.
Konsequenzen:

- **Keine ES-Modules** (`<script type="module">` mit Cross-Origin-
  Imports scheitert bei `file://`). Stattdessen klassische
  `<script src="...">`-Tags, die `customElements.define()` direkt
  ausführen.
- **Keine Build-Tools** im MVP. Vanilla JS, Vanilla CSS.
- **Keine externen CDNs** (Tailwind, jQuery, etc.). Alles lokal
  in `assets/` oder als inline-Style.

### Token-System

`app-shell.css` ist die **einzige** Quelle für Design-Tokens
(Farben, Spacing, Radii, Fonts). Komponenten verwenden die CSS-
Variablen (`var(--color-primary)`, `var(--space-3)`, etc.),
nicht eigene Konstanten.

### Theme

Dark/Light wird über `data-theme="dark|light"` auf `<html>`
gesteuert, persistiert via `localStorage["visidoc-theme"]`.
Komponenten reagieren auf dieses Attribut, nicht auf eigene
Theme-Variablen.

### Daten

Demo-Daten sind in `index.html` (oder künftig in einer einzigen
`data/demo-data.js` mit `<script>`-Include). Sie sind
**deterministisch** (PRNG mit Seed) — kein Zufall pro Reload.

## Was diese Architektur NICHT löst

- **Echte Komponentenbibliothek mit Build-Pipeline** (Storybook,
  npm-Publish, etc.) — bleibt ein Backend-Phase-2-Thema.
- **CSS-in-JS oder Scoped Styles** — Vanilla CSS mit Präfixen
  (`.vd-*`) ist hier pragmatischer.
- **Type-Safety** — kommt mit der Backend-Integration.

Diese Architektur ist explizit **Prototype-Layer**, nicht
**Production-Layer**. Sie löst das konkrete Problem, dass
fertige UI-Elemente nicht mehr angefasst werden dürfen, ohne
eine Build-Pipeline oder Framework-Entscheidung vorzuziehen.

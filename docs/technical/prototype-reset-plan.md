# Plan: UI/UX-Reset der Frontend-Prototypen

**Status:** Geplant
**Datum:** 19.06.2026
**Verantwortlich:** Frontend/UI Agent (in Abstimmung mit Documentation Agent)
**Bezug:** AGENTS.md §Repository-Layout und Worktree-Discipline,
`frontend/prototypes/ARCHITECTURE.md`, `frontend/prototypes/COMPONENTS.md`,
`PROTOTYP.md`

---

## 1. Zielzustand (Definition of Done)

Der Reset ist abgeschlossen, wenn **alle** folgenden Aussagen verifiziert
sind:

- [ ] `index.html` ist **eindeutig** der Haupt-Prototyp mit allen
      6 Screens (`dashboard`, `projekte`, `projekt-detail`, `galerie`,
      `archiv`, `einstellung`) und der App-Shell (Sidebar, Topbar,
      Theme-Toggle).
- [ ] `galerie-v2.html` ist explizit als **Layout-Experiment
      Serpentine-Galerie** markiert, hat einen klaren Status in
      `COMPONENTS.md`, und seine **eigene Datenquelle** (32 Bilder
      aus `assets/generated/`) ist von der `index.html`-Datenquelle
      sauber getrennt dokumentiert.
- [ ] `README.md` im Prototype-Folder beschreibt **nur** die
      tatsächlich existierenden Dateien. Keine Referenzen auf
      `dashboard.html` / `projekte.html` / `galerie.html` /
      `archiv.html` / `einstellung-profil.html` mehr (die gibt es
      nicht).
- [ ] `ARCHITECTURE.md`, `COMPONENTS.md`, `PROTOTYP.md`, `README.md`,
      `DESIGN.md` und `CHANGELOG.md` (Root) widersprechen sich nicht
      bezüglich Datei-Existenz, Datenquelle und Lock-Status.
- [ ] Sidebar-Counts in `index.html` (`12` Projekte / `1'284` Medien)
      sind entweder an die echte `window.VISIDOC_DEMO`-Datenmenge
      gekoppelt oder explizit als Demo-Literaturwerte markiert.
- [ ] Keine Datei in `archive/v1/` (FROZEN) wurde angefasst.
- [ ] Keine Datei in `components/` (READ-ONLY) wurde angefasst.
- [ ] Alle UI-Elemente (Dashboard, Projekte, Projekt-Detail,
      Galerie, Archiv, Einstellung/Profil, Sidebar, Topbar) sind
      in `index.html` vorhanden und ohne Datenmischung renderbar.

> **Nicht im Scope.** Echte Backend-Integration, Build-Pipeline,
> Storybook, npm-Publish, ESLint/Prettier-Setup, Konvertierung zu
> Vue 3 + Vite, Refactoring der Custom-Element-Extraktion. Diese
> Themen sind Phase-2-Themen und bleiben unangetastet.

---

## 2. Ist-Zustand und Diagnose

### 2.1 Aktueller Zustand (was tatsächlich existiert)

```
frontend/prototypes/
├── index.html              316 KB / 6'258 Zeilen, alle 6 Screens + App-Shell
├── galerie-v2.html          21 KB /   590 Zeilen, Serpentine-Layout-Experiment
├── app-shell.css            42 KB, geteilte Tokens + Utilities
├── README.md                 8 KB, stale (beschreibt nicht-existente Files)
├── ARCHITECTURE.md           8 KB, korrekt (Monolith + Komponenten-Disziplin)
├── COMPONENTS.md             5 KB, korrekt
├── DESIGN.md                26 KB, korrekt
├── VisiDoc Logo.png         282 KB, READ-ONLY
├── Dashboard+Einstellung.png 396 KB, READ-ONLY
├── Timeline+Projektansicht.png 309 KB, READ-ONLY
├── components/
│   ├── README.md            1.8 KB, korrekt
│   └── vd-theme-toggle.js   4.1 KB, READ-ONLY
├── experiments/             (leer)
├── assets/
│   └── generated/           32 generierte Bilder
├── qa-shots/                READ-ONLY
├── screenshots/             READ-ONLY
└── archive/v1/              FROZEN (LOCK.md, .frozen, 3 Dateien)
    ├── .frozen
    ├── LOCK.md
    ├── index-2026-06-19.html       317 KB
    ├── galerie-v2-2026-06-19.html  21 KB
    └── app-shell-2026-06-19.css    42 KB
```

### 2.2 Datenquellen (zwei konkurrierende Pools)

| Datei | Variable | Inhalt | Quelle |
|---|---|---|---|
| `index.html` | `window.VISIDOC_DEMO` | `{ projekte[3], medien[143], gewerke[10], planpositionen[15], personen[8], status[5], tags[14] }` | Inline, Mulberry32-PRNG, Seed pro Projekt |
| `galerie-v2.html` | `const MEDIA` | `[{ src, ref }, ...]` × 32, alle mit `src: 'assets/generated/...'` | Inline, statisch, Layout-Experiment |

Diese zwei Pools sind **bewusst getrennt** – die Serpentine-Galerie
ist ein Layout-Sandboxing für eine alternative Galerie-Visualisierung
(siehe Kommentar im Quellcode: *"Daten-Anker für die Serpentine-
Pfad-Visualisierung"*) und nicht für den Daten-Output der App
gedacht. Die fehlende Doku sorgt aber dafür, dass jeder Dritter
sie als "kaputten Clone" missversteht.

### 2.3 Symptom-Liste (vom User gemeldet)

| Symptom | Ursache | Schwere |
|---|---|---|
| "Daten werden bei jeder Nutzung durchmischt" | Sidebar zeigt hardcoded `12` / `1'284`, Daten hat 3 / ~143 → sieht aus wie Mismatch | Hoch |
| "Elemente fehlen" | README referenziert 5 nicht-existente HTML-Files → Erwartung kollidiert mit Realität | Hoch |
| "Readme beschreibt den gewünschten Zustand nicht zuverlässig" | README ist pre-Monolith (vor 2026-06-19), nicht aktualisiert worden | Hoch |
| "Hauptteil muss dauerhaft die Index.html als Prototyp verwenden" | IST bereits so in `ARCHITECTURE.md`/`COMPONENTS.md`/`PROTOTYP.md` dokumentiert – aber **README** widerspricht | Mittel (Doku-Drift) |
| "False-Mischungen" | `galerie-v2.html` hat eigene Daten, keine Doku dazu → wirkt wie "Daten-Leak" | Mittel |

### 2.4 Hypothesen (Diagnose-Phase 3, gerankt)

> Format: "Wenn H, dann Erwartung E. Falsifikation: passiert E nicht,
> ist H verworfen."

**H1 (sehr wahrscheinlich) – README ist stale.**
*Wenn* die README noch den pre-2026-06-19-Zustand mit
Per-Screen-HTML-Files beschreibt, *dann* wird jeder Leser
fälschlich annehmen, dass die genannten Files existieren sollten,
und die Konsolidierung als "Regression" missverstehen.
*Falsifikation:* Wenn die README korrekt ist, müsste sie heute
nur auf `index.html` verweisen – das tut sie nicht.

**H2 (wahrscheinlich) – Sidebar-Counts sind Demo-Literatur.**
*Wenn* die Sidebar-Werte `12` und `1'284` als Marketing-/Demo-
Sollwerte gedacht sind, *dann* müssen sie als solche markiert
werden (z. B. `data-demo-counts` Attribut oder Kommentar), damit
niemand sie mit der echten Datenmenge verwechselt.
*Falsifikation:* Wenn die Werte an die echte Datenmenge gekoppelt
werden sollen, müssen sie aus `VISIDOC_DEMO.projekte.length` und
`VISIDOC_DEMO.medien.length` berechnet werden.

**H3 (wahrscheinlich) – `galerie-v2.html` ist absichtlich getrennt.**
*Wenn* das Serpentine-Layout ein Sandbox-Standalone ist, *dann*
muss es in `COMPONENTS.md` einen Status haben (🟠 READ-ONLY oder
🟡 EXPERIMENT) und in `ARCHITECTURE.md` explizit erwähnt sein.
*Falsifikation:* Wenn es keinen Sinn ergibt, das File zu behalten
(es ist nicht referenziert von `index.html` und nicht in der
Komponenten-Disziplin), wäre ein Snapshot in `archive/v2/` oder
eine klare Markierung als Sandbox angebracht.

**H4 (möglich) – `CHANGELOG.md` fehlt der Konsolidierungs-Eintrag.**
*Wenn* die Konsolidierung am 2026-06-19 (Per-Screen-Files →
Monolith + Components-Extraktion) ein bedeutendes Architektur-
Event war, *dann* gehört ein Eintrag in den Root-`CHANGELOG.md`.
*Falsifikation:* Der Eintrag existiert bereits (nicht der Fall –
geprüft, kein Eintrag vor 0.2.0).

**H5 (unwahrscheinlich, geprüft) – `index.html` zieht Daten aus
falscher Quelle.** Alle Treffer referenzieren `global.VISIDOC_DEMO`
oder `window.VISIDOC_DEMO` – das ist dasselbe im Browser-Kontext.
Kein Mixing im Code-Pfad. **Verworfen.**

---

## 3. Abgleichliste (Soll vs. Ist)

| Datei | Soll-Zustand | Ist-Zustand | Differenz |
|---|---|---|---|
| `index.html` | Haupt-Prototyp, 6 Screens, App-Shell, `window.VISIDOC_DEMO` | Vorhanden, korrekt | OK |
| `galerie-v2.html` | Standalone-Sandbox, eigener Datenpool, klar markiert | Vorhanden, aber nirgends als Sandbox markiert | Status fehlt |
| `app-shell.css` | Geteilte Tokens, Komponenten-Utilities | Vorhanden, korrekt | OK |
| `components/vd-theme-toggle.js` | READ-ONLY, Custom Element | Vorhanden, korrekt | OK |
| `archive/v1/*` | FROZEN, niemals anfassen | OK, nicht angefasst | OK |
| `experiments/` | Für kurzlebige Tests | Leer (auch nach 2026-06-19) | Hinweis: warum leer? |
| `frontend/prototypes/README.md` | Aktuelle Datei-Liste, Verweise auf `ARCHITECTURE.md` | Stale, beschreibt 5 nicht-existente Files | **Muss aktualisiert werden** |
| `frontend/prototypes/ARCHITECTURE.md` | Monolith + Komponenten + Lock-Disziplin | Vorhanden, korrekt – aber `galerie-v2.html` (live) fehlt | **Ergänzen** |
| `frontend/prototypes/COMPONENTS.md` | Manifest mit Status pro Komponente | Vorhanden, korrekt – aber `galerie-v2.html` hat keinen Status | **Ergänzen** |
| `PROTOTYP.md` (Root) | Screen-Definition, Single Source of Truth | Vorhanden, korrekt, erwähnt `galerie-v2.html` knapp | OK (Journal-Eintrag ergänzen) |
| `CHANGELOG.md` (Root) | Versions-Historie | Konsolidierungs-Eintrag 2026-06-19 fehlt | **Eintrag ergänzen** |
| Sidebar in `index.html` | Counts konsistent mit Daten | Hardcoded `12` / `1'284` ≠ echte Datenmenge | **Markieren oder koppeln** |

---

## 4. Schritt-für-Schritt-Aktionen

### Phase A – Diagnose & Doku-Sync (Priorität: Hoch, kein Code-Touch)

> **Ziel.** Doku-Konsistenz herstellen, ohne das Verhalten von
> `index.html` zu ändern. Reihenfolge: kleinste Datei zuerst, damit
> jeder Schritt isoliert committet werden kann.

**Schritt A1 – `frontend/prototypes/README.md` neu schreiben**
- Datei: `frontend/prototypes/README.md`
- Aktion: Komplett ersetzen. Neue Struktur:
  1. Was es ist (statische Prototypen, dependency-frei, file://)
  2. **Welche Dateien tatsächlich existieren** (`index.html`,
     `galerie-v2.html`, `app-shell.css`, `components/`,
     `experiments/`, `archive/v1/`)
  3. Pflicht-Doku verlinken: `ARCHITECTURE.md`, `COMPONENTS.md`,
     `DESIGN.md`, `PROTOTYP.md` (Root)
  4. Markenbasis (Salwei, Anthrazit, de-CH) verlinken
  5. Nutzung (HTML direkt im Browser öffnen)
  6. Lock-Disziplin (Verweis auf `ARCHITECTURE.md`)
  7. Workflow (Verweis auf `ARCHITECTURE.md`)
- Dauer: klein (~2 KB reiner Text)
- Risiko: niedrig – nur Doku

**Schritt A2 – `frontend/prototypes/ARCHITECTURE.md` ergänzen**
- Datei: `frontend/prototypes/ARCHITECTURE.md`
- Aktion: Im **Folder-Aufbau**-Diagramm (Z. 25-63) und im
  **Status-Schema** (Z. 65-75) den Eintrag für `galerie-v2.html`
  (live) ergänzen, mit dem Status **🟠 READ-ONLY** (Sandbox,
  Layout-Experiment, nicht für User, eigene Daten).
- Nicht ändern: `archive/v1/`-Beschreibungen, Komponenten-Disziplin.
- Dauer: minimal (3-5 Zeilen)

**Schritt A3 – `frontend/prototypes/COMPONENTS.md` ergänzen**
- Datei: `frontend/prototypes/COMPONENTS.md`
- Aktion: Unter "App-Shell (immer in `index.html`)" oder als neue
  Tabelle "Standalone-Sandboxes (in `frontend/prototypes/`)":
  `galerie-v2.html` mit Status **🟠 READ-ONLY** + Notiz:
  *"Serpentine-Layout-Experiment. Eigener `MEDIA`-Pool (32 Bilder
  aus `assets/generated/`). Nicht referenziert von `index.html`.
  Status-Sandbox – dient nur als Layout-Visualisierung."*
- Im Änderungsjournal (Z. 86-89) neuen Eintrag hinzufügen:
  Datum 19.06.2026, Komponente "galerie-v2.html (live)",
  Aktion "Status auf 🟠 READ-ONLY gesetzt",
  Begründung "Klare Trennung von `index.html`-Datenquelle".
- Dauer: minimal

**Schritt A4 – `CHANGELOG.md` (Root) ergänzen**
- Datei: `CHANGELOG.md` (Root)
- Aktion: Im Abschnitt "Unreleased" am Anfang einen Eintrag
  hinzufügen:
  - **Frontend-Prototyp-Reset 2026-06-19** – Konsolidierung
    der Per-Screen-Prototypen auf `index.html` als Master-App-
    Shell-Showcase (alle 6 Screens inline). Per-Screen-Files
    (`dashboard.html` etc.) entfernt, Snapshot in
    `archive/v1/` (FROZEN). Erste Vanilla-Custom-Element-
    Extraktion: `<vd-theme-toggle>`. Detail siehe
    `frontend/prototypes/ARCHITECTURE.md` und
    `frontend/prototypes/COMPONENTS.md`.
- Dauer: minimal (5-7 Zeilen)

**Schritt A5 – `PROTOTYP.md` (Root) Journal-Eintrag**
- Datei: `PROTOTYP.md` (Root)
- Aktion: Im Abschnitt 10 (Änderungsjournal) ganz oben einen
  neuen Eintrag hinzufügen:
  - Datum 19.06.2026, Version 1.5.0 (Reset-Stand)
  - Betroffen: alle Screens (Konsolidierung), App-Shell
  - Änderung: README neu geschrieben, ARCHITECTURE/COMPONENTS
    um Live-`galerie-v2.html`-Eintrag ergänzt, CHANGELOG-Eintrag.
- Dauer: minimal

**Validierung Phase A:**
- [ ] `git diff` zeigt nur Doku-Files (`.md`).
- [ ] Keine `.html` oder `.css` Änderung.
- [ ] Keine Datei in `archive/v1/`, `components/`, `experiments/`
      angefasst.
- [ ] Alle neu erstellten Texte widersprechen sich nicht
      (gegenseitig verlinkt, gleiche Datei-Namen).
- [ ] `git status --short` zeigt maximal 5 Files.

---

### Phase B – Sidebar-Counts entkoppeln oder markieren (Priorität: Mittel, kleine Code-Änderung)

> **Ziel.** Die in Symptom-Liste genannte "Datenmischung" beheben,
> die durch hardcoded `12` / `1'284` entsteht.

**Schritt B1 – Entscheidung treffen** (offen für User, Default vorschlagen)
- **Option B1a (default):** Sidebar-Counts aus `window.VISIDOC_DEMO`
  berechnen. Script-Block in `index.html` ergänzen, der die
  Sidebar-Counts initial mit `projekte.length` und
  `medien.length` befüllt. Format: Tausender-Apostroph für
  Galerien (`1'284`), plain integer für Projekte (`12`).
  → Vorteil: konsistent, deterministisch, reproduzierbar.
  → Nachteil: Sidebar sieht für Demo "leer" aus (nur 3 / 143).
- **Option B1b:** Counts als Demo-Literatur markieren:
  `data-demo-counts` Attribut an die jeweiligen `<span>`-Elemente,
  Tooltip "Demo-Literaturwert – entspricht nicht der echten
  Datenmenge".
  → Vorteil: Visuelle Sogwirkung im Demo bleibt.
  → Nachteil: Immer noch "fake" wirkend.
- **Option B1c:** Counts in einem neuen `window.VISIDOC_DEMO.counts`
  Objekt pflegen (`{ sidebar: { projekte: 12, medien: 1284 } }`)
  und im Sidebar-Markup referenzieren. Klare Trennung von
  "Demo-Literatur" und "echte Datenmenge".
  → Vorteil: Single Source für Marketing-Werte.
  → Nachteil: zusätzliche Komplexität.

**Schritt B2 – Implementierung der gewählten Option**
- Datei: `frontend/prototypes/index.html` (Sidebar-Markup +
  Script-Block im `<body>`)
- Aktion: je nach B1-Wahl (B1a, B1b oder B1c).
- Risiko: niedrig – nur Sidebar-Tool, kein App-Verhalten.

**Validierung Phase B:**
- [ ] `git diff` zeigt nur `index.html`.
- [ ] Console: 0 Errors, 0 Warnings.
- [ ] Dashboard: Sidebar-Counts sind sichtbar (entweder
      berechnet oder markiert).
- [ ] Reload der Seite: Counts bleiben identisch (Determinismus).

---

### Phase C – Galerie-Daten in `index.html` und `galerie-v2.html` klar trennen (Priorität: Niedrig, Doku)

> **Ziel.** Den Fakt, dass die zwei Dateien **bewusst** zwei
> getrennte Datenquellen haben, in `COMPONENTS.md` und
> ggf. `galerie-v2.html` selbst dokumentieren.

**Schritt C1 – `galerie-v2.html` mit Header-Kommentar**
- Datei: `frontend/prototypes/galerie-v2.html`
- Aktion: Im `<head>` oder am Anfang des `<body>` einen
  sichtbaren Demo-Banner-Kommentar ergänzen:
  *"LAYOUT-SANDBOX – Diese Datei ist NICHT Teil der Live-App.
  Sie zeigt eine alternative Serpentine-Galerie-Visualisierung
  mit eigenem statischen Datenpool. Sie wird nicht von
  `index.html` referenziert und nicht über die Sidebar
  erreicht. Status: 🟠 READ-ONLY (siehe COMPONENTS.md)."*
  Plus `<!-- sandbox-only, do not link from app -->` als
  HTML-Kommentar ganz oben.
- Risiko: keine Verhaltensänderung.
- Dauer: minimal.

**Validierung Phase C:**
- [ ] `galerie-v2.html` öffnet weiterhin im Browser ohne Fehler.
- [ ] Kein `index.html`-Verhalten verändert.
- [ ] Der neue Kommentar steht vor dem ersten `<script>` mit Daten.

---

### Phase D – Verifikation & Smoke-Test (Priorität: Hoch, Pflicht vor Commit)

> **Ziel.** Alle UI-Elemente (Dashboard, Projekte,
> Projekt-Detail, Galerie, Archiv, Einstellung/Profil, Sidebar,
> Topbar) sind in `index.html` vorhanden und ohne
> Datenmischung renderbar.

**Schritt D1 – Manuelle Verifikation via `file://`**
1. `index.html` im Browser öffnen (Chrome/Edge).
2. Console: muss leer sein (0 Errors, 0 Warnings).
3. Sidebar prüfen: alle 5 Hauptpunkte sichtbar
   (Dashboard, Projekte, Galerie, Archiv, Einstellung/Profil).
4. Pro Bildschirm durchklicken:
   - **Dashboard** – Hero, Tipp-Karte, Letzte Projekte,
     Benachrichtigungen, Dateistatistik, Nächste Schritte
     (gemäss `PROTOTYP.md` §3.1).
   - **Projekte** – Filter-Toolbar, Karten-Grid, View-Switcher.
   - **Projekt-Detail** – Sub-Topbar, Tabs, Workspace.
   - **Galerie** – Filter-Card, Medien-Raster, Detail-Panel.
   - **Archiv** – Tab-Selektor, Tabelle.
   - **Einstellung/Profil** – 9 Sektionen, Sticky Sub-Nav.
5. Theme-Toggle (Sun/Moon) in Topbar klicken → Seite
   wechselt Farbschema, `localStorage["visidoc-theme"]` wird
   gesetzt.
6. Reload: Theme-Persistenz funktioniert.
7. Galerie-V2 separat öffnen → rendert Serpentine mit
   `assets/generated/*`-Bildern.

**Schritt D2 – Cross-Check mit `PROTOTYP.md` §3**
- Pro Screen: Pflicht-Element-Liste (Tabellen in §3.1-3.6) gegen
  `index.html`-DOM abgleichen.
- Mindestens stichprobenartig: 3 Elemente pro Screen.

**Schritt D3 – Console-Check auf Datenmischung**
- Im DevTools-Console: `window.VISIDOC_DEMO` ausführen.
- Erwartete Form: `{ projekte: [...3], medien: [...143], ... }`.
- Projekte IDs vergleichen mit Sidebar-Dropdown-Inhalt.
- Falls Counts in Phase B1a gekoppelt: Sidebar zeigt 3/143.

**Schritt D4 – Light-Mode-Smoke-Test**
- Theme auf `data-theme="light"` setzen (Toggle klicken).
- Alle 6 Screens durchklicken – keine abgeschnittenen Elemente,
   keine schwarzen Texte auf dunklem Hintergrund, alle Tokens
   wechseln.

**Validierung Phase D:**
- [ ] Alle 6 Screens rendern ohne Console-Errors.
- [ ] Theme-Persistenz funktioniert.
- [ ] `window.VISIDOC_DEMO` enthält genau 3 Projekte, ~143 Medien.
- [ ] Sidebar-Counts sind konsistent (entweder Datenwert oder
      markiert).
- [ ] `galerie-v2.html` rendert unabhängig.
- [ ] Light + Dark Mode OK.

---

## 5. Rollback-Anleitung

> **Jede Phase ist isoliert rollback-fähig**, weil die
> Änderungen in verschiedene Files gehen.

### Rollback Phase A (Doku-Sync)

```bash
# Welche Files geändert?
git status --short
# Erwartet: README.md, ARCHITECTURE.md, COMPONENTS.md, CHANGELOG.md, PROTOTYP.md

# Komplett zurück:
git checkout -- frontend/prototypes/README.md \
                frontend/prototypes/ARCHITECTURE.md \
                frontend/prototypes/COMPONENTS.md \
                CHANGELOG.md \
                PROTOTYP.md
```

### Rollback Phase B (Sidebar-Counts)

```bash
# Nur index.html-Sidebar-Änderung rückgängig:
git diff frontend/prototypes/index.html
git checkout -- frontend/prototypes/index.html
```

### Rollback Phase C (galerie-v2.html Header-Kommentar)

```bash
# Nur galerie-v2.html-Kommentar entfernen:
git checkout -- frontend/prototypes/galerie-v2.html
```

### Rollback Phase D

Kein Rollback nötig – Phase D verändert nichts.

### Vollständiger Reset auf Snapshot-Stand

```bash
# Zurück auf Stand VOR dem Reset (vor Phase A):
git stash push -m "ui-reset-2026-06-19" -- \
  frontend/prototypes/README.md \
  frontend/prototypes/ARCHITECTURE.md \
  frontend/prototypes/COMPONENTS.md \
  frontend/prototypes/galerie-v2.html \
  CHANGELOG.md \
  PROTOTYP.md \
  frontend/prototypes/index.html
git status --short
# Sollte keine Änderungen mehr anzeigen.
```

### Im Notfall: Snapshot im `archive/v1/` ist Sicherheitsnetz

Der Snapshot `archive/v1/index-2026-06-19.html` (317 KB) ist der
**letzte stabile Stand vor der Konsolidierung** und kann als
1:1-Fallback dienen, falls etwas am Live-`index.html` versehentlich
kaputt geht. Siehe `archive/v1/LOCK.md`.

> **Hinweis.** `archive/v1/` ist FROZEN – die Dateien dort
> werden **nie** zurückgespielt, nur als Referenz benutzt. Im
> Notfall wird der Stand aus `git`-History wiederhergestellt, nicht
> aus `archive/v1/`.

---

## 6. Testkriterien pro Phase

| Phase | Kriterium | Methode | Erwartet |
|---|---|---|---|
| A1 | README hat keine Verweise auf `dashboard.html`, `projekte.html`, `galerie.html`, `archiv.html`, `einstellung-profil.html` | `grep -E "dashboard\.html\|projekte\.html\|galerie\.html\|archiv\.html\|einstellung-profil\.html" frontend/prototypes/README.md` | 0 Treffer |
| A2 | ARCHITECTURE erwähnt `galerie-v2.html` (live, nicht nur archiv) | `grep "galerie-v2.html" frontend/prototypes/ARCHITECTURE.md` | ≥2 Treffer (Diagramm + Status) |
| A3 | COMPONENTS hat Status für `galerie-v2.html` | `grep "galerie-v2" frontend/prototypes/COMPONENTS.md` | ≥1 Treffer |
| A4 | CHANGELOG erwähnt Konsolidierung 2026-06-19 | `grep "2026-06-19" CHANGELOG.md` | ≥1 Treffer (im Unreleased) |
| A5 | PROTOTYP-Journal hat Eintrag für Reset | `grep -A 1 "v1\.5\.0" PROTOTYP.md` | ≥1 Eintrag |
| B | Sidebar-Counts sind konsistent mit Daten ODER markiert | DevTools-Inspektor auf Sidebar-Counter | Counts sichtbar + Kommentar ODER Tooltip |
| C | `galerie-v2.html` hat Sandbox-Banner | `grep "LAYOUT-SANDBOX" frontend/prototypes/galerie-v2.html` | ≥1 Treffer |
| D | `index.html` öffnet, alle 6 Screens rendern, 0 Console-Errors | Browser + DevTools | Saubere Konsole, alle Sektionen sichtbar |
| D | `window.VISIDOC_DEMO` enthält 3 Projekte, 143 Medien | `console.log(VISIDOC_DEMO.projekte.length)` etc. | 3 / 143 |
| D | Theme-Persistenz funktioniert | Toggle → Reload | Theme bleibt |

---

## 7. Verantwortlichkeiten und Reihenfolge

| Phase | Verantwortlich | Geschätzter Aufwand | Commit-Strategie |
|---|---|---|---|
| **A1** README neu | Frontend/UI Agent (Text) | 15 min | 1 Commit |
| **A2** ARCHITECTURE ergänzen | Frontend/UI Agent | 5 min | 1 Commit |
| **A3** COMPONENTS ergänzen | Frontend/UI Agent | 5 min | 1 Commit |
| **A4** CHANGELOG ergänzen | Frontend/UI Agent | 5 min | 1 Commit |
| **A5** PROTOTYP-Journal-Eintrag | Documentation Agent | 5 min | 1 Commit |
| **B** Sidebar-Counts (B1-Entscheidung mit User) | Frontend/UI Agent | 30 min | 1 Commit (nach B1-Entscheidung) |
| **C** galerie-v2.html Header-Kommentar | Frontend/UI Agent | 5 min | 1 Commit |
| **D** Verifikation & Smoke-Test | Frontend/UI Agent + Documentation Agent (Cross-Check) | 30 min | Kein Commit, nur Validierung |

**Reihenfolge der Ausführung:**

```
A1 → A2 → A3 → A4 → A5    (Doku-Sync, sequentiell, kleine Commits)
                              ↓
        B1-Entscheidung mit User klären
                              ↓
        B2 → C → D            (Code + Sandbox-Markierung + Verifikation)
```

Jede Phase kann separat committed und reviewed werden. Bei
User-Freigabe in Phase B1 kann die Reihenfolge B → C → D
auch zusammengefasst werden.

---

## 8. Offene Punkte und Annahmen

### Offene Punkte (User-Entscheidung nötig)

1. **B1 – Sidebar-Counts-Strategie** (Option B1a, B1b oder B1c).
   → Default-Vorschlag: **B1a** (Counts an `VISIDOC_DEMO` koppeln).
   Begründung: ehrlich, deterministisch, kein "fake" im UI.
   User-Widerlegung möglich.

### Annahmen

- Der Snapshot in `archive/v1/` ist vertrauenswürdig (nicht
  angefasst seit 2026-06-19, `.frozen`-Marker vorhanden).
- Die Konsolidierung 2026-06-19 (Per-Screen → Monolith) war
  gewollt und nicht selbst ein Bug (was die Existenz von
  `archive/v1/` und `COMPONENTS.md` Archiv-Eintrag bestätigt).
- `index.html` rendert im aktuellen Browser-Chromium-Engine
  korrekt (sonst wäre Phase D rot).
- `galerie-v2.html` hat einen dokumentierten Zweck
  (Serpentine-Layout-Visualisierung) und soll nicht entfernt
  werden.

### Risiken

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|---|---|---|---|
| README-Rewrite verliert wichtige Konventionen | Niedrig | Mittel | Inhalt von altem README in `ARCHITECTURE.md` schon dokumentiert – nur Duplikation entfernen |
| Sidebar-Counts-Änderung bricht Theme-Verhalten | Sehr niedrig | Niedrig | Sidebar-Counts sind rein visuell, keine Logik |
| galerie-v2.html Sandbox-Banner stört Render | Sehr niedrig | Niedrig | Banner ist HTML-Kommentar, kein DOM-Element |
| User will Phase B anders (z. B. B1b statt B1a) | Mittel | Niedrig | Phase B erst nach B1-Entscheidung starten |
| Snapshot `archive/v1/` korrupt | Sehr niedrig | Hoch | Im Notfall: `git`-History |

---

## 9. Definition of Done (Endgültig)

Der Reset gilt als abgeschlossen, wenn:

1. Alle 8 Einträge in Abschnitt 1 (Zielzustand) abgehakt sind.
2. Alle 11 Testkriterien in Abschnitt 6 erfüllt sind.
3. `git status` sauber ist (keine ungetrackten Edits ausserhalb
   der geplanten Files).
4. `CHANGELOG.md` (Unreleased) und `PROTOTYP.md` (Journal)
   einen Eintrag für den Reset haben.
5. Kein AI-Sessions-Stolperstein mehr: jede neue Session kann
   aus `README.md` + `ARCHITECTURE.md` + `COMPONENTS.md` +
   `PROTOTYP.md` den korrekten Zustand ableiten, ohne im
   Code nachschauen zu müssen.

---

## 10. Anhang: Schnellreferenz – was existiert wirklich

```
LIVE (darf mit Workflow-Regeln angefasst werden):
  index.html              App-Shell + 6 Screens, einziger Live-Prototyp
  galerie-v2.html         Standalone-Sandbox Serpentine-Galerie (eigene Daten)
  app-shell.css           Geteilte Tokens, Komponenten-Utilities
  README.md               [neu zu schreiben]
  ARCHITECTURE.md         [zu ergänzen: galerie-v2.html Status]
  COMPONENTS.md           [zu ergänzen: galerie-v2.html Status]
  DESIGN.md               OK
  assets/                 Generierte Bilder (32)

READ-ONLY (nicht mehr anfassen):
  components/vd-theme-toggle.js
  qa-shots/  screenshots/  PNGs

EXPERIMENT / leer:
  experiments/            (leer, bereit für WIP)

FROZEN (niemals ändern):
  archive/v1/             Pre-Konsolidierungs-Snapshot 2026-06-19
```

---

**Ende des Plans.** Bei Rückfragen: jede Phase ist unabhängig
ausführbar, der Plan kann portioniert abgearbeitet werden.

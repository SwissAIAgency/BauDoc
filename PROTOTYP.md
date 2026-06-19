# Prototyp – Single Source of Truth

> **Zweck.** Diese Datei definiert den statischen Frontend-Prototyp
> in `frontend/prototypes/` **vollständig**. Sie ist die
> **verbindliche Spezifikation** dessen, was die HTML-Datei
> darstellen soll. Die HTML-Datei ist die Implementierung;
> Abweichungen sind hier nachzutragen.
>
> **Geltungsbereich.** Statische HTML-Prototypen in
> `frontend/prototypes/index.html` und `frontend/prototypes/galerie-v2.html`.
>
> **Verbindliche Quellen in Reihenfolge:**
> 1. `docs/ux/concepts/visidoc-DESIGN.md` (Marke, Tonalität, Tokens)
> 2. `frontend/prototypes/DESIGN.md` (operativer Prototyp-Zuschnitt)
> 3. `UI_STANDARDS.md` (übergeordnete UI-Standards)
> 4. Diese Datei (konkrete Screen-Definition, Komponenten, Status)
> 5. `frontend/prototypes/README.md` (Aufbau und Nutzung)
>
> **Workflow bei jeder Änderung am HTML-Prototyp:**
> 1. HTML-Datei ändern.
> 2. Betroffenen Abschnitt in dieser Datei gegenchecken und anpassen.
> 3. Eintrag im Abschnitt **10. Änderungsjournal** mit Datum,
>    kurzer Begründung und betroffenem Screen ergänzen.
> 4. Bei Token-, Farb- oder Schriftsänderungen zusätzlich
>    `frontend/prototypes/DESIGN.md` und `CHANGELOG.md` (Root)
>    synchronisieren.

---

## Inhalt

1. [Übersicht und Stand](#1-übersicht-und-stand)
2. [Datei- und Verzeichnisstruktur](#2-datei--und-verzeichnisstruktur)
3. [Screens](#3-screens)
4. [Globale Elemente (App-Shell)](#4-globale-elemente-app-shell)
5. [Komponenten-Inventar](#5-komponenten-inventar)
6. [Design-Tokens (verbindlich)](#6-design-tokens-verbindlich)
7. [Statusmodell](#7-statusmodell)
8. [Beispieldaten und Sprache](#8-beispieldaten-und-sprache)
9. [Offene Punkte und bekannte Abweichungen](#9-offene-punkte-und-bekannte-abweichungen)
10. [Änderungsjournal](#10-änderungsjournal)

---

## 1. Übersicht und Stand

| Eigenschaft | Wert |
|---|---|
| Produktname (im Prototyp sichtbar) | VisiDoc |
| Sprache | Schweizer Hochdeutsch (de-CH) |
| Theme | Dark (Default), Light (Umschalter in Topbar) |
| Theme-Persistenz | `localStorage["visidoc-theme"]` |
| Markenfarben | Salbei `#668048`, Anthrazit `#1F2429` |
| Schriften | Inter (UI), JetBrains Mono (Daten) |
| Icon-Set | Lucide, Strichstärke 1.75 |
| Aktuelle Prototyp-Version | `1.5.0` |
| Letzte Verifikation HTML ↔ Doku | 2026-06-19 |
| Anzahl Screens | 6 |
| HTML-Datei(en) | `frontend/prototypes/index.html` |
| Geteilte Stile | `frontend/prototypes/app-shell.css` |
| Design-System-Spezifikation | `frontend/prototypes/DESIGN.md` |

> **Verifikationspflicht.** Vor jedem Release eines neuen
> Prototyp-Standes ist die HTML-Datei gegen diese Datei zu
> prüfen. Abweichungen werden in Abschnitt 9 vermerkt und
> im Journal in Abschnitt 10 begründet.

---

## 2. Datei- und Verzeichnisstruktur

```text
frontend/prototypes/
├── index.html                    # Haupt-Prototyp (alle 6 Screens)
├── galerie-v2.html               # Standalone-Galerie (separater Iterations-Stand)
├── app-shell.css                 # Geteilte Stile, Tokens, Sidebar, Topbar
├── DESIGN.md                     # Operative Design-Spezifikation (Single Source of Truth Design)
├── README.md                     # Aufbau und Nutzung
├── VisiDoc Logo.png              # Wort-Bildmarke (freigegeben)
├── Dashboard+Einstellung.png     # Skizze
├── Timeline+Projektansicht.png   # Skizze
├── assets/                       # Bilder, Icons, Schriften
└── qa-shots/                     # QA-Screenshots (geplant)
```

**Regel.** Jede HTML-Datei ist dependency-frei und kann direkt im
Browser geöffnet werden. Externe CDN-Aufrufe sind verboten
(Datenschutz, Offline-Fähigkeit). Tokens und App-Shell leben
ausschliesslich in `app-shell.css`.

---

## 3. Screens

Der Prototyp besteht aus **6 Screens**, die in `index.html` über
das `data-active-screen`-Attribut am `<body>` umgeschaltet werden.
Pro Body-Daten-Attribut ist **exakt ein** `.vd-screen` sichtbar.

| # | Screen-Key | Zweck | Kurzbeschreibung |
|---|---|---|---|
| 1 | `dashboard` | Benutzer-Dashboard | Tagesstart für die aktive Benutzerin. |
| 2 | `projekte` | Projektübersicht | Alle Projekte der Organisation, gefiltert nach Status. |
| 3 | `projekt-detail` | Projekt-Detail | Pläne, Galerie, Tabs und Sub-Topbar für ein einzelnes Projekt. |
| 4 | `galerie` | Mandantenweite Galerie | Alle Medien über alle Projekte der Organisation. |
| 5 | `archiv` | Archiv | Archivierte Projekte, Pläne, Audit-Logs. |
| 6 | `einstellung` | Einstellung/Profil | 9 Sektionen mit Sticky Sub-Nav. |

### 3.1 Screen: `dashboard`

| Element | Pflicht | Status |
|---|---|---|
| Salwei-Gradient Hero mit Eyebrow, Avatar mit Ring, Live-Status | ja | vorhanden |
| "Tipp des Tages"-Karte | ja | vorhanden |
| "Letzte Projekte" (5 Zeilen) | ja | vorhanden |
| "Aktuelle Benachrichtigungen" | ja | vorhanden |
| "Dateistatistik" (Balken) | ja | vorhanden |
| "Nächste Schritte" (Checkliste) | ja | vorhanden |
| Topbar mit Theme-Umschalter | ja | vorhanden |
| Sidebar mit aktiver Markierung "Dashboard" | ja | vorhanden |

### 3.2 Screen: `projekte`

| Element | Pflicht | Status |
|---|---|---|
| Filter-Toolbar mit Status-Segmenten (Alle / In Prüfung / Freigegeben / Archiviert) | ja | vorhanden |
| Sortierung (Zuletzt geändert / Name / Fortschritt / Medien-Count) | ja | vorhanden |
| View-Switcher in der Toolbar (Karten- / Listen-Ansicht) | ja | vorhanden |
| Projekt-Karten-Grid (auto-fill, mind. 300 px) | ja | vorhanden |
| Karten-Status (Salwei-Pillen auf Cover) | ja | vorhanden |
| Letzte-Aktivität-Anzeige pro Karte | ja | vorhanden |
| **Listen-Ansicht (Tabellen-Grid mit Status-Dot, Titel + Adresse, Projekt-ID, Bauleiter, Geändert-Datum, Medien-Count)** | **ja** | **vorhanden** |
| **Jede Zeile der Listenansicht ist ein `<button>` (komplett klickbar)** | **ja** | **vorhanden** |
| **Listenansicht-Spalten "Projekt" und "Geändert" sortierbar (aria-sort)** | **ja** | **vorhanden** |
| **Empty-/Error-Zustand (kein PROJECTS-Array oder Render-Crash)** | **ja** | **vorhanden** |
| **Responsive: <900px Bauleiter/Datum ausgeblendet, <560px ID + Personen-Detail reduziert** | **ja** | **vorhanden** |

> **View-Mode.** Wird am `<section data-screen="projekte">` per
> `data-view-mode="cards" | "list"` umgeschaltet. CSS-Selektoren
> zeigen genau einen der beiden Container (`vd-projects-grid` oder
> `vd-projects-list`). Default ist `cards` (kompatibel zum
> bisherigen Verhalten bei deep-links).

### 3.3 Screen: `projekt-detail`

| Element | Pflicht | Status |
|---|---|---|
| Sub-Topbar mit Projektname, Status, Brotkrumen | ja | vorhanden |
| Tabs-Bar (Pläne / Galerie / Dokumente / Aktivität) | ja | vorhanden |
| Workspace (zwei Spalten: Medien-Grid links, Detail-Panel rechts) | ja | vorhanden |
| Medien-Card-Grid mit Type-Badge und Status-Tag | ja | vorhanden |
| Picker (Fotoauswahl-Werkzeug) als Overlay | ja | vorhanden |
| Re-Open-Pill zum Wiederöffnen des Pickers | ja | vorhanden |
| Topbar wird in diesem Screen **ausgeblendet** | ja | vorhanden |
| Filter-Sidebar wird in diesem Screen **ausgeblendet** | ja | vorhanden |

### 3.4 Screen: `galerie`

| Element | Pflicht | Status |
|---|---|---|
| Page-Header (Titel + Subtitle mit Medien-Count) ausserhalb der Filter-Card | ja | vorhanden |
| Filter-Card im 3-Zeilen-Layout | ja | vorhanden |
| – Zeile 1: Vollbreite-Suchfeld mit Icon | ja | vorhanden |
| – Zeile 2: Salwei-Pill-Segmente (Fotos/Pläne/Videos + Count-Badge) und Pill-Filter-Dropdowns | ja | vorhanden |
| – Zeile 3: "AKTIV"-Label, aktive Filter-Chips mit x-Buttons, "Alle Filter zurücksetzen" | ja | vorhanden |
| Salwei-Tipp-Karte | ja | vorhanden |
| Medien-Raster (Foto, Plan, Video mit Hover-Quick-Actions, Live-Dot, Dauer-Stempel, Projekt-Kontext) | ja | vorhanden |
| Sticky Detail-Panel (Vorschau, Projekt, Tags, EXIF/GPS, Kommentar-Count, Uploader, Aktionen) | ja | vorhanden |
| Responsive: < 900 px Typ-Segmente Umbruch, < 600 px reduziertes Padding | ja | vorhanden |

### 3.5 Screen: `archiv`

| Element | Pflicht | Status |
|---|---|---|
| Tabelle (Spalten: Titel, Projekt-ID, Archiviert-Datum, Grösse, Aktionen) | ja | vorhanden |
| Zeile pro archiviertem Objekt (Projekt / Plan / Audit-Log) | ja | vorhanden |
| Aktionen: Wiederherstellen, Herunterladen | ja | vorhanden |
| Tab-Selektor (Projekte / Pläne / Audit-Logs) | ja | vorhanden |

### 3.6 Screen: `einstellung`

| Element | Pflicht | Status |
|---|---|---|
| Sticky Sub-Nav mit 9 Ankern | ja | vorhanden |
| Sektion 1: Profil (Hero, Avatar, Foto ändern) | ja | vorhanden |
| Sektion 2: Sicherheit (Passwort, 2FA, aktive Sitzungen, API-Tokens) | ja | vorhanden |
| Sektion 3: Benachrichtigungen (Channel-Matrix, Ruhezeiten) | ja | vorhanden |
| Sektion 4: Anzeige & Sprache (Theme, Sprache, Zeitzone, Datumsformat, Schriftdichte) | ja | vorhanden |
| Sektion 5: Aktivität (letzte 5 Aktionen) | ja | vorhanden |
| Sektion 6: Daten & Datenschutz (Export-Karten, Aufbewahrung, Danger Zone) | ja | vorhanden |
| Sektion 7: Organisation & Rolle | ja | vorhanden |
| Sektion 8: Integrationen | ja | vorhanden |
| Sektion 9: Audit-Log (Inhalt wird aus `archiv.html` referenziert) | ja | geplant |
| Globaler Speichern-Button am Formular-Ende | ja | vorhanden |

> **Hinweis.** Sektion 9 ist ein Anker, die eigentlichen
> Audit-Log-Zeilen werden aus dem Archiv-Screen referenziert.
> Sobald das umgesetzt ist, ist der Status auf "vorhanden" zu
> setzen und im Journal zu vermerken.

---

## 4. Globale Elemente (App-Shell)

| Element | Inhalt | Pflicht |
|---|---|---|
| Sidebar (Bereich "Arbeit") | Dashboard, Projekte, Galerie, Archiv | ja |
| Sidebar (Bereich "Konto") | Einstellung/Profil | ja |
| Sidebar-Footer | Aktive Benutzerin (Maria Brunner, Bauleiterin) | ja |
| Sidebar-Organisationskopf | "Muster Hochbau AG" / `muster-hochbau` | ja |
| Sidebar-Zähler-Chips | rechts, JetBrains Mono, z. B. `12`, `1'284` | ja |
| Sidebar-Aktiv-Markierung | 2 px Salwei-Balken links + Salwei-Soft Hintergrund + Salwei-Icon | ja |
| Topbar | Theme-Umschalter, Organisationsname, ggf. globale Suche | ja |
| Topbar (Theme-Umschalter) | Sun (Light) / Moon (Dark), Lucide-Icon | ja |
| Cache-Buster | `Cache-Control: no-cache` Metatags, `?v=N` an `app-shell.css` | ja |

---

## 5. Komponenten-Inventar

| Komponente | Quelle (Token) | Verwendung |
|---|---|---|
| Schaltfläche (Primär) | `.vd-button--primary` | max. 1 pro Ansicht |
| Schaltfläche (Sekundär) | `.vd-button--secondary` | Standard-Aktion |
| Schaltfläche (Geister) | `.vd-button--ghost` | dichte Liste |
| Schaltfläche (Umrandet) | `.vd-button--outlined` | Vorschau-Panel |
| Schaltfläche (Gefahr) | `.vd-button--danger` | nur Löschen, mit Bestätigung |
| Link | `.vd-link` | sekundäre Aktion |
| Status-Pille | `.vd-status-pill` | Icon + Text + Farbe, 22 px hoch |
| Formularfeld | `.vd-field` | Höhe 40 px (Desktop), 44 px (Mobile) |
| Listenzeile | `.vd-list-row` | `<button>` als komplette Zeile, 56 px hoch; Spalten `14px \| 1.6fr \| 110px \| 200px \| 130px \| 100px \| 36px`; Status-Dot + Titel/Sub + Mono-ID + Person + Datum + Count + Chevron; Hover/Focus mit Salbei-Soft |
| Status-Dot (Liste) | `.vd-list-status--{primary, warn, error, info, muted}` | 10 px Punkt + 3 px Status-Soft-Halo; gleiche Farb-Logik wie `.vd-pill--*` |
| Listen-Header | `.vd-list-header` | `role="row"`; Spalten-Beschriftungen; Sortier-Buttons `aria-sort` |
| Listen-Empty | `.vd-list-empty` (`.is-error`) | zentriert, Padding 32 px; Sub-Title + optional Hinweis-Subtitle; rot bei Error |
| View-Switcher | `.vd-view-toggle` | 2-Button-Toggle in der Toolbar; Karten vs. Liste; `aria-pressed` synchron mit `data-view-mode` |
| Medien-Card | `.vd-pd-card` | 4:3 Aspect-Ratio, Hover mit Salwei-Rand |
| Choice-Card | `.vd-choice-card` | grosse Auswahlkachel (Galerie vs. Kamera), Featured-State mit Salwei-Rand, "Empfohlen"-Badge |
| Choice-Preview | `.vd-choice-preview` | ersetzt Choice-Grid nach Datei-Auswahl; Thumbnail + Name + Grösse + Quelle; "Weitere Datei hinzufügen"-Button + Remove-Button |
| Project-Wizard-Field | `.vd-pw-*` | Form-Grid, Field-Input, Status-Pills, Tag-Pills, Range-Slider, Summary-Block. Eigenes CSS-Scope, damit globale Field-Klassen nicht angetastet werden |
| Stat-Kachel | `.vd-stat-tile` | kompakte Kachel mit farbiger Icon-Kachel |
| Tag-Chip | `.vd-chip` | Salwei / Info / Warn / Error / Ink |
| Inline-Badge | `.vd-badge` | Salwei-Hintergrund |
| Inline-Tag | `.vd-inline-tag` | Salwei-Punkt + Text |
| Live-Dot | `.vd-live-dot` | pulsierender Salwei-Punkt |
| Sektions-Eyebrow | `.vd-section-eyebrow` | Salwei-Linie davor |
| Trennlinie (Salwei) | `.vd-divider-accent` | Gradient |
| Hinweis-Karte | `.vd-callout` | neutral, mit Icon-Kachel |
| Foto-Platzhalter | `.vd-photo-stub` | Salwei-Gradient |
| Leerzustand | `.vd-empty` | Salwei-Icon-Kachel |
| Warme Karte (Hero) | `.vd-card--warm` | Salwei-Gradient |
| Glow-Karte | `.vd-card--glow` | subtiler Innenschein |
| Karten-Header mit Akzent | `.vd-card-header--accent` | 36 px Salwei-Linie |

---

## 6. Design-Tokens (verbindlich)

Die Token-Werte stehen vollständig in `frontend/prototypes/DESIGN.md`
Abschnitte 3.1 bis 3.4. Hier nur die Kurzfassung als
Schnellreferenz für die HTML-Datei.

| Token | Wert (Dark) | Wert (Light) |
|---|---|---|
| `--bg-base` | `#14181B` | `#F7F8F5` |
| `--bg-panel` | `#1F2429` | `#FFFFFF` |
| `--bg-raised` | `#2A2F35` | `#EDEFE9` |
| `--border-default` | `#2F353C` | `#D9DCD3` |
| `--border-subtle` | `rgba(255,255,255,0.06)` | `rgba(31,36,41,0.08)` |
| `--text-high` | `#F2F4F7` | `#1F2429` |
| `--text-mid` | `#A3ACB8` | `#5A636C` |
| `--text-low` | `#6B7480` | `#8B929B` |
| `--text-on-primary` | `#FFFFFF` | `#FFFFFF` |
| `--color-primary` | `#668048` | `#668048` |
| `--color-primary-hover` | `#7A9359` | `#7A9359` |
| `--color-primary-press` | `#566B3D` | `#566B3D` |
| `--color-primary-soft` | `rgba(102,128,72,0.14)` | `rgba(102,128,72,0.14)` |
| `--color-ink` | `#1F2429` | `#1F2429` |
| `--status-info` | `#5B8DEF` | `#2C5BB8` |
| `--status-warn` | `#F5C768` | `#8A6618` |
| `--status-error` | `#F26B6B` | `#A83333` |
| `--radius-container` | `10px` | `10px` |
| `--radius-small` | `8px` | `8px` |
| `--radius-preview` | `12px` | `12px` |
| `--radius-pill` | `999px` | `999px` |
| `--space-1` bis `--space-8` | `4 / 8 / 12 / 16 / 20 / 24 / – / 32` px | identisch |

> **Kontrastpflicht.** Salwei-Button hat mit weissem Text
> 4.6 : 1 (WCAG AA interaktiv) in beiden Themes. Body-Text
> erfüllt AAA in beiden Themes. Zahlen in `font-variant-numeric:
> tabular-nums lining-nums`.

---

## 7. Statusmodell

Status-Pillen kombinieren **immer** Icon + Text + Farbe.
Höhe 22 px, Padding 4 / 10 px, Hintergrund Status-Farbe mit
14 % Alpha, Text und Icon volle Status-Farbe, 12 px Inter Medium.

| Status | Wortlaut (de-CH) | Lucide-Icon | Token-Farbe |
|---|---|---|---|
| Freigegeben | "Freigegeben" | `CheckCircle2` | `--color-primary` |
| In Prüfung | "In Prüfung" | `Clock` | `--status-warn` |
| Neu | "Neu" | `Sparkles` | `--status-info` |
| Hinweis | "Hinweis" | `Info` | `--status-info` |
| Fehler | "Fehler" | `AlertCircle` | `--status-error` |
| Abgelehnt | "Abgelehnt" | `XCircle` | `--status-error` |
| Unvollständig | "Unvollständig" | `AlertTriangle` | `--status-warn` |

> **Hinweis.** "Erfolg" wird **nicht** als eigene Farbe
> signalisiert, sondern durch Salwei selbst (grüner Haken,
> freigegebene Pläne).

---

## 8. Beispieldaten und Sprache

| Aspekt | Regel |
|---|---|
| Personen | keine Klarnamen, keine Personen des öffentlichen Lebens |
| Projekte | klingen echt, sind frei erfunden (z. B. "Neubau Bahnhofstrasse 12") |
| Adressen | Schweiz, 4-stellige Postleitzahlen |
| Währung | CHF, Apostroph als Tausendertrennzeichen, `1'230.00` |
| Telefon | international `+41 xx xxx xx xx` |
| Sprache der Oberfläche | Schweizer Hochdeutsch (de-CH), Doppel-S statt ß |
| Englische Strings | nur etablierte Fachbegriffe (PDF, Login, Audit, DSG) |
| Aktive Benutzerin | Maria Brunner, Bauleiterin, Muster Hochbau AG |
| Organisation | "Muster Hochbau AG" / `muster-hochbau` |

---

## 9. Offene Punkte und bekannte Abweichungen

| Datum | Punkt | Status | Owner |
|---|---|---|---|
| – | – | – | – |

> **Format.** Jede Zeile beschreibt eine bekannte Abweichung
> zwischen HTML und Doku, einen offenen Punkt oder eine
> geplante Erweiterung. Bei Abschluss wandert der Punkt in
> das Journal (Abschnitt 10) und wird hier entfernt.

---

## 10. Änderungsjournal

> **Pflichtformat.** Jede Änderung am HTML-Prototyp **oder**
> an dieser Datei wird hier eingetragen. Reihenfolge:
> neueste oben. Pflichtfelder: Datum (tt.mm.jjjj), Version,
> betroffener Screen, Kurzbeschreibung, Begründung.

### Eintrag – 19.06.2026 – v1.5.0 (UI/UX-Reset: Doku-Sync, Sandbox-Klärung, Sidebar-Counts)

- **Datum:** 19.06.2026
- **Version:** 1.5.0
- **Betroffen:** Doku-Layer (README, ARCHITECTURE, COMPONENTS,
  CHANGELOG), `galerie-v2.html` (Sandbox-Markierung), Sidebar
  in `index.html` (Counts)
- **Änderung:** Reset der Frontend-Prototyp-Dokumentation
  nach der Phase-1-Konsolidierung auf `index.html`.
  - **README (`frontend/prototypes/README.md`):** "Wo finde
    ich was?"-Tabelle korrigiert (5 nicht-existente
    Per-Screen-Files raus, dafür `index.html` als Master,
    `galerie-v2.html`/`modals.html`/`modals-showcase.html`
    richtig). "Dateien"-Abschnitt komplett umstrukturiert
    — Beschreibungen der nicht-existenten Files
    (`dashboard.html`, `projekte.html`, `galerie.html`,
    `archiv.html`, `einstellung-profil.html`) entfernt,
    stattdessen `index.html` als Master mit kurzer
    Screen-Aufzählung. `galerie-v2.html` als
    Standalone-Sandbox mit eigenem Datenpool dokumentiert.
    Joshua's Pflicht-Doku-Box, Lock-Disziplin und
    Workflow-Sektionen bleiben unverändert.
  - **ARCHITECTURE.md:** Folder-Aufbau um `galerie-v2.html`,
    `modals-showcase.html`, `modals.html`, `MODALS.md`
    ergänzt (alle 🟠 READ-ONLY). Neue Sektion
    "Standalone-Sandboxes" mit Regelwerk für Sandboxes
    und Klarstellung der zwei Datenpools
    (`galerie-v2.html` eigener Pool, `modals*.html` teilen
    `window.VISIDOC_DEMO`).
  - **COMPONENTS.md:** Neue Sektion "Standalone-Sandboxes"
    mit Einträgen für `galerie-v2.html`,
    `modals-showcase.html`, `modals.html`. Änderungsjournal
    um 3 Einträge (19.06.2026) erweitert.
  - **CHANGELOG.md (Root):** Expliziter Konsolidierungs-
    Eintrag "Frontend-Prototyp-Reset 2026-06-19" ganz oben
    im Unreleased-Block.
  - **`galerie-v2.html`:** Header-Kommentar
    `<!-- LAYOUT-SANDBOX -->` direkt nach `<!DOCTYPE html>`
    ergänzt. `<title>` mit "· LAYOUT-SANDBOX"-Suffix.
  - **Sidebar in `index.html`:** Hardcoded Counts `12`
    (Projekte) und `1'284` (Medien) werden aus
    `window.VISIDOC_DEMO.projekte.length` /
    `medien.length` berechnet (Live-Daten, deterministisch
    via Mulberry32-PRNG). Tausender-Apostroph-Format für
    Medien-Count (`1'284`).
- **Begründung:** Joshua's Phase-1-Konsolidierung (alle
  Per-Screen-Files gelöscht, `index.html` als Master,
  Komponenten-Extraktion gestartet) wurde parallel zu
  diesem Reset ausgeführt. Die README referenzierte noch
  die gelöschten Files in der "Wo finde ich was?"-Tabelle
  und im "Dateien"-Abschnitt — das hat Verwirrung
  gestiftet und war der vom User gemeldete Hauptbug. Die
  `galerie-v2.html` (jetzt live, vorher nur in `archive/v1/`)
  hatte keinen Status-Eintrag in `ARCHITECTURE.md`/
  `COMPONENTS.md`, was wie ein Daten-Leak aussah
  (eigener `MEDIA`-Pool, nicht `window.VISIDOC_DEMO`).
  Die Sidebar-Counts `12`/`1'284` waren hardcoded und
  entsprachen nicht der echten Datenmenge (3/143) — das
  wirkte wie Datenmischung.
- **Verifikation:**
  - `git grep` auf nicht-existente Files
    (`dashboard\.html`, `projekte\.html`, `galerie\.html`,
    `archiv\.html`, `einstellung-profil\.html`,
    `filter-sidebar`, `surface-hierarchie`) in der README
    liefert 0 Treffer.
  - `galerie-v2.html` enthält `LAYOUT-SANDBOX` im
    Header-Kommentar.
  - `ARCHITECTURE.md` und `COMPONENTS.md` enthalten den
    Galerie-Sandbox-Eintrag.
  - `index.html` öffnet, alle 6 Screens rendern ohne
    Console-Errors.
  - Sidebar-Counts sind jetzt `3` (Projekte) und `143`
    (Medien), deterministisch beim Reload.
  - `archive/v1/` nicht angefasst.
  - `components/vd-theme-toggle.js` nicht angefasst.

### Eintrag – 18.06.2026 – v1.4.1 (Export-Wizard in 2 Steps)

- **Datum:** 18.06.2026
- **Version:** 1.4.1
- **Betroffen:** Screen `dashboard` (3.1), Komponenten-Inventar
- **Änderung:** Das Export-Modal wurde von einem
  einspaltigen 4-Sektionen-Modal in einen
  **2-Step-Wizard** umgebaut, damit alle Inhalte in
  einer Ansicht passen und nichts cut-off ist.
  - **HTML:** Modal hat jetzt einen Step-Indikator
    (`data-ex-step` 1/2) und zwei `data-ex-panel`-Divs:
    - **Step 1: "Quelle & Format"** — WAS EXPORTIEREN?
      (4 Pills) + FORMAT (3 Choice-Cards)
    - **Step 2: "Zeitraum & Optionen"** — ZEITRAUM
      (Date-Row + Quick-Range-Pills) + OPTIONEN
      (4 Checkboxen)
  - **Footer:** Statt direktem "Export starten"-Button
    gibt es jetzt "Abbrechen / Zurück / Weiter", wobei
    "Weiter" auf Step 2 zu "Export starten" wird
    (Label + Icon dynamisch).
  - **JS:** `showExStep(n)` mit Step-Indikator-Update,
    Panel-Toggle und dynamischer Next-Button-Inhalt.
    `exStep` State, Click-Handler für `ex-prev` und
    `ex-next`. Submit passiert jetzt auf Step 2 via
    Next-Button.
- **Begründung:** Bei kleineren Viewports wurde der
  untere Bereich des 4-Sektionen-Modals (Footer mit
  "Export starten"-Button) cut-off, ohne dass Scrollen
  möglich war. Mit 2 Steps ist jeder Schritt kompakt
  genug, dass alles in einer Ansicht passt.
- **Verifikation:**
  - Step 1 (Desktop 1440×900): bodyHeight 339 / Scroll 340
    → kein Scroll.
  - Step 2 (Desktop): bodyHeight 425 / Scroll 425
    → kein Scroll.
  - Step 1 (Mobile 390×844): bodyHeight 482 / Scroll 483
    → kein Scroll.
  - Step 2 (Mobile): bodyHeight 453 / Scroll 453
    → kein Scroll.
  - Next-Button: Step 1 zeigt "Weiter", Step 2 zeigt
    "Export starten" (mit Download-Icon).
  - Zurück-Button: nur auf Step 2 sichtbar.
  - Submit auf Step 2 → Console-Log mit komplettem
    JSON (source, format, dateFrom, dateTo, quick,
    options).
  - Console: 0 Errors, 0 Warnings.

### Eintrag – 18.06.2026 – v1.4.0 (Export-Modal)

- **Datum:** 18.06.2026
- **Version:** 1.4.0
- **Betroffen:** Screen `dashboard` (3.1), Komponenten-Inventar
- **Änderung:** Der "Export"-Button im Dashboard-Hero
  ist jetzt verkabelt. Er öffnet ein neues Export-Modal
  (`data-bind="export-modal"`), das den User durch die
  wichtigsten Export-Optionen führt. Kein Step-Wizard —
  ein kompaktes 4-Sektionen-Modal reicht.
  - **HTML:** Modal mit 4 nummerierten Sektionen:
    1. **WAS EXPORTIEREN?** — 4 Status-Pills: Projekte
       (Default), Medien, Audit-Log, Komplett.
    2. **FORMAT** — 3 Choice-Cards: PDF-Report (Default),
       CSV, ZIP. Pressed-State mit Salwei-Rand.
       Description erklärt ZIP-Verhalten.
    3. **ZEITRAUM** — Zwei Date-Inputs (Von / Bis) +
       5 Quick-Range-Pills (7/30/90/365 Tage, Gesamt).
       Bei Quick-Klick werden die Datums-Felder
       automatisch gesetzt; bei manueller Datum-Edit
       wird die Quick-Auswahl deselektiert.
    4. **OPTIONEN** — 4 Checkboxen mit Hint-Text:
       Metadaten (Default aktiv), EXIF/GPS-Daten
       (mit Datenschutz-Hinweis), Kommentare, Original-
       Dateien anhängen (nur bei ZIP sinnvoll).
  - **CSS:** Neuer Scope `vd-ex-*` — Section-Head mit
    nummeriertem Salwei-Soft-Badge, Format-Choice-Cards
    (kompakte Variante des `vd-choice-card`-Patterns),
    Date-Row 2-spaltig, Quick-Range-Pills, Option-Checkbox-
    Liste. Mobile ≤560px stapelt Format-Cards auf 1 Spalte.
  - **JS:** State `exData` mit `{source, format, dateFrom,
    dateTo, quick, options}`. `exReadFields()` und
    `exWriteFields()` für State ↔ DOM. Click-Handler auf
    Pills, Choice-Cards, Quick-Ranges. Change-Handler
    auf Date-Inputs deselektiert Quick. Submit loggt
    komplettes `exData` als formatiertes JSON in Console
    (TODO: API-Call an `/api/exports`). ZIP ohne Originals
    gibt einen freundlichen Console-Hinweis (Manifest-only).
  - **CSS (global):** Bestehende `vd-pw-status-pills` und
    `vd-pw-status-pill-dot` werden für die Source-Pills
    wiederverwendet — Salwei-Dots aus dem Status-Pill-Pattern.
- **Begründung:** Der "Export"-Button im Dashboard war
  nur visuell — kein Handler. Mit diesem Modal ist der
  Use-Case "Daten exportieren" UX-mässig vorbereitet.
  Die konkrete Export-Logik (Backend-Job, Datei-Generierung,
  E-Mail-Versand) wird später ergänzt; das Modal liefert
  bereits alle nötigen Eingaben.
- **Verifikation:**
  - Klick auf "Export"-Button öffnet Modal mit allen
    4 Sektionen sichtbar.
  - Source-Pills: 4 Optionen, Default "Projekte" aktiv.
  - Format-Cards: 3 Optionen als 3-spaltiges Grid
    (Desktop), gestackt (≤560px), Default "PDF" aktiv.
  - Quick-Range "Letzte 30 Tage" ist Default. Datums-
    Inputs werden automatisch befüllt. Manuelle Edit
    deselektiert Quick.
  - Submit: Console-Log zeigt komplettes JSON mit allen
    6 State-Feldern (source, format, dateFrom, dateTo,
    quick, options). Modal schließt.
  - Mobile: Format-Cards stacken, Date-Row stackt,
    Pills umbrechen.
  - Console: 0 Errors, 0 Warnings.

### Eintrag – 18.06.2026 – v1.3.2 (Projekt-Wizard Step 3 kompakt)

- **Datum:** 18.06.2026
- **Version:** 1.3.2
- **Betroffen:** Screen `dashboard` (3.1), Komponenten-Inventar
- **Änderung:** Step 3 "Bestätigen" des Projekt-Wizards
  kompakter gemacht, damit alles in einer Ansicht passt
  (kein Scrollen im Modal mehr nötig).
  - **HTML:** Grosser `<div class="vd-empty">`-Block mit
    übergrossem Icon und zentriertem "Bereit zum Anlegen"-
    Header ersetzt durch kompakten `<div class="vd-pw-ready">`-
    Block (28×28 Salwei-Check-Icon links, Titel + Sub-Text
    in 2 Zeilen rechts, alles in einem Salwei-Soft-Container).
  - **CSS:** `.vd-pw-summary` als 2-Spalten-Grid
    (`grid-template-columns: 1fr 1fr`) — Eckdaten links,
    Planung rechts. Auf ≤720px fällt es auf 1 Spalte
    zurück. Row-Padding von 4px auf 3px, Font-Sizes
    leicht reduziert (12px statt 12.5px), Label-Spalte
    von 110px auf 90px schmaler.
  - **CSS (Modal-Body):** Inline `max-height: 70vh` und
    `overflow-y: auto` aus dem Wizard-Modal-Body entfernt
    — Modal wächst jetzt auf natürliche Höhe. Auf Mobile
    greift weiterhin das globale `.vd-modal { max-height:
    96vh }` als Sicherheits-Stop.
- **Begründung:** Im 70vh-Modus mit grossem Header-Block
  war Step 3 zu gross zum scrollen. Mit kompaktem Header
  und 2-Spalten-Summary passt alles in einer Ansicht auf
  einen 900px-Desktop-Bildschirm und einen 844px-Mobile-
  Bildschirm.
- **Verifikation:**
  - Desktop: Modal-Höhe ≈ 454px, Body 339px / Scroll 340px
    → kein Scroll. Summary als 2 Spalten à 333px.
  - Mobile (390×844): Modal 645px, Body 530px / Scroll 531px
    → kein Scroll. Summary als 1 Spalte à 447px.
  - Console: 0 Errors, 0 Warnings.

### Eintrag – 18.06.2026 – v1.3.1 (Projekt-Wizard: Budget + Fortschritt entfernt)

- **Datum:** 18.06.2026
- **Version:** 1.3.1
- **Betroffen:** Screen `dashboard` (3.1), Komponenten-Inventar
- **Änderung:** Im Projekt-Wizard wurden die Felder
  **Budget** und **Fortschritt** (Range-Slider) entfernt.
  Step 2 "Planung" enthält jetzt nur noch Termine (Baustart,
  Fertigstellung), Tags und Beschreibung. Section-Title
  von "Termine und Budget" auf "Termine" gekürzt.
  - **HTML:** `<div class="vd-pw-field">` für Budget (mit
    `id="pw-budget"`) und Fortschritt (mit
    `id="pw-fortschritt"`) entfernt.
  - **CSS:** Range-Slider-Styles (`.vd-pw-range*`) und
    Input-Prefix-Styles (`.vd-pw-input-with-prefix`,
    `.vd-pw-input-prefix`) entfernt — waren nur für
    Budget/Fortschritt verwendet.
  - **JS:** `pwData` ohne `budget` und `fortschritt`.
    `fmtBudget`-Helper entfernt. Range-Slider
    `input`-Event-Handler entfernt. Summary-Block
    Planung ohne Budget/Fortschritt-Zeilen.
- **Begründung:** Budget und Fortschritt werden im MVP
  nicht benötigt — werden später ergänzt, wenn
  Abrechnungs- und QS-Features kommen.
- **Verifikation:**
  - `document.getElementById('pw-budget')` und
    `'pw-fortschritt'` liefern null.
  - Step 2 zeigt nur noch Baustart, Fertig,
    Tags, Beschreibung.
  - Step 3 Summary-Block "Planung" hat 4 Zeilen
    (Baustart, Fertig geplant, Tags, Beschreibung).
  - Submit-Console-Log enthält kein `budget` /
    `fortschritt` mehr.
  - Section-Title heisst "Termine" (nicht mehr
    "Termine und Budget").

### Eintrag – 18.06.2026 – v1.3.0 (Projekt-Wizard-Modal)

- **Datum:** 18.06.2026
- **Version:** 1.3.0
- **Betroffen:** Screens `dashboard` (3.1), `projekte` (3.2),
  Komponenten-Inventar
- **Änderung:** Vollständiges Wizard-Modal für "Neues Projekt"
  neu gebaut. Der CTA-Button in der Topbar (`#vd-cta-btn`)
  und der "Neues Projekt"-Sekundärbutton im Dashboard
  haben jetzt einen Click-Handler (`data-action="open-project-wizard"`),
  der das Modal öffnet.
  - **HTML:** Eigenes Modal (`data-bind="project-wizard-modal"`,
    max-width 720px) mit 3 Steps:
    1. **Eckdaten** — Projektname, Adresse, Projekt-Typ,
       Bauleiter (Select mit Personen), Auftraggeber (Select),
       Status (4 Pill-Buttons mit Farb-Dots: Aktiv/Pausiert/
       Abgeschlossen/Archiviert).
    2. **Planung** — Baustart, geplante Fertigstellung
       (Date-Inputs, automatisch auf heute und heute+1 Jahr
       vorbefüllt), Tags (Pill-Picker aus
       `VISIDOC_DEMO.tags`, initial 12 sichtbar,
       "+N weitere"-Button zum Erweitern), Beschreibung
       (Textarea).
    3. **Bestätigen** — Erfolgs-Header plus zwei
       Summary-Blöcke (Eckdaten + Planung) mit
       Label/Value-Zeilen, korrekter Formatierung
       (Datum `tt.mm.jjjj`, Personen mit Initialen),
       "– nicht angegeben –" für leere Felder, und
       "Bearbeiten"-Link pro Block (springt zurück zum
       jeweiligen Step).
  - **CSS:** Neuer Scope `vd-pw-*` (Form-Grid 2-spaltig
    auf Desktop, 1-spaltig ≤560px), Field-Styles mit
    Salwei-Focus-Ring, Required-Marker (roter Asterisk),
    Status-Pills, Tag-Pills, Summary-Block mit Edit-Link.
  - **JS:** `openProjectWizard()` mit State `pwData` und
    `pwSelectedTags`. Live-Validierung pro `input`-Event:
    Step 1 nur weiter wenn `titel ≥2` UND `adresse ≥2`
    UND `bauleiter` gesetzt. Step 2+3 sind optional
    (durchgehend klickbar). Step-Indikator und Next-Button-
    Label passen sich dynamisch an ("Weiter" → "Projekt
    anlegen"). Personen-Dropdowns werden aus
    `VISIDOC_DEMO.personen` befüllt. Submit loggt
    `{pwData, tags}` in Console (TODO: API-Call).
- **Begründung:** Bisher hatte der "Neues Projekt"-Button
  keinen Handler — er war nur visuell präsent. Das neue
  Wizard-Modal folgt dem etablierten 3-Step-Pattern des
  Foto-Wizards (gleicher Step-Indikator, gleiche
  Modal-Struktur) und ist damit visuell und
  bedienungstechnisch konsistent. Live-Validierung
  verhindert, dass User mit unvollständigen Daten auf
  "Weiter" klicken können.
- **Verifikation:**
  - Topbar CTA "Neues Projekt" öffnet Modal mit
    Step-Indikator 1/2/3.
  - Step 1: 9 Optionen im Bauleiter-Dropdown (Placeholder
    + 8 Personen aus Demo-Daten). Status-Pill "Aktiv"
    ist Default, "Pausiert" funktioniert.
  - Next-Button ist disabled solange titel/adresse/bauleiter
    leer; wird live aktiv sobald Pflichtfelder gefüllt.
  - Step 2: Date-Inputs zeigen heute / heute+1 Jahr.
    Tag-Klicks selektieren Pills (Salwei-Highlight).
    "+N weitere" erweitert Tag-Liste.
  - Step 3: Summary zeigt beide Blöcke mit korrekter
    Formatierung. "Bearbeiten"-Links springen
    zurück zum jeweiligen Step. Next-Button-Text =
    "Projekt anlegen".
  - Submit: Console-Log enthält pwData + pwSelectedTags.
    Modal schließt.
  - Mobile (≤560px): Felder stacken, Pills umbrechen,
    Footer bleibt horizontal.
  - Light-Mode: Tokens greifen, Salwei-Focus-Ring
    sichtbar.
  - Console: 0 Errors, 0 Warnings.

### Eintrag – 18.06.2026 – v1.2.0 (Wizard-Step-1: Galerie vs. Kamera)

- **Datum:** 18.06.2026
- **Version:** 1.2.0
- **Betroffen:** Screen `projekt-detail` (3.3), Komponenten-Inventar
- **Änderung:** Step 1 des Upload-Wizards ("Datei wählen") auf
  Zwei-Spalten-Choice-Layout umgebaut.
  - **HTML:** Statt einer einzelnen Dropzone werden zwei grosse
    Choice-Cards angezeigt: "Aus Galerie wählen" und
    "Foto aufnehmen". Beide haben eigene `<input type="file">`
    Elemente (Galerie: `accept="image/*,video/*,application/pdf"`,
    Kamera: `accept="image/*" capture="environment"`).
    Darunter folgt ein "ODER"-Trenner und ein sauber
    abgesetzter Drag&Drop-Fallback als kompakte horizontale
    Zeile (Icon links, Text-Wrapper rechts, 56px hoch für
    Touch-Target). Plus ein Preview-Bereich, der die
    Choice-Grid ersetzt, sobald mindestens eine Datei gewählt
    wurde (Thumbnail, Name, Grösse, Quelle-Label, "Weitere
    Datei hinzufügen", Remove).
  - **CSS:** Neue Klassen `.vd-choice-grid`, `.vd-choice-card`
    (Featured/Hidden/Featured-State), `.vd-choice-icon-tile`,
    `.vd-choice-eyebrow|title|sub`, `.vd-choice-card-badge`,
    `.vd-choice-preview*`, `.vd-dropzone--compact`. Mobile-Breakpoint
    bei 560px stapelt die Cards und dehnt das Modal auf
    `calc(100vw - 24px)`.
  - **JS:** `openWizard(source)` nimmt jetzt einen Use-Case-Parameter
    (`'foto' | 'video' | 'plan' | 'datei'`). Eine `WIZ_CONFIG`
    Map definiert pro Use-Case: Modal-Titel, Accept-Sets für
    Galerie- und Kamera-Input, ob die Kamera-Card sichtbar ist,
    und welche Card als "Empfohlen" markiert wird (Foto+Video →
    Kamera, Plan+Datei → Galerie).
    Foto-Aufnahme-Button öffnet das Modal mit `openWizard('foto')`
    → Kamera-Card ist featured mit "Empfohlen"-Badge. Plan- und
    Datei-Modus blenden die Kamera-Card komplett aus.
    State `wzFiles` sammelt alle ausgewählten Dateien
    (`{file, source}`). Preview rendert bei Bildern einen
    echten data-URL-Thumbnail, bei Videos/PDFs ein Lucide-Icon.
    Step 3 zeigt eine Summary-Liste aller ausgewählten Dateien
    mit Quell-Badge (Galerie/Kamera/Drag&Drop), Name und Grösse.
- **Begründung:** Original-Wizard hatte nur eine Drag&Drop-Zone
  und damit keinen mobilen Kamera-Pfad. Auf Baustellen ist
  "Foto direkt aufnehmen" der dominante Use-Case – die
  Foto-Aufnahme-Aktion musste aber trotzdem zum Datei-Picker
  führen. Das neue Layout macht den Kamera-Pfad explizit
  sichtbar und nutzt `<input capture="environment">` für die
  native Kamera auf Mobile. Der Galerie-Pfad bleibt erhalten
  für bereits gemachte Fotos / PDFs / Pläne.
- **Verifikation:**
  - `upload-foto` öffnet Modal mit Titel "Foto hinzufügen",
    Kamera-Card featured, "Empfohlen"-Badge auf Kamera.
  - `upload-plan` öffnet mit Titel "Plan hochladen", Galerie
    featured, Kamera-Card versteckt.
  - `upload-datei` öffnet mit Titel "Datei wählen", Galerie
    featured, Kamera-Card versteckt.
  - Klick auf Choice-Card löst `<input type="file">` aus (in
    Playwright via direktem DOM-Aufruf simuliert). Change-Handler
    füllt `wzFiles`, Preview erscheint mit Thumbnail, Next-Button
    wird aktiv.
  - Step 2 (Metadaten) → Step 3 (Bestätigen) rendert Summary
    mit Galerie/Kamera-Badge pro Datei.
  - Drag&Drop auf der Kompakt-Zone fügt Dateien via `drop` Event
    hinzu (Source `'drop'`).
  - "ODER"-Trenner zwischen Choice-Cards und Dropzone macht
    klar, dass die Dropzone ein alternativer Pfad ist.
  - Mobile (≤560px): Cards stacken, Modal vollbreite mit 24px
    Padding. Touch-Targets mind. 132px (Cards) bzw. 56px (Dropzone).
  - Console: 0 Errors, 0 Warnings (nur preexisting
    autocomplete-Hinweis auf Login-Input).
  - Dark Theme konsistent, Salwei-Featured-Highlight sichtbar.

### Eintrag – 17.06.2026 – v1.1.0 (Listenansicht Projekte)

- **Datum:** 17.06.2026
- **Version:** 1.1.0
- **Betroffen:** Screen `projekte` (3.2), Komponenten-Inventar
- **Änderung:** Listenansicht im Projekte-Screen implementiert.
  - **CSS:** Neue Regeln für `.vd-projects-list`,
    `.vd-list-header`, `.vd-list-row`, `.vd-list-status*`,
    `.vd-list-empty` plus View-Mode-Selektoren
    `[data-view-mode="cards"|"list"]`. Verwendet konsequent
    die bestehenden Design-Tokens (Salwei, Status-Farben,
    Radius, Spacing). Responsive Breakpoints bei 900px und 560px.
  - **JS:** `projectListRowHTML` rendert jetzt einen
    `<button>`-Row (komplett klickbar) statt `<a>` mit
    nested `<button>` (war semantisch ungültig). HTML-Escape
    via `esc()` schützt vor Schema-Drift. Empty- und
    Error-Helfer `renderListEmpty` abgefangen. Klick wird
    per Event-Delegation auf `vd-projects-list-body` gehandhabt
    (eine statt 12 Listener). Sortier-Buttons im Header
    (Projekt, Geändert) sind klickbar mit `aria-sort`.
  - **HTML:** Bestehende Spalten-Header-Struktur bleibt.
- **Begründung:** Der View-Switcher in der Toolbar (rechts
  oben) hatte keinen funktionierenden Listen-Modus – Klick
  blieb wirkungslos, da `data-view-mode` zwar gesetzt wurde,
  aber kein CSS-Selektor darauf reagierte. Ausserdem war
  die gerenderte Zeile ein `<a>` mit nested `<button>` (HTML
  ungültig) und der Action-Button redundant. Die neue
  Implementierung erfüllt die Anforderung "jede Zeile ist
  ein einzelner Button" sauber und folgt den bestehenden
  Patterns (Tokens, Status-Pill-Farben, JetBrains-Mono
  Zahlen).
- **Verifikation:** 
  - `data-view-mode="cards"` zeigt Grid, versteckt Liste
    (display:none).
  - `data-view-mode="list"` zeigt Liste (display:flex),
    versteckt Grid.
  - 12 Projekte rendern, Status-Dots farbcodiert (warn/
    primary/error/info/muted).
  - Klick auf Zeile navigiert via `switchScreen` zu
    `projekt-detail`.
  - Sort "Projekt" alphabetisch mit `localeCompare('de')`,
    "Geändert" nach ISO-Datum.
  - Empty/Error-State mit `vd-list-empty[is-error]`
    verifiziert.
  - Dark + Light Mode konsistent.
  - `aria-pressed` der View-Toggle-Buttons synchron.

### Eintrag – tt.mm.jjjj – v0.0.0 (Initial)

- **Datum:** 2026-06-17
- **Version:** 0.0.0 (Initialdokument)
- **Betroffen:** alle
- **Änderung:** Diese Datei als Single Source of Truth angelegt.
  6 Screens dokumentiert (dashboard, projekte, projekt-detail,
  galerie, archiv, einstellung). Sektion 9 Audit-Log in
  Einstellung als "geplant" markiert.
- **Begründung:** Quelle `frontend/prototypes/README.md`
  beschreibt das WAS, hatte aber keine Version und keinen
  Änderungs-Log. Diese Datei ergänzt beides und macht jede
  Änderung am HTML-Prototyp nachvollziehbar.
- **Verifikation:** `index.html` Zeilen 27-32 (Screen-Schalter)
  gegen Abschnitt 3 abgeglichen — Übereinstimmung.
  `app-shell.css` muss im Verifikationsschritt noch gegen
  Komponenten-Inventar in Abschnitt 5 abgeglichen werden
  (Folge-Aufgabe).

---

**Ende der Datei.** Nächste Einträge oben einfügen, niemals
mittendrin. Bei substantiellen Änderungen den Initial-Eintrag
unten halten und oben einen neuen Eintrag anlegen.

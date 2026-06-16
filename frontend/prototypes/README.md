# Frontend-Prototypen

Statische UI-Prototypen für BauDoc. Dependency-frei, jede HTML-Datei kann direkt
im Browser geöffnet werden. Geteilte Stile (Tokens, Sidebar, Topbar, Buttons)
liegen in `app-shell.css`, jede Seite hat nur ihre eigenen Komponenten-Stile
inline.

## Marken- und Designbasis

- `DESIGN.md` in diesem Ordner — operative Single Source of Truth für die
  Prototypen. Salwei `#668048` + Anthrazit `#1F2429`, Schweizer Hochdeutsch,
  Token-System, Komponenten-Konventionen.
- `VisiDoc Logo.png` — freigegebene Wort-Bildmarke.

## Dateien

- `app-shell.css` — geteilte Stile: Design-Tokens, App-Layout, Sidebar, Topbar,
  Schaltflächen, Fokus-Ring, responsive Regeln, **Farb-Akzent-Utilities**
  (Salwei-Tints, Tag-Chips, Stat-Kacheln, Tipp-Karten, Live-Dot,
  Foto-Stub, Empty-State). Wird von jeder HTML-Datei
  per `<link rel="stylesheet">` eingebunden.
- `dashboard.html` — Benutzer-Dashboard. Warmes Willkommens-Hero (Salwei-Gradient
  + Avatar mit Ring + Stat rechts), "Tipp des Tages"-Karte, "Letzte Projekte"
  (5 Zeilen), "Aktuelle Benachrichtigungen", "Dateistatistik" (Balken),
  "Nächste Schritte" (Checkliste).
- `projekte.html` — Projektübersicht. Filter-Toolbar mit Status-Segmenten
  (Alle / Aktiv / Abgeschlossen), Projekt-Karten-Grid (auto-fill, 320px).
- `galerie.html` — Medien-Galerie. **3-Spalten-Layout**:
  1) Page-Header (Titel "Galerie" + Subtitle mit Medien-Count) ausserhalb
     der Filter-Card.
  2) **Filter-Card im 3-Zeilen-Layout** (Pattern aus dem Referenz-Screenshot
     einer Mutual-Funds-Filter-Bar):
     - **Zeile 1:** Vollbreite-Suchfeld mit Icon und breitem Placeholder.
     - **Zeile 2:** Salwei-Pill-Segmente (Fotos/Pläne/Videos mit Count-Badge)
       + Pill-Filter-Dropdowns (Projekt, Status, Zeitraum, Ersteller, Tags)
       + View-Switcher rechts.
       - Active: Salwei `#668048` gefüllt, weisser Text.
       - Inactive: `--bg-raised` Hintergrund, dünner Rand, mittlerer Text.
     - **Zeile 3:** "AKTIV"-Label + aktive Filter-Chips mit x-Buttons +
       "Alle Filter zurücksetzen" Link rechts (mit `margin-left: auto`).
     - Card-Container mit `--bg-panel`, dezenter Rand, abgerundete Ecken.
  3) Salwei-Tipp-Karte + Medien-Raster (Foto, Plan, Video mit
     Hover-Quick-Actions, "Neu"-Indikator mit Live-Dot,
     Dauer-Stempel bei Videos, Projekt-Kontext pro Item)
  4) Sticky Detail-Panel mit Vorschau, Projekt, Tags, EXIF/GPS,
     Kommentar-Count, Uploader, Aktionen.

  **Responsive Verhalten:**
  - < 900px: Typ-Segmente bekommen einen Zeilenumbruch, Filter-Pills
    dürfen umbrechen, View-Switcher rutscht an den Zeilen-Rand.
  - < 600px: Padding reduziert, Pill-Höhe verringert,
    "AKTIV"-Label wird auf 100%-Breite gesetzt.
- `archiv.html` — Archiv. Tabelle mit archivierten Projekten, Plänen und
  Audit-Logs. Spalten: Titel, Projekt-ID, Archiviert-Datum, Grösse,
  Aktionen (Wiederherstellen / Herunterladen).
- `einstellung-profil.html` — Einstellung und Profil. **9 Sektionen** mit
  Sticky Sub-Nav (live aktiver Anker beim Scrollen):
  1. **Profil** — wames Hero (Salwei-Gradient, Eyebrow, Avatar mit Ring,
     Live-Status, Foto ändern), Persönliche Angaben + Kurzbeschrieb
  2. **Sicherheit** — Passwort, 2FA (mit Backup-Codes-Callout), 3 Toggle-Rows,
     aktive Sitzungen (drei Geräte, aktuelles markiert), API-Tokens
  3. **Benachrichtigungen** — Channel-Matrix (E-Mail / In-App / Push ×
     5 Ereignisse) + Ruhezeiten-Toggle
  4. **Anzeige & Sprache** — Theme-Wahl (Dunkel/Hell/System mit visuellen
     Vorschau-Karten), Sprache, Zeitzone, Datumsformat, Schriftdichte,
     Animationen-Toggle
  5. **Aktivität** — letzte 5 Aktionen mit farbcodierten Icons
  6. **Daten & Datenschutz** — Export-Karten (Art. 8 DSG, Archiv), 2 Toggle-Rows,
     Aufbewahrungsfristen-Callout, **Danger Zone** (Konto löschen)
  7. **Organisation & Rolle** — Rolle, Abteilung, Personalnummer,
     Berechtigungs-Chips (4 granted, 2 nicht)
  8. **Integrationen** — Microsoft 365 (aktiv), SIA-Normenwerk, OneDrive
  9. **Audit-Log** (Anker, Inhalte in `archiv.html`)

  Plus globaler Speichern-Button am Formular-Ende.

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

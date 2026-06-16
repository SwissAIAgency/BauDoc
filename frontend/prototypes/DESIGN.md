# Prototyp-Designrichtlinie

> **Geltungsbereich.** Verbindliche Designrichtlinie für die
> statischen Frontend-Prototypen in `frontend/prototypes/`.
> Diese Datei ist die **operative Single Source of Truth** für
> die Prototypen und referenziert die übergeordnete
> Markenrichtlinie in `docs/ux/concepts/visidoc-DESIGN.md`.
>
> **Verbindliche Quellen in Reihenfolge:**
> 1. `docs/ux/concepts/visidoc-DESIGN.md` (Marke, Tonalität, Tokens)
> 2. Diese Datei (operativer Prototyp-Zuschnitt: Light/Dark, Token-Namen, HTML/CSS-Konventionen)
> 3. `UI_STANDARDS.md` (übergeordnete UI-Standards)
> 4. `frontend/prototypes/README.md` (Aufbau und Nutzung der HTML-Dateien)

---

## 1. Marke und Logo

### 1.1 Wort-Bildmarke

Die Marke **VisiDoc** ist eine Wort-Bildmarke mit einem
Bild-Symbol (Berg/Foto im Rahmen mit Timeline-Punkten) und
der Wortmarke "Visi" in Anthrazit + "Doc" in Salbei.

- **Bildmarke:** SVG, nur freigegebene Datei verwenden
  (`assets/logo/visidoc-mark.svg` — geplant).
- **Wortmarke:** Inter SemiBold 600, 22 px.
- **Schutzraum:** mindestens eine Buchstabenhöhe auf allen Seiten.
- **Nicht verzerren, einfärben, konturieren oder mit Effekten versehen.**

### 1.2 Logo-Farbe als Markenbasis

Das Logo definiert die zwei Markenfarben, die in Light und
Dark Theme **identisch** bleiben:

| Token | Wert | Verwendung |
|---|---|---|
| `--color-primary` | `#668048` | Salbei. Markenfarbe, einziger Akzent, Logo, Fokus-Ring, Primäraktion. |
| `--color-primary-hover` | `#7A9359` | Mauszeiger über Primärbutton. |
| `--color-primary-press` | `#566B3D` | Primärbutton gedrückt. |
| `--color-primary-soft` | `rgba(102, 128, 72, 0.14)` | Auswahl-Hintergrund in Listen, aktive Tab-Fläche. |
| `--color-ink` | `#1F2429` | Anthrazit. Logo-Wortmarke "Visi" auf hellem Hintergrund, Druckvariante, Body-Text im Light Theme. |

> **Wichtig.** Salbei und Anthrazit sind **die** Markenfarben.
> Andere Grün-, Blau- oder Brauntöne sind nicht erlaubt.
> Siehe `docs/ux/concepts/visidoc-DESIGN.md` Abschnitt 4.

---

## 2. Designprinzipien für Prototypen

Die Prototypen sind **Arbeitswerkzeug-Vorschau**, keine
Marketing-Screens. Es gelten die Prinzipien aus
`visidoc-DESIGN.md` Abschnitt 3, hier verkürzt:

1. **Information vor Dekoration.** Jedes Pixel hat eine Funktion.
2. **Dichte vor Grosszügigkeit.** Viele Pläne, Fotos, Audits.
3. **Wiederholung vor Variation.** Ein Button sieht immer gleich aus.
4. **Status sichtbar machen.** Version, Datum, Freigabe nie versteckt.
5. **Tastatur zuerst.** Jede Aktion per Tastatur erreichbar.

### 2.1 Was wir nicht machen

- Keine Emojis, keine Illustrationen, keine Stock-Bilder.
- Keine Karussells, Animationen, Übergangseffekte.
- Keine Verlaufsfarben, Glasmorphismus, Neumorphismus.
- Keine englischen UI-Strings. Ausnahme: etablierte
  Fachbegriffe ("PDF", "Login", "Audit").
- Keine Marketing-Hero-Flächen.
- Keine dekorativen Schatten. Nur funktionale Schatten
  für Dropdown/Modal (`0 4px 12px rgba(0, 0, 0, 0.32)`).

---

## 3. Design-Tokens

> **Hinweis.** Alle Werte sind CSS-Custom-Properties.
> Direkte Hex-Werte in Komponenten sind verboten.

### 3.1 Dark Theme (Standard)

Warmes Anthrazit, nicht Blau-Anthrazit. Hintergrund- und
Panel-Töne sind leicht bräunlich-grau, passend zur
Bauhandwerk-Thematik.

| Token | Wert | Verwendung |
|---|---|---|
| `--bg-base` | `#14181B` | Anwendungs-Hintergrund, dunkelster Wert. |
| `--bg-panel` | `#1F2429` | Karten, Vorschau-Panel, Dropdowns, Modale. |
| `--bg-raised` | `#2A2F35` | Hover, erhöhte Flächen, ausgewählte Zeile. |
| `--border-default` | `#2F353C` | Karten-Ränder, Trennlinien. |
| `--border-subtle` | `rgba(255, 255, 255, 0.06)` | Zeilen-Trennung in Listen. |
| `--text-high` | `#F2F4F7` | Primärtext, Dateinamen, Button-Beschriftung. |
| `--text-mid` | `#A3ACB8` | Metadaten, Ersteller, Datum. |
| `--text-low` | `#6B7480` | Platzhalter, Mikrozähler. |
| `--text-on-primary` | `#FFFFFF` | Immer Weiss auf Salwei-Button. |
| `--status-info` | `#5B8DEF` | "Neu", "Hinweis", "Kommentar vorhanden". |
| `--status-warn` | `#F5C768` | "In Prüfung", "Überfällig", "Unvollständig". |
| `--status-error` | `#F26B6B` | "Fehler", "Abgelehnt", "Löschung erforderlich". |

**Kontraste auf `#14181B`:**
- `--text-high` 15.4:1 (AAA Fliesstext)
- `--text-mid` 7.8:1 (AAA Fliesstext)
- `--text-low` 4.7:1 (AA Mikroschrift)
- Salwei-Button: weisser Text 4.6:1 (AA interaktiv)

### 3.2 Light Theme (aus Logo abgeleitet)

Die Light-Palette ist **direkt aus dem Logo** abgeleitet:
warmes Off-White als Hintergrund, Anthrazit als Text, Salbei
bleibt als einziger Akzent. So bleibt die Marke konsistent,
egal in welchem Modus.

| Token | Wert | Verwendung |
|---|---|---|
| `--bg-base` | `#F7F8F5` | Anwendungs-Hintergrund, warmes Off-White mit Salbei-Hauch. |
| `--bg-panel` | `#FFFFFF` | Karten, Vorschau-Panel, Dropdowns, Modale. |
| `--bg-raised` | `#EDEFE9` | Hover, erhöhte Flächen, ausgewählte Zeile. |
| `--border-default` | `#D9DCD3` | Karten-Ränder, Trennlinien, warmes Hellgrau. |
| `--border-subtle` | `rgba(31, 36, 41, 0.08)` | Zeilen-Trennung in Listen. |
| `--text-high` | `#1F2429` | Primärtext, Anthrazit (identisch mit Logo-Wortmarke "Visi"). |
| `--text-mid` | `#5A636C` | Metadaten, Ersteller, Datum. |
| `--text-low` | `#8B929B` | Platzhalter, Mikrozähler. |
| `--text-on-primary` | `#FFFFFF` | Immer Weiss auf Salwei-Button. |
| `--status-info` | `#2C5BB8` | Dunkleres Blau für ausreichenden Kontrast auf Hell. |
| `--status-warn` | `#8A6618` | Dunkleres Bernstein für ausreichenden Kontrast. |
| `--status-error` | `#A83333` | Dunkleres Rot für ausreichenden Kontrast. |

**Kontraste auf `#F7F8F5`:**
- `--text-high` 14.2:1 (AAA Fliesstext)
- `--text-mid` 6.5:1 (AA Fliesstext, AAA Mikroschrift)
- `--text-low` 3.4:1 (AA nur für dekorative Mikroschrift, daher sparsam)
- Salwei-Button: weisser Text 4.6:1 (AA interaktiv)

> **Hinweis Light.** Die Status-Farben werden im Light Theme
> abgedunkelt, damit sie auf hellem Hintergrund WCAG-AA
> erreichen. Die Hex-Werte bleiben im Status-Token dieselben
> Namen — nur der Wert wechselt mit dem Theme-Attribut.

### 3.3 Marken- und Kontroll-Tokens (theme-übergreifend)

| Token | Wert | Verwendung |
|---|---|---|
| `--color-primary` | `#668048` | Salbei, in beiden Themes identisch. |
| `--color-primary-hover` | `#7A9359` | Beide Themes. |
| `--color-primary-press` | `#566B3D` | Beide Themes. |
| `--color-primary-soft` | `rgba(102, 128, 72, 0.14)` | Beide Themes. |
| `--color-ink` | `#1F2429` | Anthrazit, in beiden Themes identisch. |

### 3.4 Form, Radius, Abstände

| Token | Wert | Verwendung |
|---|---|---|
| `--radius-container` | `10px` | Karten, Panels, Dropdowns. |
| `--radius-small` | `8px` | Eingabefelder, Mini-Karten, Schaltflächen. |
| `--radius-preview` | `12px` | Grosse Vorschau-Panels, Modal-Dialoge. |
| `--radius-pill` | `999px` | Status-Pillen, Zähler-Chips. |
| `--space-1` | `4px` | Minimaler Abstand, Icon-zu-Text. |
| `--space-2` | `8px` | Innenabstand kleine Schaltfläche. |
| `--space-3` | `12px` | Innenabstand Karten-Header. |
| `--space-4` | `16px` | Standard-Innenabstand. |
| `--space-5` | `20px` | Sektion-Innenabstand. |
| `--space-6` | `24px` | Karten-zu-Karten-Abstand. |
| `--space-8` | `32px` | Sektion-Trennung. |
| `--border-width-default` | `1px` | Standard-Rand. |
| `--border-width-active` | `2px` | Aktiver Tab-Indikator, Fokus-Ring, Auswahl-Balken. |

---

## 4. Theme-Wechsel

### 4.1 Default und Persistenz

- **Default:** Dark Theme.
- **Persistenz:** `localStorage` mit Schlüssel `visidoc-theme`,
  Werte `"dark"` oder `"light"`.
- **Fallback:** `prefers-color-scheme: light` für Erstbesucher.
- **Umschaltung:** Topbar-Button mit Lucide-Icon
  (`Sun` für Light, `Moon` für Dark).

### 4.2 CSS-Implementierung

```css
:root,
[data-theme="dark"] {
  --bg-base: #14181B;
  --bg-panel: #1F2429;
  --bg-raised: #2A2F35;
  --border-default: #2F353C;
  --border-subtle: rgba(255, 255, 255, 0.06);
  --text-high: #F2F4F7;
  --text-mid: #A3ACB8;
  --text-low: #6B7480;
  --status-info: #5B8DEF;
  --status-warn: #F5C768;
  --status-error: #F26B6B;
}

[data-theme="light"] {
  --bg-base: #F7F8F5;
  --bg-panel: #FFFFFF;
  --bg-raised: #EDEFE9;
  --border-default: #D9DCD3;
  --border-subtle: rgba(31, 36, 41, 0.08);
  --text-high: #1F2429;
  --text-mid: #5A636C;
  --text-low: #8B929B;
  --status-info: #2C5BB8;
  --status-warn: #8A6618;
  --status-error: #A83333;
}

/* Marken- und Kontroll-Tokens theme-übergreifend */
:root {
  --color-primary: #668048;
  --color-primary-hover: #7A9359;
  --color-primary-press: #566B3D;
  --color-primary-soft: rgba(102, 128, 72, 0.14);
  --color-ink: #1F2429;
  --text-on-primary: #FFFFFF;
  --radius-container: 10px;
  --radius-small: 8px;
  --radius-preview: 12px;
  --radius-pill: 999px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --border-width-default: 1px;
  --border-width-active: 2px;
}
```

```html
<html lang="de-CH" data-theme="dark">
```

```js
// Persistenz und Fallback
const stored = localStorage.getItem("visidoc-theme");
const system = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
const theme = stored || system;
document.documentElement.setAttribute("data-theme", theme);
```

### 4.3 Druck

Jede Berichtsansicht hat `@media print`:

- Salwei auf Weiss drucken.
- Vorschau-Bilder ohne Ränder.
- Nur Schwarz auf Weiss, keine Hintergrundtöne.
- Status-Pillen als Text mit Icon, nicht als farbige Fläche.

---

## 5. Typographie

VisiDoc verwendet **zwei** Schriftfamilien. Die Hierarchie
entsteht über Gewicht, Grösse und Abstand, nicht über einen
Schriftfamilien-Wechsel.

### 5.1 Schriften

| Familie | Verwendung | Datei / Quelle | Lizenz |
|---|---|---|---|
| **Inter** | Anwendungs-Header, Seitentitel, Body, Metadaten, Schaltflächen, Formularfelder, Hilfetexte. | Variable Font, self-hosted aus `assets/fonts/inter/`. Fallback `system-ui, sans-serif`. | SIL Open Font License 1.1 |
| **JetBrains Mono** | Dateigrössen (`1.4 MB`), Versionsnummern (`v3.2`), Plan-IDs (`EG-01`), EXIF-Werte, Zeitstempel, URL-Slugs. | Variable Font, self-hosted aus `assets/fonts/jetbrains-mono/`. Fallback `ui-monospace, SFMono-Regular, Menlo, monospace`. | SIL Open Font License 1.1 |

**Inter Gewichte:** Regular 400, Medium 500, SemiBold 600.
**JetBrains Mono Gewichte:** Regular 400, Medium 500.
**Bold 700 ist nicht im Einsatz** (zu schwer für Fliesstext auf 14-Zoll-Laptops).

> **Tabular Figures.** Alle Zahlen in Inter und JetBrains
> Mono mit `font-variant-numeric: tabular-nums lining-nums`,
> damit Spalten in Tabellen optisch ausgerichtet bleiben.

### 5.2 Typographische Skala

| Rolle | Schrift | Grösse | Zeilenhöhe | Gewicht | Verwendung |
|---|---|---|---|---|---|
| Wortmarke Header | Inter | 22 px | 1.20 | 600 | "VisiDoc" im App-Header. |
| Seitentitel | Inter | 26 px | 1.20 | 600 | "Galerie", "Pläne", "Berichte". |
| Sektionsüberschrift | Inter | 18 px | 1.25 | 500 | Panel-Titel, Vorschau-Dateiname. |
| Tab-Beschriftung | Inter | 15 px | 1.20 | 500 | "Bilder", "Pläne", "Videos". |
| Body | Inter | 14 px | 1.45 | 400 | Standard-Fliesstext, Beschreibung. |
| Metadaten | Inter | 13 px | 1.45 | 400 | Ersteller, Hochlade-Datum, Kommentar. |
| Schaltfläche | Inter | 14 px | 1.00 | 500 | Beschriftung aller Buttons. |
| Mikrozähler | Inter | 12 px | 1.40 | 500 | Zähler in Tabs. |
| Mono-Daten | JetBrains Mono | 12 px | 1.40 | 400 | Dateigrösse, Version, ID. |
| Leerzustand-Überschrift | Inter | 18 px | 1.30 | 500 | "Keine Medien vorhanden". |

**Mobile (≤ 768 px):** Body und Eingaben mindestens 16 px
(Baustellen-Smartphones, Handschuhe, Sonneneinstrahlung).

### 5.3 Was wir nicht machen

- **Keine Versalien.** Nicht in Überschriften, nicht in
  Schaltflächen, nicht in Tabs. Grossbuchstaben nur am
  Satzanfang.
- **Keine kursive Schnitte.** Hervorhebung durch Gewicht
  500/600 oder Farbe.
- **Keine eigene Display-Schrift.** Die Hierarchie kommt
  aus Gewicht, Grösse und Abstand.
- **Keine Drittanbieter-Fonts über Google-Fonts-CDN.** Alles
  self-hosted aus `assets/fonts/`.

---

## 6. Tonalität und Schreibart (Schweizer KMU)

### 6.1 Sprachregister

Die Marke spricht wie ein erfahrener Polier, nicht wie ein
Werbebrief. Zielgruppe: Bauleiterinnen, Bauleiter,
Projektleitung, Poliere, Vorarbeiter, gewerbliche
Mitarbeitende in **Schweizer KMU im Bauhaupt- und
Baunebengewerbe** (5 bis 80 Mitarbeitende).

| Eigenschaft | Bedeutung |
|---|---|
| Sachlich | Keine Superlative, keine Ausrufezeichen, keine Marketing-Imperative. |
| Direkt | Aktive Verben, kurze Sätze, Gegenwartsform. |
| Respektvoll | Keine Füllwörter ("bitte", "gerne", "leider"), keine Entschuldigungen. |
| Klar | Keine Smileys, keine Emojis, keine englischen Floskeln. |
| Konsistent | Ein Begriff für eine Sache, ein Button-Text pro Aktion. |

### 6.2 Konkrete Wortwahl

| Statt | Schreiben wir |
|---|---|
| "Laden Sie jetzt Ihr erstes Bild hoch!" | "Keine Medien vorhanden" |
| "Hallo! Willkommen bei VisiDoc" | "VisiDoc" (Wortmarke) |
| "Speichern Sie Ihre Änderungen" | "Änderungen speichern" |
| "Hochladen" (Button, ohne Kontext) | "Datei wählen" |
| "Wählen Sie aus" | "Auswählen" |
| "Es tut uns leid, ein Fehler ist aufgetreten" | "Fehler. Bitte erneut versuchen." |
| "Bitte füllen Sie das Feld aus" | "Pflichtfeld" |
| "OK" (alleinstehend) | "Bestätigen" oder spezifische Aktion |
| "Submit" | "Speichern" / "Senden" |
| "Cancel" | "Abbrechen" |

### 6.3 Schweizer Hochdeutsch (de-CH)

- **Bauleiter** statt "Bauführer" (in der Deutschschweiz
  üblich; in der Romandie ist "Bauführer" Lokalisierung).
- **Doppel-S statt ß.** "Schliessen" nicht "Schließen",
  "Masse" nicht "Maße", "Strasse" nicht "Straße". Hintergrund:
  Auf Schweizer Tastaturen (ausser Zürich) ist `ß` nicht
  verfügbar.
- **Anrede geschäftlich:** "Sie" (Höflichkeit), nicht "du".
  Ausnahme: Falls die Stakeholder explizit "du" wünschen,
  konsistent bleiben.
- **Keine Anglizismen** in der Oberfläche. Etablierte
  Fachbegriffe ("PDF", "Login", "Audit-Log", "DSG",
  "Web-PWA") dürfen englisch bleiben.

### 6.4 Eigennamen und Marken

- **VisiDoc** (immer mit korrekter Grossschreibung, nie
  "Visidoc" oder "VISIDOC").
- **Schweizer DSG** (nicht "DSGVO" — DSGVO ist EU).
- **OR** (Obligationenrecht), **ZGB** (Zivilgesetzbuch),
  **SIA** (Schweizerischer Ingenieur- und Architektenverein)
  bei Bedarf ausgeschrieben.

### 6.5 Datums-, Zeit-, Zahlen-, Währungsformate

| Typ | Format | Beispiel |
|---|---|---|
| Datum | `tt.mm.jjjj` | `14.05.2026` |
| Zeit | 24h, `hh:mm` | `14:32` |
| Datumsbereich | mit Halbgeviertstrich und nbsp | `14.05. – 18.05.2026` |
| Wochentag + Datum | nur wenn relevant | `Mo, 14.05.2026` |
| Vollständiger Zeitstempel | Datum + Komma + Zeit | `14.05.2026, 14:32` |
| Tausendertrennzeichen | Apostroph | `1'230.00` |
| Dezimaltrennzeichen | Punkt (technisch), Komma (Fliesstext) | `1.4 MB` / `1'230,5 m²` |
| Währung | CHF | `CHF 1'230.00` oder `1'230.00 CHF` |
| Masseinheiten | SI, kleingeschrieben, mit nbsp | `12 m²`, `2.5 m`, `0.75 kg` |
| Prozent | mit nbsp | `12,5 %` |
| Telefon | international mit nbsp | `+41 44 123 45 67` |
| Postleitzahl | vierstellig | `8001 Zürich` |
| IBAN | in Vierergruppen | `CH93 0076 2011 6238 5295 7` |

**Regel:** In **technischen Daten** (Dateigrössen, EXIF,
Koordinaten) Dezimalpunkt. In **Fliesstext und Berichten**
Dezimalkomma. Diese Trennung ist branchenüblich im
Schweizer Bauingenieurwesen.

### 6.6 Leere Zustände und Mikrotitel

Leerzustände sind keine Bildschirme zum Verzieren.

| Kontext | Überschrift | Untertitel | Aktion |
|---|---|---|---|
| Leere Galerie | "Keine Medien vorhanden" | "Lade dein erstes Foto oder deinen ersten Plan hoch." | "Datei wählen" (Primär) |
| Keine Treffer | "Keine Treffer" | "Für die aktuellen Filter wurde nichts gefunden." | "Filter zurücksetzen" (Link) |
| Keine Auswahl | "Medium auswählen" | "Wähle ein Foto, einen Plan oder ein Video in der Liste, um Vorschau und Details zu sehen." | — |

### 6.7 Status-Pillen (Wortlaut)

| Status | Wortlaut | Icon (Lucide) |
|---|---|---|
| Freigegeben | "Freigegeben" | `CheckCircle2` |
| In Prüfung | "In Prüfung" | `Clock` |
| Neu | "Neu" | `Sparkles` |
| Hinweis | "Hinweis" | `Info` |
| Fehler | "Fehler" | `AlertCircle` |
| Abgelehnt | "Abgelehnt" | `XCircle` |
| Unvollständig | "Unvollständig" | `AlertTriangle` |

> **Hinweis.** "Erfolg" wird **nicht** als eigene Farbe
> signalisiert, sondern durch Salbei selbst (grüner Haken
> auf Salwei-Button, freigegebene Pläne zeigen Salwei-Haken).

### 6.8 Was wir nicht schreiben

- **Keine englischen Strings.** Auch nicht in Tooltips,
  Platzhaltern, aria-labels. Ausnahmen: etablierte
  Fachbegriffe (siehe 6.3).
- **Keine Modal-Verben im Imperativ.** "Speichern", nicht
  "Speichern!" — das Ausrufezeichen ist Marketing-Stil.
- **Keine Passiv-Ketten.** "Das Foto wurde hochgeladen" →
  "Foto hochgeladen".
- **Keine "Es tut uns leid"-Floskeln.** Direkt: "Fehler.
  Bitte erneut versuchen."

---

## 7. Symbole (Icons)

- **Bibliothek:** Lucide, Strichstärke **1.75** (kräftiger
  als Standard-1.5, damit Status-Pillen auf 14-Zoll-Laptops
  nicht zu zart wirken).
- **Format:** Outline, nie gefüllt, nie zweifarbig.
- **Grössenraster:**
  - 16 px in Listen-Zeilen, Mikroschaltflächen.
  - 18 px in Standard-Schaltflächen.
  - 24 px in Panel-Headern, Formularfeldern.
  - 32 px in Status-Bereichen, leeren Zuständen.
  - 48 px in leeren Hauptzuständen.
- **Touch-Target:** Minimum 44 × 44 px (Baustellen-Handschuhe).
- **Farbe:**
  - Standard: `--text-mid`.
  - Hover: `--text-high`.
  - Aktiv / ausgewählt: `--color-primary` (Salwei).
  - Status: jeweilige Status-Farbe.

### 7.1 Kuratierte Symbole (Auswahl)

Die vollständige kuratierte Liste wird in
`docs/ux/icon-registry.md` gepflegt (geplant). Hier die für
Prototypen wichtigsten:

| Funktion | Symbol | Lucide-Name |
|---|---|---|
| Bilder-Tab | Bild-Rahmen | `Image` |
| Pläne-Tab | Grundriss-Linien | `Ruler` |
| Videos-Tab | Wiedergabe | `Video` |
| Suchen | Lupe | `Search` |
| Filter | Trichter | `Filter` |
| Datei herunterladen | Pfeil nach unten | `Download` |
| Planmarker setzen | Karten-Pin | `MapPin` |
| Hochladen | Wolke mit Pfeil | `UploadCloud` |
| Bestätigen | Haken im Kreis | `CheckCircle2` |
| Warnung | Dreieck mit Ausrufezeichen | `AlertTriangle` |
| Fehler | X im Kreis | `XCircle` |
| Hinweis | i im Kreis | `Info` |
| In Prüfung | Uhr | `Clock` |
| Theme-Umschalter (Light) | Sonne | `Sun` |
| Theme-Umschalter (Dark) | Mond | `Moon` |
| Schliessen | X | `X` |
| Einstellungen | Zahnrad | `Settings` |

### 7.2 Was wir nicht verwenden

- **Keine Emojis** in der Oberfläche. Ein grüner Haken
  kommt von Lucide, nicht von Unicode `✅`.
- **Keine Symbole aus mehreren Quellen mischen.** Alles Lucide.
- **Keine selbst gezeichneten SVG-Symbole**, ausser für die
  Wortmarke.
- **Keine animierten Symbole.** Status-Indikatoren dürfen
  pulsieren, aber niemals dauerhaft rotieren.

---

## 8. Komponenten

### 8.1 Schaltflächen

VisiDoc hat **sechs** Schaltflächentypen. Nicht mehr.

| Typ | Hintergrund | Rand | Text | Verwendung |
|---|---|---|---|---|
| **Primär** | `--color-primary` | – | `--text-on-primary` | Maximal eine pro Ansicht. "Speichern", "Datei wählen", "Bestätigen". |
| **Sekundär** | `--bg-panel` | 1 px `--border-default` | `--text-high` | Standard-Aktion. "Abbrechen", "Filter". |
| **Geister** (Ghost) | transparent | – | `--text-high` | In dichter Liste. "Mehr anzeigen". |
| **Umrandet** (Outlined) | transparent | 1 px `--color-primary` | `--color-primary` | Sekundär im Vorschau-Panel. "Download", "Planmarker". |
| **Gefahr** (Danger) | transparent | 1 px `--status-error` | `--status-error` | "Löschen". Niemals gefüllt, immer mit Bestätigung. |
| **Link** | – | – | `--color-primary` | Text-Link. "Filter zurücksetzen". |

**Höhe:** 36 px Standard, 44 px auf Mobile und für Primäraktionen.
**Icon + Label:** Möglich. Icon links, Label rechts, 8 px Abstand.

### 8.2 Status-Pillen

Status-Pillen kombinieren **immer Icon + Text + Farbe**.

- Höhe: 22 px.
- Padding: 4 px vertikal, 10 px horizontal.
- Radius: `--radius-pill` (999 px).
- Hintergrund: Status-Farbe mit 14 % Alpha.
- Text und Icon: volle Status-Farbe, 12 px Inter Medium.
- Icon: 12 px, 1.5 px Strichstärke.

### 8.3 Formularfelder

- Höhe: 40 px Standard, 44 px auf Mobile.
- Hintergrund: `--bg-panel`.
- Rand: 1 px `--border-default`, im Fokus 2 px
  `--color-primary` mit 2 px Offset.
- Label: oberhalb des Felds, 13 px Inter Medium,
  `--text-high`.
- Pflichtfeld: Sternchen (`*`) in `--status-error` direkt am Label.
- Hilfetext: unterhalb, 12 px Inter Regular, `--text-mid`.
- Fehlertext: 12 px Inter Medium, `--status-error`, mit
  `AlertCircle`-Icon.

### 8.4 Listenzeilen

- Zeilenhöhe: 64 px.
- Spaltenraster: `40px | 1fr | 140px | 120px | auto`.
- Thumbnail: 40 × 40 px, `--radius-small`, leicht aufgehellt.
- Datum: Tabular Figures, rechtsbündig, `--text-mid`.
- Grösse: JetBrains Mono, rechtsbündig, `--text-mid`.
- Auswahl: 2 px Salwei-Balken links + Hintergrund `--bg-raised`.
- Trennlinien: 1 px `--border-subtle`.

---

## 9. Konventionen für Prototyp-Dateien

### 9.1 Datei-Aufbau

- `frontend/prototypes/` enthält dependency-freie, statische
  HTML-Dateien.
- Eine Datei pro Screen (z. B. `project-cockpit.html`,
  `plan-workspace.html`, `dashboard.html`).
- Token werden zentral in `frontend/prototypes/tokens.css`
  definiert und per `<link rel="stylesheet">` eingebunden.
- Lucide-Icons werden per Inline-SVG eingebunden, CDN
  vermeiden (Datenschutz).
- Schriften (Inter, JetBrains Mono) liegen unter
  `frontend/prototypes/assets/fonts/` und werden self-hosted.

### 9.2 HTML-Konventionen

- `<html lang="de-CH" data-theme="dark">`.
- Semantisches HTML (`<header>`, `<nav>`, `<main>`, `<aside>`,
  `<section>`, `<article>`).
- Buttons als `<button>`, nicht als `<div>`.
- Listen als `<ul>` / `<ol>`, Tabellen als `<table>`.
- Formularfelder mit sichtbarem `<label>`, nicht nur Placeholder.
- `aria-label` für Icon-only-Schaltflächen in Deutsch.
- Live-Region (`aria-live="polite"`) für Upload-Status.
- `prefers-reduced-motion: reduce` respektieren.

### 9.3 CSS-Konventionen

- CSS-Custom-Properties für alle Token (siehe Abschnitt 3).
- Keine direkten Hex-Werte in Komponenten.
- Keine ID-Selektoren für Styling.
- BEM-ähnliche Klassennamen: `.vd-button`, `.vd-button--primary`,
  `.vd-card`, `.vd-list-row`.
- `prefers-reduced-motion` als Standard für Übergänge.

### 9.4 JavaScript-Konventionen

- Theme-Persistenz in `localStorage` mit Schlüssel
  `visidoc-theme` (siehe Abschnitt 4.1).
- Keine externen Bibliotheken ohne Eintrag in dieser Datei.
- Keine Inline-Eventhandler in HTML; Event-Listener in
  externer `.js`-Datei.

---

## 10. Test- und Beispieldaten

- **Keine** echten Personennamen, Projekte, Adressen oder
  Baustellenfotos in Prototypen.
- Beispieldaten klingen echt ("Neubau Bahnhofstrasse 12,
  8001 Zürich"), sind aber frei erfunden.
- Personen in Beispieldaten: keine Klarnamen aus dem
  Telefonbuch, keine Personen des öffentlichen Lebens.
- Adressen in der Schweiz (CH-Postleitzahlen, 4-stellig).
- Währung: CHF.
- Telefon: +41 xx xxx xx xx Format.

---

## 11. Barrierefreiheit

VisiDoc erfüllt **WCAG 2.2 Level AA** im MVP und strebt
**AAA** an, wo es ohne Funktionseinbusse möglich ist.

- **Kontrast:** Alle Text-/Hintergrund-Kombinationen sind
  in Abschnitt 3 dokumentiert.
- **Tastaturbedienung:** Jede Aktion ist per Tab,
  Umschalt+Tab, Pfeiltasten, Eingabe, Leertaste und
  Escape erreichbar.
- **Fokus-Ring:** 2 px Salwei, 2 px Offset auf jedem
  interaktiven Element.
- **Bildschirmleser:** Semantisches HTML, ARIA-Labels für
  Icon-only-Schaltflächen, Live-Regionen.
- **Status:** Immer mit Icon + Text + Farbe, nie Farbe allein.
- **Bewegung:** `prefers-reduced-motion` standardmässig aktiv.
- **Sprache:** `lang="de-CH"` auf `<html>`, ARIA-Labels
  ebenfalls in `de-CH`.
- **Touch:** Alle Touch-Targets ≥ 44 × 44 px.

---

## 12. Pflege und Änderungsprozess

1. Änderungen an Tokens, Schriften oder Komponenten werden
   **in dieser Datei** gemacht.
2. Bei Widersprüchen zu `docs/ux/concepts/visidoc-DESIGN.md`
   hat die übergeordnete Markenrichtlinie Vorrang — diese
   Datei ist nur der operative Zuschnitt für Prototypen.
3. Im `CHANGELOG.md` (im Projekt-Root) wird die Änderung
   mit Datum und Begründung eingetragen.
4. Screenshots der betroffenen Komponenten werden in
   `docs/ux/figma-screenshots/` (geplant) abgelegt.

### 12.1 Verbotene direkte Eingriffe

- **Keine** Hex-Werte direkt in Komponenten. Immer Token.
- **Keine** Schriftarten direkt per `font-family` in
  Komponenten. Immer über die zentrale `tokens.css`.
- **Keine** neuen Status-Farben ohne Eintrag in Abschnitt 3.
- **Keine** neuen Icon-Symbole ausserhalb der kuratierten
  Auswahl ohne Design-Freigabe.
- **Keine** englischen Strings in Komponenten, auch nicht
  in Entwicklungsphase.
- **Keine** Abweichung von Salwei `#668048` als Markenakzent.

---

## 13. Was nicht zu dieser Datei gehört

- **Konkrete Stack-Implementierung** (React, Vue, Svelte):
  lebt später in `apps/web/src/components/`.
- **API-Verträge:** leben in `docs/api/openapi.yaml`.
- **Datenmodell:** lebt in `docs/08_datenmodell.md`.
- **Teststrategie:** lebt in `docs/TESTING.md` (im Projekt-Root).
- **Stitch-Setup:** lebt in
  `docs/ux/concepts/stitch-setup-copy-paste.md`.

Diese Datei beschreibt **das Was und Warum**, nicht
**das Wie der Implementierung**.

---

## 14. Verbindliche Quellen

| Thema | Quelle |
|---|---|
| Marke, Tokens, Typographie (SoT) | `docs/ux/concepts/visidoc-DESIGN.md` |
| UI-Standards (übergeordnet) | `UI_STANDARDS.md` |
| Brand-Guidelines (übergeordnet) | `docs/13_ui_brand_guidelines.md` |
| Architektur | `docs/02_architektur.md` |
| Sicherheit & Datenschutz | `docs/09_datenschutzkonzept.md` |
| Leistungsumfang | `docs/01_anforderungen.md` |
| Teststrategie | `docs/TESTING.md` (im Projekt-Root) |
| Prototyp-Aufbau | `frontend/prototypes/README.md` |
| Logo-Quelle | `frontend/prototypes/VisiDoc Logo.png` |
| Skizzen Dashboard + Einstellung | `frontend/prototypes/Dashboard+Einstellung.png` |
| Skizzen Timeline + Projektansicht | `frontend/prototypes/Timeline+Projektansicht.png` |

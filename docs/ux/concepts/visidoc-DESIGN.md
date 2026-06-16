# VisiDoc — DESIGN.md

> **Geltungsbereich.** Verbindliche Designrichtlinie für die
> VisiDoc-Web- und PWA-Anwendung, abgestimmt auf die
> Anforderungen von Schweizer KMU im Bauhandwerk.
> Diese Datei ist die **Single Source of Truth** für Marke,
> Typographie, Farbe, Komponenten und Konventionen.
> `stitch-prompts.md`, `stitch-setup-copy-paste.md` und
> `galerie-medienverwaltung.md` referenzieren diese Datei.

---

## 1. Produkt und Zielgruppe

### 1.1 Was VisiDoc ist
VisiDoc ist eine Web- und PWA-Anwendung für planbasierte
Baufortschrittsdokumentation. Die Anwendung richtet sich an
**Schweizer KMU im Bauhaupt- und Baunebengewerbe** —
Schreinereien, Holzbau, Gipser, Maler, Elektriker, Sanitär,
Hoch- und Tiefbau, Generalunternehmungen mit 5 bis 80
Mitarbeitenden.

VisiDoc ist **keine** Marketing- oder Consumer-App. Es ist
ein Arbeitswerkzeug, das auf der Baustelle, im Büro und unter
Zeitdruck funktioniert.

### 1.2 Wer es nutzt
- **Bauleiterinnen und Bauleiter** — Primärnutzer am
  Desktop, oft auf 14- bis 15-Zoll-Laptops, mehrere
  Bildschirme, externe Monitore. Hohe Verweildauer pro
  Sitzung (2 bis 6 Stunden).
- **Projektleitung, Planerinnen und Planer** — Sekundärnutzer
  am Desktop, kurze Sitzungen, prüfen und kommentieren
  Pläne und Fotos.
- **Poliere, Vorarbeiter, gewerbliche Mitarbeitende** —
  Gelegentliche Nutzung am Smartphone, draussen, oft mit
  Handschuhen und bei Sonneneinstrahlung.
- **Auftraggeber, Bauherren, Behörden** — Betrachten Fotos
  und Pläne, lesen Kommentare, drucken oder exportieren
  PDF-Berichte.

### 1.3 Was das für das Design bedeutet
- **Leseabstand 60 bis 80 cm**, oft schlechte Monitore.
  Schriftgrösse, Kontrast und Zeichenabstand müssen für
  diese Bedingungen optimiert sein.
- **Tastatur- und Mausnutzung am Desktop** ist der
  Hauptanwendungsfall. Touch ist sekundär, muss aber
  funktionieren.
- **14-Zoll-Laptop ist Referenzauflösung** (1366 × 768 oder
  1440 × 900). Dichte Layouts müssen hier noch ohne
  Horizontalscroll lesbar sein.
- **Mehrsprachigkeit de-CH / fr-CH / it-CH** ist
  Geschäftsanforderung. Die deutsche Variante ist im MVP
  verfügbar, die anderen Sprachen sind
  Lokalisierungs-Vorbereitung. Kein Englisch in der
  Benutzeroberfläche, ausser in Fachbegriffen, die in der
  Branche etabliert sind (z. B. „Audit-Log", „PDF", „DSG").
- **Datenschutz nach Schweizer DSG** ist Pflicht.
  VisiDoc speichert Daten in der Schweiz, keine Drittstaaten.

---

## 2. Marke und Tonalität

### 2.1 Positionierung
VisiDoc ist **präzise, ruhig, verlässlich**. Die Marke
spricht wie ein erfahrener Polier, nicht wie ein
Werbebrief: kurz, fachlich, ohne Pathos.

### 2.2 Tonalität in der Benutzeroberfläche
- **Sachlich, nicht werblich.** Keine Superlative, keine
  Ausrufezeichen, keine Imperative im Marketing-Stil.
- **Direkt, nicht barsch.** Aktive Verben, kurze Sätze,
  Gegenwartsform.
- **Schweizer Hochdeutsch, kein Dialekt.** „Bauleiter", nicht
  „Bauführer" (ausser in der Westschweiz, wo der Begriff
  üblich ist — dann Lokalisierung).
- **Höflich-respektvoll, nicht unterwürfig.** Keine
  Füllwörter („bitte", „gerne", „leider"), keine
  Entschuldigungen, keine Smileys.

| Statt | Schreiben wir |
|---|---|
| „Laden Sie jetzt Ihr erstes Bild hoch!" | „Keine Medien vorhanden" |
| „Hallo! 👋 Willkommen bei VisiDoc" | „VisiDoc" (Wortmarke) |
| „Speichern Sie Ihre Änderungen" | „Änderungen speichern" |
| „Hochladen" | „Datei wählen" |
| „Wählen Sie aus" | „Auswählen" |
| „Es tut uns leid, ein Fehler ist aufgetreten" | „Fehler. Bitte erneut versuchen." |
| „Bitte füllen Sie das Feld aus" | „Pflichtfeld" |

### 2.3 Logo und Wortmarke
- **Wortmarke „VisiDoc"** in der Schrift Inter, Gewicht
  SemiBold 600, Grösse 22 px, Farbe Salbei `#668048` auf
  dunklem Hintergrund, Anthrazit `#1F2429` auf hellem
  Hintergrund.
- **Wort-Bildmarke** (Logo mit Subtext „Baufortschritt
  dokumentieren") nur auf Login- und Marketing-Oberflächen.
  Im App-Header reicht die Wortmarke.
- **Schutzraum** um die Wortmarke: mindestens eine
  Buchstabenhöhe auf allen Seiten.
- **Nie verzerren, rot einfärben, konturieren, mit Effekten
  versehen oder auf Fotografien platzieren.**

---

## 3. Designsprache

VisiDoc folgt den Prinzipien des **Schweizer Grafikdesigns**:
klare Raster, funktionale Typographie, zurückhaltende Farbe,
ehrliche Materialien, keine Effekthascherei. Konkrete
Vorbilder sind Werkzeuge, die in der Schweizer
Bauverwaltung seit Jahren etabliert sind — nicht
Consumer-Apps.

### 3.1 Designprinzipien
1. **Information vor Dekoration.** Jedes Pixel muss eine
   Funktion haben. Schatten, Farbverläufe, Glanzeffekte sind
   nicht erlaubt.
2. **Dichte vor Grosszügigkeit.** Baulisten, Pläne, Fotos
   sind viele. Die Oberfläche muss viele Elemente zeigen,
   ohne zu überfordern.
3. **Wiederholung vor Variation.** Ein Button sieht immer
   gleich aus. Eine Liste sieht immer gleich aus. Nur die
   Daten ändern sich.
4. **Status sichtbar machen.** Versionsnummern, Datumsangaben,
   Genehmigungszustände sind immer sichtbar, nie versteckt
   hinter Tooltips.
5. **Tastatur zuerst.** Jede Aktion ist per Tastatur
   erreichbar, jede Liste mit Pfeiltasten navigierbar.

### 3.2 Was wir nicht machen
- **Keine Emojis.** Nirgendwo in der Oberfläche, in
  E-Mails, in Hilfetexten.
- **Keine Illustrationen.** Keine bunten Vektorgrafiken,
  keine Charaktere, keine Stock-Bilder.
- **Keine Karussells, Animationen, Übergangseffekte.**
  Statuswechsel sind hart (`prefers-reduced-motion`
  standardmässig aktiv).
- **Keine Verlaufsfarben, Glasmorphismus, Neumorphismus.**
  Flächen sind flach, Farben sind voll.
- **Keine englischen UI-Strings im MVP.** Ausnahme: etablierte
  Fachbegriffe (z. B. „PDF", „Login", „Audit").
- **Keine Tracking-Pixel, Heatmaps, externe Schriftarten
  ohne Einwilligung.**

---

## 4. Design-Tokens (verbindlich)

> **Hinweis.** Alle Token sind CSS-Custom-Properties
> (`--bg-base`, `--color-primary` usw.). Tailwind-Klassen in
  `galerie-medienverwaltung.md` greifen auf diese Variablen
  zu. **Direkte Hex-Werte in Komponenten sind verboten.**

### 4.1 Farbe — Marke und Hintergrund

| Token | Wert | Verwendung |
|---|---|---|
| `--color-primary` | `#668048` | Salbei. Markenfarbe. Ausschliesslich für aktiven Zustand, Primäraktion, Logo, Fokus-Ring. |
| `--color-primary-hover` | `#7A9359` | Mauszeiger über Primärbutton. |
| `--color-primary-press` | `#566B3D` | Primärbutton gedrückt. |
| `--color-primary-soft` | `rgba(102, 128, 72, 0.14)` | Auswahl-Hintergrund in Listen, aktive Tab-Fläche. |

| Token | Wert | Verwendung |
|---|---|---|
| `--bg-base` | `#14181B` | Anwendungs-Hintergrund, dunkelster Wert. Warmes Anthrazit, nicht Blau-Anthrazit. |
| `--bg-panel` | `#1F2429` | Karten, Vorschau-Panel, Dropdowns, Modale. |
| `--bg-raised` | `#2A2F35` | Mauszeiger über Liste, erhöhte Flächen, ausgewählte Zeile. |
| `--border-default` | `#2F353C` | Karten-Ränder, Trennlinien zwischen Sektionen. |
| `--border-subtle` | `rgba(255, 255, 255, 0.06)` | Zeilen-Trennung in Listen, fast unsichtbar. |

### 4.2 Farbe — Text

| Token | Wert | Kontrast auf `#14181B` | Verwendung |
|---|---|---|---|
| `--text-high` | `#F2F4F7` | 15.4 : 1 | Primärer Text, Dateinamen, Schaltflächen-Beschriftung. |
| `--text-mid` | `#A3ACB8` | 7.8 : 1 | Metadaten, Ersteller, Hochlade-Datum. |
| `--text-low` | `#6B7480` | 4.7 : 1 | Platzhalter, Mikrozähler (`24`, `28`, `6`). |
| `--text-on-primary` | `#FFFFFF` | — | Immer Weiss auf Salbei-Button. |

Alle Kontrastwerte erfüllen **WCAG 2.2 AAA für Fliesstext**
(7 : 1) und mindestens **AA für Mikroschrift** (4.5 : 1).
Kontrast auf Salbei (`#668048`) für weissen Text: 4.6 : 1,
ausreichend für interaktive Elemente (Schaltflächen,
Fokus-Ring).

### 4.3 Farbe — Status

Statusfarben sind **niemals Dekoration**, sondern tragen
immer eine fachliche Bedeutung. Sie erscheinen nur
**innerhalb von Status-Pillen, Status-Icons und
Status-Beschriftungen**, nie als Flächenfüllung einer
Schaltfläche oder Karte.

| Token | Wert | Paarung mit Icon | Bedeutung |
|---|---|---|---|
| `--status-info` | `#5B8DEF` | `Info`, `Sparkles` | „Neu", „Hinweis", „Kommentar vorhanden" |
| `--status-warn` | `#F5C768` | `Clock`, `AlertTriangle` | „In Prüfung", „Überfällig", „Unvollständig" |
| `--status-error` | `#F26B6B` | `AlertCircle`, `XCircle` | „Fehler", „Abgelehnt", „Löschung erforderlich" |

> **Wichtig.** Eine eigene „Erfolgs"-Farbe ist nicht
> vorgesehen. Erfolg wird durch **Salbei selbst** signalisiert
> (grüner Haken auf Salbei-Button, freigegebene Pläne zeigen
> Salwei-Scheck). Das spart eine Farbe und stärkt die
> Markenfarbe.

### 4.4 Form, Radius, Abstände

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

### 4.5 Schatten
VisiDoc verwendet **keine** dekorativen Schatten.
Funktionale Schatten sind erlaubt, aber flach und
schwarz-lastig:

- **Dropdown / Modal:** `0 4px 12px rgba(0, 0, 0, 0.32)` —
  deutlich, aber nie verspielt.
- **Tooltip:** `0 2px 6px rgba(0, 0, 0, 0.24)`.

Keine blauen, grünen oder farbigen Schatten.

---

## 5. Typographie

### 5.1 Schriftsystem — Zwei Familien, nicht drei

VisiDoc verwendet **zwei** Schriftfamilien, nicht drei. Das
reduziert die Ladezeit, vereinfacht die Lizenz und ist für
die Zielgruppe leichter lesbar.

#### Familie 1 — **Inter** (alle UI-Texte)
- **Verwendung:** Anwendungs-Header, Seitentitel,
  Abschnittsüberschriften, Tab-Beschriftungen, Body,
  Metadaten, Schaltflächen, Formularfelder, Hilfetexte.
- **Gewichte:** Regular 400, Medium 500, SemiBold 600.
  Bold 700 ist nicht im Einsatz.
- **Besonderheiten:**
  - Alle Zahlen in **Tabular Figures**
    (`font-variant-numeric: tabular-nums lining-nums`).
  - Deutsche Diakritika (ä, ö, ü, ß) sind erstklassig.
  - Kapitälchen sind nicht im Einsatz.
- **Datei:** Variable Font, self-hosted aus
  `assets/fonts/inter/`. Fallback `system-ui, sans-serif`.
- **Lizenz:** SIL Open Font License 1.1 (kostenlos, auch
  für kommerzielle Nutzung).

#### Familie 2 — **JetBrains Mono** (technische Daten)
- **Verwendung:** Dateigrössen (`1.4 MB`), Versionsnummern
  (`v3.2`), Plan-IDs (`EG-01`), EXIF-Werte, Zeitstempel in
  Metadaten-Streifen, URL-Slugs, Hash-Werte, API-Token.
- **Gewichte:** Regular 400, Medium 500.
- **Besonderheiten:**
  - Deutlich lesbarer als proportionale Schrift für
    alphanumerische Codes.
  - Unterstützt ebenfalls Tabular Figures.
- **Datei:** Variable Font, self-hosted aus
  `assets/fonts/jetbrains-mono/`. Fallback
  `ui-monospace, SFMono-Regular, Menlo, monospace`.
- **Lizenz:** SIL Open Font License 1.1 (kostenlos).

> **Wichtig.** Eine eigene Display-Schrift (z. B. „Söhne",
> „Suisse Int'l", „GT America") ist im MVP **nicht**
> vorgesehen. Die Hierarchie entsteht über Gewicht, Grösse
> und Abstand — nicht über einen Schriftfamilien-Wechsel.
> Das ist robuster, günstiger und konsistenter.

### 5.2 Typographische Skala

| Rolle | Schrift | Grösse | Zeilenhöhe | Gewicht | Verwendung |
|---|---|---|---|---|---|
| Wortmarke Header | Inter | 22 px | 1.20 | 600 | „VisiDoc" im App-Header. |
| Seitentitel | Inter | 26 px | 1.20 | 600 | „Galerie", „Pläne", „Berichte". |
| Sektionsüberschrift | Inter | 18 px | 1.25 | 500 | Panel-Titel, Vorschau-Dateiname. |
| Tab-Beschriftung | Inter | 15 px | 1.20 | 500 | „Bilder", „Pläne", „Videos". |
| Body | Inter | 14 px | 1.45 | 400 | Standard-Fliesstext, Beschreibung. |
| Metadaten | Inter | 13 px | 1.45 | 400 | Ersteller, Hochlade-Datum, Kommentar. |
| Schaltfläche | Inter | 14 px | 1.00 | 500 | Beschriftung aller Buttons. |
| Mikrozähler | Inter | 12 px | 1.40 | 500 | Zähler in Tabs (`24`, `28`, `6`). |
| Mono-Daten | JetBrains Mono | 12 px | 1.40 | 400 | Dateigrösse, Version, ID. |
| Leerzustand-Überschrift | Inter | 18 px | 1.30 | 500 | „Keine Medien vorhanden". |

**Keine Versalien.** Nicht in Überschriften, nicht in
Schaltflächen, nicht in Tabs. Titel werden mit Grossbuchstaben
am Satzanfang geschrieben, nicht durchgehend gross.

**Keine kursive Schnitte.** Auch nicht für
Hervorhebungen — Hervorhebung erfolgt durch Gewicht 500/600
oder Farbe `--text-high` / `--color-primary`.

### 5.3 Lokalisierung
- Die Schriften decken **Lateinisch, Lateinisch erweitert A
  und B** ab (für Deutsch, Französisch, Italienisch,
  Rätoromanisch).
- Strings stehen in `src/locales/de-CH.json`,
  `src/locales/fr-CH.json`, `src/locales/it-CH.json`.
  Englische Strings sind in der Oberfläche **nicht
  zulässig**, auch nicht in Tooltips.
- Datums-, Zeit-, Zahlen- und Währungsformate folgen den
  Schweizer Konventionen (siehe Abschnitt 9).

---

## 6. Symbolik (Icons)

### 6.1 Iconbibliothek — Lucide
- **Bibliothek:** Lucide, Strichstärke **1.75** (kräftiger
  als das Lucide-Standardmass von 1.5, weil Baupläne und
  Status-Pillen auf 14-Zoll-Laptops sonst zu zart wirken).
- **Format:** Outline, nie gefüllt, nie zweifarbig.
- **Grössenraster:**
  - **16 px** in Listen-Zeilen, Mikroschaltflächen.
  - **18 px** in Standard-Schaltflächen.
  - **24 px** in Panel-Headern, Formularfeldern.
  - **32 px** in Status-Bereichen, leeren Zuständen.
  - **48 px** in leeren Hauptzuständen.
- **Touch-Target:** Minimum **44 × 44 px** für alle
  Icon-Schaltflächen. Baustellen-Handschuhe können ein
  36-px-Target nicht zuverlässig treffen.
- **Farbe:**
  - Standard: `--text-mid` (`#A3ACB8`).
  - Mauszeiger darüber: `--text-high` (`#F2F4F7`).
  - Aktiv / ausgewählt: `--color-primary` (Salbei).
  - Status: jeweilige Status-Farbe (siehe 4.3).

### 6.2 Symbole, die wir verwenden
Lucide bietet über 1000 Symbole. VisiDoc nutzt eine
**kuratierte Auswahl** von rund 60 Symbolen. Diese Auswahl
ist in `docs/ux/icon-registry.md` gepflegt (geplant).

Beispiele:

| Funktion | Symbol | Lucide-Name |
|---|---|---|
| Bilder-Tab | Bild-Rahmen | `Image` |
| Pläne-Tab | Grundriss-Linien | `Ruler` |
| Videos-Tab | Wiedergabe | `Video` |
| Suchen | Lupe | `Search` |
| Filter | Trichter | `Filter` |
| Sortieren | Auf-/Ab-Pfeile | `ArrowUpDown` |
| Liste / Raster umschalten | Zeilen / Quadrat | `List` / `LayoutGrid` |
| Datei herunterladen | Pfeil nach unten | `Download` |
| Kommentar | Sprechblase | `MessageSquare` |
| Löschen | Mülleimer | `Trash2` |
| Teilen | Verknüpfung | `Share2` |
| Planmarker setzen | Karten-Pin | `MapPin` |
| Hochladen | Wolke mit Pfeil | `UploadCloud` |
| Bestätigen | Haken im Kreis | `CheckCircle2` |
| Warnung | Dreieck mit Ausrufezeichen | `AlertTriangle` |
| Fehler | X im Kreis | `XCircle` |
| Hinweis | i im Kreis | `Info` |
| In Prüfung | Uhr | `Clock` |
| Mehr (Menü) | Drei Punkte | `MoreHorizontal` |
| Schliessen | X | `X` |
| Einstellungen | Zahnrad | `Settings` |
| Benutzer | Personen-Silhouette | `User` |

### 6.3 Symbole, die wir **nicht** verwenden
- **Keine Emojis** in der Oberfläche. Auch nicht als
  Ergänzung zu Texten. Ein grüner Haken kommt von Lucide,
  nicht von Unicode `✅`.
- **Keine Symbole aus mehreren Quellen** mischen. Alles
  Lucide. Niemals Heroicons, Material Symbols, Font Awesome
  daneben.
- **Keine selbst gezeichneten Symbole** in SVG, ausser
  für die Wortmarke.
- **Keine animierten Symbole.** Status-Indikatoren dürfen
  pulsieren, aber niemals dauerhaft rotieren.

---

## 7. Layout und Raster

### 7.1 Standardlayouts
- **Desktop Galerie:** Zweispaltig 60 / 40. Links Liste,
  rechts Vorschau-Panel. Siehe `galerie-medienverwaltung.md`.
- **Desktop Pläne:** Vollflächiger Plan-Viewer mit linker
  Sidebar (Versionen, Positionen) und unterem Tab-Streifen
  (Vorschau / Details / Kommentare / Versionen).
- **Mobile Galerie:** Einspaltig, Vorschau als Bottom-Sheet
  (40 vh).
- **Mobile Fotoaufnahme:** Vollbild, Kamera-UI nativ.

### 7.2 Breakpoints

| Bereich | Breite | Verhalten |
|---|---|---|
| `xl` | ≥ 1280 px | 60 / 40 Split, 24 px Innenabstand. |
| `lg` | 1024 – 1279 px | 55 / 45 Split, 20 px Innenabstand. |
| `md` | 768 – 1023 px | Gestapelt, Vorschau 40 vh Bottom-Sheet. |
| `sm` | < 768 px | Vollbild-Liste, Vorschau als Vollbild-Modal. |

**Kein horizontaler Scroll** an irgendeinem Breakpoint.
**Touch-Targets ≥ 44 × 44 px** an allen Breakpoints.

### 7.3 Raster
- **8-Punkt-Raster** für Abstände und Grössen.
- **Spaltenbreite Desktop:** flexibel, 12-Spalten-Layout mit
  24 px Gutter.
- **Karten-Mindesthöhe:** 64 px (Listenzeilen), 120 px
  (Raster-Kacheln), 320 px (Vorschau-Panel).
- **Inhaltsbreite Lesetexte:** maximal 72 Zeichen pro Zeile.

---

## 8. Komponenten

### 8.1 Schaltflächen

VisiDoc hat **sechs** Schaltflächentypen. Nicht mehr.

| Typ | Hintergrund | Rand | Text | Verwendung |
|---|---|---|---|---|
| **Primär** | `--color-primary` | – | `--text-on-primary` | Maximal eine pro Ansicht. „Speichern", „Hochladen", „Bestätigen". |
| **Sekundär** | `--bg-panel` | 1 px `--border-default` | `--text-high` | Standard-Aktion. „Abbrechen", „Filter". |
| **Geister** (Ghost) | transparent | – | `--text-high` | In dichter Liste. „Mehr anzeigen". |
| **Umrandet** (Outlined) | transparent | 1 px `--color-primary` | `--color-primary` | Sekundär im Vorschau-Panel. „Download", „Planmarker". |
| **Gefahr** (Danger) | transparent | 1 px `--status-error` | `--status-error` | „Löschen". Niemals gefüllt, immer mit Bestätigung. |
| **Link** | – | – | `--color-primary` | Text-Link. „Filter zurücksetzen", „Mehr erfahren". |

**Höhe:** 36 px Standard, 44 px auf Mobile und für
Primäraktionen.

**Icon + Label:** Möglich. Icon links, Label rechts,
8 px Abstand.

**Reihenfolge in Fussleisten:** Links kontextspezifische
Aktionen (Download, Planmarker, Teilen), rechts
Bestätigungs-Aktionen (Löschen, Schliessen). Primärbutton
rechts aussen.

### 8.2 Status-Pillen

Status-Pillen kombinieren **immer Icon + Text + Farbe**.
Nie Farbe allein, nie Text allein.

- **Höhe:** 22 px.
- **Padding:** 4 px vertikal, 10 px horizontal.
- **Radius:** `--radius-pill` (999 px).
- **Hintergrund:** Status-Farbe mit 14 % Alpha
  (`rgba(91, 141, 239, 0.14)`).
- **Text und Icon:** Volle Status-Farbe, 12 px Inter Medium.
- **Icon:** 12 px, 1.5 px Strichstärke.

Beispiele:
- `CheckCircle2` + „Freigegeben" — `--status-warn` (in
  dieser Anwendung ist „in Prüfung" mit Gelb belegt;
  Freigabe zeigt Salwei direkt).
- `Clock` + „In Prüfung" — `--status-warn`.
- `Sparkles` + „Neu" — `--status-info`.
- `AlertCircle` + „Fehler" — `--status-error`.

### 8.3 Listenzeilen (Tabellen)

Listen mit Dateien, Plänen, Kommentaren, Audit-Einträgen
sind das Rückgrat der Anwendung. Sie sind **dicht,
gleichförmig und tastaturbedienbar**.

- **Zeilenhöhe:** 64 px.
- **Spaltenraster:** `40px | 1fr | 140px | 120px | auto`
  (Thumbnail, Name + Untertitel, Datum, Grösse, Aktionen).
- **Thumbnail:** 40 × 40 px, `--radius-small`, leicht
  aufgehellt (`--bg-raised`), nie das Originalfoto ohne
  Skalierung.
- **Datum:** Tabular Figures, rechtsbündig, `--text-mid`.
- **Grösse:** JetBrains Mono, rechtsbündig, `--text-mid`.
- **Auswahl:** 2 px Salbei-Balken links +
  Hintergrund `--bg-raised`. Ganze Zeile ist ein
  `<button>`.
- **Trennlinien:** 1 px `--border-subtle`.

### 8.4 Formularfelder

- **Höhe:** 40 px Standard, 44 px auf Mobile.
- **Hintergrund:** `--bg-panel`.
- **Rand:** 1 px `--border-default`, im Fokus
  2 px `--color-primary` mit 2 px Offset.
- **Label:** Oberhalb des Felds, 13 px Inter Medium,
  `--text-high`.
- **Pflichtfeld-Hinweis:** Sternchen (`*`) in
  `--status-error` direkt am Label.
- **Hilfetext:** Unterhalb des Felds, 12 px Inter Regular,
  `--text-mid`.
- **Fehlertext:** 12 px Inter Medium, `--status-error`,
  mit `AlertCircle`-Icon.

### 8.5 Vorschau-Panel

Das Vorschau-Panel ist der Hauptarbeitsbereich in der
Galerie. Es ist **sticky**, springt beim Scrollen nicht
weg, hat eine eigene Kopf-, Mittel- und Fusszeile.

- **Kopfzeile:** Dateiname (Inter 18 Medium) + Metadaten
  (Ersteller, Datum, Uhrzeit) in `--text-mid`.
- **Mittelteil:** Vorschau füllt den verfügbaren Platz
  (`object-contain` für Bilder, PDF-Viewer für Pläne,
  HTML5-`Video` mit nativen Steuerelementen).
- **Sub-Tabs:** Vorschau / Details / Kommentare / Versionen.
  2 px Salwei-Unterstreichung am aktiven Tab.
- **Fusszeile:** Links sekundäre Aktionen (Download,
  Planmarker, Teilen — alle umrandet), rechts Löschen
  (Gefahr, mit Bestätigung).

### 8.6 Leere Zustände (Empty States)

Leere Zustände sind **kein Bildschirm zum Verzieren**.
Sie sagen, was fehlt, und was als Nächstes zu tun ist.

- **Mittelteil:** 48 px Lucide-Icon in `--text-mid`
  (z. B. `SearchX` bei aktiver Suche ohne Treffer,
  `Image` bei leerer Galerie).
- **Überschrift:** Inter 18 Medium, `--text-high`.
- **Untertitel:** Inter 13 Regular, `--text-mid`, maximal
  zwei Zeilen.
- **Aktion:** Optional, eine Schaltfläche, primär oder
  umrandet, je nach Kontext.

Beispiele:
- Leere Galerie: „Keine Medien vorhanden" +
  „Lade dein erstes Foto oder deinen ersten Plan hoch."
  + Primärbutton „Datei wählen".
- Keine Treffer: `SearchX` + „Keine Treffer für die
  aktuellen Filter." + Link „Filter zurücksetzen".
- Keine Auswahl: `Image` (30 % Alpha) + „Medium auswählen" +
  „Wähle ein Foto, einen Plan oder ein Video in der Liste,
  um Vorschau und Details zu sehen."

---

## 9. Schweizer Konventionen

### 9.1 Sprache
- **Primärsprache MVP:** Schweizer Hochdeutsch (de-CH).
- **Lokalisierung vorbereitet:** Französisch (fr-CH),
  Italienisch (it-CH). Englisch **nicht** in der Oberfläche.
- **Doppel-S statt ß:** Wo beide möglich sind, **ss**
  verwenden, da auf Schweizer Tastaturen kein ß vorhanden
  ist (ausser in Zürich, wo ß üblich ist — Lokalisierung
  entscheidet).
  Beispiele: „Schliessen" statt „Schließen",
  „Masse" statt „Maße", „Strasse" statt „Straße".

### 9.2 Zahlen, Währung, Masse
- **Tausendertrennzeichen:** Apostroph (`'`).
  Beispiel: `1'230.00`, `12'500.00`.
- **Dezimaltrennzeichen:** Punkt (`.`), nicht Komma.
  Beispiel: `1.4 MB`, `2.5 GB`, `0.75 m²`.
- **Währung:** **CHF** (mit führender oder nachgestellter
  Position, je nach Kontext: `CHF 1'230.00` oder
  `1'230.00 CHF`).
- **Masseinheiten:** SI-konform, klein geschrieben, mit
  geschütztem Leerzeichen: `12 m²`, `2.5 m`, `0.75 kg`.
- **Prozent:** Mit geschütztem Leerzeichen, Komma in
  de-CH: `12,5 %` (in der deutschen Schweiz wird im
  Fliesstext oft das Komma verwendet, in technischen Daten
  der Punkt — siehe 9.4).

### 9.3 Datum und Zeit
- **Datum:** `tt.mm.jjjj`. Beispiel: `14.05.2026`.
- **Zeit:** 24-Stunden-Format, `hh:mm`. Beispiel: `14:32`.
- **Datumsbereich:** `14.05. – 18.05.2026`
  (mit Halbgeviertstrich und nicht-brechendem Leerzeichen).
- **Wochentag im Datum:** Nur wenn relevant, dann `Mo, 14.05.2026`.
- **Vollständiger Zeitstempel in Metadaten:**
  `14.05.2026, 14:32`.

### 9.4 Zahlen in technischen Daten
In technischen Daten (Dateigrössen, EXIF, Koordinaten,
Dateinamen) gilt **Punkt** als Dezimaltrennzeichen:
`1.4 MB`, `2.5 GB`, `47.2589° N`.
Im Fliesstext und in Berichten gilt **Komma** als
Dezimaltrennzeichen: `Das Gebäude hat eine Grundfläche
von 1'230,5 m².`

Diese Trennung ist branchenüblich im Schweizer
Bauingenieurwesen und vermeidet Mehrdeutigkeit zwischen
Berichtstext und CAD-/Vermessungsdaten.

### 9.5 Telefon, Postleitzahl, IBAN
- **Telefon:** Format `+41 44 123 45 67` mit
  geschützten Leerzeichen.
- **Postleitzahl:** vierstellig, ohne Prefix, `8001 Zürich`.
- **IBAN:** in Vierergruppen, `CH93 0076 2011 6238 5295 7`.

### 9.6 Pässe und Identifikation
- Bei Anzeige von Personennamen: Vorname + Nachname in
  dieser Reihenfolge, optional mit Anrede davor:
  „Maria Brunner", „Frau Maria Brunner".
- Keine Titel wie „Dr." oder „Prof." in der
  Standardansicht, ausser wenn explizit im Profil
  hinterlegt.

---

## 10. Hosting, Datenschutz, Sicherheit

VisiDoc ist auf **Datenhoheit in der Schweiz** ausgelegt.

- **Hosting:** Datenhaltung in Schweizer Rechenzentren.
  Anbieter mit ISO 27001 und FINMA-konformer Infrastruktur.
- **Schweizer DSG:** Alle personenbezogenen Daten
  (Baustellenfotos, Kommentare, Audit-Logs) werden
  ausschliesslich in der Schweiz gespeichert und
  verarbeitet.
- **Keine Drittstaaten-Übertragung** ohne explizite
  Einwilligung der betroffenen Personen.
- **Aufbewahrungsfristen:** Projektdaten 10 Jahre
  (Aufbewahrungspflicht nach OR), Audit-Logs 2 Jahre
  (rollierend).
- **Löschkonzept:** Auf Antrag des Bauherrn oder nach
  Projektabschluss + Aufbewahrungsfrist vollständige
  Löschung aller personenbezogenen Daten inkl. EXIF
  und Vorschau-Dateien.
- **Verschlüsselung:** TLS 1.3 in der Übertragung,
  AES-256 für gespeicherte Dateien.
- **Berechtigungen:** Vier vordefinierte Rollen
  (Super-Admin, Projektleitung, Bauleiter, Betrachter),
  jede Aktion wird pro Projekt und Rolle geprüft.
- **Audit-Log:** Jede Lese-, Änderungs- und
  Lösch-Aktion wird mit Zeitstempel, Person und
  Ziel-Objekt protokolliert. Audit-Log ist nicht
  löschbar, nur archivierbar.

### 10.1 EXIF und Standort
- Beim Upload werden EXIF-Daten **nicht standardmässig
  entfernt**, aber **GPS-Koordinaten werden serverseitig
  entfernt**, bevor das Medium in der Vorschau erscheint.
- Im EXIF-Panel der Vorschau werden Kameramodell,
  Brennweite, Belichtungszeit und Aufnahme-Datum
  angezeigt, nicht der Standort.

### 10.2 Was wir nicht tun
- **Keine Analyse-Pixel, Heatmaps, Session-Replay-Tools**
  ohne Einwilligung.
- **Keine Drittanbieter-Fonts, die Schriften über
  Google-Fonts-CDN laden.** Alle Schriften sind self-hosted.
- **Keine Werbung, kein Tracking, keine personalisierte
  Inhalte.**
- **Keine Cloud-Aktien von Microsoft, Google oder Amazon
  ausserhalb der Schweiz.**

---

## 11. Barrierefreiheit (Accessibility)

Barrierefreiheit ist im Schweizer KMU-Kontext keine
Kür, sondern Teil der Auftragsvergabe. VisiDoc erfüllt
**WCAG 2.2 Level AA** im MVP und strebt **AAA** an, wo
es ohne Funktionseinbusse möglich ist.

- **Kontrast:** Alle Text-/Hintergrund-Kombinationen sind
  in Abschnitt 4.2 dokumentiert und erfüllen AAA für
  Body-Text (≥ 7 : 1) und AA für Mikroschrift (≥ 4.5 : 1).
- **Tastaturbedienung:** Jede Aktion ist per Tab,
  Umschalt+Tab, Pfeiltasten, Eingabe, Leertaste und
  Escape erreichbar. Sichtbarer Fokus-Ring
  (2 px Salbei, 2 px Offset) auf jedem interaktiven
  Element.
- **Bildschirmleser:** Semantisches HTML (Button statt
  Div, nav, main, aside), ARIA-Labels für Icon-only-
  Schaltflächen, Live-Regionen für Upload-Status.
- **Status:** Wird immer mit Icon + Text + Farbe
  kommuniziert. Nie Farbe allein.
- **Bewegung:** `prefers-reduced-motion` ist
  standardmässig aktiv. Keine Karussells, keine
  Übergangs-Animationen, keine Auto-Play-Videos.
- **Sprache:** `lang="de-CH"` auf `<html>`, ARIA-Labels
  ebenfalls in `de-CH`.
- **Touch:** Alle Touch-Targets ≥ 44 × 44 px.
- **Drucken:** Jede Berichtsansicht hat ein
  `@media print`-Stylesheet, das Salwei auf
  Weiss-Hintergrund druckt, Vorschau-Bilder ohne
  Ränder darstellt und nur Schwarz auf Weiss verwendet.

---

## 12. Mehrsprachigkeit (Lokalisierung)

### 12.1 MVP-Sprache
- **Aktive Sprache:** `de-CH` (Schweizer Hochdeutsch).
- **Strings-Quelle:** `src/locales/de-CH.json`.
- **Keine englischen Strings** in der Benutzeroberfläche.
  Auch nicht in Platzhaltern, Tooltips oder Fehlermeldungen.

### 12.2 Spätere Sprachen
- `fr-CH` (Schweizer Französisch) — Phase 2.
- `it-CH` (Schweizer Italienisch) — Phase 3.
- Rätoromanisch nicht geplant.
- Englisch nur in API-Dokumentation, Admin-Tools und
  Marketing-Material.

### 12.3 Übersetzungs-Workflow
- Alle Strings stehen in JSON-Dateien, niemals hartcodiert
  in Komponenten.
- Pluralformen folgen `Intl.PluralRules` für `de-CH`.
- Datums-, Zeit-, Zahlen- und Währungsformate folgen
  `Intl.DateTimeFormat`, `Intl.NumberFormat` mit
  `locale: "de-CH"`.

### 12.4 Eigennamen und Marken
- Produktname: **VisiDoc** (immer mit korrekter
  Grossschreibung, nie „Visidoc" oder „VISIDOC").
- Dateiendungen, MIME-Types, technische Codes bleiben
  englisch (`pdf`, `jpg`, `application/pdf`).

---

## 13. Konsistenz und Pflege

### 13.1 Single Source of Truth
Diese Datei (`visidoc-DESIGN.md`) ist die **alleinige
Quelle** für Marke, Tokens, Typographie und Komponenten.
Die drei abhängigen Dateien referenzieren sie:

| Datei | Was sie bezieht |
|---|---|
| `stitch-setup-copy-paste.md` | Stitch-Konfigurations-Felder (Farbe, Schrift). |
| `stitch-prompts.md` | 5 Screen-Prompts für Stitch-Renderings. |
| `galerie-medienverwaltung.md` | Token-Tabelle, Tailwind-Beispiele, Kontrastwerte. |

### 13.2 Änderungsprozess
1. Änderung an Tokens / Schriften / Komponenten wird **in
   dieser Datei** gemacht.
2. Alle drei abhängigen Dateien werden in derselben
   Sitzung aktualisiert.
3. Im `CHANGELOG.md` wird die Änderung mit Datum und
   Begründung eingetragen.
4. Screenshots der betroffenen Komponenten werden in
   `docs/ux/figma-screenshots/` (geplant) abgelegt.

### 13.3 Verbotene direkte Eingriffe
- **Keine** Hex-Werte direkt in Komponenten. Immer Token.
- **Keine** Schriftarten direkt per `font-family` in
  Komponenten. Immer über die zentrale
  `typography.css`-Datei.
- **Keine** neuen Status-Farben ohne Eintrag in
  Abschnitt 4.3.
- **Keine** neuen Icon-Symbole ausserhalb der kuratierten
  Auswahl (Abschnitt 6.2) ohne Design-Freigabe.
- **Keine** englischen Strings in Komponenten, auch nicht
  in Entwicklungsphase. Hardcoded Strings werden in der
  Code-Review abgelehnt.

### 13.4 Test- und Beispieldaten
- Für Tests, Stubs und Seed-Daten **keine** echten
  Personennamen, Projekte, Adressen oder Baustellenfotos.
- Beispieldaten klingen echt (z. B. „Neubau
  Bahnhofstrasse 12, 8001 Zürich"), sind aber frei
  erfunden.
- Personen in Beispieldaten: keine Klarnamen aus dem
  Telefonbuch, keine Personen des öffentlichen Lebens.

---

## 14. Was nicht zu dieser Datei gehört

- **Konkrete Komponenten-Implementierung** (React, Vue,
  Svelte): lebt in `apps/web/src/components/`.
- **Storybook-Stories:** leben neben den Komponenten
  als `.stories.ts`.
- **API-Verträge:** leben in `docs/api/openapi.yaml`.
- **Datenmodell:** lebt in `docs/data-model/`.
- **Test-Strategie:** lebt in `docs/testing/`.

Diese Datei beschreibt **das Was und Warum**, nicht
**das Wie der Implementierung**.

---

## 15. Verbindliche Quellen

| Thema | Quelle |
|---|---|
| Marke & Brand | Diese Datei, Abschnitt 2 und 4. |
| UI-Komponenten im Code | `apps/web/src/components/`. |
| API-Verträge | `docs/api/openapi.yaml`. |
| Datenmodell | `docs/data-model/`. |
| Architektur | `docs/ARCHITECTURE.md` (im Projekt-Root). |
| Leistungsumfang | `docs/LEISTUNGSKATALOG.md`. |
| Sicherheit & Datenschutz | `docs/SECURITY_PRIVACY.md`. |
| UI-Standards (übergeordnet) | `docs/UI_STANDARDS.md`. |
| Teststrategie | `docs/TESTING.md`. |
| Leistungskatalog-Quelle | `docs/references/leistungskatalog_baufortschritt_dokumentation.html`. |

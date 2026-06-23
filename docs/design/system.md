# Design-System & UI-Standards

**Zuletzt aktualisiert:** 2026-06-22  
**Verantwortlich:** Frontend/UI Agent  
**Status:** APPROVED  
**Bezug:** `frontend/prototypes/DESIGN.md`, `PROTOTYP.md`, `docs/design/prototype-spec.md`

> **Kanonischer Ort dieser Datei:** `docs/design/system.md`  
> Die Datei `UI_STANDARDS.md` im Root leitet hierher weiter.

---

## Zweck

Verbindliche UI-Regeln für die produktive BauDoc-Anwendung: Layout, Komponenten, Farben, Typografie, Barrierefreiheit und Formatierung. Gilt ab BD-005 (Vue PWA Grundstruktur).

## Geltungsbereich

Verbindlich für alle Frontend-Änderungen ab Phase 3. Abweichungen erfordern explizite Freigabe.

---

## Allgemeine UI-Prinzipien

BauDoc ist ein Arbeitswerkzeug für Baustelle, Bauleitung und Projektverwaltung. Die Oberfläche soll ruhig, dicht, klar und wiederholbar sein. Keine marketinghaften Hero-Flächen, dekorativen Effekte oder unnötigen Layout-Spielereien in der produktiven App.

## Layout-Regeln

- Mobile-first für Fotoaufnahme und schnelle Baustellenarbeit.
- Desktop-optimiert für Planviewer, Galerie, Filter und Administration.
- Keine horizontalen Scrollflächen.
- Stabile Container, klare Navigation und wiederholbare Abstände.
- Keine globalen Layoutänderungen ohne UI-Agent.

## Komponenten-Regeln

- Wiederverwendbare Komponenten für Buttons, Felder, Listen, Tabellen, Modale, Filter und Status.
- Bedienelemente müssen klare Zustände haben: normal, hover, focus, disabled, loading, error.
- Icons konsistent verwenden.
- Keine Businesslogik in UI-Komponenten verstecken.

## Formular-Regeln

- Labels immer sichtbar.
- Pflichtfelder markieren.
- Fehler direkt am Feld und verständlich anzeigen.
- Touch-Ziele für mobile Nutzung ausreichend groß.
- Serverseitige Validierungsfehler sauber abbilden.

## Tabellen-Regeln

- Dichte Desktop-Ansicht für Projektleitung.
- Responsive Alternative für mobile Ansichten.
- Sortier- und Filterstatus sichtbar machen.
- Leere Zustände und Ladezustände anzeigen.

## Dashboard-Regeln

- Nur relevante Projekt-, Upload-, Plan- und Audit-Signale anzeigen.
- Keine dekorativen Kennzahlen ohne Arbeitswert.
- Kritische Zustände klar priorisieren.

## Navigation

- Projektkontext immer sichtbar halten.
- Mobile Navigation einfach und robust gestalten.
- Admin-, Projekt- und Aufnahmebereiche trennen.

## Responsive Verhalten

- Mobile Baustellen-Smartphones sind Kernziel.
- Desktop-Layouts dürfen dichter sein, aber nicht überladen.
- Planviewer braucht stabile Zoom-/Pan-Bedienung.

## Barrierefreiheit

- Tastaturbedienung.
- Sichtbare Fokuszustände.
- Ausreichende Kontraste.
- ARIA-Labels, wo nötig.
- Fehlermeldungen in verständlicher Sprache.
- Informationen nicht nur über Farbe vermitteln.

## Farben

Arbeitsfähige Grundpalette (Dark Theme):

| Token | Wert | Verwendung |
|---|---|---|
| Hintergrund | `#0f1720` | App-Hintergrund |
| Panel | `#151f2b` | Sidebar, Karten |
| Panel 2 | `#1c2938` | Nested Panels |
| Text hell | `#f3f6f9` | Primärer Text |
| Sekundärtext | `#aab7c4` | Labels, Metadaten |
| Linie | `#2c3b4d` | Trennlinien, Borders |
| Primärakzent | `#41b6c4` | CTAs, Links |
| Sekundärakzent | `#7c8cff` | Sekundäre Aktionen |
| Erfolg | `#5dd39e` | Status: OK |
| Warnung | `#f5c768` | Status: Warnung |
| Fehler | `#ff7b7b` | Status: Fehler |

> Operative Design-Tokens (CSS-Variablen) sind in `frontend/prototypes/app-shell.css` und `frontend/prototypes/DESIGN.md` definiert. Diese Farbpalette ist der fachliche Referenzrahmen.

Helle Arbeitsflächen für Tabellen oder Dokumentansichten sind erlaubt, wenn Kontrast und Lesbarkeit stimmen.

## Typografie

- System UI oder freigegebene Unternehmensschrift.
- Mindestgröße Mobile: 16 px für Fließtext und Eingaben.
- Keine ungewollten Uppercase-Stile.
- Lesbarkeit auf Baustellen-Geräten priorisieren.

## Abstände

- Einheitliche Abstandslogik verwenden.
- Dichte Oberflächen nur mit klarer visueller Trennung.
- Touch-Ziele nicht zugunsten von Dichte verkleinern.

## Buttons

- **Primary:** Hauptaktionen — Foto aufnehmen, Plan hochladen, speichern.
- **Secondary:** Navigation, Filter, Abbrechen.
- **Danger:** Löschen, Rechte entziehen, Archivierung.
- **Disabled:** sichtbar, aber nicht interaktiv.

## Fehlermeldungen

- Direkt, verständlich und handlungsorientiert.
- Keine technischen Interna.
- Sicherheitsrelevante Fehler nicht zu detailliert.

## Ladezustände

- Upload-, Speicher-, Galerie- und Planviewer-Ladezustände explizit anzeigen.
- Doppelte Submit-Aktionen verhindern.

## Leere Zustände

- Leere Projekt-, Plan-, Foto- und Filteransichten erklären, ohne Marketingtext.
- Nächste sinnvolle Aktion anbieten, falls berechtigt.

## Bestätigungsdialoge

- Für Löschung, Archivierung, Rechteentzug und kritische Planänderungen.
- Auswirkungen klar benennen.
- Keine destruktive Standardauswahl.

## Formatregeln

| Format | Standard | Beispiel |
|---|---|---|
| Datum | `tt.mm.yyyy` | `22.06.2026` |
| Zeit | `HH:MM` | `14:32` |
| Währung | `CHF` | `CHF 1'230.00` |
| Beträge | `1'230.00` | Hochkomma als Tausendertrenner |

## Nicht erlaubte UI-Muster

- Marketing-Hero als App-Start.
- Dekorative Kartenflächen ohne Arbeitswert.
- Versteckte Labels in Formularen.
- Ausschließlich farbliche Statuskommunikation.
- Unklare Icon-only-Aktionen ohne Tooltip oder Label.

## Übergabe von Stitch-/Design-Exports

Wenn ein Stitch-UI oder Design-Export im Projektordner liegt, muss dieser zuerst analysiert und so exakt wie technisch sinnvoll übernommen werden. Farben, Abstände, Schriften, Radien und Layouts dürfen nicht eigenmächtig geändert werden.

## Änderungshistorie

| Datum | Änderung | Autor |
|---|---|---|
| 2026-06-22 | Migriert nach `docs/design/system.md` (kanonisch) | Restructuring |

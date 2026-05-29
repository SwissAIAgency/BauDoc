# UI Standards

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

Arbeitsfähige Grundpalette:

- Hintergrund dunkel: `#0f1720`
- Panel: `#151f2b`
- Panel 2: `#1c2938`
- Text hell: `#f3f6f9`
- Sekundärtext: `#aab7c4`
- Linie: `#2c3b4d`
- Primärakzent: `#41b6c4`
- Sekundärakzent: `#7c8cff`
- Erfolg: `#5dd39e`
- Warnung: `#f5c768`
- Fehler: `#ff7b7b`

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

- Primary für Hauptaktionen wie Foto aufnehmen, Plan hochladen, speichern.
- Secondary für Navigation, Filter und Abbrechen.
- Danger für Löschen, Rechte entziehen und Archivierung.
- Disabled sichtbar, aber nicht interaktiv.

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

- Datum: `tt.mm.yyyy`
- Zeit: `14:32`
- Währung: `CHF`
- Beträge: `1'230.00`

## Nicht erlaubte UI-Muster

- Marketing-Hero als App-Start.
- Dekorative Kartenflächen ohne Arbeitswert.
- Versteckte Labels in Formularen.
- Ausschließlich farbliche Statuskommunikation.
- Unklare Icon-only-Aktionen ohne Tooltip oder Label.

## Übergabe von Stitch-Designs

Wenn ein Stitch-UI oder Design-Export im Projektordner liegt, muss dieser zuerst analysiert und so exakt wie technisch sinnvoll übernommen werden. Farben, Abstände, Schriften, Radien und Layouts dürfen nicht eigenmächtig geändert werden.

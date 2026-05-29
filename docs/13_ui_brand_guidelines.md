# 13 UI Brand Guidelines

## Ziel

Die Applikation ist ein Arbeitswerkzeug für Baustelle, Bauleitung und Projektverwaltung. Die UI soll ruhig, dicht, klar und wiederholbar sein. Marketinghafte Hero-Flächen, dekorative Karten und unnötige Effekte gehören nicht in die produktive App-Oberfläche.

## Logo-Regeln

- Nur freigegebene Logo-Dateien verwenden.
- Keine Verzerrung.
- Keine Farbänderung ohne Brand-Freigabe.
- Mindestabstand um das Logo einhalten.
- Keine Logos als unscharfe Screenshots verwenden.

## Farben

Arbeitsfähige Grundpalette, abgeleitet aus der Leistungskatalog-Referenz:

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

Für lange Arbeitsflächen darf ein helles Tabellen-/Dokumentenlayout zusätzlich definiert werden, solange Kontrast und Lesbarkeit stimmen.

## Typografie

- Primärschrift: System UI oder freigegebene Unternehmensschrift.
- Mindestgrösse Mobile: 16 px für Fliesstext und Eingaben.
- Kontrolltext bewusst definieren, keine Browser-Defaults.
- Keine ungewollten Uppercase-Stile.
- Hohe Lesbarkeit auf mobilen Baustellen-Geräten.

## Komponenten

Buttons:

- Primary: Hauptaktion wie Foto aufnehmen, Plan hochladen, speichern.
- Secondary: Navigation, Filter, Abbrechen.
- Danger: Löschen, Rechte entziehen, Archivierung.
- Disabled: sichtbar, aber nicht interaktiv.

Formulare:

- Labels immer sichtbar.
- Fehler klar anzeigen.
- Pflichtfelder markieren.
- Tastaturbedienung ermöglichen.
- Mobile Eingaben mit grossen Touch-Zielen.

Tabellen und Listen:

- Responsive Verhalten definieren.
- Leere Zustände anzeigen.
- Ladezustände anzeigen.
- Filterstatus sichtbar machen.
- Dichte Desktop-Ansicht für Projektleitung.

Planviewer:

- Marker präzise setzbar.
- Planversion immer sichtbar.
- Zoom/Pan darf keine Metadaten verdecken.
- Koordinaten bleiben relativ zum Plan.

Galerie:

- Datum, Ort, Gewerk und Kommentar schnell erfassbar.
- Filter nach Zeitraum, Projektstruktur und Gewerk.
- Berechtigungsstatus darf nicht nur farblich angezeigt werden.

## Layout

- Mobile-first für Aufnahmefluss.
- Desktop für Planviewer, Galerie und Admin.
- Einheitliche Containerbreiten und Abstände.
- Kein horizontaler Scroll.
- Keine globalen Layoutänderungen ohne UI-Agent.

## Assets

- Bilder komprimieren.
- Alt-Texte verwenden.
- Icons konsistent halten.
- SVG für Logos und Icons.
- WebP/AVIF für App-Bilder, PNG nur wenn nötig.

## Accessibility

- Tastaturbedienung.
- sichtbare Fokuszustände.
- ausreichender Kontrast.
- Aria-Labels, wo nötig.
- verständliche Fehlermeldungen.
- Touch-Ziele für mobile Nutzung.

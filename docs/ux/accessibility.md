# Accessibility

## Ziele

Die Anwendung muss auf Baustellen-Smartphones und Desktop-Arbeitsplätzen robust bedienbar bleiben. Barrierefreiheit ist Teil der Nutzbarkeit und QA.

## Anforderungen

- Sichtbare Fokuszustände.
- Tastaturbedienung für interaktive Elemente.
- Ausreichender Farbkontrast.
- Labels für Formularfelder.
- ARIA-Labels für Icon-only-Aktionen, falls verwendet.
- Fehlermeldungen verständlich und nicht nur farblich.
- Touch-Ziele für mobile Nutzung ausreichend groß.

## Prüfpunkte

- Kein horizontaler Scroll auf mobilen Hauptflows.
- Planviewer-Controls überdecken keine wichtigen Metadaten.
- Filterstatus ist textlich erkennbar.
- Berechtigungsstatus wird nicht nur über Farbe dargestellt.
- Lade- und Leerzustände sind verständlich.

## Tests

- Tastatur-Navigation.
- Screenreader-Grundprüfung für Formulare.
- Kontrastprüfung.
- Mobile Viewport-Prüfung.
- Fehlerzustände und Validierungsmeldungen.

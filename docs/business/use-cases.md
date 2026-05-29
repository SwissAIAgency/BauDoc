# Use Cases

## Hauptquelle

Abgeleitet aus `docs/references/leistungskatalog_baufortschritt_dokumentation.html`.

## UC-001 Projekt anlegen

Ein Projektleiter oder Organisationsadministrator legt ein Bauprojekt mit Grunddaten an und bereitet Gebäude, Etagen, Räume und Gewerke vor.

Akzeptanz:

- Projekt ist einer Organisation zugeordnet.
- Zugriff ist rollenbasiert beschränkt.
- Projektstruktur kann später für Fotos, Pläne und Filter verwendet werden.

## UC-002 Plan hochladen und versionieren

Ein berechtigter Nutzer lädt einen Plan hoch und erstellt bei Änderungen eine neue Planversion.

Akzeptanz:

- Planversionen bleiben historisch nachvollziehbar.
- Bestehende Foto-Planpositionen verweisen weiter auf ihre ursprüngliche Planversion.
- Pläne sind privat gespeichert.

## UC-003 Foto aufnehmen und verorten

Ein Baustellennutzer nimmt ein Foto auf, ordnet es Projekt, Raum, Gewerk und optional einer Planposition zu.

Akzeptanz:

- Foto wird privat gespeichert.
- Metadaten werden validiert.
- Optionaler Planmarker nutzt relative Koordinaten und konkrete Planversion.
- Upload wird auditiert.

## UC-004 Baufortschritt filtern

Ein Projektleiter oder Bauleiter filtert Fotos nach Zeitraum, Ort, Gewerk und Berechtigung.

Akzeptanz:

- Nur berechtigte Fotos erscheinen.
- Filterzustand ist nachvollziehbar.
- Leere Ergebnisse werden verständlich angezeigt.

## UC-005 Kommentare erfassen

Ein berechtigter Nutzer ergänzt einen Textkommentar zu einem Foto.

Akzeptanz:

- Kommentar ist dem Foto und Nutzer zugeordnet.
- Zugriff folgt Foto- und Projektberechtigungen.
- Kommentar kann personenbezogene Daten enthalten und wird entsprechend geschützt.

## UC-006 Audit nachvollziehen

Ein Administrator oder Projektleiter prüft kritische Aktionen wie Login, Upload, Ansicht, Download oder Rechteänderung.

Akzeptanz:

- Kritische Aktionen sind datensparsam protokolliert.
- Audit-Logs sind nicht öffentlich.
- Retention-Regeln werden vor produktiver Nutzung finalisiert.

## Nicht im MVP

- Native App.
- Offline-Synchronisation.
- KI-Bildanalyse.
- 360-Grad-Viewer.
- Vollständiges Mängelmanagement.
- Produktive Drittintegrationen.

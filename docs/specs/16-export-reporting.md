# Spec 16 — Export & Reporting

**Status:** APPROVED (Konzept verbindlich) · **Bau:** post-MVP · **Bezug:** D-043, D-044
**Source of Truth für:** Projekt-Export, PDF-Baufortschrittsbericht

## Zweck

Datenmitnahme (DSG-Portabilität, Lock-in-Vermeidung) und präsentationsfertige Berichte.

## Festlegungen

### Projekt-Export
- **Asynchron** erzeugtes ZIP je Projekt (Queue → ZIP → signierter Download).
- Inhalt: Originaldateien + strukturierte Metadaten (JSON/CSV inkl. Planpositionen) + generierter PDF-Bericht.
- Vermeidet Request-Timeouts bei großen Projekten; Zugriff rechte-/auditgeprüft.

### PDF-Baufortschrittsbericht
- Fotos **chronologisch**, gruppiert nach Zeitraum/Ort/Gewerk.
- Je Foto: Metadaten + **Planmarker-Ausschnitt**.
- Aktive Filter (Zeitraum/Gewerk) bestimmen den Berichtsinhalt.
- Optionaler **Audit-Anhang** (wer/wann erfasst/freigegeben) für Prüf-/Streitfälle.

## Abhängigkeiten / Verweise

- [[05-media-pipeline]] · [[06-plan-management-viewer]] · [[03-audit-logging]] (Audit-Anhang) · [[09-system-architecture]] (Queue)

## Akzeptanzkriterien

- Export großer Projekte läuft asynchron ohne Timeout; Download nur über signierte URL nach Rechteprüfung.
- ZIP enthält Originale + maschinenlesbare Metadaten + PDF-Bericht.
- PDF-Bericht respektiert die gesetzten Filter und zeigt Planmarker-Ausschnitte.

## Offene Punkte

- Berichts-Layout/Branding-Vorlage; CSV- vs. JSON-Detailtiefe.

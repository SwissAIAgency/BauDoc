# Spec 17 — Daten-Import / Migration

**Status:** APPROVED (Konzept verbindlich) · **Bau:** post-MVP · **Bezug:** D-045, D-046
**Source of Truth für:** Bulk-Import von Bestandsdaten, Struktur-/Metadaten-Mapping

## Zweck

Übernahme bestehender Fotos/Pläne/Strukturen aus Altsystemen/Ordnern bei konsistenter Qualität und Sicherheit.

## Festlegungen

- **Bulk-Import durch dieselbe Upload-Pipeline** wie normale Uploads ([[05-media-pipeline]]):
  EXIF-Extraktion, **Malware-Scan**, Thumbnails, Audit — kein Umgehen der Guardrails.
- **Mapping:** Ordnerhierarchie (Projekt/Etage/Gewerk…) + EXIF (Datum/GPS) werden automatisch auf die Zielstruktur
  (Gebäude/Etage/Raum/Gewerk) gemappt.
- **Bestätigungsschritt** vor dem Commit: Nutzer prüft/korrigiert das vorgeschlagene Mapping.
- Import läuft asynchron (Queue), mit Fortschritts-/Fehlerprotokoll.

## Abhängigkeiten / Verweise

- [[05-media-pipeline]] · [[06-plan-management-viewer]] (Plan-Import) · [[03-audit-logging]] · [[10-data-model]]

## Akzeptanzkriterien

- Importierte Dateien durchlaufen Scan + EXIF + Audit wie reguläre Uploads.
- Vorgeschlagenes Mapping ist vor Commit einsehbar/korrigierbar.
- Fehlerhafte Einzeldateien brechen den Gesamt-Import nicht ab (Teil-Erfolg + Protokoll).

## Offene Punkte

- Unterstützte Quellformate/Ordnerkonventionen; Plan-Versionszuordnung beim Import.

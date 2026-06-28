# Spec 18 — Erfassungs-Features (QR, Mängel-Light, Audio)

**Status:** APPROVED · **Bau:** post-MVP · **Bezug:** D-047, D-048, D-049
**Source of Truth für:** QR-Codes, Mängel-Light, Sprachkommentare

## Zweck

Die Erfassung auf der Baustelle beschleunigen und anreichern, ohne Scope in Richtung Vollsysteme zu öffnen.

## Festlegungen

### QR-Codes
- Generier-/druckbare QR je **Raum/Planbereich**; Scan in der PWA füllt Projekt/Gebäude/Etage/Raum automatisch
  und startet die Aufnahme. Stützt auch die spätere Auto-Verortung ([[07-auto-plan-assignment]]).
- Datenmodell: `rooms.qr_token` (bzw. je Planbereich).

### Mängel-Light
- Foto als **Mangel** markierbar: Status (offen/in Arbeit/behoben), optional Zuständiger + Frist.
- Wiederverwendet Kommentare + Benachrichtigungen ([[13-notifications]]). **Kein** volles Mängelmanagement (Nicht-Ziel).
- Datenmodell: `photos.is_defect`, `defect_status`, `defect_assignee_id?`, `defect_due_date?`.

### Audio-Kommentare
- Sprachkommentar am Foto aufnehmen + privat ablegen (`photo_audio_comments`).
- Automatische **Transkription** folgt in der KI-Phase ([[11-ai-integration]]). Erfassung jetzt, Auswertung später.

## Abhängigkeiten / Verweise

- [[20-mobile-pwa]] (Scan/Aufnahme) · [[07-auto-plan-assignment]] · [[13-notifications]] · [[11-ai-integration]] · [[05-media-pipeline]]

## Akzeptanzkriterien

- QR-Scan setzt den Aufnahmekontext korrekt und startet die Aufnahme.
- Mangel-Status + optional Zuständiger/Frist sind setzbar; Zuweisung löst Benachrichtigung aus.
- Audiodatei wird privat gespeichert und ist später transkribierbar (Feld vorhanden).

## Offene Punkte

- QR-Inhalt/Format (deep link vs. token) und Druck-Workflow.

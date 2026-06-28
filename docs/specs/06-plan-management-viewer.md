# Spec 06 — Planverwaltung, Versionierung, Viewer & Kalibrierung

**Status:** APPROVED · **Bau:** MVP (Kalibrierungs-Erfassung MVP, Auto-Nutzung V2) · **Bezug:** D-034 (+ D-013 für Kalibrierung)
**Source of Truth für:** Pläne, Planversionen, Plan-Viewer, Plan-Kalibrierung

## Zweck

Pläne projektbezogen verwalten, versionieren und anzeigen; Basis für manuelle Planpositionen und (V2) Auto-Zuordnung.

## Festlegungen

### Pläne & Versionen
- `plans` (pro Projekt, nach Plangattung), `plan_versions` **unveränderlich**.
- Neue Version erzeugt unveränderliche Referenz; alte Versionen bleiben für historische Planpositionen erhalten.
- Neue Planversion → Benachrichtigung über Queue ([[13-notifications]]).

### Plan-Viewer
- **MVP:** clientseitiges Rendering von PDF/Bild via `pdf.js` (kein Render-Server).
- **V2 (bei Performance-Bedarf):** server-seitiges Deep-Zoom-**Tiling** großer Pläne (A0) beim Upload.

### Plan-Kalibrierung (Georeferenzierung)
- Berechtigter Nutzer (`plan.calibrate`) setzt einmalig pro Planversion 2–3 bekannte Punkte + deren reale Koordinaten.
- Daraus **affine Transformation** (Rotation + Skalierung + Offset) + Nordrotation, gespeichert je `plan_version`.
- Kalibrierung ist versionsstabil; Voraussetzung für [[07-auto-plan-assignment]].

### Planpositionen (manuell, MVP)
- Nutzer setzt Marker auf konkreter Planversion; **normalisiert-relative x/y (0..1)** + Richtung werden gespeichert (`photo_locations`) — Koordinatenmodell + Verifikation: [[31-plan-position-verification]].
- Ein Bild mit Planmarkierung referenziert **immer** eine konkrete Planversion.

## Datenmodell (Delta)

- `plan_versions.calibration` (JSONB: Referenzpunkte, affine Transform, Nordrotation).
- `photo_locations` (manuell): x/y **normalisiert-relativ (0..1)**, `direction_angle`, `plan_version_id`.

## Abhängigkeiten / Verweise

- [[07-auto-plan-assignment]] · [[05-media-pipeline]] · [[02-rbac-permissions]] · [[13-notifications]] · [[31-plan-position-verification]]

## Akzeptanzkriterien

- Neue Planversion lässt historische Planpositionen unverändert auf alte Version zeigen.
- Plan mit 2-Punkt-Kalibrierung speichert eine reproduzierbare affine Transformation.
- Manueller Marker speichert normalisiert-relative Koordinaten (0..1) + Richtung + Planversion; Round-Trip-treu (siehe [[31-plan-position-verification]]).
- A0-PDF ist im Viewer flüssig zoom-/navigierbar (MVP-Schwelle definieren).

## Offene Punkte

- Schwellwert, ab dem Server-Tiling (V2) nötig wird.

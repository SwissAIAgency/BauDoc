# Spec 07 — Automatische Plan-Zuordnung

**Status:** APPROVED (Spezifikation) · **Bau:** V2 · **Bezug:** D-013, D-027
**Source of Truth für:** automatische Verortung von Fotos auf dem Plan

## Zweck

Aus Foto-Metadaten (GPS + Azimut) automatisch x/y-Position und Blickrichtung auf der bekannten Planversion vorschlagen.
V1 bleibt manuell ([[06-plan-management-viewer]]); manuelles Setzen bleibt immer Fallback und Override.

## Festlegungen

### Voraussetzung
- Kalibrierte Planversion (affine Transformation, [[06-plan-management-viewer]]).
- Plan/Stockwerk ist aus dem Aufnahme-Flow bereits bekannt → die Automatik bestimmt **nur** x/y + Blickrichtung.

### Algorithmus
1. Foto-GPS (Lat/Lng) → Plan-Eigenkoordinaten → **normalisiert-relativ (0..1)** via affine Transform der kalibrierten Planversion (Koordinatenmodell: [[31-plan-position-verification]]).
2. EXIF-Azimut (`GPSImgDirection`) → Blickrichtungspfeil, korrigiert um die Plan-Nordrotation der Kalibrierung.
3. **Confidence-Score** aus GPS-Genauigkeit (`GPSHPositioningError`/DOP), Azimut-Vorhandensein, Kalibrierqualität.

### Verhalten
- Ergebnis ist immer ein **Vorschlag** mit Confidence (best-effort + Graceful Degradation), kein verbindlicher Eintrag.
- Nutzer bestätigt/korrigiert; bei niedriger Confidence klarer Hinweis.

### Machbarkeits-Vorbehalt
- **Technischer Spike vor V2-Bau:** reale Kompass-/GPS-Genauigkeit auf Ziel-Geräten validieren
  (iOS Safari `webkitCompassHeading` braucht Permission + HTTPS; magnetische Störungen durch Baustahl). Siehe [[20-mobile-pwa]].

## Datenmodell (Delta)

- `photo_locations` erweitert: `source` (`manuell`|`auto`), `confidence`, `gps_accuracy`, `auto_suggested_at`.

## Abhängigkeiten / Verweise

- [[06-plan-management-viewer]] · [[05-media-pipeline]] · [[20-mobile-pwa]] · [[31-plan-position-verification]]

## Akzeptanzkriterien

- Plan mit 2-Punkt-Kalibrierung: bekanntes Test-GPS landet am erwarteten Plan-x/y innerhalb definierter Toleranz (Ground-Truth/Toleranz: [[31-plan-position-verification]]).
- Azimut erzeugt korrekt rotierten Richtungspfeil (Plan-Nordrotation berücksichtigt).
- Fehlt GPS/Azimut, wird kein Vorschlag erzwungen; manuelle Eingabe bleibt verfügbar.
- Confidence wird gespeichert und in der UI angezeigt.

## Offene Punkte

- Toleranzschwelle (Meter/Pixel) und Confidence-Schwellen für Auto-Annahme vs. Nachfrage.

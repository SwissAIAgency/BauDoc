# Spec 31 — Planposition: Koordinatenmodell & Verifikation

**Status:** APPROVED · **Bau:** MVP (Modell + L1–L3); V2-Genauigkeit mit Auto-Zuordnung · **Bezug:** D-081, D-082, D-083
**Source of Truth für:** Planpositions-Koordinatensystem, Korrektheits-Definition, Prüfstrategie/Akzeptanz

## Zweck

Definiert, *wie* eine Planposition gespeichert wird und *wie wir beweisen*, dass Fotos an der richtigen Stelle auf
dem Plan erscheinen. Gemeinsame Grundlage für manuelles Marker-Setzen ([[06-plan-management-viewer]]) und
Auto-Zuordnung ([[07-auto-plan-assignment]]).

## Koordinatenmodell (D-081)

- **Speicherung: normalisiert-relativ `(0..1)`** der Plan-Eigenbreite/-höhe — auflösungs-, zoom-, geräte- und DPI-unabhängig.
- Der affine Transform der Kalibrierung (V2) liefert **Plan-Eigenkoordinaten**, die vor dem Speichern **normalisiert** werden.
  Es werden **nie Bildschirm-Pixel** persistiert.
- Render: der Marker nutzt **dieselbe Viewport-Transformation** (Zoom/Pan) wie das Planbild → Bildschirmposition =
  `relativ × aktuelle Rendergröße`. Dadurch bleibt der Marker bei jedem Zoom/Gerät am selben Plan-Punkt.
- Bindung an `plan_version_id` (historisch stabil); `direction_angle` um die Plan-Nordrotation der Kalibrierung korrigiert.

## „Richtig angezeigt" = vier Bedingungen

1. **Richtiger Plan + Version** — Marker auf der Version, auf der er gesetzt wurde (auch nach Plan-Update).
2. **Richtige Stelle** — gespeicherter Punkt = geklickter/berechneter Ort (Round-Trip-treu).
3. **Stabil über Zoom/Gerät/DPI** — Marker bleibt am selben Plan-Punkt.
4. **V2: Auto in Toleranz + richtige Blickrichtung** — GPS→x/y innerhalb Toleranz, Pfeil korrekt rotiert.

## Verifikations-Ebenen (D-082)

| Ebene | Was | Beweist |
|---|---|---|
| **L1 Unit** | Transform-Mathematik (Kalibrierpunkte→Ausgabe, Normalisierung, Azimut/Nord) | Rechen-Korrektheit (Bedingung 4) |
| **L2 Round-Trip + Zoom-Invarianz** | setzen→speichern→neu rendern in mehreren Größen/Zoomstufen | Bedingungen 2 + 3 |
| **L3 Visual-Regression** | Plan+Marker rendern, Pixel-Diff gegen Golden-Screenshot | Render-Drift |
| **L4 Feld-Abnahme** | Bauleiter gleicht Marker vor Ort mit Realität ab (vor V2-Aktivierung) | Mess-/Modellfehler (Bedingung 4) |

- **L1–L3 automatisiert als CI-Pflicht-Gate**; Versionsbindung (Bedingung 1) wird in L2 mitgetestet
  (Plan-Update → historischer Marker bleibt auf alter Version).

## V2-Genauigkeit: Ground-Truth & Toleranz (D-083)

- **Synthetischer Test-Plan** mit exaktem, bekanntem Koordinaten-Mapping → deterministische CI-Fixtures.
- **Real vermessene Validierungs-Site** als Realitäts-Check.
- **Toleranz:** Position ≤ ~2–3 % der Planbreite; Blickrichtung ≤ ±10° (Feinwerte beim V2-Bau bestätigen).

## Abhängigkeiten / Verweise

- [[06-plan-management-viewer]] (manuell, Kalibrierung) · [[07-auto-plan-assignment]] (affine Transform/Confidence)
- [[20-mobile-pwa]] (Sensoren) · `docs/testing/strategy.md` (CI-Einbettung)

## Akzeptanzkriterien

- Keine Planposition wird in Bildschirm-Pixeln gespeichert (nur normalisiert-relativ 0..1).
- Round-Trip: Marker bei (0.32 / 0.71) erscheint nach Reload in beliebiger Rendergröße/Zoomstufe an derselben Plan-Stelle (± ε).
- Plan-Update lässt historische Marker unverändert auf ihrer Planversion.
- Golden-Screenshot-Diff schlägt bei Marker-/Transform-Drift fehl.
- V2: synthetisches Ground-Truth-GPS landet innerhalb Toleranz; Azimut-Pfeil innerhalb ±10°.

## Offene Punkte

- Feinwerte der V2-Toleranz; Auswahl der Visual-Regression-/Screenshot-Toolchain.

# Konzeptbericht: Galerie — Mobile-Ansicht

> Status: Entwurf · Datum: 2026-06-23 · Bezug: `frontend/prototypes/index.html`
> (`renderGalerieMobile`, `#vd-gal-mobile`, `MEDIA`)

## 1. Ausgangslage (Ist-Zustand im Code)

Die mobile Galerie (`≤900px`) rendert heute über `renderGalerieMobile(list)` ein
**nach Monat gruppiertes 2-Spalten-Raster** (`galMonthLabel` → „Juni 2026") mit
sticky Monats-Header. Jede Kachel (`galMobileCellHTML`) zeigt:

- Thumbnail (4:3, Foto/Plan/Video),
- ersten Tag als Overlay-Chip,
- Name,
- `Datum · Ersteller`.

Filter laufen über horizontale Pills (`typ`, `planposition`, `zeitraum`,
`ersteller`, `tags`) + Suche. Sortierung: neueste zuerst (Default). Die Liste
ist dieselbe wie Desktop (`renderGalerie` → `MEDIA.filter(galMatches)`), nur
anders angeordnet.

**Datenfelder pro Medium (`MEDIA`):** `id`, `type` (`photo|plan|video`), `name`,
`date` (`DD.MM.YYYY`), `time`, `creator`, `planposition`, `tags[]`, `src`.

## 2. Nutzungskontext (warum überhaupt ändern)

Der mobile Nutzer ist **vor Ort auf der Baustelle**. Zwei Bedürfnisse, die sich
abwechseln — oft im Minutentakt:

1. **Erfassen** — schnell Fotos vom aktuellen Stand machen (primär, häufig).
2. **Nachschauen** — „Was wurde gestern / diese Woche gemacht?", „Wie sah die
   Stelle vor dem Verputzen aus?" (sekundär, aber entscheidend für Entscheidungen
   direkt am Bau).

Die heutige **Monats-Gruppierung** bedient keinen der beiden gut: Sie ist eine
Archiv-Logik. Vor Ort interessiert die **Zeitachse in Tagen**, nicht in Monaten.

## 3. Kernprobleme heute

| # | Problem | Auswirkung vor Ort |
|---|---------|--------------------|
| P1 | Gruppierung nach **Monat** | „Gestern" ist nicht auffindbar — alles liegt im selben Block „Juni 2026". |
| P2 | Kein **Schnell-Einstieg** für Zeit | Zeitfilter steckt in einer Pill (`zeitraum`), die man erst antippen/durchklicken muss. |
| P3 | Kachel **textlastig** | Name + Datum + Ersteller + Tag konkurrieren; bei Sonnenlicht/Handschuhen schwer scanbar. |
| P4 | **Erfassen ↔ Nachschauen** nicht verbunden | FAB erfasst; aber kein direkter „heute schon X Fotos"-Bezug oder Recap-Einstieg. |
| P5 | Kein **leerer-Tag-Zustand** | Ein Tag ohne Fotos ist unsichtbar statt „heute noch nichts dokumentiert → jetzt aufnehmen". |

## 4. Konzept-Empfehlungen (priorisiert)

### A. Tag-Gruppierung statt Monat  *(größter Hebel, kleiner Eingriff)*

Gruppiere die mobile Liste nach **Kalendertag** mit menschenlesbaren Labels
relativ zum Referenzdatum:

- `Heute` · `Gestern` · sonst `Wochentag, DD.MM.` (z. B. „Mo, 22.06.")
- Innerhalb des Tages weiter neueste zuerst.
- Sticky Tages-Header behalten (Muster `galm-h` existiert schon).

> Umsetzung: neue Funktion `galDayLabel(dateStr, refDate)` analog zu
> `galMonthLabel`, und in `renderGalerieMobile` das Gruppierungs-Key von Monat
> auf Tag umstellen. `galDateVal` (YYYYMMDD) liefert die korrekte Sortierung
> bereits — den bekannten `localeCompare`-Datums-Bug also **nicht** erben.

### B. Schnellfilter-Leiste „Zeitraum" als erste Reihe

Hebe die wichtigsten Zeit-Sprünge aus der Pill heraus in eine **immer sichtbare
Segment-Reihe** ganz oben:

`[ Heute ] [ Gestern ] [ 7 Tage ] [ Alle ]`

- Default vor Ort: **`7 Tage`** (zeigt „diese Woche") — nicht „Alle", das ist
  Archiv-Denke.
- Tippt direkt auf `GAL.zeitraum` (Werte existieren: `7T/30T/90T/Jahr`), ergänzt
  um `Heute`/`Gestern`.
- Restliche Filter (Gewerk/Ersteller/Plan) bleiben in den scrollbaren Pills.

### C. „Gestern"-Recap als Einstieg

Wenn der Nutzer die Galerie öffnet und es Fotos von gestern gibt: ein
**kompakter Recap-Streifen** oben — „Gestern: 12 Fotos · 3 Gewerke" mit
horizontal scrollbaren Mini-Thumbs. Ein Tap springt in die Tagesgruppe.
Das bedient P-Nachschauen ohne dass der Nutzer filtern muss.

### D. Kachel aufräumen (visuelle Hierarchie)

- **Bild dominiert**, Text reduziert: Name nur 1 Zeile (ellipsis), `Datum`
  raus aus der Kachel (steht schon im Tages-Header → Redundanz P3), nur
  **Uhrzeit + Ersteller-Initiale** als dezente Fußzeile.
- Typ-Marker (Plan/Video) als kleines Eck-Icon statt großem Platzhalter.
- Größere Tap-Targets (min. 44px), schon `:active`-Scale vorhanden.
- Konsistente Thumb-Ratio (4:3 ist gesetzt) — gut, beibehalten.

### E. Erfassen ↔ Galerie verbinden

- FAB bleibt (Foto-Upload-Flow inkl. Projekt/Gewerk ist gebaut).
- Im **Heute-Block**: wenn leer → Empty-State „Heute noch nichts dokumentiert"
  mit Direkt-CTA (öffnet `foto-aufnahme-modal`). Verwandelt P5 in einen
  Handlungsaufruf.
- Nach erfolgreichem Upload: optimistisch in den Heute-Block einfügen +
  dorthin scrollen (Bestätigung, dass die Aufnahme „angekommen" ist).

### F. Robustheit / Performance

- **Lazy-Loading** der Thumbs (`loading="lazy"` bzw. IntersectionObserver) —
  vor Ort oft schlechtes Netz; nur sichtbare Tage laden.
- Bei sehr vielen Tagen: ältere Gruppen erst auf „Mehr anzeigen" rendern.

## 5. Umsetzung in Phasen

| Phase | Inhalt | Aufwand |
|-------|--------|---------|
| **MVP** | A (Tag-Gruppierung) + B (Schnellfilter Heute/Gestern/7T/Alle, Default 7T) | klein |
| **2** | D (Kachel-Cleanup) + E (Empty-State Heute + CTA) | mittel |
| **3** | C (Gestern-Recap) + F (Lazy-Load) | mittel |

Phase MVP allein adressiert P1 + P2 — die beiden Probleme, die den Vor-Ort-Fall
am stärksten bremsen — und ist ein lokaler Eingriff in `renderGalerieMobile`
plus eine Filter-Reihe im Galerie-Markup.

## 6. Offene Entscheidungen (vor Bau zu klären)

1. **Referenzdatum** für „Heute/Gestern": echtes `new Date()` oder ein
   fixes Demo-Datum (die `MEDIA`-Daten liegen um Juni 2026)? Für den Prototyp
   ggf. ein Anker-Datum, damit „Heute" nicht leer wirkt.
2. **Default-Zeitraum** vor Ort: `7 Tage` (Vorschlag) oder `Heute`?
3. **Recap-Quelle** (Phase 3): nur Fotos oder auch Pläne/Videos im Gestern-Streifen?
4. Soll der **Desktop** die Serpentine-Timeline behalten (Vorschlag: ja, nur
   Mobile umbauen) — oder mittelfristig auch Tag-Gruppierung?

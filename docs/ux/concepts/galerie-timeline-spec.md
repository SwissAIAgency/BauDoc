# Galerie-Timeline Spec (Verhalten)

> **Geltungsbereich.** Verbindliche **Verhaltens**-Spec für die Galerie-
> Ansicht mit Serpentine-Timeline (`index.html`, Screen „Galerie").
> Beschreibt das **dynamische Laufzeit-Verhalten**: Spaltenanzahl,
> Sidebar-Reaktion, Padding-Regel und Serpentine-Pfad-Routing.
>
> **Abgrenzung.** Die **statische Geometrie** der einzelnen Karte (Stempel,
> Trendlinie, Dot, 71.5px-Invariante) und die Design-Tokens leben in
> [`preview-card-spec.md`](preview-card-spec.md) +
> `frontend/prototypes/preview-card-spec.css`. Diese Spec hier baut darauf
> auf und beschreibt, wie die Karten zu einer Timeline verbunden werden.
>
> Konsument / Implementierung:
> - `frontend/prototypes/index.html` — `renderGalerie()`, `calcGalCols()`,
>   `updateSerpentinePath()`, Sidebar-Toggle, Resize-Handler
> - `frontend/prototypes/preview-card-spec.css` — Layout-Tokens
>   (`--gal-curve-pad`, `--gal-cols`, `--preview-serpentine-*`)

---

## 1. Grundprinzip

Die Galerie ordnet alle Medien in einem **Boustrophedon-Raster** an
(Zeilen wechselnder Lese-Richtung) und verbindet sie mit einer
durchgehenden **Serpentine-Linie** (die „Timeline"). Die Bilder selbst
stehen im HTML immer L→R; nur der Pfad schlängelt sich durch sie.

```
Zeile 0:  [Bild]──[Bild]──[Bild]──[Bild]──[Bild]──[Bild]─┐
                                                          │  U-Turn aussen
Zeile 1:  ┌─[Bild]──[Bild]──[Bild]──[Bild]──[Bild]──[Bild]┘
          │  U-Turn aussen
Zeile 2:  └─[Bild]──[Bild] ...
```

**Kern-Invariante (darf nicht gebrochen werden):**
Die Timeline-Linie verläuft **immer NEBEN den Bildern, nie darüber**.
Der vertikale U-Turn sitzt symmetrisch in der Padding-Lücke zwischen
Bildkante und Container-Rand.

---

## 2. Dynamische Spaltenanzahl

Die Spaltenzahl ist **nicht fix**, sondern wird zur Laufzeit aus der
verfügbaren Breite berechnet (`calcGalCols()` in `index.html`).

| Parameter | Wert | Quelle |
|---|---|---|
| Padding links/rechts | `--gal-curve-pad` (72px) | live aus CSS gelesen |
| Spalten-Gap | 32px | `.vd-gal-row { gap }` |
| Mindest-Thumbnail-Breite | 150px | Konstante `THUMB_MIN` |
| Spalten-Grenzen | min 3, max 8 | `Math.max(3, Math.min(8, …))` |

**Formel:**
```
avail = containerWidth − 2 × gal-curve-pad
cols  = floor((avail + gap) / (thumbMin + gap))   // clamp 3…8
```

Das Ergebnis wird als CSS-Variable `--gal-cols` gesetzt; das Grid nutzt
`grid-template-columns: repeat(var(--gal-cols), 1fr)`. Damit füllen die
Thumbnails **immer die volle Breite** — kein Leerraum rechts.

---

## 3. Sidebar-Reaktion

Beim Ein-/Ausklappen der Desktop-Sidebar (`vd-app-sidebar-collapsed` am
`<body>`) ändert sich die verfügbare Breite. Die Galerie reagiert:

| Aktion | Verhalten |
|---|---|
| Sidebar **einklappen** | mehr Breite → **+1 Spalte** (z. B. 5 → 6) |
| Sidebar **ausklappen** | weniger Breite → **−1 Spalte** zurück |

Technik: Der Toggle-Handler ruft nach Ablauf der Sidebar-Transition
(`setTimeout 280ms`) `renderGalerie()` + `updateSerpentinePath()` auf, so
dass Spaltenzahl und Pfad zur neuen Breite passen.

**Regel:** Das Padding (`--gal-curve-pad`) bleibt dabei **konstant** —
ausgeglichen wird ausschliesslich über die Spaltenanzahl bzw. die
Thumbnail-Breite, nie über das Padding.

---

## 4. Padding- & Abstands-Regel (36px symmetrisch)

Die vertikale Verbindungslinie sitzt **mittig in der Padding-Lücke**:

```
[Bildrand] ─36px─ [Timeline-Linie] ─36px─ [Container-Rand]
```

| Grösse | Wert | Bedeutung |
|---|---|---|
| Abstand Bild ↔ Linie | **36px** | Marge im `updateSerpentinePath` |
| Abstand Linie ↔ Rand | **36px** | = `gal-curve-pad − Marge` (72 − 36) |
| `--gal-curve-pad` | 72px | muss ≥ Marge (36) + curve-radius (32) sein |

Diese Symmetrie gilt auf **beiden Seiten** (Links- und Rechts-U-Turns)
und in **beiden Sidebar-Zuständen**.

---

## 5. Serpentine-Pfad-Routing

`updateSerpentinePath()` zeichnet einen SVG-Pfad durch die Dot-Mitten
aller Zellen.

### 5.1 Punkte pro Zeile

Pro Zeile zwei Ankerpunkte in Lese-Richtung:
- Gerade Zeilen (`idx % 2 === 0`): erster Dot (links) → letzter Dot (rechts)
- Ungerade Zeilen (`idx % 2 === 1`): letzter Dot (rechts) → erster Dot (links)

### 5.2 Horizontale Segmente

Innerhalb einer Zeile: gerade Linie von Dot zu Dot (auf Dot-Höhe, also
**unterhalb** der Bilder, auf der Datums-Label-Ebene).

### 5.3 Vertikaler U-Turn (der kritische Teil)

Der Offset **ab Dot-Mitte** wird **dynamisch** berechnet — NICHT aus einem
festen CSS-Wert:

```
cellHalf   = gemessene Bildbreite / 2     // Dot-Mitte → Bildrand
sideOffset = cellHalf + 36                 // 36px Marge in die Padding-Lücke
```

**Warum dynamisch:** Der Dot ist in der Zellmitte zentriert. Ein fixer
Offset könnte bei variabler Spaltenzahl nicht gleichzeitig „nah am Bild"
UND „neben dem Bild" sein. Durch die Messung der echten Bildbreite sitzt
die Linie bei **jeder** Spaltenzahl exakt 36px neben dem Bildrand.

> ⚠️ **Deprecated:** `--preview-serpentine-side-offset` (44px) wird seit
> 2026-06-23 **nicht mehr gelesen**. Wert bleibt nur als Fallback/Doku.

Der Bogen ist ein Viertelkreis mit Radius `--preview-serpentine-curve-radius`
(32px). Bedingung: `Marge (36) + radius (32) = 68 ≤ gal-curve-pad (72)`,
sonst würde der Bogen abgeschnitten.

### 5.4 Pfeil-Marker & Path-Nodes

- Pfeilspitzen (`marker-start` / `marker-end`) zeigen die Zeit-/Lese-
  Richtung an — **bleiben erhalten**.
- An jedem Dot wird ein kleiner Kreis (`.vd-gal-path-node`, r = 5) gerendert,
  durch den die Linie läuft.

### 5.5 Letzte (partielle) Zeile & End-Pfeil

Die letzte Zeile kann weniger als eine volle Reihe Bilder enthalten. Enthält
sie **genau eine** Zelle (`firstCellIdx === lastCellIdx`), darf **nur EIN**
Ankerpunkt in `pathPoints` landen — **kein doppelter** (`P == P`).

> **Warum verbindlich:** Ein doppelter End-Punkt erzeugt ein **Null-Segment**
> am Pfad-Ende. Dessen Richtung ist undefiniert → `marker-end` (`orient="auto"`)
> fällt auf 0° zurück und der End-Pfeil zeigt **nach rechts** statt in
> Laufrichtung in den Dot. Mit nur einem Punkt endet der Pfad am realen
> Horizontal-Segment (kommt von rechts) → der Pfeil zeigt korrekt hinein.

### 5.6 Rendering-Robustheit — VERBINDLICH (nicht regressieren)

> ⚠️ **Diese Regeln haben die Linie mehrfach zum Verschwinden gebracht. Wer
> `updateSerpentinePath()` / `renderGalerie()` anfasst, muss ALLE vier Punkte
> erhalten. Vor dem Commit gegen §8-QA prüfen.**

1. **Visibility-Guard.** `updateSerpentinePath()` bricht **ohne** den Pfad zu
   überschreiben ab, wenn der Container 0-Maße hat
   (`containerRect.height === 0 || containerRect.width === 0`). Die Galerie
   wird beim Initial-Load **einmal `display:none` gerendert** — dann liefern
   alle `getBoundingClientRect()` 0. Ohne Guard entstünde `M 0 0 …` (ein
   verirrter Bogen oben-links) statt einer sauberen Linie.
2. **Synchrones Zeichnen.** `renderGalerie()` ruft `updateSerpentinePath()`
   **synchron direkt nach dem `innerHTML`-Commit** auf (nicht nur via `rAF`).
   `getBoundingClientRect()` erzwingt ohnehin ein Layout, daher stehen die
   Dot-Positionen sofort bereit. **Kein `rAF`-only** — feuert das `rAF` beim
   Sichtbar-Werden nicht sauber, bleibt die Linie sonst dauerhaft leer.
3. **ResizeObserver-Sicherung.** Ein `ResizeObserver` auf `.vd-gal-rows`
   ruft `updateSerpentinePath()` synchron auf, sobald der Container echte
   Maße bekommt (Übergang `display:none` → sichtbar). Fängt den Fall ab, dass
   der synchrone Aufruf/`rAF`-Backup zu früh feuert.
4. **Null-Punkt-Guard.** Konnte ein Dot nicht gemessen werden (`dotPos`
   liefert `null`), wird **kein** Teil-Pfad gebaut
   (`pathPoints.some(p => !p)` → Abbruch).

**Auslieferung.** Die Linie wird rein clientseitig aus dem DOM berechnet —
sie ist nur so aktuell wie die ausgelieferte HTML. Damit die Live-Seite
(Vercel) nach einem Deploy nicht eine **CDN-gecachte alte HTML** zeigt (die
Linie wirkt dann „wieder kaputt", ist aber nur alter Code), setzt
`vercel.json` für HTML `Vercel-CDN-Cache-Control: no-cache`. Assets bleiben
gecacht.

---

## 6. Resize-Verhalten

Bei Fensteränderung (`resize`, via doppeltem `requestAnimationFrame`
entprellt):
1. `calcGalCols()` neu berechnen.
2. Wenn sich die Spaltenzahl ändert → `--gal-cols` setzen + `renderGalerie()`.
3. Sonst nur `updateSerpentinePath()` (Pfad an neue Pixel-Positionen).

**Zuverlässige Erst-Zeichnung.** Zusätzlich beobachtet ein `ResizeObserver` auf
`.vd-gal-rows` den Container und ruft `updateSerpentinePath()` **synchron** auf,
sobald er echte Maße bekommt (Übergang `display:none` → sichtbar beim
Screen-Wechsel). Damit wird die Serpentine-Linie auch dann gezeichnet, wenn der
synchrone Aufruf in `renderGalerie()` bzw. der `rAF`-Backup zu früh feuert
(Layout noch nicht fertig → 0-Rects → Abbruch). Ohne diese Absicherung kann die
Galerie ohne Linie erscheinen; die reservierten Seitenpolster wirken dann wie
leerer Rand.

---

## 7. Responsive Breakpoints

| Breite | Verhalten |
|---|---|
| > 1100px | Gap 32px, dynamische Spalten (3–8) |
| ≤ 1100px | Gap 24px |
| ≤ 720px | Gap 16px, **3 Spalten fix**, Serpentine-SVG **ausgeblendet** |

Unter 720px ist die Serpentine-Linie deaktiviert (zu wenig Platz für die
U-Turns) — die Galerie wird zum einfachen 3-Spalten-Raster.

---

## 8. Akzeptanzkriterien (QA-Checkliste)

- [ ] Timeline-Linie verläuft **nie über** ein Bild (immer in der Padding-Lücke).
- [ ] Abstand Bild ↔ Linie ↔ Rand ist **symmetrisch 36px**, links und rechts.
- [ ] Sidebar einklappen → genau **+1 Spalte**; ausklappen → **−1 Spalte**.
- [ ] Thumbnails füllen die volle Breite — **kein Leerraum** rechts.
- [ ] Bogen wird **nicht abgeschnitten** (passt in `gal-curve-pad`).
- [ ] Pfeilspitzen an Pfad-Start und -Ende sichtbar.
- [ ] Bei Resize passen sich Spalten **und** Pfad an.
- [ ] ≤ 720px: 3 Spalten, keine Serpentine-Linie.

---

## 9. Lock-Disziplin

### Status: 🔵 LIVE (Verhaltens-Spec)

| Datei | Status | Rolle |
|---|---|---|
| `docs/ux/concepts/galerie-timeline-spec.md` (diese Datei) | 🔵 LIVE | Verhaltens-Dokumentation |
| `frontend/prototypes/preview-card-spec.css` | 🟠 READ-ONLY | Layout-Tokens (Lock-Prozess) |
| `frontend/prototypes/index.html` | 🔵 LIVE | Implementierung |

**Regel.** Diese Spec beschreibt das Soll-Verhalten. Bei Änderungen am
Timeline-Verhalten: erst diese Datei aktualisieren, dann `index.html`,
und Token-Änderungen an `preview-card-spec.css` durchlaufen den Lock-
Prozess (siehe [`preview-card-spec.md`](preview-card-spec.md) §8).

---

## 10. Siehe auch

- [`preview-card-spec.md`](preview-card-spec.md) — statische Karten-Geometrie + Tokens
- `frontend/prototypes/preview-card-spec.css` — Custom-Properties-Modul
- `frontend/prototypes/COMPONENTS.md` — Lock-Status & Änderungsjournal
- `docs/ux/responsive-plan.md` — Responsive-Phasenplan

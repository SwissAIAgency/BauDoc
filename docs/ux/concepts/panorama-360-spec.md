# Panorama-360°-Spec (Architektur & Verhalten)

> **Geltungsbereich.** Verbindliche **Konzept-Spec** für die 360°-Panorama-
> Funktion: Anschauen begehbarer Raum-Zustände, Verknüpfung mit Planpositionen,
> virtueller Rundgang und **Zeitvergleich** (gleicher Standpunkt über die Zeit).
> Beschreibt Bildformat, Bibliotheks-Wahl, Datenmodell, Speicher, Upload-Erkennung,
> Viewer-Integration und das Soll-Verhalten der Bedienung.
>
> **Status.** Konzept für **Phase 5** (Erweiterung). Im MVP ist der 360°-Viewer ein
> Nicht-Ziel ([`docs/project/definition.md`](../../project/definition.md) §Nicht-Ziele).
> Diese Spec zurrt das Design fest, **bevor** gebaut wird — es entsteht hier **kein
> Produktivcode**.
>
> Konsument / Implementierung (Phase 5):
> - Frontend: `frontend/prototypes/index.html` — `lbRender()` (Lightbox-Branch),
>   `typ`-Medienlogik, Galerie-Thumbnail-Badge
> - Backend (Ziel): Laravel API + PostgreSQL ([`ARCHITECTURE.md`](../../../ARCHITECTURE.md))
> - Datenmodell: [`docs/technical/database-model.md`](../../technical/database-model.md)
> - Bibliothek: Photo Sphere Viewer (lokal vendored)

---

## 1. Grundprinzip

Ein 360°-Foto ist technisch ein gewöhnliches JPEG in **equirektangularer**
Projektion — Seitenverhältnis **2:1**, wie eine aufgeklappte Weltkarte. Zum
Anschauen wird das Bild per **WebGL auf die Innenseite einer Kugel** texturiert;
die Kamera sitzt im **Mittelpunkt**. „Herumschauen" mit Maus, Finger oder
Gyroskop bedeutet dann nur: **die Kamera drehen** (Yaw = horizontal, Pitch =
vertikal, FOV = Zoom).

```
Equirektangulares Bild (2:1)          Auf Kugel gemappt, Kamera im Zentrum
+----------------------------+
|        Himmel / oben       |               .--""""--.
|----------------------------|             .'    ^pitch '.
|  links   vorne   rechts    |    ==>      |   <--(o)-->  |   o = Kamera
|----------------------------|             '.   yaw     .'
|        Boden / unten       |               '--....--'
+----------------------------+
```

**Kern-Invariante:** Im 360°-Modus steuert **die Bibliothek** Drehung und Zoom.
Die normale Foto-Bedienung (Pan-Drag am Bild, `data-lb-zoom-*`-Buttons) ist in
diesem Modus **aus**. Es gibt nie zwei konkurrierende Zoom-Mechaniken gleichzeitig.

---

## 2. Bibliotheks-Entscheidung: Photo Sphere Viewer

**Gesetzt: [Photo Sphere Viewer](https://photo-sphere-viewer.js.org/) (PSV)** —
auf three.js aufbauend, MIT-Lizenz, aktiv gepflegt.

| Kriterium | Bewertung |
|---|---|
| Lizenz | MIT (kommerziell unbedenklich) |
| Bau-Use-Cases als Plugins | **Markers** (Hotspots), **Gyroscope**, **VirtualTour**, **Gallery**, **VR** |
| Lokal vendorbar | Ja → erfüllt „kein CDN/Tracking, file://-kompatibel" |
| Kamera-Steuerung von aussen | `getPosition()` / `setPosition()` → Basis für **Zeitvergleich** |
| Touch / Maus / Tastatur | Out-of-the-box |

**Verworfene Alternativen:**

| Option | Warum nicht |
|---|---|
| **Pannellum** | Sehr leichtgewichtig, aber weniger Plugins; Virtual-Tour/Marker-Komfort und Roadmap schwächer als PSV. Bleibt Fallback, falls Bundle-Grösse kritisch wird. |
| **three.js pur** | Maximale Kontrolle, aber Drag/Zoom/Gyro/Hotspots/Tour müssten selbst gebaut und gepflegt werden — unnötiger Aufwand für ein Phase-5-Feature. |

**Vendoring-Regel.** PSV **und** seine three.js-Abhängigkeit werden lokal abgelegt
(kein CDN, kein externer Request), konsistent mit der Privacy-Linie des Projekts.

> Formale Begründung folgt optional als `DECISIONS/0005-panorama-viewer.md` (ADR).

---

## 3. Datenmodell

### 3.1 Medien-Typ

Panorama reiht sich in die bestehende `typ`-Logik ein
(`foto` / `plan` / `video` / `dokument` → **`panorama`**). Damit funktionieren
Galerie, Filter, Picker und Lightbox-Streifen mit minimaler Ergänzung weiter
(siehe [`index.html`](../../../frontend/prototypes/index.html) `typ`-Verzweigungen).

### 3.2 Panorama-spezifische Felder

| Feld | Zweck |
|---|---|
| `projection_type` | `equirectangular` (Default); erweiterbar (cubemap …) |
| `initial_view` | Start-Blickrichtung `{ yaw, pitch, fov }` beim Öffnen |
| `vantage_point_id` | **Standpunkt** für den Zeitvergleich (§9) |
| Hotspot-Bezug | Marker → Planposition (§7), via `panorama_hotspots` |
| Tour-Bezug | Knoten-Graph (§8), via `panorama_tour_links` |

> Feature-Umfang Phase 5 = nur `equirectangular`. Andere Projektionen (cubemap …) sind
> über `projection_type` modellierbar, aber zurückgestellt.

### 3.3 Strukturentscheidung — `photo`-Erweiterung vs. eigene Entität

Dies ist die **eine wirklich strittige** Datenmodell-Frage. Beide Wege sind tragfähig:

- **Variante A — Panorama bleibt ein `photo` + 1:1-Erweiterung `panoramas`.**
  Erbt `photo_locations`, `photo_comments`, `photo_trade_assignments`, Audit und
  den gesamten Upload-/Storage-/Rechte-Pfad. Maximale Wiederverwendung; ein
  Panorama ist „ein Foto mit Spezialdarstellung".
- **Variante B — eigene Top-Level-Entität `panoramas`.**
  Saubere konzeptionelle Trennung; eigene Relationen statt Erbe. Mehr Tabellen,
  aber keine „Spezialfall-Flags" auf `photos`.

> **TODO(human)** — Entscheide hier die Strukturvariante (A oder B) und halte sie
> in 2–6 Zeilen fest: gewählter Ansatz, der entscheidende Grund dafür und eine
> kurze Notiz zur Konsequenz für Rechte/Audit. Diese Festlegung steuert direkt die
> Tabellen-Ergänzung in [`database-model.md`](../../technical/database-model.md).

---

## 4. Speicher-Layout (S3 / MinIO)

Konsistent zu den Modellregeln (Dateien im Object Storage, DB nur Metadaten;
[`ARCHITECTURE.md`](../../../ARCHITECTURE.md) sieht „spätere Panoramen" bereits vor):

| Artefakt | Zweck |
|---|---|
| **Original (equirektangular)** | Archiv/Quelle, volle Auflösung |
| **Web-Variante (≤ 4096 px Kante)** | **Das, was der Viewer lädt** — viele mobile GPUs rendern grössere Texturen nicht (§11) |
| **Flaches Thumbnail (rektilinear)** | Galerie-Vorschau aus einer „schönen" Blickrichtung gerendert (nicht das verzerrte Equirektangular-Rohbild); trägt „360°"-Badge (§11) |
| **Getilte Auflösungsstufen** *(optional, später)* | Lazy-Loading sehr grosser Panoramen |

Thumbnail-Generierung läuft asynchron über Laravel Queues (analog zur geplanten
Bildverarbeitung). Zugriff bleibt **privat**, ohne öffentliche Direktlinks.

**Viewer-Zugriff (Sicherheit).** PSV lädt die Textur **client-seitig per URL**. Diese
URL muss eine **kurzlebige, signierte Privat-URL** vom Backend sein (für Original,
Web-Variante und Thumbnail) — **kein** öffentlicher Direktlink. Damit bleibt das
clientseitige Rendern konsistent mit den Sicherheitsgrenzen in
[`ARCHITECTURE.md`](../../../ARCHITECTURE.md) („Object Storage ist privat").

---

## 5. Kamera-Anbindung & 360°-Erkennung

### 5.1 Ingestion-Wege (Kundeneinfachheit zuerst)

**Prinzip.** Die Companion-App der Kamera (Ricoh Theta / Insta360) zieht das Bild
bereits per WiFi/BLE vom Gerät und rechnet es bei Insta360 zusammen (Stitching).
BauDoc baut das **nicht** nach — es übernimmt nur den letzten Sprung „Gerät → App".
Standardisiert wird auf ein **fertiges equirektangulares JPEG** (Theta liefert das
direkt; Insta360 nach einmaligem Export in deren App).

| Weg | Plattform | Kundenfluss |
|---|---|---|
| **Weg 1 — „Teilen → BauDoc"** (Web Share Target) | Android (installierte PWA) | In der Kamera-App `Teilen → BauDoc` → Upload öffnet mit Projektkontext. **Ein Tipp.** |
| **Weg 2 — Foto-Picker** (Datei/Galerie) | universell, **inkl. iPhone** | In BauDoc `Hochladen → Foto wählen`. Pflicht-Fallback, da iOS Web Share Target für PWAs nicht zuverlässig unterstützt. |

Weg 1 und Weg 2 teilen **denselben Upload-Endpunkt**; kein Kamera-SDK, keine native App.
Direkte Geräte-Kopplung (WiFi-OSC, SDK, Vendor-Cloud) ist **out of scope** (Internet-
Verlust am Kamera-AP, Native-App-Zwang = Nicht-Ziel, Dritt-Dienstleister-Prüfung).

### 5.2 360°-Erkennung (ohne Zutun des Kunden)

1. **Auto-Erkennung** via XMP-`GPano`-Metadaten (`GPano:ProjectionType=equirectangular`).
2. **Heuristik** Seitenverhältnis ≈ 2:1 als Fallback.
3. **Expliziter Schalter** „Als 360° behandeln" nur als manuelle Korrektur.

Der Regelfall erfordert **kein** manuelles Ankreuzen. Andockpunkt: die bestehenden
Upload-Modals (`foto-aufnahme-modal` u. a.).

### 5.3 Upload-Grösse

360°-Originale sind gross (häufig 8–25 MB). Das Panorama-Limit ist gegen das bestehende
Foto-Limit (25 MB im `foto-aufnahme-modal`) zu prüfen und ggf. anzuheben.

---

## 6. Viewer-Integration (Lightbox)

**Einziger Integrationspunkt im Frontend:** `lbRender()` in
[`frontend/prototypes/index.html`](../../../frontend/prototypes/index.html)
(heute Branch `isVideo` / `isPhoto`).

| Aspekt | Verhalten im `panorama`-Branch |
|---|---|
| Statt `img.src` | PSV-Viewer in `[data-lb-canvas]` **mounten** |
| Zoom-Buttons `data-lb-zoom-*` | **ausblenden/deaktivieren** (PSV zoomt selbst) |
| Pan-Drag am Bild | **aus** (PSV übernimmt Drag) |
| Prev/Next, Streifen, Metadaten-Panel | **bleiben** wie bei Foto/Video |
| Lifecycle | Viewer bei Wechsel/Schliessen sauber `destroy()` (kein WebGL-Leak) |
| Typ-Badge | neues Label „360°" statt „Foto" |

**Invariante:** Genau **ein** PSV-Viewer ist gleichzeitig aktiv; beim Navigieren
zwischen Medien wird der alte zerstört, bevor der neue entsteht.

---

## 7. Hotspots → Planposition

PSV-**Markers**-Plugin: anklickbare Punkte im Panorama, die auf eine
**Planposition** (`photo_locations`, Koordinaten relativ zur Planversion) oder eine
Info verweisen. Das knüpft direkt an das bestehende Planpositions-Konzept an —
ein Hotspot ist die 360°-Sicht derselben Verortung.

Datenseitig: `panorama_hotspots` (Position im Panorama als yaw/pitch + Ziel).

**Authoring (Phase 5b):** Marker per Klick im Panorama setzen, dann Planposition oder
Info zuordnen.

---

## 8. Virtueller Rundgang

Panoramen werden als **Knoten-Graph** verbunden: ein Tür-/Pfeil-Hotspot in Raum A
führt zu Raum B. Bedienung wie ein begehbarer Baustellen-Rundgang (PSV-**VirtualTour**).

Datenseitig: `panorama_tour_links` (`from_panorama_id`, `to_panorama_id`,
Blickrichtung beim Eintreffen). Kein Pflichtbestandteil pro Panorama — rein additiv.

---

## 9. Zeitvergleich (Headline-Feature)

Der eigentliche Baudoku-Mehrwert. Architektur-Primitiv ist **nicht das Bild, sondern
der Standpunkt**.

**Standpunkt (`vantage_points`).** Ein physischer „Stativ-Punkt" auf der Baustelle,
optional an eine Planposition gepinnt. Alle Panoramen, die von dort aufgenommen
wurden, teilen `vantage_point_id` und haben `captured_at`.

```
vantage_point "Treppenhaus EG, Standpunkt 1"
   ├── Panorama 2026-02-10  (Rohbau)
   ├── Panorama 2026-04-03  (Ausbau)
   └── Panorama 2026-06-18  (fertig)
```

**Bedienung:**
- Zeit-Slider **oder** Split-View über die Aufnahmedaten dieses Standpunkts.
- **Synchronisierte Blickrichtung:** dreht man im „Rohbau"-Panorama, dreht „fertig"
  mit — zwei Viewer teilen einen Kamera-Zustand (`getPosition()` lesen →
  `setPosition()` auf den/die anderen Viewer schreiben).
- Die vorhandene **Serpentine-Timeline** wird als Zeitachse wiederverwendet
  ([`galerie-timeline-spec.md`](galerie-timeline-spec.md)).

**Kern-Invariante:** Yaw/Pitch/FOV sind über alle verglichenen Zeitpunkte **identisch**,
solange der Vergleich aktiv ist. Nur so ist „derselbe Blick, andere Zeit" glaubwürdig.

**Ausrichtung (Nordung).** Kameras garantieren keine einheitliche Orientierung. Damit
der synchronisierte Blick über die Zeit **dieselbe Wand** zeigt, hält jeder Standpunkt
eine Referenz-Ausrichtung — aus GPano `PoseHeadingDegrees`, sonst einmalig manuell pro
Standpunkt gesetzt. Ohne Nordung vergleicht der „gleiche Blick" verschiedene Richtungen.

**Zeitachse.** Sortierung nach `captured_at` aus EXIF (`DateTimeOriginal`), Fallback
Upload-Zeitpunkt.

---

## 10. Mobile, Gyroskop & Accessibility

| Thema | Verhalten |
|---|---|
| Touch | Wischen = drehen, Pinch = zoomen |
| Gyroskop | PSV-**Gyroscope**-Plugin: Handy bewegen statt wischen (Baustelle) |
| Touch-Ziele | ≥ 44×44px (Hotspots, Steuer-Buttons) |
| Tastatur | Pfeiltasten = schwenken, +/− = zoomen, Esc = schliessen |
| Fokus / ARIA | sichtbarer Fokus, Viewer als interaktive Region ausgezeichnet |

Bezug: [`docs/ux/responsive-plan.md`](../responsive-plan.md).

---

## 11. Constraints & Stolpersteine

| Thema | Konsequenz |
|---|---|
| **file:// + WebGL** | Lokale Texturen gelten als cross-origin → WebGL verweigert teils. Über Vercel/Netlify (https) unkritisch. Für reine file://-Demo: Bild als Data-URI laden. |
| **Performance** | Grosse Panoramen (5760×2880+) belasten Mobilgeräte → Thumbnail in der Galerie, getilte Stufen später. |
| **Thumbnail-Badge** | 360°-Bilder in der Galerie **müssen** ein „360°"-Badge tragen, sonst ist die Interaktivität unsichtbar. |
| **Privacy** | PSV + three.js **lokal** vendoren, kein CDN, kein Tracking. |
| **WebGL-Lifecycle** | Viewer beim Mediumwechsel zwingend `destroy()` — sonst Kontext-/Speicher-Leak. |
| **Render-Auflösung** | Viewer lädt die **Web-Variante (≤ 4096 px)**, nicht das Original — sonst leere Fläche auf vielen Mobil-GPUs. |
| **Kein WebGL** | Fallback auf das flache Equirektangular als normales, scrollbares Bild mit Hinweis — nie eine leere Fläche. |

---

## 12. Akzeptanzkriterien (QA-Checkliste)

- [ ] Ein `panorama`-Medium öffnet im Lightbox und ist per **Maus**, **Finger** und **Gyroskop** drehbar.
- [ ] Im 360°-Modus sind die Foto-**Zoom-Buttons** und das **Pan-Drag** aus; PSV-Steuerung greift.
- [ ] Beim Wechsel zum nächsten/vorherigen Medium wird der PSV-Viewer **zerstört** (kein Leak), genau einer aktiv.
- [ ] Galerie-Thumbnail eines Panoramas ist **rektilinear** (nicht das verzerrte Rohbild) und trägt ein sichtbares **„360°"-Badge**.
- [ ] Upload erkennt 360° via GPano-Metadaten und/oder 2:1-Heuristik; expliziter Schalter überschreibt.
- [ ] Hotspot im Panorama verweist korrekt auf die zugehörige **Planposition**.
- [ ] **Zeitvergleich** zeigt mehrere Aufnahmen desselben Standpunkts mit **synchronisierter Blickrichtung**.
- [ ] file://-Verhalten ist dokumentiert; https-Deployment funktioniert ohne Workaround.
- [ ] Viewer-Textur wird über eine **signierte Privat-URL** geladen, kein öffentlicher Direktlink.
- [ ] Panorama rendert auf einem Mittelklasse-Smartphone (Web-Variante ≤ 4096 px), keine leere Fläche; ohne WebGL erscheint der flache Fallback.
- [ ] Zeitvergleich nutzt die **Standpunkt-Nordung** — synchronisierte Blicke zeigen dieselbe Wand.
- [ ] Kamera-Ingestion: „Teilen → BauDoc" (Android) **und** Foto-Picker (inkl. iPhone) führen in denselben Upload.

---

## 13. Phasen-Roadmap (Phase 5)

| Stufe | Inhalt |
|---|---|
| **5a** | Einzelansicht: `panorama`-Typ, Lightbox-Branch, PSV gemountet, Badge |
| **5b** | Hotspots → Planposition (`panorama_hotspots`, Markers-Plugin) |
| **5c** | Virtueller Rundgang (`panorama_tour_links`, VirtualTour-Plugin) |
| **5d** | Zeitvergleich (`vantage_points`, synchronisierte Blickrichtung) |

Jede Stufe ist eigenständig nutzbar und baut additiv auf der vorigen auf.

---

## 14. Lock-Disziplin

### Status: 🟡 KONZEPT (Phase 5, noch nicht implementiert)

| Datei | Status | Rolle |
|---|---|---|
| `docs/ux/concepts/panorama-360-spec.md` (diese Datei) | 🟡 KONZEPT | Architektur-/Verhaltens-Spec |
| `docs/technical/database-model.md` | 🔵 LIVE | Panorama-Tabellen (Spätere Erweiterungen) |
| `docs/project/definition.md` | 🔵 LIVE | 360° als Phase-5-Ziel mit Konzeptverweis |
| `frontend/prototypes/index.html` | 🔵 LIVE | künftiger Integrationspunkt (`lbRender()`) |

**Regel.** Diese Spec beschreibt das Soll. Vor der Umsetzung in Phase 5: erst diese
Datei finalisieren (insb. §3.3 Strukturentscheidung), dann Datenmodell und Frontend.

---

## 15. Siehe auch

- [`docs/technical/database-model.md`](../../technical/database-model.md) — Tabellen & Indizes
- [`ARCHITECTURE.md`](../../../ARCHITECTURE.md) — S3-Storage, Queue-Bildverarbeitung
- [`docs/project/definition.md`](../../project/definition.md) — Scope, Nicht-Ziele
- [`galerie-timeline-spec.md`](galerie-timeline-spec.md) — Serpentine-Timeline (Zeitachse)
- [`docs/ux/responsive-plan.md`](../responsive-plan.md) — Responsive & A11y
- `frontend/prototypes/COMPONENTS.md` — Lock-Status & Änderungsjournal

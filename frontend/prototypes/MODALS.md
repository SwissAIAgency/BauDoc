# Modals — Specs & Interaktions-Dokumentation

> Verbindliche Spezifikation für die sechs Modals in `modals-showcase.html` (v2.0).
> Quelle der Wahrheit für Layout, Verhalten, Validation, Accessibility und JS-API.
> Änderungen am Modal-Verhalten MÜSSEN hier zuerst dokumentiert werden, dann implementiert.
>
> **Mapping:** Die Trigger-Buttons sind 1:1 die App-Buttons aus `index.html` Topbar
> (Zeile ~970: „Export", „Neues Projekt") und Projekt-Detail-Row (Zeile ~2542: „Foto aufnehmen",
> „Plan hochladen", „Video hochladen", „Datei wählen").

## Übersicht

Sechs Vollbild-Overlays, getriggert von den Topbar-/Projekt-Row-Buttons. Jedes Modal
ist ein eigenständiges `<div class="vd-modal-backdrop" data-bind="..." hidden>` und nutzt
`position: fixed; inset: 0` als Vollbild-Backdrop mit Blur. `hidden`-Attribut wird
per JS beim Öffnen entfernt und beim Schliessen wieder gesetzt (kein `display: none`-CSS-Trick).

| # | data-bind | Trigger-Button (Quelle) | Steps | Submit-Label | API-Endpoint |
|---|---|---|---|---|---|
| 1 | `neues-projekt-modal` | "Neues Projekt" (Topbar primary) | 3 | "Projekt anlegen" | `POST /api/projects` |
| 2 | `foto-aufnahme-modal` | "Foto aufnehmen" (Upload-Row primary) | 2 | "Bilder hochladen" | `POST /api/media` (Multipart, image/*) |
| 3 | `plan-upload-modal` | "Plan hochladen" (Upload-Row secondary) | 2 | "Plan hochladen" | `POST /api/plans` (Multipart, PDF/PNG/JPG) |
| 4 | `video-upload-modal` | "Video hochladen" (Upload-Row secondary) | 2 | "Video hochladen" | `POST /api/media` (Multipart, video/*) |
| 5 | `datei-waehlen-modal` | "Datei wählen" (Upload-Row ghost) | 2 | "Datei hochladen" | `POST /api/documents` (Multipart, */*) |
| 7 | `media-lightbox-modal` | "Alle X ansehen"-Button aus den Upload-Modals | – | "Zurück zum Upload" | – (kein Submit, nur Verwalten) |

**Gemeinsame Konvention für alle 4 Upload-Modals (v2.0.5):**

- **Identische Architektur in allen 4 Modals** — gleicher Aufbau: kompakte horizontale
  Dropzone (Icon links, Text mittig, Action-Buttons rechts) + gleiche Field-Typografie.
  Vorher war Plan-Modal „compact" und die anderen 3 „standard" — vereinheitlicht in v2.0.5.
- **Projekt wird automatisch gesetzt** aus dem aktuellen Projekt-Kontext (`CURRENT_PROJECT`
  in der Engine, im echten Produkt via `/api/session`). User MUSS es nicht wählen.
- **Kein Projekt-Select und kein Projekt-Context-Banner** im UI.
- **Foto + Video**: zusätzlich Gewerk automatisch aus User-Kontext (`CURRENT_GEWERK`),
  kein Auswahl-Feld im UI.
- **Modal wächst mit Inhalt — keine Scrollbar im Default-Zustand** (v2.0.6).
  `.vd-modal` hat `max-height: 96vh` (Sicherheitsnetz gegen Viewport-Overflow),
  aber `.vd-modal-body` hat `flex: 0 1 auto; overflow: visible` — das Modal wächst
  bis zu seiner Inhaltshöhe und scrollt nicht.
- **Fallback nur bei sehr kleinem Viewport** (`@media (max-height: 600px)`, z. B.
  Mobile Hochformat mit Browser-Bar): Body bekommt `overflow-y: auto` und scrollt.
  Auf Desktop, Tablet und Mobile-Querformat passt alles ohne Scroll rein.

**Dropzone-Konvention (alle 4 identisch):**

```
┌─ .vd-dropzone ─────────────────────────────────────────────────┐
│ [icon]  Titel – hier ablegen oder aufnehmen        [Btn][Btn] │
│         Sub – JPG, PNG, HEIC · max. 25 MB · Mehrfachauswahl   │
└────────────────────────────────────────────────────────────────┘
```

- Höhe ~64px (vorher ~180px in Standard-Variante).
- Buttons sind die, die das jeweilige Medium braucht:
  - Foto: „Datei wählen" + „Foto aufnehmen"
  - Video: „Datei wählen" + „Aufnehmen"
  - Plan: „Plan wählen" (kein Kamera)
  - Datei: „Datei wählen" (kein Kamera)
| 6 | `export-modal` | "Export" (Topbar secondary) | 2 | "Export starten" | `POST /api/exports` |

Geteilte CSS-Klassen (in der Showcase-Datei inline):

| Klasse | Verwendung |
|---|---|
| `.vd-modal-backdrop` | Vollbild-Overlay-Container, `position: fixed; inset: 0` |
| `.vd-modal` | Modal-Panel, 94vw / max-width, max-height 90vh |
| `.vd-modal--wizard-720` / `--wizard-640` | Varianten für Wizard-Modals |
| `.vd-modal-main` | Linke Spalte (Head + Body + Foot) |
| `.vd-modal-head` | Top-Bar mit Counter + Close-Button |
| `.vd-modal-body` | Flex-Container für Wizard-Content |
| `.vd-modal-wizard-content` | Innen-Padding 20px für Step-Panels |
| `.vd-modal-foot` | Bottom-Bar mit Prev/Next + Progress-Bar |
| `.vd-wizard-steps` | Step-Indikator (3/2 Steps je Modal) |
| `.vd-wizard-step` / `--active` / `--done` | Step-Pill mit Status |
| `.vd-wizard-sep` | Trennlinie zwischen Steps |
| `.vd-wz-panel` | Einzelner Step-Inhalt, mit Fade-In-Animation |
| `.vd-modal-foot-progress` | 2px Salwei-Progress-Bar im Foot |
| `.vd-field-group` / `--invalid` | Standard-Field-Wrapper mit Fehler-State |
| `.vd-field-input` / `--invalid` | Input-Style |
| `.vd-field-error` | Rote Fehlermeldung unter Feld |
| `.vd-dropzone` / `--active` | Drag-&-Drop-Zone für File-Upload |

---

## Architektur-Überblick

### Schichten-Modell

```
┌─────────────────────────────────────────────────────────────────────┐
│ USER-KLICK                                                         │
│   Topbar / Projekt-Row / "Alle X ansehen"-Button                   │
└────────────────────────────┬────────────────────────────────────────┘
                             │ data-open="<data-bind-id>"
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│ HTML-BACKDROP                                                      │
│   .vd-modal-backdrop[data-bind="..."] [hidden]                      │
│   ├── .vd-modal-head  (Titel + Close)                               │
│   ├── .vd-modal-body  (Step-Indikator + Wizard-Panel)              │
│   └── .vd-modal-foot  (Progress + Prev/Next + Submit)              │
└────────────────────────────┬────────────────────────────────────────┘
                             │ openModal() / closeAll() / goStep()
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│ JS-ENGINE (IIFE in <script>)                                        │
│   ├── STATES.{pw,foto,plan,video,datei,ex}  ← Single Source of Truth│
│   ├── openModal / closeAll / goStep                                │
│   ├── bindPwFields / bindUploadWizard / bindExFields               │
│   ├── renderRt (Live-State-Panels)                                 │
│   ├── renderUploadFiles (File-Liste im Modal + Lightbox)           │
│   ├── submitMock (simuliert API-Call)                              │
│   └── Validation: validatePwStep1 / validateUploadStep1 / …       │
└────────────────────────────┬────────────────────────────────────────┘
                             │ renderRt → data-rt-body="<id>"
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│ LIVE-STATE-PANELS (unter dem Trigger-Grid)                          │
│   6× .vd-roundtrip-card[data-rt-body="<id>"]                        │
│   Zeigen 1:1 was die App speichern würde (JSON, highlighted)       │
└─────────────────────────────────────────────────────────────────────┘
```

### Datenflüsse

1. **Trigger → Modal**: `data-open="<id>"` am Button → Click → `openModal('[data-bind="<id>"]')`
2. **Modal → State**: jeder Eingabe-Event-Listener ruft `STATES.<id>.<key> = value` + `renderRt(<id>)`
3. **State → Summary**: bei Step-Wechsel wird die Summary im Bestätigen-Step gerendert (`renderXxxSummary()`)
4. **State → API (mock)**: bei Submit ruft `submitMock()` mit pro-Modal Submit-Copy
5. **State → Live-Panel**: `renderRt()` schreibt gehighlighted JSON ins Panel

### Single Source of Truth

`STATES` (im IIFE definiert) ist die einzige Wahrheit. HTML ist **abgeleitet** aus State, nicht umgekehrt.
Remove-Funktionen ändern State → triggern `renderUploadFiles()` → HTML aktualisiert sich. Suche im
Lightbox filtert nur visuell, State bleibt unverändert.

### Versionierung

Jede Modal-Änderung MUSS:
1. In `MODALS.md` Changelog dokumentiert werden (was + warum + Datum)
2. Im Commit-Message erwähnt werden (z. B. `feat(modals): v2.0.7 PLZ/Ort getrennt`)
3. Wenn neue `data-*`-Attribute: in der JS-API-Sektion in dieser Doku registriert werden

---

## Funktionen

### Was jedes Modal leistet

| Modal | User-Aktion | Ergebnis im State | Submit-API |
|---|---|---|---|
| **neues-projekt-modal** | 3 Steps: Eckdaten → Planung → Bestätigen | `STATES.pw` (Titel, Strasse, PLZ, Ort, Bauleiter, Typ, Status, Tags, Meilensteine) | `POST /api/projects` |
| **foto-aufnahme-modal** | Bilder laden (3 Quellen) + Planposition wählen | `STATES.foto` (Files + Projekt+Gewerk auto + Planposition + Tags + Notiz) | `POST /api/media` |
| **plan-upload-modal** | Plan-File (PDF/PNG/JPG) + Planversion + Geschoss | `STATES.plan` (File + Projekt auto + Planversion + Geschoss + Planposition + Notiz) | `POST /api/plans` |
| **video-upload-modal** | Video + Cover-Frame wählen + Zuordnung | `STATES.video` (File + Cover-Frame + Projekt+Gewerk auto + Planposition + Tags + Notiz) | `POST /api/media` |
| **datei-waehlen-modal** | Beliebige Datei + Dokumenttyp | `STATES.datei` (Files + Projekt auto + Dokumenttyp + Notiz) | `POST /api/documents` |
| **export-modal** | Quelle + Format + Zeitraum + Optionen | `STATES.ex` (Source + Format + Von/Bis + 4 Boolean-Optionen) | `POST /api/exports` |
| **media-lightbox-modal** | Liste verwalten (Suche + Remove) | liest direkt aus `STATES[source].files` | – (kein Submit) |

### Submit-Mock pro Modal

Jedes Submit zeigt einen pro-Modal Status-Text (war vorher überall gleich — User konnte
nicht unterscheiden welcher API-Countpoint aufgerufen wurde):

| Modal | Loading-Text | Success-Text | Spinner-Dauer | Auto-Close |
|---|---|---|---|---|
| PW | "Projekt wird angelegt…" | "✓ Projekt angelegt" | 1400ms | nach 600ms |
| Foto | "Bilder werden hochgeladen…" | "✓ Bilder hochgeladen" | 1400ms | nach 600ms |
| Plan | "Plan wird hochgeladen…" | "✓ Plan hochgeladen" | 1400ms | nach 600ms |
| Video | "Video wird hochgeladen…" | "✓ Video hochgeladen" | 1400ms | nach 600ms |
| Datei | "Datei wird hochgeladen…" | "✓ Datei hochgeladen" | 1400ms | nach 600ms |
| Export | "Export wird vorbereitet…" | "✓ Export gestartet" | 1400ms | nach 600ms |

Im echten Produkt ersetzt `fetch()`-Call den Mock (siehe `docs/api/projects.create.md` etc.).

### Live-State-Roundtrip

Jede Eingabe fliesst in 2 Richtungen:
- **In den State** (`STATES[id][key] = value`)
- **In das Live-Panel** unter dem Trigger-Grid (`renderRt(id)` rendert JSON-highlighted)

Plus in den **Summary-Step** bei Step-Wechsel (`renderXxxSummary()` füllt `data-xxx-summary`).

Damit kann der User beim Klicken live sehen, was die App am Ende speichern würde — ohne dass
ein Submit nötig ist.

---

## Aufbau

### HTML-Struktur pro Modal

Jedes Modal folgt exakt diesem Muster:

```html
<div class="vd-modal-backdrop" data-bind="<id>" role="dialog" aria-modal="true"
     aria-label="<Titel>" hidden>
  <div class="vd-modal">                  <!-- oder vd-modal--wide für 720px -->
    <div class="vd-modal-main">
      <div class="vd-modal-head">
        <span>Titel</span>
        <button data-modal-close>X</button>
      </div>
      <div class="vd-modal-body">
        <div class="vd-wizard-steps" data-wizard="<id>">
          <button data-wz-step="1">1 Eckdaten</button>
          <span class="vd-wizard-sep"></span>
          <button data-wz-step="2">2 …</button>
        </div>
        <div data-wz-panel="1" class="vd-wz-panel">
          <!-- Step 1 Content -->
        </div>
        <div data-wz-panel="2" class="vd-wz-panel" hidden>
          <!-- Step 2 Content -->
        </div>
      </div>
      <div class="vd-modal-foot-progress">
        <div class="vd-modal-foot-progress-bar" data-wz-progress></div>
      </div>
      <div class="vd-modal-foot">
        <button data-wz-prev="<id>">Zurück</button>
        <span class="vd-modal-foot-spacer"></span>
        <span class="vd-modal-foot-info">
          <span data-wz-info="<id>">Schritt 1 von 2</span>
        </span>
        <button data-wz-next="<id>">
          <span data-wz-next-label="<id>">Weiter</span>
        </button>
      </div>
    </div>
  </div>
</div>
```

### `data-*`-Kontrakte

Die JS-Engine sucht im DOM nach diesen Attributen — sie sind die API zwischen HTML und JS:

| Attribut | Pflicht | Wo | Bedeutung |
|---|---|---|---|
| `data-open="<bind-id>"` | ja | Trigger-Button | Klick öffnet `[data-bind="<bind-id>"]` |
| `data-bind="<id>"` | ja | Backdrop | Selektor für `openModal()` |
| `data-wizard="<id>"` | ja | Step-Indikator | Identifiziert die Step-Gruppe (pw/foto/plan/video/datei/ex) |
| `data-wz-step="<n>"` | ja | Step-Pill | Klick springt zu Step n |
| `data-wz-panel="<n>"` | ja | Step-Inhalt | Wird bei `goStep` ein-/ausgeblendet |
| `data-wz-next="<id>"` | ja | Footer-Button "Weiter" | Bei letztem Step → submitMock |
| `data-wz-prev="<id>"` | ja | Footer-Button "Zurück" | Disabled auf Step 1 |
| `data-wz-info="<id>"` | ja | "Schritt N von M"-Counter | Wird bei Step-Wechsel aktualisiert |
| `data-wz-next-label="<id>"` | ja | Submit-Label-Span | Wird bei Submit durch Loading-Text ersetzt |
| `data-wz-jump="<n>"` | optional | Edit-Link in PW-Summary | Springt zu Step n |
| `data-wz-progress` | ja | Salwei-Progress-Bar | `style.width` wird bei Step-Wechsel gesetzt |
| `data-modal-close` | ja | X-Button im Head | `closeAll()` |
| `data-rt-body="<id>"` | ja | Live-State-Panel | `renderRt()` schreibt JSON hier rein |
| `data-rt-count="<id>"` | ja | Counter im Live-State-Header | "X Bilder · Y MB" etc. |
| `data-pw-required="true"` | PW | Pflicht-Feld | Validation rotiert bei Fail |
| `data-pw-validation` | PW | Warn-Banner | Wird sichtbar bei Step-1→2 Block |
| `data-pw-status-group` | PW | Pill-Group | Single-Select Status |
| `data-status="<Wert>"` | PW | Einzel-Pill | data-status ist der Wert |
| `data-pw-tags` | PW | Tag-Container | Lese-/Schreib-Tags |
| `data-pw-tag-input` | PW | Tag-Input | Enter fügt hinzu, Backspace entfernt |
| `data-tag-remove` | PW | X an einem Tag | Klick entfernt |
| `data-dropzone` | Upload | Drop-Zone | dragenter/over/leave/drop-Listener |
| `data-dz-action="picker\|camera"` | Upload | Sub-Button | Öffnet entsprechendes File-Input |
| `data-<prefix>-files` | Upload | File-Liste | Container für File-Cards |
| `data-<prefix>-empty` | Upload | Empty-State | Sichtbar wenn Liste leer |
| `data-<prefix>-more` | Upload | Lightbox-Trigger | Sichtbar wenn > 6 Files |
| `data-<prefix>-context-projekt` | Upload | Banner | Read-only Projektname (deprecated v2.0.4) |
| `data-file-id` | Upload | File-Card | Eindeutige File-ID |
| `data-remove-id="<id>"` | Upload | Remove-Button | Entfernt File aus State |
| `data-video-cover` | Video | Cover-Frame-Container | – |
| `data-cover-ts="<time>"` | Video | Einzelner Cover-Frame | z. B. "00:14" |
| `data-cover-selected` | Video | Span mit aktuellem Cover | Wird bei Klick aktualisiert |
| `data-ex-source` | Export | Quelle-Pill-Group | – |
| `data-source="<Wert>"` | Export | Einzelne Quelle-Pill | – |
| `data-ex-format` | Export | Format-Card-Grid | – |
| `data-format="<Wert>"` | Export | Einzelne Format-Card | – |
| `data-ex-quick` | Export | Quick-Pills-Row | 7/30/90/180/365 Tage |
| `data-quick-days="<n>"` | Export | Quick-Pill | Setzt Datums-Range |
| `data-ex-von` / `data-ex-bis` | Export | Datums-Inputs | Quick-Pills befüllen diese |
| `data-ex-options` | Export | Options-Container | – |
| `data-ex-opt="<key>"` | Export | Checkbox | "exif" / "comments" / "original-size" / "password" |
| `data-open-lightbox="<prefix>"` | Upload | Lightbox-Button | Öffnet media-lightbox-modal |
| `data-lightbox-grid` | Lightbox | Card-Grid | scrollt intern |
| `data-lightbox-search` | Lightbox | Such-Input | Live-Filter |
| `data-lightbox-title` | Lightbox | Modal-Titel | Wird pro Source gesetzt |
| `data-lightbox-meta` | Lightbox | "X Dateien · Y MB" | Live-Update |
| `data-lightbox-visible-count` | Lightbox | "X sichtbar"-Counter | Live-Update bei Suche |
| `data-lightbox-empty` | Lightbox | "Keine Treffer" | Sichtbar bei 0 Treffern |

### CSS-Architektur

Drei Ebenen, in dieser Reihenfolge spezifisch (unten überschreibt oben):

1. **Design-Tokens** (CSS-Custom-Properties auf `:root`): Salwei-Primärfarbe, Dark/Light-Schemata,
   Border-Farben, Text-Töne, Spacing-Tokens (2/3/4/5/6 in 8px-Schritten), Border-Radii
2. **Komponenten-Klassen** (BEM-light, mit `.vd-` Prefix): `.vd-modal`, `.vd-dropzone`,
   `.vd-button--primary/secondary/ghost`, `.vd-field-input/select/textarea`, `.vd-wizard-step`,
   `.vd-status-pill`, `.vd-context-banner`, `.vd-lightbox-card`, etc.
3. **Modifier-Klassen** (mit `--`): `--active`, `--done`, `--invalid`, `--compact`, `--wide`

Keine IDs für Styling (nur für `<label for="">` und File-Input-Selectors). Alle Styles in einer
Datei (`modals-showcase.html` inline `<style>`) — im echten Produkt ausgelagert in `app-shell.css`.

### JS-Engine-Patterns

**Single IIFE**, alle Helper als lokale Funktionen. Pattern pro Modal-Typ:

| Pattern | Verwendung |
|---|---|
| `bindPwFields()` | PW-spezifisch (Tag-Picker, Status-Pills, Validation mit 5 Pflicht-Feldern) |
| `bindUploadWizard(prefix, opts)` | Shared für Foto/Plan/Video/Datei (Dropzone, File-Handling, Thumbnail-Generation, Remove) |
| `bindPlanFields()` | PW-spezifisch (Plan-Validation mit Date-Pflicht-Feldern) |
| `bindExFields()` | Export-spezifisch (Quelle/Format-Pills, Datums-Range, Quick-Pills, Options-Checkboxen) |
| `openModal(selector)` / `closeAll()` / `goStep(id, n)` | Modal-Lifecycle, alle Modals |
| `renderRt(id)` | Live-State-Panel (JSON highlight) |
| `renderPwSummary()` / `renderFotoSummary()` / … | Summary im Bestätigen-Step |
| `submitMock(id, btn)` | Simuliert API-Call mit pro-Modal Copy |
| `openLightbox(prefix)` / `renderLightbox(filter)` | Lightbox-Lifecycle + Live-Suche |
| `resetWizardState(backdrop)` | Reset beim Öffnen (Validation-State, Spinner, disabled-Buttons) |

**Globale Konstanten**: `CURRENT_PROJECT`, `CURRENT_GEWERK` (User-Kontext, in echtem Produkt via
`/api/session`).

**State-Initialisierung**: in `init()` einmal, inkl. `renderRt()` für alle Modals → Live-Panels
zeigen direkt beim Laden die Default-Werte.

---

## UX

### User-Flow pro Modal-Typ

**Wizard-Flow (PW mit 3 Steps):**
```
Öffnen → Step 1 (Eckdaten) → Pflicht-Validation → Step 2 (Planung) → Step 3 (Bestätigen) → Submit
                              ↓ wenn Validierung fail
                            Inline rot + Warn-Banner
                            "Weiter" bleibt auf Step 1
```

**Upload-Flow (Foto/Plan/Video/Datei mit 2 Steps):**
```
Öffnen → Step 1 (File + Zuordnung) → "Weiter" wenn Files vorhanden → Step 2 (Bestätigen) → Submit
                                     ↓ wenn Files=0
                                   "Weiter" bleibt auf Step 1
                                   (kein Validation-Banner, kein Toast)
```

**Single-Step-Flow (Lightbox, Export-Step 2):**
```
Öffnen → Aktion → Zurück / Schließen
```

### Validation-Prinzipien

- **Inline rot** bei leerem Pflicht-Feld (`vd-field-input--invalid` + sichtbare `.vd-field-error`)
- **Auto-Reset** beim Tippen (Listener ruft `clearPwInvalid()` o. ä.)
- **Banner** nur beim Klick auf „Weiter" oder Step-Indikator (nicht live)
- **Step-Indikator-Klick** triggert die gleiche Validation wie „Weiter" — User kann nicht
  von Step 1 weg ohne die Pflicht-Felder
- **„Weiter" nie disabled** — User kann immer klicken und sehen was fehlt (besser als
  ausgegraute Buttons die nicht erklären warum)

### Auto-Konventionen (gemeinsam für alle 4 Upload-Modals, v2.0.4+)

- **Projekt wird automatisch gesetzt** aus `CURRENT_PROJECT` (im echten Produkt via `/api/session`)
- **Foto + Video zusätzlich: Gewerk** aus `CURRENT_GEWERK`
- **Kein Projekt-Select, kein Projekt-Banner** im UI — User ist eh im aktuellen Projekt
- **Submit-Payload enthält Projekt + Gewerk trotzdem** (für API-Konsistenz)

### Live-State-Verhalten

- Jede Eingabe (Input/Select/Checkbox/Pill/Tag) aktualisiert sofort den State + Live-Panel
- User sieht beim Tippen live, was gespeichert würde (kein „Submit to see")
- Live-Panel ist im **Showcase** prominent sichtbar; im echten Produkt ausblendbar / nur
  in Dev-Mode

### Lightbox-Verhalten

- **Trigger**: Button erscheint unter File-Liste wenn > 6 Files (Foto/Datei) bzw. > 1 File (Plan/Video)
- **Klick**: öffnet media-lightbox-modal mit Vollbild-Grid (140px Mindestbreite pro Card)
- **Suche**: Live-Filter über Dateinamen, "X sichtbar"-Counter, "Keine Treffer"-Empty-State
- **Remove im Lightbox**: ändert direkt `STATES[source].files`, triggert Re-Render im
  Upload-Modal → User sieht Änderung sofort beim Schließen
- **„Zurück zum Upload"**: schließt Lightbox, Upload-Modal ist wieder im Vordergrund
  (kein Zustandsverlust)

### Tastatur

| Taste | Aktion |
|---|---|
| **ESC** | Schließt das aktive Modal (alle) |
| **Enter** | Im Input/Select → triggert „Weiter" (nicht in Textarea) |
| **Tab** / **Shift+Tab** | Standard-Tab-Reihenfolge (logisch: Step-Indikator → Form → Footer) |
| **P im Tag-Input** | Fügt „P" als Tag hinzu (PW-Modal Tag-Picker) |
| **Backspace auf leerem Tag-Input** | Entfernt letzten Tag |

Im echten Produkt: **Focus-Trap zwingend erforderlich** (siehe `docs/ux/accessibility.md`).

### Edge-Cases die die Engine heute schon abdeckt

| Edge-Case | Verhalten |
|---|---|
| User öffnet Modal, schließt mit ESC, öffnet wieder | State bleibt erhalten, Reset nur bei explizitem Submit |
| User pasted 100 Files via Drag-Drop | File-Liste scrollt intern, Lightbox-Button erscheint |
| User entfernt im Lightbox das letzte File | Upload-Modal zeigt Empty-State, „Weiter" bleibt blockiert |
| User sucht im Lightbox nach nicht-existentem Namen | "Keine Treffer"-Empty-State, State unverändert |
| User drückt Enter in Textarea | Kein „Weiter"-Trigger (nur in Input/Select) |
| User öffnet 2 Modals hintereinander ohne Schließen | `closeAll()` schließt alle, dann `openModal()` öffnet das neue |
| User resized Browser-Fenster während Modal offen | Modal repositioniert sich automatisch (CSS `place-items: center`) |

### Was bewusst NICHT im Showcase ist (TODOs für Production)

- Echte `fetch()`-Calls statt `submitMock()`
- Focus-Trap-Library (`focus-trap` oder Vanilla)
- `aria-live="assertive"` auf Validation-Banner und Progress-Bar
- `@media (prefers-reduced-motion: reduce)` → Animationen aus
- Korrekte ARIA-Rollen für Pill-Groups (`role="radio"` statt `button`)
- Tag-Picker als `role="list"` mit `role="listitem"` pro Tag
- File-Input Validation (echte Dateityp-Prüfung serverseitig)
- EXIF-Extraktion aus File-Objekten
- Video-Dauer aus File-Objekt auslesen (via `<video>`-Element)

---

## UI

### Design-Tokens

```css
:root, [data-theme="dark"] {
  --bg-base:        #14181B;      /* Haupt-Background */
  --bg-panel:       #1F2429;      /* Modal-/Card-Background */
  --bg-raised:      #2A2F35;      /* Erhöhte Elemente (Inputs, Pills) */
  --border-default: #2F353C;      /* Standard-Border */
  --border-subtle:  rgba(255,255,255,0.06);
  --text-high:      #F2F4F7;      /* Haupttext */
  --text-mid:       #A3ACB8;      /* Sekundärtext (Labels) */
  --text-low:       #6B7480;      /* Tertiärtext (Helper, Captions) */
  --color-primary:  #668048;      /* Salwei (Schweizer Salbei) */
  --color-primary-hover:  #7A9359;
  --color-primary-press:  #566B3D;
  --color-primary-soft:   rgba(102,128,72,0.14);
  --status-info:    #5B8DEF;
  --status-warn:    #F5C768;      /* Validation-Banner */
  --status-error:   #F26B6B;      /* Invalid-State */
  --font-sans: Inter, system-ui, ...;
  --font-mono: "JetBrains Mono", ui-monospace, ...;
  --radius-container: 10px;
  --radius-small:    8px;
  --radius-preview:  12px;
  --space-2: 8px;  --space-3: 12px;  --space-4: 16px;
  --space-5: 20px; --space-6: 24px;
}

[data-theme="light"] {
  --bg-base:        #F7F8F5;
  --bg-panel:       #FFFFFF;
  --bg-raised:      #EDEFE9;
  --border-default: #D9DCD3;
  --border-subtle:  rgba(31,36,41,0.08);
  --text-high:      #1F2429;
  --text-mid:       #5A636C;
  --text-low:       #8B929B;
  --color-primary:  #668048;      /* Salwei bleibt gleich */
}
```

### Layout-Konventionen

| Element | Konvention |
|---|---|
| **Modal-Breite** | Standard 560px, Wide (PW/Export/Video) bis 720px |
| **Modal-Max-Höhe** | `min(96vh, intrinsic content height)` — wächst mit Inhalt, scrollt nur bei sehr kleinen Viewports (< 600px hoch) |
| **Modal-Padding** | Head: `14px 20px` · Body: `20px` · Foot: `12px 20px` |
| **Field-Spacing** | Vertical 10–12px zwischen Feldern im gleichen Block |
| **Section-Label** | 11px / weight 600 / `text-mid` / uppercase / letter-spacing 0.06em |
| **Field-Label** | 12px / weight 500 / `text-mid` / letter-spacing 0.01em |
| **Helper-Text** | 11px / weight 400 / `text-low` / unter dem Feld |
| **Trennlinien** | 1px `border-default`, Margin 16px oben/unten |
| **Button-Höhe** | 36px Standard, 32px in Dropzones |
| **Border-Radius** | Container 10px, kleine Elemente (Inputs, Pills) 8px, Pills (Status) 999px |

### Dropzone-Konvention (alle 4 Upload-Modals, v2.0.5)

```
┌─ .vd-dropzone ─────────────────────────────────────────────────┐
│ [icon]  Titel – hier ablegen oder aufnehmen        [Btn][Btn] │
│         Sub – JPG, PNG, HEIC · max. 25 MB · Mehrfachauswahl   │
└────────────────────────────────────────────────────────────────┘
```

- Horizontal, kompakt (~64px hoch)
- Buttons je nach Medium: Foto/Video = Picker + Kamera · Plan/Datei = nur Picker
- Dashed Border 1.5px in `border-default`, hover/active → `color-primary`
- Icon 28×28 in Salwei mit 75% Opacity

### Scroll-Verhalten

| Element | Scrollt? | Warum? |
|---|---|---|
| **Modal-Body** (Standard-Upload-Modals) | Nein (Default) | Modal wächst mit Inhalt, max-height 96vh als Sicherheitsnetz |
| **Modal-Body** (Mobile < 600px hoch) | Ja | Fallback wenn Viewport zu klein |
| **File-Liste** im Upload-Modal | Ja (ab 240px) | Schützt Modal vor 50+ Files |
| **Lightbox-Grid** | Ja (ab 480px) | Schützt Lightbox vor 50+ Files, Toolbar/Footer bleiben fix |
| **Textarea** | Ja (ab 140px bzw. 160px) | Schützt Modal vor langem Notiz-Text |
| **Modal-Backdrop** | Nein | Sollte immer den ganzen Viewport füllen |
| **Page hinter Modal** | Nein (`body.is-modal-open { overflow: hidden }`) | Verhindert Page-Scroll hinter Modal |

### Animationen

- **Modal-In**: `vd-modal-in 180ms ease-out` (translateY 8px → 0, opacity 0 → 1)
- **Backdrop-Fade**: `vd-fade-in 150ms ease-out`
- **Step-Wechsel**: `vd-panel-in 160ms ease-out` (translateY 4px → 0)
- **Hover-States**: Border-/Background-Wechsel in 150ms
- **Reduced-Motion**: TODO für Production — `@media (prefers-reduced-motion: reduce)` deaktiviert Animationen

### Dark/Light-Support

Modal respektiert `data-theme="dark|light"` am `<html>`-Element. Salwei-Primärfarbe bleibt in
beiden Schemata gleich (Brand-Konsistenz). Background-, Border- und Text-Töne wechseln automatisch.
Alle CSS-Variablen sind themable.

### Responsive-Verhalten

| Viewport | Verhalten |
|---|---|
| **Desktop ≥ 900px** | Modal mittig, max-width 560–720px |
| **Tablet 600–900px** | Modal geht auf max-width: 90vw, einheitlich |
| **Mobile < 600px hoch** | Modal-Body scrollt intern als Fallback |
| **Mobile < 600px breit** | Modal padding reduziert, Wizard-Step-Labels kürzer (geplant für Production) |

### Was im echten Produkt noch fehlt (UI-Punkte)

- Responsive-Anpassungen für Mobile (Wizard-Step-Indikator wird einspaltig)
- Echte Lightbox-Animation beim Öffnen aus Upload-Modal (slide-up statt fade)
- Tag-Picker als Dropdown statt Inline (für Mobile)
- Toast-Notifications statt inline-Status (für Production)

---

## Layout

```
┌─ Backdrop (fixed, inset:0, blur:4px) ─────────────────────────┐
│                                                                │
│   ┌─ .vd-modal (94vw, max-height 90vh, grid 1fr|360px) ───┐  │
│   │ ┌─ .vd-modal-main ────────────────────────────────────┐ │  │
│   │ │ ┌─ .vd-modal-head ─────────────────────────────────┐│ │  │
│   │ │ │ <Counter>                       [X Close]        ││ │  │
│   │ │ └──────────────────────────────────────────────────┘│ │  │
│   │ │ ┌─ .vd-modal-body ─────────────────────────────────┐│ │  │
│   │ │ │ ┌─ .vd-wizard-steps ────────────────────────────┐││ │  │
│   │ │ │ │ [1] Eckdaten ─── [2] Planung ─── [3] Bestätigen││ │  │
│   │ │ │ └────────────────────────────────────────────────┘││ │  │
│   │ │ │ ┌─ .vd-wz-panel (Step-Inhalt) ──────────────────┐││ │  │
│   │ │ │ │   – pro Modal unterschiedlich                │││ │  │
│   │ │ │ └──────────────────────────────────────────────┘││ │  │
│   │ │ └──────────────────────────────────────────────────┘│ │  │
│   │ │ ┌─ .vd-modal-foot ─────────────────────────────────┐│ │  │
│   │ │ │ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ (Progress-Bar 2px)              ││ │  │
│   │ │ │ [Zurück]              Schritt 1 von 3  [Weiter]   ││ │  │
│   │ │ └──────────────────────────────────────────────────┘│ │  │
│   │ └──────────────────────────────────────────────────────┘ │  │
│   │ ┌─ .vd-modal-side (360px, nur bei .vd-modal ohne Variant)│ │
│   │ │   Meta-Side-Panel (Lightbox-Variante, im Showcase     │ │
│   │ │   nicht aktiv weil alle 4 Modals Wizards sind)        │ │
│   │ └──────────────────────────────────────────────────────┘ │
│   └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

**Responsive-Verhalten:**

- **Desktop ≥ 900px:** Modal mittig im Backdrop, Side-Panel sichtbar (falls vorhanden).
- **Tablet < 900px:** Modal geht auf `grid-template-columns: 1fr`, max-height 96vh.
- **Mobile < 600px:** Innen-Padding von 20px auf 16px, Format-Cards werden einspaltig, Footer bleibt voll sichtbar.

---

## Modal-Details

### 1. Projekt-Wizard (`neues-projekt-modal`)

**Zweck:** Neues Projekt anlegen mit drei klaren Phasen.

**Step 1 — Eckdaten** (8 Felder, 5 Pflicht):
- Projekttitel * (Pflicht, Text)
- Strasse + Nr. * (Pflicht, Text)
- PLZ * (Pflicht, 4-stellig numerisch, `inputmode="numeric"`, `maxlength="4"`)
- Ort * (Pflicht, Text)
- Bauleiter * (Pflicht, Select)
- Auftraggeber (optional)
- Projekttyp (Select: Neubau / Umbau / Sanierung / Erweiterung)
- Status (Single-Select Pill-Group: Planung / Aktiv / Abgeschlossen / Pausiert)
- Kurzbeschrieb (Textarea, optional)

**Step 2 — Planung:**
- Geplanter Start (Date-Input)
- Geplantes Ende (Date-Input)
- Tags (Tag-Picker mit Live-Add per Enter, Backspace-remove)
- Erste Meilensteine (Textarea)

**Step 3 — Bestätigen:**
- "Bereit"-Banner (Salwei-Checkmark)
- 2-Spalten-Summary. Adresse wird wieder zusammengesetzt: `Strasse, PLZ Ort`
- Edit-Links springen zurück zu Step 1 oder 2

**Validation:**
- Step 1 → Step 2 blockiert, wenn Titel, Strasse, PLZ, Ort oder Bauleiter leer sind.
- PLZ-Feld akzeptiert nur 4 Ziffern (`pattern="[0-9]{4}"`, `maxlength="4"`, `inputmode="numeric"` —
  öffnet auf Mobile den Nummernblock statt der Tastatur).
- Fehler erscheinen inline rot UND als Warn-Banner (`[data-pw-validation]`) unter dem Formular.
- Beim Tippen verschwindet der Fehler automatisch.

**Designentscheidungen:**
- **Adresse in 3 Felder aufgeteilt** (v2.0.7) — PLZ und Ort sind strukturierte Daten, keine
  Freitext-Anhäufsel. Ermöglicht saubere Suche, Sortierung und Geo-Lookup später.
- **Budget entfernt** (v2.0.7) — Budget wird beim Anlegen selten präzise bekannt und gehört
  in den Projektverlauf (z. B. Kostenplanung im Modul „Kosten"), nicht in den Wizard.

### 2. Foto aufnehmen (`foto-aufnahme-modal`)

**Zweck:** Mehrere Bilder gleichzeitig aufnehmen oder hochladen (Kamera-First-Flow).

**Step 1 — Bilder & Metadaten:**
- Dropzone mit **3 Quellen**: Drag-and-Drop, Datei-Picker, Kamera (`capture="environment"`).
- File-Liste mit Vorschau-Thumb + EXIF-Meta + Remove-Button.
- **Kein Projekt-/Gewerk-Feld** im UI — werden automatisch aus dem App-Kontext gesetzt
  (siehe gemeinsame Konvention oben).
- **Echte Eingabefelder**: Planposition (Select), Tags (Text, Komma-getrennt), Notiz (Textarea).
- **Kein Status-Feld** — Bilder starten immer mit Status "Neu", Reifegrad-Tracking
  passiert später in der Galerie.

**Step 2 — Bestätigen:**
- Anzahl + Gesamtgrösse (live berechnet aus File-Liste).
- Planposition + Tags aus Step 1 + Projekt/Gewerk aus Kontext (automatisch, im Live-Panel sichtbar).
- Submit-Hinweis: `POST /api/media` mit Multipart.

**Validation:**
- Step 1 → Step 2 blockiert, wenn File-Liste leer ist.

**Layout:** Modal `max-width: 560px`. Section-Label 10.5px / 0.08em Letter-Space — kompakter
Eindruck passend zum Kamera-First-Flow auf Mobile.

### 3. Plan hochladen (`plan-upload-modal`)

**Zweck:** Einen Plan (PDF oder gerendertes PNG/JPG) inkl. Version und Geschoss hochladen.

**Step 1 — Plan & Metadaten:**
- **Kompakte horizontale Dropzone** (`.vd-dropzone--compact`): Icon links, Text mittig,
  „Plan wählen"-Button rechts. Kleiner und ruhiger als die Standard-Dropzone.
- File-Filter: `accept="application/pdf,image/png,image/jpeg"`, max 50 MB, **1 Plan pro Upload**.
- **Kein Projekt-Feld** im UI — automatisch aus App-Kontext (siehe gemeinsame Konvention).
- **Echte Eingabefelder (2 Pflicht + 2 optional):**
  - Planversion * (Pflicht, Select mit bestehenden Versionen + „Neue Version anlegen")
  - Geschoss * (Pflicht, Select: UG / EG / 1.-3. OG / DG / Schnitt / Ansicht)
  - Planposition (optional, freier Text)
  - Notiz (optional, Textarea)

**Step 2 — Bestätigen:**
- Datei-Name + Grösse + Projekt aus Kontext + Planversion + Geschoss + Planposition + Notiz.
- Submit-Hinweis: `POST /api/plans` mit Multipart.

**Validation:**
- Step 1 → Step 2 blockiert, wenn **Plan-Datei fehlt ODER eines der 2 Pflichtfelder leer** ist
  (Planversion / Geschoss). Inline rot + automatischer Reset beim Tippen.

**Designentscheidungen:**
- **Status + Revisions-Nr. entfernt** (v2.0.3) — Plan-Versionen sind immutable Referenzen
  (siehe ARCHITECTURE.md). Status ergibt sich implizit aus Upload-Reihenfolge, Revisions-Nr.
  ist redundant zur Planversion-Select-Option.
- **Projekt-Select + Context-Banner entfernt** (v2.0.4) — Upload passiert immer im aktuellen
  Projekt-Kontext, kein Auswahl-Feld und keine UI-Anzeige mehr nötig.
- Plan-Versionen sind immutable Referenzen. Jede Version ist ein eigener Upload mit eigenem
  Zeitstempel, kein Replace.

### 4. Video hochladen (`video-upload-modal`)

**Zweck:** Ein Video mit Cover-Frame-Auswahl hochladen.

**Step 1 — Video & Metadaten:**
- Dropzone für Video-Files, 3 Quellen (Drop, Picker, Kamera `capture="environment"`).
- File-Card mit Dauer, Codec, Auflösung.
- Cover-Frame-Picker (5 Frames, Single-Select mit Salwei-Border).
- **Kein Projekt-/Gewerk-Feld** im UI — automatisch aus App-Kontext.
- **Echte Eingabefelder**: Planposition (Select), Dauer-Stempel (Select), Tags (Text), Notiz (Textarea).

**Step 2 — Bestätigen:**
- Cover-Frame-Zeitstempel aus Picker.
- Tags + Projekt/Gewerk (automatisch).
- Submit-Hinweis: `POST /api/media` mit Multipart.

**Validation:**
- Step 1 → Step 2 blockiert, wenn keine Video-Datei ausgewählt ist.

### 5. Datei wählen (`datei-waehlen-modal`) — NEU in v2.0

**Zweck:** Beliebige Datei (Dokument, Vertrag, Rapport, Bewilligung) ohne Format-Filter hochladen.

**Step 1 — Datei & Metadaten:**
- Dropzone (Drag-and-Drop oder Picker), **kein Kamera-Button** — Dateien entstehen nicht spontan.
- File-Filter: `accept="*/*"`, max 100 MB, **Mehrfachauswahl** möglich.
- **Kein Projekt-Feld** im UI — automatisch aus App-Kontext.
- **Echte Eingabefelder**: Dokumenttyp (Dokument/Vertrag/Rapport/Bewilligung/Sonstiges), Notiz.

**Step 2 — Bestätigen:**
- Anzahl + Gesamtgrösse + Datei-Liste + Projekt aus Kontext.
- Submit-Hinweis: `POST /api/documents` mit Multipart.

**Validation:**
- Step 1 → Step 2 blockiert, wenn File-Liste leer ist.

**Designentscheidung:** „Datei wählen" ist seit der App-Umstellung ein eigener Top-Level-Trigger
(siehe Screenshot 2). Vorher war es nur ein Sub-Button innerhalb der Foto-Dropzone. Das ist
inkonsistent — User mit reinen Dokumenten-Uploads mussten durch das Foto-Modal durch.
Jetzt eigener Modal mit `accept="*/*"`, damit der UI-Flow zur tatsächlichen Nutzung passt.

### 6. Export (`export-modal`)

**Zweck:** Datenexport als PDF, ZIP oder CSV. (Specs siehe ursprüngliche v2.0-Doku, hat
sich seit v2.0.4 nicht geändert — gleiches Modal wie zu Beginn.)

### 7. Media-Lightbox (`media-lightbox-modal`) — NEU in v2.0.9

**Zweck:** Vollbild-Verwaltung der File-Liste für lange Uploads (50+ Bilder, mehrere Videos).
Verhindert dass das Upload-Modal gesprengt wird, gibt dem User Kontrolle.

**Trigger:**
- Wird aus jedem der 4 Upload-Modals (Foto/Plan/Video/Datei) geöffnet via
  „Alle X Bilder/Dateien ansehen"-Button
- Button erscheint nur, wenn die File-Anzahl > 6 ist (Threshold)
- Bei Plan/Video (single-file) erscheint er ab > 1 Datei

**Layout:**
- Modal `max-width: 920px`, `max-height: 96vh`
- **Toolbar oben**: Suchfeld (live-Filter nach Dateiname) + „X sichtbar"-Counter
- **Grid darunter**: `auto-fill, minmax(180px, 1fr)` — passt sich an Fensterbreite an
- **Cards pro File**: Thumbnail (4:3 Aspect-Ratio), Name, Grösse + MIME-Type, Remove-Button (erscheint bei Hover)
- Footer: „Änderungen wirken sich sofort auf das Upload-Modal aus" + „Zurück zum Upload"-Button

**Datenmodell:**
- Lightbox liest direkt aus `STATES[sourcePrefix].files` (gleiche Datenstruktur wie die
  kompakte Liste im Upload-Modal — kein separater State)
- Remove im Lightbox aktualisiert State UND ruft `renderUploadFiles(source)` auf,
  sodass die Liste im Upload-Modal automatisch synchron bleibt
- Such-Filter ist rein visuell (löscht nichts aus dem State), leerer State bei 0 Treffern

**Engine:**
- `openLightbox(prefix)` öffnet das Modal mit der richtigen Datenquelle
- `renderLightbox(filter)` rendert die Cards + filtered live
- Such-Handler delegiert auf `renderLightbox(searchValue)`

**Designentscheidung:** Statt einer eingebauten Lightbox im Upload-Modal haben wir ein
eigenes Modal. Vorteile: das Upload-Modal bleibt schlank und schnell (auch bei 100 Bildern),
der User kann sich auf das Verwalten konzentrieren ohne Ablenkung durch die anderen
Form-Felder, und der „Zurück"-Button gibt eine klare Navigation. Inline-Lösungen
(z. B. expand-on-click im gleichen Modal) wurden verworfen weil sie Layout-Shifts
verursachen und bei vielen Files unbenutzbar werden.

**Zweck:** Datenexport als PDF, ZIP oder CSV.

**Step 1 — Quelle + Format:**
- Quelle (Single-Select Pill-Group): Aktuelles Projekt / Alle Projekte / Galerie / Audit-Log
- Format (Single-Select Cards): PDF-Bericht / ZIP-Bundle / CSV-Tabelle

**Step 2 — Zeitraum + Optionen:**
- Datums-Range (Von / Bis) — wird durch Quick-Pills befüllt
- Quick-Pills (Single-Select): 7 / 30 / 90 / 180 Tage oder Aktuelles Jahr
- 4 Options-Checkboxen: EXIF einbetten / Kommentare einschliessen / Originalgrösse / ZIP-Passwort

**Validation:**
- Step 1 → Step 2 blockiert, wenn weder Quelle noch Format gewählt ist.

---

## JS-API

Die Engine ist in einem IIFE im `<script>`-Block gekapselt. Exposed:

```js
// Öffnet ein Modal
openModal('[data-bind="project-wizard-modal"]');

// Schliesst alle Modals
closeAll();

// Springt direkt zu einem Step
goStep('pw', 2);  // Springt zu Step 2 des PW
```

**Intern:**

```js
SUBMIT_LABEL = {
  pw:    'Projekt anlegen',
  photo: 'Bilder hochladen',
  video: 'Video hochladen',
  ex:    'Export starten',
};
```

**Datenattribute (DOM-Kontrakte):**

| Attribut | Pflicht | Bedeutung |
|---|---|---|
| `data-open="<data-bind-id>"` | ja, am Trigger | Klick öffnet das entsprechende Modal |
| `data-bind="<id>"` | ja, am Backdrop | Selektor, der von `openModal` angesprochen wird |
| `data-wizard="<id>"` | ja, in jedem Wizard | Identifiziert die Step-Gruppe (pw / photo / video / ex) |
| `data-wz-step="<n>"` | ja | Step-Indikator-Klick → springt zu Step n |
| `data-wz-panel="<n>"` | ja | Inhalts-Panel, wird bei `goStep` ein-/ausgeblendet |
| `data-wz-next="<id>"` | ja | Footer-Button "Weiter" / Submit-Label |
| `data-wz-prev="<id>"` | ja | Footer-Button "Zurück" |
| `data-wz-info="<id>"` | ja | "Schritt N von M"-Counter |
| `data-wz-next-label="<id>"` | ja | Span, dessen Text bei Submit-Mock geändert wird |
| `data-wz-jump="<n>"` | ja | Edit-Links in Summary, springen zu Step n |
| `data-wz-progress` | ja | Salwei-Progress-Bar im Footer (style.width setzen) |
| `data-modal-close` | ja | Close-Button (X) im Head |
| `data-pw-required="true"` | ja | Pflicht-Feld im PW (rotiert bei Validation-Fail) |
| `data-pw-validation` | ja | Banner "Pflichtfelder fehlen" |
| `data-pw-status-group` | ja | Pill-Group für Status-Single-Select |
| `data-status="<Wert>"` | ja | Einzel-Pill mit Status-Name |
| `data-pw-tags` | ja | Container für Tag-Picker |
| `data-pw-tag-input` | ja | Input im Tag-Picker |
| `data-tag-remove` | ja | X-Button an einem Tag |
| `data-photo-files` | ja | File-Liste im Foto-Upload |
| `data-file-id` | ja | Einzelne File-Card |
| `data-file-remove` | ja | X-Button pro File |
| `data-dropzone` | ja | Drag-Zone, hört auf dragenter/over/leave/drop |
| `data-video-files` | ja | File-Liste im Video-Upload |
| `data-video-file` | ja | Einzelne Video-Card |
| `data-video-cover` | ja | Cover-Frame-Picker-Row |
| `data-cover-ts="<time>"` | ja | Einzelner Cover-Frame (z. B. "00:14") |
| `data-cover-selected` | ja | Span mit dem aktuell gewählten Cover |
| `data-ex-source` | ja | Pill-Group für Quelle |
| `data-source="<Wert>"` | ja | Einzelne Quell-Pill |
| `data-ex-format` | ja | Card-Group für Format |
| `data-format="<Wert>"` | ja | Einzelne Format-Card |
| `data-ex-quick` | ja | Row mit Datums-Quick-Pills |
| `data-quick-days="<n>"` | ja | Setzt Datums-Range auf "vor n Tagen" (oder 365 = aktuelles Jahr) |
| `data-ex-von` / `data-ex-bis` | ja | Datums-Inputs, die Quick-Pills befüllen |
| `data-wz-jump` | ja | Edit-Link in PW-Summary |

---

## States

Jedes Modal durchläuft folgende UI-States:

| State | Trigger | Visuell |
|---|---|---|
| **idle** | Modal geöffnet | Step 1 sichtbar, "Zurück" disabled, "Weiter" enabled (wenn Validation ok) |
| **validating** | "Weiter" geklickt, Pflichtfeld leer | Rote Inline-Fehler + Warn-Banner, Step-Wechsel blockiert |
| **navigating** | Step-Indikator geklickt | Fade-In 160ms via `.vd-wz-panel` Animation |
| **submitting** | "Weiter" auf letztem Step geklickt | Spinner im CTA, Status-Text "Wird verarbeitet…", Footer-Info "Verarbeitung läuft…" |
| **success** | Nach ~1.4s Mock-Delay | CTA-Label "✓ {Original-Label}", Footer "Erfolgreich abgeschlossen", Auto-Close nach 600ms |
| **closing** | ESC oder Backdrop-Klick | Body-Klasse `is-modal-open` wird entfernt, Fade-Out via CSS |

---

## Keyboard

| Taste | Aktion |
|---|---|
| **ESC** | Schliesst das aktive Modal (alle) |
| **Enter** | Im Input/Select → triggert "Weiter" (nicht in Textarea) |
| **Tab** | Standard-Tab-Reihenfolge, kein Focus-Trap (im Showcase-Stub ausreichend) |
| **Shift+Tab** | Rückwärts-Navigation |

Im echten Produkt: Focus-Trap zwingend erforderlich (siehe `docs/ux/accessibility.md`).

---

## Accessibility

| Aspekt | Umsetzung |
|---|---|
| `role="dialog"` | Auf jedem `.vd-modal-backdrop` |
| `aria-modal="true"` | Auf jedem `.vd-modal-backdrop` |
| `aria-label` | Auf jedem Backdrop mit Modal-Namen ("Neues Projekt anlegen", "Neue Bilder laden", "Video hinzufügen", "Daten exportieren") |
| `aria-live` | TODO: Validation-Banner braucht `aria-live="assertive"` |
| Focus-Management | Erstes Input beim Öffnen bekommt Fokus (nach 200ms-Timeout wegen Animation) |
| Reduced Motion | TODO: `@media (prefers-reduced-motion: reduce)` → Animationen aus |
| Tab-Reihenfolge | Logisch: Step-Indikator → Form-Felder → Footer |
| Status-Pill-Group | TODO: `role="radiogroup"` mit `role="radio"` + `aria-checked` |
| Format-Card-Group | TODO: `role="radiogroup"` mit `role="radio"` + `aria-checked` |
| Tag-Picker | TODO: `role="list"` für Tags, `role="listitem"` pro Tag |

**TODO für Production (nicht im Showcase-Stub):**
- Echte Focus-Trap-Library (z. B. `focus-trap` oder Vanilla-Implementation)
- `aria-live` auf Validation-Banner und Progress-Bar
- `prefers-reduced-motion`-Respekt
- Korrekte ARIA-Rollen für Pill-Groups (radio statt button)

---

## Submit-Mock (Showcase-Stub)

Die "Submit"-Buttons in Step 3 (PW) bzw. Step 2 (Foto/Video/Export) machen im Showcase einen simulierten Submit:

```
1. Spinner im CTA einfügen (`.vd-spinner`)
2. CTA-Label ändern auf "Wird verarbeitet…"
3. CTA disabled = true
4. Footer-Info ändern auf "Verarbeitung läuft…"
5. Nach 1400ms:
   - Spinner entfernen
   - CTA-Label auf "✓ {Original-Label}"
   - Footer-Info auf "Erfolgreich abgeschlossen"
6. Nach weiteren 600ms:
   - Modal schliessen
```

Im echten Produkt ersetzt ein `fetch()`-Call den Mock. Siehe `docs/api/projects.create.md`,
`docs/api/media.create.md`, `docs/api/exports.create.md` (zu erstellen).

---

## Changelog

| Datum | Version | Änderung | Begründung |
|---|---|---|---|
| 2026-06-19 | v1.0 | Initiale Specs für 4 Modals | Konsolidierung der Showcase-Stubs in verbindliche Doku |
| 2026-06-19 | v1.1 | Live-Validierung im PW, File-Remove im Foto, Cover-Picker im Video, Quick-Pills im Export | User-Feedback: "Ablauf optimieren" |
| 2026-06-19 | v1.1 | Submit-Mock mit Spinner und Auto-Close | Konsistentes Feedback bei allen 4 Modals |
| 2026-06-19 | v1.1 | Progress-Bar im Footer + Step-Transition Fade | Visuelles Feedback beim Step-Wechsel |
| 2026-06-20 | v2.0 | Komplett-Rewrite: 6 dedizierte Modals (PW/Foto/Plan/Video/Datei/Export) hinter echten App-Buttons | User-Wunsch: 1:1 mit `index.html`-Topbar + Upload-Row |
| 2026-06-20 | v2.0 | Trigger-Replica (Topbar + Upload-Row) statt generischer Showcase-Karten | Konsistenz mit echter App |
| 2026-06-20 | v2.0 | Live-State-Panels pro Modal statt nur 4 generischen | User sieht 1:1 was die App speichern würde |
| 2026-06-20 | v2.0 | Geteilte `bindUploadWizard()`-Engine für Foto/Plan/Video/Datei | DRY: 1 Engine statt 4 separate |
| 2026-06-20 | v2.0 | Pro-Modal Submit-Copy (vorher überall "Wird verarbeitet…") | User-Feedback: "Alle Buttons kommen als Export raus" |
| 2026-06-20 | v2.0.1 | `.vd-modal-backdrop[hidden] { display: none !important }` | Bug: alle Backdrops stapelten sich übereinander, `display: grid` überschrieb User-Agent `[hidden]` |
| 2026-06-20 | v2.0.2 | Foto-Modal kompakter: Context-Banner für Projekt+Gewerk, Modal 560px, dichtere Typografie | User-Wunsch: "kompakter, Typografie anpassen" |
| 2026-06-20 | v2.0.3 | Plan-Modal kompakter: Compact-Dropzone, Context-Banner, 4 statt 7 Felder (Status+Revision raus) | User-Wunsch: "Drag-Drop kleiner, Status+Revision raus" |
| 2026-06-20 | v2.0.4 | Alle 4 Upload-Modals: Projekt automatisch (CURRENT_PROJECT), kein Select/Banner im UI | User-Wunsch: "Projekt wird klar angegeben, nicht auswählen" |
| 2026-06-20 | v2.0.5 | Alle 4 Dropzones identisch (Compact-Default), Source-Notes weg, Typografie vereinheitlicht | User-Wunsch: "gleiche Struktur in allen 4" |
| 2026-06-20 | v2.0.6 | Modal wächst mit Inhalt, Body scrollt nicht mehr (Fallback nur < 600px Viewport) | User-Wunsch: "nicht scrollbar" |
| 2026-06-20 | v2.0.7 | PW-Modal: Adresse aufgeteilt in Strasse/PLZ/Ort, Budget-Feld entfernt | User-Wunsch: "PLZ/Ort separat, Budget nicht beim Anlegen" |
| 2026-06-20 | v2.0.8 | Textareas haben max-height + resize:none + interner Scroll | Bugfix: lange Notizen sprengten Modal-Footer |
| 2026-06-20 | v2.0.9 | Lightbox-Modal für lange File-Listen (Threshold > 6), Live-Sync mit Upload-Modal | User-Wunsch: "kontrollierte Listen, eigenes Modal" |
| 2026-06-20 | v2.0.10 | Lightbox-Grid: quadratische Thumbs, max-height 480px, scrollt intern | User-Wunsch: "nur hier scrollen" |
| 2026-06-20 | v2.0.11 | **Doku-Spec komplett**: Architektur, Funktionen, Aufbau, UX, UI, data-*-Kontrakte, CSS-Tokens, Scroll-Verhalten | User-Wunsch: "Funktionen/Aufbau/UX/UI dokumentieren" |

---

## Siehe auch

- `modals-showcase.html` — Klickbare Demo aller 4 Modals (file://-kompatibel)
- `README.md` — Übersicht aller Frontend-Prototypen
- `COMPONENTS.md` — Komponenten-Manifest (Modals sind hier als LIVE registriert)
- `DESIGN.md` — Design-Tokens und Layout-Konventionen
- `ARCHITECTURE.md` — Folder-Disziplin, Lock-Status
- `PROTOTYP.md` — Journal mit Versions-Historie der Modal-Iterationen

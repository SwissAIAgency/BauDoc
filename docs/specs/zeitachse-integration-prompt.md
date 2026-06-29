# Master-Prompt: Zeitachse-Konzept in den Live-Prototyp integrieren

> Diesen Prompt kannst du 1:1 an einen frischen Claude-Code-Agenten geben.
> Er enthält Ziel, Kontext, Verträge, Deliverables und Akzeptanzkriterien.

---

## ROLLE
Du bist Senior-Frontend-Engineer. Du arbeitest am VisiDoc-Prototyp
(`frontend/prototypes/index.html`, ~13.700 Zeilen, statische HTML/CSS/JS-App,
deployed unter https://bau-doc.vercel.app/). Stack: kein Framework, alles
in einem File + `app-shell.css` für Tokens/Chrome.

## ZIEL
Integriere die **Zeitachse-Ansicht** (vertikaler Mittelstrich, Karten
alternierend rechts/links, neueste oben) **ausschliesslich in der Galerie**
des Live-Prototyps. Nutzer soll per **Toggle-Button** zwischen
**(A) klassischer Galerie-Ansicht** (Status quo: Hero + Kachel/Timeline/Liste)
und **(B) neuer Zeitachse-Ansicht** wechseln können.

Kein neues Standalone-File, keine parallele Implementierung.
Die Zeitachse muss sich in das **bestehende** View-Switch-System einreihen
(`data-vdg-view`-Attribut auf der Screen-Element-Section).

## DATEIEN, DIE EXISTIEREN
- `frontend/prototypes/index.html` — der Live-Prototyp. Hier wird gebaut.
- `frontend/prototypes/app-shell.css` — Design-Tokens (Salwei-Grün `#668048`
  als Primary, Light/Dark-Themes, `vd-*`-Komponenten). NICHT EDITIEREN —
  nur referenzieren via `var(--token)`.
- `frontend/prototypes/galerie-zeitachse-konzept.html` — Referenz-Konzept
  (eigenständig). Hier ist die Zeitachsen-Logik bereits ausgearbeitet.
  **Nur als Vorlage lesen, NICHT linken/inkludieren.**

## VERTRAG 1 — VIEW-SWITCH-MECHANIK (bestehend, MUSS wiederverwendet werden)
Die Galerie in `index.html` hat bereits 3 Views: `kachel`, `timeline`, `liste`.
Schalt-Mechanik:
- `<section class="vd-screen" data-screen="projekt-detail" data-vdg-view="…">`
- 3 viewtabs als Buttons mit `data-view="<name>"`
- JS-Funktion `setView(v)` setzt das Attribut und ruft `render()`
- CSS zeigt/versteckt Container per `[data-vdg-view="<name>"] .<container>`

**Eine "Zeitachse" wurde bereits als 4. View eingebaut** (Klassen `.za-*`).
Sie funktioniert. Aber: Der User möchte sie **nicht als 4. Tab**, sondern als
**eigenständigen Modus**, der sich über einen separaten Toggle-Button
**über die ganze Galerie** legt (Hero + Toolbar + Kachel-Grid weg, nur Zeitachse).

→ **Konsequenz**: Der bestehende `.za-*`-Code (CSS + HTML-Container + Render-
Funktion) bleibt; nur die **Sichtbarkeits-Logik** wird umgestellt:
- Toggle-Button in der Galerie-Toolbar (links neben den viewtabs, klar visuell
  abgesetzt — z.B. als Pill mit Label "Neue Ansicht: Zeitachse" oder als
  Segmented Control "Klassisch ↔ Zeitachse").
- Wenn ON: alles vom alten Galerie-Layout wird ausgeblendet (Hero, Meta-Panel,
  Toolbar-viewtabs, Kachel/Timeline/Liste). Nur die Zeitachse-Liste rendert.
- Wenn OFF: Status quo (Galerie wie heute).
- State wird in `localStorage("vd-gallery-mode")` persistiert.

## VERTRAG 2 — THEMING (HARTE REGEL)
Single source of truth: `data-theme`-Attribut auf `<html>`. Werte: `"dark" | "light"`.
- **Backgrounds NUR**: `var(--bg-base|--bg-panel|--bg-raised|--bg-elevated)`
- **Text NUR**: `var(--text-high|--text-mid|--text-low)`
- **Borders NUR**: `var(--line)`, `var(--line-strong)`, `var(--border-subtle)`
- **Akzent NUR**: `var(--color-primary)`, `var(--color-primary-soft)`,
  `var(--color-primary-hover)`
- **Glass-Pillen** (z.B. Datum-Chip auf Bild): 
  `background: color-mix(in srgb, var(--bg-panel) 88%, transparent)` +
  `color: var(--text-high)`. **KEIN** `rgba(255,255,255,…)`, **KEIN** `#fff`.
- Schatten kommen aus `var(--shadow-card|--shadow-pop|--shadow-modal)`.

Wenn du IRGENDWO einen Hex- oder rgba-Wert tippst, halt inne und prüfe,
ob es einen Token gibt. Es gibt fast immer einen.

## VERTRAG 3 — ZEITACHSE-VERHALTEN (bereits implementiert, NICHT brechen)
1. **Sortierung DESC** — neueste Bilder oben.
2. **Strikt alternierend** — Index 0 = rechts, Index 1 = links, dann immer
   alternieren. Keine Tagesgruppen-Logik.
3. **Karten-Body kollabiert by default**, Klick auf Head togglet `.open`
   (Animation via `grid-template-rows: 0fr → 1fr`).
4. **Datum-Pille** ist Glass-Overlay oben-links auf dem Bild (Vertrag 2).
5. **Fullscreen-Button** ist Glass-Overlay oben-rechts, nur on-hover sichtbar
   (`@media (hover: none) { opacity: 1 }` für Touch).
6. **Node + Connector** richten sich auf die **Bildmitte** aus (nicht
   Card-Mitte!) via CSS-Variable `--za-node-top`, gesetzt per JS aus
   `imgRect.height / 2`, beobachtet via `ResizeObserver`.
7. **Active-State**: `aria-selected="true"` auf `.za-card` → Salwei-Border
   + Salwei-Glow am Node (via `:has()`-Selektor, kein zusätzlicher JS-Sync).
8. **Klick auf Bild** ruft `selectItem(m)` (existiert), Klick auf
   `.za-fsbtn` öffnet den bestehenden Vollbild-Viewer via
   `document.getElementById('hero-fs').click()`.

## DELIVERABLES (was du am Ende geliefert haben musst)
1. **Toggle-Button** in der Galerie-Toolbar mit klarer Beschriftung
   ("Zeitachsen-Ansicht" oder Segmented Control). Position: links neben
   `.viewtabs`. Stil: `vd-button vd-button--ghost` oder `vd-button--outlined`.
2. **CSS-Erweiterung**: ein neuer State-Selektor (z.B. `body[data-gallery-mode="zeitachse"]`),
   der das Hero, Meta-Panel und das gesamte Toolbar-Center (Sortieren/Viewtabs/Zeitraum/Medientyp)
   ausblendet und nur den `#zeitachse`-Container in voller Breite zeigt.
3. **JS**: kleiner Initializer der `localStorage("vd-gallery-mode")` liest
   und das Body-Attribut setzt + Click-Handler auf den Toggle-Button.
4. **Render-Trigger**: wenn der Toggle auf "Zeitachse" springt und der
   existierende `render()`-Code noch nicht für die aktuelle Liste gelaufen
   ist, einmal `render()` auslösen.
5. **Dark + Light getestet**: in beiden Themes funktioniert alles
   (alle Texte lesbar, kein weisses Hardcode-Element).
6. **Responsive ≤820px**: Toggle-Button bleibt sichtbar (ggf. nur Icon ohne
   Label), Zeitachse-Layout fällt auf die einspaltige Mobile-Form zurück
   (CSS dafür existiert bereits in `.za-*`-Block).

## NICHT MACHEN (Stop-Liste)
- **Kein eigenes Lightbox-Konstrukt** — der Vollbild-Viewer der Live-App
  (`#hero-fs` + `#viewer`) bleibt der einzige.
- **Keine neuen Tokens, kein neuer Font, kein neues Stylesheet-Link**.
- **Kein Standalone-File schreiben/aktualisieren** — diese Arbeit ist
  ausschliesslich in `index.html`.
- **Kachel/Timeline/Liste-Render-Pfade nicht anfassen** — sie sind
  Production-Code für den Status-quo-Mode.
- **Den 4. viewtab "Zeitachse" aus den `.viewtabs` ENTFERNEN** — die
  Zeitachse ist jetzt ein eigener Mode, nicht eine View neben Kachel.
  Den `.za-*`-Container + CSS + Render-Code aber **behalten**.

## AKZEPTANZKRITERIEN (so weisst du, wann es fertig ist)
- [ ] Toggle-Button schaltet die Galerie sichtbar zwischen Klassik und
      Zeitachse, persistiert über Reload.
- [ ] Im Zeitachsen-Mode ist KEIN Hero, KEIN Meta-Panel, KEIN Kachel-Grid
      sichtbar — nur Toolbar (mit Toggle + ggf. Filter) und die vertikale
      Zeitachse.
- [ ] Im Klassik-Mode ist die Galerie **bitperfekt** wie heute — kein
      Pixel verschoben, kein Stilbruch, keine geänderten Klassen am
      Original-Markup.
- [ ] Theme-Wechsel (Dark↔Light) wirkt in beiden Modes sofort und korrekt
      auf jede sichtbare Fläche. Keine weissen Glas-Pillen im Dark-Mode.
- [ ] Bei Resize (Sidebar einklappen, Browser-Width ändern) bleibt der
      Knoten auf der Bildmitte sitzen (ResizeObserver greift).
- [ ] `selectItem()` synct den Active-State korrekt zwischen `.tile`,
      `.tl-col`, `<tr>` UND `.za-card` (eine Zeile in `selectItem`).
- [ ] `git diff --stat` zeigt nur Änderungen an `index.html` — sonst nichts.

## ARBEITSREIHENFOLGE (empfohlen)
1. Aktuellen Zustand der Galerie in `index.html` lesen (Suche nach
   `data-vdg-view`, `viewtabs`, `.za-`).
2. `viewtabs`-Block finden — den `data-view="zeitachse"`-Button **rausnehmen**.
3. Neuen Toggle-Button vor den `viewtabs` einfügen
   (in `<main class="main"> > .toolbar > .tool-left`).
4. Neue CSS-Regeln am Ende des Gallery-CSS-Blocks ergänzen:
   `body[data-gallery-mode="zeitachse"] .hero,
    body[data-gallery-mode="zeitachse"] .meta,
    body[data-gallery-mode="zeitachse"] .viewtabs,
    body[data-gallery-mode="zeitachse"] .grid,
    body[data-gallery-mode="zeitachse"] .timeline,
    body[data-gallery-mode="zeitachse"] .listwrap { display: none !important; }`
   Plus: Zeitachse in vollen Bildschirm rücken (Grid-Areas neu).
5. JS-Initializer + Click-Handler unten im `<script>`-Block der Galerie
   anbringen.
6. Beide Themes prüfen (Theme-Toggle in der Topbar nutzen).
7. Im Klassik-Mode ein Pixel-Diff gegen den Stand vor deinen Änderungen
   machen (visuell): es darf NICHTS unterschiedlich aussehen.

## FRAGEN, DIE DU NICHT STELLEN MUSST
- Brauchen wir noch den 4. Tab? → Nein, raus (siehe oben).
- Soll die Zeitachse den Hero behalten? → Nein, voller Fokus auf die Liste.
- Welche Farben? → Alles aus `app-shell.css`-Tokens (Vertrag 2).
- Wo speichern? → `localStorage("vd-gallery-mode")` mit Werten
  `"classic"` | `"zeitachse"`. Default ist `"classic"`.

## BESCHRIFTUNG (Vorschlag, anpassbar)
Toggle als Segmented Control:
```
[ Klassisch ] [ Zeitachse ]
```
oder als Single-Button:
```
[ ⇆ Zeitachsen-Ansicht ]   (ON wenn aktiv: gefüllt Salwei)
```
Beides ist OK — wähle Single-Button, wenn die Toolbar schon voll ist
(Segmented Control braucht ~180px).

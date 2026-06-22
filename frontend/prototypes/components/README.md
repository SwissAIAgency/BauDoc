# `components/` — Vanilla Custom Elements

> Self-contained UI-Bausteine für VisiDoc-Prototypen.
> **file://-kompatibel**, kein Build, keine ES-Modules.

## Konventionen

- **Naming**: `vd-*` Tag-Name + gleichnamige JS-Datei (`vd-theme-toggle.js`).
- **Custom Element registriert sich selbst** via `customElements.define()`.
- **CSS** kommt aus `../app-shell.css` (geteilte Styles) — die
  Custom Elements fügen **keine** eigenen Stylesheets ein, sie
  verwenden die vorhandenen Utility-Klassen.
- **Lock-Status** wird in `../COMPONENTS.md` gepflegt.

## Bausteine

| Tag                  | Datei                       | Status | Beschreibung |
|----------------------|-----------------------------|--------|--------------|
| `<vd-theme-toggle>`  | `vd-theme-toggle.js`        | 🟠 READ-ONLY (nach POC) | Sun/Moon-Pill, persistiert in `localStorage["visidoc-theme"]` |

## Verwendung in `index.html`

```html
<!-- Im <head> oder kurz vor </body> -->
<script src="components/vd-theme-toggle.js"></script>

<!-- Statt des alten <button id="vd-theme-toggle">...</button> -->
<vd-theme-toggle></vd-theme-toggle>
```

## Lock-Disziplin

Sobald ein Custom Element stabil ist:

1. In `../COMPONENTS.md` Status auf **READ-ONLY** setzen (Datum + Begründung).
2. Wer eine Änderung braucht, baut parallel eine Variante in
   `../experiments/vd-<name>-vN.js` und reviewed.
3. Live-Element wird nur nach Review + Joshua-Freigabe geändert.

## file://-Hinweis

Diese Custom Elements funktionieren auch ohne Web-Server. Bei
`file://`-Aufruf ist kein CORS-Problem, weil wir klassische
`<script src="...">`-Tags verwenden (keine `import`-Statements).

Wenn jemand ES-Modules will (für Tree-Shaking etc.), muss ein
lokaler Dev-Server aufgesetzt werden — siehe `ARCHITECTURE.md`
§ „Technische Constraints".

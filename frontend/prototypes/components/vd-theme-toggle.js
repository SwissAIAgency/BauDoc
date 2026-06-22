/* =============================================================
   vd-theme-toggle.js — Vanilla Custom Element

   Standalone Theme-Toggle (Sun/Moon Pill) für VisiDoc.
   - file://-kompatibel (kein ES-Module)
   - Liest/schreibt localStorage["visidoc-theme"]
   - Hört auf prefers-color-scheme, wenn nichts gespeichert ist
   - Setzt data-theme auf <html>, eigene data-state auf der Pill
   - Komplette Logik in sich geschlossen — wenn index.html diesen
     Custom Element einbindet, ist die Theme-Persistenz erledigt.

   Verwendung:
     <vd-theme-toggle></vd-theme-toggle>

   Verdrahtung:
     - Setzt <html data-theme="dark|light">
     - Setzt eigenes [data-state="dark|light"]
     - Setzt [aria-checked] für role="switch"
     - Persistiert in localStorage["visidoc-theme"]

   Migration aus index.html (Stand 2026-06-19):
     Vorher: <button id="vd-theme-toggle" class="vd-theme-pill"> + JS
     Nachher: <vd-theme-toggle></vd-theme-toggle> + Script-Tag

   Lock-Disziplin:
     Diese Datei ist ab v1 🟠 READ-ONLY. Edits nur über
     `experiments/vd-theme-toggle-vN.js` + Review.
   ============================================================= */

(function () {
  'use strict';

  const STORAGE_KEY = 'visidoc-theme';
  const SUN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    '<circle cx="12" cy="12" r="4"/>' +
    '<line x1="12" y1="2" x2="12" y2="4"/>' +
    '<line x1="12" y1="20" x2="12" y2="22"/>' +
    '<line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/>' +
    '<line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/>' +
    '<line x1="2" y1="12" x2="4" y2="12"/>' +
    '<line x1="20" y1="12" x2="22" y2="12"/>' +
    '<line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/>' +
    '<line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/>' +
    '</svg>';
  const MOON_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' +
    '</svg>';

  function safeGetStorage() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; }
  }
  function safeSetStorage(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (_) {}
  }
  function systemPreference() {
    try {
      return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } catch (_) {
      return 'dark';
    }
  }

  class VdThemeToggle extends HTMLElement {
    connectedCallback() {
      if (this._wired) return;
      this._wired = true;

      this.classList.add('vd-theme-pill');
      this.setAttribute('type', 'button');
      this.setAttribute('role', 'switch');
      this.setAttribute('aria-label', 'Theme wechseln');
      this.setAttribute('title', 'Theme wechseln');

      this.innerHTML =
        '<span class="vd-theme-pill-sun" aria-hidden="true">' + SUN_SVG + '</span>' +
        '<span class="vd-theme-pill-thumb" aria-hidden="true">' + MOON_SVG + '</span>';

      const initial = safeGetStorage() || document.documentElement.getAttribute('data-theme') || systemPreference();
      this._apply(initial);

      this.addEventListener('click', () => {
        const next = this.getAttribute('data-state') === 'dark' ? 'light' : 'dark';
        this._apply(next);
      });
    }

    _apply(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      this.setAttribute('data-state', theme);
      this.setAttribute('aria-checked', theme === 'dark' ? 'true' : 'false');
      safeSetStorage(theme);
      this.dispatchEvent(new CustomEvent('theme-change', {
        detail: { theme: theme },
        bubbles: true,
        composed: true
      }));
    }

    // Public API
    get theme() { return this.getAttribute('data-state') || 'dark'; }
    set theme(value) {
      if (value === 'dark' || value === 'light') this._apply(value);
    }
  }

  if (!customElements.get('vd-theme-toggle')) {
    customElements.define('vd-theme-toggle', VdThemeToggle);
  }
})();

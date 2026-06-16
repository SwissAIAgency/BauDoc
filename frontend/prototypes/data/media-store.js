/* ============================================================
   VisiDoc Media-Store
   (frontend/prototypes/data/media-store.js)

   Mini-Client-Store (kein Framework, ~150 Zeilen):
   - hält den Zustand für Filter, Sortierung, Auswahl, Modal
   - publiziert Änderungen an registrierten Listenern
   - kapselt Filter-/Sort-Logik (UI ruft nur store.query() auf)
   ============================================================ */

(function (global) {
  'use strict';

  function createStore() {
    const listeners = new Set();
    const state = {
      projektId: 'PRJ-2024-014',
      tab: 'fotos',                 // 'fotos' | 'plaene' | 'videos' | 'dokumente' | 'aktivitaet'
      filter: {
        planposition: null,         // null = alle; oder plan.id
        status: null,               // 'In Prüfung' | ...
        zeitraum: null,             // '7' | '30' | '90' (Tage) | 'custom' | null
        ersteller: null,            // ersteller.initials
        tags: []                    // string[]
      },
      suche: '',
      sort: 'neu',                  // 'neu' | 'alt' | 'name' | 'groesse'
      layout: 'raster',             // 'raster' | 'mosaik' | 'liste'
      zoom: 1,                      // 0.75 | 1 | 1.5
      ausgewaehlt: null,            // media.id
      modal: { offen: false, mediaId: null },
      timeline: { offen: true }     // Apple-Picker offen/zu (default: zu Beginn offen)
    };

    function emit() {
      listeners.forEach(fn => {
        try { fn(state); } catch (e) { console.error('store listener error', e); }
      });
    }
    function set(patch) {
      Object.assign(state, patch);
      emit();
    }
    function setFilter(patch) {
      Object.assign(state.filter, patch);
      emit();
    }
    function subscribe(fn) {
      listeners.add(fn);
      fn(state);
      return () => listeners.delete(fn);
    }

    // ---- Abgeleitete Daten ----
    function query() {
      const all = global.VISIDOC_DEMO.medien.filter(m => m.projektId === state.projektId);
      const tabOk = m => {
        if (state.tab === 'aktivitaet') return false; // Aktivität später
        if (state.tab === 'fotos') return m.typ === 'foto';
        if (state.tab === 'plaene') return m.typ === 'plan';
        if (state.tab === 'videos') return m.typ === 'video';
        if (state.tab === 'dokumente') return m.typ === 'dokument';
        return true;
      };
      const f = state.filter;
      const jetzt = new Date('2026-06-14T10:52:49');
      const tageMatch = m => {
        if (!f.zeitraum) return true;
        const tage = Number(f.zeitraum);
        if (!tage) return true;
        const d = new Date(m.datumIso);
        const diff = (jetzt - d) / (1000 * 60 * 60 * 24);
        return diff <= tage;
      };
      const out = all
        .filter(tabOk)
        .filter(m => !f.planposition || m.planposition.id === f.planposition)
        .filter(m => !f.status || m.status === f.status)
        .filter(m => !f.ersteller || m.ersteller.initials === f.ersteller)
        .filter(m => !f.tags || f.tags.length === 0 || f.tags.every(t => m.tags.includes(t)))
        .filter(tageMatch)
        .filter(m => {
          if (!state.suche) return true;
          const q = state.suche.toLowerCase();
          return m.name.toLowerCase().includes(q)
            || (m.notiz || '').toLowerCase().includes(q)
            || m.tags.some(t => t.toLowerCase().includes(q))
            || m.planposition.label.toLowerCase().includes(q)
            || m.gewerk.toLowerCase().includes(q)
            || m.ersteller.name.toLowerCase().includes(q);
        });

      const sortFn = {
        neu: (a, b) => new Date(b.datumIso) - new Date(a.datumIso),
        alt: (a, b) => new Date(a.datumIso) - new Date(b.datumIso),
        name: (a, b) => a.name.localeCompare(b.name, 'de'),
        groesse: (a, b) => parseFloat(b.groesse) - parseFloat(a.groesse)
      }[state.sort] || (() => 0);
      out.sort(sortFn);
      return out;
    }

    // Counts im aktuellen Projekt (unabhängig vom Tab-Filter, gefiltert nach Suche + Pill-Filtern)
    function counts() {
      const all = global.VISIDOC_DEMO.medien.filter(m => m.projektId === state.projektId);
      return {
        alle: all.length,
        foto: all.filter(m => m.typ === 'foto').length,
        plan: all.filter(m => m.typ === 'plan').length,
        video: all.filter(m => m.typ === 'video').length,
        dokument: all.filter(m => m.typ === 'dokument').length
      };
    }

    function getProjekt() {
      return global.VISIDOC_DEMO.projekte.find(p => p.id === state.projektId);
    }

    function getMedia(id) {
      return global.VISIDOC_DEMO.medien.find(m => m.id === id) || null;
    }

    function naechster(offset) {
      const list = query();
      if (!list.length) return null;
      let idx = list.findIndex(m => m.id === state.ausgewaehlt);
      if (idx === -1) idx = 0;
      idx = (idx + offset + list.length) % list.length;
      return list[idx];
    }

    function resetFilter() {
      state.filter = { planposition: null, status: null, zeitraum: null, ersteller: null, tags: [] };
      state.suche = '';
      emit();
    }

    return {
      state,
      set, setFilter, subscribe, query, counts,
      getProjekt, getMedia, naechster, resetFilter, emit
    };
  }

  global.VISIDOC_STORE = { createStore };
})(window);

/* ============================================================
   VisiDoc Thumbnail-Generator
   (frontend/prototypes/data/thumbnails.js)

   Erzeugt deterministische SVG-Thumbnails (data-URIs) für
   Foto-, Plan- und Video-Medien, solange keine echten
   generierten Bilder vorliegen. Sobald eine Datei unter
   assets/generated/<id>.jpg existiert, wird sie stattdessen
   verwendet.

   Bau-Situationen: Gerüst, Betonwand, Holzbalken, Mauerwerk,
   Treppenhaus, Stahlträger, Elektro-Installation, Sanitär,
   Innenausbau, Fassade, Dach, Kran, Vermessung, Spengler.
   ============================================================ */

(function (global) {
  'use strict';

  // Mulberry32 PRNG, identisch zu demo-data.js
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function seedFromId(id) {
    let h = 2166136261;
    for (let i = 0; i < id.length; i++) {
      h ^= id.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  // 14 Bauszenen, jede mit Palette und SVG-Layout
  const SZENEN = [
    {
      key: 'geruest',
      label: 'Gerüst',
      palette: ['#3a3a3a', '#6b6b6b', '#8a8a8a', '#c2b280'],
      draw: (rng, c) => {
        // Hintergrund: Himmel-Gradient
        c.linear('sky', '#9eb3c8', '#dbe6ef', 0, 0, 200, 130, 0.15);
        // Boden
        c.rect(0, 110, 200, 20, '#a39484');
        // Gerüst-Turm
        for (let r = 0; r < 4; r++) {
          const y = 18 + r * 22;
          c.line(30, y, 170, y, '#4a4a4a', 1.5);
          c.line(35, y, 35, y + 18, '#3a3a3a', 2);
          c.line(165, y, 165, y + 18, '#3a3a3a', 2);
          c.line(35, y + 18, 165, y + 18, '#5a5a5a', 1);
        }
        // Holzbretter quer
        for (let r = 0; r < 3; r++) {
          const y = 24 + r * 22;
          for (let x = 40; x < 165; x += 12) {
            c.rect(x, y, 10, 6, c.pick(['#b88a4a', '#a07a3e', '#c89c5a']));
          }
        }
        // Diagonalen
        c.line(35, 18, 165, 90, '#3a3a3a', 1.2);
        c.line(165, 18, 35, 90, '#3a3a3a', 1.2);
      }
    },
    {
      key: 'beton',
      label: 'Betonwand',
      palette: ['#7a7a78', '#9a9895', '#5a5a58', '#bdb8ad'],
      draw: (rng, c) => {
        c.linear('bg', '#a39c91', '#7a7468', 0, 0, 200, 130, 0.3);
        // Sichtbeton-Schalungsbretter
        for (let i = 0; i < 10; i++) {
          const w = 16 + Math.floor(rng() * 8);
          c.rect(i * 20, 0, w - 1, 130, c.pick(['#7e7972', '#8a8478', '#736e67']));
          c.line(i * 20 + w - 1, 0, i * 20 + w - 1, 130, '#4a4641', 0.5);
        }
        // Anker-Löcher
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 2; j++) {
            c.circle(25 + i * 50, 30 + j * 70, 2.5, '#3a3631');
          }
        }
        // Distanzrohr
        c.rect(95, 0, 10, 130, '#625d56');
        c.line(95, 0, 95, 130, '#3a3631', 0.4);
        c.line(105, 0, 105, 130, '#3a3631', 0.4);
      }
    },
    {
      key: 'holz',
      label: 'Holzbalken',
      palette: ['#a87a3a', '#7a4a1a', '#c89c5a', '#5a3614'],
      draw: (rng, c) => {
        c.linear('bg', '#3a2818', '#5a3e20', 0, 0, 200, 130, 0.2);
        for (let i = 0; i < 5; i++) {
          const y = i * 26;
          c.rect(0, y, 200, 24, c.pick(['#a87a3a', '#9a6e30', '#b88848']));
          // Holzmaserung
          for (let x = 0; x < 200; x += 8) {
            c.line(x, y + 4, x + 6, y + 4, '#7a4a1a', 0.4);
            c.line(x + 3, y + 14, x + 9, y + 14, '#7a4a1a', 0.3);
          }
          c.line(0, y + 24, 200, y + 24, '#5a3614', 0.6);
        }
        // Knoten
        for (let i = 0; i < 3; i++) {
          const x = 30 + i * 70;
          const y = 30 + i * 25;
          c.circle(x, y, 3, '#5a3614');
        }
      }
    },
    {
      key: 'mauer',
      label: 'Mauerwerk',
      palette: ['#9a6a4a', '#7a4a2a', '#b89070', '#5a3010'],
      draw: (rng, c) => {
        c.rect(0, 0, 200, 130, '#c8a890');
        // Backsteine im Halbverband
        for (let row = 0; row < 9; row++) {
          const y = row * 14;
          const offset = (row % 2) * 20;
          for (let col = 0; col < 7; col++) {
            const x = col * 40 - offset;
            c.rect(x, y, 38, 12, c.pick(['#9a6a4a', '#a8744a', '#8a5a3a', '#b08060']));
            c.line(x, y + 12, x + 38, y + 12, '#5a3010', 0.4);
            c.line(x + 38, y, x + 38, y + 12, '#5a3010', 0.4);
          }
        }
      }
    },
    {
      key: 'treppe',
      label: 'Treppenhaus',
      palette: ['#8a8478', '#a8a298', '#5a5448', '#c8c0b0'],
      draw: (rng, c) => {
        c.linear('bg', '#3a3630', '#1a1814', 0, 0, 200, 130, 0.5);
        // Perspektivische Treppe
        for (let i = 0; i < 8; i++) {
          const y = 120 - i * 12;
          const x = i * 4;
          c.rect(x, y, 200 - i * 8, 12, c.pick(['#8a8478', '#9a9488', '#7a7468']));
          c.line(x, y + 12, 200 - i * 4, y + 12, '#3a3630', 0.6);
        }
        // Geländer
        c.line(60, 30, 200, 110, '#5a5448', 1.5);
        for (let i = 0; i < 8; i++) {
          c.line(60 + i * 18, 30 + i * 10, 65 + i * 18, 30 + i * 10, '#5a5448', 1);
        }
        // Lichtfleck
        c.linear('light', 'rgba(255, 230, 160, 0.0)', 'rgba(255, 230, 160, 0.25)', 100, 0, 200, 80, 0.3);
      }
    },
    {
      key: 'stahl',
      label: 'Stahlträger',
      palette: ['#5a5a5a', '#7a7a7a', '#3a3a3a', '#9a9a9a'],
      draw: (rng, c) => {
        c.linear('bg', '#2a2a2a', '#4a4a4a', 0, 0, 200, 130, 0.4);
        // HEB-Träger im Querschnitt
        c.rect(20, 20, 160, 90, '#1a1a1a');
        c.rect(28, 28, 144, 14, '#7a7a7a');
        c.rect(28, 88, 144, 14, '#7a7a7a');
        c.rect(94, 28, 12, 74, '#7a7a7a');
        // Schweissnaht
        c.line(28, 28, 172, 28, '#c87a2a', 0.6);
        c.line(28, 102, 172, 102, '#c87a2a', 0.6);
        c.line(94, 28, 94, 102, '#c87a2a', 0.5);
        // Nieten
        for (let i = 0; i < 8; i++) {
          c.circle(40 + i * 18, 35, 1.8, '#3a3a3a');
          c.circle(40 + i * 18, 95, 1.8, '#3a3a3a');
        }
      }
    },
    {
      key: 'elektro',
      label: 'Elektro-Installation',
      palette: ['#d4c87a', '#3a3a3a', '#7a6a3a', '#e0d8a0'],
      draw: (rng, c) => {
        c.rect(0, 0, 200, 130, '#e0d8a0');
        // Wand in Gipskarton
        c.rect(0, 0, 200, 130, '#e8d8a8');
        for (let i = 0; i < 30; i++) {
          for (let j = 0; j < 20; j++) {
            if (rng() > 0.95) c.circle(i * 8, j * 8, 0.5, '#7a6a3a');
          }
        }
        // Kabelkanal
        c.rect(20, 60, 160, 18, '#fafaf0');
        c.line(20, 60, 180, 60, '#a09a7a', 0.5);
        c.line(20, 78, 180, 78, '#a09a7a', 0.5);
        // Kabel
        c.line(30, 64, 170, 64, '#3a3a3a', 1.2);
        c.line(30, 68, 170, 68, '#5a3a2a', 1.2);
        c.line(30, 72, 170, 72, '#3a5a2a', 1.2);
        c.line(30, 76, 170, 76, '#2a3a5a', 1.2);
        // Steckdose
        c.rect(85, 88, 14, 14, '#fafaf0');
        c.rect(85, 88, 14, 14, '#a09a7a', null, 0.5);
        c.circle(89, 95, 1.5, '#3a3a3a');
        c.circle(95, 95, 1.5, '#3a3a3a');
      }
    },
    {
      key: 'sanitaer',
      label: 'Sanitär',
      palette: ['#7ab0c8', '#5a8aa0', '#3a6a80', '#c8e0e8'],
      draw: (rng, c) => {
        c.linear('bg', '#3a4a5a', '#1a2a3a', 0, 0, 200, 130, 0.3);
        // Rohre vertikal
        for (let i = 0; i < 3; i++) {
          const x = 40 + i * 60;
          c.rect(x, 0, 12, 130, '#9a9a9a');
          c.line(x, 0, x, 130, '#5a5a5a', 0.5);
          c.line(x + 12, 0, x + 12, 130, '#5a5a5a', 0.5);
          // Muffen
          for (let y = 20; y < 130; y += 30) {
            c.rect(x - 2, y, 16, 6, '#7a7a7a');
          }
        }
        // Wasserhahn
        c.rect(20, 100, 30, 6, '#c8c8c8');
        c.circle(35, 100, 4, '#a0a0a0');
        c.rect(33, 80, 4, 20, '#c8c8c8');
      }
    },
    {
      key: 'innen',
      label: 'Innenausbau',
      palette: ['#e8d8b8', '#c8b890', '#8a7458', '#faf0d8'],
      draw: (rng, c) => {
        c.rect(0, 0, 200, 130, '#faf0d8');
        // Rigips-Wand
        c.rect(0, 0, 200, 90, '#f4ecd8');
        c.line(0, 0, 200, 0, '#a09a7a', 0.4);
        c.line(0, 90, 200, 90, '#a09a7a', 0.4);
        // Profile vertikal
        for (let x = 30; x < 200; x += 60) {
          c.line(x, 0, x, 90, '#d4c8a0', 0.5);
        }
        // Profile horizontal
        c.line(0, 30, 200, 30, '#d4c8a0', 0.5);
        c.line(0, 60, 200, 60, '#d4c8a8', 0.5);
        // Bodenbelag (Parkett)
        c.rect(0, 90, 200, 40, '#8a6a3a');
        for (let i = 0; i < 8; i++) {
          const y = 90 + i * 5;
          c.line(0, y, 200, y, '#5a3a1a', 0.4);
          for (let x = 0; x < 200; x += 24) {
            c.line(x, y, x, y + 5, '#5a3a1a', 0.3);
          }
        }
      }
    },
    {
      key: 'fassade',
      label: 'Fassade',
      palette: ['#a8a8a8', '#7a7a7a', '#c8c8c8', '#5a5a5a'],
      draw: (rng, c) => {
        c.linear('sky', '#a8b8c8', '#d8e0e8', 0, 0, 200, 40, 0.4);
        c.rect(0, 40, 200, 90, '#a8a8a8');
        // Fenster
        for (let r = 0; r < 3; r++) {
          for (let cidx = 0; cidx < 3; cidx++) {
            const x = 30 + cidx * 50;
            const y = 50 + r * 26;
            c.rect(x, y, 36, 22, '#3a4a5a');
            c.line(x + 18, y, x + 18, y + 22, '#c8c8c8', 0.5);
            c.line(x, y + 11, x + 36, y + 11, '#c8c8c8', 0.5);
            c.rect(x, y, 36, 22, '#7a7a7a', null, 0.6);
          }
        }
        // Fensterbänke
        for (let cidx = 0; cidx < 3; cidx++) {
          c.rect(28 + cidx * 50, 74, 40, 3, '#5a5a5a');
        }
      }
    },
    {
      key: 'dach',
      label: 'Dach',
      palette: ['#5a3a2a', '#7a4a30', '#3a2010', '#a86a40'],
      draw: (rng, c) => {
        c.rect(0, 0, 200, 130, '#7a4a30');
        // Ziegel im Verband
        for (let row = 0; row < 12; row++) {
          const y = row * 11;
          const offset = (row % 2) * 12;
          for (let col = -1; col < 18; col++) {
            const x = col * 24 + offset;
            c.rect(x, y, 22, 9, c.pick(['#5a3a2a', '#7a4a30', '#6a4028', '#8a5a38']));
            c.line(x, y + 9, x + 22, y + 9, '#3a2010', 0.4);
            c.line(x + 22, y, x + 22, y + 9, '#3a2010', 0.4);
          }
        }
      }
    },
    {
      key: 'kran',
      label: 'Kran',
      palette: ['#3a3a3a', '#5a5a5a', '#c8a020', '#7a7a7a'],
      draw: (rng, c) => {
        c.linear('sky', '#b8c8d8', '#e0e8f0', 0, 0, 200, 130, 0.2);
        c.rect(0, 110, 200, 20, '#a39484');
        // Mast
        c.rect(60, 20, 8, 100, '#3a3a3a');
        for (let y = 20; y < 120; y += 12) {
          c.line(56, y, 72, y, '#5a5a5a', 0.5);
        }
        // Ausleger
        c.rect(68, 35, 130, 6, '#3a3a3a');
        // Gegenausleger
        c.rect(20, 35, 40, 6, '#3a3a3a');
        // Spitze
        c.line(60, 20, 60, 5, '#3a3a3a', 2);
        c.line(58, 5, 64, 5, '#3a3a3a', 2);
        // Seil
        c.line(198, 38, 130, 100, '#7a7a7a', 0.6);
        // Haken
        c.rect(128, 95, 4, 12, '#c8a020');
        c.circle(130, 110, 4, '#c8a020');
        // Betonkübel
        c.rect(115, 80, 30, 18, '#7a4a30');
      }
    },
    {
      key: 'vermessung',
      label: 'Vermessung',
      palette: ['#3a4a5a', '#c8a020', '#7a7a7a', '#d8c870'],
      draw: (rng, c) => {
        c.linear('sky', '#b8c0c8', '#d0d8e0', 0, 0, 200, 80, 0.3);
        c.rect(0, 80, 200, 50, '#a39484');
        // Stativ
        c.line(95, 80, 100, 40, '#3a3a3a', 1.5);
        c.line(105, 80, 100, 40, '#3a3a3a', 1.5);
        c.line(95, 80, 100, 70, '#3a3a3a', 1.5);
        c.line(105, 80, 100, 70, '#3a3a3a', 1.5);
        // Tachymeter
        c.rect(88, 28, 24, 14, '#c8a020');
        c.rect(86, 26, 28, 16, '#c8a020', null, 0.6);
        c.circle(100, 35, 3, '#3a3a3a');
        // Latte mit Skala
        c.rect(150, 30, 6, 100, '#fafaf0');
        for (let y = 30; y < 130; y += 5) {
          const w = (y % 10 === 0) ? 4 : 2;
          c.line(150, y, 150 + w, y, '#3a3a3a', 0.6);
        }
      }
    },
    {
      key: 'spengler',
      label: 'Spengler',
      palette: ['#5a5a5a', '#9a9a9a', '#3a3a3a', '#c8c8c8'],
      draw: (rng, c) => {
        c.linear('sky', '#a8b8c8', '#c8d0d8', 0, 0, 200, 60, 0.3);
        c.rect(0, 60, 200, 70, '#7a6a5a');
        // Blech in Falz
        for (let i = 0; i < 8; i++) {
          const x = i * 25;
          c.rect(x, 60, 23, 70, '#9a9a9a');
          c.line(x, 60, x, 130, '#5a5a5a', 0.5);
          c.line(x + 23, 60, x + 23, 130, '#5a5a5a', 0.5);
        }
        // Dachrinne
        c.rect(0, 50, 200, 12, '#7a7a7a');
        c.line(0, 50, 200, 50, '#3a3a3a', 0.6);
        c.line(0, 62, 200, 62, '#3a3a3a', 0.6);
        // Fallrohr
        c.rect(180, 50, 10, 80, '#7a7a7a');
        c.line(180, 50, 180, 130, '#3a3a3a', 0.4);
        c.line(190, 50, 190, 130, '#3a3a3a', 0.4);
      }
    }
  ];

  function buildSvg(szene, rng) {
    const ops = [];
    const ctx = {
      rect: (x, y, w, h, fill, stroke, sw) => {
        const a = `M${x} ${y}h${w}v${h}h-${w}z`;
        ops.push(`<path d="${a}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw || 0.4}"` : ''}/>`);
      },
      circle: (x, y, r, fill, stroke, sw) => {
        ops.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw || 0.4}"` : ''}/>`);
      },
      line: (x1, y1, x2, y2, stroke, sw) => {
        ops.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw || 0.5}" stroke-linecap="round"/>`);
      },
      linear: (id, c1, c2, x, y, w, h, op) => {
        ops.unshift(`<defs><linearGradient id="${id}" x1="${x}" y1="${y}" x2="${x + w}" y2="${y + h}"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs>`);
        ops.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id})" opacity="${op || 1}"/>`);
      },
      pick: (arr) => arr[Math.floor(rng() * arr.length)]
    };
    try { szene.draw(rng, ctx); } catch (e) { /* keep minimal */ }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 130" preserveAspectRatio="xMidYMid slice">${ops.join('')}</svg>`;
  }

  function svgDataUri(svg) {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // Szene zu Medien anhand Tags / Planposition zuordnen
  function szeneForMedia(media) {
    if (media.typ === 'plan') return SZENEN[1]; // Betonwand-Optik mit Raster = Plan-Look
    if (media.typ === 'video') return SZENEN[11]; // Kran
    if (media.tags && media.tags.includes('Vermessung')) return SZENEN[12];
    if (media.tags && media.tags.includes('Spengler')) return SZENEN[13];
    if (media.tags && media.tags.includes('Stahl')) return SZENEN[5];
    if (media.tags && media.tags.includes('Holz')) return SZENEN[2];
    if (media.tags && media.tags.includes('Mauerwerk')) return SZENEN[3];
    if (media.tags && media.tags.includes('Installation')) return SZENEN[6];
    if (media.tags && media.tags.includes('Abdichtung')) return SZENEN[10];
    if (media.tags && media.tags.includes('Dämmung')) return SZENEN[8];
    if (media.tags && media.tags.includes('Mangel')) return SZENEN[3];
    if (media.gewerk === 'Fassade') return SZENEN[9];
    if (media.gewerk === 'Dach') return SZENEN[10];
    if (media.gewerk === 'Innenausbau') return SZENEN[8];
    if (media.gewerk === 'Elektro') return SZENEN[6];
    if (media.gewerk === 'Sanitär') return SZENEN[7];
    if (media.gewerk === 'Holzbau') return SZENEN[2];
    if (media.gewerk === 'Rohbau') return SZENEN[1];
    if (media.gewerk === 'Heizung/Lüftung') return SZENEN[7];
    if (media.gewerk === 'Bodenbeläge') return SZENEN[8];
    if (media.gewerk === 'Malerarbeiten') return SZENEN[8];
    if (media.planposition && media.planposition.id && media.planposition.id.startsWith('A-')) return SZENEN[9];
    if (media.planposition && media.planposition.id && media.planposition.id.startsWith('UG')) return SZENEN[7];
    if (media.planposition && media.planposition.id && media.planposition.id.includes('Treppen')) return SZENEN[4];
    return SZENEN[0];
  }

  /**
   * Liefert eine Thumbnail-Quelle für ein Medium.
   * Wenn unter assets/generated/<media.id>.jpg eine echte Datei liegt,
   * wird deren Pfad zurückgegeben, sonst eine data: URI mit SVG.
   * @param {object} media
   * @param {object} [opts] - { size: 'sm'|'md'|'lg' }
   */
  function thumbSrc(media, opts) {
    opts = opts || {};
    const size = opts.size || 'md';
    // Echtes Bild vorhanden? Dann eine der zwei Größen liefern (sm = 240×180, default = 800×600).
    const base = _generatedMap[media.id];
    if (base) {
      if (size === 'sm') {
        // base ist "assets/generated/foo.jpg" -> "assets/generated/foo_sm.jpg"
        return base.replace(/\.jpe?g$/i, '_sm.jpg');
      }
      return base;
    }
    // Fallback: SVG (sollte im Normalbetrieb nicht mehr greifen).
    return svgDataUri(buildSvg(szeneForMedia(media), mulberry32(seedFromId(media.id))));
  }

  /**
   * Setzt/Liefert das Mapping "echte-generierte-Datei-existiert".
   * @param {Record<string,string>} map
   */
  function setGeneratedMap(map) {
    Object.assign(_generatedMap, map || {});
  }

  function getGeneratedMap() {
    return Object.assign({}, _generatedMap);
  }

  const _generatedMap = {};

  global.VISIDOC_THUMBS = {
    thumbSrc: thumbSrc,
    setGeneratedMap: setGeneratedMap,
    getGeneratedMap: getGeneratedMap,
    szenen: SZENEN.map(s => s.key)
  };
})(window);

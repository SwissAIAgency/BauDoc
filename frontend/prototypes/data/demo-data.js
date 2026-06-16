/* ============================================================
   VisiDoc Demo-Daten
   (frontend/prototypes/data/demo-data.js)

   Zentrale, deterministische Testdaten für die Prototypen.
   - Keine echten Personennamen, Adressen oder Baustellenfotos
     (siehe frontend/prototypes/DESIGN.md §10).
   - Schweizer Adressen (4-stellige PLZ), CHF, Telefon +41.
   - Konsumierbar als window.VISIDOC_DEMO.
   ============================================================ */

(function (global) {
  'use strict';

  // ---- Hilfsdaten (klingen echt, sind aber frei erfunden) ----
  const GEWERKE = [
    'Rohbau', 'Holzbau', 'Elektro', 'Sanitär', 'Heizung/Lüftung',
    'Innenausbau', 'Fassade', 'Dach', 'Bodenbeläge', 'Malerarbeiten'
  ];

  const PLANPOSITIONEN = [
    { id: 'EG-01', label: 'EG – Eingangshalle' },
    { id: 'EG-02', label: 'EG – Treppenhaus' },
    { id: 'EG-03', label: 'EG – Technikraum' },
    { id: 'OG1-01', label: 'OG 1 – Büro Nord' },
    { id: 'OG1-02', label: 'OG 1 – Büro Süd' },
    { id: 'OG1-03', label: 'OG 1 – Sitzungsraum' },
    { id: 'OG2-01', label: 'OG 2 – Wohnung 2.1' },
    { id: 'OG2-02', label: 'OG 2 – Wohnung 2.2' },
    { id: 'OG3-01', label: 'OG 3 – Dachterrasse' },
    { id: 'UG-01', label: 'UG – Tiefgarage' },
    { id: 'UG-02', label: 'UG – Keller' },
    { id: 'A-01', label: 'Aussen – Fassade Nord' },
    { id: 'A-02', label: 'Aussen – Fassade Süd' },
    { id: 'A-03', label: 'Aussen – Vorplatz' }
  ];

  const PERSONEN = [
    { initials: 'MB', name: 'Maria Brunner', role: 'Bauleiterin' },
    { initials: 'DK', name: 'David Krummenacher', role: 'Polier' },
    { initials: 'JT', name: 'Jonas Tschichold', role: 'Architekt' },
    { initials: 'AS', name: 'Anita Stocker', role: 'Bauherrin' },
    { initials: 'PG', name: 'Patrick Gutmann', role: 'Elektriker' },
    { initials: 'SR', name: 'Sandra Räber', role: 'Sanitär' },
    { initials: 'TM', name: 'Thomas Meier', role: 'Zimmermann' },
    { initials: 'LB', name: 'Lukas Bösiger', role: 'Bauleiter' }
  ];

  const STATUS = ['Freigegeben', 'In Prüfung', 'Neu', 'Hinweis', 'Abgelehnt'];

  const TAGS = [
    'Rohbau', 'Holz', 'Stahl', 'Beton', 'Mauerwerk', 'Installation',
    'Mangel', 'Freigabe', 'Nacharbeit', 'Schnurgerüst', 'Vermessung',
    'Abdichtung', 'Dämmung', 'Spengler'
  ];

  // Deterministic PRNG (Mulberry32) für reproduzierbare Daten
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
  const pickN = (rng, arr, n) => {
    const copy = arr.slice();
    const out = [];
    for (let i = 0; i < n && copy.length; i++) {
      out.push(copy.splice(Math.floor(rng() * copy.length), 1)[0]);
    }
    return out;
  };
  const pad2 = n => String(n).padStart(2, '0');

  // ---- Projekte ----
  const PROJEKTE = [
    {
      id: 'PRJ-2024-014',
      titel: 'Neubau Bahnhofstrasse 12',
      adresse: 'Bahnhofstrasse 12, 8001 Zürich',
      typ: 'Wohn- und Geschäftshaus, 4 Etagen',
      status: 'Aktiv',
      prüfStatus: 'In Prüfung',
      fortschritt: 78,
      start: '14.03.2025',
      fertigGeplant: '30.11.2026',
      bauleiter: 'MB',
      auftraggeber: 'AS',
      budget: 4_850_000,
      budgetWaehrung: 'CHF',
      seed: 14
    },
    {
      id: 'PRJ-2024-022',
      titel: 'Sanierung Schulhaus Buechholz',
      adresse: 'Buechholzstrasse 24, 8053 Zürich',
      typ: 'Schulhaus, 2 Etagen, denkmalgeschützt',
      status: 'Aktiv',
      prüfStatus: 'In Prüfung',
      fortschritt: 42,
      start: '02.09.2024',
      fertigGeplant: '15.08.2026',
      bauleiter: 'LB',
      auftraggeber: 'JT',
      budget: 2_120_000,
      budgetWaehrung: 'CHF',
      seed: 22
    },
    {
      id: 'PRJ-2023-091',
      titel: 'Anbau Werkhof Muri',
      adresse: 'Worbstrasse 32, 3074 Muri b. Bern',
      typ: 'Werkhalle mit Bürotrakt, 1 Etage',
      status: 'Abgeschlossen',
      prüfStatus: 'Freigegeben',
      fortschritt: 100,
      start: '08.05.2023',
      fertigGeplant: '20.12.2024',
      bauleiter: 'DK',
      auftraggeber: 'TM',
      budget: 1_640_000,
      budgetWaehrung: 'CHF',
      seed: 91
    }
  ];

  // ---- Medien (Fotos, Pläne, Videos) ----
  // Determinismus: pro Projekt ein Seed -> gleiche Daten bei jedem Reload.
  function buildMedia(projekt) {
    const rng = mulberry32(projekt.seed * 7919);
    const startDate = new Date(2025, 2, 14); // 14.03.2025
    const endDate = new Date(2026, 10, 30);  // 30.11.2026
    const out = [];
    let counter = 1;

    function ts() {
      const t = startDate.getTime() + rng() * (endDate.getTime() - startDate.getTime());
      return new Date(t);
    }
    function fmtDateTime(d) {
      return `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}, ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
    }
    function fmtDate(d) {
      return `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}`;
    }
    function makeId(prefix) {
      return `${prefix}-${projekt.id.slice(-3)}-${String(counter++).padStart(4, '0')}`;
    }
    function addOne(typ) {
      const d = ts();
      const person = pick(rng, PERSONEN);
      const plan = pick(rng, PLANPOSITIONEN);
      const tags = pickN(rng, TAGS, 1 + Math.floor(rng() * 2));
      const status = pick(rng, STATUS);
      const gewerk = pick(rng, GEWERKE);
      const base = {
        projektId: projekt.id,
        datum: fmtDateTime(d),
        datumIso: d.toISOString(),
        erstellt: fmtDateTime(d),
        ersteller: person,
        planposition: plan,
        gewerk: gewerk,
        tags: tags,
        status: status,
        groesse: `${(0.4 + rng() * 6.2).toFixed(1)} MB`,
        notiz: ''
      };
      if (typ === 'foto') {
        out.push(Object.assign({}, base, {
          id: makeId('F'),
          typ: 'foto',
          name: `IMG_${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}_${pad2(d.getHours())}${pad2(d.getMinutes())}.jpg`,
          exif: {
            iso: 200 + Math.floor(rng() * 6) * 100,
            blende: (3.5 + Math.floor(rng() * 6) * 0.5).toFixed(1),
            belichtung: `1/${Math.pow(2, 4 + Math.floor(rng() * 4))} s`,
            brennweite: 24 + Math.floor(rng() * 4) * 8,
            gps: [47.37 + rng() * 0.02, 8.54 + rng() * 0.02]
          }
        }));
      } else if (typ === 'plan') {
        out.push(Object.assign({}, base, {
          id: makeId('P'),
          typ: 'plan',
          name: `${plan.id}_Grundriss_v${1 + Math.floor(rng() * 3)}.${Math.floor(rng() * 9)}.pdf`,
          version: `v${1 + Math.floor(rng() * 3)}.${Math.floor(rng() * 9)}`,
          blatt: plan.id,
          skalentyp: pick(rng, ['1:50', '1:100', '1:200']),
          planformat: pick(rng, ['A0', 'A1', 'A2', 'A3'])
        }));
      } else if (typ === 'video') {
        const dauer = 18 + Math.floor(rng() * 142);
        out.push(Object.assign({}, base, {
          id: makeId('V'),
          typ: 'video',
          name: `VID_${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}_${pad2(d.getHours())}${pad2(d.getMinutes())}.mp4`,
          dauerSek: dauer,
          dauerLabel: `${pad2(Math.floor(dauer / 60))}:${pad2(dauer % 60)}`,
          auflösung: pick(rng, ['1920×1080', '3840×2160', '1280×720'])
        }));
      } else if (typ === 'dokument') {
        out.push(Object.assign({}, base, {
          id: makeId('D'),
          typ: 'dokument',
          name: pick(rng, [
            'Baujournal_W${d.getFullYear()}.pdf',
            'Pruefprotokoll_${plan.id}.pdf',
            'Rapport_${gewerk}.pdf',
            'Mangelanzeige_${plan.id}.pdf'
          ]).replace('${d.getFullYear()}', d.getFullYear()).replace('${plan.id}', plan.id).replace('${gewerk}', gewerk),
          seiten: 2 + Math.floor(rng() * 18)
        }));
      }
    }

    // 248 Fotos, 17 Pläne, 6 Videos, 5 Dokumente für das Hauptprojekt
    const counts = { foto: 0, plan: 0, video: 0, dokument: 0 };
    if (projekt.id === 'PRJ-2024-014') {
      counts.foto = 38;     // Demo-Set: 38 Fotos (anstatt 248 für die Galerie)
      counts.plan = 12;
      counts.video = 6;
      counts.dokument = 5;
    } else if (projekt.id === 'PRJ-2024-022') {
      counts.foto = 22;
      counts.plan = 8;
      counts.video = 3;
      counts.dokument = 4;
    } else {
      counts.foto = 28;
      counts.plan = 9;
      counts.video = 4;
      counts.dokument = 3;
    }

    ['foto', 'plan', 'video', 'dokument'].forEach(typ => {
      for (let i = 0; i < counts[typ]; i++) addOne(typ);
    });

    // Nach Datum absteigend sortieren
    out.sort((a, b) => new Date(b.datumIso) - new Date(a.datumIso));
    return out;
  }

  const MEDIEN = [];
  PROJEKTE.forEach(p => MEDIEN.push(...buildMedia(p)));

  // Counts pro Projekt aggregieren
  PROJEKTE.forEach(p => {
    const subs = MEDIEN.filter(m => m.projektId === p.id);
    p.counts = {
      alle: subs.length,
      foto: subs.filter(m => m.typ === 'foto').length,
      plan: subs.filter(m => m.typ === 'plan').length,
      video: subs.filter(m => m.typ === 'video').length,
      dokument: subs.filter(m => m.typ === 'dokument').length
    };
  });

  global.VISIDOC_DEMO = {
    projekte: PROJEKTE,
    medien: MEDIEN,
    gewerke: GEWERKE,
    planpositionen: PLANPOSITIONEN,
    personen: PERSONEN,
    status: STATUS,
    tags: TAGS
  };
})(window);

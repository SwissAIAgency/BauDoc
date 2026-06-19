# Changelog

Alle relevanten Änderungen an diesem Projekt werden hier dokumentiert.

## Unreleased

- **Frontend-Prototyp-Reset 2026-06-19** – Konsolidierung der
  Per-Screen-Prototypen auf `index.html` als Master-App-Shell-
  Showcase (alle 6 Screens inline). Per-Screen-Files
  (`dashboard.html`, `projekte.html`, `galerie.html`,
  `archiv.html`, `einstellung-profil.html`,
  `filter-sidebar-v2.html`, `galerie-concept.html`,
  `surface-hierarchie-demo.html`) sowie die alten
  `data/demo-data.js`, `data/media-store.js`,
  `data/thumbnails.js` und alle alten `screenshots/*.png` aus
  der App-Vorbereitung entfernt. Snapshot des Pre-Reset-Stands
  liegt in `frontend/prototypes/archive/v1/` (FROZEN, mit
  `.frozen`-Marker). Erste Vanilla-Custom-Element-Extraktion:
  `<vd-theme-toggle>` aus `index.html` ausgelagert nach
  `components/vd-theme-toggle.js`. Sidebar/Topbar-Layout auf
  Grid (`vd-app-body`) refactored, Theme-Pill-Akzent auf
  Salwei umgestellt (Marken-Konsistenz). README neu
  strukturiert mit Pflicht-Doku-Box und "Wo finde ich was?"-
  Tabelle, Lock-Disziplin und Workflow ans Ende gehängt. Neue
  Modals-Doku: `modals-showcase.html`, `modals.html`,
  `MODALS.md`. Detail-Spec der Reset-Plan in
  `docs/technical/prototype-reset-plan.md`. Standalone-Sandboxes
  `galerie-v2.html`, `modals-showcase.html`, `modals.html` mit
  Status 🟠 READ-ONLY in `COMPONENTS.md` und
  `ARCHITECTURE.md` dokumentiert (zwei verschiedene Datenpools:
  `galerie-v2.html` hat eigenen statischen Pool,
  `modals*.html` teilen `window.VISIDOC_DEMO`).
- **Frontend-Prototyp v1.4.1** – Export-Modal in 2-Step-
  Wizard umgebaut (Step 1: Quelle+Format, Step 2: Zeitraum+
  Optionen), damit alle Inhalte in einer Ansicht passen.
  Konsistenter Step-Indikator + dynamischer Next-Button
  ("Weiter" → "Export starten").
- **Frontend-Prototyp v1.4.0** – "Export"-Button im
  Dashboard-Hero verkabelt. Neues Export-Modal mit 4
  Sektionen (WAS / FORMAT / ZEITRAUM / OPTIONEN), Status-
  Pills, Format-Choice-Cards, Quick-Range-Pills, Checkbox-
  Optionen. Submit loggt State als JSON (TODO: API-Call).
- **Frontend-Prototyp v1.3.2** – Projekt-Wizard Step 3
  kompakt: grosser "Bereit"-Header durch kompakten
  Salwei-Soft-Block ersetzt; Summary als 2-Spalten-Grid
  (Eckdaten links, Planung rechts); `max-height: 70vh`
  am Modal-Body entfernt. Alles passt jetzt in einer
  Ansicht ohne Scrollen.
- **Frontend-Prototyp v1.3.1** – Budget und Fortschritt aus
  Projekt-Wizard entfernt (Step 2 "Planung" hat jetzt nur
  noch Termine, Tags und Beschreibung). Section-Title
  von "Termine und Budget" auf "Termine" gekürzt.
- **Frontend-Prototyp v1.3.0** – "Projekt hinzufügen"-Wizard
  als 3-Step-Modal (Eckdaten → Planung → Bestätigen) neu
  gebaut. Topbar-CTA und Dashboard-Button verkabelt. Live-
  Validierung, Status-Pills, Tag-Picker, Range-Slider,
  Summary mit Edit-Links. Detail siehe `PROTOTYP.md`
  Abschnitt 10.
- **Frontend-Prototyp v1.2.0** – Wizard-Step-1 auf zwei
  Choice-Cards (Galerie / Kamera) umgebaut. Mobile-Kamera-Pfad
  via `<input capture="environment">`. Use-case-aware
  (`openWizard('foto'|'video'|'plan'|'datei')`) mit "Empfohlen"-
  Highlight und Preview-/Summary-UI. Detail siehe
  `PROTOTYP.md` Abschnitt 10.

## 0.2.0 - 2026-05-29

- Phase-2-Analyse vor Implementierung ergänzt.
- Architektur-, Datenmodell- und Technologieentscheidungen dokumentiert.
- Vue 3 + Vite + TypeScript PWA, Laravel API, Laravel Sanctum, PostgreSQL, Redis und MinIO als Stack festgelegt.
- Security Threat Model, Risk Register und Security-Testplan ergänzt.
- Datenschutz Review und aktualisierte Datenschutz-Checklisten ergänzt.
- Priorisierten Entwicklungsplan für Foundation bis Release Check erstellt.

## 0.1.1 - 2026-05-29

- Phase-1-Standardstruktur nach Unternehmensanleitung vervollständigt.
- Kanonische Root-Dokumente für Projektdefinition, Leistungskatalog, Architektur, Security/Privacy, UI-Standards und Testing ergänzt.
- Bereichs-Agenten für Frontend, Backend, Database, Integrations, Security und DevOps ergänzt.
- Business-, Technical-, Legal- und UX-Dokumente ergänzt.
- README und AGENTS.md auf den Phase-1-Status ausgerichtet.

## 0.1.0 - 2026-05-29

- Projektordner für die App angelegt.
- Unternehmensstandard aus der bereitgestellten Anleitung übernommen.
- Dokumentations-, Prompt-, Skill-, Backend-, Frontend-, Datenbank-, Test- und Script-Struktur erstellt.
- Projektdefinition, Anforderungen, Architektur, Roadmap, Datenmodell, Datenschutz, Datenfluss, Löschkonzept, TOM/Security, UI/Brand und Repository-Workflow vorbereitet.
- Hauptquelle als Referenz im Repository vorgesehen.

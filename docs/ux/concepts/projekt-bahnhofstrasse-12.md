# Konzept: Beispielprojekt «Neubau Bahnhofstrasse 12, 8001 Zürich»

**Status:** Konzept (Ready for Implementation)
**Bereich:** Frontend / UX
**Bezug:** `PROJECT_DEFINITION.md`, `LEISTUNGSKATALOG.md`, `UI_STANDARDS.md`, `docs/ux/design-system.md`, `docs/ux/concepts/galerie-medienverwaltung.md`, `docs/ux/concepts/visidoc-DESIGN.md`, `docs/technical/api-contracts.md`
**Stack:** Vue 3 + Vite + TypeScript PWA, Tailwind, Lucide-Icons. Tokens gemäss `visidoc-DESIGN.md` / `UI_STANDARDS.md`.

---

## 1. Zweck

Dieses Dokument definiert, wie ein **konkretes Beispielprojekt** in der BauDoc-App aussieht und bedient wird. Es dient als:

- **Visuelle Referenz** für die Implementierung der Projekt-Detail-, Galerie-, Planviewer-, Fotoaufnahme- und Audit-Screens.
- **Daten-Skelett** für Frontend-Storybook, Backend-Seeds und End-to-End-Tests.
- **Kommunikationsmittel** zwischen Auftraggeber, Bauleitung und Entwicklung, damit klar ist, *was* am Bildschirm passiert, wenn jemand im Projekt arbeitet.

Es ersetzt **keine** Modul-Spec — es operationalisiert sie. Alle visuellen und interaktiven Regeln kommen aus den bestehenden Specs (`UI_STANDARDS.md`, `design-system.md`, `galerie-medienverwaltung.md`). Hier entstehen nur:

1. Die Beispieldaten und Hierarchie (Gebäude, Etagen, Räume, Gewerke, Pläne, Phasen, Beispiel-Fotos).
2. Die **Composition** der Module pro Screen (welche Komponenten wo leben).
3. **Konkrete Bildschirme** mit ASCII-/HTML-Skizzen für Desktop und Mobile.
4. **Akzeptanzkriterien** speziell für dieses Projekt.

---

## 2. Beispieldaten (konsistent, fiktiv, datenschutzkonform)

> **Hinweis:** Alle Personennamen, Daten und Zahlen sind **frei erfunden** und enthalten keinerlei Bezug zu realen Personen, Bauvorhaben oder Organisationen. Sie sind für Seeds, Storybook-Stories und Demos freigegeben.

### 2.1 Projektstammdaten

| Feld | Wert |
|---|---|
| Projektname | Neubau Bahnhofstrasse 12 |
| Projekt-ID | PRJ-2026-014 |
| Adresse | Bahnhofstrasse 12, 8001 Zürich |
| Bauherr | Beispiel AG (fiktiv) |
| Bauleiter | M. Brunner |
| Projektleiter | S. Keller |
| Status | Aktiv (Bauphase Rohbau 2 von 4) |
| Geplante Übergabe | 31.08.2027 |
| Aktuelle Planversion EG | v3.2 (2026-06-04) |
| Medien im Projekt | 248 (Beispiel im Screenshot) |

### 2.2 Projektstruktur (Gebäude → Etage → Raum)

```
Bahnhofstrasse 12
├── UG  (Tiefgarage, Technik)
│   ├── UG.01  Tiefgarage
│   ├── UG.02  Technikzentrale HLKS
│   └── UG.03  Lager
├── EG  (Empfang, Retail, Gewerbe)
│   ├── EG.01  Empfang / Lobby
│   ├── EG.02  Retail A (143 m²)
│   ├── EG.03  Retail B (98 m²)
│   └── EG.04  Personalraum
├── 1.OG (Büro, Besprechung)
│   ├── 1.OG.01  Grossraumbüro Nord
│   ├── 1.OG.02  Besprechung „Zürich"
│   ├── 1.OG.03  Besprechung „Genf"
│   ├── 1.OG.04  Teeküche
│   └── 1.OG.05  Serverraum
├── 2.OG (Büro, open space)
│   ├── 2.OG.01  Büro West
│   └── 2.OG.02  Büro Ost
└── DG  (Penthouse, Dachterrasse)
    ├── DG.01  Wohnen
    ├── DG.02  Schlafen
    └── DG.03  Dachterrasse
```

### 2.3 Gewerke

| Code | Gewerk | Verantwortlich (Rolle) |
|---|---|---|
| ROH | Rohbau | Bauleiter |
| HOL | Holzbau | Planer |
| ELE | Elektro | Gewerk-Benutzer |
| HLK | Heizung / Lüftung / Klima | Gewerk-Benutzer |
| SAN | Sanitär | Gewerk-Benutzer |
| TRO | Trockenbau | Planer |
| BOD | Bodenbeläge | Gewerk-Benutzer |
| MAL | Malerarbeiten | Gewerk-Benutzer |

### 2.4 Pläne (im Projekt hinterlegt)

| Plan-Code | Bezeichnung | Aktuelle Version | Geometrie |
|---|---|---|---|
| P-EG-GR | EG Grundriss | v3.2 (04.06.2026) | 1 : 100, 1 Seite |
| P-1OG-GR | 1.OG Grundriss | v2.1 (18.05.2026) | 1 : 100 |
| P-2OG-GR | 2.OG Grundriss | v1.0 (02.04.2026) | 1 : 100 |
| P-DG-GR | DG Grundriss | v1.0 (02.04.2026) | 1 : 100 |
| P-UG-GR | UG Grundriss | v2.0 (28.05.2026) | 1 : 100 |
| P-FAS-OST | Fassade Ost | v1.4 (21.05.2026) | 1 : 50, 2 Seiten |
| P-SCHNITT-AA | Schnitt A–A | v1.2 (10.05.2026) | 1 : 100 |

### 2.5 Phasen / Status je Raum (Beispiel für Filter)

| Phase | Etage | Status |
|---|---|---|
| Aushub | UG | abgeschlossen (2025-09) |
| Rohbau | EG, 1.OG | in Arbeit |
| Innenausbau | 1.OG | in Prüfung |
| Technik | UG | in Arbeit |
| Fassade | EG → DG | ausstehend |
| Übergabe | DG | ausstehend |

### 2.6 Beispiel-Fotos (für Storybook, keine echten Personen)

- `EG.02_Trockenbau_2026-06-08.jpg` — Trockenbauwand Retail A, Gewerk TRO, Planmarker auf P-EG-GR v3.2.
- `UG.02_HLKS_Verteiler_2026-06-05.jpg` — HLKS-Verteiler, Gewerk HLK.
- `1.OG.01_Doppelboden_2026-06-04.jpg` — Doppelboden Büro Nord, Gewerk BOD.
- `1.OG.05_Serverraum_2026-05-30.jpg` — Serverraum, Gewerk ELE, Planmarker.
- `EG.01_Empfang_Estrich_2026-05-22.jpg` — Empfang Putz, Gewerk MAL.

### 2.7 Beispiel-Audit-Einträge

| Zeit | Aktion | Nutzer | Detail |
|---|---|---|---|
| 08.06.2026 14:32 | Plan-Version hochgeladen | S. Keller | P-EG-GR v3.2 ersetzt v3.1 |
| 08.06.2026 14:35 | Foto hochgeladen | T. Hofer | EG.02_Trockenbau (248. Foto) |
| 08.06.2026 14:36 | Planmarker gesetzt | T. Hofer | Foto → P-EG-GR v3.2, (0.41, 0.28) |
| 08.06.2026 15:01 | Kommentar | M. Brunner | „Trockenbauwand OK, am Donnerstag prüfen" |
| 08.06.2026 15:14 | Download | S. Keller | P-FAS-OST v1.4 (PDF) |

---

## 3. Rollen im Beispielprojekt

Folgende Rollen sind in dem fiktiven Projekt vergeben (gem. `docs/business/user-roles.md`):

| Nutzer (fiktiv) | Rolle im Projekt | Sichtbarkeit |
|---|---|---|
| S. Keller | Projektleiter | Vollzugriff inkl. Planfreigabe, Mitglieder |
| M. Brunner | Bauleiter | Fotos, Pläne, Kommentare, Audit (lesen) |
| T. Hofer | Gewerk-Benutzer (TRO, MAL) | Nur eigene Gewerke + Pläne |
| R. Wyss | Planer | Pläne verwalten, Foto-Planmarker, Kommentare |
| E. Roth | Betrachter (Bauherr-Vertretung) | Nur Lesen, gefiltert auf öffentliche Bereiche |

Diese Verteilung dient gleichzeitig als Test-Setup für die Berechtigungs-Ansichten weiter unten.

---

## 4. Bildschirme (Composition)

Die App besteht für dieses Projekt aus folgenden Hauptansichten. Jede Ansicht verweist auf die Spec, die ihre Komponenten definiert.

| # | Bildschirm | Primary Use | Vorhandene Spec |
|---|---|---|---|
| S1 | **Projektliste** (Screenshot) | Einstieg nach Login, Filter nach Status | (neu, dieses Dokument §5.1) |
| S2 | **Projekt-Dashboard** | Übersicht, KPIs, letzte Aktivitäten | (neu, §5.2) |
| S3 | **Galerie / Medienverwaltung** | Foto- und Plan-Browser | `galerie-medienverwaltung.md` |
| S4 | **Planviewer mit Markern** | Plan zoomen, Foto-Marker ansehen/setzen | (neu, §5.3) |
| S5 | **Fotoaufnahme Mobile** | Foto schiessen + verorten | (neu, §5.4) |
| S6 | **Audit-Log** | Wer hat was wann gemacht | (neu, §5.5) |

Jeder Screen hat eine **Desktop**- und **Mobile**-Variante. Beide müssen ohne horizontalen Scroll funktionieren (`UI_STANDARDS.md`).

---

## 5. Bildschirme im Detail

### 5.1 S1 — Projektliste (Desktop & Mobile)

**Zweck:** Einstieg nach Login. Übersicht aller Projekte der Organisation, mit schneller Filterung und Sprung ins aktive Projekt.

**Layout Desktop (≥ 1024 px):**
- Header: Organisation wählen (links), globaler Such-Input (mitte), User-Menü (rechts).
- Filterleiste: Tabs „Alle", „Aktiv", „Abgeschlossen" mit Mengenzähler. View-Toggle Liste/Grid rechts.
- Tabelle: Spalten **Projekt** (Name + Adresse), **Projekt-ID**, **Bauleiter**, **Geändert** (Datum), **Medien** (Anzahl + kleiner Indikator-Balken), **Aktion** (Chevron rechts).
- Leerzustand bei 0 Treffern: kompakte Info-Box, ggf. „Neues Projekt"-Button (nur Org-Admin).

**Layout Mobile (< 768 px):**
- Sticky-Header: Such-Input, Filter-Chip „Aktiv", Sort.
- Karten-Liste: Pro Projekt eine Card mit Statuspunkt, Name, Adresse, Projekt-ID, Medien-Badge, Chevron.
- Touch-Ziel Card mind. 72 px hoch.

**Brand-Tokens:** `bg-base #12181B`, Panel `#232835`, Trennlinien `rgba(255,255,255,0.06)`, Akzent Salbei `#668048` für aktive Selektion, Status-Pill aktiv = `--status-success`.

**Spec-Referenz für den Beispiel-Screenshot:** siehe `assets/skizzen/s1-projektliste.html`.

**Akzeptanzkriterien (S1):**
- [ ] Liste lädt in < 300 ms (Skeleton sichtbar).
- [ ] Tabs „Alle / Aktiv / Abgeschlossen" filtern serverseitig.
- [ ] Sortierung `tt.mm.yyyy` (CH-Format).
- [ ] Tastatur: `↑/↓` navigiert, `Enter` öffnet.
- [ ] A11y: Kontraste AAA gem. Galerie-Spec §7.

---

### 5.2 S2 — Projekt-Dashboard

**Zweck:** Erste Anlaufstelle nach Projekteintritt. Verdichtet Baufortschritt auf einen Blick, ohne Marketing-Hero.

**Layout Desktop:**
- Top-Bar: Projektname (Marcopro 22 px), Projekt-ID (JetBrains Mono 12 px), Status-Pill „Aktiv", Bauleiter-Avatar, Schnellaktionen „Foto aufnehmen" (Primary), „Plan hochladen" (Secondary), „Mitglieder" (Secondary).
- KPI-Reihe (4 Cards, je 1/4 Breite auf xl, 2/2 auf md, 1/1 auf sm):
  1. **Medien gesamt** + Trend Δ zur Vorwoche.
  2. **Aktuelle Pläne** + Anzahl Versionen im Umlauf.
  3. **Offene Kommentare** (alle Status ≠ freigegeben).
  4. **Nächste Frist** (Datum + Was).
- Hauptbereich: zweispaltig (60/40):
  - Links: **Aktivitäten-Feed** (neueste zuerst): Icon + Akteur + Aktion + Zeit + Link zur Ressource.
  - Rechts: **Phasen-Fortschritt**: horizontale Stacked-Bar pro Etage (Aushub / Rohbau / Innenausbau / Fassade / Übergabe), Legende mit Status-Pillen.
- Sekundär: **Letzte Medien** als Grid-Strip (max. 8), Klick öffnet S3.

**Layout Mobile:**
- Sticky-Top: Projektname, Aktion „Foto aufnehmen" als FAB (rechts unten, 56 × 56 px, Salbei).
- KPIs: horizontal scrollende Card-Reihe (mit Pfeil-Indikator), pro Card 1 Zahl + Label.
- Aktivitäten-Feed: full-width Liste, jede Aktivität eine 64-px-Zeile.
- Phasen-Fortschritt: vertikal pro Etage, gleiche Status-Pillen.

**Brand-Tokens:** Aktivitäts-Icons in `--text-mid`, Akzent bei Klick-Barkeit. Status-Pillen: Aushub `success`, Rohbau `info`, Innenausbau `warn`, Fassade `--text-lo`, Übergabe `--text-lo`.

**Akzeptanzkriterien (S2):**
- [ ] KPIs sind Echtzeit (oder max. 60 s Cache), keine Deko-Zahlen.
- [ ] Aktivitäten-Feed ist unendlich scrollbar, neue Items erscheinen mit kurzer Fade-In-Animation.
- [ ] FAB „Foto aufnehmen" öffnet S5 (Mobile-Flow) auf Mobile, S5 in Modal auf Desktop.
- [ ] Bei Inaktivität 30 s wird Feed nicht auto-refreshed (Datenschutz/Ruhe).

---

### 5.3 S4 — Planviewer mit Markern

**Zweck:** Plan ansehen, zoomen, Foto-Marker setzen oder ansteuern. Pflicht für den Soll-Ist-Vergleich.

**Layout Desktop (≥ 1024 px):**
- Linke Spalte (40 %): Plan-Strip (vertikale Liste aller Pläne + Versionen), aktiver Plan oben.
- Hauptbereich (60 %): Plan-Viewer.
  - **Toolbar oben**: Plan-Titel, Version, Zoom-Controls (– 100 % +), Fit-to-screen, Vollbild, „Marker hinzufügen"-Button (nur mit Recht).
  - **Plan-Stage**: Bild/PDF gerendert, Pan per Drag, Zoom per Wheel/Pinch.
  - **Marker-Layer**: kleine Kreise (8 px) in `--accent` mit Foto-Thumbnail (24 px) bei Hover/Tap. Klick auf Marker öffnet S3-Vorschau mit diesem Foto.
  - **Hover-Tooltip** auf Marker: Foto-Datum + Gewerk + kurzer Kommentar.
  - **Plan-Version-Wechsel**: Pill-Group oben rechts „v3.2 v3.1 v3.0" (jede als Button, aktiv = `--accent`).
- Rechte Spalte (0, optional als Sheet): Inspector — Detail zum ausgewählten Foto/Marker (öffnet S3-Preview in Sheet).

**Layout Mobile (< 768 px):**
- Vollbild-Viewer, Toolbar oben, Marker-Layer zentriert.
- Tap auf Marker öffnet **Bottom-Sheet** (Höhe 60 vh) mit Foto + Metadaten + „Foto öffnen" / „Kommentare" / „Marker entfernen".
- Plan-Strip als horizontale Tab-Liste oben.

**Marker-Spec (Detail):**
- Koordinaten sind **relativ** zum Plan (0.0–1.0), nicht zur Bildschirmauflösung. Bei Zoom und Pan wird der Marker korrekt mittransformiert.
- Marker-Farbe: Salbei `--accent` Default, `--status-warn` wenn Foto in Prüfung, `--status-error` wenn Konflikt/Kommentar offen.
- Mehrere Marker am gleichen Ort: Cluster-Pill „+3" öffnet Cluster-Liste.

**Akzeptanzkriterien (S4):**
- [ ] Plan lädt < 1.5 s (Progressbar).
- [ ] Zoom/Pan 60 fps, kein Lag bei 200 Markern.
- [ ] Marker-Setzen: Long-Press auf Plan → Koordinaten-Editor → Speichern. Validierung: 0 ≤ x,y ≤ 1.
- [ ] Version-Wechsel ändert **nicht** die historischen Foto-Planmarker (Immutability).
- [ ] Marker ohne Planbezug-Foto werden mit „— (gelöscht)" angezeigt, bleiben aber im Audit-Log.

---

### 5.4 S5 — Fotoaufnahme Mobile

**Zweck:** Auf der Baustelle mit dem Smartphone ein Foto aufnehmen, sofort verorten, optional Planmarker setzen.

**Flow (Step-Component, vertikal stepbar, 4 Schritte):**

1. **Aufnahme**
   - Vollbild-Kamera-View (live), Auslöser-Button (Primary, 64 × 64 px, mittig unten).
   - Oben: Projektname + aktuelle Etage (Picker).
   - Unten klein: Thumbnail-Strip der letzten 3 Aufnahmen, „Beendet" (Secondary) links.
   - Permissions-Hint bei verweigerter Kamera: klare Anweisung in den Settings.

2. **Metadaten**
   - Gebäude → Etage → Raum (3 aufeinanderfolgende Picker, kaskadiert).
   - Gewerk (Multi-Select, max. 3 typische, Volltextsuche).
   - Aufnahmezeit: vorbelegt `Jetzt`, änderbar.
   - Optional: Tags (freier Text, Chips).

3. **Planmarker (optional)**
   - „Marker setzen?" Toggle.
   - Wenn ja: Plan-Strip → Plan-Version → Plan-Stage (read-only) → Tap setzt Marker.
   - Vorschau: kleines Thumbnail des Fotos + Position auf Plan.

4. **Bestätigen**
   - Vorschau des Bilds (gross, Hero), Zusammenfassung der Metadaten.
   - Buttons: „Speichern" (Primary), „Zurück" (Secondary), „Verwerfen" (Danger, Bestätigungsdialog).
   - Upload läuft im Hintergrund; Status wechselt in Galerie-Liste (Upload-Cloud Icon).

**Mobile-only Layout, Hochformat:**
- Sticky-Top: Step-Indicator (1/4, 2/4, 3/4, 4/4) + Projekt-Kontext.
- Content-Bereich: 24 px Padding rundum, max-width 480 px (Tablet gleicht an).
- Sticky-Bottom: Aktions-Buttons je Step.

**Akzeptanzkriterien (S5):**
- [ ] Kein Schritt dauert länger als 3 Taps (Power-User).
- [ ] Offline-Verhalten: out of scope MVP, aber „Speichern ohne Netz" zeigt verständlichen Hinweis ohne Datenverlust (im Memory, geht beim Reload verloren — explizit kommunizieren).
- [ ] EXIF: GPS wird **automatisch serverseitig gestrippt** (gem. `galerie-medienverwaltung.md` §11 + Datenschutzkonzept), Gerät + Uhrzeit bleiben.
- [ ] Bei verweigerter Permission: Banner mit klarem „Einstellungen öffnen"-Link, kein stilles Scheitern.

---

### 5.5 S6 — Audit-Log

**Zweck:** Nachvollziehbarkeit. Wer hat wann welches Foto/Plan/Kommentar geändert, hochgeladen, gelöscht, heruntergeladen.

**Layout Desktop:**
- Header: Titel „Audit-Log · Bahnhofstrasse 12", Filter-Pills (Aktions-Typen, Akteur, Zeitraum).
- Tabelle (kompakt, dichte Zeilen 48 px):
  - Zeit (tt.mm.yyyy · 14:32, JetBrains Mono, tabular nums)
  - Akteur (Avatar initialen + Name)
  - Aktion (Icon + Klartext, z. B. „Plan-Version hochgeladen")
  - Objekt (Link zur Ressource)
  - Detail (kurz, einklappbar für lange Werte)
  - IP / Client (klein, `--text-lo`, gem. `PROJECT_DEFINITION.md` offene Frage)
- Filter: Zeitraum-Presets (Heute / 7 Tage / 30 Tage / Benutzerdefiniert), Aktionstypen, Akteur.
- Export: CSV (Secondary), nur für Projektleiter.

**Layout Mobile:**
- Sticky-Filter: Aktions-Chips horizontal scrollend.
- Karten-Liste: Pro Eintrag eine Card, Zeit oben, dann Akteur + Aktion, Objekt als Link.

**Akzeptanzkriterien (S6):**
- [ ] Paginierung cursor-basiert, 50 pro Seite, ältere über „Mehr laden".
- [ ] Filter kombinierbar.
- [ ] CSV-Export enthält Timestamp ISO 8601 UTC + lokale Zeit, Felder fix dokumentiert.
- [ ] Sensible Felder (IP, UA) sind **konfigurierbar** ausblendbar gem. `PROJECT_DEFINITION.md` offener Punkt.

---

## 6. Komponenten-Composition (welche UI-Teile wiederverwendet werden)

Aus `galerie-medienverwaltung.md` und diesem Konzept ergibt sich folgender Bausteinkasten für die Implementierung:

| Komponente | Spec-Quelle | Verwendung in |
|---|---|---|
| `ProjectListTable` | neu (S1) | S1 |
| `ProjectKPICard` | neu (S2) | S2 |
| `ActivityFeedItem` | neu (S2) | S2, S6 |
| `PhaseStackedBar` | neu (S2) | S2 |
| `MediaList` (Liste/Grid) | Galerie-Spec §5.3/5.4 | S3, S6 |
| `MediaPreviewPane` | Galerie-Spec §5.5 | S3 (in Sheet auf Mobile) |
| `MediaTabs` (Bilder/Pläne/Videos) | Galerie-Spec §5.1 | S3 |
| `MediaFilterBar` | Galerie-Spec §5.2 | S3 |
| `PlanViewer` | neu (S4) | S4 |
| `PlanMarkerLayer` | neu (S4) | S4 |
| `PlanVersionPills` | neu (S4) | S4 |
| `CameraCapture` | neu (S5) | S5 |
| `MetadataStepper` | neu (S5) | S5 |
| `PlanMarkerStep` | neu (S5) | S5 |
| `AuditTable` | neu (S6) | S6 |
| `AppShell` (Header/Sidebar/Nav) | global, gem. `UI_STANDARDS.md` | alle |
| `EmptyState` | gem. UI-Standards | überall |
| `StatusPill` | UI-Standards §Farben | überall |
| `Button` (Primary/Secondary/Danger) | UI-Standards §Buttons | überall |

---

## 7. Datenfluss zur API

Die hier sichtbaren Endpoints sind alle in `docs/technical/api-contracts.md` als Platzhalter reserviert. Konkret für das Beispielprojekt:

| Anzeige | Endpoint | Erwartete Felder |
|---|---|---|
| Projektliste S1 | `GET /api/projects?status=…&q=…&cursor=…` | `id, name, address, project_id, status, leader, updated_at, media_count` |
| Dashboard S2 KPIs | `GET /api/projects/{id}/dashboard` | `media_total, plans_current, open_comments, next_deadline, recent_activity[]` |
| Dashboard S2 Phasen | `GET /api/projects/{id}/phases` | `floor_id, phase_code, status, percent` |
| Galerie S3 | `GET /api/projects/{id}/media?type=…&cursor=…&q=…` | gem. Galerie-Spec §9 |
| Planviewer S4 | `GET /api/plans/{id}/versions/{version}/view` | signierte URL + Marker-Liste |
| Marker setzen | `POST /api/photos/{id}/location` | `plan_version_id, x, y, bearing?` |
| Fotoaufnahme S5 | `POST /api/projects/{id}/photos` | Multipart + Metadaten |
| Audit S6 | `GET /api/projects/{id}/audit-logs?action=…&from=…&to=…` | `actor, action, target, detail, ts, ip?, ua?` |

Alle Antworten folgen dem in `api-contracts.md` definierten Fehlerformat. Berechtigungen werden serverseitig pro Request geprüft.

---

## 8. Visuelle Skizzen (HTML)

Die HTML-Skizzen unter `docs/ux/concepts/assets/skizzen/` rendern die oben beschriebenen Bildschirme in eurem Designsystem. Sie sind **kein Produktivcode**, sondern dienen als Diskussions- und Storybook-Quelle.

- `s1-projektliste.html` — Projektliste Desktop
- `s2-projekt-dashboard.html` — Dashboard Desktop
- `s3-galerie.html` — Galerie (verweist auf Galerie-Spec, gerendert mit Beispieldaten)
- `s4-planviewer.html` — Planviewer Desktop mit Markern
- `s5-fotoaufnahme-mobile.html` — Fotoaufnahme Mobile
- `s6-audit.html` — Audit-Log Desktop

Jede Skizze ist als standalone HTML-Datei in den Repo-Assets abgelegt, damit Stakeholder sie im Browser öffnen können ohne Storybook-Setup.

---

## 9. Akzeptanzkriterien (Gesamtprojekt)

Aus den vorhandenen Specs abgeleitet und für das Beispielprojekt konkretisiert:

1. **Login & Kontext:** Nutzer M. Brunner (Bauleiter) loggt sich ein, sieht Bahnhofstrasse 12 in der Projektliste als „Aktiv", Klick öffnet S2.
2. **Fotoaufnahme:** T. Hofer (Gewerk TRO) erstellt ein Foto in EG.02, wählt Gewerk „Trockenbau", setzt Marker auf P-EG-GR v3.2, speichert. Foto erscheint in S3, Marker erscheint in S4. Audit-Eintrag erzeugt.
3. **Planwechsel:** S. Keller lädt P-EG-GR v3.3 hoch. Bestehende Foto-Marker auf v3.2 bleiben **sichtbar auf v3.2** (Immutability), neue Fotos referenzieren v3.3.
4. **Berechtigung:** E. Roth (Betrachter) sieht nur öffentliche Bereiche, Download ist deaktiviert, Audit-Eintrag bei jedem Ansichtsversuch einer nicht erlaubten Ressource.
5. **Filter:** Im Dashboard-Filter „Gewerk = Trockenbau" reduziert sich Aktivitäten-Feed und KPI „Medien gesamt" entsprechend.
6. **Mobile-Flow:** Auf einem 360 × 640 Viewport (Baustellen-Smartphone) läuft S5 ohne horizontales Scroll, alle Touch-Ziele ≥ 44 × 44 px.
7. **A11y:** Lighthouse-Score ≥ 95 in S1–S6, Fokusring sichtbar, Status immer Icon + Text.
8. **Performance:** Dashboard S2 < 1.0 s LCP bei 4G, Galerie S3 < 1.5 s bei 1000 Medien (virtualisiert).
9. **Datenschutz:** EXIF-GPS wird serverseitig gestrippt, Audit-Eintrag enthält standardmäßig keine IP/UA, optional aktivierbar.
10. **Formatregeln:** Alle Daten in CH-Format (`tt.mm.yyyy`, `14:32`), Geldbeträge mit `1'230.00 CHF` (im MVP nicht relevant, aber global greifend).

---

## 10. Risiken & offene Punkte

| Punkt | Beschreibung | Owner |
|---|---|---|
| Planmarker-Performance | 200+ Marker auf einem Plan, 60 fps Pan/Zoom | Frontend Agent + Backend Agent |
| Foto-Upload bei schlechtem Netz | Out of Scope MVP, aber UX-Edge-Case nötig | Product Agent |
| IP/UA im Audit | Rechtlich offen, gem. `PROJECT_DEFINITION.md` | Datenschutz Agent |
| EXIF-Strip serverseitig | Muss vor erstem Speichern passieren | Backend Agent + Datenschutz Agent |
| Offline-Modus | Out of Scope MVP, spätere Phase | Product Agent |
| Mehrere Gebäude im Projekt | Aktuell ein Gebäude, Struktur vorbereiten für mehrere | Database Agent |

---

## 11. Übergabe

- **Frontend/UI Agent:** nutzt dieses Dokument + `UI_STANDARDS.md` + `galerie-medienverwaltung.md` für die Implementierung. Die HTML-Skizzen sind Storybook-Vorlage.
- **Backend Agent:** liefert die in §7 gelisteten Endpoints, inkl. EXIF-Stripping und Signierte-URLs.
- **Database Agent:** legt Seed-Daten gem. §2 an (für lokales Dev und Storybook).
- **Security Agent:** prüft, dass keine Datei-URL direkt ins Frontend hartkodiert wird; Audit-Events für Download/Ansicht/Löschung.
- **Datenschutz Agent:** prüft EXIF-Stripping und Audit-Felder (IP/UA).
- **Testing Agent:** übernimmt die Akzeptanzkriterien §9 als Test-Suite (Unit, Integration, E2E).
- **Documentation Agent:** verlinkt dieses Konzept von `docs/ux/user-flows.md` und `LEISTUNGSKATALOG.md`.

---

## 12. Versionshinweis

- **v0.1** — Initial-Konzept basierend auf Projekt-Setup, Screenshot der Projektliste, vorhandener Galerie-Spec.
- Geplant v0.2: Stitch-Screens einarbeiten, sobald Hero/Bilder-Tab/Filter-Dropdown/Grid+Empty/Mobile-Sheet gerendert sind (siehe `docs/ux/concepts/stitch-prompts.md`).

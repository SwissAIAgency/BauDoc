---
**Zuletzt aktualisiert:** 2026-06-22
**Verantwortlich:** Testing & QA Agent / Frontend/UI Agent
**Status:** APPROVED
**Bezug:** docs/testing/strategy.md, docs/design/system.md, docs/ux/accessibility.md, AGENTS.md (UI-Regeln)
---

# Accessibility-Audit-Prozess

> Anforderungsübersicht: `docs/ux/accessibility.md`
> Teststrategie übergeordnet: `docs/testing/strategy.md`

---

## Ziel

Sicherstellen, dass VisiDoc auf Baustellen-Smartphones und Desktop-Arbeitsplätzen vollständig nutzbar ist — unabhängig von Eingabemethode oder Hilfsmitteln. Barrierefreiheit ist kein nachträgliches Audit, sondern Teil jedes UI-Tasks.

---

## Standards und Anforderungsniveau

| Standard | Anforderung | Hinweis |
|---|---|---|
| WCAG 2.1 Level AA | Pflicht für alle produktiven UI-Komponenten | Mindestanforderung |
| WCAG 2.1 Level AAA | Angestrebt für Kernflows | Nicht überall erreichbar |
| EN 301 549 | Relevant bei öffentlicher Beschaffung | Für spätere Ausschreibungen prüfen |
| Swiss Accessibility Law | Öffentliche Institutionen betroffen | Bei staatlichen Bauprojekten evaluieren |

---

## Audit-Ebenen

### Ebene 1 — Kontinuierlich (per Task)

Jeder UI-Task muss vor Merge folgende Punkte erfüllen:

- [ ] Alle interaktiven Elemente per Tastatur erreichbar
- [ ] Fokus-Reihenfolge logisch (Tab-Sequenz entspricht visueller Reihenfolge)
- [ ] Sichtbarer Fokus-Indikator vorhanden (kein `outline: none` ohne Ersatz)
- [ ] Labels für alle Formularfelder sichtbar (kein `placeholder`-only)
- [ ] Fehler- und Statuszustände nicht ausschließlich über Farbe kommuniziert
- [ ] Icon-only-Aktionen mit `aria-label` versehen
- [ ] Ladezustände mit `aria-live` oder `role="status"` signalisiert
- [ ] Texte erfüllen Mindestkontrast (4.5:1 für Normaltext, 3:1 für Großtext)

### Ebene 2 — Meilenstein-Audit (je Modul, nach BD-013)

Nach Fertigstellung jedes Moduls (Galerie, Planviewer, Formular-Flows) wird ein strukturierter Audit durchgeführt:

**Werkzeuge:**
- `axe DevTools` (Browser-Extension) — automatisierter Check
- `Lighthouse` (Chrome DevTools) — Performance + Accessibility Score
- Manuelle Tastatur-Navigation (Tab, Shift+Tab, Enter, Space, Escape, Pfeiltasten)
- Screenreader-Check: VoiceOver (macOS/iOS), TalkBack (Android), NVDA (Windows)

**Ablauf:**
1. axe DevTools ausführen — alle Critical und Serious Violations beheben.
2. Lighthouse Accessibility Score ≥ 90 für alle Haupt-Views.
3. Manuelle Tastatur-Navigation aller interaktiven Flows.
4. Screenreader-Grundprüfung für: Login, Foto aufnehmen, Galerie filtern, Plan öffnen.
5. Ergebnis in Audit-Bericht dokumentieren (Vorlage unten).

### Ebene 3 — Release-Audit (vor MVP-Release)

Vollständiger End-to-End-Audit vor öffentlichem Release:

- Alle Ebene-2-Audits für alle Module abgeschlossen.
- Regressionstest nach letzten UI-Änderungen.
- Externer Review empfohlen (optional, je nach Anforderungen der Auftraggeber).

---

## Prüfpunkte nach Bereich

### Formulare

- [ ] Jedes Eingabefeld hat ein sichtbares `<label>` oder `aria-labelledby`
- [ ] Pflichtfelder mit `required` und `aria-required="true"` markiert
- [ ] Fehler erscheinen inline am Feld + zusammengefasst (falls mehrere)
- [ ] Fehlermeldung mit `role="alert"` oder `aria-live="assertive"` kommuniziert
- [ ] Submit-Aktion nach Fehler wieder fokussierbar
- [ ] Datei-Upload-Buttons beschriftet und per Tastatur auslösbar

### Galerie und Listen

- [ ] Kein Informationsverlust bei Zoom bis 200 %
- [ ] Filter-Status textlich erkennbar (nicht nur visuell hervorgehoben)
- [ ] Leerer Zustand erklärt nächste Aktion (nicht nur Icon)
- [ ] Foto-Karten mit sinnvollem Alt-Text oder `aria-label`
- [ ] Infinite-Scroll oder Pagination per Tastatur steuerbar

### Planviewer

- [ ] Zoom- und Pan-Controls per Tastatur erreichbar
- [ ] Marker-Positionen alternativ als Liste abrufbar (kein ausschließlich grafischer Zugang)
- [ ] Controls überdecken keine wichtigen Plan-Metadaten
- [ ] Druckansicht ohne interaktive Controls verfügbar

### Navigation und App-Shell

- [ ] Skip-Link zum Hauptinhalt (erstes Tab-Ziel auf jeder Seite)
- [ ] Sidebar bei Mobile-Overlay: Fokus bleibt im Dialog, Escape schließt
- [ ] Breadcrumb oder Seitentitel kommuniziert Kontext
- [ ] Toast/Notification mit `aria-live="polite"` oder `aria-live="assertive"` je Priorität

### Modals und Dialoge

- [ ] Modal fängt Fokus (`focus-trap`), kein Tab-Out während Modal offen
- [ ] Escape schließt Modal
- [ ] Nach Schließen: Fokus kehrt zum auslösenden Element zurück
- [ ] `role="dialog"` und `aria-labelledby` korrekt gesetzt
- [ ] Hintergrund-Inhalt mit `aria-hidden="true"` während Modal offen

---

## Kontrast-Anforderungen

| Element | Mindest-Kontrastverhältnis | Referenz |
|---|---|---|
| Normaltext (< 18 pt) | 4.5 : 1 | WCAG 1.4.3 AA |
| Großtext (≥ 18 pt oder fett ≥ 14 pt) | 3 : 1 | WCAG 1.4.3 AA |
| UI-Komponenten und Icons | 3 : 1 | WCAG 1.4.11 AA |
| Fokus-Indikator | 3 : 1 gegen Hintergrund | WCAG 2.4.11 AA |

VisiDoc-Tokens prüfen gegen: `--vd-color-surface` (Hintergrund), `--vd-color-text` (Primärtext), `--vd-color-text-muted` (Sekundärtext).

---

## Audit-Bericht Vorlage

```markdown
## Accessibility-Audit — [Modul] — [Datum]

**Scope:** [z.B. Galerie-View, Foto-Upload-Modal]
**Prüfer:** [Agent oder Person]
**Werkzeuge:** axe DevTools [Version], Lighthouse [Version], Manuell

### axe DevTools Ergebnis
- Critical: [Anzahl] — [Liste der Violations]
- Serious: [Anzahl] — [Liste]
- Moderate/Minor: [Anzahl]

### Lighthouse Score
- Accessibility: [Score]/100

### Manuelle Prüfung
- Tastatur-Navigation: [PASS / FAIL + Details]
- Screenreader (VoiceOver): [PASS / FAIL + Details]
- Kontrast: [PASS / FAIL]

### Offene Punkte
- [ ] [Issue] — Priorität: [Critical / High / Medium / Low]

### Status
[BESTANDEN / NICHT BESTANDEN — erneuter Audit nach Fixes nötig]
```

---

## Änderungshistorie

| Datum | Version | Änderung |
|---|---|---|
| 2026-06-22 | 1.0.0 | Initiale Fassung (Long-Term Milestone L-6) |

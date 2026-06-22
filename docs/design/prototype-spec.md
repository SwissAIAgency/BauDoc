# Prototype-Spezifikation

**Zuletzt aktualisiert:** 2026-06-22  
**Verantwortlich:** Frontend/UI Agent  
**Status:** APPROVED  
**Bezug:** `PROTOTYP.md` (Root), `frontend/prototypes/DESIGN.md`, `frontend/prototypes/COMPONENTS.md`

---

## Zweck

Diese Datei verweist auf die Single Source of Truth für den HTML-Prototyp.

## Kanonischer Ort

> **Die vollständige Prototype-Spezifikation befindet sich in `PROTOTYP.md` im Root-Verzeichnis.**  
> Sie umfasst alle 6 Screens, 4 Modal-Typen, Design-Tokens, Änderungs-Log und verbindliche Regeln.  
> **Nichts an dieser Spezifikation darf ohne Aktualisierung von `PROTOTYP.md` geändert werden.**

`PROTOTYP.md` bleibt bewusst im Root, weil:
- Es die Single Source of Truth mit 847+ Zeilen und vollständigem Änderungs-Log ist
- Alle Agents und AGENTS.md-Dateien direkt darauf verweisen
- Die git-Historie an diesem Pfad wertvoll ist

## Kurzübersicht

| Bereich | Details |
|---|---|
| **Prototyp-Version** | 1.5.1 |
| **Brand** | VisiDoc (Sage `#668048` + Charcoal `#1F2429`) |
| **Hauptdatei** | `frontend/prototypes/index.html` |
| **CSS-Tokens** | `frontend/prototypes/app-shell.css` |
| **Screens** | Dashboard, Projekte, Projekt-Detail, Galerie, Archiv, Einstellung |
| **Modals** | Media-Detail, Upload-Wizard, Projekt-Wizard, Export-Wizard |
| **Komponenten-Status** | `frontend/prototypes/COMPONENTS.md` |
| **Design-Tokens (operativ)** | `frontend/prototypes/DESIGN.md` |

## Verwandte Dokumente

- `docs/design/system.md` — Produktive UI-Standards (ab BD-005)
- `frontend/prototypes/MODALS.md` — Modal-Definitionen
- `frontend/prototypes/ARCHITECTURE.md` — Prototype-Struktur
- `docs/ux/concepts/` — Einzelne Komponenten-Specs (Dashboard, Preview-Card, Scrollbar, Sidebar)

# Spec 08 — Dokumentenverwaltung

**Status:** APPROVED · **Bau:** MVP · **Bezug:** D-015
**Source of Truth für:** allgemeine Dokumente (Protokolle, Datenblätter)

## Zweck

Verwaltung allgemeiner Projektdokumente, getrennt vom georeferenzierbaren Plan-Modell.

## Festlegungen

- Eigene schlanke **`documents`-Entität** (nicht Teil von `plans`/`plan_versions`).
- Felder: Kategorie, Projekt-/Gewerk-Bezug, optionale einfache Versionierung, Datei-Referenz.
- Speicherung/Zugriff über dieselbe Pipeline und Sicherheits-Regeln wie Medien ([[05-media-pipeline]]):
  privat, signierte URLs, Malware-Scan, Allowlist.
- Rechte: `document.view/upload/download` gemäß [[02-rbac-permissions]] (Download separat steuerbar).

## Datenmodell (Delta)

- `documents` (org_id, project_id, trade_id?, category, current_version, …) + optionale Versionstabelle.

## Abhängigkeiten / Verweise

- [[05-media-pipeline]] · [[02-rbac-permissions]] · [[06-plan-management-viewer]] (Abgrenzung zu Plänen)

## Akzeptanzkriterien

- Dokumente sind projekt-/gewerkbezogen filter- und berechtigbar.
- Plan-spezifische Felder (Kalibrierung, Plangattung) sind **nicht** auf Dokumente anwendbar (saubere Trennung).
- Download ist unabhängig von Ansicht entziehbar.

## Offene Punkte

- Umfang der Dokument-Versionierung (nur „latest" vs. Historie) final festlegen.

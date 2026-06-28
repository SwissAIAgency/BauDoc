# Spec 24 — Projektstruktur & Stammdaten

**Status:** APPROVED · **Bau:** MVP (Vorlagen post-MVP) · **Bezug:** D-059, D-060, D-061, D-062
**Source of Truth für:** Projektstruktur (Gebäude/Etage/Raum/Zone), Gewerke/Arbeitstypen, Projekt-Lifecycle & Archivierung

## Zweck

Das Skelett, an dem Fotos, Pläne, Rechte, Filter und Freigaben hängen: Projektstruktur, Stammdaten, Lebenszyklus.

## Festlegungen

### Struktur-Hierarchie (D-059)
- Ebenen: **Projekt → Gebäude → Etage → Raum → Zone**. Pflicht ist nur **Projekt**.
- **Pro Projekt konfigurierbar**, welche darüberliegenden Ebenen Pflicht sind (Projekt-Setting „Pflicht-Ebenen").
- Fotos/Pläne können auf jeder erlaubten Ebene verankert werden; der Upload validiert **projektabhängig**.

### Gewerke & Arbeitstypen (D-060)
- **Org-Standardkatalog** (gepflegt durch Inhaber/Org-Admin), wird in neue Projekte vorbefüllt.
- Pro Projekt ergänz-/deaktivierbar (kein Löschen genutzter Gewerke; deaktivieren statt entfernen).
- **Begriff:** Im UI teils „Gattung" genannt — dieselbe Dimension wie „Gewerk" (kanonisch „Gewerk", D-079); nicht zu verwechseln mit „Plangattung" (Plan-Kategorie, [[06-plan-management-viewer]]).

### Projekt-Lifecycle & Archivierung (D-061)
- Status **Aktiv → Abgeschlossen → Archiviert**.
- Archiviert = **read-only**, aus aktiven Listen ausgeblendet, alle Daten + Audit bleiben (Beweiswert/Retention),
  **Reaktivierung** durch Inhaber/Org-Admin (auditiert).

### Struktur-Vorlagen (D-062)
- Datenmodell für **Vorlagen** + „aus bestehendem Projekt kopieren" vorbereiten; **Bau post-MVP**.

## Datenmodell (Delta)

- `projects.status` (aktiv|abgeschlossen|archiviert), `projects.required_levels` (JSONB Projekt-Setting).
- `buildings`/`floors`/`rooms`/`room_zones` (optional je nach Pflicht-Setting), `trades`/`work_types`
  mit `is_active` + Herkunft (org_default|project).
- Hoheit Gesamtmodell: [[10-data-model]].

## Abhängigkeiten / Verweise

- [[10-data-model]] · [[02-rbac-permissions]] (structure.manage/trade.manage) · [[05-media-pipeline]] (Verankerung)
- [[21-hosting-compliance-legal]] (Archiv-Retention/Löschung) · [[25-status-approval-workflow]]

## Akzeptanzkriterien

- Ein Projekt mit nur „Raum Pflicht" akzeptiert Fotos ohne Gebäude/Zone; ein Projekt mit „Gebäude+Etage+Raum Pflicht" erzwingt diese.
- Neues Projekt erhält den Org-Gewerke-Katalog vorbefüllt; Projekt-Anpassungen wirken nicht auf andere Projekte.
- Archiviertes Projekt ist read-only und in aktiven Listen ausgeblendet; Reaktivierung stellt Schreibzugriff wieder her.
- Deaktiviertes Gewerk bleibt an bestehenden Fotos referenzierbar.

## Offene Punkte

- Genaue Felder/Umfang der Projekt-Vorlagen (post-MVP).

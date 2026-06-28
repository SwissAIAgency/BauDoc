# Spec 28 — Dashboard & Kennzahlen

**Status:** APPROVED · **Bau:** MVP (leicht) · **Bezug:** D-074, D-075, D-076
**Source of Truth für:** Dashboard-Umfang, KPI-Set, Dashboard-Ebenen

## Zweck

Schnelle Orientierung: Was ist offen, was ist neu — auf Org- und Projektebene.

## Festlegungen

- **Umfang (D-074):** leichtes Dashboard im MVP — KPI-Kacheln + **Aktivitäts-Feed** aus vorhandenen Daten
  (keine separate Aggregations-Pipeline). Erweiterte Analytik/Charts später.
- **KPI-Set (D-075):** aktive Projekte, Fotos (gesamt/neu), offene Freigaben (In Prüfung), offene Mängel, letzte Aktivität.
- **Ebenen (D-076):** **Org-Übersicht** (Aggregation über alle berechtigten Projekte) + **Projekt-Dashboard**.
- **Berechtigung:** alle KPIs/Feeds sind **berechtigungsgefiltert** — jeder sieht nur Zahlen über Daten, die er sehen darf
  ([[01-tenant-isolation-rls]], [[02-rbac-permissions]]).

## Datenmodell (Delta)

- Keine neuen Kernspalten nötig (Aggregation über bestehende Tabellen); ggf. materialisierte Sicht/Cache später bei Bedarf.

## Abhängigkeiten / Verweise

- [[25-status-approval-workflow]] (offene Freigaben) · [[18-capture-features]] (offene Mängel) · [[27-gallery-filter-search]] (neue Fotos)
- [[02-rbac-permissions]] / [[01-tenant-isolation-rls]] (Filterung)

## Akzeptanzkriterien

- Org-Dashboard aggregiert nur berechtigte Projekte; Projekt-Dashboard zeigt die Kennzahlen eines Projekts.
- Ein Gewerk-Benutzer sieht andere (kleinere) Zahlen als ein Projektleiter — keine KPI hebt Rechte auf.
- KPIs laden ohne spürbare Verzögerung auf realistischen Datenmengen (Schwelle definieren).

## Offene Punkte

- Performance-Schwelle, ab der KPIs gecacht/materialisiert werden.
- Inhalt/Granularität des Aktivitäts-Feeds.

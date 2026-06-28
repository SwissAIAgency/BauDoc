# Spec 11 — KI-Integration (self-hosted)

**Status:** APPROVED · **Bau:** Such-Embeddings (Text+Bild) **MVP**, übrige KI post-MVP · **Bezug:** D-007, D-018, D-071
**Source of Truth für:** KI-Bildbeschreibung, Embeddings/semantische Suche, Transkription

## Zweck

KI-gestützte Anreicherung (Bildbeschreibung, Tags, semantische Suche, später Transkription) bei voller Datenhoheit.

## Festlegungen

- KI hinter einem **provider-agnostischen internen Interface** + Queue-Jobs.
- Default-Implementierung **self-hosted/On-Prem (EU/CH)** → **kein** Abfluss von Bild-/Audiodaten an externe APIs.
- **Scope-Split (D-071):** Such-Embeddings (Text + Bild) + pgvector sind **MVP** (treiben die semantische Suche [[27-gallery-filter-search]]); redaktionelle Bildbeschreibung/Tags und Audio-Transkription bleiben post-MVP.
- Modelle: Embedding-Modelle (Text + Bild, MVP), Vision-Bildbeschreibung/Tags (post-MVP), Transkription/Whisper-Klasse (post-MVP). Alle self-hosted, GPU.
- Ergebnisse in **separaten** Tabellen als „auto-generiert" markiert, immer nutzer-korrigierbar; **nie** verbindliche Wahrheit.
- Suche verwendet nur berechtigte Ergebnisse (RBAC/RLS gelten).
- Trade-off akzeptiert: höherer GPU-/Betriebsaufwand; Interface bleibt austauschbar.

## Datenmodell (Delta)

- `photo_ai_descriptions`, `photo_tags`, Embedding-Spalten via pgvector (Hoheit: [[10-data-model]]).

## Abhängigkeiten / Verweise

- [[10-data-model]] · [[05-media-pipeline]] (Trigger bei Upload) · [[12-agent-mcp-readiness]] · [[21-hosting-compliance-legal]]

## Akzeptanzkriterien

- KI-Jobs laufen asynchron; Ergebnisse sind als auto-generiert gekennzeichnet und bestätig-/korrigierbar.
- Keine Bild-/Audiodaten verlassen die CH/EU-Infrastruktur.
- Semantische Suche liefert nur berechtigte Treffer.

## Offene Punkte

- Konkrete Modellwahl + GPU-Infrastruktur.

# Spec 27 — Galerie, Filter & Suche

**Status:** APPROVED · **Bau:** MVP (inkl. semantischer Suche) · **Bezug:** D-070, D-071, D-072, D-073
**Source of Truth für:** Galerie-Verhalten (Backend/API), Filter, Sortierung, Suche

## Zweck

Das zentrale „Finden": chronologische Galerie + kombinierbare Filter + Suche — alles innerhalb der Berechtigung.
UX-Verhalten (Serpentine-Timeline) siehe `docs/ux/concepts/galerie-timeline-spec.md`.

## Festlegungen

### Filter (D-070)
- **Voller Satz serverseitig**, kombinierbar: Zeitraum, Ort (Gebäude/Etage/Raum/Zone), Gewerk, Status, Ersteller, Typ, Tags.
- **Cursor-Pagination** ([[19-api-design]]) für große chronologische Listen.
- Filter operieren **immer innerhalb RBAC/RLS** — schränken ein, heben nie Rechte auf (z.B. Gewerk-Benutzer).

### Suche (D-071) — kehrt D-007/D-018 für die Suche um
- **Volle semantische Suche im MVP** (Text- **und** Bild-Inhalt) zusätzlich zur Postgres-Volltextsuche (Dateiname/Kommentare/Tags).
- Embeddings (Text + Bild) via **pgvector** ([[10-data-model]]); erzeugt als Queue-Job in der Upload-Pipeline ([[05-media-pipeline]]).
- Modelle **self-hosted (EU/CH), GPU** ([[11-ai-integration]], [[21-hosting-compliance-legal]]) → MVP-Infrastruktur.
- Suchergebnisse nur über **berechtigte** Inhalte (RBAC/RLS gelten auch für Vektortreffer).

### Sortierung/Gruppierung (D-072)
- Default **chronologisch** (neueste zuerst), Timeline-Gruppierung nach Zeitraum; umschaltbar auf Name/Ersteller.

### Gespeicherte Ansichten (D-073)
- Datenmodell für gespeicherte/teilbare Filter **vorbereiten**; **Bau post-MVP**.

## Datenmodell (Delta)

- Embedding-Spalten (pgvector) auf `photos`/`photo_files` (Bild) und auf Text (Kommentare/Beschreibungen/Tags).
- `saved_filters` (vorbereitet, post-MVP).

## Abhängigkeiten / Verweise

- [[05-media-pipeline]] (Embedding-Job) · [[10-data-model]] (pgvector) · [[11-ai-integration]] (Modelle) ·
  [[19-api-design]] (Cursor) · [[01-tenant-isolation-rls]] / [[02-rbac-permissions]] (Berechtigung) · [[24-project-structure-master-data]] (Ort-Filter)

## Akzeptanzkriterien

- Kombinierte Filter liefern korrekte, **berechtigungsgefilterte** Ergebnisse mit stabiler Cursor-Pagination.
- Volltext findet Treffer in Dateinamen/Kommentaren/Tags; semantische Suche findet sinngemäße Text- und Bild-Inhalte.
- Ein Gewerk-Benutzer erhält bei „alle Gewerke" trotzdem nur seine berechtigten Treffer.
- Default-Galerie zeigt chronologische Timeline; Umschalten auf Name/Ersteller funktioniert.

## Offene Punkte

- Konkrete Embedding-Modelle (Text/Bild) + GPU-Sizing → [[11-ai-integration]].
- Relevanz-Ranking-Mix (FTS vs. Vektor) und Schwellen.

# Spec 26 — Kommentare & Kollaboration

**Status:** APPROVED · **Bau:** MVP · **Bezug:** D-067, D-068, D-069
**Source of Truth für:** Textkommentare, @-Erwähnungen, Bearbeitungs-/Löschregeln

## Zweck

Fachlicher Austausch am konkreten Foto/Dokument; Grundlage für Pflichtkommentare im Freigabe-Workflow.

## Festlegungen

- **Scope (D-067):** Kommentare an **Fotos + Dokumenten**, optional verankert an einer **Planposition**; MVP-Fokus Fotos.
- **Struktur (D-068):** flache Kommentarliste + **@-Erwähnungen** von Projektmitgliedern (lösen Benachrichtigung via
  [[13-notifications]]). Threads/Antworten später nachrüstbar.
- **Bearbeitung (D-069):** eigene Kommentare editier-/löschbar (**Soft-Delete**, auditiert). Die Freigabe-Sperre eines
  Fotos betrifft nur den Bildinhalt — **Kommentieren bleibt auch an freigegebenen Fotos möglich**.
- **Audio-Kommentare** sind separat in [[18-capture-features]] (Erfassung) + [[11-ai-integration]] (Transkription).
- Rechte: `photo.comment`/`document.comment` gemäß [[02-rbac-permissions]].

## Datenmodell (Delta)

- `photo_comments` (+ ggf. `document_comments`): author, body, `plan_location_id?`, `mentions` (JSONB), `deleted_at`, `edited_at`.

## Abhängigkeiten / Verweise

- [[13-notifications]] (@-Mentions) · [[25-status-approval-workflow]] (Pflichtkommentar) · [[03-audit-logging]] · [[18-capture-features]]

## Akzeptanzkriterien

- @-Erwähnung eines berechtigten Mitglieds erzeugt eine Benachrichtigung.
- Eigener Kommentar ist editier-/löschbar (Soft-Delete); Änderung/Löschung erscheint im Audit.
- An einem freigegebenen (gesperrten) Foto kann weiterhin kommentiert werden.
- Ein gelöschter Kommentar ist nicht mehr sichtbar, bleibt aber forensisch nachvollziehbar.

## Offene Punkte

- Threads/Antworten (post-MVP) · Resolve-/Erledigt-Markierung von Kommentaren (optional, ggf. mit Mängel-Light verzahnen).

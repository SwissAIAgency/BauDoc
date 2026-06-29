# Spec 25 — Status- & Freigabe-Workflow

**Status:** APPROVED · **Bau:** MVP (Default-Maschine; Status-Editor Fast-Follow) · **Bezug:** D-063, D-064, D-065, D-066 (+ D-042)
**Source of Truth für:** Prüf-/Freigabe-Zustände, Übergänge, Freigabe-Regeln, Sperre/Re-Open

## Zweck

Das Herz der „prüfbaren Dokumentation": definierte Zustände eines Fotos/Dokuments und kontrollierte Übergänge.

## Festlegungen

### Status-Modell (D-063)
- **Pro Org konfigurierbare State-Machine** (Zustände + erlaubte Übergänge).
- **Default-Preset = 5 Prototyp-Zustände:** Neu → In Prüfung → Freigegeben / Abgelehnt / Hinweis.
  - „Hinweis" = Nacharbeit nötig (zurück in Bearbeitung), „Abgelehnt" = verworfen.
- **Status-Editor** (Org passt Zustände/Übergänge an) als **Fast-Follow** (V1.1); MVP nutzt das Default-Preset.

### Geltung (D-064)
- **Fotos + Dokumente** tragen den Status. **Pläne** nutzen Versionierung ([[06-plan-management-viewer]]), keinen Status.

### Freigabe-Regel (D-065, D-042)
- Freigabe (Status „Freigegeben") nur durch `Bauleiter`/`Projektleiter` (D-042).
- **Vier-Augen-Prinzip Default** (Ersteller ≠ Freigeber); **pro Org abschaltbar** für Kleinst-Teams.

### Effekte (D-066)
- „Freigegeben" = gegen Änderung **gesperrt** (read-only) bis explizites **Re-Open** durch Berechtigten (auditiert).
- „Abgelehnt"/„Hinweis" erfordern **Pflichtkommentar** ([[26-comments-collaboration]]).
- Jeder Statuswechsel ist auditrelevant ([[03-audit-logging]]) und kann Benachrichtigung auslösen ([[13-notifications]]).

## Datenmodell (Delta)

- `media_status_states`/`media_status_transitions` je Org (Default-Seed = Prototyp-5er).
- `photos.status` / `documents.status`, `status_changed_by`, `status_changed_at`, `locked` (bei Freigabe).
- Org-Setting `four_eyes_required` (bool).

## Abhängigkeiten / Verweise

- [[26-comments-collaboration]] (Pflichtkommentar) · [[03-audit-logging]] · [[13-notifications]] · [[02-rbac-permissions]] (approve)
- [[06-plan-management-viewer]] (Abgrenzung Pläne)

## Akzeptanzkriterien

- Bei aktivem Vier-Augen kann der Ersteller sein eigenes Foto nicht freigeben; bei deaktiviertem schon.
- Freigegebenes Foto ist read-only; Re-Open durch Berechtigten erzeugt Audit-Eintrag und hebt die Sperre auf.
- Ablehnung/Hinweis ohne Kommentar wird abgelehnt.
- MVP läuft mit dem Default-Preset, ohne dass der Status-Editor existiert.

## Offene Punkte

- Umfang/Validierung des Status-Editors (Fast-Follow): welche Übergänge frei konfigurierbar.

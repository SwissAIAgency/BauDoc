# Spec 13 — Benachrichtigungen

**Status:** APPROVED · **Bau:** MVP (E-Mail bei Planversion) → erweitert · **Bezug:** D-032
**Source of Truth für:** Benachrichtigungsdienst (In-App + E-Mail)

## Zweck

Relevante Ereignisse zeitnah an die richtigen Personen kommunizieren.

## Festlegungen

- Event-getriebener Dienst über die **Redis-Queue**.
- **Zwei Kanäle:** In-App-Center + E-Mail; **pro Nutzer konfigurierbar**.
- **Events:** neue Planversion (Muss-Anforderung), Freigabe/Ablehnung, @-Erwähnung in Kommentaren, Rechteänderung;
  erweiterbar (z.B. Mangel zugewiesen, [[18-capture-features]]).
- E-Mail-Versand als verbleibender Dritt-Dienst → AVV-Register ([[21-hosting-compliance-legal]]).

## Datenmodell (Delta)

- `notifications` (Empfänger, Typ, Payload, Kanal, Status, gelesen_at); Nutzer-Präferenzen je Event/Kanal.

## Abhängigkeiten / Verweise

- [[06-plan-management-viewer]] (Planversion) · [[02-rbac-permissions]] (Rechteänderung) · [[09-system-architecture]] (Queue)

## Akzeptanzkriterien

- Neue Planversion erzeugt E-Mail + In-App-Benachrichtigung an berechtigte Empfänger.
- Nutzer kann Kanäle/Events in seinen Präferenzen steuern.
- Versand läuft asynchron; fehlgeschlagener Versand wird erneut versucht/protokolliert.

## Offene Punkte

- Digest-/Zusammenfassungs-Modus (z.B. tägliche Sammel-E-Mail) optional.

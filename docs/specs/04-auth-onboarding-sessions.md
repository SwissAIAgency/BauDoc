# Spec 04 — Authentifizierung, Onboarding, Sessions & Rate-Limiting

**Status:** APPROVED · **Bau:** MVP · **Bezug:** D-022, D-031, D-035, D-036
**Source of Truth für:** Auth, 2FA, Einladungen, Token/Sessions, Rate-Limiting

## Zweck

Sicherer Zugang für Web + PWA, eindeutige Org-Zuordnung neuer Nutzer, Schutz gegen Brute-Force.

## Festlegungen

- **Auth:** Laravel Sanctum (Token für Web+PWA, Login/Logout/Passwort-Reset).
- **2FA:** TOTP (Authenticator-App) **verpflichtend für System-/Org-Admins**, optional für alle.
- **Onboarding:** **einladungsbasiert** per zeitlich begrenztem E-Mail-Token; Token setzt Org-/Projektzuordnung
  eindeutig. Keine offene Selbstregistrierung. SSO/OIDC als spätere Option.
- **Sessions/Token:** kurzlebiges Access-Token + längeres Refresh-Token (PWA-tauglich); aktive Geräte-Sessions
  einsehbar und einzeln **widerrufbar**.
- **Rate-Limiting:** globales API-Throttling pro Nutzer/IP **plus** verschärfte Limits auf `login`/`password-reset`
  (Versuchszähler, exponentielles Backoff, temporäre Sperre).

## Datenmodell (Delta)

- Einladungen: `invitations` (E-Mail, org_id, project_id?, rolle, token_hash, expires_at, accepted_at?).
- 2FA-Secret je User (verschlüsselt); aktive Sessions/Token-Tabelle für Widerruf.

## Abhängigkeiten / Verweise

- [[01-tenant-isolation-rls]] · [[02-rbac-permissions]] · [[03-audit-logging]] (Login/Reset werden auditiert)

## Akzeptanzkriterien

- Geschützte API-Endpunkte sind ohne gültige Anmeldung nicht erreichbar.
- Admins können sich ohne aktiviertes TOTP nicht anmelden.
- Eingeladener Nutzer landet ausschließlich in der eingeladenen Organisation/Projekt.
- Wiederholte Fehllogins lösen Backoff/Sperre aus.
- Ein widerrufenes Geräte-Token ist sofort ungültig.

## Offene Punkte

- Konkrete Token-Laufzeiten (Access/Refresh) als Konfigwerte festlegen.

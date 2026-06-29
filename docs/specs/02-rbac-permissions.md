# Spec 02 — Rollen, Rechte & Berechtigungs-Matrix

**Status:** APPROVED · **Bau:** MVP · **Bezug:** D-009, D-041, D-042
**Source of Truth für:** granulare Permissions, Berechtigungs-Matrix, Freigabe-Recht
**Hinweis:** Das *strukturelle* Rollenmodell (Scopes, Vererbung, Delegation, Gewerk-Scope, Gäste) ist in [[23-role-architecture]].

## Zweck

Serverseitige Autorisierung: definiert, welche Rolle welche Aktion in welchem Scope ausführen darf. Basis auch für
Agent-Rechteprofile ([[12-agent-mcp-readiness]]).

## Festlegungen

- Paket: **`spatie/laravel-permission`**, projekt-scoped über das Teams-Feature (`team_id = project_id`).
- **Globale Rollen:** `Systemadministrator` (plattformweit, Admin-2FA), `Organisationsadministrator` (org-weit).
- **Projekt-Rollen:** `Projektleiter`, `Bauleiter`, `Planer`, `Gewerk-Benutzer`, `Betrachter` — pro Projekt zuweisbar.
- **Feste Permission-Presets je Rolle** (keine frei konfigurierbaren Org-Rechte im MVP).
- `Ansicht ≠ Download` (separat steuerbar). `Gewerk-Benutzer` wirkt nur auf zugewiesene Gewerke.
- **Freigabe** (Status „Freigegeben") nur durch `Bauleiter` + `Projektleiter`.

## Berechtigungs-Matrix

Legende: ✓ = erlaubt, — = nicht erlaubt, (k) = pro Projekt/Org konfigurierbar, (Org)/(Proj) = Scope.

| Permission | SysAdmin | OrgAdmin | Projektleiter | Bauleiter | Planer | Gewerk-Benutzer | Betrachter |
|---|---|---|---|---|---|---|---|
| system.admin (Plattform) | ✓ | — | — | — | — | — | — |
| org.manage (Benutzer/Rollen) | — | ✓ | — | — | — | — | — |
| project.manage (anlegen/archivieren) | — | ✓ | ✓ | — | — | — | — |
| project.members (Mitglieder/Rollen) | — | ✓ | ✓ | — | — | — | — |
| structure.manage (Gebäude/Etage/Raum) | — | ✓ | ✓ | — | — | — | — |
| trade.manage (Gewerke/Arbeitstypen) | — | ✓ | ✓ | — | — | — | — |
| plan.view | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| plan.upload / plan.version | — | ✓ | ✓ | — | ✓ | — | — |
| plan.calibrate (Georeferenz) | — | ✓ | ✓ | — | ✓ | — | — |
| photo.view | — | ✓ | ✓ | ✓ | ✓ | ✓ (Gewerk) | ✓ |
| photo.upload | — | ✓ | ✓ | ✓ | ✓ | ✓ (Gewerk) | — |
| photo.locate (Planmarker) | — | ✓ | ✓ | ✓ | ✓ | ✓ (Gewerk) | — |
| photo.comment | — | ✓ | ✓ | ✓ | ✓ | ✓ (Gewerk) | — |
| photo.download | — | ✓ | ✓ | ✓ | ✓ | (k) | (k) |
| photo.approve (Freigabe) | — | — | ✓ | ✓ | — | — | — |
| document.view | — | ✓ | ✓ | ✓ | ✓ | ✓ (Gewerk) | ✓ |
| document.upload | — | ✓ | ✓ | ✓ | ✓ | ✓ (Gewerk) | — |
| document.download | — | ✓ | ✓ | ✓ | ✓ | (k) | (k) |
| audit.view | ✓ (alle) | ✓ (Org) | ✓ (Proj) | — | — | — | — |

- `SysAdmin` greift auf fachliche Mandantendaten nur über die separate BYPASSRLS-Rolle (Support/Debug, siehe
  [[03-audit-logging]]), nicht im Default-Pfad.

## Abhängigkeiten / Verweise

- [[01-tenant-isolation-rls]] · [[04-auth-onboarding-sessions]] · [[12-agent-mcp-readiness]]
- Rollenbeschreibungen: `docs/business/user-roles.md`

## Akzeptanzkriterien

- Jede Rolle kann genau die Permissions der Matrix ausführen, keine darüber hinaus (serverseitig erzwungen).
- `Gewerk-Benutzer` sieht/erfasst nur Daten zugewiesener Gewerke.
- `photo.download` ist unabhängig von `photo.view` entziehbar.
- Nur `Bauleiter`/`Projektleiter` können den Status „Freigegeben" setzen.
- Direkte API-Aufrufe auf nicht-berechtigte Ressourcen werden mit 403 abgewiesen + auditiert.

## Offene Punkte

- Konkrete (k)-Defaults für Download bei Gewerk/Betrachter je Org final festlegen.

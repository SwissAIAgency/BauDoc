# User Roles

## Systemadministrator

Verwaltet technische Plattformkonfiguration und globale Einstellungen. Diese Rolle ist restriktiv zu vergeben und soll Admin-2FA prüfen.

## Organisationsadministrator

Verwaltet eine Organisation, Benutzer, Rollen und organisationale Projekte.

## Projektleiter

Verantwortet Projektanlage, Projektstruktur, Mitglieder, Pläne, Rechte und Auswertungen.

## Bauleiter

Erfasst und prüft Fotos, Planpositionen, Kommentare und Baufortschritt auf Projekt- oder Baustellenebene.

## Planer

Lädt Pläne hoch, verwaltet Planversionen und prüft planbezogene Informationen.

## Gewerk-Benutzer

Erfasst oder betrachtet Informationen für freigegebene Projekte, Bereiche und Gewerke.

## Betrachter

Kann berechtigte Projekte, Pläne, Fotos und Kommentare ansehen, aber nicht verändern.

## Rollenregeln

- Rollen wirken mindestens projektbezogen.
- Berechtigungen werden serverseitig geprüft.
- Ansicht und Download können getrennte Rechte sein.
- Rollenänderungen sind auditrelevant.
- Benutzer dürfen keine fremden Organisationen oder Projekte sehen.

## Detaillierte Berechtigungs-Matrix

Die verbindliche granulare Permission-Matrix je Rolle (inkl. Freigabe-Recht, Ansicht ≠ Download, Gewerk-Scope und
Agent-Rechteprofile) ist in `docs/specs/02-rbac-permissions.md` dokumentiert (Entscheidungen D-041, D-042, D-040).

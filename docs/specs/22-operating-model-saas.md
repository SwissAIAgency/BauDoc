# Spec 22 — Betriebsmodell & SaaS

**Status:** APPROVED · **Bau:** Architektur MVP, Billing später · **Bezug:** D-037
**Source of Truth für:** Betriebsmodell, Plan-Limits, Billing

## Zweck

Das System für kommerziellen Mehrkunden-Betrieb auslegen, ohne den MVP mit Abrechnung zu belasten.

## Festlegungen

- Auslegung als **Mehrkunden-SaaS** (Mandantenfähigkeit besteht bereits, [[01-tenant-isolation-rls]]).
- **Plan-Limits/Kontingente:** **Speicher**-Accounting + Org-Quota werden bereits im MVP gebaut ([[32-storage-accounting-quotas]], D-086); das Abo mappt später nur Plan→Quota-Wert. Übrige Kontingente (z.B. Projektanzahl) konzeptionell vormerken, Durchsetzung später.
- **Billing-Integration als spätere Phase** (kein Billing im MVP).
- Org-Self-Service (Anlage/Verwaltung) baut auf Onboarding/RBAC auf ([[04-auth-onboarding-sessions]], [[02-rbac-permissions]]).

## Datenmodell (Delta)

- Vorgesehen (später): Plan-/Abo-Zuordnung je Organisation, Kontingent-Zähler (Speicher/Projekte).

## Abhängigkeiten / Verweise

- [[01-tenant-isolation-rls]] · [[02-rbac-permissions]] · [[04-auth-onboarding-sessions]] · [[15-observability-backup-dr]] (Nutzungsmetriken)

## Akzeptanzkriterien

- Architektur erlaubt das spätere Einziehen von Plan-Limits ohne Strukturbruch.
- Kein Billing-Code im MVP; Kontingent-Felder sind vorgesehen, aber optional.

## Offene Punkte

- Konkrete Plan-/Preismodelle; Billing-Provider.

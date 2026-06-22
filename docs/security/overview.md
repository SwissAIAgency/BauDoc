# Sicherheits- & Datenschutzübersicht

**Zuletzt aktualisiert:** 2026-06-22  
**Verantwortlich:** Security Agent, Datenschutz/DSG Agent  
**Status:** APPROVED  
**Bezug:** `SECURITY_PRIVACY.md` (Root), `security/threat-model.md`, `security/risk-register.md`, `docs/legal/`

> **Kanonischer Ort dieser Datei:** `docs/security/overview.md`  
> Die vollständige Security & Privacy Foundation ist in `SECURITY_PRIVACY.md` im Root.  
> Threat Model: `security/threat-model.md` | Risk Register: `security/risk-register.md`

---

## Zweck

Diese Datei ist der Einstiegspunkt für alle sicherheits- und datenschutzrelevanten Dokumente in BauDoc. Verbindliche Regeln stehen in `AGENTS.md` (Sicherheitsregeln + Datenschutzregeln).

## Sicherheitsgrenzen (Kurzreferenz)

| Grenze | Regel |
|---|---|
| Browser/PWA | Nicht vertrauenswürdig — alle Rechte im Backend prüfen |
| Laravel API | Zentrale Autorisierungsgrenze — Policies pro Ressource |
| Object Storage | Privat — keine öffentlichen Direktlinks |
| Secrets | Nur via `.env`, nie im Repository |
| Queue/Jobs | Rechteprüfung nicht umgehbar |

## Datenschutz-Kurzreferenz (Swiss DSG + DSGVO)

| Thema | Regel |
|---|---|
| Datenminimierung | Nur speichern was Zweck hat |
| Baustellenfotos | Als potenziell personenbezogen behandeln |
| Audit-Logs | Datensparsam, mit Retention-Regeln |
| Externe Dienste | Vor Nutzung prüfen (Mail, Storage, KI) |
| KI-Verarbeitung | Erst nach separater Datenschutzprüfung |
| Testdaten | Keine produktiven personenbezogenen Daten |

## Dokument-Übersicht

| Dokument | Inhalt |
|---|---|
| `SECURITY_PRIVACY.md` | Vollständige Security & Privacy Foundation |
| `security/threat-model.md` | Threat-Analyse (Bedrohungsmodell) |
| `security/risk-register.md` | Identifizierte Risiken und Massnahmen |
| `docs/legal/privacy-review.md` | Datenschutz-Review vor Implementierung |
| `docs/legal/data-classification.md` | Daten-Kategorien und Schutzlevel |
| `docs/legal/deletion-retention.md` | Lösch- und Aufbewahrungsregeln |

## Sicherheits-Meilensteine

| Task | Phase |
|---|---|
| BD-003: Auth & Rollen | Foundation |
| BD-011: Security Review & Hardening | Pre-MVP |
| BD-012: Privacy Review & Retention | Pre-MVP |

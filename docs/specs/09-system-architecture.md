# Spec 09 — Systemarchitektur

**Status:** APPROVED · **Bau:** MVP · **Bezug:** D-003, D-016
**Source of Truth für:** Architektur-Stil, Modulschnitt

## Zweck

Wartbare, testbare Backend-Struktur mit klaren Grenzen und einfachem Deployment.

## Festlegungen

- **Modularer Monolith** (ein Laravel-Deployment), intern in fachliche Module geschnitten:
  Auth/RBAC, Organisationen, Projekte & Struktur, Pläne, Medien, Planpositionen, Audit, Benachrichtigungen, KI.
- Pro Modul **Clean-Architecture-Schichtung** (Domain / Application / Infrastructure).
- Schwere/asynchrone Lasten (KI, Transkodierung, Benachrichtigung, Scan, Export/Import) laufen über die **Redis-Queue**
  → natürliche Schnittstelle, um Module später herauszulösen.
- **Keine Microservices im MVP.**
- API-first ([[19-api-design]]); Frontend als PWA ([[20-mobile-pwa]]), Framework offen (D-005).

## Abhängigkeiten / Verweise

- [[10-data-model]] · [[19-api-design]] · [[11-ai-integration]] · [[15-observability-backup-dr]]

## Akzeptanzkriterien

- Module sind klar abgegrenzt; modulübergreifende Aufrufe laufen über definierte Application-Schnittstellen.
- Asynchrone Aufgaben sind über die Queue entkoppelt (kein Blockieren von Requests).
- Domain-Logik ist ohne Framework-Abhängigkeiten testbar.

## Offene Punkte

- Frontend-Framework (Vue 3 / React / Inertia) — D-005.

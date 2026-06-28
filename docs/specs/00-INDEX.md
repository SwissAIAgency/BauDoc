# Spec-Index — Komponenten-Spezifikationen

**Status:** APPROVED · **Stand:** 2026-06-23
**Zweck:** Jede Komponente/Feature hat eine eigenständige Spec-Datei (Source of Truth). Querschnittsthemen werden
**nicht** kopiert, sondern verlinkt. Entscheidungs-Kurzform: `docs/06_entscheidungen.md` (D-008…D-100).
Dieses Verzeichnis ersetzt das frühere Sammeldokument `docs/16_technische_spezifikation.md`.

## Konventionen je Spec-Datei

- Kopf: Status, Bau-Stufe (MVP / V2 / post-MVP), Bezug zu Entscheidungen (D-0xx), „Source of Truth für".
- Abschnitte: Zweck · Festlegungen · Datenmodell-Delta (falls relevant) · Abhängigkeiten · Akzeptanzkriterien · Offene Punkte.
- Querverweise als `[[dateiname]]`.

## Übersicht

| # | Spec | Bau | Source of Truth für |
|---|---|---|---|
| 01 | [[01-tenant-isolation-rls]] | MVP | Mandantentrennung, RLS |
| 02 | [[02-rbac-permissions]] | MVP | Permissions, Matrix (was darf wer) |
| 23 | [[23-role-architecture]] | MVP | Rollenarchitektur: Scopes, Vererbung, Delegation, Gewerk-Scope, Gäste (wie Rollen funktionieren) |
| 03 | [[03-audit-logging]] | MVP | Audit-Log, Hash-Chain |
| 04 | [[04-auth-onboarding-sessions]] | MVP | Auth, 2FA, Onboarding, Sessions, Rate-Limiting |
| 05 | [[05-media-pipeline]] | MVP | Upload, EXIF, Thumbnails, Video, Storage/Signed-URLs, Malware-Scan, Limits |
| 06 | [[06-plan-management-viewer]] | MVP | Pläne, Planversionen, Viewer, Kalibrierung |
| 07 | [[07-auto-plan-assignment]] | V2 | Automatische Plan-Zuordnung |
| 08 | [[08-documents]] | MVP | Dokumentenverwaltung |
| 09 | [[09-system-architecture]] | MVP | Architektur-Stil, Module |
| 10 | [[10-data-model]] | MVP | Datenmodell-Strategie, Konsolidierung |
| 11 | [[11-ai-integration]] | post-MVP | KI-Integration (self-hosted) |
| 12 | [[12-agent-mcp-readiness]] | post-MVP | AI-Agenten, MCP |
| 13 | [[13-notifications]] | MVP+ | Benachrichtigungen |
| 14 | [[14-i18n]] | MVP | Mehrsprachigkeit |
| 15 | [[15-observability-backup-dr]] | MVP | Observability, Backup/DR |
| 16 | [[16-export-reporting]] | post-MVP | Export, PDF-Bericht |
| 17 | [[17-data-import-migration]] | post-MVP | Bulk-Import, Mapping |
| 18 | [[18-capture-features]] | post-MVP | QR, Mängel-Light, Audio |
| 19 | [[19-api-design]] | MVP | REST/OpenAPI, Versionierung, Fehlerformat |
| 20 | [[20-mobile-pwa]] | MVP | PWA, Offline, Sensoren |
| 21 | [[21-hosting-compliance-legal]] | MVP | Hosting, DSG, Datenlebenszyklus, Recht |
| 22 | [[22-operating-model-saas]] | MVP+ | Betriebsmodell, SaaS, Billing |
| 24 | [[24-project-structure-master-data]] | MVP | Projektstruktur, Gewerke, Lifecycle/Archiv |
| 25 | [[25-status-approval-workflow]] | MVP | Prüf-/Freigabe-Status, Übergänge, Sperre/Re-Open |
| 26 | [[26-comments-collaboration]] | MVP | Kommentare, @-Erwähnungen |
| 27 | [[27-gallery-filter-search]] | MVP | Galerie, Filter, Volltext + semantische Suche |
| 28 | [[28-dashboard-metrics]] | MVP | Dashboard, KPIs (Org + Projekt) |
| 30 | [[30-photo-metadata-fields]] | MVP | Foto-Felder-Katalog (Quelle je Feld), Wetter, Screen-Inventar |
| 31 | [[31-plan-position-verification]] | MVP | Planpositions-Koordinatenmodell (0..1) & Verifikations-/Genauigkeitsstrategie |
| 32 | [[32-storage-accounting-quotas]] | MVP | Speicher-Verbrauch, Org-Quota, Limit-Durchsetzung (entkoppelt von Billing) |
| 33 | [[33-hosting-infrastructure]] | MVP | Infrastruktur-Topologie & Anforderungen (Plattform, Managed-Grad, Deployment, GPU) |
| 34 | [[34-storage-data-model]] | MVP | Physisches Datei-Modell (stored_objects/derivatives), Storage-Pfade, Versionierung, Quota-Trigger, RLS |

## Umsetzungs-Reihenfolge (Module → Specs)

1. Fundament + modulare Laravel-Struktur ([[09-system-architecture]], [[10-data-model]]).
2. Auth/RBAC + Rollenarchitektur ([[04-auth-onboarding-sessions]], [[02-rbac-permissions]], [[23-role-architecture]]).
3. Migrationen + RLS + Projektstruktur/Stammdaten ([[01-tenant-isolation-rls]], [[10-data-model]], [[24-project-structure-master-data]]).
4. Audit-Dienst ([[03-audit-logging]]).
5. Upload-Pipeline + Storage + Embedding-Job; pgvector aktiv ([[05-media-pipeline]], [[10-data-model]]).
6. Pläne + Viewer + Kalibrierung ([[06-plan-management-viewer]]).
7. Status-/Freigabe-Workflow + Kommentare ([[25-status-approval-workflow]], [[26-comments-collaboration]]).
8. Galerie/Filter + Volltext- & semantische Suche; KI-Such-Infra self-hosted/GPU ([[27-gallery-filter-search]], [[11-ai-integration]]).
9. Dokumente ([[08-documents]]).
10. Mobile PWA ([[20-mobile-pwa]]).
11. Benachrichtigungen + Dashboard ([[13-notifications]], [[28-dashboard-metrics]]).
12. DSG-Härtung ([[21-hosting-compliance-legal]]).
13. V2: Auto-Zuordnung ([[07-auto-plan-assignment]]).
14. V2+: übrige KI (Bildbeschreibung, Transkription) + Agenten/MCP ([[11-ai-integration]], [[12-agent-mcp-readiness]]).

Begleitend: [[19-api-design]], [[14-i18n]], [[15-observability-backup-dr]] ab Projektstart.

## Offene Threads (noch zu schließen)

- **Rollenarchitektur-Write-back (entschieden D-054…D-058, noch nicht in Specs eingearbeitet):** Custom-Rollen +
  Tenant-Apex-Split in [[02-rbac-permissions]], [[23-role-architecture]] und `docs/business/user-roles.md` einarbeiten;
  „Org-Admin" → **Organisationsinhaber** + **Organisationsadministrator** umbenennen.
- **Plattform-Seite (Grilling unterbrochen):** Rollen für Software-Inhaber + Support — Break-Glass statt stehendem
  Zugriff, Trennung „Plattform steuern" vs. „Kundendaten sehen". Reformt D-011 → künftige **Spec 29
  (Plattform-Betrieb & Support-Rollen)**.
- **Kandidat: Spec „Einstellungen/Konfiguration"** — bündelt org-/projekt-spezifische Settings (Pflicht-Ebenen D-059,
  Status-Maschine D-063, Vier-Augen D-065, Benachrichtigungs-Präferenzen D-032) an einem Ort.

# BauDoc

BauDoc ist das Projektfundament für eine Web- und Mobile/PWA-Anwendung zur planbasierten Baufortschrittsdokumentation.

## Status

Phase: Phase 2 Planung abgeschlossen.

Dieses Repository enthält bewusst noch keinen Produktivcode und keine installierten Dependencies. Phase 2 finalisiert Analyse, Architektur, Datenmodell, Security Review, Datenschutz Review, Entwicklungsplan und Technologie-Stack als Grundlage für die spätere Umsetzung.

## Kurzbeschreibung

BauDoc dokumentiert Baufortschritt mit Fotos, Plänen, Planversionen, Planpositionen, Räumen, Gewerken, Kommentaren, Rollen, Berechtigungen und Audit-Logs. Der MVP bleibt auf Foto, Plan, Ort, Zeit, Gewerk, Rechte, Chronologie und Audit begrenzt.

## Hauptquellen

- `docs/references/leistungskatalog_baufortschritt_dokumentation.html`
- `docs/references/unternehmensstandard-codex-agenten.txt`

## Dokumentations-Navigation

Alle Dokumente sind in `docs/_INDEX.md` verzeichnet. Wichtigste Einstiegspunkte:

### Binding Rules & Entscheidungen
- `AGENTS.md` — verbindliche Arbeitsregeln (global), inkl. AGENTS.md-Hierarchie
- `RESTRUKTURIERUNG.md` — Projektstruktur-Leitfaden, Konventionen, Checklisten
- `DECISIONS/` — Architecture Decision Records (ADR-0001 bis ADR-0004)

### Projekt & Anforderungen
- `docs/project/definition.md` — Projektdefinition, Scope, Erfolgskriterien
- `docs/project/leistungskatalog.md` — Module, Funktionen, Akzeptanzkriterien
- `docs/technical/development-plan.md` — BD-001 bis BD-015, priorisierter Entwicklungsplan

### Architektur & Code
- `docs/architecture/overview.md` — Systemarchitektur (Laravel + Vue + PostgreSQL)
- `docs/development/code-conventions.md` — Naming, Struktur, Kommentar-Standards
- `docs/technical/api-contracts.md` — API Request/Response-Formate
- `docs/technical/database-model.md` — Entity-Beziehungen

### Design & UI
- `PROTOTYP.md` — Single Source of Truth für den HTML-Prototyp (6 Screens, 4 Modals)
- `docs/design/system.md` — Produktive UI-Standards, Farben, Typografie
- `frontend/prototypes/DESIGN.md` — Operative Design-Tokens (CSS-Variablen)
- `frontend/prototypes/COMPONENTS.md` — Komponenten-Manifest mit Status

### Sicherheit & Datenschutz
- `docs/security/overview.md` → `SECURITY_PRIVACY.md`, Threat Model, Risk Register
- `docs/legal/privacy-review.md` — Datenschutz-Review (Swiss DSG + DSGVO)

### Tests
- `docs/testing/strategy.md` — Teststrategie, Testarten, Merge-/Release-Checkliste

## Zielarchitektur

- Backend: Laravel API.
- Auth: Laravel Sanctum.
- Frontend: Vue 3 + Vite + TypeScript als eigenständige PWA.
- Datenbank: PostgreSQL, später optional pgvector.
- Queue/Cache: Redis + Laravel Queues.
- Dateien: S3-kompatibler Object Storage oder MinIO lokal.
- KI: späterer separater Processing Layer, nicht Teil des MVP.

## Repository-Struktur

```text
BauDoc/
│
├── ── Root (Navigation & Binding)
│   ├── README.md              ← dieser Einstiegspunkt
│   ├── AGENTS.md              ← globale Arbeitsregeln (verbindlich)
│   ├── RESTRUKTURIERUNG.md    ← Leitfaden, Konventionen, Checklisten
│   ├── PROTOTYP.md            ← HTML-Prototyp Single Source of Truth
│   ├── CHANGELOG.md
│   ├── CONTRIBUTING.md
│   └── .env.example
│
├── ── DECISIONS/              ← Architecture Decision Records
│   ├── 0001-project-baseline.md
│   ├── 0002-architecture-baseline.md
│   ├── 0003-database-model.md
│   └── 0004-technology-stack.md
│
├── ── docs/                   ← Alle Specs, Pläne, Policies (→ _INDEX.md)
│   ├── _INDEX.md              ← Navigationsdatei
│   ├── project/               ← Projektdefinition, Leistungskatalog
│   ├── architecture/          ← Systemarchitektur (kanonisch)
│   ├── development/           ← Entwicklungsplan, Code-Konventionen
│   ├── design/                ← UI-Standards, Prototype-Spec
│   ├── testing/               ← Teststrategie (kanonisch)
│   ├── security/              ← Sicherheits-Übersicht
│   ├── legal/                 ← Datenschutz, DSG, Retention
│   ├── business/              ← Rollen, User Flows
│   ├── technical/             ← API-Verträge, Datenbankmodell, Entwicklungsplan
│   ├── ux/                    ← Accessibility, Design-System, Konzepte
│   └── references/            ← Fachliche Quellen (HTML-Referenz)
│
├── ── frontend/
│   ├── AGENTS.md              ← Frontend-spezifische Regeln
│   └── prototypes/            ← HTML-Prototyp (file://-kompatibel)
│       ├── index.html         ← Haupt-Prototyp (LIVE)
│       ├── app-shell.css      ← CSS-Token-Quelle
│       ├── DESIGN.md          ← Operative Design-Spec
│       ├── COMPONENTS.md      ← Komponenten-Manifest
│       └── components/        ← Extrahierte Web Components (POC)
│
├── ── design-explorations/    ← EXPERIMENT-Varianten (kein Produktionseinfluss)
│
├── ── backend/                ← Laravel API (ab BD-001)
├── ── database/               ← Migrations, Seeds (ab BD-002)
├── ── security/               ← Threat Model, Risk Register
├── ── integrations/           ← (geplant)
├── ── devops/                 ← (geplant)
└── ── tests/                  ← (ab BD-013)
```

## Lokales Setup

Noch keine Anwendung startbar. In Phase 2 werden keine Dependencies installiert und kein Produktivcode erzeugt.

Für spätere Umsetzung vorgesehen:

- PHP und Composer für Laravel.
- Node.js und npm für Vue/Vite.
- PostgreSQL.
- Redis.
- MinIO oder S3-kompatibler Object Storage.
- Docker Compose für lokale Dienste.

Konkrete Versionen werden bei der technischen Foundation gepinnt und dokumentiert.

## Umgebungsvariablen

Beispielwerte liegen in `.env.example`.

Regeln:

- Keine echten Secrets committen.
- Lokale `.env`-Dateien bleiben ignoriert.
- Zugangsdaten für Datenbank, Redis, Storage und Mail lokal setzen.

## Entwicklungsregeln

- Vor Codeänderungen `AGENTS.md` und relevante Bereichs-`AGENTS.md` lesen.
- Produktivcode erst ab Umsetzung des Entwicklungsplans.
- Kleine, testbare Tasks.
- Keine neuen Dependencies ohne Begründung.
- Keine personenbezogenen Produktivdaten.
- Security und Datenschutz bei betroffenen Änderungen prüfen.

## Testbefehle

Phase 2 enthält nur Dokumentation und Struktur. Es gibt noch keine ausführbaren Build-, Lint- oder Testbefehle. Verfügbare Checks sind Struktur-, Inhalts- und Git-Checks.

## Deployment-Hinweise

Deployment ist noch nicht umgesetzt. Bekannte Anforderungen:

- Hosting in Schweiz oder EU prüfen.
- HTTPS erzwingen.
- Private Dateiablage verwenden.
- Queue Worker betreiben.
- Backups für Datenbank und Object Storage planen.
- Secrets über sichere Umgebungskonfiguration verwalten.

## Sicherheits- und Datenschutzhinweise

- Keine öffentlichen Direktlinks für Fotos, Pläne, Panoramen oder Audiodateien.
- Berechtigungen serverseitig prüfen.
- Audit-Logs datensparsam führen.
- Baustellenfotos und Kommentare als potenziell personenbezogen behandeln.
- KI-Verarbeitung erst nach separater Datenschutzprüfung.

## Codex-Arbeitsweise

Codex folgt dem Unternehmensstandard:

1. Dokumentieren.
2. Analysieren.
3. Architektur planen.
4. Risiken prüfen.
5. Entwicklungsplan erstellen.
6. Kleine Tasks umsetzen.
7. Tests und Reviews durchführen.

## GitHub Repository

https://github.com/SwissAIAgency/BauDoc.git

## Lizenz

Noch nicht festgelegt. Vor öffentlicher oder externer Nutzung muss entschieden werden, ob und unter welcher Lizenz BauDoc veröffentlicht wird.

## Nächster empfohlener Schritt

Phase 3 starten: technische Foundation gemäß `docs/technical/development-plan.md` mit BD-001 umsetzen.

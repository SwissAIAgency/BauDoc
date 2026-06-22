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

## Wichtige Dokumente

- `AGENTS.md`: verbindliche Arbeitsregeln.
- `PROJECT_DEFINITION.md`: Projektdefinition.
- `LEISTUNGSKATALOG.md`: Module, Funktionen und Akzeptanzkriterien.
- `ARCHITECTURE.md`: Zielarchitektur und technische Entscheidungen.
- `SECURITY_PRIVACY.md`: Sicherheits- und Datenschutzgrundlage.
- `UI_STANDARDS.md`: UI-, Brand- und Accessibility-Regeln.
- `TESTING.md`: Teststrategie.
- `PROTOTYP.md`: Single Source of Truth für den HTML-Prototyp
  in `frontend/prototypes/`. Definiert alle Screens und führt
  einen Änderungs-Log (Abschnitt 10). Jede HTML-Änderung wird
  dort nachgetragen.
- `docs/technical/project-analysis.md`: Projektanalyse vor Implementierung.
- `docs/technical/development-plan.md`: priorisierter Entwicklungsplan.
- `security/threat-model.md`: Threat Model.
- `security/risk-register.md`: Security Risk Register.
- `docs/legal/privacy-review.md`: Datenschutz Review vor Implementierung.
- `DECISIONS/0004-technology-stack.md`: finalisierte Stackentscheidung.

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
├── AGENTS.md
├── README.md
├── PROJECT_DEFINITION.md
├── LEISTUNGSKATALOG.md
├── ARCHITECTURE.md
├── SECURITY_PRIVACY.md
├── UI_STANDARDS.md
├── TESTING.md
├── CHANGELOG.md
├── .env.example
├── DECISIONS/
├── docs/
│   ├── business/
│   ├── technical/
│   ├── legal/
│   ├── ux/
│   └── references/
├── frontend/
├── backend/
├── database/
├── integrations/
├── security/
├── devops/
├── tests/
├── scripts/
├── skills/
└── prompts/
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

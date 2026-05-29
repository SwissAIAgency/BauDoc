# BauDoc

BauDoc ist das Projektfundament für eine Web- und Mobile/PWA-Anwendung zur planbasierten Baufortschrittsdokumentation.

## Status

Phase: Phase 1 Projektsetup abgeschlossen.

Dieses Repository enthält bewusst noch keinen Produktivcode und keine installierten Dependencies. Es legt zuerst Struktur, Dokumentation, Agentenrollen, Sicherheitsregeln, Datenschutzregeln, UI-Standards und Teststrategie fest.

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
- `DECISIONS/0001-project-baseline.md`: Baseline-Entscheidung.

## Zielarchitektur

- Backend: Laravel API.
- Frontend: Web-App / Mobile PWA, Stackentscheidung zwischen Vue 3, React oder Inertia bleibt für Phase 2 offen.
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

Noch keine Anwendung startbar. In Phase 1 werden keine Dependencies installiert und kein Produktivcode erzeugt.

Für spätere Umsetzung voraussichtlich nötig:

- PHP und Composer für Laravel.
- Node.js und Paketmanager für das Frontend.
- PostgreSQL.
- Redis.
- S3-kompatibler Object Storage oder MinIO.
- Git und GitHub-Zugang.

Konkrete Versionen werden nach Technologieentscheidung dokumentiert.

## Umgebungsvariablen

Beispielwerte liegen in `.env.example`.

Regeln:

- Keine echten Secrets committen.
- Lokale `.env`-Dateien bleiben ignoriert.
- Zugangsdaten für Datenbank, Redis, Storage und Mail lokal setzen.

## Entwicklungsregeln

- Vor Codeänderungen `AGENTS.md` und relevante Bereichs-`AGENTS.md` lesen.
- Produktivcode erst nach Abschluss der Planungs- und Architekturphase.
- Kleine, testbare Tasks.
- Keine neuen Dependencies ohne Begründung.
- Keine personenbezogenen Produktivdaten.
- Security und Datenschutz bei betroffenen Änderungen prüfen.

## Testbefehle

Phase 1 enthält nur Dokumentation und Struktur. Es gibt noch keine ausführbaren Build-, Lint- oder Testbefehle. Verfügbare Checks sind Struktur-, Inhalts- und Git-Checks.

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

Phase 2 starten: Inhalte und Planung finalisieren, insbesondere Projektanalyse, Architekturverfeinerung, Datenmodell, Security Review, Datenschutz Review, Entwicklungsplan und finale Technologieentscheidung.

# Contributing

## Arbeitsmodell

Dieses Projekt arbeitet nach dem standardisierten Codex-Agentenmodell.

- Kein Agent arbeitet direkt auf `main`.
- `dev` ist der Integrations- und Production-Branch (Netlify).
- Jeder Task bekommt einen eigenen Branch.
- Jede Änderung braucht Task, zuständigen Agenten, erlaubte Dateien, Akzeptanzkriterien und QA.
- Kein Merge ohne QA-Review.

---

## Branches

| Präfix | Verwendung | Beispiel |
|---|---|---|
| `feature/` | Neue Funktionen | `feature/photo-upload` |
| `fix/` | Fehlerbehebungen | `fix/gallery-filter-reset` |
| `docs/` | Dokumentationsänderungen | `docs/api-contracts` |
| `chore/` | Setup, Wartung, Konfiguration | `chore/update-dependencies` |
| `release/` | Release-Vorbereitung | `release/1.0.0` |

---

## Commit-Stil

Format: `<type>(<scope>): <Beschreibung auf Deutsch>`

| Typ | Verwendung |
|---|---|
| `feat` | Neue Funktion |
| `fix` | Fehlerbehebung |
| `docs` | Dokumentation |
| `refactor` | Refactoring ohne Fachänderung |
| `test` | Tests |
| `chore` | Setup, Wartung, Konfiguration |
| `style` | Formatierung, Linting (kein Facheinfluss) |
| `perf` | Performance-Verbesserung |

Beispiele:
```
feat(photo): Foto-Upload mit Fortschrittsanzeige
fix(gallery): Filterstatus nach Projektwechsel zurücksetzen
docs(api): OpenAPI-Spec um Kommentar-Endpunkte erweitern
```

---

## Vor jedem Pull Request

- [ ] `AGENTS.md` und relevante Bereichs-`AGENTS.md` gelesen
- [ ] Relevante Docs gelesen
- [ ] Nur erlaubte Dateien geändert
- [ ] Keine Secrets hinzugefügt
- [ ] Keine produktiven personenbezogenen Daten
- [ ] Datenschutz/Security geprüft, falls Daten betroffen
- [ ] UI/Brand geprüft, falls UI betroffen (→ `docs/design/system.md`)
- [ ] Tests oder manuelle Checks durchgeführt und dokumentiert
- [ ] CI grün (Lint, Type-Check, Tests, Build)
- [ ] Dokumentation aktualisiert, falls Verhalten oder Setup geändert

---

## Entwicklungs-Workflow

```
1. Branch erstellen von dev
   git checkout dev && git pull
   git checkout -b feature/mein-feature

2. Änderungen umsetzen (klein, testbar, nachvollziehbar)

3. Lokal prüfen
   php artisan test
   npm run type-check && npm run test:unit

4. Commit (Conventional Commits)
   git add <spezifische Dateien>
   git commit -m "feat(scope): Beschreibung"

5. Push und Pull Request auf dev
   git push origin feature/mein-feature

6. CI-Checks abwarten und Review einholen

7. Nach Approval: Squash-Merge auf dev
```

---

## Release-Prozess

### Voraussetzungen

Vor dem Start eines Releases müssen erfüllt sein:
- Alle geplanten Features für diesen Release auf `dev` gemergt
- CI auf `dev` grün
- Staging-Deploy erfolgreich
- Release-Checkliste (`docs/15_release_checkliste.md`) vorbereitet

### Versionierung

VisiDoc verwendet [Semantic Versioning](https://semver.org/):

| Version | Bedeutung |
|---|---|
| `MAJOR` (1.0.0) | Breaking Changes in API oder Datenmodell |
| `MINOR` (0.1.0) | Neue Features, rückwärtskompatibel |
| `PATCH` (0.0.1) | Bugfixes, rückwärtskompatibel |

MVP-Release: `1.0.0`

### Schritt-für-Schritt Release

```bash
# 1. Release-Branch von dev erstellen
git checkout dev && git pull origin dev
git checkout -b release/1.0.0

# 2. Versionsnummer aktualisieren
# - composer.json (backend)
# - package.json (frontend)
# - CHANGELOG.md (Eintrag hinzufügen)

# 3. Release-Checkliste abarbeiten
# → docs/15_release_checkliste.md

# 4. PR: release/1.0.0 → main
# Titel: "Release 1.0.0"
# Body: Alle relevanten Changes aus CHANGELOG.md

# 5. Nach Merge: Tag setzen
git checkout main && git pull origin main
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0

# 6. Rückmerge auf dev (wichtig: main bleibt nicht divergiert)
git checkout dev
git merge main --no-ff -m "chore: Rückmerge Release 1.0.0 → dev"
git push origin dev
```

### Release-Checkliste (Kurzform)

Vollständige Checkliste: `docs/15_release_checkliste.md`

- [ ] CHANGELOG.md aktualisiert
- [ ] Versionsnummern in composer.json und package.json gesetzt
- [ ] Alle Unit- und Feature-Tests grün
- [ ] E2E-Kern-Flows auf Staging geprüft (Login, Upload, Galerie, Plan)
- [ ] Security Review durchgeführt
- [ ] Datenschutz Review durchgeführt
- [ ] Backup-Konzept für Datenbank und Storage geprüft
- [ ] `.env.example` aktuell
- [ ] Deployment-Dokumentation aktuell
- [ ] Release-Notes für Stakeholder vorbereitet

### Hotfix-Prozess

Für kritische Fixes auf einer Produktionsversion:

```bash
# 1. Hotfix-Branch von main erstellen (nicht von dev)
git checkout main && git pull
git checkout -b fix/kritischer-fehler

# 2. Fix umsetzen und testen

# 3. PR auf main (Review erforderlich)

# 4. Nach Merge: PATCH-Version taggen
git tag -a v1.0.1 -m "Hotfix 1.0.1: Kurzbeschreibung"
git push origin v1.0.1

# 5. Rückmerge auf dev
git checkout dev
git merge main --no-ff -m "fix: Hotfix 1.0.1 → dev rückmergen"
git push origin dev
```

---

## CHANGELOG.md Format

```markdown
## [1.0.0] — 2026-MM-DD

### Neu
- Foto-Upload mit Fortschrittsanzeige
- Galerie-Filter nach Plan, Gewerk und Datum

### Behoben
- Filterstatus nach Projektwechsel nicht zurückgesetzt

### Geändert
- API-Fehlerformat vereinheitlicht

### Sicherheit
- Session-Timeout auf 8 Stunden begrenzt
```

---

## Fragen und Eskalation

- Architektur-Fragen → Lead Software Architect Agent + `DECISIONS/`
- Sicherheits-/Datenschutz-Fragen → Security Agent + `SECURITY_PRIVACY.md`
- UI-Fragen → Frontend/UI Agent + `docs/design/system.md`
- Unklare Anforderungen → Product & Requirements Agent + `docs/project/definition.md`

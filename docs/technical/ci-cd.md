---
**Zuletzt aktualisiert:** 2026-06-22
**Verantwortlich:** DevOps & Deployment Agent / Lead Software Architect Agent
**Status:** APPROVED
**Bezug:** docs/technical/deployment.md, docs/testing/strategy.md, AGENTS.md (Git- und Deploy-Workflow)
---

# CI/CD-Pipeline

## Abhängigkeit

Diese Dokumentation gilt ab BD-014 (CI/CD-Setup). Bis dahin dient sie als Planungsbasis. Der aktuelle Deployment-Workflow (Netlify, manuell via `git push dev`) ist in `AGENTS.md` unter "Git- und Deploy-Workflow" beschrieben.

---

## Übersicht

```
Developer
  │
  ├─ feature/fix/docs Branch
  │    ├── lokale Tests (Unit + Lint)
  │    └── Push + Pull Request → dev
  │
  ├─ dev Branch (Integrations-Branch)
  │    ├── CI: Lint + Tests + Build
  │    ├── Deploy → Staging (Netlify / test.visidoc.app)
  │    └── Manuelle QA-Freigabe → Merge → Release
  │
  └─ main Branch (Production Snapshot)
       ├── Kein direkter Push
       └── Merge-Commit von dev → Deploy → prod.visidoc.app
```

---

## Phasen der Pipeline

### Phase 1 — Lokale Vorprüfung (Entwickler-Pflicht vor Push)

| Check | Befehl | Pflicht |
|---|---|---|
| PHP Lint | `./vendor/bin/pint --test` | Pflicht |
| TypeScript Check | `npm run type-check` | Pflicht |
| Unit Tests (Backend) | `php artisan test --testsuite=Unit` | Pflicht |
| Unit Tests (Frontend) | `npm run test:unit` | Pflicht |
| Keine Secrets | `git diff --staged` prüfen | Pflicht |

### Phase 2 — CI auf Pull Request nach `dev`

Automatisch ausgelöst durch GitHub Actions bei jedem PR auf `dev`:

| Step | Werkzeug | Ziel |
|---|---|---|
| PHP Lint | Laravel Pint | Kein Stil-Verstoß |
| PHP Static Analysis | PHPStan Level 6 | Keine Typ-Fehler |
| Backend Unit Tests | PHPUnit | Alle Tests grün |
| Backend Feature Tests | PHPUnit | API + Businesslogik |
| Frontend Lint | ESLint + Prettier | Kein Stil-Verstoß |
| Frontend Type-Check | `tsc --noEmit` | Kein TS-Fehler |
| Frontend Unit Tests | Vitest | Alle Tests grün |
| Build-Check | `npm run build` | Kein Build-Fehler |
| Security Scan | `composer audit` + `npm audit` | Keine kritischen CVEs |

Merge auf `dev` nur bei grüner CI.

### Phase 3 — Staging-Deploy (automatisch nach Merge auf `dev`)

- Frontend: Netlify auto-deploy → `https://visidoc.netlify.app/`
- Backend (ab BD-001): Staging-Server → `https://api-staging.visidoc.app/`
- Datenbank-Migrations: automatisch via `php artisan migrate --force`
- Smoke-Test: API-Health-Check `GET /api/v1/health`

### Phase 4 — E2E-Tests auf Staging (optional, ab BD-013)

- Playwright oder Cypress gegen Staging-URL
- Nur Kern-Flows: Login, Foto hochladen, Galerie, Plan öffnen
- Trigger: manuell oder nach Staging-Deploy

### Phase 5 — Production Release (manuell ausgelöst)

1. Release-Branch `release/x.y.z` von `dev` erstellen
2. Release-Checkliste (`docs/15_release_checkliste.md`) abarbeiten
3. Merge-Commit auf `main`
4. Git-Tag setzen: `git tag -a v1.0.0 -m "Release 1.0.0"`
5. Deploy → Produktionsserver

---

## GitHub Actions Workflow-Dateien (geplant)

```
.github/
└── workflows/
    ├── ci.yml              ← Läuft bei jedem PR + Push auf dev
    ├── deploy-staging.yml  ← Läuft nach Merge auf dev
    └── deploy-production.yml ← Manuell ausgelöst
```

### ci.yml (Skelett)

```yaml
name: CI

on:
  push:
    branches: [dev]
  pull_request:
    branches: [dev]

jobs:
  backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: visidoc_test
          POSTGRES_USER: visidoc
          POSTGRES_PASSWORD: secret
    steps:
      - uses: actions/checkout@v4
      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
          extensions: pgsql, redis
      - run: composer install --no-interaction
      - run: cp .env.testing .env
      - run: php artisan key:generate
      - run: php artisan migrate --force
      - run: ./vendor/bin/pint --test
      - run: ./vendor/bin/phpstan analyse
      - run: php artisan test

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:unit
      - run: npm run build
```

---

## Umgebungen

| Umgebung | Branch | URL | Trigger |
|---|---|---|---|
| Lokal | feature/* | localhost | Manuell |
| Staging | dev | visidoc.netlify.app / api-staging.visidoc.app | Auto bei Push |
| Production | main | prod.visidoc.app | Manuell |

---

## Secrets Management

- Secrets in GitHub Actions: `Settings → Secrets and variables → Actions`
- Kein Secret in `.yml`-Dateien, `.env`-Dateien oder Code.
- Benötigte Secrets (ab BD-001): `APP_KEY`, `DB_PASSWORD`, `AWS_SECRET_ACCESS_KEY`, `MAIL_PASSWORD`
- Lokale `.env` immer in `.gitignore`.

---

## Deployment-Anforderungen (ab BD-001)

- PHP 8.3+, Composer 2
- Node 20+, npm
- PostgreSQL 16
- Redis 7
- S3-kompatibler Storage (MinIO lokal, AWS S3 / Cloudflare R2 Produktion)

Konkrete Versionen werden bei BD-001 in `.env.example` und `composer.json` / `package.json` gepinnt.

---

## Änderungshistorie

| Datum | Version | Änderung |
|---|---|---|
| 2026-06-22 | 1.0.0 | Initiale Fassung (Long-Term Milestone L-4) |

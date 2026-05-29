# 14 Repository Workflow

## Branch-Modell

```text
main
├── develop
│   ├── feature/backend-auth-api
│   ├── feature/frontend-mobile-capture
│   ├── feature/db-project-structure
│   ├── fix/qa-plan-position-validation
│   └── chore/devops-local-services
```

## Branch-Regeln

- `main` ist geschützt und enthält nur freigegebenen Code.
- `develop` ist Integrationsbranch für geprüfte Features.
- Jeder Task bekommt einen eigenen Branch.
- Kein Agent arbeitet direkt auf `main`.
- Kein Merge ohne QA-Bericht.
- DB-Migrationen brauchen DB-Agent + QA + Datenschutzprüfung, falls personenbezogene Daten betroffen sind.
- UI-Änderungen brauchen Abgleich mit Brand- und UI-Standards.

## Pull-Request-Regeln

- Jeder PR benennt Task, Agent, geänderte Dateien, Tests, Datenschutz/Security, UI/Brand und Risiken.
- Der Orchestrator entscheidet, ob Review-Agenten prüfen, ob Reparatur nötig ist oder ob gemerged werden darf.
- Reparaturtasks dürfen nur die beanstandeten Punkte beheben.

## Lokaler Start

Dieses Repository wurde als Projektfundament angelegt. Produktivcode, Dependencies und konkrete App-Frameworks folgen erst nach Architektur- und Stackfreigabe.

# AGENTS.md

## Projektziel

BauDoc ist eine Web- und Mobile/PWA-Anwendung für planbasierte Baufortschrittsdokumentation. Der MVP dokumentiert Fotos, Pläne, Planversionen, Planpositionen, Kommentare, Rollen, Berechtigungen, Chronologie und Audit-Logs. KI, 360-Viewer, Offline-Synchronisation und produktive Drittintegrationen sind spätere Erweiterungen.

## Verbindliche Quellen

Vor Änderungen müssen passende Dokumente gelesen werden:
- Github: https://github.com/SwissAIAgency/BauDoc.git
- `PROJECT_DEFINITION.md`
- `LEISTUNGSKATALOG.md`
- `ARCHITECTURE.md`
- `SECURITY_PRIVACY.md`
- `UI_STANDARDS.md`, falls UI betroffen ist
- `TESTING.md`
- `docs/references/leistungskatalog_baufortschritt_dokumentation.html`
- relevante Bereichs-`AGENTS.md`

Die fachliche Hauptquelle ist `docs/references/leistungskatalog_baufortschritt_dokumentation.html`.

## Grundregeln für Codex

- Arbeite pragmatisch, klein, nachvollziehbar und testbar.
- Prüfe Annahmen gegen den lokalen Projektzustand.
- Ändere nur Dateien, die für den aktuellen Task nötig sind.
- Bewahre bestehende Projektkonventionen.
- Führe keine neuen Dependencies ohne begründete Architekturentscheidung ein.
- Speichere keine Secrets, Tokens, Passwörter oder privaten Credentials.
- Verwende keine produktiven personenbezogenen Daten als Test- oder Beispieldaten.
- Lasse keine Platzhalter im finalen Produktivcode zurück.
- Wenn Tests nicht ausführbar sind, dokumentiere den Grund.

## Repository-Layout und Worktree-Discipline

- **Genau EIN lokales Repo-Verzeichnis** für dieses Projekt. Keine Schwester-Ordner wie `*`-wt`, `*-worktree`, `*-v2`, `*-alt`. Mehrere parallele Verzeichnisse erzeugen Verwirrung, veraltete Branches und verschwendeten Speicherplatz.
- **Worktrees nur, wenn aktiv parallel gearbeitet wird.** Vor `git worktree add` immer erst `git worktree list` prüfen. Existieren bereits Worktrees, sind sie vorher wegzuräumen (siehe nächster Punkt) — niemals stillschweigend einen weiteren hinzufügen.
- **Nach Abschluss jeder Session: Worktree SOFORT entfernen.** Reihenfolge:
  1. `git diff > <backup>/<name>.patch` (WIP extern sichern, bevor `--force` Daten löscht)
  2. `git worktree remove --force <pfad>`
  3. `git worktree prune --verbose`
  4. `git branch -D <feature-branch>` für nicht mehr benötigte lokale Branches
- **Niemals `git worktree remove --force` ohne Backup.** `--force` löscht ungestagte Edits ohne Nachfrage. Fremde Edits (Joshua oder andere Sessions) niemals still entsorgen — bei Unsicherheit vorher mit dem Nutzer klären.
- **Konsequenz:** Drei verwaiste Worktrees (`*-filter-row-wt`, `*-topbar-wt`, `*-main-wt`) wurden 2026-06-19 aufgeräumt. Vor jeder neuen Arbeit kurz `git worktree list` ausführen — falls wieder welche entstanden sind, zuerst entfernen.

## Arbeitsablauf bei jeder Aufgabe

1. Relevante Dokumente und Bereichsregeln lesen.
2. Konkreten Task, betroffene Dateien und Risiken benennen.
3. Nur die kleinste sinnvolle Änderung umsetzen.
4. Passende Tests, Checks oder Strukturprüfungen ausführen.
5. Dokumentation aktualisieren, falls Verhalten, Setup oder Schnittstellen betroffen sind.
6. Security-, Datenschutz-, UI- oder QA-Regeln prüfen, wenn der Task diese Bereiche berührt.
7. Geänderte Dateien, Prüfergebnis und offene Risiken zusammenfassen.

## Architekturregeln

- API-first: Backend stellt konsistente API-Verträge bereit, Frontend konsumiert sie.
- Businesslogik gehört in Backend-Services, nicht direkt in UI-Komponenten.
- Autorisierung wird serverseitig pro Organisation, Projekt und Ressource geprüft.
- Planversionen sind unveränderliche Referenzen für historische Planpositionen.
- Dateien liegen privat in Object Storage, nicht öffentlich abrufbar und nicht direkt in der Datenbank.
- Integrationen werden über Adapter gekapselt.
- KI-Funktionen werden nur vorbereitet und nicht im MVP umgesetzt.

## Sicherheitsregeln

- Authentifizierung ist für alle geschützten Bereiche Pflicht.
- Berechtigungen dürfen nicht nur im Frontend erzwungen werden.
- Keine öffentlichen Direktlinks auf Fotos, Pläne, Panoramen oder Audiodateien.
- Eingaben werden serverseitig validiert.
- Fehlerausgaben dürfen keine internen Details verraten.
- Logs dürfen keine sensiblen Daten oder Secrets enthalten.
- File Uploads brauchen Dateityp-, Größen- und Berechtigungsprüfung.
- Secrets kommen ausschließlich aus sicherer Umgebungskonfiguration.

## Datenschutzregeln

- Datenminimierung ist Pflicht.
- Personenbezogene Daten nur speichern, wenn Zweck und Notwendigkeit dokumentiert sind.
- Baustellenfotos, Kommentare, Audit-Logs und Benachrichtigungen gelten als potenziell personenbezogen.
- Lösch-, Archivierungs- und Aufbewahrungsregeln beachten.
- Externe Dienstleister, Hosting und Datenübertragungen müssen vor Nutzung geprüft werden.
- Schweizer DSG ist relevant; DSGVO-Risiken sind bei EU-Bezug zu prüfen.

## UI-Regeln

- `UI_STANDARDS.md` ist verbindlich.
- Die App ist ein Arbeitswerkzeug: ruhig, dicht, klar und wiederholbar.
- Keine eigenmächtigen Designänderungen, wenn ein Stitch- oder Designsystem-Export vorliegt.
- Responsive Darstellung und Barrierefreiheit sind Pflicht.
- Formatregeln:
  - Datum: `tt.mm.yyyy`
  - Zeit: `14:32`
  - Währung: `CHF`
  - Beträge: `1'230.00`

## Testregeln

- Kritische Businesslogik braucht Unit- oder Feature-Tests.
- APIs brauchen Integrationstests.
- Rollen, Rechte und unberechtigte Zugriffe müssen getestet werden.
- Uploads, private Dateien und Planversionen brauchen gezielte Tests.
- UI-Flows brauchen responsive, Accessibility- und Fehlerzustandsprüfungen.
- Keine produktiven personenbezogenen Daten in Tests.

## Dokumentationsregeln

- Architektur-, API-, Datenmodell-, Datenschutz-, UI- und Testdokumente aktuell halten.
- Entscheidungen mit Datum und Begründung in `DECISIONS/` dokumentieren.
- Offene Fragen klar als offen markieren, nicht als Fakt darstellen.
- Änderungen an Setup, ENV, Startbefehlen oder Deployment in `README.md` und `.env.example` abbilden.

## Verbotene Aktionen

- Direkt mit Produktivcode starten, bevor Phase 1 vollständig ist.
- Neue Dependencies ohne Begründung und Freigabe einführen.
- Secrets oder echte Zugangsdaten committen.
- Produktivdaten in Seeds, Tests oder Dokumentation verwenden.
- Rechteprüfung nur im Frontend umsetzen.
- Businesslogik in UI-Komponenten verstecken.
- Sicherheits- oder Datenschutzthemen auf später verschieben, wenn sie den aktuellen Task betreffen.
- Unrelated Refactors oder großflächige Formatierungen durchführen.


## Git- und Deploy-Workflow (verbindlich ab 2026-06-22)

- **Working-Tree-Edits an `frontend/prototypes/index.html` (und allen Frontend-Files) gehen IMMER auf `dev`.** Nie direkt auf `main` pushen.
- **Production-Branch in Netlify ist `dev`** (Site-Konfiguration: `Configuration -> Deploys -> Repository -> Production branch = dev`). Jeder Push auf `dev` triggert dann auto-deploy auf `https://visidoc.netlify.app/`.
- **Standard-Workflow** fuer Aenderungen an `index.html` und `frontend/prototypes/`:
  1. Dateien im Working-Tree editieren
  2. `git add frontend/prototypes/` (oder gezielt einzelne Files, um Muell nicht zu stagen)
  3. `git commit -m "feat|fix|...: <was>"`
  4. `git push origin dev`
  5. Netlify auto-deployt in ~30 Sek, Live-URL ist aktualisiert
- **Muell im Working-Tree** (`index - Kopie.html`, `.tmp-shot.png`, `MODALS.md`, `modals-showcase.html`, `verify-preview-card-spec.py`, `preview-card-spec.css`, `components/`, `qa-shots/`, viele Screenshots, `visidoc-logo.png`, `visidoc-mark.png`, etc.) vor `git add` aufraeumen oder gezielt nur das Benoetigte stagen.
- **Wenn Live-URL nach `dev`-Push nicht aktualisiert wird:** Netlify-Production-Branch pruefen. Falls auf `main` zurueckgefallen: in Netlify-UI auf `dev` umstellen. Workaround bis dahin: Merge-Commit auf `main` (`git checkout main && git merge dev && git push origin main`), weil FF nicht immer moeglich ist (main kann durch PR-Merges divergieren).
- **`main` bleibt Production-Snapshot** und wird nur per Merge-Commit von `dev` aktualisiert - kein direkter Push, kein `--force` auf `main`, kein Rebase.
- **Netlify-Auth:** GitHub-**Owner**-Account verbinden, nicht Collaborator. Sonst greift Strict Contributor Verification und blockiert Builds (auch API-Deploys). Bei Free-Plan keine Team-Members moeglich.
- **Repo-Sichtbarkeit:** Public (Stand 2026-06-22), damit Strict Contributor Verification auf private Repos nicht greift. Security-Bewertung in `SECURITY_PRIVACY.md` mitfuehren, falls wieder auf Private gestellt wird.
- **Site-URL:** `https://visidoc.netlify.app/` (war frueher `magical-medovik-36d81e.netlify.app`, am 2026-06-22 umbenannt).
- **Strict Contributor Verification:** blockiert sowohl Git-Pushes als auch manuelle API-Deploys (`netlify deploy --dir=...`). Workaround nur via Drag-and-Drop in Netlify-UI oder Owner-Auth + Repo-Public.

## Rollenpflicht

Jeder Task wird mindestens einer Rolle zugeordnet:

- Lead Software Architect Agent
- Product & Requirements Agent
- Backend Agent
- Frontend/UI Agent
- Database Agent
- Security Agent
- Datenschutz / DSGVO / Schweizer DSG Agent
- API & Integration Agent
- Testing & QA Agent
- DevOps & Deployment Agent
- Code Review Agent
- Documentation Agent

## Abschluss-Checkliste

- Ziel erfüllt.
- Betroffene Dokumente gelesen.
- Änderungen klein und nachvollziehbar.
- Keine Secrets oder produktiven Daten.
- Security und Datenschutz geprüft, falls relevant.
- UI-Standards geprüft, falls relevant.
- Tests oder Checks ausgeführt oder begründet ausgelassen.
- Dokumentation aktualisiert.
- Offene Risiken benannt.

# 03 Roadmap

## Phase 1: Projektfundament

Ziel: Repository, Dokumentation, Agentenmodell und technische Zielarchitektur sauber aufsetzen.

Tasks:

- Standardstruktur fertigstellen.
- AGENTS.md, Docs, Prompts und Skills pflegen.
- Frontend-Stackentscheidung vorbereiten.
- lokale Basisdienste PostgreSQL, Redis und MinIO planen.
- offene Fragen erfassen.

Agenten:

- Orchestrator-Agent
- Architektur-Agent
- DevOps-/Security-Agent

Akzeptanzkriterien:

- Struktur entspricht Unternehmensstandard.
- Hauptquelle liegt als Referenz vor.
- Keine Dependencies installiert.
- Produktivcode wurde noch nicht erstellt.

QA-Kontrolle:

- Strukturprüfung.
- Dokumentationsvollständigkeit.
- Keine Secrets.

Risiken:

- Setup driftet in Produktivimplementierung ab.

## Phase 2: Minimal lauffähiger Prototyp

Ziel: Basis-App lokal startbar machen, ohne volle Fachlogik.

Tasks:

- Laravel-Projektstruktur anlegen.
- Frontend-Struktur anlegen.
- Datenbankverbindung konfigurieren.
- Auth-Basis vorbereiten.
- Health-Check-Endpunkt.
- minimale Login-Oberfläche.

Agenten:

- Backend-Agent
- Frontend-/UI-Agent
- DB-Agent
- DevOps-/Security-Agent

Akzeptanzkriterien:

- Backend startet lokal.
- Frontend startet lokal.
- Datenbankverbindung funktioniert.
- Health-Check ist erreichbar.

QA-Kontrolle:

- Build/Start dokumentiert.
- Keine öffentlichen Datei-URLs.
- keine produktiven Daten.

Risiken:

- Framework-Entscheidung wird nicht dokumentiert.

## Phase 3: Kernfunktionen

Ziel: MVP-Kern Foto, Plan, Position, Rechte, Chronologie und Audit umsetzen.

Tasks:

- Rollen und Rechte.
- Projektverwaltung.
- Gebäude-, Etagen-, Raum- und Zonenstruktur.
- Gewerke und Arbeitstypen.
- Planverwaltung mit Versionen.
- Fotoaufnahme und Upload.
- Planpositionen.
- Textkommentare.
- Chronologische Galerie.
- Filter nach Zeitraum, Ort und Gewerk.
- Audit-Log.
- Benachrichtigung bei neuer Planversion.

Agenten:

- Auth-/Security-Agent
- Projektstruktur-Agent
- Plan-Agent
- Foto-Agent
- Planposition-Agent
- Audit-Agent
- Test-Agent

Akzeptanzkriterien:

- Ein Bild kann korrekt aufgenommen, verortet, geschützt, gefiltert und protokolliert werden.
- Jede Planmarkierung hängt an einer konkreten Planversion.
- Berechtigungen greifen serverseitig.

QA-Kontrolle:

- Feature Tests.
- Rechte-Tests.
- Upload-Tests.
- Audit-Tests.

Risiken:

- Planversionen werden veränderlich behandelt.
- Rechte werden im Frontend statt Backend erzwungen.

## Phase 4: UI/UX

Ziel: PWA- und Desktop-Oberflächen für Baustellen- und Büroarbeit stabilisieren.

Tasks:

- Mobile Aufnahmeoberfläche.
- Planviewer-Bedienung.
- Galerie- und Filteroberfläche.
- Admin-Ansichten.
- Fehler-, Leer- und Ladezustände.
- Accessibility- und Responsiveness-Prüfung.

Agenten:

- Frontend-/UI-Agent
- QA-/Review-Agent

Akzeptanzkriterien:

- Mobile Bedienung ohne horizontalen Scroll.
- Planmarker sind präzise setzbar.
- Text und Controls bleiben auf Baustellen-Smartphones lesbar.

QA-Kontrolle:

- Desktop- und Mobile-Prüfung.
- UI-/Brand-Check.
- Tastatur- und Fokusprüfung.

Risiken:

- Desktop-Planviewer und mobile Aufnahme konkurrieren um dieselbe UI-Struktur.

## Phase 5: Datenschutz/Security-Härtung

Ziel: Zugriff, Löschung, Protokollierung und private Dateien belastbar absichern.

Tasks:

- Lösch- und Archivierungsregeln.
- Audit-Retention.
- zeitlich begrenzte Dateizugriffe.
- Backup-Konzept.
- 2FA für Admins prüfen.
- Datenschutzdokumente aktualisieren.

Agenten:

- Datenschutz- & Compliance-Agent
- DevOps-/Security-Agent
- QA-/Review-Agent

Akzeptanzkriterien:

- Keine öffentlichen Direktlinks.
- Datenarten und Datenflüsse sind dokumentiert.
- Lösch- und Archivierungsregeln sind nachvollziehbar.

QA-Kontrolle:

- Security Review.
- Datenschutz Review.
- Secrets-Prüfung.

Risiken:

- Baustellenbilder enthalten personenbezogene oder vertrauliche Informationen.

## Phase 6: Tests und Stabilisierung

Ziel: MVP-Verhalten in realistischen Bauprojektszenarien absichern.

Tasks:

- Feature-Test-Suite erweitern.
- Upload- und Rechtefälle testen.
- Planversionsfälle testen.
- lange Projekthistorien testen.
- Fehlende Daten und Edge Cases prüfen.

Agenten:

- Test-Agent
- QA-/Review-Agent

Akzeptanzkriterien:

- Kernflows sind getestet.
- kritische Rechte- und Dateioperationen sind abgedeckt.
- offene Risiken sind dokumentiert.

QA-Kontrolle:

- Integrationsprüfung.
- Regression Review.

Risiken:

- Testdaten bilden echte Baustellendichte nicht ab.

## Phase 7: Deployment

Ziel: sichere Betriebsumgebung vorbereiten.

Tasks:

- Hosting Schweiz/EU prüfen.
- Umgebungsvariablen definieren.
- Storage, DB, Redis und Queue Worker konfigurieren.
- Logging und Monitoring planen.
- Backup und Restore testen.

Agenten:

- DevOps-/Security-Agent
- Datenschutz- & Compliance-Agent

Akzeptanzkriterien:

- Deployment-Anforderungen sind dokumentiert.
- keine Secrets im Repository.
- Backup-Strategie ist dokumentiert.

QA-Kontrolle:

- Deploy-Readiness-Review.
- Security-Konfigurationsprüfung.

Risiken:

- externe Dienste werden ohne Datenschutzprüfung angebunden.

## Phase 8: Release

Ziel: MVP releasefähig machen.

Tasks:

- Release-Checkliste abarbeiten.
- CHANGELOG aktualisieren.
- README aktualisieren.
- QA-Berichte sammeln.
- offene Risiken bewerten.

Agenten:

- Orchestrator-Agent
- QA-/Review-Agent
- Datenschutz- & Compliance-Agent
- DevOps-/Security-Agent

Akzeptanzkriterien:

- Kernfunktionen umgesetzt.
- Tests/Checks dokumentiert.
- Datenschutz/Security geprüft.
- Release-Empfehlung vorhanden.

QA-Kontrolle:

- finale Projektfreigabe.

Risiken:

- Code, Dokumentation und Ist-Zustand laufen auseinander.

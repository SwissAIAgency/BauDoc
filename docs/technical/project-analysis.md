# Projektanalyse vor Implementierung

Datum: 29.05.2026

## 1. Gesamtstatus

Phase 1 ist lokal abgeschlossen. Das Repository enthält Dokumentation, Agentenregeln, Bereichs-AGENTS, Sicherheits- und Datenschutzgrundlagen, UI-Standards und Teststrategie. Es gibt bewusst noch keinen Produktivcode und keine installierten Dependencies.

## 2. Vorhandene Dokumente

- Root-Dokumente: `PROJECT_DEFINITION.md`, `LEISTUNGSKATALOG.md`, `ARCHITECTURE.md`, `SECURITY_PRIVACY.md`, `UI_STANDARDS.md`, `TESTING.md`.
- Referenzen: `docs/references/leistungskatalog_baufortschritt_dokumentation.html` und Unternehmensstandard.
- Fachliche Ergänzungen: vorhandene `docs/00_*` bis `docs/15_*`.
- Bereichsregeln: `frontend/AGENTS.md`, `backend/AGENTS.md`, `database/AGENTS.md`, `integrations/AGENTS.md`, `security/AGENTS.md`, `devops/AGENTS.md`.

## 3. Fachlicher Kern

BauDoc löst das Problem unstrukturierter Baustellenfotos. Fotos sollen mit Projekt, Gebäude, Etage, Raum, Gewerk, Zeitpunkt, Plan und optionaler Planposition verknüpft werden.

## 4. MVP-Umfang

Im MVP enthalten:

- Authentifizierung und Rollen.
- Projektstruktur.
- Planverwaltung mit Versionen.
- Fotoaufnahme und Upload.
- Private Dateiablage.
- Planpositionen.
- Kommentare.
- Chronologische Galerie und Filter.
- Audit-Log.
- Benachrichtigung bei neuer Planversion.

Nicht im MVP:

- Native App.
- Offline-Synchronisation.
- 360-Grad-Viewer.
- KI-Bildanalyse.
- Vollständiges Mängelmanagement.
- Produktive Drittintegrationen.

## 5. Nutzerrollen

Systemadministrator, Organisationsadministrator, Projektleiter, Bauleiter, Planer, Gewerk-Benutzer und Betrachter. Rollen wirken mindestens projektbezogen und müssen serverseitig durchgesetzt werden.

## 6. Module

- Auth und Rollen.
- Organisation und Projekte.
- Projektstruktur.
- Pläne und Planversionen.
- Fotos und Datei-Metadaten.
- Planpositionen.
- Kommentare.
- Galerie und Filter.
- Audit.
- Benachrichtigung.

## 7. Datenarten

Personenbezogene Daten entstehen durch Benutzer, Rollen, Projektmitgliedschaften, Audit-Logs, Benachrichtigungen und potenziell durch Foto- und Kommentarinhalte. Pläne und Fotos sind vertraulich.

## 8. Sicherheitsrisiken

- Öffentliche Datei-URLs.
- Autorisierung nur im Frontend.
- Fehlende Projekt-/Mandantentrennung.
- Unsichere Uploads.
- Zu detaillierte Fehlerausgaben.
- Zu umfangreiche Logs.

## 9. Datenschutzrisiken

- Fotos können Personen oder private Bereiche zeigen.
- Audit-Logs können Arbeitsverhalten sichtbar machen.
- Kommentare können personenbezogene Daten enthalten.
- Externe Storage-, Mail- oder KI-Anbieter können Datenübertragung auslösen.

## 10. Technische Risiken

- MVP-Umfang wächst zu stark.
- Planpositionen werden ohne Planversion modelliert.
- Frontend und Backend driften im API-Vertrag auseinander.
- Upload- und Storage-Fehler werden nicht robust behandelt.

## 11. UI-/UX-Risiken

- Mobile Aufnahme wird zu komplex.
- Desktop-Planviewer und mobile Aufnahme konkurrieren um dieselbe UI-Struktur.
- Filterstatus oder Berechtigungsstatus werden nicht verständlich dargestellt.

## 12. Datenbankrisiken

- Fehlende Mandantentrennung.
- Zu wenige Indizes für Galerie und Filter.
- Audit-Retention bleibt ungeklärt.
- Soft Delete und Archivierung werden vermischt.

## 13. Integrationsrisiken

- Drittintegrationen vor stabilem Kern.
- Webhooks ohne Signaturprüfung.
- Externe KI-Verarbeitung ohne Datenschutzprüfung.

## 14. Testanforderungen

Kritisch sind Tests für Auth, Rollen, unberechtigte Zugriffe, Uploads, private Dateien, Planversionen, Planpositionen, Audit und Galerie-Filter.

## 15. Offene Fragen

- Lizenzmodell.
- Hosting Schweiz oder EU.
- Audit-Retention.
- IP-Adresse und User-Agent im Audit.
- Konkreter produktiver Mail- und Storage-Anbieter.

## 16. Blocker vor Implementierung

Keine fachlichen Blocker für die Foundation. Vor produktiver Nutzung bleiben Security Review, Datenschutz Review, Retention, Hosting und Dienstleisterprüfung verpflichtend.

## 17. Empfohlene nächste Schritte

1. Foundation ohne Fachlogik anlegen.
2. Laravel API-Grundstruktur erstellen.
3. Vue PWA-Grundstruktur erstellen.
4. PostgreSQL, Redis und MinIO lokal anbinden.
5. Auth, Rollen und private Dateiablage als erste kritische Module umsetzen.

# Security Risk Register

Datum: 29.05.2026

| ID | Schwere | Risiko | Auswirkung | Maßnahme | Status |
|---|---|---|---|---|---|
| SR-001 | Kritisch | Autorisierung nur im Frontend | Fremdzugriff auf Projekte und Dateien | Backend Policies/Middleware pro Ressource | Offen vor Umsetzung |
| SR-002 | Kritisch | Öffentliche Dateiablage | Datenabfluss von Fotos und Plänen | Private Buckets, kontrollierter Zugriff | Offen vor Umsetzung |
| SR-003 | Hoch | Planpositionen ohne Planversion | Historische Dokumentation wird falsch | DB-Modell und Validierung erzwingen `plan_version_id` | Geplant |
| SR-004 | Hoch | Upload ohne Dateiprüfung | Schad- oder Falschdateien | Typ-, Größen- und Kontextprüfung | Geplant |
| SR-005 | Hoch | Sensible Daten in Logs | Datenschutz- und Geheimnisrisiko | Log-Minimierung, keine Payloads/Secrets | Geplant |
| SR-006 | Mittel | Fehlende Rate Limits | Missbrauch und Brute Force | Rate Limiting für Auth/API prüfen | Offen |
| SR-007 | Mittel | Zu lange Audit-Retention | Datenschutzrisiko | Retention fachlich festlegen | Offen |
| SR-008 | Mittel | Externe Anbieter ungeprüft | Unkontrollierte Datenübertragung | Dienstleister- und Standortprüfung | Offen |
| SR-009 | Niedrig | Unklare Lizenz | Rechtliche Unklarheit bei Veröffentlichung | Lizenzentscheidung vor externer Nutzung | Offen |

## Blocker vor Implementierung

Keine Blocker für die technische Foundation. Auth, Storage und Datenmodell dürfen jedoch nicht ohne die oben genannten Maßnahmen produktiv genutzt werden.

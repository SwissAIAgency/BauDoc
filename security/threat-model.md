# Threat Model

Datum: 29.05.2026

## Schutzwerte

- Benutzerkonten und Rollen.
- Organisationen und Projekte.
- Baupläne und Planversionen.
- Baustellenfotos und Datei-Metadaten.
- Kommentare.
- Audit-Logs.
- Benachrichtigungen.
- Secrets und Umgebungskonfiguration.

## Vertrauensgrenzen

- Browser/PWA ist nicht vertrauenswürdig.
- Backend API ist Autorisierungsgrenze.
- PostgreSQL enthält vertrauliche und personenbezogene Daten.
- Object Storage ist privat und darf nicht direkt öffentlich sein.
- Externe Dienste sind vor Nutzung zu prüfen.

## Kritische Bedrohungen

| Bedrohung | Risiko | Gegenmaßnahme |
|---|---|---|
| Zugriff auf fremde Projekte | Kritisch | Serverseitige Autorisierung pro Organisation, Projekt und Ressource |
| Öffentliche Datei-URLs | Kritisch | Private Buckets, kurzlebige URLs oder kontrollierter Stream |
| Rechteprüfung nur im Frontend | Kritisch | Policies/Middleware im Backend |
| Planposition ohne Planversion | Hoch | DB-Zwang und Validierung auf `plan_version_id` |
| Unsicherer Upload | Hoch | Dateityp, Größe, Storage-Kontext, spätere Malware-Prüfung |
| Sensible Logs | Hoch | Log-Minimierung und Review |
| Webhook-Manipulation später | Mittel | Signaturen, Replay-Schutz, Timeouts |

## Missbrauchsszenarien

- Gewerk-Benutzer ruft fremde Projektfotos direkt per API auf.
- Betrachter versucht Pläne herunterzuladen, obwohl nur Ansicht erlaubt ist.
- Nutzer errät Datei-URL im Object Storage.
- Kommentar enthält personenbezogene oder vertrauliche Informationen.
- Admin-Rechte werden ohne Audit geändert.

## Vor-Implementierungsauflagen

- Auth- und Rollenmodell vor Fachmodulen umsetzen.
- Storage nie öffentlich konfigurieren.
- Audit-Events für kritische Aktionen einplanen.
- Fehlerantworten ohne interne Details.
- Keine KI- oder Drittintegration vor separater Prüfung.

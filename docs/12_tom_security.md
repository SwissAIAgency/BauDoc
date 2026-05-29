# 12 TOM Security

## Zugriffskontrolle

- Authentifizierung für alle geschützten Bereiche.
- Serverseitige Autorisierung für Organisation, Projekt, Gewerk, Plan, Bild und Downloadrecht.
- Admin-2FA prüfen.
- Token- und Session-Laufzeiten begrenzen.

## Dateisicherheit

- Private Buckets.
- Keine öffentlichen Direktlinks.
- Zeitlich begrenzte URLs oder kontrolliertes Streaming.
- Datei-Metadaten mit Besitzer, Projektbezug und Zugriffskontext.
- Malware-/Dateitypprüfung in späterer Umsetzung prüfen.

## Datenbank

- PostgreSQL mit getrennten Rollen für App und Administration.
- Migrationen versionieren.
- Backups verschlüsseln und Restore testen.
- Zugriff auf Produktivdaten begrenzen.

## Logging und Audit

- Kritische Aktionen protokollieren.
- Audit-Logs gegen Manipulation schützen.
- Logdaten minimieren.
- Retention-Regeln definieren.

## Transport und Hosting

- HTTPS erzwingen.
- Hosting in Schweiz oder EU prüfen.
- Secrets über sichere Umgebungskonfiguration, nicht Repository.
- Zugriff auf Server und Storage rollenbasiert.

## KI später

- KI-Verarbeitung vor Aktivierung separat prüfen.
- Datenübermittlung an externe Anbieter dokumentieren.
- KI-Ergebnisse als automatisch generiert kennzeichnen.
- manuelle Korrektur oder Bestätigung ermöglichen.

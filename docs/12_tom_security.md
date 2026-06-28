# 12 TOM Security

## Zugriffskontrolle

- Authentifizierung für alle geschützten Bereiche.
- Serverseitige Autorisierung für Organisation, Projekt, Gewerk, Plan, Bild und Downloadrecht.
- Admin-2FA prüfen.
- Token- und Session-Laufzeiten begrenzen: kurzes Access- + langes Refresh-Token, Sessions widerrufbar (D-036).
- Rate-Limiting global + gezielt auf Auth-Endpunkte gegen Brute-Force (D-035).

## Dateisicherheit

- Private Buckets.
- Keine öffentlichen Direktlinks.
- Zeitlich begrenzte URLs oder kontrolliertes Streaming.
- Datei-Metadaten mit Besitzer, Projektbezug und Zugriffskontext.
- Malware-Scan über Quarantäne-Pipeline mit self-hosted ClamAV (entschieden, D-023); strikte Dateityp-Allowlist + MIME-Validierung (D-024).
- Aktive Inhalte sicher ausliefern: separate Sandbox-Domain, `Content-Disposition: attachment` für Dokumente/Pläne, serverseitiger Content-Type (Magic Bytes) + `nosniff`, SVG verboten/sanitisiert, CSP (D-095).
- Signed-URLs nur nach frischer RLS+RBAC-Prüfung, nie per Roh-ID; vollständige URLs nicht loggen (D-096).
- Auslieferung nur der EXIF-bereinigten Variante; Roh-Original nie signierbar (D-097).
- Scan-Gate-Invariante: keine Verarbeitung/Derivate/URL vor `scan_status=clean` (D-098).
- Fremdreferenzen org-/projekt-konsistent validieren (D-099); Serving/Listing erzwingen `deleted_at IS NULL` (D-100).

## Datenbank

- PostgreSQL mit getrennten Rollen für App und Administration.
- Migrationen versionieren.
- Backups verschlüsseln und Restore testen; Ziel RPO < 15 Min / RTO < 4 h via PITR (D-026).
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

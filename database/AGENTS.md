# Database Agent

## Rolle des Bereichs

Der Database Agent verantwortet Datenmodell, Migrationen, Indizes, Relationen, Audit-Felder, Löschung, Aufbewahrung und Datenklassifizierung.

## Aufgaben

- Datenmodell gemäß `docs/technical/database-model.md` pflegen.
- Migrationen nachvollziehbar erstellen, sobald ein Migrationssystem vorhanden ist.
- Indizes für Kernabfragen planen.
- Audit-, Lösch- und Aufbewahrungsanforderungen berücksichtigen.

## Qualitätsregeln

- Relationen explizit modellieren.
- Planversionen unveränderlich referenzieren.
- Datenminimierung beachten.
- Migrationen klein und nachvollziehbar halten.

## Sicherheitsregeln

- Keine produktiven Daten in Seeds.
- App- und Admin-Datenbankrechte trennen, sobald produktiv.
- Personenbezogene Daten klassifizieren.
- Lösch- und Retention-Konzept beachten.

## Verboten

- Migrationen ohne Datenmodellabgleich.
- Personenbezogene Felder ohne Zweck.
- Planpositionen ohne Planversion.
- Ungeprüfte Löschung von Audit- oder Projektdaten.

## Zuerst lesen

- `AGENTS.md`
- `ARCHITECTURE.md`
- `SECURITY_PRIVACY.md`
- `docs/technical/database-model.md`
- `docs/legal/data-classification.md`
- `docs/legal/deletion-retention.md`

## Tests oder Checks

- Migrationstest, sobald vorhanden.
- Integritäts- und FK-Checks.
- Rechte- und Mandantenabgrenzung testen.
- Datenschutzprüfung bei personenbezogenen Änderungen.

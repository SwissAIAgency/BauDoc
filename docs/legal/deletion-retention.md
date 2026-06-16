# Deletion and Retention

## Status

Phase-2-Planungsbaseline. Konkrete Fristen sind vor produktiver Nutzung final festzulegen.

## Ziele

- Personenbezogene Daten nur solange speichern, wie Zweck, Vertrag oder rechtliche Anforderungen dies rechtfertigen.
- Projektarchivierung und endgültige Löschung unterscheiden.
- Backups und Object Storage in Löschprozesse einbeziehen.

## Löscharten

- Benutzerdeaktivierung.
- Projektarchivierung.
- Endgültige Projektlöschung.
- Dateilöschung.
- Kommentar- oder Metadatenlöschung.
- Audit-Retention.

## Mindestregeln

- Keine endgültige Löschung ohne Berechtigungsprüfung.
- Löschung von Dateien und Datenbankeinträgen konsistent behandeln.
- Audit-Logs nicht unkontrolliert verändern.
- Retention vor produktiver Nutzung final festlegen.

## Vorläufige Retention-Leitplanken

- Projektinhalte: projekt-/vertragsabhängig.
- Audit-Logs: so kurz wie möglich, so lang wie für Nachvollziehbarkeit nötig.
- Technische Logs: kurz halten und personenbezogene Inhalte vermeiden.
- Backups: separate Frist und Restore-/Löschprozess definieren.

## Offene Fragen

- Konkrete Aufbewahrungsfrist für Audit-Logs.
- Umgang mit gesetzlichen oder vertraglichen Aufbewahrungspflichten.
- Löschlogik für Projektmitglieder nach Projektende.
- Löschung aus Backups.

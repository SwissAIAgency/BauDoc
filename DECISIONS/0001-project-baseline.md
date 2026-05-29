# 0001 Project Baseline

Datum: 29.05.2026

## Status

Entschieden.

## Kontext

Das Projekt soll nach dem bereitgestellten Unternehmensstandard vorbereitet werden, bevor Produktivcode geschrieben wird. Die fachliche Hauptquelle ist `docs/references/leistungskatalog_baufortschritt_dokumentation.html`.

## Entscheidung

BauDoc startet mit einer dokumentations- und sicherheitsorientierten Phase-1-Basis:

- Kanonische Root-Dokumente für Projektdefinition, Leistungskatalog, Architektur, Security/Privacy, UI-Standards und Testing.
- Bereichs-Agenten für Frontend, Backend, Database, Integrations, Security und DevOps.
- Getrennte Business-, Technical-, Legal- und UX-Dokumentation.
- Kein Produktivcode und keine Dependencies in Phase 1.

## Begründung

Die Anwendung verarbeitet potenziell personenbezogene und vertrauliche Bauprojektinformationen. Architektur, Rollen, Datenschutz, private Dateiablage und Tests müssen vor Implementierung klar dokumentiert sein.

## Konsequenzen

- Umsetzung beginnt erst nach Abschluss der Planungs- und Review-Schritte.
- Frontend-Stack bleibt bis Phase 2 offen.
- Bestehende nummerierte Dokumente unter `docs/00_*` bis `docs/15_*` bleiben ergänzende Projektunterlagen.

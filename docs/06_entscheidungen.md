# 06 Entscheidungen

## D-001 Hauptquelle

Status: entschieden.

Die fachliche Hauptquelle ist `docs/references/leistungskatalog_baufortschritt_dokumentation.html`.

Begründung: Der Nutzer hat diese Datei ausdrücklich als Hauptinformationsquelle benannt.

## D-002 Unternehmensstandard

Status: entschieden.

Das Projekt folgt dem bereitgestellten Standard für Codex-Agenten, Repository, Skills, Dokumentation, QA, Datenschutz und Release.

Begründung: Der Nutzer hat die Anleitung als gewünschtes Setup bereitgestellt.

## D-003 Backend

Status: entschieden.

Backend-Ziel ist Laravel API.

Begründung: Der Leistungskatalog nennt Laravel API als Backend und begründet Laravel mit API, Auth, Queues, Notifications, Storage und modularer Businesslogik.

## D-004 Datenbank

Status: entschieden.

Datenbank-Ziel ist PostgreSQL.

Begründung: PostgreSQL ist stark für relationale Daten, Planpositionen und spätere Vektorsuche.

## D-005 Frontend

Status: offen.

Frontend wird als Web-App / Mobile PWA umgesetzt. Die konkrete Entscheidung zwischen Vue 3, React oder Inertia ist vor Produktivcode zu treffen.

Begründung: Der Leistungskatalog nennt diese Optionen, legt aber keine davon final fest.

## D-006 Dateien

Status: entschieden.

Fotos, Panoramen, Pläne, Thumbnails und Audio werden privat in S3-kompatiblem Object Storage oder lokal in MinIO gespeichert.

Begründung: Bilder und Pläne gehören nicht direkt in die Datenbank und dürfen nicht über öffentliche Direktlinks zugänglich sein.

## D-007 KI

Status: entschieden für später.

KI-Bildanalyse, Transkription, Embeddings und semantische Suche werden nicht im MVP umgesetzt, aber architektonisch vorbereitet.

Begründung: Der MVP soll nicht durch KI-Funktionen aufgebläht werden.

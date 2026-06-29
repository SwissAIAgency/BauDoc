# Spec 30 — Foto-Metadaten & Felder-Katalog

**Status:** APPROVED (Methodik + Detail-Ansicht); übrige Screens in Arbeit · **Bau:** MVP · **Bezug:** D-077, D-078, D-079, D-080
**Source of Truth für:** vollständiger Feld-Katalog je Foto + Herkunft jedes Feldes; Screen-für-Screen-Feld-Inventar

## Zweck

Die UI ist der Vertrag für das Datenmodell: jedes angezeigte/erfasste Feld braucht eine definierte **Quelle** und ein
**Ziel** (Tabelle/Spec). Diese Spec katalogisiert alle Foto-Felder und inventarisiert die Screens, damit keine
Anzeige ohne hinterlegte Daten bleibt (wie zuvor beim übersehenen Wetter-Feld).

## Quellen-Typen

`manuell` · `EXIF` (aus Datei) · `Struktur` (Projekt/Gebäude/…) · `abgeleitet` (berechnet) · `extern` (API) · `system`

## Kanonischer Foto-Feld-Katalog

| Feld | Quelle | Pflicht | Ziel-Spec |
|---|---|---|---|
| Projekt / Org | Struktur / system | Pflicht | [[24-project-structure-master-data]] / [[01-tenant-isolation-rls]] |
| Verortung: Gebäude/Etage/Raum/Zone | Struktur (manuell, QR) | **projektabhängig** (D-059) | [[24-project-structure-master-data]] |
| Gewerk *(UI teils „Gattung", D-079)* | manuell (Org-Katalog) | empfohlen | [[24-project-structure-master-data]] |
| Plan + Planposition (x/y, Richtung) | manuell / auto | optional | [[06-plan-management-viewer]] / [[07-auto-plan-assignment]] |
| Datum · Zeit (`captured_at`) | EXIF / manuell | Pflicht | [[05-media-pipeline]] |
| **Bezeichnung** (Kurztitel) | manuell | optional | dieses Spec + [[10-data-model]] |
| **Beschreibung** (Freitext) | manuell | optional | dieses Spec + [[10-data-model]] |
| Tags | manuell / KI | optional | [[05-media-pipeline]] / [[11-ai-integration]] |
| Status (Prüf-/Freigabe) | Workflow | system | [[25-status-approval-workflow]] |
| Erstellt von (`uploaded_by`) | system | Pflicht | [[10-data-model]] |
| Dateiname / Größe / Auflösung / MIME | EXIF / system | system | [[05-media-pipeline]] |
| EXIF: Gerät, ISO, GPS lat/lng, Genauigkeit, Azimut | EXIF | optional | [[05-media-pipeline]] *(GPS aus ausgeliefertem File gestrippt)* |
| **Wetter** (Temp, Zustand, Icon) | **extern (API)** / manuell | optional, best-effort | dieses Spec (D-077) |
| Erstellt/geändert/gelöscht | system | system | [[10-data-model]] |

## Wetter — Festlegung (D-077)

- Unveränderlicher **Snapshot** je Foto: `weather` (JSONB: `temp_c`, `condition`, `icon`, `source`, `fetched_at`).
- Befüllung: beim Upload Queue-Job → CH/EU-Wetter-API (z.B. MeteoSwiss/Open-Meteo) anhand GPS + `captured_at`;
  **manueller Override**; ohne GPS manuelle Eingabe. Icon ist **abgeleitet** aus `condition`.
- Erste sanktionierte externe Integration → über `external_systems`/`integration_logs` ([[10-data-model]]),
  Hosting/AVV beachten ([[21-hosting-compliance-legal]]).

## Datenmodell (Delta)

- `photos`: `bezeichnung` (text), `beschreibung` (text), `weather` (JSONB, immutable).
- Gewerk = bestehende Trade-Zuordnung ([[24-project-structure-master-data]]); „Gattung" ist nur ein UI-Synonym (D-079).

## Screen-Inventar (Status)

| Screen | Status |
|---|---|
| Foto-Detail (Lightbox) | ✅ inventarisiert (Basis dieser Spec) |
| Upload-/Hochladen-Wizard | ⬜ offen |
| Galerie-Karte / Kachel | ⬜ offen |
| Liste / Tabelle | ⬜ offen |
| Timeline | ⬜ offen |
| Projekt-Detail (Tabs) | ⬜ offen |
| Dashboard | ⬜ offen |
| Projekte-Liste · Archiv | ⬜ offen |
| Einstellungen | ⬜ offen |
| Pläne/Viewer · Dokumente | ⬜ offen |

## Abhängigkeiten / Verweise

- [[05-media-pipeline]] · [[10-data-model]] · [[24-project-structure-master-data]] · [[25-status-approval-workflow]]
- [[27-gallery-filter-search]] (Sortierung „Bezeichnung") · [[21-hosting-compliance-legal]] (Wetter-API/AVV)

## Akzeptanzkriterien

- Jedes Feld der Foto-Detail-Ansicht hat eine eindeutige Quelle + Ziel-Tabelle (Tabelle oben vollständig).
- `weather` wird beim Upload mit GPS automatisch befüllt, ist manuell überschreibbar und nach Speicherung unveränderlich.
- Bezeichnung und Beschreibung sind getrennt speicher-, sortier- und durchsuchbar.
- Kein UI-Feld ohne hinterlegtes Datenfeld (Review-Gate je Screen).

## Offene Punkte

- Screen-Inventar der übrigen Ansichten (Checkliste oben) abarbeiten.
- Konkrete Wetter-API + Pflichtfelder je Screen final festlegen.

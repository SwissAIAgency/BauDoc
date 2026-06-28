# Spec 05 — Medien-Pipeline, Storage & Datei-Sicherheit

**Status:** APPROVED · **Bau:** MVP · **Bezug:** D-006, D-012, D-014, D-023, D-024, D-071, D-077
**Source of Truth für:** Upload, EXIF-Verarbeitung, Thumbnails, Video, Object-Storage, signierte URLs, Malware-Scan, Upload-Limits

## Zweck

Schneller, robuster und sicherer Medien-Upload von der Baustelle; private Ablage; konsistente Metadaten.

## Festlegungen

### Upload- & Verarbeitungs-Pipeline (asynchron, Redis-Queue)
1. Upload → Datei sofort privat in **Quarantäne**-Bereich (S3/MinIO); DB-Eintrag (`photos`/`photo_files`) + Audit.
2. Queue-Worker:
   - **Malware-Scan** (self-hosted ClamAV) — erst bei „sauber" Freigabe + Weiterverarbeitung.
   - EXIF-/Metadaten-Extraktion (Aufnahmezeit, Gerät, Auflösung, GPS-Lat/Lng, Azimut `GPSImgDirection`).
   - Thumbnails (sm/md/lg) als private Derivate.
   - Video-Transkodierung (einheitliches Web-Format) + Poster-Frame.
   - **Embedding-Erzeugung** (Bild + zugehöriger Text) für die semantische Suche (pgvector) — MVP (D-071), siehe [[27-gallery-filter-search]].
   - **Wetter-Abruf** (GPS + `captured_at` → CH/EU-Wetter-API) als unveränderlicher Snapshot; ohne GPS manuell — D-077, Feld-Hoheit [[30-photo-metadata-fields]].
3. Verarbeitungsstatus am Medium sichtbar.

### Datei-Sicherheit
- S3-Objekte privat. Backend prüft Recht (`photo.view`/`photo.download`), stellt dann **~15-Min signierte S3-URL** aus;
  Frontend lädt direkt von S3. Jede Ausstellung wird auditiert; bei Ablauf neu anfordern.
- **EXIF-Handling:** GPS/Azimut/Gerät beim Upload in die DB extrahieren, danach EXIF aus ausgeliefertem Bild +
  allen Thumbnails **strippen**. Metadaten leben strukturiert in Postgres; Download-File ist DSG-konform.
- **Aktive Inhalte sicher ausliefern (F1/F5):** separate Sandbox-Domain; Dokumente/Pläne als `attachment`;
  Content-Type serverseitig aus Magic Bytes + `nosniff`; SVG verboten/sanitisiert; CSP (D-095).
- **Scan-Gate-Invariante (F4):** keine Derivat-/Embedding-/Wetter-Erzeugung, kein Move in den Haupt-Bucket und keine
  Signed-URL, solange `scan_status ≠ clean` (D-098).
- Vollständige Sicherheits-Kontrollen der Datei-Auslieferung: [[34-storage-data-model]] §8a (D-095…D-100).

### Upload-Beschränkungen
- Strikte **Allowlist** + serverseitige MIME-Validierung (nicht nur Endung).
- Default-Limits: Fotos JPEG/HEIC/PNG ≤ 50 MB, Video MP4/MOV ≤ 500 MB, Pläne/Dokumente PDF ≤ 100 MB (DWG optional).
- **Speicher-Quota-Gate:** vor Annahme prüfen, ob die Org-Quota reicht; bei Überschreitung Ablehnung mit klarer Meldung → [[32-storage-accounting-quotas]].

## Datenmodell (Delta)

- Physische Dateien: zentrale `stored_objects` + `derivatives` (S3-Key, Größe, Checksum, Scan-/Verarbeitungsstatus, `exif`) — Datei-Modell-Hoheit [[34-storage-data-model]] (ersetzt das frühere `photo_files`-Konzept, D-092).
- `photos`: `bezeichnung`, `beschreibung`, `weather` (JSONB-Snapshot) — Feld-Hoheit [[30-photo-metadata-fields]].
- Quarantäne-/Scan-Status je Datei.

## Abhängigkeiten / Verweise

- [[20-mobile-pwa]] (Client-Upload-Queue) · [[07-auto-plan-assignment]] (nutzt GPS/Azimut) · [[03-audit-logging]]
- [[21-hosting-compliance-legal]] (private Ablage, CH/EU)

## Akzeptanzkriterien

- Foto mit GPS/Azimut → EXIF in DB, ausgeliefertes File + Thumbnails **ohne** EXIF.
- Infizierte Testdatei (EICAR) wird in Quarantäne erkannt und nicht freigegeben.
- Hochgeladene SVG/HTML werden nie inline auf der App-Origin ausgeliefert (attachment von Sandbox-Domain + nosniff); kein Derivat/keine URL vor `scan=clean` (F1/F4).
- Datei außerhalb der Allowlist / über Limit wird abgewiesen (serverseitig, MIME-geprüft).
- Zugriff ohne gültige bzw. mit abgelaufener signierter URL wird verweigert + auditiert.
- Großer Mobile-Upload blockiert den Request nicht (Verarbeitung asynchron).

## Offene Punkte

- Medien-Retention (separat von Audit-Retention) festlegen.
- HEIC→JPEG-Konvertierung für Web-Anzeige bestätigen.

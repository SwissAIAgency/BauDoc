# Spec 20 — Mobile / PWA

**Status:** APPROVED · **Bau:** MVP · **Bezug:** D-021, D-028, D-027 (Sensoren)
**Source of Truth für:** PWA, Offline-Verhalten, Upload-Queue, Geräte-Sensoren

## Zweck

Zuverlässige mobile Foto-Erfassung auf der Baustelle trotz schlechtem Netz.

## Festlegungen

### Offline & Upload-Resilienz
- Service-Worker cacht die **App-Shell** und erlaubt **Aufnahme + Einreihen in die Upload-Queue (IndexedDB) ohne Netz**.
- Ansehen/Galerie nur online. Automatischer **Retry** → kein Datenverlust bei Funkloch.
- **Kein** vollständiges Offline-Sync-System (bleibt Nicht-Ziel).

### Geräte-Sensoren (für Auto-Zuordnung)
- Zugriff auf Kamera, Geolocation und **Kompass** (`DeviceOrientation`/`webkitCompassHeading`) nur über HTTPS + Permission.
- Sensor-Güte wird erfasst und an Fotos/Metadaten weitergegeben ([[05-media-pipeline]]).
- **Machbarkeits-Spike vor V2** der Auto-Zuordnung ([[07-auto-plan-assignment]]).

## Abhängigkeiten / Verweise

- [[05-media-pipeline]] · [[07-auto-plan-assignment]] · [[19-api-design]] · [[14-i18n]] · [[18-capture-features]] (QR-Scan)

## Akzeptanzkriterien

- Foto kann bei vollständigem Funkloch aufgenommen und in die Queue gelegt werden; Upload erfolgt automatisch bei Netz.
- App-Shell lädt offline; Galerie/Ansicht erfordert Netz (klare UX).
- Kompass-/GPS-Zugriff funktioniert über HTTPS mit Permission; fehlende Sensoren degradieren sauber.

## Offene Punkte

- Frontend-Framework (D-005); Ergebnis des Sensor-Spikes.

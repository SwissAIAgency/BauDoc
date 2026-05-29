# 10 Datenfluss

## Anmeldung

1. Benutzer meldet sich an.
2. Backend prüft Zugangsdaten.
3. Session oder API-Token wird ausgegeben.
4. Jede geschützte Ressource prüft serverseitig Rolle, Projektmitgliedschaft, Gewerk und konkrete Rechte.
5. Login wird im Audit-Log protokolliert.

## Fotoaufnahme und Upload

1. Benutzer wählt Projekt, Gebäude, Etage, Raum, optional Zone, Gewerk und Arbeitstyp.
2. Benutzer nimmt Foto auf oder lädt Datei hoch.
3. Datei wird privat im Object Storage gespeichert.
4. Datei-Metadaten werden in `photo_files` gespeichert.
5. Foto- und Zuordnungsdaten werden in relationalen Tabellen gespeichert.
6. Upload wird im Audit-Log protokolliert.

## Planposition

1. Benutzer öffnet eine konkrete Planversion.
2. Benutzer setzt Marker auf dem Plan.
3. Frontend übermittelt relative Koordinaten, Richtung und Planversion.
4. Backend validiert Projekt- und Planberechtigung.
5. Planposition wird historisch stabil gespeichert.

## Planversionierung

1. Berechtigter Benutzer lädt neue Planversion hoch.
2. Backend erstellt neue `plan_versions`-Referenz.
3. Alte Versionen bleiben für historische Fotos erhalten.
4. Benachrichtigung wird über Queue versendet.
5. Planansicht oder Plandownload wird auditierbar gemacht.

## Ansicht und Download

1. Benutzer fordert Bild oder Plan an.
2. Backend prüft Ansichtsrecht oder Downloadrecht.
3. Zugriff wird verweigert, gestreamt oder über zeitlich begrenzte URL erlaubt.
4. Ansicht oder Download wird im Audit-Log protokolliert.

## KI später

1. Upload erzeugt optional KI-Job.
2. Worker sendet Bild, Audio oder Text an Processing Layer.
3. KI-Ergebnis wird als automatisch generiert gespeichert.
4. Benutzer kann Ergebnis korrigieren oder bestätigen.
5. Suche verwendet nur berechtigte Ergebnisse.

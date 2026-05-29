# User Flows

## Login

1. Nutzer öffnet App.
2. Nutzer meldet sich an.
3. Backend prüft Credentials.
4. App lädt Benutzer- und Projektkontext.
5. Nicht berechtigte Bereiche bleiben unzugänglich.

## Fotoaufnahme

1. Nutzer wählt Projekt.
2. Nutzer nimmt Foto auf oder lädt Foto hoch.
3. Nutzer wählt Gebäude, Etage, Raum und Gewerk.
4. Nutzer setzt optional Marker auf einer konkreten Planversion.
5. Nutzer speichert.
6. Backend prüft Rechte, speichert Datei privat und schreibt Audit-Event.

## Planverwaltung

1. Berechtigter Nutzer wählt Projekt.
2. Nutzer lädt Plan hoch.
3. Nutzer setzt Kategorie und Version.
4. Backend speichert Plan privat.
5. Neue Planversion löst Benachrichtigung aus.

## Galerie und Filter

1. Nutzer öffnet Projektgalerie.
2. Nutzer filtert nach Zeitraum, Ort oder Gewerk.
3. App zeigt nur berechtigte Fotos.
4. Nutzer öffnet Foto, Kommentare und Planbezug.

## Rechteverwaltung

1. Projektleiter öffnet Mitgliederverwaltung.
2. Projektleiter weist Rolle und optional Gewerk zu.
3. Backend validiert Berechtigung.
4. Rechteänderung wird auditiert.

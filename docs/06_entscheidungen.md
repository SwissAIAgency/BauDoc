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

**Update 2026-06-27 (D-071):** Teilweise revidiert. Die KI-gestützte **Suche** (Text- + Bild-Embeddings, pgvector) wird in den MVP vorgezogen. Nur die übrige KI (redaktionelle Bildbeschreibung, Audio-Transkription) bleibt späteren Phasen.

## D-008 Tenant-Isolation

Status: entschieden.

Mandantentrennung als Defense-in-Depth: `organization_id` in allen Fachtabellen, automatischer App-Filter (Laravel Global Scope) PLUS PostgreSQL Row-Level Security als Sicherheitsnetz (`current_setting('app.current_org_id')`, App-DB-Rolle ohne `BYPASSRLS`).

Begründung: Baustellen-/Personendaten + CH-DSG verlangen, dass auch ein App-Bug keine fremden Mandantendaten preisgeben kann. Details: `docs/specs/01-tenant-isolation-rls.md`.

## D-009 Rollen & Rechte

Status: entschieden.

`spatie/laravel-permission`, projekt-scoped über das Teams-Feature (`team_id = project_id`). Globale Rollen für System-/Org-Admin; Ansicht- und Download-Recht getrennt; Gewerk-Scope für Gewerk-Benutzer.

Begründung: Bewährtes Paket statt Eigenbau; Teams-Feature bildet projektbezogene Rollen (`project_members`) direkt ab.

## D-010 Audit-Log

Status: entschieden.

Zentrale `audit_logs`-Tabelle, append-only + Hash-Chain (`prev_hash`/`entry_hash`). Retention 24 Monate; IP und User-Agent gehasht/pseudonymisiert.

Begründung: „Lückenlos" im forensischen Sinn erfordert nachweisbare Unveränderlichkeit; DSG-schonende Pseudonymisierung.

## D-011 SuperAdmin-Zugriff

Status: entschieden.

Systemadministrator überwindet die Mandantengrenze über eine separate, privilegierte DB-Verbindung mit `BYPASSRLS`, getrennt von der App-Verbindung; jeder org-übergreifende Zugriff wird auditiert; 2FA-Pflicht.

Begründung: Support/Debug muss möglich sein, ohne die RLS des Default-Pfads zu schwächen.

## D-012 Medien-Pipeline

Status: entschieden.

Upload speichert sofort privat; EXIF-Extraktion, Thumbnails (sm/md/lg) und Video-Transkodierung laufen asynchron über Redis-Queue/Laravel Queues.

Begründung: Mobile Baustellen-Uploads dürfen nicht durch synchrone Verarbeitung blockiert werden.

## D-013 Automatische Plan-Zuordnung

Status: spezifiziert, Bau in V2.

Algorithmus + Datenmodell werden jetzt festgelegt (2-Punkt-Plan-Kalibrierung → affine Transformation; GPS→Plan-x/y, Azimut→Blickrichtung, Confidence-Score). V1 bleibt beim manuellen Marker; manuelles Setzen bleibt immer Fallback.

Begründung: „Automatische Planverortung" ist laut `docs/00_projektdefinition.md` ein Nicht-Ziel V1; die Architektur wird aber vorbereitet, statt sie zu verbauen.

## D-014 Datei-Zugriff & EXIF

Status: entschieden.

Private S3-Objekte, Auslieferung über ~15-Min signierte URLs nach serverseitiger Rechteprüfung. EXIF wird beim Upload in die DB extrahiert und danach aus ausgeliefertem Bild + Thumbnails entfernt (gestrippt).

Begründung: „Keine öffentlichen Direktlinks" + DSG: Standort/Gerät dürfen nicht im herunterladbaren File verbleiben.

## D-015 Dokumentenverwaltung

Status: entschieden.

Pläne behalten `plans`/`plan_versions`; allgemeine Dokumente erhalten eine eigene schlanke `documents`-Entität.

Begründung: Plan-spezifische Felder (Kalibrierung, Plangattung, Versionierung) würden ein generisches Datei-Modell verwässern.

## D-016 Systemarchitektur

Status: entschieden.

Modularer Monolith (ein Laravel-Deployment) mit Clean-Architecture-Schichtung je Modul; asynchrone Lasten über die Queue entkoppelt. Keine Microservices im MVP.

Begründung: Saubere Grenzen + einfache Deploys; spätere Herauslösung einzelner Module bleibt möglich.

## D-017 Datenmodell-Strategie

Status: entschieden.

PostgreSQL als alleiniger Datenkern: strikte Spalten für Kernfelder, JSONB für flexible Metadaten (EXIF, KI-Tags), pgvector für Embeddings. Keine separate NoSQL-/Vektor-Infrastruktur.

Begründung: Postgres deckt relational + dokumentartig + vektoriell ab — keine Sync-Probleme, eine Infrastruktur.

## D-018 KI-Hosting (verfeinert D-007)

Status: entschieden.

KI wird self-hosted in EU/CH betrieben, hinter einem provider-agnostischen Async-Interface. Kein Abfluss von Bild-/Audiodaten an externe APIs.

Begründung: Datenhoheit bei vertraulichen Plänen und Personen auf Baustellenfotos hat Vorrang vor maximaler Modellqualität.

**Update 2026-06-27 (D-071):** Der self-hosted KI-Layer (Embedding- + Vision-Modelle, GPU) ist nun bereits für die MVP-Suche nötig, nicht erst post-MVP. Das self-hosted/EU-CH-Prinzip bleibt unverändert gültig.

## D-019 Hosting-Standort

Status: entschieden.

CH primär, EU-Fallback für einzelne Dienste/Backups. Primär CH-DSG/nDSG, DSGVO bei EU-Bezug.

Begründung: Schweizer Baukunden + Datenhoheit; EU-Fallback gibt Betriebs-Flexibilität.

## D-020 Datenlebenszyklus

Status: entschieden.

Normale Löschung = Soft-Delete; DSG-Löschbegehren = harte Löschung/Crypto-Shred der Medien bei erhaltenem Audit-Eintrag. Projekt-Export (ZIP) als Konzept jetzt, Bau später.

Begründung: Erfüllt DSG-Löschpflicht, ohne die Unveränderlichkeit des Audit-Logs zu verletzen. Siehe `docs/11_loeschkonzept.md`.

## D-021 Upload-Resilienz

Status: entschieden.

Client-seitige Retry-Queue im PWA (IndexedDB) mit automatischem Retry. Kein vollständiges Offline-Sync-System (bleibt Nicht-Ziel).

Begründung: Schlechtes Baustellen-Netz darf nicht zu Datenverlust führen.

## D-022 Auth & 2FA

Status: entschieden.

Laravel Sanctum für Web+PWA-Token (Login/Logout/Passwort-Reset) + TOTP-2FA verpflichtend für System-/Org-Admins, optional für alle.

Begründung: Deckt die 2FA-Soll-Anforderung für kritische Rollen ab; Sanctum passt zu API-first + PWA.

## D-023 Malware-Scan

Status: entschieden.

Hochgeladene Dateien durchlaufen eine Quarantäne-Pipeline mit self-hosted ClamAV (Queue-Worker); Freigabe erst nach „sauber".

Begründung: Der Upload-/Download-Pfad ist die größte Angriffsfläche; Scan ohne Datenabfluss an Dritte. Konkretisiert den offenen Punkt in `docs/12_tom_security.md`.

## D-024 Upload-Beschränkungen

Status: entschieden.

Strikte Format-Allowlist mit serverseitiger MIME-Validierung und getrennten Max-Größen je Typ (Foto ≤ 50 MB, Video ≤ 500 MB, PDF ≤ 100 MB; DWG optional).

Begründung: Begrenzt Angriffsfläche und Verarbeitungs-/Speicheraufwand.

## D-025 Observability

Status: entschieden.

Self-hosted Observability-Stack in CH/EU (Error-Tracking + Logs/Metriken), getrennt vom fachlichen Audit-Log.

Begründung: Stacktraces/Logs enthalten Personendaten → Datenhoheit konsistent mit D-018/D-019; Audit bleibt forensisch sauber.

## D-026 Backup & Disaster Recovery

Status: entschieden.

Postgres PITR + versionierte/replizierte Medien, Ziel RPO < 15 Min / RTO < 4 h, verschlüsselt, mit getestetem Restore.

Begründung: Baudokumentation ist beweisrelevant; Datenverlust muss minimal sein.

## D-027 Sensor-Strategie Auto-Zuordnung

Status: entschieden.

Vor dem V2-Bau ein technischer Spike zur realen Kompass-/GPS-Genauigkeit auf Ziel-Geräten. Auto-Zuordnung immer best-effort mit Confidence + Graceful Degradation; manuelles Setzen bleibt gleichwertig.

Begründung: Browser-Kompass (iOS `webkitCompassHeading`) ist permission-/störungsabhängig (Baustahl) — Machbarkeit muss validiert sein, bevor der Algorithmus produktiv geht.

## D-028 PWA-Offline-Umfang

Status: entschieden.

Service-Worker cacht App-Shell und erlaubt Aufnahme + Einreihen in die Upload-Queue ohne Netz; Ansehen/Galerie nur online. Kein vollständiges Offline-Sync (Nicht-Ziel).

Begründung: Der Aufnahmefluss muss auch bei Funkloch auf der Baustelle funktionieren, ohne ein komplexes Sync-System zu bauen.

## D-029 API-Stil

Status: entschieden.

REST, OpenAPI-first; die OpenAPI-Spec ist der Vertrag zwischen Backend und PWA, Client-Typen werden daraus generiert.

Begründung: Bewährt, gut cachebar, entkoppelt Backend/Frontend trotz offenem Frontend-Framework (D-005).

## D-030 API-Konventionen

Status: entschieden.

URL-Versionierung (`/api/v1`), einheitliches Fehlerformat Problem Details (RFC 9457, `application/problem+json`), Cursor-Pagination.

Begründung: Langlebige, sichtbare Verträge mit Standard-Tooling; Cursor-Pagination passt zu großen chronologischen Medienlisten.

## D-031 Onboarding

Status: entschieden.

Einladungsbasiertes Onboarding per zeitlich begrenztem E-Mail-Token (Org-/Projektzuordnung eindeutig). Keine offene Selbstregistrierung; SSO/OIDC als spätere Option.

Begründung: Eindeutige Org-Zuordnung ist Voraussetzung für Mandantenfähigkeit/RLS; offene Registrierung wäre ein Sicherheitsrisiko.

## D-032 Benachrichtigungen

Status: entschieden.

Event-getriebener Benachrichtigungsdienst über die Queue, zwei Kanäle (In-App + E-Mail), pro Nutzer konfigurierbar; erweitert die Muss-Anforderung „E-Mail bei Planversion".

Begründung: Mehr relevante Events (Freigabe, Erwähnung, Rechteänderung) erhöhen Transparenz, ohne den Kern aufzublähen.

## D-033 Mehrsprachigkeit

Status: entschieden.

i18n-Infrastruktur (Übersetzungs-Keys, Backend-i18n) von Anfang an; MVP liefert nur Deutsch, FR/IT später nachrüstbar.

Begründung: CH ist mehrsprachig; nachträgliche String-Extraktion wäre teuer — Vorsorge ist billig.

## D-034 Plan-Viewer

Status: entschieden.

MVP: clientseitiges PDF/Bild-Rendering via `pdf.js`. V2 bei Bedarf: server-seitiges Deep-Zoom-Tiling großer Pläne.

Begründung: Einfacher MVP ohne Render-Server; Tiling nur falls große Pläne (A0) die Client-Performance sprengen.

## D-035 Rate-Limiting

Status: entschieden.

Globales API-Throttling pro Nutzer/IP plus verschärfte Limits auf Auth-Endpunkte (login/password-reset: Versuchszähler, Backoff, Sperre).

Begründung: Der Login ist primäres Brute-Force-Ziel; gezielter Schutz ergänzt die Admin-2FA.

## D-036 Sessions & Token

Status: entschieden.

Kurzes Access-Token + längeres Refresh-Token; aktive Geräte-Sessions einsehbar und einzeln widerrufbar.

Begründung: PWA-tauglich und erfüllt „Token-/Session-Laufzeiten begrenzen" aus `docs/12_tom_security.md`.

## D-037 Betriebsmodell

Status: entschieden.

Architektur für Mehrkunden-SaaS auslegen (Plan-Limits/Kontingente vormerken); Billing-Integration als spätere Phase.

Begründung: Mandantenfähigkeit besteht bereits; kommerzielle Nutzung soll möglich sein, ohne den MVP mit Billing zu belasten.

**Update 2026-06-27 (D-084…D-087):** Präzisiert. **Speicher**-Kontingente sind ausgenommen — Accounting + Org-Quota werden bereits im MVP gebaut (`docs/specs/32-storage-accounting-quotas.md`); nur die *Verrechnung* der Quota bleibt Billing-Phase.

## D-038 Recht & Einwilligungen

Status: entschieden.

In-App-Zustimmung zu ToS/Datenschutz mit Versionierung + internes AVV-Register für verbleibende Dritte.

Begründung: Nachweisbare Einwilligung nach CH-DSG; durch self-hosted KI bleibt der AVV-Umfang gering.

## D-039 MCP-/Agent-Anbindung

Status: entschieden (Vorbereitung jetzt, MCP-Server später).

AI-Agenten greifen über einen MCP-Server als dünnen Adapter über die versionierte REST-API zu — kein zweiter DB-Zugang; Auth/RBAC/RLS/Audit werden geerbt. Jetzt vorbereiten: saubere OpenAPI-Beschreibungen, maschinenlesbare Outputs.

Begründung: Wiederverwendung der bestehenden Guardrails (D-029); Agenten können die Mandantengrenze nicht umgehen.

## D-040 Agent-Identität & Rechte

Status: entschieden.

Agenten sind eine eigene, klar gekennzeichnete Identitätsklasse (Service Account pro Org, kein verkleideter Nutzer) mit frei konfigurierbarem Rechteprofil aus dem granularen Permission-Katalog (read-only bis vollständig). Jede Aktion auditiert.

Begründung: Distinkte Identität + least privilege verhindern God-Token-Risiken; nutzt dieselbe RBAC wie Menschen.

## D-041 Berechtigungs-Matrix

Status: entschieden.

Feste granulare Permission-Presets je Rolle (Matrix in `docs/specs/02-rbac-permissions.md`); Ansicht ≠ Download; Gewerk-Scope für Gewerk-Benutzer. Keine frei konfigurierbaren Org-Rechte im MVP.

Begründung: Vorhersehbar, testbar und solide Basis für Agent-Rechteprofile.

**Update 2026-06-27 (D-054…D-057):** Erweitert. Presets bleiben fest, aber der Organisationsadministrator kann zusätzlich Custom-Rollen aus dem Katalog bauen (Ceiling: D-055). Builder-UI als Fast-Follow (V1.1).

## D-042 Freigabe-Recht

Status: entschieden.

Fachliche Freigabe (Status „Freigegeben") durch Bauleiter und Projektleiter; Gewerk-Benutzer/Betrachter/Planer nicht.

Begründung: Bildet die Prüf-/Freigabe-Logik des Prototyps ab, ohne Engpass auf eine einzige Rolle.

## D-043 Projekt-Export

Status: entschieden (Konzept jetzt, Bau später).

Asynchron erzeugtes ZIP je Projekt: Originaldateien + strukturierte Metadaten (JSON/CSV inkl. Planpositionen) + PDF-Bericht, Download über signierte URL.

Begründung: Erfüllt DSG-Portabilität und Lock-in-Vermeidung; asynchron, da große Projekte sonst Timeouts verursachen.

## D-044 PDF-Bericht

Status: entschieden.

Chronologischer Baufortschrittsbericht, gruppiert nach Zeitraum/Ort/Gewerk, je Foto Metadaten + Planmarker-Ausschnitt; filterbasiert; optionaler Audit-Anhang.

Begründung: Deckt den dokumentarischen Kernzweck und Prüf-/Streitfälle ab.

## D-045 Daten-Import

Status: entschieden (Konzept jetzt, Bau später).

Bulk-Import (Ordner/ZIP) läuft durch dieselbe Upload-Pipeline (EXIF, Malware-Scan, Thumbnails, Audit) wie normale Uploads.

Begründung: Verhindert Umgehung von Sicherheits-/Audit-Schritten und sichert konsistente Metadaten-Qualität.

## D-046 Import-Mapping

Status: entschieden.

Struktur/Metadaten werden aus Ordnerhierarchie + EXIF abgeleitet und automatisch auf die Zielstruktur gemappt, mit Bestätigungsschritt vor dem Commit.

Begründung: Ordnerstruktur + EXIF sind die zuverlässigste Metadatenquelle; Bestätigung sichert Korrektheit und Nachvollziehbarkeit.

## D-047 QR-Codes

Status: entschieden (post-MVP).

QR-Codes je Raum/Planbereich; Scan füllt den Aufnahmekontext (Projekt/Gebäude/Etage/Raum) vor und startet die Aufnahme.

Begründung: Beschleunigt die manuelle Kontextwahl und stützt die spätere Auto-Verortung über einen bekannten Raum.

## D-048 Mängel-Light

Status: entschieden (post-MVP).

Foto-Flag „Mangel" + Status (offen/in Arbeit/behoben) + optional Zuständiger/Frist; wiederverwendet Kommentare/Benachrichtigungen. Kein volles Mängelmanagement.

Begründung: Häufiger Bedarf am Bau, ohne den Nicht-Ziel-Scope „vollständiges Mängelmanagement" zu öffnen.

## D-049 Audio-Kommentare

Status: entschieden (Erfassung post-MVP, Transkription mit KI).

Sprachkommentare am Foto aufnehmen + privat ablegen (`photo_audio_comments`); automatische Transkription in der self-hosted-KI-Phase.

Begründung: Erfassung ist einfach und früh nutzbar; Auswertung gehört in die KI-Phase (D-018).

## D-050 Org-Rollen-Durchgriff

Status: entschieden.

Organisationsadministrator hat automatischen org-weiten Zugriff auf alle Projekte seiner Organisation (ohne explizite Mitgliedschaft). Fachliche Projektrollen (Bauleiter, Planer, Gewerk-Benutzer, Betrachter) erfordern explizite Projektmitgliedschaft.

Begründung: Pragmatische Verwaltung für Org-Admins bei gleichzeitig striktem least-privilege für fachliche Rollen. Details: `docs/specs/23-role-architecture.md`.

## D-051 Rollen-Delegation

Status: entschieden.

Hierarchische Delegation ohne Self-Upgrade: man kann nur Rollen vergeben/entziehen, die die eigene effektive Berechtigung nicht übersteigen (Rang Systemadmin > Org-Admin > Projektleiter > Bauleiter/Planer > Gewerk-Benutzer > Betrachter). Niemand kann sich selbst höherstufen.

Begründung: Standard-Schutz gegen Privilege Escalation; jede Zuweisung ist auditrelevant.

## D-052 Gewerk-Scope-Modell

Status: entschieden.

Gewerk ist eine orthogonale Zuordnungs-Dimension (project_member ↔ gewerke, n:m), unabhängig von der Rolle: jede Projektrolle kann optional auf bestimmte Gewerke beschränkt werden.

Begründung: Trennt Rolle (was) von Scope (worauf) — flexibler und zukunftssicher als ein Gewerk-Scope nur für „Gewerk-Benutzer".

## D-053 Externe Gäste

Status: entschieden.

Externe Betrachter sind eine eigene Identitätsklasse (kein vollwertiges Org-Mitglied), projekt-scoped und optional befristet (`expires_at`), default read-only.

Begründung: Saubere Trennung von internen Nutzern und Agenten; kontrollierte Einsicht mit natürlichem Ablauf, voll auditiert.

## D-054 Custom-Rollen-Modell

Status: entschieden.

Built-in Rollen sind unveränderbare System-Presets; zusätzlich kann der Organisationsadministrator eigene Rollen anlegen (leer oder als Klon eines Presets) und deren Permissions aus dem granularen Katalog (Spec 02) zusammenstellen. Custom-Rollen sind streng pro Org isoliert.

Begründung: Konsistente, supportbare Presets + Flexibilität pro Mandant ohne Eigenbau-Risiko. Details: `docs/specs/23-role-architecture.md`.

## D-055 Custom-Rollen-Ceiling

Status: entschieden.

Custom-Rollen dürfen jede fachliche/operative Tenant-Permission enthalten, ABER nicht die reservierten Apex-Rechte (Rollen/Permissions verwalten, Mitglieder-Vollverwaltung, Billing, Org löschen) und niemals Plattform-/Cross-Tenant-Rechte.

Begründung: Verhindert In-Tenant-Privilege-Escalation; der Organisationsinhaber/-administrator bleibt eindeutiger Apex.

## D-056 Custom-Rollen-Scope

Status: entschieden.

Custom-Rollen werden org-weit definiert und primär projekt-zuweisbar (optional org-weit) markiert; die orthogonale Gewerk-Beschränkung (D-052) gilt automatisch auch für sie.

Begründung: Einmal definieren, projektübergreifend nutzen — konsistent mit der bestehenden projekt-scoped Architektur.

## D-057 Custom-Rollen-Timing (ergänzt D-041)

Status: entschieden.

Granularer Permission-Katalog + Datenmodell + serverseitige Ceiling-Prüfung sind MVP-ready; die Builder-UI kommt als Fast-Follow (V1.1). D-041 gilt damit als „Presets im MVP, Custom-Rollen architektonisch vorbereitet, Builder V1.1".

Begründung: Kein späteres Refactoring, aber schlanker MVP.

## D-058 Tenant-Apex-Split & Umbenennung (präzisiert D-009, D-050)

Status: entschieden.

„Org-Admin" wird ersetzt durch zwei Rollen: Organisationsinhaber (Billing, Org löschen, Eigentum übertragen; ≥1 Pflicht, Lock-out-Schutz) und Organisationsadministrator (Benutzer-/Rollenverwaltung inkl. Custom-Rollen-Builder, Projekte, Einstellungen — kein Billing/Löschen).

Begründung: Separation of Duties + eindeutige Benennung; trennt kommerzielle Eigentümer-Rechte von operativer Verwaltung.

## D-059 Struktur-Hierarchie

Status: entschieden.

Pflicht ist nur „Projekt". Welche Ebenen (Gebäude/Etage/Raum/Zone) darüber hinaus Pflicht sind, ist pro Projekt konfigurierbar (Projekt-Setting „Pflicht-Ebenen"); der Foto-Upload validiert projektabhängig.

Begründung: Flexibel für Klein- wie Großprojekte; verhindert Fake-Einträge, ohne Konsistenz zu verlieren.

## D-060 Gewerke-/Arbeitstypen-Katalog

Status: entschieden.

Org-Standardkatalog wird in neue Projekte vorbefüllt und ist pro Projekt ergänz-/deaktivierbar.

Begründung: Konsistente projektübergreifende Auswertung + projektspezifische Flexibilität.

## D-061 Projekt-Lifecycle & Archivierung

Status: entschieden.

Status Aktiv → Abgeschlossen → Archiviert. Archiviert = read-only, aus aktiven Listen ausgeblendet, alle Daten + Audit bleiben, Reaktivierung durch Inhaber/Org-Admin möglich.

Begründung: Trennt „fertig gebaut" von „aus dem Alltag entfernt"; erhält Beweiswert/Retention.

## D-062 Struktur-Vorlagen

Status: entschieden (Konzept jetzt, Bau post-MVP).

Datenmodell wird für Projekt-Vorlagen und „aus bestehendem Projekt kopieren" (Struktur/Gewerke) vorbereitet; MVP legt manuell an.

Begründung: Spart Serien-Bauträgern später Zeit, ohne MVP zu belasten.

## D-063 Status-Modell

Status: entschieden.

Pro Org konfigurierbare State-Machine; Default = die 5 Prototyp-Zustände (Neu, In Prüfung, Freigegeben, Hinweis, Abgelehnt). Status-Editor als Fast-Follow.

Begründung: Mandanten-Flexibilität bei sicherem Default; Editor analog zum Custom-Rollen-Builder nachgelagert.

## D-064 Status-Geltung

Status: entschieden.

Fotos und Dokumente tragen den Freigabe-Status; Pläne nutzen die unveränderliche Versionierung (Spec 06) statt eines Status.

Begründung: Vermeidet doppelte Logik (Version vs. Status) bei Plänen.

## D-065 Freigabe-Regel (Vier-Augen)

Status: entschieden.

Standard: Ersteller ≠ Freigeber (keine Selbstfreigabe); pro Org abschaltbar für Kleinst-Teams.

Begründung: Prüfqualität als Default, ohne Ein-Personen-Crews zu blockieren.

## D-066 Status-Effekte

Status: entschieden.

Freigegeben = gegen Änderung gesperrt bis explizites „Re-Open" durch Berechtigten (auditiert); Ablehnung/Hinweis erfordert Pflichtkommentar.

Begründung: „Freigegeben" muss ein verlässlich eingefrorener Stand sein; Re-Open + Begründung sichern Nachvollziehbarkeit (Re-Open-Pille im Prototyp).

## D-067 Kommentar-Scope

Status: entschieden.

Kommentare an Fotos und Dokumenten, optional verankert an einer Planposition; MVP-Fokus Fotos.

Begründung: Deckt Diskussion am konkreten Aufnahmepunkt ohne Überbau.

## D-068 Kommentar-Struktur

Status: entschieden.

Flache Kommentarliste + @-Erwähnungen (lösen Benachrichtigung via D-032); Threads später nachrüstbar.

Begründung: Einfach, vertraut, deckt die meisten Fälle.

## D-069 Kommentar-Bearbeitung

Status: entschieden.

Eigene Kommentare editier-/löschbar (Soft-Delete, auditiert); die Freigabe-Sperre betrifft nur den Bildinhalt — Kommentieren bleibt auch an freigegebenen Fotos möglich.

Begründung: Praktisch + nachvollziehbar; trennt Inhalt von Kommunikation.

## D-070 Galerie-Filter-Umfang

Status: entschieden.

Voller Filtersatz serverseitig (Zeitraum, Ort, Gewerk, Status, Ersteller, Typ, Tags), kombinierbar, Cursor-Pagination — immer innerhalb der RBAC/RLS-Grenzen.

Begründung: Deckt Muss-Filter + die im Prototyp gezeigten ab; Filter schränken ein, heben nie Rechte auf.

## D-071 Suche (kehrt D-007/D-018 für Suche um)

Status: entschieden.

Volle semantische Suche (Text- UND Bild-Inhalt) ist im MVP. Damit werden Embeddings + pgvector + self-hosted Vision-/Embedding-Modelle (GPU) MVP-Infrastruktur; die Upload-Pipeline erzeugt Embeddings als Queue-Job.

Begründung: Bewusste Priorisierung des Such-Mehrwerts trotz höherer MVP-Kosten/-Komplexität. Übrige KI (redaktionelle Bildbeschreibung, Transkription) bleibt späteren Phasen vorbehalten.

## D-072 Galerie-Sortierung

Status: entschieden.

Default chronologisch (neueste zuerst), Timeline-Gruppierung nach Zeitraum (Prototyp); umschaltbar auf Name/Ersteller.

Begründung: Entspricht dem dokumentarischen Kernzweck „Baufortschritt über Zeit".

## D-073 Gespeicherte Filter-Ansichten

Status: entschieden (Konzept jetzt, Bau post-MVP).

Datenmodell für gespeicherte/teilbare Filter vorsehen; MVP nutzt Filter ad-hoc.

Begründung: Spätere Team-Ansichten ohne Refactoring; klärt Sichtbarkeitsrechte erst bei Bau.

## D-074 Dashboard-Scope

Status: entschieden.

Leichtes Dashboard im MVP: KPI-Kacheln + Aktivitäts-Feed aus vorhandenen Daten (keine Extra-Aggregations-Pipeline). Erweiterte Analytik später.

Begründung: Sofortige Orientierung bei geringem Aufwand (Prototyp-Einstieg).

## D-075 KPI-Set

Status: entschieden.

Kern-KPIs: aktive Projekte, Fotos (gesamt/neu), offene Freigaben (In Prüfung), offene Mängel, letzte Aktivität — alle berechtigungsgefiltert.

Begründung: Bildet den Arbeitsalltag ab (Was ist offen? Was ist neu?).

## D-076 Dashboard-Ebenen

Status: entschieden.

Zwei Ebenen: Org-Übersicht (Aggregation über alle berechtigten Projekte) + Projekt-Dashboard.

Begründung: Gesamtüberblick für Org-Verantwortliche + Detailsicht je Projekt, entspricht der Prototyp-Navigation.

## D-077 Wetter-Feld & Wetter-API (Ausnahme zu „keine externen APIs im MVP")

Status: entschieden.

Jedes Foto trägt ein **unveränderliches Wetter-Snapshot** (Temperatur, Zustand, Icon). Beim Upload automatisch aus GPS + Aufnahmezeit über eine CH/EU-Wetter-API (z.B. MeteoSwiss/Open-Meteo) geholt, manuell überschreibbar; ohne GPS manuelle Eingabe.

Begründung: Witterung ist beweisrelevant (Betonieren, Verzug, Gewährleistung). Erste bewusst sanktionierte externe Integration — Wetterdaten sind nicht personenbezogen; nutzt die vorhandene Integrationsgrundlage (`external_systems`/`integration_logs`). Snapshot, weil späterer Abruf falsche Werte lieferte.

## D-078 Foto-Felder Bezeichnung & Beschreibung

Status: entschieden.

Fotos (und Dokumente) erhalten zwei getrennte Textfelder: **Bezeichnung** (kurzer, sortier-/suchbarer Titel) und **Beschreibung** (Freitext) — eigenständig, getrennt von Kommentaren.

Begründung: Entspricht dem Prototyp (`cap`/`desc`) und der vorhandenen Sortierung „Bezeichnung (A–Z)".

## D-079 Begriff „Gattung" = „Gewerk"

Status: entschieden.

„Gattung" und „Gewerk" bezeichnen **dieselbe eine Dimension**; kanonischer Begriff = **Gewerk**. UI/Doku vereinheitlichen, keine separate Bauphasen-Dimension. „Plangattung" (Kategorie eines Plans) bleibt davon unberührt ein eigenes Plan-Attribut.

Begründung: Vermeidet doppelte, verwirrende Dimensionen; eine Achse genügt für Filterung/Zuordnung.

## D-080 Feld-Inventar & Katalog-Spec

Status: entschieden.

Systematischer Feld-Inventar-Durchgang über **alle Screens**; Ergebnis als Spec 30 „Foto-Metadaten & Felder-Katalog" (Feld → Quelle → Pflicht/optional → Ziel-Spec). Detail-Ansicht jetzt inventarisiert, übrige Screens folgen.

Begründung: Die UI ist die vollständige Feld-Anforderung; verhindert späte Datenmodell-Lücken (wie das übersehene Wetter-Feld).

## D-081 Planpositions-Koordinatensystem (behebt Widerspruch 06/07)

Status: entschieden.

Planpositionen werden als **normalisiert-relative Koordinaten (0..1 der Plan-Eigenmaße)** gespeichert — auflösungs-, zoom- und geräteunabhängig. Der affine Transform der Kalibrierung (V2) liefert Plan-Eigenkoordinaten, die normalisiert abgelegt werden. Vereinheitlicht Spec 06 („relativ") und 07 (vormals fälschlich „Pixel").

Begründung: Nur resolution-unabhängige Koordinaten machen „richtige Anzeige" geräteübergreifend definier- und per Round-Trip testbar. Details: `docs/specs/31-plan-position-verification.md`.

## D-082 Planpositions-Verifikation

Status: entschieden.

Vier verbindliche Prüf-Ebenen: (1) Unit-Tests der Transform-Mathematik, (2) Round-Trip-Persistenz + Zoom-/Geräte-Invarianz, (3) Visual-Regression (Golden-Screenshots), (4) Feld-Abnahme durch Bauleiter vor V2-Aktivierung. Ebenen 1–3 laufen automatisiert als CI-Pflicht-Gate.

Begründung: Schichtung von schnell/deterministisch bis real fängt unterschiedliche Fehlerklassen (Mathematik, Render-Drift, Modell-/Messfehler).

## D-083 V2-Genauigkeit: Ground-Truth & Toleranz

Status: entschieden.

Die Auto-Zuordnung wird gegen einen **synthetischen Test-Plan mit exaktem Mapping** (deterministische CI-Fixtures) **plus eine real vermessene Validierungs-Site** geprüft. Toleranz: Position ≤ ~2–3 % der Planbreite, Blickrichtung ≤ ±10° (Feinwerte beim V2-Bau bestätigen).

Begründung: Objektives, automatisierbares Akzeptanzkriterium plus Realitäts-Check gegen Mess-/Modellfehler.

## D-084 Speicher-Quota-Ebene

Status: entschieden.

Speicher-Quota gilt **pro Organisation** (ein Speichertopf je Mandant); Verbrauch je Projekt dient nur der Anzeige.

Begründung: Passt zum Org-Abo, einfache Durchsetzung; entspricht dem Prototyp-Widget. Details: `docs/specs/32-storage-accounting-quotas.md`.

## D-085 Speicher-Limit-Verhalten

Status: entschieden.

Schwellen-Warnung (z.B. 80/90 %) + **harter Upload-Stopp bei 100 %** mit klarer Meldung; **nie automatisches Löschen**.

Begründung: Schutz vor Kostenexplosion ohne Datenverlust und ohne „plötzlichen" Abbruch.

## D-086 Speicher-Accounting entkoppelt von Billing (revidiert D-037)

Status: entschieden.

Verbrauchsmessung + **konfigurierbare Org-Quota (großzügiger Default) sind MVP** und unabhängig vom Abo-Modul. Billing mappt später nur Plan → Quota-Wert.

Begründung: Messen/Durchsetzen von Speicher ist Infrastruktur, nicht Kommerz; ohne Limit drohen unbegrenzte Cloud-Kosten ab Tag 1.

## D-087 Quota-Basis

Status: entschieden.

Auf die Quota zählen **Originale + Derivate** (Thumbnails/Transkodierung/Embeddings) + **soft-gelöschte bis zum Purge**; archivierte Projekte zählen weiter. Geführt als inkrementeller Zähler (Upload/Löschen/Purge) + periodischer Reconcile-Job gegen S3.

Begründung: Spiegelt die realen Speicherkosten; Zähler statt Bucket-Scan hält die Anzeige schnell.

## D-088 Hosting-Plattform

Status: Richtung entschieden, konkreter Anbieter offen.

**CH-primär** (D-019). Favorisiert: CH-Cloud/IaaS mit S3-kompatiblem Storage + GPU (z.B. Exoscale, Infomaniak, Swisscom). EU-Hyperscaler nur als Fallback gemäß D-019. Der finale Anbieter wird später gewählt, muss aber CH-primär erfüllen.

Begründung: Datenhoheit für CH-Baukunden; Anbieter-Festlegung braucht noch GPU-/Kosten-/Verfügbarkeitsabklärung. Details: `docs/specs/33-hosting-infrastructure.md`.

## D-089 Managed-Grad

Status: entschieden.

Mischung nach Reifegrad: pragmatischer Start, einzelne Dienste je nach Reife managed ↔ self-hosted. Backup-kritische Datenebene (Postgres) wo möglich managed (PITR); GPU-Inferenz und ClamAV self-hosted.

Begründung: Balanciert Ops-Last und Kontrolle bei kleinem Team; erlaubt Entwicklung über die Zeit.

## D-090 Deployment-Form

Status: entschieden.

Klassische VMs + Deploy-Skripte im MVP (Container optional später). 

Begründung: Vertraut und einfach für ein kleines Team. Trade-off bewusst akzeptiert: schlechtere Reproduzierbarkeit + unbequemeres Skalieren der Queue-/GPU-Worker → als Risiko/offener Punkt geführt (Container-Migration bei Skalierungsbedarf möglich).

## D-091 GPU-Hosting

Status: entschieden.

GPU-Inferenz für die KI-Suche läuft beim CH-Provider im gleichen Datenstandort; keine Bild-/Embedding-Daten verlassen die CH.

Begründung: Strikte Datenhoheit (konsistent mit D-018/D-019); höhere GPU-Kosten/Knappheit bewusst akzeptiert.

## D-092 Zentrale Datei-Abstraktion `stored_objects`

Status: entschieden.

Jede physische Datei (Foto/Video/Plan/Dokument/Audio) ist genau eine Zeile in `stored_objects` (+ `derivatives` für Thumbnails/Poster/Transkodierung/EXIF-bereinigte Kopie). Fachtabellen (`photos`, `plan_versions`, `documents`, …) verweisen darauf. Ersetzt das verstreute `photo_files`-Konzept.

Begründung: Scan, Quota, Derivate, signierte URLs und Löschung müssen nur an einer Stelle korrekt sein (DRY). Details: `docs/specs/34-storage-data-model.md`.

## D-093 Quota-Zähler via DB-Trigger

Status: entschieden.

Speicherverbrauch wird per DB-Trigger auf `stored_objects`/`derivatives` fortgeschrieben (+Größe bei INSERT, −Größe bei Hard-Delete/Purge; Soft-Delete senkt nicht). Periodischer Reconcile-Job gegen S3.

Begründung: Atomar mit der Mutation und nicht umgehbar — begründete Ausnahme zur „keine Trigger"-Default-Regel.

## D-094 Quarantäne als separater Bucket mit Move

Status: entschieden.

Uploads landen zuerst in einem separaten Quarantäne-Bucket; erst nach `scan_status='clean'` Verschiebung in den Haupt-Bucket + Weiterverarbeitung.

Begründung: Infizierte Bytes liegen nie im ausgelieferten Bucket; klarere Isolation als ein reines Zugriffs-Gate (zusätzliche Kopie bewusst akzeptiert).

## D-095 Auslieferung aktiver Inhalte (Security-Review F1/F5)

Status: entschieden.

Nutzerdateien werden von einer **separaten Sandbox-Domain** ausgeliefert; Dokumente/Pläne mit `Content-Disposition: attachment`; ausgelieferter `Content-Type` serverseitig aus Magic Bytes + `X-Content-Type-Options: nosniff`; SVG verboten oder serverseitig sanitisiert; strikte CSP.

Begründung: Verhindert Stored XSS und Content-Sniffing über hochgeladene Dateien (SVG/HTML/Polyglot). Details: `docs/specs/34-storage-data-model.md` §8a.

## D-096 Autorisierung bei jeder Signed-URL-Ausstellung (F2)

Status: entschieden.

Signed-URLs werden nur nach **frischer RLS+RBAC-Prüfung über die geprüfte Query** ausgestellt, nie per Roh-ID signiert; kurze TTL (D-014); vollständige signierte URLs werden nicht geloggt.

Begründung: Eine Signed-URL umgeht nach Ausstellung RLS/RBAC — die Autorisierung muss davor sitzen (IDOR-Schutz).

## D-097 Nur EXIF-bereinigte Variante ausliefern (F3)

Status: entschieden.

View **und** Download liefern ausschließlich die `web_stripped`-Variante; das Roh-Original ist nie signierbar (nur interne Verarbeitung).

Begründung: GPS-/Gerätedaten dürfen die App nie verlassen (DSG), auch nicht bei Download-Recht.

## D-098 Scan-Gate-Invariante (F4)

Status: entschieden.

Keine Derivat-/Embedding-/Wetter-Erzeugung, kein Move in den Haupt-Bucket und keine Signed-URL, solange `scan_status ≠ clean`.

Begründung: Kein Schadcode gelangt an andere Nutzer, bevor der Scan erfolgreich ist.

## D-099 Fremdreferenz-Validierung (F6)

Status: entschieden.

Beim Insert/Update von Verweisen (`stored_object_id`, `plan_version_id`, …) wird erzwungen, dass die referenzierte Zeile zur selben `organization_id`/`project_id` gehört (Composite-FK oder Validierung im Transaktionskontext).

Begründung: Verhindert das „Anhängen" fremder Objekte an eigene Fachzeilen (IDOR trotz RLS auf SELECT).

## D-100 Soft-Delete-Filter bei Auslieferung (F7)

Status: entschieden.

Serving und Listing erzwingen `deleted_at IS NULL`; soft-gelöschte Objekte sind nicht mehr abrufbar (bis zum Purge).

Begründung: Gelöschte (vertrauliche) Dateien dürfen nicht über bekannte IDs/Signed-URLs zugänglich bleiben.

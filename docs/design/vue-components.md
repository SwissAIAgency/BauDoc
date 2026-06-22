---
**Zuletzt aktualisiert:** 2026-06-22
**Verantwortlich:** Lead Software Architect Agent / Frontend/UI Agent
**Status:** APPROVED
**Bezug:** docs/development/code-conventions.md, docs/design/system.md, PROTOTYP.md
---

# Vue-Komponenten-Konventionen

## Abhängigkeit

Diese Konventionen sind ab BD-005 (Vue-Komponentenbibliothek) verbindlich. Vor BD-001 dienen sie als Planungsbasis für das Frontend-Scaffolding.

---

## Verzeichnisstruktur

```
frontend/src/
├── components/
│   ├── ui/              ← atomare UI-Elemente (VdButton, VdInput, VdBadge …)
│   ├── layout/          ← App-Shell, Sidebar, Topbar, PageHeader
│   └── domain/          ← fachspezifische Bausteine (PhotoCard, PlanMarker …)
├── views/               ← Routen-gebundene Seiten (kein eigener persistenter State)
├── composables/         ← Logik ohne Template, use-Präfix
├── stores/              ← Pinia-Stores, kebab-case + Store-Suffix
├── types/               ← TypeScript-Interfaces und Enums
└── utils/               ← reine Hilfsfunktionen ohne Side Effects
```

---

## Namenskonventionen

| Typ | Konvention | Beispiel |
|---|---|---|
| Komponente (Datei) | `VdPascalCase.vue` | `VdPhotoCard.vue` |
| View (Datei) | `PascalCaseView.vue` | `ProjectGalleryView.vue` |
| Composable (Datei) | `usePascalCase.ts` | `usePhotoUpload.ts` |
| Pinia-Store (Datei) | `kebab-case-store.ts` | `photo-store.ts` |
| TypeScript-Interface | `PascalCase` | `PhotoResource`, `PlanVersion` |
| Enum | `PascalCase` | `UserRole`, `PhotoStatus` |
| CSS-Klasse (global) | `.vd-kebab-case` | `.vd-photo-card` |
| CSS-Klasse (bereich) | `.vd-gal-kebab-case` | `.vd-gal-filter-row` |

Präfixe für globale Komponenten immer `Vd` — verhindert Kollisionen mit HTML-Elementen und externen Libraries.

---

## Komponenten-Anatomie

Reihenfolge innerhalb `<script setup lang="ts">` ist verbindlich:

```vue
<script setup lang="ts">
// 1. Imports (externe Libs → interne Utils → Stores → Composables → Typen)
import { ref, computed, onUnmounted } from 'vue'
import { usePhotoStore } from '@/stores/photo-store'
import type { PhotoResource } from '@/types'

// 2. Props
interface Props {
  photoId: string
  isLoading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})

// 3. Emits
const emit = defineEmits<{
  (e: 'upload-success', photoId: string): void
  (e: 'cancel'): void
}>()

// 4. Stores und Composables
const photoStore = usePhotoStore()

// 5. Lokaler State
const isExpanded = ref(false)

// 6. Computed Properties
const displayName = computed(() => /* ... */)

// 7. Watchers (sparsam einsetzen)

// 8. Lifecycle Hooks
onUnmounted(() => { /* Cleanup */ })

// 9. Handler und Methoden
function handleSubmit() { /* ... */ }
</script>

<template>
  <!-- Einziges Root-Element oder Fragment (<>) -->
</template>

<style scoped>
/* Nur CSS-Variablen aus app-shell.css — kein Hardcoding von Farben oder Abständen */
</style>
```

---

## Props

```typescript
interface Props {
  photoId: string
  status?: 'pending' | 'approved' | 'archived'
  isLoading?: boolean
  hasError?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  status: 'pending',
  isLoading: false,
  hasError: false,
})
```

Regeln:
- Kein `any` als Prop-Typ.
- Boolean Props mit `is`- oder `has`-Präfix: `isLoading`, `hasError`, `isDisabled`.
- Callback Props vermeiden — stattdessen `emit`.
- Keine Businesslogik in Props-Validierungsfunktionen.
- Props sind readonly — niemals direkt mutieren.

---

## Emits

```typescript
const emit = defineEmits<{
  (e: 'upload-success', photoId: string): void
  (e: 'upload-error', error: string): void
  (e: 'cancel'): void
}>()
```

- Ereignisnamen in `kebab-case`.
- Props niemals direkt mutieren — immer `emit`.
- Side Effects (API-Calls) gehören ins Composable, nicht direkt in den Event-Handler.
- Mehr als zwei Emit-Ebenen nach oben → Store oder `provide/inject` statt Prop-Drilling.

---

## Composables

```typescript
// composables/usePhotoUpload.ts
export function usePhotoUpload(projectId: Ref<string>) {
  const isUploading = ref(false)
  const error = ref<string | null>(null)
  const progress = ref(0)

  async function upload(file: File): Promise<string | null> {
    isUploading.value = true
    error.value = null
    try {
      // API-Aufruf
      return photoId
    } catch (e) {
      error.value = 'Upload fehlgeschlagen.'
      return null
    } finally {
      isUploading.value = false
    }
  }

  onUnmounted(() => {
    // Laufende Requests abbrechen (AbortController)
  })

  return { isUploading, error, progress, upload }
}
```

Regeln:
- Nur Logik, kein Template-Code.
- Rückgabewerte reaktiv (Refs), keine rohen Werte.
- Fehler als `error`-Ref zurückgeben, nicht als unbehandelter throw in der Komponente.
- Cleanup immer in `onUnmounted`.
- Composables sind eigenständig testbar.

---

## Pinia-Stores

```typescript
// stores/photo-store.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PhotoResource } from '@/types'

export const usePhotoStore = defineStore('photo', () => {
  const photos = ref<PhotoResource[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPhotos(projectId: string) {
    isLoading.value = true
    error.value = null
    try {
      // API-Aufruf
    } catch {
      error.value = 'Fotos konnten nicht geladen werden.'
    } finally {
      isLoading.value = false
    }
  }

  function reset() {
    photos.value = []
    error.value = null
  }

  return { photos, isLoading, error, fetchPhotos, reset }
})
```

Regeln:
- Setup-Store-Syntax (Composition API) — keine Options-Syntax.
- Kein direktes API-Fetching in Komponenten — immer über Store oder Composable.
- Stores nicht für lokalen Komponentenzustand verwenden.
- Pro Domäne ein Store: `auth-store`, `project-store`, `photo-store`, `plan-store`, `notification-store`.
- `reset()`-Methode vorsehen, damit Store bei Logout/Projektwechsel geleert werden kann.

---

## CSS-Konventionen

- CSS-Variablen aus `app-shell.css` verwenden — keine Hardcodes für Farben, Abstände, Radien.
- VisiDoc-Präfixsystem: `.vd-` (global), `.vd-gal-` (Galerie), `.vd-proj-` (Projekt) usw. — vollständige Liste in `docs/development/code-conventions.md`.
- `scoped` immer gesetzt.
- Kein `!important`.
- Kein globales Styling aus Scoped-Styles.
- Komplexe Scoped-Styles mit BEM-ähnlicher Benennung strukturieren.

---

## Komponent-Zustände (Pflicht)

Jede interaktive Komponente oder Liste muss diese Zustände explizit behandeln:

| Zustand | Pflicht | Anforderung |
|---|---|---|
| Default | Pflicht | Normaler Betrieb mit Daten |
| Loading | Pflicht bei async | Skeleton-Loader oder Spinner — kein leeres Layout |
| Error | Pflicht | Verständliche Meldung, kein Stack-Trace sichtbar |
| Empty | Pflicht bei Listen/Galerie | Erklärung + nächste sinnvolle Aktion |
| Disabled | Bei Bedarf | Visuell klar, nicht interaktiv, Grund erkennbar |

---

## Verbotene Muster

- Komplexe Berechnungen direkt in `<template>` — gehören in `computed`.
- Direkte `fetch`/`axios`-Calls in `<script setup>` ohne Composable oder Store.
- `watch` mit Seiteneffekten auf Props ohne Cleanup.
- Prop-Drilling über mehr als zwei Ebenen.
- Inline-Styles für Designentscheidungen (Farbe, Abstand, Radius).
- Businesslogik in `<template>`-Event-Handlern.
- Globale CSS-Selektor-Overrides aus Komponenten.

---

## Änderungshistorie

| Datum | Version | Änderung |
|---|---|---|
| 2026-06-22 | 1.0.0 | Initiale Fassung (Long-Term Milestone L-1) |

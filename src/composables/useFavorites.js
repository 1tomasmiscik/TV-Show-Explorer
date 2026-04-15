import { ref, computed } from 'vue'

const STORAGE_KEY = 'tv_favorites'

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return parsed
  } catch (e) {
    console.error('Failed to load favorites', e)
    return []
  }
}

function saveFavorites(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch (e) {
    console.error('Failed to save favorites', e)
  }
}

function mapFavorite(show) {
  // store a minimal shape to keep localStorage small
  return {
    id: show.id,
    name: show.name,
    image: show.image ?? null,
    summary: show.summary ?? '',
  }
}

// shared reactive state across the app
const favorites = ref(loadFavorites())

// keep in sync across tabs/windows
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) {
    favorites.value = e.newValue ? JSON.parse(e.newValue) : []
  }
})

export function useFavorites() {
  function isFavorite(id) {
    return favorites.value.some((item) => item.id === Number(id) || item.id === id)
  }

  function addFavorite(show) {
    const id = show.id
    if (isFavorite(id)) return false
    const next = [...favorites.value, mapFavorite(show)]
    favorites.value = next
    saveFavorites(next)
    return true
  }

  function removeFavorite(id) {
    const next = favorites.value.filter((item) => item.id !== Number(id) && item.id !== id)
    favorites.value = next
    saveFavorites(next)
    return true
  }

  function toggleFavorite(show) {
    const exists = isFavorite(show.id)
    if (exists) {
      removeFavorite(show.id)
    } else {
      addFavorite(show)
    }
    return !exists
  }

  return {
    favorites: computed(() => favorites.value),
    isFavorite,
    toggleFavorite,
  }
}

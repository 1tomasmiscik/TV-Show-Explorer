const STORAGE_KEY = 'tv_favorites'

const emitter = new EventTarget()

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('Failed to read favorites', e)
    return []
  }
}

function write(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    emitter.dispatchEvent(new CustomEvent('change', { detail: list }))
  } catch (e) {
    console.error('Failed to write favorites', e)
  }
}

export function getFavorites() {
  return read()
}

export function isFavorite(id) {
  const list = read()
  return list.some((item) => item.id === Number(id) || item.id === id)
}

export function addFavorite(show) {
  const list = read()
  const id = show.id
  if (list.some((item) => item.id === id)) return
  list.push(show)
  write(list)
}

export function removeFavorite(id) {
  const list = read()
  const next = list.filter((item) => item.id !== Number(id) && item.id !== id)
  write(next)
}

export function toggleFavorite(show) {
  const id = show.id
  if (isFavorite(id)) {
    removeFavorite(id)
    return false
  } else {
    addFavorite(show)
    return true
  }
}

export function onChange(callback) {
  emitter.addEventListener('change', callback)
}

export function offChange(callback) {
  emitter.removeEventListener('change', callback)
}

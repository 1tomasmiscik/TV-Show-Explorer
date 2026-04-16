const BASE_URL = 'https://api.tvmaze.com'
export async function searchShows(query) {
  const normalizedQuery = query.trim()
  if (!normalizedQuery) return []

  const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(normalizedQuery)}`)

  if (!response.ok) {
    throw new Error('Failed to fetch shows')
  }
  const data = await response.json()
  return data.map((result) => result.show)
}

export async function getShowDetails(id) {
  const response = await fetch(`${BASE_URL}/shows/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch show details')
  }
  const data = await response.json()
  return data
}

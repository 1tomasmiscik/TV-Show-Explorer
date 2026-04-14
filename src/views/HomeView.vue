<template>
  <div class="home-view">
    <div class="container">
      <header class="home-view__header">
        <h1>TV Show Explorer</h1>
      </header>

      <div class="home-view__search">
        <input
          type="text"
          placeholder="Search for TV shows..."
          v-model="query"
          @keyup.enter="handleSearch"
        />
        <button type="button" @click="handleSearch" :disabled="loading || !query.trim()">
          {{ loading ? 'Searching...' : 'Search' }}
        </button>
      </div>

      <div class="home-view__results">
        <p v-if="loading">Loading...</p>
        <p v-else-if="errorMessage">
          {{ errorMessage }}
        </p>
        <p v-else-if="hasSearched && results.length === 0">No TV shows found.</p>
        <div v-if="results.length > 0">
          <h2>Search Results</h2>
          <div class="results-grid">
            <div v-for="show in results" :key="show.id" class="result-item">
              <router-link
                :to="{ name: 'show-detail', params: { id: show.id } }"
                class="result-link"
              >
                <h3 class="result-title">{{ show.name }}</h3>

                <div class="image-wrap">
                  <img
                    v-if="show.image"
                    :src="show.image.medium"
                    :alt="show.name"
                    class="result-image"
                    loading="lazy"
                  />
                  <div v-else class="result-placeholder">No image</div>
                </div>

                <div class="card-body">
                  <p class="summary">
                    {{
                      show.summary ? truncate(stripHtml(show.summary), 70) : 'No summary available.'
                    }}
                  </p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { searchShows } from '../services/tvmazeService'
  import { decode } from 'html-entities'

  const query = ref('')
  const results = ref([])

  const loading = ref(false)
  const errorMessage = ref('')
  const hasSearched = ref(false)

  const handleSearch = async () => {
    if (!query.value.trim()) {
      return
    }

    hasSearched.value = true
    loading.value = true
    errorMessage.value = ''

    try {
      const data = await searchShows(query.value)
      results.value = data
    } catch (error) {
      console.error('Error searching shows:', error)
      errorMessage.value = 'An error occurred while searching. Please try again.'
      results.value = []
    } finally {
      loading.value = false
    }
  }

  function stripHtml(html) {
    if (!html) return ''
    // remove HTML tags
    let text = html.replace(/<[^>]*>/g, '')
    // normalize spaced amp variants like "& amp;" -> "&amp;"
    text = text.replace(/&\s*amp\s*;/gi, '&amp;')
    // decode entities (named, numeric, hex). html-entities handles double-encoding too.
    try {
      return decode(text)
    } catch (e) {
      return text
    }
  }

  function truncate(text, max = 70) {
    if (!text) return ''
    const chars = Array.from(text)
    return chars.length > max ? chars.slice(0, max).join('').trimEnd() + '...' : text
  }
</script>

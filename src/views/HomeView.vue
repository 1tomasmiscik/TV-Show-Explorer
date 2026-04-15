<template>
  <div class="home-view">
    <div class="container">
      <header class="home-view__header">
        <h1>TV Show Explorer</h1>
      </header>

      <SearchBar :loading="loading" @search="handleSearch" />

      <div class="home-view__results">
        <p v-if="loading">Loading...</p>
        <p v-else-if="errorMessage">
          {{ errorMessage }}
        </p>
        <p v-else-if="hasSearched && results.length === 0">No TV shows found.</p>
        <div v-if="results.length > 0">
          <h2>Search Results</h2>
          <ShowList :items="results" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { searchShows } from '../services/tvmazeService'
  import SearchBar from '../components/search/SearchBar.vue'
  import ShowList from '../components/shows/ShowList.vue'

  const results = ref([])

  const loading = ref(false)
  const errorMessage = ref('')
  const hasSearched = ref(false)

  const handleSearch = async (value) => {
    if (!value.trim()) {
      return
    }

    hasSearched.value = true
    loading.value = true
    errorMessage.value = ''

    try {
      const data = await searchShows(value)
      results.value = data
    } catch (error) {
      console.error('Error searching shows:', error)
      errorMessage.value = 'An error occurred while searching. Please try again.'
      results.value = []
    } finally {
      loading.value = false
    }
  }
</script>

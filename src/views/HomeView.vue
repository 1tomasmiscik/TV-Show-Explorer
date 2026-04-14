<template>
    <div class="home-view">
        <header class="home-view__header">
            <h1>Welcome to the Home View</h1>
            <p>This is the main content of the home page.</p>
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
            <div v-for="show in results" :key="show.id">
                <p v-if="loading">
                    Loading...
                </p>
                <p v-else-if="errorMessage">
                    {{ errorMessage }}
                </p>
                <p v-else-if="hasSearched && results.length === 0">
                    No TV shows found.
                </p>
                <div v-if="results.length > 0">
                    <h2>Search Results</h2>
                    <h2>{{ show.name }}</h2>
                    <img v-if="show.image" :src="show.image.medium" :alt="show.name" />
                    <p class="summary">
                        {{ show.summary ? stripHtml(show.summary) : 'No summary available.' }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { searchShows } from '../services/tvmazeService'

const query = ref('')
const results = ref([])

const loading = ref(false)
const errorMessage = ref('')
const hasSearched = ref(false)

const handleSearch = async() => {
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
    } finally {
        loading.value = false
    }
}

function stripHtml(html) {
    if (!html) return ''
    return html.replace(/<[^>]*>/g, '')
}
</script>
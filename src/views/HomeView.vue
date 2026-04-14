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
            <button type="button" @click="handleSearch">Search</button>
        </div>

        <div class="home-view__results">
            <h2>Search Results</h2>
            <div v-for="show in results" :key="show.id">
                <h2>{{ show.name }}</h2>
                <img v-if="show.image" :src="show.image.medium" :alt="show.name" />
                <p class="summary" v-if="show.summary">{{ stripHtml(show.summary) }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { searchShows } from '../services/tvmazeService'

const query = ref('')
const results = ref([])

const handleSearch = async() => {
    if (!query.value.trim()) {
        return
    }

    const data = await searchShows(query.value)
    results.value = data
}

function stripHtml(html) {
    if (!html) return ''
    return html.replace(/<[^>]*>/g, '')
}
</script>
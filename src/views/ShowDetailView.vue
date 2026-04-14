<template>
  <div class="show-detail-view">
    <div v-if="loading">Loading show…</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h1>{{ show.name }}</h1>
      <div class="meta">
        <span v-if="show.premiered">Premiered: {{ show.premiered }}</span>
        <span v-if="show.runtime"> • {{ show.runtime }} min</span>
      </div>

      <div class="content">
        <img v-if="show.image" :src="show.image.medium || show.image.original" :alt="show.name" />
        <div class="details">
          <p v-if="show.genres && show.genres.length">Genres: {{ show.genres.join(', ') }}</p>
          <p v-if="show.network">Network: {{ show.network.name }}</p>
          <p class="summary" v-if="show.summary">{{ stripHtml(show.summary) }}</p>
        </div>
      </div>

      <router-link to="/">← Back to search</router-link>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getShowDetails } from '../services/tvmazeService'
  import { decode } from 'html-entities'

  const route = useRoute()
  const id = route.params.id

  const show = ref(null)
  const loading = ref(true)
  const error = ref('')

  function stripHtml(html) {
    if (!html) return ''
    // remove tags
    let text = html.replace(/<[^>]*>/g, '')
    // normalize spaced amp variants
    text = text.replace(/&\s*amp\s*;/gi, '&amp;')
    // try decode (handle double-encoded by repeating few times)
    try {
      const max = 5
      let pass = 0
      let prev = text
      while (pass < max) {
        const decoded = decode(prev)
        if (decoded === prev) break
        prev = decoded
        pass++
      }
      return prev
    } catch (e) {
      return text
    }
  }

  async function load() {
    loading.value = true
    error.value = ''
    try {
      show.value = await getShowDetails(id)
    } catch (err) {
      console.error('Failed to load show details', err)
      error.value = 'Could not load show details.'
    } finally {
      loading.value = false
    }
  }

  onMounted(load)
</script>

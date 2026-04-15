<template>
  <div class="show-detail-view">
    <div v-if="loading">Loading show…</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="detail-header">
        <h1>{{ show.name }}</h1>
        <FavoriteButton :active="isFav" @toggle="toggleFav" />
      </div>
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
  import { ref, computed, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { getShowDetails } from '../services/tvmazeService'
  import { useFavorites } from '../composables/useFavorites'
  import { stripHtml } from '../utils/text'
  import FavoriteButton from '../components/buttons/FavoriteButton.vue'

  const route = useRoute()

  const id = computed(() => route.params.id)

  const show = ref(null)
  const loading = ref(true)
  const error = ref('')

  const { isFavorite, toggleFavorite } = useFavorites()
  const isFav = computed(() => isFavorite(id.value))

  async function load(id) {
    if (!id) return
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

  function toggleFav() {
    if (!show.value) return
    toggleFavorite(show.value)
  }

  watch(
    () => id.value,
    async (newId) => {
      if (!newId) return
      await load(newId)
    },
    { immediate: true },
  )

</script>

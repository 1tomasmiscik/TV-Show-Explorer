<template>
  <div class="show-detail-view">
    <div v-if="loading">Loading show…</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="detail-header">
        <h1 style="margin: 0">{{ show.name }}</h1>
        <button
          class="fav-btn"
          :class="{ active: isFav }"
          @click="toggleFav"
          :aria-pressed="isFav"
          :title="isFav ? 'Remove from favorites' : 'Add to favorites'"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.1959 6.98709C17.5699 4.89134 14.3061 5.24282 13.1635 7.63669C12.6965 8.61527 11.3035 8.61527 10.8365 7.63669C9.69394 5.24282 6.43011 4.89135 4.8041 6.98709L4.49475 7.38581C3.08665 9.2007 3.28996 11.7888 4.96418 13.3616L11.9168 19.8928C11.9479 19.922 11.9753 19.9477 12 19.9708C12.0247 19.9477 12.0521 19.922 12.0832 19.8928L19.0358 13.3616C20.71 11.7888 20.9133 9.2007 19.5052 7.38581L19.1959 6.98709ZM12 6.62866C13.7697 3.5573 18.1553 3.19885 20.381 6.06759L20.6904 6.46631C22.5728 8.89249 22.301 12.3524 20.0628 14.4548L13.0927 21.0026C12.9885 21.1005 12.8747 21.2075 12.7673 21.2902C12.6438 21.3853 12.4712 21.4954 12.2407 21.5406C12.0818 21.5718 11.9182 21.5718 11.7593 21.5406C11.5288 21.4954 11.3562 21.3853 11.2327 21.2902C11.1253 21.2075 11.0115 21.1005 10.9073 21.0026L3.93717 14.4548C1.69903 12.3524 1.42724 8.8925 3.30962 6.46632L3.61898 6.06759C5.84473 3.19885 10.2303 3.55729 12 6.62866Z"
              :fill="isFav ? '#e50914' : '#7a7a7a'"
            />
          </svg>
        </button>
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
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getShowDetails } from '../services/tvmazeService'
  import { decode } from 'html-entities'
  import { isFavorite, toggleFavorite, onChange, offChange } from '../services/favoritesService.js'
  import { stripHtml } from '../utils/text'

  const route = useRoute()
  const id = route.params.id

  const show = ref(null)
  const loading = ref(true)
  const error = ref('')
  const isFav = ref(false)

  let favCallback = null

  async function load() {
    loading.value = true
    error.value = ''
    try {
      show.value = await getShowDetails(id)
      try {
        isFav.value = isFavorite(id)
      } catch (e) {
        // if favorites service fails, leave isFav false
      }
    } catch (err) {
      console.error('Failed to load show details', err)
      error.value = 'Could not load show details.'
    } finally {
      loading.value = false
    }
  }

  function toggleFav() {
    if (!show.value) return
    const now = toggleFavorite(show.value)
    isFav.value = now
  }

  onMounted(() => {
    load()
    favCallback = () => {
      try {
        isFav.value = isFavorite(id)
      } catch (e) {
        // ignore
      }
    }
    try {
      onChange(favCallback)
    } catch (e) {
      // ignore subscription errors
    }
  })

  onUnmounted(() => {
    if (favCallback) {
      try {
        offChange(favCallback)
      } catch (e) {
        // ignore
      }
    }
  })
</script>

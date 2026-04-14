<template>
  <div class="favorites-view container">
    <h1>Favorites</h1>
    <div v-if="favorites.length === 0" class="muted">No favorites yet.</div>
    <div v-else class="results-grid">
      <div v-for="show in favorites" :key="show.id" class="result-item">
        <router-link :to="{ name: 'show-detail', params: { id: show.id } }" class="result-link">
          <h3 class="result-title">{{ show.name }}</h3>
          <div class="image-wrap">
            <img v-if="show.image" :src="show.image.medium" :alt="show.name" class="result-image" />
            <div v-else class="result-placeholder">No image</div>
          </div>
          <div class="card-body">
            <p class="summary">
              {{ show.summary ? truncate(stripHtml(show.summary), 70) : 'No summary available.' }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { getFavorites, onChange, offChange } from '../services/favoritesService'
  import { stripHtml, truncate } from '../utils/text'

  const favorites = ref([])

  function refresh() {
    favorites.value = getFavorites()
  }

  onMounted(() => {
    refresh()
    onChange(refresh)
  })

  onUnmounted(() => {
    offChange(refresh)
  })
</script>

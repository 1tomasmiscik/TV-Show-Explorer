<template>
  <div class="favorites-view container">
    <h1>Favorites</h1>
    <div v-if="favorites.length === 0" class="muted">No favorites yet.</div>
    <div v-else>
      <ShowList :items="favorites" />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { getFavorites, onChange, offChange } from '../services/favoritesService'
  import ShowList from '../components/shows/ShowList.vue'

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

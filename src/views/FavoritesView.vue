<template>
  <div class="favorites-view container">
    <h1>Favorites</h1>
    <div v-if="favorites.length === 0" class="muted">No favorites yet.</div>
    <div v-else>
      <ShowList :shows="favorites" />
    </div>
  </div>
</template>

<script setup>
  import ShowList from '../components/shows/ShowList.vue'
  import { useFavorites } from '../composables/useFavorites'

  const { favorites } = useFavorites()
</script>

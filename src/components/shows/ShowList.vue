<template>
  <div class="results-grid">
    <ShowCard v-for="show in shows" :key="show.id" :show="show" />
  </div>
</template>

<script setup>
  import ShowCard from './ShowCard.vue'
  const props = defineProps({
    shows: { type: Array, default: () => [] },
  })
</script>

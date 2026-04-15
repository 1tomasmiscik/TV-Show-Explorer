<template>
  <div class="results-grid">
    <ShowCard v-for="show in items" :key="show.id" :show="show" />
  </div>
</template>

<script setup>
import ShowCard from './ShowCard.vue'
const props = defineProps({
  items: { type: Array, default: () => [] },
})
</script>

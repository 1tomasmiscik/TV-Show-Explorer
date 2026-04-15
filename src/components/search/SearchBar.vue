<template>
  <div class="home-view__search">
    <input
      type="text"
      placeholder="Search for TV shows..."
      :value="searchText"
      @input="onInput"
      @keyup.enter="onSubmit"
    />
    <button type="button" @click="onSubmit" :disabled="props.loading || !searchText.trim()">
      {{ props.loading ? 'Searching...' : 'Search' }}
    </button>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
  })
  const emit = defineEmits(['search'])

  const searchText = ref('')

  function onInput(e) {
    searchText.value = e.target.value
  }

  function onSubmit() {
    const trimmed = searchText.value ? searchText.value.trim() : ''
    if (!trimmed) return
    emit('search', trimmed)
  }
</script>

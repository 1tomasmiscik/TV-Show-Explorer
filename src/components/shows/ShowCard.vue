<template>
  <div class="result-item">
    <router-link :to="{ name: 'show-detail', params: { id: show.id } }" class="result-link">
      <h3 class="result-title">{{ show.name }}</h3>

      <div class="image-wrap">
        <img
          v-if="show.image"
          :src="showImage"
          :alt="show.name"
          class="result-image"
          loading="lazy"
        />
        <div v-else class="result-placeholder">No image</div>
      </div>

      <div class="card-body">
        <p class="summary">
          {{ show.summary ? truncate(stripHtml(show.summary), 70) : 'No summary available.' }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { stripHtml, truncate } from '../../utils/text'
  const props = defineProps({
    show: { type: Object, required: true },
  })

  const showImage = computed(() => {
    const img = props.show.image
    if (!img) return null
    return img.medium || img.original || null
  })
</script>

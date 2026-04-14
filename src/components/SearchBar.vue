<template>
  <div class="home-view__search">
    <input
      type="text"
      placeholder="Search for TV shows..."
      :value="modelValue"
      @input="onInput"
      @keyup.enter="onSubmit"
    />
    <button type="button" @click="onSubmit" :disabled="loading || !modelValue.trim()">
      {{ loading ? 'Searching...' : 'Search' }}
    </button>
  </div>
</template>

<script setup>
import { toRef } from 'vue'
const props = defineProps({
  modelValue: { type: String, default: '' },
  loading: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'search'])

const modelValue = toRef(props, 'modelValue')

function onInput(e) {
  emit('update:modelValue', e.target.value)
}

function onSubmit() {
  if (!modelValue.value || !modelValue.value.trim()) return
  emit('search', modelValue.value.trim())
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" class="nav-link" :class="{ active: route.name === 'home' }"
        >Home</RouterLink
      >
      <RouterLink to="/favorites" class="nav-link" :class="{ active: route.name === 'favorites' }"
        >Favorites</RouterLink
      >
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<script setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
</script>

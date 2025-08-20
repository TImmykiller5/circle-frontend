<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
</script>

<template>
  <header class="sticky top: 0 z-10 bg-white">
    <AppNavbar />
  </header>
  <RouterView />
</template>

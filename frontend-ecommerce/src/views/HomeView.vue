<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
</script>

<template>
  <main>
    <AppHeader />
    <router-view/>
    <AppFooter />
  </main>
</template>

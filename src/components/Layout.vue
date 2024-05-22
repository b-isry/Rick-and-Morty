<template>
  <div>
    <main class="min-h-screen">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Footer from './Footer.vue';
</script>

<style scoped>
header {
  margin-bottom: 1rem;
}
main {
  padding: 1rem;
}
</style>

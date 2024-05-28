<template>
  <header class="bg-lime-900 text-white shadow-md sticky top-0 left-0 w-full z-50 p-4">
    <div class="container mx-auto flex justify-between items-center py-4 px-6">
      <div class="flex items-center">
        <h1 class="text-2xl font-bold">Rick and Morty</h1>
      </div>
      <nav class="hidden md:flex">
        <ul class="flex space-x-6">
          <li><a href="#" class="hover:text-green-400">Home</a></li>
          <li><a href="#characters" class="hover:text-green-400">Characters</a></li>
          <li><a href="#episodes" class="hover:text-green-400">Episodes</a></li>
          <li><a href="#locations" class="hover:text-green-400">Location</a></li>
        </ul>
      </nav>
      <div class="md:hidden">
        <button @click="toggleMenu" class="text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="isMenuOpen" class="md:hidden">
      <ul class="flex flex-col space-y-4 px-6 py-4">
        <li><a href="#" class="hover:text-green-400">Home</a></li>
        <li><a href="#characters" class="hover:text-green-400">Characters</a></li>
        <li><a href="#episodes" class="hover:text-green-400">Episodes</a></li>
        <li><a href="#locations" class="hover:text-green-400">Location</a></li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
</style>

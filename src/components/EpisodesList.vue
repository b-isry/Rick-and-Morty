<template>
  <section id="episodes" class="py-12 bg-lime-50">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-lime-300 mb-6 text-center">Episodes</h2>
      <ul v-if="episodes" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li v-for="episode in episodes" :key="episode.id" class="bg-lime-800 rounded-lg p-4" @click="goToEpisode(episode.id)">
          <h3 class="text-xl font-semibold text-white cursor-pointer">{{ episode.name }}</h3>
          <p class="text-gray-300 mt-2">Air Date: {{ episode.air_date }}</p>
        </li>
      </ul>
      <p v-else class="text-white">Loading episodes...</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const episodes = ref(null);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/episode');
    const data = await response.json();
    episodes.value = data.results;
  } catch (error) {
    console.error('Error fetching episodes:', error);
  }
});

function goToEpisode(episodeId) {
  router.push({ name: 'Episode', params: { id: episodeId } });
}
</script>

<style scoped>
</style>



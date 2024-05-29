<template>
  <section id="episodes" class="py-12 bg-lime-50">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-lime-300 mb-6 text-center">Episodes</h2>
      <div v-if="loading" class="text-center text-lime-800">Loading episodes...</div>
      <div v-else-if="error" class="text-center text-red-500">Error loading episodes</div>
      <ul v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li 
          v-for="episode in episodes" 
          :key="episode.id" 
          class="bg-lime-800 rounded-lg p-4 cursor-pointer transition transform hover:scale-105" 
          @click="goToEpisode(episode.id)"
        >
          <h3 class="text-xl font-semibold text-white">{{ episode.name }}</h3>
          <p class="text-gray-300 mt-2">Air Date: {{ episode.air_date }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useRouter } from 'vue-router';

const GET_EPISODES = gql`
  query {
    episodes {
      results {
        id
        name
        air_date
      }
    }
  }
`;

const episodes = ref([]);
const router = useRouter();
const { onResult, loading, error } = useQuery(GET_EPISODES);

onResult((result) => {
  if (result.data) {
    episodes.value = result.data.episodes.results;
  }
});

function goToEpisode(episodeId) {
  router.push({ path: `/episode/${episodeId}` });
}
</script>

<style scoped>
.bg-lime-800:hover {
  background-color: rgb(54 83 20); 
}
</style>





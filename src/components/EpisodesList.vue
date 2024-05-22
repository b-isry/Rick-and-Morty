<template>
  <section id="episodes" class="py-12 bg-lime-50">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-lime-300 mb-6 text-center">Episodes</h2>
      <ul v-if="!loading && episodes.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li v-for="episode in episodes" :key="episode.id" class="bg-lime-800 rounded-lg p-4" @click="goToEpisode(episode.id)">
          <h3 class="text-xl font-semibold text-white cursor-pointer">{{ episode.name }}</h3>
          <p class="text-gray-300 mt-2">Air Date: {{ episode.air_date }}</p>
        </li>
      </ul>
      <p v-else class="text-white text-center">Loading episodes...</p>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';
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

const { result, loading } = useQuery(GET_EPISODES);
const episodes = ref([]);
const router = useRouter();

watch(result, () => {
  if (result.value) {
    episodes.value = result.value.episodes.results;
  }
});

function goToEpisode(episodeId) {
  router.push({ path: `/episode/${episodeId}` });
}
</script>

<style scoped>
</style>






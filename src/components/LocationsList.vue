<template>
  <section id="locations" class="py-12 bg-lime-50">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-lime-300 mb-6 text-center">Locations</h2>
      <div v-if="loading" class="text-center text-lime-800">Loading locations...</div>
      <div v-else-if="error" class="text-center text-red-500">Error loading locations</div>
      <ul v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li 
          v-for="location in locations" 
          :key="location.id" 
          class="bg-lime-800 rounded-lg p-4 cursor-pointer transition transform hover:scale-105" 
          @click="goToLocation(location.id)"
        >
          <h3 class="text-xl font-semibold text-white">{{ location.name }}</h3>
          <p class="text-gray-300 mt-2">Type: {{ location.type }}</p>
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

const GET_LOCATIONS = gql`
  query {
    locations {
      results {
        id
        name
        type
      }
    }
  }
`;

const locations = ref([]);
const router = useRouter();
const { onResult, loading, error } = useQuery(GET_LOCATIONS);

onResult((result) => {
  if (result.data) {
    locations.value = result.data.locations.results;
  }
});

function goToLocation(locationId) {
  router.push({ name: 'Location', params: { id: locationId } });
}
</script>

<style scoped>
.bg-lime-800:hover {
  background-color: #1b5f12; /* Darker lime green on hover */
}
</style>

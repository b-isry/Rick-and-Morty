<template>
  <section id="locations" class="py-12 bg-lime-50">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-lime-300 mb-6 text-center">Locations</h2>
      <ul v-if="locations" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li v-for="location in locations" :key="location.id" class="bg-lime-800 rounded-lg p-4" @click="goToLocation(location.id)">
          <h3 class="text-xl font-semibold text-white cursor-pointer">{{ location.name }}</h3>
          <p class="text-gray-300 mt-2">Type: {{ location.type }}</p>
        </li>
      </ul>
      <p v-else class="text-white">Loading locations...</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';


const locations = ref(null);
const router = useRouter();


onMounted(async () => {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/location');
    const data = await response.json();
    locations.value = data.results;
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
});

function goToLocation(locationId) {
  router.push({ name: 'Location', params: { id: locationId } });
}
</script>

<style scoped>
</style>

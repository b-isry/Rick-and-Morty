<template>
  <section class="py-12 bg-lime-50">
    <div class="container mx-auto">
      <div v-if="location" class="mb-8">
        <h2 class="text-3xl font-bold mb-2 text-lime-300">{{ location.name }}</h2>
        <p class="text-gray-400">Type: {{ location.type }}</p>
        <p class="text-gray-400">Dimension: {{ location.dimension }}</p>
        <p class="text-gray-400">Created: {{ location.created }}</p>
      </div>
      <div v-if="residents.length > 0">
        <h3 class="text-2xl font-bold mb-4 text-lime-300">Residents</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="resident in residents" :key="resident.id" class="bg-lime-800 p-6 rounded-lg">
            <img :src="resident.image" :alt="resident.name" class="w-full h-32 object-cover mb-4 rounded">
            <h3 class="text-xl font-bold text-white">{{ resident.name }}</h3>
            <p class="text-gray-400">Status: {{ resident.status }}</p>
            <p class="text-gray-400">Species: {{ resident.species }}</p>
            <p class="text-gray-400">Gender: {{ resident.gender }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const location = ref(null);
const residents = ref([]);

const route = useRoute();
const locationId = route.params.id;

onMounted(async () => {
  try {
    // Fetch location details
    const locationResponse = await fetch(`https://rickandmortyapi.com/api/location/${locationId}`);
    const locationData = await locationResponse.json();
    location.value = {
      name: locationData.name,
      type: locationData.type,
      dimension: locationData.dimension,
      created: locationData.created,
    };

    // Fetch residents details
    const residentResponses = await Promise.all(
      locationData.residents.map(url => fetch(url))
    );
    const residentData = await Promise.all(
      residentResponses.map(response => response.json())
    );

    residents.value = residentData.map(resident => ({
      id: resident.id,
      name: resident.name,
      status: resident.status,
      species: resident.species,
      gender: resident.gender,
      image: resident.image,
    }));
  } catch (error) {
    console.error('Error fetching location details:', error);
  }
});
</script>

<style scoped>
</style>

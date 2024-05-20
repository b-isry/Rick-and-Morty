<template>
  <section class="self-center py-12 bg-lime-50">
    <div class="container mx-auto">
      <div v-if="character" class="mb-8">
        <h2 class="text-3xl font-bold mb-2 text-lime-300">Name: {{ character.name }}</h2>
        <img :src="character.image" :alt="character.name" class="w-48 h-48 object-cover mb-4 rounded">
        <p class="text-gray-400">Status: {{ character.status }}</p>
        <p class="text-gray-400">Species: {{ character.species }}</p>
        <p class="text-gray-400">Gender: {{ character.gender }}</p>
      </div>
      <div v-if="location" class="mb-8">
        <h3 class="text-2xl font-bold mb-4 text-lime-300">Last Known Location</h3>
        <p class="text-gray-400">{{ location.name }}</p>
      </div>
      <div v-if="episodes.length > 0">
        <h3 class="text-2xl font-bold mb-4 text-lime-300">Episodes</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="episode in episodes" :key="episode.id" class="bg-lime-800 p-6 rounded-lg">
            <h3 class="text-xl font-bold text-white">{{ episode.name }}</h3>
            <p class="text-gray-400">Air Date: {{ episode.air_date }}</p>
            <p class="text-gray-400">Episode: {{ episode.episode }}</p>
            <p class="text-gray-400">Created: {{ episode.created }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const character = ref(null);
const episodes = ref([]);
const location = ref(null);

const route = useRoute();
const characterId = route.params.id;

onMounted(async () => {
  try {
    const characterResponse = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
    const characterData = await characterResponse.json();
    character.value = {
      name: characterData.name,
      status: characterData.status,
      species: characterData.species,
      gender: characterData.gender,
      image: characterData.image,
    };

    const locationResponse = await fetch(characterData.location.url);
    const locationData = await locationResponse.json();
    location.value = {
      name: locationData.name,
    };

    const episodeResponses = await Promise.all(
      characterData.episode.map(url => fetch(url))
    );
    const episodeData = await Promise.all(
      episodeResponses.map(response => response.json())
    );

    episodes.value = episodeData.map(episode => ({
      id: episode.id,
      name: episode.name,
      air_date: episode.air_date,
      episode: episode.episode,
      created: episode.created,
    }));
  } catch (error) {
    console.error('Error fetching character details:', error);
  }
});
</script>

<style scoped>
</style>

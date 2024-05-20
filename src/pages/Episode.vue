<template>
  <section class="py-12 bg-lime-50">
    <div class="container mx-auto">
      <div v-if="episode" class="mb-8">
        <h2 class="text-3xl font-bold mb-2 text-lime-300">Episode: {{ episode.name }}</h2>
        <p class="text-gray-400">Air Date: {{ episode.air_date }}</p>
        <p class="text-gray-400">Episode: {{ episode.episode }}</p>
        <p class="text-gray-400">Created: {{ episode.created }}</p>
      </div>
      <div v-if="characters.length > 0">
        <h3 class="text-2xl font-bold mb-4 text-lime-300">Characters in this episode:</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="character in characters" :key="character.id" class="bg-lime-800 p-6 rounded-lg">
            <img :src="character.image" :alt="character.name" class="w-full h-32 object-cover mb-4 rounded">
            <h3 class="text-xl font-bold text-white">{{ character.name }}</h3>
            <p class="text-gray-400">Status: {{ character.status }}</p>
            <p class="text-gray-400">Species: {{ character.species }}</p>
            <p class="text-gray-400">Gender: {{ character.gender }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const episode = ref(null);
const characters = ref([]);
const route = useRoute();

const episodeId = route.params.id;

onMounted(async () => {
  try {
    const episodeResponse = await fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`);
    const episodeData = await episodeResponse.json();
    episode.value = {
      name: episodeData.name,
      air_date: episodeData.air_date,
      episode: episodeData.episode,
      created: episodeData.created,
    };

    const characterResponses = await Promise.all(episodeData.characters.map(url => fetch(url)));
    const characterData = await Promise.all(characterResponses.map(res => res.json()));
    characters.value = characterData.map(character => ({
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      gender: character.gender,
      image: character.image,
    }));
  } catch (error) {
    console.error('Error fetching episode and characters:', error);
  }
});
</script>

<style scoped>
</style>

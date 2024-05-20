<template>
  <section id="characters" class="py-12 bg-lime-50">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold mb-6 text-lime-300 text-center">Characters</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="character in characters" :key="character.id" class="bg-lime-800 p-6 rounded-lg" @click="goToCharacter(character.id)">
          <img :src="character.image" :alt="character.name" class="w-full h-32 object-cover mb-4 rounded">
          <h3 class="text-xl font-bold text-white">{{ character.name }}</h3>
          <p class="text-gray-400">{{ character.species }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const characters = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    characters.value = data.results.map(character => ({
      id: character.id,
      name: character.name,
      species: character.species,
      image: character.image,
    }));
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
});

function goToCharacter(characterId) {
  router.push({ path: `/character/${characterId}` });
}
</script>

<style scoped>
</style>



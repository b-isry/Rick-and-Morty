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
      <div v-if="character?.location" class="mb-8">
        <h3 class="text-2xl font-bold mb-4 text-lime-300">Last Known Location</h3>
        <p class="text-gray-400">{{ character.location.name }}</p>
      </div>
      <div v-if="episodes.length > 0">
        <h3 class="text-2xl font-bold mb-4 text-lime-300">Episodes</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="episode in episodes" 
            :key="episode.id" 
            class="bg-lime-800 p-6 rounded-lg cursor-pointer transition transform hover:scale-105"
            @click="goToEpisode(episode.id)"
          >
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
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      location {
        name
      }
      episode {
        id
        name
        air_date
        episode
        created
      }
    }
  }
`;

const character = ref(null);
const episodes = ref([]);

const route = useRoute();
const router = useRouter();
const characterId = route.params.id;

const { result, loading, error } = useQuery(GET_CHARACTER, { id: characterId });

watchEffect(() => {
  if (!loading.value && result.value) {
    character.value = result.value.character;
    episodes.value = result.value.character.episode;
  }
});

function goToEpisode(episodeId) {
  router.push({ path: `/episode/${episodeId}` });
}
</script>



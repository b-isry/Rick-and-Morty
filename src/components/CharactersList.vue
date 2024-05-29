<template>
  <section id="characters" class="py-12 bg-lime-50">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold mb-6 text-lime-300 text-center">
        Characters
      </h2>
      <div v-if="loading" class="text-center text-lime-800">
        Loading characters...
      </div>
      <div v-else-if="error" class="text-center text-red-500">
        Error loading characters
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="character in characters"
          :key="character.id"
          class="bg-lime-800 p-6 rounded-lg cursor-pointer transition transform hover:scale-105 flex items-center"
          @click="goToCharacter(character.id)"
        >
          <img
            :src="character.image"
            :alt="character.name"
            class="w-48 h-48 object-cover rounded mr-4"
          />
          <div>
            <h3 class="text-xl font-bold text-white">{{ character.name }}</h3>
            <p class="text-gray-400">{{ character.species }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRouter } from "vue-router";

const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        species
        image
      }
    }
  }
`;

const characters = ref([]);
const router = useRouter();

const { onResult, loading, error } = useQuery(GET_CHARACTERS);

onResult((result) => {
  if (result.data) {
    characters.value = result.data.characters.results;
  }
});

function goToCharacter(characterId) {
  router.push({ path: `/character/${characterId}` });
}
</script>

<style scoped>
.bg-lime-800:hover {
  background-color: rgb(54 83 20);
}
</style>

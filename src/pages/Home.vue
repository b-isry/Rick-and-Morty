<script setup>
import Header from '../components/Header.vue';
import Carousel from "../components/Carousel.vue"
import ShowDescription from "../components/ShowDescription.vue";
import CharactersList from "../components/CharactersList.vue";
import EpisodesList from "../components/EpisodesList.vue";
import LocationsList from "../components/LocationsList.vue";

</script>
<template>
    <Header class="mb-3" />
  <div class="container mx-auto flex flex-col lg:flex-row justify-center">
  <Carousel class="w-full lg:w-1/2 lg:pl-4 h-64 lg:h-auto" />
  <ShowDescription class="w-full lg:w-1/2 lg:pr-4" />
</div>
  <CharactersList />
  <EpisodesList />
  <LocationsList />
</template>

<template>
  <section class="relative overflow-hidden py-12 bg-lime-50">
    <div class="container mx-auto">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="['carousel-item', { 'opacity-100': index === currentIndex, 'opacity-0': index !== currentIndex }]"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      >
        <img :src="image.src" :alt="image.alt" class="w-65 h-65 object-cover">
      </div>
      <div class="absolute inset-0 flex items-center justify-between px-4">
        <button @click="prev" class="bg-lime-900 text-white p-2 rounded-full absolute top-1/2 transform -translate-y-1/2 left-0">
          &#10094;
        </button>
        <button @click="next" class="bg-lime-900 text-white p-2 rounded-full absolute top-1/2 transform -translate-y-1/2 right-0">
          &#10095;
        </button>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const images = ref([
  { src: new URL('../assets/image2.jpg', import.meta.url).href, alt: 'Rick and Morty Image 2' },
  { src: new URL('../assets/image3.jpg', import.meta.url).href, alt: 'Rick and Morty Image 3' },
  { src: new URL('../assets/image4.jpg', import.meta.url).href, alt: 'Rick and Morty Image 4' },
  { src: new URL('../assets/image5.jpg', import.meta.url).href, alt: 'Rick and Morty Image 5' },
  { src: new URL('../assets/image6.jpg', import.meta.url).href, alt: 'Rick and Morty Image 6' },
  { src: new URL('../assets/image7.jpg', import.meta.url).href, alt: 'Rick and Morty Image 7' },
  { src: new URL('../assets/image8.jpg', import.meta.url).href, alt: 'Rick and Morty Image 8' },
  { src: new URL('../assets/image11.jpg', import.meta.url).href, alt: 'Rick and Morty Image 11' },
]);

const currentIndex = ref(0);
let interval = null;

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
};

onMounted(() => {
  interval = setInterval(next, 3000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.carousel-item.opacity-100 {
  opacity: 1;
}
</style>

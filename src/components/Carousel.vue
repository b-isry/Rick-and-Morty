<template>
  <section class="relative overflow-hidden py-12 bg-lime-50">
    <div class="container mx-auto relative">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="['carousel-item', { 'opacity-100': index === currentIndex, 'opacity-0': index !== currentIndex }]"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      >
        <img :src="image.src" :alt="image.alt" class="w-full h-64 object-cover">
      </div>
      <div class="absolute inset-0 flex items-center justify-between px-4">
        <button @click="prev" class="bg-lime-900 text-white p-2 rounded-full">
          &#10094;
        </button>
        <button @click="next" class="bg-lime-900 text-white p-2 rounded-full">
          &#10095;
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const images = ref([
  { url: '/assets/img1.jpg', alt: 'Rick and Morty Image 1' },
  { src: '/assets/img2.jpg', alt: 'Rick and Morty Image 2' },
  { src: '/assets/img3.jpg', alt: 'Rick and Morty Image 3' },
  { src: '/assets/img4.jpg', alt: 'Rick and Morty Image 4' },
  { src: '/assets/img5.jpg', alt: 'Rick and Morty Image 5' },
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
}

.carousel-item.opacity-100 {
  opacity: 1;
}
</style>

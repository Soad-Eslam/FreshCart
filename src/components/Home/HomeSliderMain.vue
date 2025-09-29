<template>
  <h3>Shop Popular Categories</h3>
  <Carousel v-bind="config">
    <Slide v-for="category in categories" :key="category.id">
      <img :src="category.image" alt="category" />
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
  <Carousel v-bind="config">
    <Slide v-for="category in categories.slice().reverse()" :key="category.id">
      <img :src="category.image" alt="category" />
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
const categories = ref([]);
function getAllCategories() {
  axios
    .get("https://ecommerce.routemisr.com/api/v1/categories")
    .then((res) => {
      console.log(res.data.data);
      categories.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
onMounted(() => {
  getAllCategories();
});

const config = {
  height: 150,
  itemsToShow: 6,
  gap: 3,
  wrapAround: true,
};
</script>

<style scoped>
:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

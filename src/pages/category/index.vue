<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-items-center">
    <div class="cursor-pointer" v-for="category in categories">
      <img class="h-50" :src="category.image" alt="" />
      <span class="text-[#0aad0a]">{{ category.name }}</span>
      <h3>{{ category.slug }}</h3>
      <div class="flex justify-between"></div>
    </div>
  </div>
  <div class="mt-10">
    <Footer />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import type { Category } from "../../types/index.ts";
import { useLoading } from "vue-loading-overlay";
import Footer from "../../components/Footer.vue";
const categories = ref<Category[]>([]);

//loading spinner
const loading = useLoading();
function getAllCategories() {
  const loader = loading.show();
  axios
    .get("https://ecommerce.routemisr.com/api/v1/categories")
    .then((res) => {
      categories.value = res.data.data;
      console.log(categories.value);
      loader.hide();
    })
    .catch((err) => {
      console.error(err);
    });
}
onMounted(() => {
  getAllCategories();
});
</script>

<style lang="scss" scoped></style>

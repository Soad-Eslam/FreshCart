<template>
  <div
    class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-items-center"
  >
    <div class="cursor-pointer" v-for="brand in brands">
      <img class="h-25" :src="brand.image" alt="" />
      <span class="text-[#0aad0a]">{{ brand.name }}</span>
      <h3>{{ brand.slug }}</h3>
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
import type { Brand } from "../../types/index.ts";
import { useLoading } from "vue-loading-overlay";
import { toast } from "vue3-toastify";
import Footer from "../../components/Footer.vue";
const brands = ref<Brand[]>([]);

//loading spinner
const loading = useLoading();
function getAllBrands() {
  const loader = loading.show();
  axios
    .get("https://ecommerce.routemisr.com/api/v1/brands")
    .then((res) => {
      brands.value = res.data.data;
      console.log(brands.value);
      loader.hide();
    })
    .catch((err) => {
      console.error(err);
    });
}
onMounted(() => {
  getAllBrands();
});
</script>

<style lang="scss" scoped></style>

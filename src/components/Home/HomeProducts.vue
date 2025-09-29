<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
    <Product
      v-for="productItem in products"
      :key="productItem.id"
      :productData="productItem"
    />
  </div>
</template>

<script setup lang="ts">
import Product from "./Product.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import type { IProduct } from "../../types";
import { useLoading } from "vue-loading-overlay";
import { toast } from "vue3-toastify";

// products state
const products = ref<IProduct[]>([]);

//loading spinner
const loading = useLoading();

// fetch function
async function getAllProducts() {
  try {
    const loader = loading.show();
    const res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    products.value = res.data.data;
    console.log(products.value);
    loader.hide();
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  getAllProducts();
});
</script>

<style lang="scss" scoped></style>

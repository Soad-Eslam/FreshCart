<template>
  <div
    v-if="productData"
    class="container mx-auto my-10 flex flex-col gap-4 sm:flex-row justify-center items-center flex-wrap"
  >
    <div class="w-2/6">
      <img :src="productData.imageCover" :alt="productData.title" />
    </div>
    <div class="w-3/6">
      <h3 class="text-2xl font-semibold">{{ productData.title }}</h3>
      <p class="text-gray-500 py-3">{{ productData.description }}</p>

      <span class="block py-2">{{ productData.category.name }}</span>

      <div class="flex justify-between">
        <!-- If discount exists -->
        <span v-if="productData.priceAfterDiscount" class="flex gap-2">
          <span class="line-through text-red-600">
            {{ productData.price }} EGP
          </span>
          {{ productData.priceAfterDiscount }} EGP
        </span>

        <!-- If no discount -->
        <span v-else>{{ productData.price }} EGP</span>

        <span>
          <i class="fa-solid fa-star text-amber-400"></i>
          {{ productData.ratingsAverage }}
        </span>
      </div>

      <button
      @click="cartStore.addToCart(productData.id)"
        class="bg-[#0aad0a] text-white cursor-pointer p-2 my-4 w-full rounded-md hover:bg-green-700 transition"
      >
        <i class="fa-solid fa-cart-plus"></i> Add to cart
      </button>
    </div>
  </div>

  <!-- Loading state -->
  <div v-else class="container mx-auto my-32 text-center">
    <p class="text-gray-500">Loading product details...</p>
  </div>
  <div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import type { IProduct } from "../../types";
import Footer from "../Footer.vue";
import { useLoading } from "vue-loading-overlay";
import { useCartStore } from "../../stores/cart/index.ts";

const route = useRoute();
const productData = ref<IProduct | null>(null);
const cartStore = useCartStore();

//loading spinner
const loading = useLoading();

async function getProductDetails() {
  try {
    const loader = loading.show();
    const res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${route.params.id}`
    );
    productData.value = res.data.data;
    loader.hide();
  } catch (err) {
    console.error("Error fetching product details:", err);
  }
}

onMounted(() => {
  getProductDetails();
});
</script>

<style lang="scss" scoped></style>

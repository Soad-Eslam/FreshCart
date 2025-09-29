<template>
  <div class="cursor-pointer" @click="gotoProductDetails(productData.id)">
    <img :src="productData.imageCover" alt="" />
    <span class="text-[#0aad0a]">{{ productData.category.name }}</span>
    <h3>{{ productData.title.split(" ").slice(0, 2).join(" ") }}</h3>
    <div class="flex justify-between">
      <span v-if="productData.priceAfterDiscount">
        <span class="line-through text-red-600">
          {{ productData.price }}EGP
        </span>
        {{ productData.priceAfterDiscount }}EGP
      </span>
      <span v-else>{{ productData.price }}EGP</span>

      <span>
        <i class="fa-solid fa-star text-amber-400"></i>
        {{ productData.ratingsAverage }}
      </span>
    </div>
    <button
      @click.stop="cartStore.addToCart(productData.id)"
      class="bg-[#0aad0a] text-white p-2 cursor-pointer hover:bg-green-700 transition"
    >
      <i class="fa-solid fa-cart-plus"></i>Add to cart
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { IProduct } from "../../types";
import { useCartStore } from "../../stores/cart";
const router = useRouter();
const cartStore = useCartStore();
defineProps<{
  productData: IProduct;
}>();
function gotoProductDetails(id: string) {
  router.push(`/product/${id}`);
}
</script>

<style lang="scss" scoped></style>

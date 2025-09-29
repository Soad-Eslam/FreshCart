<template>
  <nav class="bg-gray-200 fixed top-0 left-0 right-0 z-50 h-16">
    <div class="container mx-auto flex justify-between items-center h-full">
      <div class="flex gap-5 items-center">
        <router-link exact-active-class="border-0" :to="{ name: 'home' }">
          <img src="../assets/images/freshcart-logo.svg" alt="" />
        </router-link>
        <div
          v-if="AuthStore.isloggedIn"
          class="flex gap-3 justify-between text-gray-500"
        >
          <router-link class="p-2" to="/"> Home </router-link>
          <router-link class="p-2" :to="{ name: 'cart' }"> Cart </router-link>
          <router-link class="p-2" :to="{ name: 'product' }">
            Products
          </router-link>
          <router-link class="p-2" :to="{ name: 'category' }">
            Categories
          </router-link>
          <router-link class="p-2" :to="{ name: 'brands' }">
            Brands
          </router-link>
        </div>
      </div>
      <div class="flex gap-3">
        <div class="flex items-center gap-3">
          <a href="https://facebook.com" aria-label="Facebook">
            <i class="fa-brands fa-facebook"></i>
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="https://tiktok.com" aria-label="TikTok">
            <i class="fa-brands fa-tiktok"></i>
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <i class="fa-brands fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn">
            <i class="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://youtube.com" aria-label="YouTube">
            <i class="fa-brands fa-youtube"></i>
          </a>

          <!-- Cart (only shown when cart has items) -->
          <a class="relative">
            <i
              v-if="cartStore.numOfCartItems !== 0"
              class="fa-solid fa-cart-shopping"
            >
              <span>{{ cartStore.numOfCartItems }}</span>
            </i>
            <span class="ml-1"></span>
          </a>
        </div>

        <div class="text-gray-500 flex gap-3">
          <span
            class="cursor-pointer"
            v-if="AuthStore.isloggedIn"
            @click="AuthStore.signOut"
            >SignOut</span
          >
          <template v-else>
            <router-link class="p-2" :to="{ name: 'login' }"
              ><span>Login</span></router-link
            >
            <router-link class="p-2" :to="{ name: 'register' }"
              ><span>Register</span></router-link
            ></template
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "../stores/Auth/index.ts";
import { useCartStore } from "../stores/cart/index.ts";
const AuthStore = useAuthStore();
const cartStore = useCartStore();
</script>

<style scoped>
.router-link-exact-active {
  color: white;
  border-radius: 5px;
  background-color: #0aad0a;
  transition: all 0.3 ease-in-out;
}
</style>

<template>
  <div class="pb-7">
    <HomeSliderMain />
    <HomeProducts />
  </div>
  <div>
    <Footer />
  </div>
</template>

<script setup>
import Footer from "../../components/Footer.vue";
import { useAuthStore } from "../../stores/Auth";
import HomeProducts from "../../components/Home/HomeProducts.vue";
import HomeSliderMain from "../../components/Home/HomeSliderMain.vue";
const AuthStore = useAuthStore();
</script>

<style lang="scss" scoped></style>

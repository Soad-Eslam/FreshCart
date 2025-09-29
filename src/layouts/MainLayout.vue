<template>
  <div>
    <Navbar />
  </div>
  <div class="main">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
</script>

<style scoped>
.main {
  margin-top: 80px;
}
</style>

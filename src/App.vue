<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "../src/stores/Auth/index.ts";
const AuthStore = useAuthStore();
onMounted(() => {
  AuthStore.getDataFromLocalStorage();
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>

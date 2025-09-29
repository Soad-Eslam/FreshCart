import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes/index.ts";
import { useAuthStore } from "../stores/Auth/index.ts";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  const AuthStore = useAuthStore();
  if (to.meta.requiresAuth && !AuthStore.isloggedIn) {
    return { name: "login" };
  }
  if (AuthStore.isloggedIn && (to.name === "login" || to.name === "register")) {
    return { name: "home" };
  }
  return true;
});
export default router;

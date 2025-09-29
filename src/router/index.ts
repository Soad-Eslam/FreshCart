import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";
import { useAuthStore } from "../stores/Auth";

const router = createRouter({
  history: createWebHashHistory(), // 👈 use hash mode for GitHub Pages
  routes,
});

// Navigation guard
router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isloggedIn) {
    return { name: "login" };
  }

  if (authStore.isloggedIn && (to.name === "login" || to.name === "register")) {
    return { name: "home" };
  }

  return true;
});

export default router;

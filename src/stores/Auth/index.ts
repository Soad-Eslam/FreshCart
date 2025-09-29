import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export interface IUserData {
  email: string;
  name: string;
  role: string;
}
export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null); // allow null
  const apiErrors = ref<string | null>(null);
  const FieldErrorSelected = ref<string | null>(null);
  const userData = ref<IUserData | null>(null); // allow null

  const isloggedIn = computed(() => !!token.value);
  const router = useRouter();

  function login(values: { email: string; password: string }) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        token.value = res.data.token;
        userData.value = res.data.user;
        apiErrors.value = null;
        FieldErrorSelected.value = null;
        router.push({ name: "home" });
      })
      .catch((err) => {
        const responseData = err.response?.data;
        apiErrors.value = responseData?.errors?.msg ?? responseData?.message;
        FieldErrorSelected.value = responseData?.errors
          ? responseData.errors.param
          : null;
      });
  }

  function register(values: { email: string; password: string }) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        token.value = res.data.token;
        userData.value = res.data.user;
        apiErrors.value = null;
        FieldErrorSelected.value = null;
        router.push({ name: "login" });
      })
      .catch((err) => {
        const responseData = err.response?.data;
        apiErrors.value =
          responseData?.errors?.msg || responseData?.message || "created";
        FieldErrorSelected.value = responseData?.errors
          ? responseData.errors.param
          : null;
      });
  }

  function getDataFromLocalStorage() {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      token.value = storedToken;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      userData.value = JSON.parse(storedUser);
    }
  }

  function signOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    userData.value = null;
    token.value = null;
    router.push({ name: "login" });
  }

  return {
    login,
    register,
    getDataFromLocalStorage,
    signOut,
    token,
    apiErrors,
    FieldErrorSelected,
    userData,
    isloggedIn,
  };
});

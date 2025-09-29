<template>
  <div class="w-1/2 mx-auto my-5 mb-12">
    <h3 class="text-2xl font-thin">Login:</h3>
    <p
      v-if="AuthStore.apiErrors"
      class="text-red-600 bg-red-200 p-3 text-center"
    >
      {{ AuthStore.apiErrors }}
    </p>
    <p
      v-if="AuthStore.apiErrors == 'created'"
      class="text-green-600 bg-green-200 p-3 text-center"
    >
      Account Sucessfully Created
    </p>
    <Form @submit="getUserDataValues">
      <!-- email -->
      <div class="my-2">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
          >email:</label
        >
        <Field
          type="email"
          id="email"
          name="email"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
        />
        <ErrorMessage
          name="email"
          class="text-red-600 bg-red-200 p-3 text-center"
          as="div"
        />
      </div>

      <!-- password -->
      <div class="my-2">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900"
          >password:</label
        >
        <Field
          type="password"
          id="password"
          name="password"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
        />
        <ErrorMessage
          name="password"
          class="text-red-600 bg-red-200 p-3 text-center"
          as="div"
        />
      </div>

      <button
        class="bg-[#0aad0a] text-white px-5 py-2 rounded-md mt-3 block ms-auto"
      >
        Login
      </button>
    </Form>
  </div>
  <div>
    <Footer />
  </div>
</template>

<script setup>
import Footer from "../../components/Footer.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import { object, string, ref as refYup, number } from "yup";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/Auth/index.ts";

const AuthStore = useAuthStore();
function getUserDataValues(values) {
  AuthStore.login(values);
}
</script>

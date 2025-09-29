<template>
  <div class="w-1/2 mx-auto my-5">
    <h3 class="text-2xl font-thin">Register Now:</h3>
    <p
      v-if="AuthStore.apiErrors && AuthStore.apiErrors != 'created'"
      class="text-red-600 bg-red-200 p-3 text-center"
    >
      {{ AuthStore.FieldErrorSelected }}
      <span v-if="AuthStore.FieldErrorSelected">: </span
      >{{ AuthStore.apiErrors }}
    </p>
    <p
      v-if="apiErrors == 'created'"
      class="text-green-600 bg-green-200 p-3 text-center"
    >
      Account Sucessfully Created
    </p>
    <Form @submit="getUserDataValues" :validation-schema="userSchema">
      <!-- name -->
      <div class="my-2">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
          >name:</label
        >
        <Field
          type="text"
          id="name"
          name="name"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
        />
        <ErrorMessage
          name="name"
          class="text-red-600 bg-red-200 p-3 text-center"
          as="div"
        />
      </div>

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

      <!-- re-password -->
      <div class="my-2">
        <label
          for="rePassword"
          class="block mb-2 text-sm font-medium text-gray-900"
          >re-password:</label
        >
        <Field
          type="password"
          id="rePassword"
          name="rePassword"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
        />
        <ErrorMessage
          name="rePassword"
          class="text-red-600 bg-red-200 p-3 text-center"
          as="div"
        />
      </div>

      <!-- phone -->
      <div class="my-2">
        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900"
          >phone:</label
        >
        <Field
          type="text"
          id="phone"
          name="phone"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
        />
        <ErrorMessage
          name="phone"
          class="text-red-600 bg-red-200 p-3 text-center"
          as="div"
        />
      </div>

      <button
        class="bg-[#0aad0a] text-white px-5 py-2 rounded-md mt-3 block ms-auto"
      >
        Register
      </button>
    </Form>
  </div>
  <div>
    <Footer />
  </div>
</template>

<script setup>
import axios from "axios";
import Footer from "../../components/Footer.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import { object, string, ref as refYup, number } from "yup";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/Auth/index";

const router = useRouter();
const userSchema = object({
  name: string().required(),
  email: string().required().email(),
  password: string()
    .required()
    .matches(/^\d{6,10}$/, "password is weak"),
  rePassword: string()
    .required()
    .oneOf([refYup("password")], "password does not matches"),
  phone: string()
    .matches(/^01[0-2,5][0-9]{8}$/, "phone is not valid")
    .required(),
});

const AuthStore = useAuthStore();
function getUserDataValues(values) {
  AuthStore.register(values);
}
</script>

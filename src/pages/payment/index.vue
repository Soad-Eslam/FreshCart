<template>
  <div class="w-1/2 mx-auto my-5">
    <h3 class="text-2xl font-thin">Pay Now:</h3>

    <Form @submit="pay" :validation-schema="paySchema">
      <!-- details -->
      <div class="my-2">
        <label
          for="details"
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          details:
        </label>
        <Field
          type="text"
          id="details"
          name="details"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
        />
        <ErrorMessage
          name="details"
          class="text-red-600 bg-red-200 p-3 text-center"
          as="div"
        />
      </div>

      <!-- city -->
      <div class="my-2">
        <label for="city" class="block mb-2 text-sm font-medium text-gray-900">
          city:
        </label>
        <Field
          type="text"
          id="city"
          name="city"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
        />
        <ErrorMessage
          name="city"
          class="text-red-600 bg-red-200 p-3 text-center"
          as="div"
        />
      </div>

      <!-- phone -->
      <div class="my-2">
        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">
          phone:
        </label>
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
        type="submit"
        class="bg-[#0aad0a] text-white px-5 py-2 rounded-md mt-3 ms-auto block"
      >
        <span>Pay Online</span>
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
import { ref, onMounted } from "vue";
import { object, string } from "yup";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "../../stores/Auth/index";
import { toast } from "vue3-toastify";

// Stores
const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

// Loading state
const loading = ref(false);

// Load cart on page mount
onMounted(() => {
  cartStore.getLoggedUserData();
});

// Validation schema
const paySchema = object({
  details: string().required("Details are required"),
  city: string().required("City is required"),
  phone: string()
    .matches(/^01[0-2,5][0-9]{8}$/, "Phone is not valid")
    .required("Phone is required"),
});

// Payment function
function pay(values) {
  console.log("values", values);

  if (!cartStore.cartID) {
    alert("Cart ID is missing. Please refresh or add items to your cart.");
    return;
  }

  const siteUrl = window.location.origin;

  axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartStore.cartID}?url=${siteUrl}`,
      {
        details: values.details,
        phone: values.phone,
        city: values.city,
      },
      {
        headers: { token: authStore.token },
      }
    )
    .then((res) => {
      console.log("pay res: ", res);
      location.href = res.data.session.url;
    })
    .catch((err) => {
      console.log("pay err: ", err);
    });
}
</script>

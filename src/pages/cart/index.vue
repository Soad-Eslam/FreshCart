<template>
  <section class="my-10 p-10 relative bg-[#E5E7EB]">
    <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
      <h2
        class="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black"
      >
        Shopping Cart
      </h2>

      <div class="hidden lg:grid grid-cols-2 py-6">
        <div class="font-normal text-xl leading-8 text-gray-500">Product</div>
        <p
          class="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between"
        >
          <span class="w-full max-w-[260px] text-center">Quantity</span>
          <span class="w-full max-w-[200px] text-center">Total</span>
        </p>
      </div>

      <!-- ✅ Loop over products, not cartData -->
      <div
        class="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6"
        v-for="item in cartStore.cartData?.products"
        :key="item._id"
      >
        <div
          class="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto"
        >
          <div class="img-box">
            <img
              :src="item.product.imageCover"
              alt="product image"
              class="xl:w-[140px] rounded-xl object-cover"
            />
          </div>
          <div class="pro-data w-full max-w-sm">
            <h5
              class="font-semibold text-xl leading-8 text-black max-[550px]:text-center"
            >
              {{ item.product.title }}
            </h5>
            <p
              class="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center"
            >
              {{ item.product.category.name }}
            </p>
            <h6
              class="font-medium text-lg leading-8 text-indigo-600 max-[550px]:text-center"
            >
              {{ item.price }} EGP
            </h6>

            <!-- ✅ Use cart item _id, not product._id -->
            <button
              type="button"
              @click="cartStore.RemoveSpecifiCartItem(item.product._id)"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-3 py-1 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete
            </button>
          </div>
        </div>

        <!-- Quantity control -->
        <div
          class="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2"
        >
          <div class="flex items-center w-full mx-auto justify-center">
            <button
              @click="
                cartStore.UpdateCartProducts(item.product._id, item.count - 1)
              "
              :disabled="item.count <= 1"
              class="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>

            <input
              type="text"
              class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] py-[15px] text-center bg-transparent"
              :value="item.count"
              readonly
            />

            <button
              @click="
                cartStore.UpdateCartProducts(item.product._id, item.count + 1)
              "
              class="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
            >
              +
            </button>
          </div>
          <h6
            class="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center"
          >
            {{ item.count * item.price }} EGP
          </h6>
        </div>
      </div>

      <!-- Total -->
      <div
        class="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto"
      >
        <div class="flex items-center justify-between w-full py-6">
          <p class="font-manrope font-medium text-2xl leading-9 text-gray-900">
            Total
          </p>
          <h6
            class="font-manrope font-medium text-2xl leading-9 text-indigo-500"
          >
            {{ getTotalPrice() }} EGP
          </h6>
        </div>
      </div>

      <!-- Actions -->
      <div
        class="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8"
      >
        <button
          @click="cartStore.RemoveCartItems()"
          type="button"
          class="rounded-full w-full max-w-[280px] py-4 text-center font-semibold text-lg text-white bg-red-700 hover:bg-red-800"
        >
          Delete All
        </button>
        <button
          @click="goToPay()"
          class="rounded-full w-full max-w-[280px] py-4 text-center items-center justify-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
        >
          Continue to Online Payment
        </button>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script setup>
import { onMounted } from "vue";
import Footer from "../../components/Footer.vue";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const router = useRouter();
const cartStore = useCartStore();

function getTotalPrice() {
  return (
    cartStore.cartData?.products?.reduce(
      (sum, item) => sum + item.count * item.price,
      0
    ) || 0
  );
}

function goToPay() {
  if (getTotalPrice() > 0) {
    router.push("/payment");
  } else {
    toast("Cart is empty!", { type: "error" });
  }
}

onMounted(() => {
  cartStore.getLoggedUserData();
});
</script>

<style lang="scss" scoped></style>

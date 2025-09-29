<template>
  <div class="w-full h-1/3  bottom-0 left-0 bg-gray-200">
    <div class="p-10">
      <div>
        <h4 class="text-2xl font-light">Get The FreshCart app</h4>
        <p class="text-gray-500">
          We will send you a link, open it on your phone to download the app.
        </p>
      </div>
      <div class="flex justify-between items-center gap-2 my-5">
        <input
          type="text"
          id="footer_email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg h-10 w-10/12 focus:ring-blue-500 focus:border-blue-500 block p-2"
          placeholder="Email .."
          required
        />
        <button
          class="bg-[#0aad0a] text-white px-5 py-2 rounded-md block"
        >
          Share App Link
        </button>
      </div>
      <div class="field"></div>
      <div class="layer bg-gray-300"></div>
      <div class="flex justify-between items-center my-3">
        <div class="flex items-center gap-2">
          <h3 class="block">Payment Partners</h3>
          <div class="flex gap-3">
            <img
              class="w-10"
              src="../assets/payment/amazonpay-logo-rgb-clr.svg"
              alt=""
            />
            <img
              class="w-5"
              src="../assets/payment/dls-logo-bluebox-solid.svg"
              alt=""
            />
            <img
              class="w-5"
              src="../assets/payment/MicrosoftTeams-image.png"
              alt=""
            />
            <img
              class="w-5"
              src="../assets/payment/paypal-mark-color_new.svg"
              alt=""
            />
          </div>
        </div>
        <div class="flex gap-3">
          <h3>Get deliveries with FreshCart</h3>
          <div>
            <img
              class="w-20"
              src="../assets/payment/GetItOnGooglePlay_Badge_Web_color_English.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="layer bg-gray-300"></div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.layer {
  width: 100%;
  height: 2px;
}
</style>

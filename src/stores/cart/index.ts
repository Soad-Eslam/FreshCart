import axios from "axios";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import { useAuthStore } from "../Auth/index.ts";
import { ref } from "vue";
import type { ICartData } from "../../types/index.ts";

export const useCartStore = defineStore("cart", () => {
  const authStore = useAuthStore();

  const cartData = ref<ICartData | null>(null);
  const numOfCartItems = ref<number>(0);
  const cartID = ref<string | null>(null);

  async function addToCart(productID: string) {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: productID },
        {
          headers: { token: localStorage.getItem("token") || "" },
        }
      );

      toast(res.data.message, { type: "success" });
      getLoggedUserData();
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message.split(" ").slice(0, 3).join(" ") ||
        "Something went wrong";
      toast(errorMsg, { type: "error" });
    }
  }

  function RemoveSpecifiCartItem(cartItemID: string) {
  axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${cartItemID}`, {
      headers: { token: authStore.token },
    })
    .then((res) => {
      console.log("Delete success:", res.data);
      toast("Product deleted successfully", { type: "success" });
      getLoggedUserData();
    })
    .catch((err) => {
      console.error("Delete failed:", err.response?.data || err.message);
      toast("Failed to delete item", { type: "error" });
    });
}


  function RemoveCartItems() {
    axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: authStore.token },
      })
      .then(() => {
        toast("Cart cleared successfully", { type: "success" });
        getLoggedUserData();
      })
      .catch(() => {
        toast("Something went wrong", { type: "error" });
      });
  }

  function UpdateCartProducts(cartItemID: string, count: number) {
  if (count <= 0) {
    return RemoveSpecifiCartItem(cartItemID);
  }

  console.log("Updating cart item:", cartItemID, "with count:", count);

  axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${cartItemID}`,
      { count },
      { headers: { token: authStore.token } }
    )
    .then((res) => {
      console.log("Update success:", res.data);
      getLoggedUserData();
      toast("Quantity updated", { type: "success" });
    })
    .catch((err) => {
      console.error("Update failed:", err.response?.data || err.message);
      toast("Update failed", { type: "error" });
    });
}

  function getLoggedUserData() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: authStore.token },
      })
      .then((res) => {
        cartData.value = res.data.data;
        numOfCartItems.value = res.data.numOfCartItems;
        cartID.value = res.data.data?._id || null;

        console.log("cartData:", cartData.value);
        console.log("cartID" , cartID);
        
      })
      .catch(() => {
        toast("Failed to fetch cart", { type: "error" });
      });
  }

  return {
    addToCart,
    getLoggedUserData,
    cartData,
    RemoveSpecifiCartItem,
    RemoveCartItems,
    UpdateCartProducts,
    numOfCartItems,
    cartID,
  };
});

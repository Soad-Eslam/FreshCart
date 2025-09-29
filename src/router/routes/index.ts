import Home from "../../pages/Home/index.vue";
import product from "../../pages/product/index.vue";
import cart from "../../pages/cart/index.vue";
import category from "../../pages/category/index.vue";
import brands from "../../pages/brands/index.vue";
import payment from "../../pages/payment/index.vue";
import MainLayout from "../../layouts/MainLayout.vue";
import NotFound from "../../layouts/NotFound.vue";
import Register from "../../pages/Auth/Register.vue";
import Login from "../../pages/Auth/Login.vue";
import ProductDetails from "../../components/Home/ProductDetails.vue";
export const routes = [
  {
    component: MainLayout,
    path: "/",
    children: [
      {
        path: "",
        component: Home,
        name: "home",
        meta:{requiresAuth: true}
      },
      {
        path: "product",
        component: product,
        name: "product",
        meta:{requiresAuth: true}
      },
      {
        path: "product/:id",
        component: ProductDetails,
        name: "productDetails",
        meta:{requiresAuth: true}
      },
      {
        path: "cart",
        component: cart,
        name: "cart",
        meta:{requiresAuth: true}
      },
      {
        path: "category",
        component: category,
        name: "category",
        meta:{requiresAuth: true}
      },
      {
        path: "brands",
        component: brands,
        name: "brands",
        meta:{requiresAuth: true}
      }
      ,
      {
        path:"payment",
        component: payment,
        name:"payment",
        meta:{requiresAuth: true}
      },
      {
        path:"register",
        component: Register,
        name:"register",
        meta:{requiresAuth: false}
      },
      {
        path:"login",
        component: Login,
        name:"login",
        meta:{requiresAuth: false}
      }
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
];

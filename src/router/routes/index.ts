import type { RouteRecordRaw } from "vue-router";

import MainLayout from "../../layouts/MainLayout.vue";
import NotFound from "../../layouts/NotFound.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../../pages/Home/index.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "product",
        name: "product",
        component: () => import("../../pages/product/index.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "product/:id",
        name: "productDetails",
        component: () => import("../../components/Home/ProductDetails.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "cart",
        name: "cart",
        component: () => import("../../pages/cart/index.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "category",
        name: "category",
        component: () => import("../../pages/category/index.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "brands",
        name: "brands",
        component: () => import("../../pages/brands/index.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "payment",
        name: "payment",
        component: () => import("../../pages/payment/index.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "register",
        name: "register",
        component: () => import("../../pages/Auth/Register.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "login",
        name: "login",
        component: () => import("../../pages/Auth/Login.vue"),
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

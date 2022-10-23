import { createRouter, createWebHistory } from "vue-router";

import Home from "@Views/Home.vue";
import Todos from "@Views/Todos.vue";

export const routerHistory = createWebHistory("post-app");

export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes: [
    {
      name: "index",
      path: "/",
      redirect: (to) => ({ name: "home" }),
    },
    {
      name: "home",
      path: "/home",
      component: Home,
    },
    {
      name: "todos",
      path: "/todos",
      component: Todos,
    },
  ],
});

import { createRouter, createWebHistory } from "vue-router";

import Home from "@Views/Home.vue";
import Todos from "@Views/Todos.vue";
import Posts from "@Views/Posts.vue";
import Bookmarks from "@Views/Bookmarks.vue";
import Items from "@Views/Items.vue";

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
    {
      name: "posts",
      path: "/posts",
      component: Posts,
    },
    {
      name: "bookmarks",
      path: "/bookmarks",
      component: Bookmarks,
    },
    {
      name: "items",
      path: "/items",
      component: Items,
    },
  ],
});

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/mainMenu",
    name: "MainMenu",
    component: () =>
      import("../views/MainMenu.vue"),
  },
  {
    path: "/userPreferences",
    name: "UserPreferences",
    component: () =>
      import("../views/UserPreferences.vue"),
  },
  {
    path: "/",
    name: "Authentication",
    component: () =>
      import("../views/Authentication.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

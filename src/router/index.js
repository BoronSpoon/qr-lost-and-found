import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/"
  },
  {
    path: "/mainMenu",
    name: "MainMenu",
    meta: { requiresAuth: true },
    component: () =>
      import("@/views/MainMenu.vue"),
  },
  {
    path: "/userPreferences",
    name: "UserPreferences",
    meta: { requiresAuth: true },
    component: () =>
      import("@/views/UserPreferences.vue"),
  },
  {
    path: "/itemRegisteration",
    name: "ItemRegisteration",
    meta: { requiresAuth: true },
    component: () =>
      import("@/views/ItemRegisteration.vue"),
  },
  {
    path: "/itemList",
    name: "ItemList",
    meta: { requiresAuth: true },
    component: () =>
      import("@/views/ItemList.vue"),
  },
  {
    path: "/",
    name: "Authentication",
    component: () =>
      import("@/views/Authentication.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let currentUser = firebase.auth().currentUser
  if (requiresAuth) { // if this page requires auth, redirect to auth page
    if (!currentUser) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // this is required
  }
})

export default router;

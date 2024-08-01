import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "userview",
      redirect: "/home",
      component: () => import("../views/UserView.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("../views/user/HomeView.vue"),
        },
      ],
    },
  ],
});

export default router;

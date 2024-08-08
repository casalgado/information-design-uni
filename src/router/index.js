import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "publicview",
      redirect: "/home",
      component: () => import("../views/PublicView.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("../views/public/HomeView.vue"),
        },
        {
          path: "/semana_dos",
          name: "secondWeek",
          component: () => import("../views/public/SecondWeek.vue"),
        },
        {
          path: "/login",
          name: "login",
          component: () => import("../views/public/UserAuth.vue"),
        },
      ],
    },
  ],
});

export default router;

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
        {
          path: "/menu",
          name: "menu",
          component: () => import("../views/user/MenuView.vue"),
        },
        {
          path: "/catering",
          name: "catering",
          component: () => import("../views/user/CateringView.vue"),
        },
        {
          path: "/registro",
          name: "registro",
          component: () => import("../views/user/UserAuth.vue"),
        },
        {
          path: "/carrito",
          name: "carrito",
          component: () => import("../views/user/CartView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin/AdminView.vue"),
      children: [
        {
          path: "dashboard",
          name: "showDashboard",
          component: () => import("../views/admin/TheDashboard.vue"),
        },
        {
          path: "products",
          name: "productsShow",
          component: () => import("../views/admin/ProductsShow.vue"),
        },
        {
          path: "products/create",
          name: "createProduct",
          component: () => import("../views/admin/ProductCreate.vue"),
        },
        {
          path: "product/edit/:id",
          name: "editProduct",
          component: () => import("../views/admin/ProductEdit.vue"),
        },
        {
          path: "categorias",
          name: "collectionsShow",
          component: () => import("../views/admin/CollectionsShow.vue"),
        },
        {
          path: "categoria/crear",
          name: "collectionsCreate",
          component: () => import("../views/admin/CollectionCreate.vue"),
        },
        {
          path: "collection/editar/:id",
          name: "editCollection",
          component: () => import("../views/admin/CollectionEdit.vue"),
        },
        {
          path: "pedido/:id",
          name: "showCartItem",
          component: () => import("../views/admin/CartItemShow.vue"),
        },
        {
          path: "console",
          name: "console",
          component: () => import("../views/admin/TheConsole.vue"),
        },
      ],
    },
  ],
});

export default router;

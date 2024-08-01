<template>
  <aside>
    <ul>
      <SidebarListItem
        text="dashboard"
        icon="chart-line-solid.svg"
        linkTo="/admin/dashboard"
      />
      <SidebarListItem
        text="ver productos"
        icon="list-solid.svg"
        linkTo="/admin/products"
      />
      <SidebarListItem
        text="crear producto"
        icon="square-plus-solid.svg"
        linkTo="/admin/products/create"
      />
      <SidebarListItem
        text="ver categorias"
        icon="list-solid.svg"
        linkTo="/admin/categorias"
      />
      <SidebarListItem
        text="crear categoria"
        icon="square-plus-solid.svg"
        linkTo="/admin/categoria/crear"
      />
    </ul>
  </aside>
</template>

<script>
import SidebarListItem from "./SidebarListItem.vue";
export default {
  name: "TheSidebarAdmin",
  components: { SidebarListItem },
};
</script>

<style scoped>
aside {
  background-color: var(--color-admin-theme);
  min-width: 180px;
  border-right: 1px solid var(--color-border-neutral);
}

aside a {
  text-decoration: none;
  color: var(--color-text-light);
}

aside ul {
  padding: 0px;
  padding-top: 30px;
}
</style>

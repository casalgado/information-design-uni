<template>
  <RouterLink class="router-link-li" :to="linkTo">
    <li>
      <img :src="path" alt="" />
      <p>{{ text }}</p>
    </li>
  </RouterLink>
</template>

<script>
export default {
  name: "SidebarListItem",
  props: {
    text: {
      type: String,
      default: () => "undefined",
    },
    icon: {
      type: String,
      default: () => "square-plus-solid.svg",
    },
    linkTo: {
      type: String,
      default: () => "/admin",
    },
  },
  computed: {
    path: function () {
      return `/icons/${this.icon}`;
    },
  },
};
</script>

<style scoped>
li {
  padding: 5px 0px 5px 0px;
  border-radius: 3px;
  width: 90%;
  margin-left: 5%;
  padding-left: 15px;
  margin-bottom: 5px;
}

li:hover {
  background-color: var(--color-admin-focus);
}

img {
  width: 15px;
  margin-right: 10px;
  position: relative;
  top: 3px;
}

li > * {
  display: inline;
}

a {
  color: var(--color-neutral);
  text-decoration: none;
}
</style>

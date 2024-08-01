<template>
  <nav>
    <ul>
      <li><RouterLink to="/">home</RouterLink></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "TheNavAdmin",
};
</script>

<style scoped>
nav {
  background-color: black;
}

nav a {
  text-decoration: none;
  color: var(--color-text-light);
}

nav li {
  display: inline;
  padding: 0px 20px 0px 20px;
}
</style>

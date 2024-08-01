<script setup></script>

<template>
  <nav>
    <div class="announcement-bar">...</div>

    <RouterLink to="/home" id="logo_link"
      ><img src="/logos/isotipo-1.svg" alt="brand icon"
    /></RouterLink>
    <a id="logo_letra" href="#"
      ><img src="/logos/canamarine-letra.svg" alt="email icon"
    /></a>

    <!-- <li><RouterLink to="/catering">Catering</RouterLink></li> -->
    <a href="mailto:info.canamarine@gmail.com" target="_blank"
      ><img src="/icons/contact-us.svg" alt="email icon"
    /></a>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: var(--color-theme);
  font-size: 1rem;
  gap: 20px;
  padding: 25px 20px;
}

#logo_letra > img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
}

#logo_link > img {
  width: 35px;
}

#logo_link {
  display: flex;
  align-items: center;
}

a {
  text-decoration: none;
  color: var(--color-text-light);
}

nav img {
  width: 30px;
}

.announcement-bar {
  display: none;
  height: 20px;
  font-size: 0.8em;
  text-align: center;
  line-height: 20px;
  vertical-align: middle;
  margin: 0px;
  padding: 0px;
  background-color: var(--color-accent);
  color: var(--color-theme-neutral);
}
</style>

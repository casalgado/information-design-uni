<script setup>
import { useCartStore } from "../stores/cartStore";

const store = useCartStore();
</script>

<template>
  <footer>
    <img id="logo" src="/logos/isotipo-1.svg" alt="white logo" />
    <p>7181 Woodbine Ave, 238, Markham, Ontario</p>
    <p class="trademark">
      developed by <a href="https://carsalhaz.com/">carsalhaz</a>
    </p>
  </footer>
</template>

<style scoped>
footer {
  background-color: var(--color-theme-light);
  color: var(--color-text-light);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-top: 1em;
  padding-bottom: 1em;
}

footer p {
  text-align: center;
}

#logo {
  width: 50px;
}

.company_info img {
  width: 24px;
}

.icon_item {
  display: flex;
  gap: 5px;
}

.login_links li {
  text-align: right;
}

.trademark {
  font-size: 0.8rem;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: white;
}

.trademark a {
  text-decoration: underline;
  color: white;
}

@media screen and (max-width: 600px) {
  .company_info {
    padding: 0px;
  }

  footer p {
    font-size: 0.9rem;
  }

  footer {
    flex-direction: column;
    gap: 30px;
  }

  ul {
    padding: 0px;
  }

  ul * {
    text-align: center;
  }
}
</style>

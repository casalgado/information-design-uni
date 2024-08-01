<script setup>
import { useRouter } from "vue-router";
import IntroSection from "../../components/home/IntroSection.vue";
import ContactUs from "../../components/home/ContactUs.vue";

// onMounted(() => {
//   let externalScript = document.createElement("script");
//   externalScript.setAttribute("src", "https://w.behold.so/widget.js");
//   externalScript.setAttribute("type", "module");
//   document.head.appendChild(externalScript);
// });
</script>

<template>
  <section class="hero full-width">
    <img src="/images/hero_image.jpg" alt="" />
  </section>
  <IntroSection />
  <ContactUs />
</template>

<style scoped>
.hero {
  height: 400px;
  overflow: hidden;
  position: relative;
  background-color: var(--color-theme-neutral);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 90px;
  margin-top: 0px;
  box-shadow: var(--shadow-1);
}

.button-wrapper {
  display: flex;
  justify-content: center;
}

.button-wrapper > button {
  width: 300px;
  font-weight: bold;
  font-size: 1.3em;
  box-shadow: var(--shadow-3);
}

.hero img {
  position: absolute;
  height: 100%;
  right: 0px;
}

@media only screen and (max-width: 600px) {
  .hero {
    height: 400px;
  }

  .hero img {
    right: -50px;
  }
}

@media only screen and (min-width: 900px) {
  .hero {
    height: 500px;
  }
  .hero img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}

@media only screen and (min-width: 1300px) {
  .hero {
    height: 600px;
  }
  .hero img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}

/*
height: 100% in mobile.
width: 100% in desktop.
*/
</style>

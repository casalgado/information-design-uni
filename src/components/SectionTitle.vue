<template>
  <div class="section-head">
    <h1>{{ title }}</h1>
    <p v-if="description">{{ description }}</p>
    <!-- <img src="/vectors/ornamento.svg" alt="" /> -->
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: () => "Titulo",
  },
  description: {
    type: String,
    default: () => null,
  },
});
</script>

<style scoped>
.section-head {
  text-align: center;
}
.section-head > h1 {
  font-family: poppins;
  color: var(--color-accent);
  text-transform: uppercase;
}

.section-head img {
  width: 200px;
}
</style>

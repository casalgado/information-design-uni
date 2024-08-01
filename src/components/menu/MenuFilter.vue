<template>
  <ul class="card">
    <li v-for="(c, i) in collections" :key="i" @click="select(c)">
      {{ c.title }}
    </li>
    <li @click="select({ id: 'all' })" v-if="allowAll">Todas</li>
  </ul>
</template>

<script setup>
const props = defineProps({
  collections: {
    type: Array,
    default: () => [],
  },
  allowAll: {
    type: Boolean,
    default: () => true,
  },
});

const emit = defineEmits(["selectCollection"]);
function select(collection) {
  emit("selectCollection", collection.id);
}
</script>

<style scoped>
ul {
  text-align: center;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
}

li {
  display: inline-block;
  list-style-type: none;
  cursor: pointer;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  margin: 5px;
  min-width: 90px;
  background-color: var(--color-neutral);
  font-size: 0.9rem;
}

li:hover {
  background-color: var(--color-gray);
}

@media only screen and (max-width: 1000px) {
  ul {
    margin-left: 10px;
    margin-right: 10px;
  }
}

@media only screen and (max-width: 600px) {
  li {
    padding: 5px;
    min-width: 50px;
  }
}
</style>

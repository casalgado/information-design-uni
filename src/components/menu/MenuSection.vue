<template>
  <div class="menu-section">
    <SectionTitle
      :title="collection.title"
      :description="collection.description"
    />
    <MenuItem
      v-for="(p, i) in products"
      :key="i"
      :product="p"
      :directToCart="collection.canBeAddedToCartItem"
      @menuItemClick="showModal"
    />
  </div>
</template>

<script setup>
import MenuItem from "./MenuItem.vue";
import SectionTitle from "@/components/SectionTitle.vue";
const emit = defineEmits(["showModal"]);
const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  collection: {
    type: Object,
    default: () => {},
  },
});

function showModal(content) {
  emit("showModal", content);
}
</script>

<style scoped>
.menu-section {
  align-items: start;
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  max-width: 1600px !important;
}

.section-head {
  width: 100%;
}

@media only screen and (max-width: 580px) {
  .menu-section {
  }
}

@media only screen and (min-width: 580px) {
  .menu-section {
  }
}

@media only screen and (min-width: 790px) {
  .menu-section {
  }
}

@media only screen and (min-width: 1200px) {
  .menu-section {
  }
}
</style>

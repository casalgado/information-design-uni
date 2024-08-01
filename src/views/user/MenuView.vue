<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { onBeforeMount } from "vue";
import { getAll } from "@/helpers/db.js";
import MenuFilter from "@/components/menu/MenuFilter.vue";
import ModalProduct from "@/components/menu/ModalProduct.vue";
import MenuSection from "@/components/menu/MenuSection.vue";
import CartSummary from "@/components/cart/CartSummary.vue";
import TheLoader from "../../components/TheLoader.vue";

// fetch data
const allProducts = ref([]);
const allCollections = ref([]);
const loading = ref(true);
onBeforeMount(() => {
  const p1 = getAll("products").then((res) => (allProducts.value = res.data));
  const p2 = getAll("collections").then((res) => {
    allCollections.value = res.data;
    activeCollections.value = res.data;
  });
  Promise.all([p1, p2]).then(() => (loading.value = false));
});

// modal functionality with router in order to close on back button
const router = useRouter();
const route = useRoute();
const modalActive = ref(false);
const activeProduct = ref({});

function showModal(content) {
  activeProduct.value = content.product;
  modalActive.value = true;
  router.push({
    name: "menu",
    query: {
      modalActive: true,
    },
  });
}

function hideModal() {
  modalActive.value = false;
  router.replace({
    name: "menu",
  });
}
watch(route, (currentValue) => {
  if (!currentValue.query.modalActive) {
    modalActive.value = false;
  }
});

// filter functionality
const activeCollections = ref([{ id: "" }]);
function filter(id) {
  if (id == "all") {
    activeCollections.value = allCollections.value;
  } else {
    activeCollections.value = allCollections.value.filter((e) => e.id == id);
  }
}
</script>

<template>
  <ModalProduct
    v-if="modalActive"
    @hideModal="hideModal"
    :product="activeProduct"
    :allProducts="allProducts"
    :allCollections="allCollections"
  />
  <TheLoader v-if="loading" />
  <section v-if="!loading" class="menu">
    <CartSummary v-if="!modalActive" />
    <MenuFilter @selectCollection="filter" :collections="allCollections" />
    <MenuSection
      v-for="(c, i) in activeCollections"
      :key="i"
      :products="
        allProducts
          .filter((e) => e.collection == c.id)
          .filter((e) => e.id !== '-Na2uIBGDj40jwVckIiI')
      "
      @showModal="showModal"
      :collection="c"
    />
  </section>
</template>

<style scoped>
.menu {
  padding-bottom: 50px;
  min-height: 92vh;
  min-height: 92dvh;
  max-width: 1600px !important;
}
</style>

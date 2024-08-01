<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { getAll, destroyOne } from "@/helpers/db.js";
import MenuFilter from "@/components/menu/MenuFilter.vue";
import ProductSnippet from "@/components/admin/products/ProductSnippet.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import TheLoader from "@/components/TheLoader.vue";

const allProducts = ref([]);
const allCollections = ref([]);
const activeCollections = ref([{ id: "" }]);
const loading = ref(true);

const router = useRouter();

// fetches data
onBeforeMount(() => {
  const p1 = getAll("products").then((res) => (allProducts.value = res.data));
  const p2 = getAll("collections").then((res) => {
    allCollections.value = res.data;
    activeCollections.value = res.data;
  });

  Promise.all([p1, p2]).then(() => (loading.value = false));
});

// opens edit form with product id
function goToForm(product) {
  router.push({ name: "editProduct", params: { id: product.id } });
}

// removes product from database
function destroy(product) {
  var confirmation = confirm("Seguro que deseas eliminar producto?");
  if (confirmation === true) {
    destroyOne("products", product).then((res) => {
      alert(res);
      getAll("products").then((res) => (allProducts.value = res.data));
    });
  }
}

// gets collection title based on id
function collectionTitle(id) {
  const collection = allCollections.value.find((e) => e.id === id);
  if (collection) {
    return collection.title;
  } else {
    return "";
  }
}

// filters collections based on id
function filter(id) {
  if (id == "all") {
    activeCollections.value = allCollections.value;
  } else {
    activeCollections.value = allCollections.value.filter((e) => e.id == id);
  }
}
</script>

<template>
  <section>
    <SectionTitle title="Productos" />
    <MenuFilter
      @selectCollection="filter"
      :collections="allCollections"
      :allowAll="false"
      class="filter"
    />
    <TheLoader v-if="loading" />
    <ul>
      <ProductSnippet
        v-for="(p, i) in allProducts.filter(
          (e) => e.collection == activeCollections[0].id
        )"
        :key="i"
        :product="p"
        :collection="collectionTitle(p.collection)"
        @destroy="destroy"
        @edit="goToForm"
      />
    </ul>
  </section>
</template>

<style scoped>
ul {
  padding: 10px;
}
</style>

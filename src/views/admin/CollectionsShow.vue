<template>
  <section>
    <SectionTitle title="Categorias" />
    <CollectionSnippet
      v-for="(c, i) in allCollections"
      :key="i"
      :collection="c"
      @remove="remove"
      @edit="goToForm"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";
import { getAll, destroyOne } from "@/helpers/db.js";
import CollectionSnippet from "@/components/admin/collections/CollectionSnippet.vue";
import SectionTitle from "../../components/SectionTitle.vue";

// fetch data
const allProducts = ref([]);
const allCollections = ref([]);
onBeforeMount(() => {
  getAll("products").then((res) => (allProducts.value = res.data));
  getAll("collections").then((res) => {
    allCollections.value = res.data;
  });
});

// opens edit form with collection id
const router = useRouter();
function goToForm(collection) {
  router.push({
    name: "editCollection",
    params: { id: collection.id },
  });
}

// checks if products exist for that collection
function isEmpty(collection) {
  return Object.values(allProducts.value).filter(
    (e) => e.collection == collection.id
  ).length > 0
    ? false
    : true;
}

// removes collection from database
function remove(collection) {
  if (isEmpty(collection)) {
    var confirmation = confirm("Seguro que deseas eliminar categoria?");
    if (confirmation === true) {
      destroyOne("collections", collection).then(() => {
        getAll("collections").then((res) => (allCollections.value = res.data));
      });
    }
  } else {
    alert(
      "Todavia existen productos en categoria. Eliminar productos antes de eliminar categoria"
    );
  }
}
</script>

<style scoped></style>

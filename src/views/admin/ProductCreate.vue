<script setup>
import { ref } from "vue";
import { onBeforeMount } from "vue";
import { getAll, createOneProduct } from "@/helpers/db.js";
import { useRouter } from "vue-router";
import ProductForm from "@/components/admin/products/ProductForm.vue";
import SectionTitle from "../../components/SectionTitle.vue";
import TheLoader from "../../components/TheLoader.vue";

const response = ref("");
const allCollections = ref([]);
const loading = ref(false);

const router = useRouter();

onBeforeMount(() => {
  getAll("collections").then((res) => (allCollections.value = res.data));
});

function create(formData) {
  loading.value = ref(true);
  createOneProduct(formData).then((res) => {
    loading.value = ref(false);
    response.value = res;
    alert(response.value);
    router.push({ name: "productsShow" });
  });
}
</script>

<template>
  <section>
    <SectionTitle title="Crear Producto" />
    <TheLoader v-if="loading" />
    <ProductForm
      @submitted="create"
      :options="allCollections"
      :class="loading ? 'loading' : ''"
    />
    <p>{{ response }}</p>
  </section>
</template>

<style scoped>
.loading {
  opacity: 0.4;
}
</style>

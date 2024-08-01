<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { onBeforeMount } from "vue";
import { getAll, getOne, updateOneProduct } from "@/helpers/db.js";
import ProductForm from "@/components/admin/products/ProductForm.vue";
import SectionTitle from "../../components/SectionTitle.vue";
import TheLoader from "../../components/TheLoader.vue";

const response = ref("");
const product = ref({});
const allCollections = ref([]);
const loading = ref(true);

const router = useRouter();
const route = useRoute();

onBeforeMount(() => {
  const p1 = getOne("products", route.params.id).then(
    (res) => (product.value = res.data)
  );
  const p2 = getAll("collections").then(
    (res) => (allCollections.value = res.data)
  );
  Promise.all([p1, p2]).then(() => (loading.value = false));
});

function update(formData) {
  loading.value = true;
  console.log("fD", formData);
  updateOneProduct(formData, route.params.id).then((res) => {
    loading.value = false;
    response.value = res;
    alert(response.value);
    router.push({ name: "productsShow" });
  });
}
</script>

<template>
  <section>
    <SectionTitle title="Editar Producto" />
    <TheLoader v-if="loading" />
    <ProductForm
      @submitted="update"
      ref="form"
      :options="allCollections"
      :product="product"
      :class="loading ? 'loading' : ''"
    />
    <p>{{ response }}</p>
  </section>
</template>

<style scoped>
.loading {
  opacity: 0.4;
}

.loader {
  position: absolute;
}
</style>

<template>
  <section>
    <SectionTitle title="Crear Categoria" />
    <CollectionForm @submitted="create" ref="form" />
    <p>{{ response }}</p>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createOneCollection } from "../../helpers/db";
import CollectionForm from "@/components/admin/collections/CollectionForm.vue";
import SectionTitle from "../../components/SectionTitle.vue";

const response = ref("");
const router = useRouter();

function create(formData) {
  createOneCollection(formData).then((res) => {
    response.value = res;
    alert(response.value);
    router.push({ name: "collectionsShow" });
  });
}
</script>

<style scoped></style>

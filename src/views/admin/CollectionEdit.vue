<template>
  <section>
    <SectionTitle title="Editar Categoria" />
    <CollectionForm @submitted="update" ref="form" :collection="collection" />
    <p>{{ response }}</p>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";
import { getOne, updateOneCollection } from "@/helpers/db.js";
import CollectionForm from "@/components/admin/collections/CollectionForm.vue";
import SectionTitle from "../../components/SectionTitle.vue";

const response = ref("");
const collection = ref({});
const router = useRouter();
const route = useRoute();

onMounted(() => {
  getOne("collections", route.params.id).then(
    (res) => (collection.value = res.data)
  );
});

function update(formData) {
  updateOneCollection(formData, route.params.id).then((res) => {
    response.value = res;
    alert(response.value);
    router.push({ name: "collectionsShow" });
  });
}
</script>

<style scoped></style>

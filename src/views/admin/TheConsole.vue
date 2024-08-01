<template>
  <div>
    <TheButton text="updateAll" @btnClick="handleClick" />
    {{ response }}
  </div>
</template>

<script setup>
import { ref } from "vue";
import { updateAll } from "@/helpers/db.js";
import TheButton from "../../components/TheButton.vue";

const response = ref([]);

function handleClick() {
  updateAll().then((res) => {
    response.value = res.data;
  });
}
</script>

<style scoped></style>

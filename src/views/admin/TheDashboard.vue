<template>
  <section>
    <SectionTitle title="Pedidos" />
    <TheLoader v-if="loading" />
    <div v-if="!loading" class="card wrapper">
      <table>
        <tr>
          <th>Cliente</th>
          <th>Fecha</th>
          <th class="ct-text"># de Productos</th>
          <th class="ct-text">Total</th>
        </tr>
        <tr
          v-for="(c, i) in allItems"
          :key="i"
          @click="goToProduct(c)"
          class="content-row"
        >
          <td>{{ c.client_info.client }}</td>
          <td>{{ formatTime(c.created_at) }}</td>
          <td class="ct-text">{{ numberOfProducts(c) }}</td>
          <td class="ct-text">{{ toCurrency(c.total) }}</td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import SectionTitle from "../../components/SectionTitle.vue";
import TheLoader from "../../components/TheLoader.vue";
import { useAuthStore } from "@/stores/authStore.js";
import { getAll } from "@/helpers/db.js";
import { toCurrency } from "@/helpers/currency.js";

const loading = ref(true);
const allItems = ref([]);
const allProducts = ref([]);
const authStore = useAuthStore();

const router = useRouter();

onBeforeMount(() => {
  const p1 = getAll("cartItems").then((res) => {
    allItems.value = res.data.reverse();
  });
  const p2 = getAll("products").then((res) => {
    allProducts.value = res.data;
  });
  Promise.all([p1, p2]).then(() => (loading.value = false));
});

function goToProduct(product) {
  router.push({
    name: "showCartItem",
    params: { id: product.id, cartItem: { ...product } },
  });
}

function formatTime(s) {
  const dtFormat = new Intl.DateTimeFormat("es-CO", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Bogota",
  });

  return dtFormat.format(new Date(s));
}

function numberOfProducts(c) {
  if (c.order_info) {
    return c.order_info.length;
  }
  return 0;
}

watch(
  () => authStore.getIdToken,
  () => {
    console.log(authStore.getIdToken);
  }
);
</script>

<style scoped>
.wrapper {
  padding: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
}

th {
  font-weight: bold;
  text-align: start;
}

.content-row {
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.content-row td {
  padding: 5px;
}

.content-row:hover {
  background-color: var(--color-neutral);
}

.content-row {
  border-top: 1px solid #ddd;
}
</style>

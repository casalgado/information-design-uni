<template>
  <section>
    <SectionTitle title="Pedido" />
    <div class="card">
      <div class="client-info">
        <p>
          <span class="client">{{ `${cartItem.client_info.client}` }}</span>
        </p>
        <p>fecha: {{ formatTime(cartItem.created_at) }}</p>
        <p>
          direccion:
          {{ showAddress(cartItem.client_info) }}
        </p>
        <p>Metodo de Pago: {{ `${cartItem.client_info.payment}` }}</p>
        <p>Entrega: {{ `${cartItem.client_info.delivery}` }}</p>
      </div>
      <div class="container" v-if="!loading">
        <SingleProduct
          v-for="(product, i) in cartItem.order_info"
          :key="i"
          :product="product"
          :allProducts="allProducts"
        />
      </div>
      <p class="ct-text total">Total: {{ toCurrency(cartItem.total) }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { toCurrency } from "@/helpers/currency.js";
import SingleProduct from "@/components/admin/cartItems/SingleProduct.vue";
import { getAll, getOne } from "@/helpers/db.js";
import { useRoute } from "vue-router";
import SectionTitle from "../../components/SectionTitle.vue";

const route = useRoute();

const loading = ref(true);
const cartItem = ref({});
const allProducts = ref([]);

onBeforeMount(() => {
  const id = route.params.id;
  console.log(id);
  const p1 = getOne("cartItems", id).then((res) => {
    console.log("res", res.data);
    cartItem.value = res.data;
  });
  const p2 = getAll("products").then((res) => {
    allProducts.value = res.data;
  });
  Promise.all([p1, p2]).then(() => (loading.value = false));
});

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

function showAddress(client_info) {
  let address = "";
  if (client_info.address && client_info.address.trim() !== "") {
    address += client_info.address;
  }
  if (client_info.houseNumber && client_info.houseNumber.trim() !== "") {
    address += ", " + client_info.houseNumber;
  }
  if (client_info.locality && client_info.locality.trim() !== "") {
    address += ", " + client_info.locality;
  }
  return address;
}
</script>

<style scoped>
.client {
  font-weight: 600;
}
.card {
  font-size: 14px;
  padding: 15px;
}

.client-info {
  margin: 5px;
}

.total {
  font-size: 1.2em;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>

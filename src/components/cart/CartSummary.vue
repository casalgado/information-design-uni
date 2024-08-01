<template>
  <div v-if="store.getNumberOfCartItems > 0" class="cart-summary">
    <div>
      {{ store.getNumberOfCartItems }} Producto{{
        store.getNumberOfCartItems > 1 ? "s" : ""
      }}
    </div>
    <div>{{ toCurrency(store.getCartTotal) }}</div>
    <TheButton
      text="Carrito"
      @btnClick="showCart"
      iconPath="/images/cart-shopping-solid.svg"
    />
  </div>
</template>

<script setup>
import { toCurrency } from "@/helpers/currency.js";
import TheButton from "@/components/TheButton.vue";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";

const store = useCartStore();
const router = useRouter();

function showCart() {
  router.push({ name: "carrito" });
}
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .cart-summary {
    bottom: 0;
    margin: 4%;
    width: 92%;
  }
}

@media only screen and (min-width: 600px) {
  .cart-summary {
    bottom: 25px;
    left: 50%;
    margin-left: -400px;
    width: 800px;
  }
}
.cart-summary {
  position: fixed;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: white;
  align-items: center;
  box-shadow: var(--shadow-1);
  border-radius: 2px;
  padding: 10px;
  z-index: 99;
}

.cart-summary > * {
  justify-self: center;
}
</style>

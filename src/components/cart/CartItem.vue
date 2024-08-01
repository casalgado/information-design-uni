<template>
  <li
    class="product-wrapper"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div class="product-section images">
      <img
        :src="`${product.images[0].large || product.images[0].original}`"
        alt=""
        @click="showModal"
      />
    </div>

    <div class="product-section details">
      <p class="title">
        {{ product.title }}
        <span class="price">{{ toCurrency(product.price) }}</span>
      </p>

      <p class="option" v-if="Object.keys(cartItem.selectedOption).length > 0">
        {{ cartItem.selectedOption.name }}
        <span class="" v-if="cartItem.selectedOption.addedPrice > 0"
          >+{{
            toCurrency(
              cartItem.selectedOption.addedPrice
                ? cartItem.selectedOption.addedPrice
                : 0
            )
          }}</span
        >
      </p>

      <p class="option" v-for="secondOption in cartItem.selectedSecondOptions">
        {{ secondOption.name }}
      </p>

      <p class="option" v-if="cartItem.comboDrink && cartItem.comboDrink.value">
        Con: {{ cartItem.comboDrink.name }}
      </p>

      <p
        class="option"
        v-if="cartItem.cutlery && cartItem.cutlery.value == 'Si'"
      >
        Cubiertos: {{ cartItem.cutlery.name }}
      </p>

      <p class="option" v-if="product.spicy">
        Nivel de Picante: {{ cartItem.spiceLevel.value }}
      </p>

      <div v-for="(e, i) in Object.values(cartItem.selectedExtras)" :key="i">
        <p class="extras">
          +{{ e.quantity }} {{ e.title }}
          <span>+{{ toCurrency(e.price * e.quantity) }}</span>
        </p>
      </div>

      <p v-if="cartItem.comment" class="comment">"{{ cartItem.comment }}"</p>
    </div>
    <div class="product-section calls-to-action">
      <TheButton
        v-if="!directToCart"
        text="editar"
        theme="warning"
        id="edit-button"
        @btnClick="showModal"
      />
      <QuantityButton
        :quantity="cartItem.quantity"
        @increase="handleQuantityChange(1)"
        @decrease="handleQuantityChange(-1)"
      />
      <p class="total total-sm">
        {{ toCurrency(cartItem.total * cartItem.quantity) }}
      </p>
      <p class="total total-lg">
        {{ toCurrency(cartItem.total * cartItem.quantity) }}
      </p>
    </div>
  </li>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore.js";
import { toCurrency } from "@/helpers/currency.js";
import TheButton from "@/components/TheButton.vue";
import QuantityButton from "@/components/QuantityButton.vue";

const store = useCartStore();
const emit = defineEmits(["showModal"]);

const props = defineProps({
  product: {
    type: Object,
    // default is required to avoid error when component mounted before prop is passed
    default: () => {
      return {
        title: "",
        images: [{ original: "" }],
        price: 1,
        spicy: false,
      };
    },
  },
  cartItem: {
    type: Object,
    default: () => {},
  },
  directToCart: {
    type: Boolean,
    default: () => false,
  },
});

function showModal() {
  console.log(props.cartItem);
  if (!props.cartItem.directToCart) {
    emit("showModal", {
      product: props.product,
      cartItem: props.cartItem,
    });
  }
}

function handleQuantityChange(delta) {
  store.updateCartItem(props.cartItem.id, {
    quantity: props.cartItem.quantity + delta,
  });
}
</script>

<style scoped>
.product-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;

  padding-right: 10px;
  background-color: var(--vt-c-white);
  border-radius: var(--border-radius);
  gap: 20px;
  box-shadow: var(--shadow-1);
  position: relative;
  margin-top: 15px;
  overflow: hidden;
}

.images {
  align-self: center;
  justify-self: center;
  width: 150px;
  overflow: hidden;
}

.images img {
  left: 50%;
  display: block;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  height: 150px;
  background-color: var(--color-theme-neutral);
  display: block;
  cursor: pointer;
}

/* details styles */
.details {
  grid-column: span 3;
}

.option,
.comment,
.extras {
  font-size: 0.8em;
  padding-left: 10px;
}

.price {
  font-family: poppins;
  letter-spacing: 1px;
  padding-left: 10px;
}

.total {
  font-weight: 500;
  font-family: poppins;
  color: var(--color-accent);
  letter-spacing: 1px;
}

button {
  padding: 5px;
  font-size: 0.8em;
  margin-right: 10px;
}

#edit-button {
  padding: 5px 10px 5px 10px;
}

@media only screen and (max-width: 600px) {
  .details {
    grid-column: 2;
    grid-row: 1;
  }
  .calls-to-action {
    justify-self: center;
    grid-column: span 2;
    margin-bottom: 10px;
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .total-lg {
    display: none;
  }
}

@media only screen and (min-width: 600px) {
  .product-wrapper {
    grid-template-columns: repeat(5, 1fr);
  }

  .details {
    padding-top: 10px;
  }

  .calls-to-action {
    grid-column: span 1;
    display: flex;
    justify-content: right;
    align-items: center;
    padding-right: 16px;
  }

  .total-lg {
    position: absolute;
    bottom: 10px;
  }

  .total-sm {
    display: none;
  }
}
</style>

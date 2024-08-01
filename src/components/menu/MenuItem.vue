<template>
  <div
    class="menu-item-card"
    :class="directToCart ? 'directToCart' : ''"
    @click="handleClick()"
  >
    <div v-if="!product.inStock" class="overlay">
      <p>agotado</p>
    </div>

    <div v-if="product.justAdded" class="justAdded">nuevo</div>

    <div class="images">
      <img
        :src="`${product.images[0].large || product.images[0].original}`"
        alt=""
      />
      <TheTag
        v-if="product.veggie"
        image="vegan-centered.svg"
        hoverText="Vegano"
      />
    </div>
    <div class="content-cont">
      <h3 class="title">{{ product.title }}</h3>
      <p class="description">{{ product.description }}</p>
      <h3 class="price">
        {{ toCurrency(product.price) }}
      </h3>
      <QuantityButton
        v-if="directToCart && product.inStock"
        :quantity="cartItemForm.quantity"
        @increase="handleQuantityChange(1)"
        @decrease="handleQuantityChange(-1)"
      />
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";
import { toCurrency } from "@/helpers/currency.js";
import { ref, watch, onBeforeMount } from "vue";
import QuantityButton from "./../QuantityButton.vue";
import TheTag from "../TheTag.vue";

const store = useCartStore();
const emit = defineEmits(["menuItemClick"]);
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  directToCart: {
    type: Boolean,
    default: () => false,
  },
});

const cartItemForm = ref();
const productInCart = ref();

function initializeProduct(p) {
  productInCart.value = store.getProductById(props.product.id);
  cartItemForm.value.productId = p.id;
  cartItemForm.value.total = p.price;
  cartItemForm.value.directToCart = props.directToCart.value;
  cartItemForm.value.comment = null;
  if (productInCart.value) {
    cartItemForm.value.quantity = productInCart.value.quantity;
    cartItemForm.value.id = productInCart.value.id;
  } else {
    cartItemForm.value.quantity = 0;
  }
}

onBeforeMount(() => {
  const template = JSON.parse(JSON.stringify(store.cartItemTemplate));
  cartItemForm.value = template;
  initializeProduct(props.product);
});

watch(
  () => props.product.id,
  () => {
    initializeProduct(props.product);
  }
);

function handleQuantityChange(delta) {
  if (productInCart.value) {
    store.updateCartItem(cartItemForm.value.id, {
      quantity: cartItemForm.value.quantity + delta,
    });
  } else {
    cartItemForm.value.quantity = 1;
    store.addCartItem({ ...cartItemForm.value });
  }
  initializeProduct(props.product);
}

function handleClick() {
  if (!props.directToCart && props.product.inStock) {
    emit("menuItemClick", { product: props.product });
  }
}
</script>

<style scoped>
.menu-item-card {
  --menu-item-width: 280px;
  color: var(--color-black);
  box-shadow: var(--shadow-2);
  border-radius: var(--border-radius);
  margin: 15px;
  width: var(--menu-item-width);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr;
  background-color: var(--color-neutral);
  overflow: hidden;
  cursor: pointer;
  font-family: poppins;
}

h3 {
  font-family: poppins !important;
}

.directToCart {
  cursor: default;
}

#quantity-button {
  position: absolute;
  bottom: 6px;
  left: 6px;
}
/* there is code repetition here with product snippet */

.images {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.images img {
  display: block;
  object-fit: cover;
  width: 100%;
  background-color: var(--color-complement);
}

.content-cont {
  padding: 5px 8px 8px 8px;
  position: relative;
}

.title,
.price {
  font-size: 1rem !important;
  font-weight: 500;
}
.description {
  font-size: 0.75em !important;
}
.price {
  letter-spacing: 1px;
  width: 100%;
  text-align: right;
  color: var(--color-accent);
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: default;
  background-color: rgba(235, 235, 235, 0.5);
  z-index: 98;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-theme-neutral);
}

.overlay p {
  background-color: black;
  text-align: center;
  height: 25px;
  width: 70%;
  vertical-align: middle;
  line-height: 25px;
  transform: rotate(-5deg);
  text-transform: uppercase;
}

.tag {
  position: absolute;
  bottom: 10px;
  right: 0px;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
  color: var(--color-theme-neutral);
  transition: all 0.5s;
}

.justAdded {
  position: absolute;
  background-color: var(--color-accent);
  color: var(--color-theme-neutral);
  z-index: 8;
  left: 0px;
  top: 0px;
  border-radius: var(--border-radius);
  width: 100%;
  text-align: center;
  transition: all 0.5s;
}

.menu-item-card:hover .justAdded {
  transform: translateY(-100%);
}

.menu-item-card:hover .tag {
  transform: translateX(100%);
}

@media only screen and (max-width: 600px) {
  .menu-item-card {
    width: 80%;
  }
  .description {
    max-width: 80%;
  }
}

@media only screen and (min-width: 600px) {
  .menu-item-card {
    grid-template-rows: max-content max-content;
  }
  .title {
    /* font-family: "Tangerine", cursive; */
    font-size: 1.4em;
  }

  .description {
    font-size: 0.9em;
  }

  .images {
    height: calc(var(--menu-item-width) * 0.666);
  }
}
/*
.menu-item-card {
  background-color: var(--color-theme-neutral);
  box-shadow: var(--shadow-1);
  margin: 15px;
  display: grid;
  border-radius: var(--border-radius);
  grid-template-columns: 1fr 10fr;
  color: var(--color-neutral);
  overflow: hidden;
  cursor: pointer;
}

.images {
  align-self: center;
  justify-self: center;
  width: 125px;
  overflow: hidden;
}

.images img {
  left: 50%;
  display: block;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  height: 200px;
  background-color: var(--color-theme-neutral);
  display: block;
}

.content-cont {
  padding: 5px 10px 10px 10px;
  position: relative;
}

.title {
  font-family: "Tangerine", cursive;
  color: var(--color-complement);
}
.description {
  font-size: 0.9em;
  color: var(--color-gray);
}
.price {
  position: absolute;
  right: 15px;
  bottom: 5px;
  font-family: minion;
  color: var(--color-accent);
}
*/
</style>

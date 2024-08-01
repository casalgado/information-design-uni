<template>
  <div class="modal-container" @click.self="emit('hideModal')">
    <div class="modal-card">
      <div class="xmark" @click="emit('hideModal')">
        <img src="" alt="" />
      </div>

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
        <!-- {{ cartItemForm }} -->
      </div>
      <div id="container" class="content-cont">
        <h2 class="title">{{ product.title }}</h2>
        <p class="description">{{ product.description }}</p>

        <div class="client-choices">
          <div v-if="product.combo" class="choice-section">
            <p
              class="choice-section-subtitle"
              :class="highlightObligatory ? 'red' : ''"
            >
              Bebida del Combo <span>(obligatorio)</span>
            </p>
            <ul>
              <li
                v-for="(option, i) in comboOptions"
                :key="i"
                @click="cartItemForm.comboDrink = option"
              >
                <div>
                  <label :for="`rbcombo${i}`">{{ option.name }}</label>
                  <p class="choice-price" v-if="option.addedPrice > 0">
                    +{{ toCurrency(option.addedPrice) }}
                  </p>
                </div>

                <input
                  type="radio"
                  :id="`rbcombo${i}`"
                  :value="option"
                  v-model="cartItemForm.comboDrink"
                />
              </li>
            </ul>
          </div>
          <div v-if="product.productOptions" class="choice-section options">
            <p
              class="choice-section-subtitle"
              :class="highlightObligatory ? 'red' : ''"
            >
              Guarnición <span>(obligatorio)</span>
            </p>
            <ul>
              <li
                v-for="(option, i) in product.productOptions"
                :key="i"
                @click="cartItemForm.selectedOption = option"
              >
                <div>
                  <label :for="`rb${i}`">{{ option.name }}</label>
                  <p class="choice-price" v-if="option.addedPrice > 0">
                    +{{ toCurrency(option.addedPrice) }}
                  </p>
                </div>

                <input
                  type="radio"
                  :id="`rb${i}`"
                  :value="option"
                  v-model="cartItemForm.selectedOption"
                />
              </li>
            </ul>
          </div>

          <div v-if="product.secondOptions" class="choice-section options">
            <p
              class="choice-section-subtitle"
              :class="highlightObligatory ? 'red' : ''"
            >
              Opciones
            </p>
            <ul>
              <li v-for="(option, i) in product.secondOptions" :key="i">
                <div>
                  <label :for="`chb${i}`">{{ option.name }}</label>
                </div>

                <input
                  type="checkbox"
                  :id="`chb${i}`"
                  :value="option"
                  v-model="selectedSecondOptions"
                />
              </li>
            </ul>
          </div>

          <div class="choice-section options" v-if="product.spicy">
            <p class="choice-section-subtitle">Nivel de Picante</p>
            <ul>
              <li
                v-for="(option, i) in spiceOptions"
                :key="i"
                @click="cartItemForm.spiceLevel = option"
              >
                <div>
                  <label :for="`rbs${i}`">{{ option.name }}</label>
                </div>

                <input
                  type="radio"
                  :id="`rbs${i}`"
                  :value="option"
                  v-model="cartItemForm.spiceLevel"
                />
              </li>
            </ul>
          </div>

          <div class="choice-section options">
            <p class="choice-section-subtitle">Cubiertos</p>
            <ul>
              <li
                v-for="(option, i) in cutleryOptions"
                :key="i"
                @click="cartItemForm.cutlery = option"
              >
                <div>
                  <label :for="`rb${i}`">{{ option.name }}</label>
                </div>

                <input
                  type="radio"
                  :id="`rb${i}`"
                  :value="option"
                  v-model="cartItemForm.cutlery"
                />
              </li>
            </ul>
          </div>

          <div
            class="choice-section extras"
            v-for="(c, i) in allCollections.filter(
              (e) => e.canBeAddedToCartItem
            )"
            :key="i"
          >
            <p class="choice-section-subtitle">{{ c.title }}</p>
            <ul>
              <li
                v-for="(extra, i) in allProducts.filter(
                  (e) => e.collection == c.id
                )"
                :key="i"
                :class="
                  product.collection !== '-N8xp0rzysnBu89UPs6u' &&
                  extra.id == '-Na2uIBGDj40jwVckIiI'
                    ? 'hide'
                    : 'show'
                "
              >
                <div>
                  <div>{{ extra.title }}</div>
                  <div class="choice-price">{{ toCurrency(extra.price) }}</div>
                </div>
                <QuantityButton
                  :quantity="
                    cartItemForm.selectedExtras[extra.id]
                      ? cartItemForm.selectedExtras[extra.id].quantity
                      : 0
                  "
                  @increase="increaseExtraQuantity(extra.id)"
                  @decrease="decreaseExtraQuantity(extra.id)"
                  class="extra-quantity-button"
                />
              </li>
            </ul>
          </div>

          <div class="choice-section comment">
            <p class="choice-section-subtitle">Comentario</p>
            <textarea
              type="text"
              class="comment-box clean_border"
              rows="3"
              v-model="cartItemForm.comment"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="buttons-container">
        <QuantityButton
          class="modalQtyButton"
          :quantity="cartItemForm.quantity"
          @increase="increaseCartItemQuantity"
          @decrease="decreaseCartItemQuantity"
        />

        <TheButton
          :text="`${cartItem ? 'Actualizar' : 'Agregar'} ${toCurrency(
            cartItemTotal * cartItemForm.quantity
          )}`"
          :active="canBeSubmitted"
          @btnClick="handleSubmit"
          @click="handleInactiveClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
/*
 This component buids on a cartItemForm template taken from the store.
 This object represents the choices the client makes when adding the product to the cart.
 Choices include quantity, option and extras added to the order.

 Before the object is updated all changes are temporary.
 If modal is closed before button is clicked, changes will not be saved.

 In this component, cartItemForm behaves as a "form" that is submitted to the store.

*/
import { ref, computed, onBeforeMount } from "vue";
import isEmpty from "lodash/isEmpty";
import { toCurrency } from "@/helpers/currency.js";
import { useCartStore } from "@/stores/cartStore.js";
import QuantityButton from "@/components/QuantityButton.vue";
import TheButton from "@/components/TheButton.vue";
import TheTag from "../TheTag.vue";

const store = useCartStore();
const emit = defineEmits(["hideModal"]);
const props = defineProps({
  product: {
    type: Object,
    default: () => {},
  },
  allProducts: {
    type: Array,
    default: () => [],
  },
  allCollections: {
    type: Array,
    default: () => [],
  },
  cartItem: {
    type: Object,
    default: () => null,
  },
});

const cartItemForm = ref();
const selectedSecondOptions = ref([]);

onBeforeMount(() => {
  if (props.cartItem) {
    cartItemForm.value = JSON.parse(JSON.stringify(props.cartItem));
    selectedSecondOptions.value = cartItemForm.value.selectedSecondOptions;
  } else {
    cartItemForm.value = JSON.parse(JSON.stringify(store.cartItemTemplate));
    cartItemForm.value.productId = props.product.id;
    cartItemForm.value.total = props.product.price;
    if (props.product.spicy) {
      cartItemForm.value.spiceLevel = {
        name: "Sin Picante",
        value: "Sin Picante",
      };
    }
  }
  window.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
      emit("hideModal");
    }
  });
});

// handle cartItemForm submission to store
const cartItemTotal = computed(() => {
  // base price
  let total = parseInt(props.product.price);

  // add price of option
  if (cartItemForm.value.selectedOption.addedPrice) {
    total += cartItemForm.value.selectedOption.addedPrice;
  }

  // add prices of extras
  Object.keys(cartItemForm.value.selectedExtras).forEach((e) => {
    total +=
      cartItemForm.value.selectedExtras[e].price *
      cartItemForm.value.selectedExtras[e].quantity;
  });
  // here total is the price for a single cart item of this kind.
  // later it gets multiplied my quantity to figure out the total order price.
  return total;
});

function handleSubmit() {
  cartItemForm.value.total = cartItemTotal;
  cartItemForm.value.selectedSecondOptions = selectedSecondOptions.value;
  if (cartItemForm.value.comment == "") {
    cartItemForm.value.comment = null;
  }

  if (props.cartItem) {
    store.updateCartItem(props.cartItem.id, { ...cartItemForm.value });
  } else {
    store.addCartItem({ ...cartItemForm.value });
  }
  console.log("modal button clicked");
  emit("hideModal");
}

// methods that modify cartItemForm before submitting
function increaseCartItemQuantity() {
  cartItemForm.value.quantity++;
}

function decreaseCartItemQuantity() {
  cartItemForm.value.quantity--;
  if (cartItemForm.value.quantity == 0) {
    emit("hideModal");
  }
}

function increaseExtraQuantity(id) {
  let extra = props.allProducts.find((p) => p.id == id);
  if (cartItemForm.value.selectedExtras[id]) {
    cartItemForm.value.selectedExtras[id].quantity++;
  } else {
    cartItemForm.value.selectedExtras[id] = {
      title: extra.title,
      price: extra.price,
      collection: extra.collection,
      quantity: 1,
    };
  }
}

function decreaseExtraQuantity(id) {
  cartItemForm.value.selectedExtras[id].quantity--;
  if (cartItemForm.value.selectedExtras[id].quantity == 0) {
    delete cartItemForm.value.selectedExtras[id];
  }
}

// methods that handle when form is not yet valid
const highlightObligatory = ref(false);
const canBeSubmitted = computed(() => {
  if (productOptionEmpty() || comboDrinkEmpty()) {
    return false;
  }
  highlightObligatory.value = false;
  return true;
});

function handleInactiveClick() {
  if (!canBeSubmitted.value) {
    highlightObligatory.value = true;
  }
  const form = document.getElementById("container");
  form.scrollTo({ top: 0, behavior: "smooth" });
}

function productOptionEmpty() {
  return (
    props.product.productOptions &&
    props.product.productOptions.length > 0 &&
    isEmpty(cartItemForm.value.selectedOption)
  );
}

function comboDrinkEmpty() {
  return props.product.combo && isEmpty(cartItemForm.value.comboDrink);
}

// options for radio buttons in the form
const cutleryOptions = ref([
  { name: "Si", value: "Si" },
  { name: "No", value: "No" },
]);

const spiceOptions = ref([
  { name: "Sin Picante", value: "Sin Picante" },
  { name: "Medio", value: "Medio" },
  { name: "Alto", value: "Alto" },
]);

const comboOptions = ref([
  { name: "Coca-Cola Normal", value: "Coca-Cola Normal" },
  { name: "Coca-Cola Zero", value: "Coca-Cola Zero" },
  { name: "Ginger Ale", value: "Ginger Ale" },
  { name: "Soda", value: "Soda" },
  { name: "Agua con Sin Gas", value: "Agua con Sin Gas" },
]);
</script>

<style scoped>
.hide {
  display: none;
}
.modal-container {
  position: fixed;
  display: grid;
  grid-template-columns: 1fr;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
}

.modal-card {
  position: relative;
  box-shadow: var(--shadow-1);
  border-radius: var(--border-radius);
  display: grid;
  background-color: var(--color-neutral);
  align-self: center;
  justify-self: center;
}

.images img {
  left: 50%;
  display: block;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  height: 450px;
  display: block;
}
.content-cont {
  padding-top: 10px;
  padding-bottom: 55px;
  position: relative;
}

.buttons-container {
  padding: 5px 8px 5px 8px;
  z-index: 99;
  background-color: var(--color-neutral);
}

.buttons-container > *:first-child {
  float: left;
}

.buttons-container > *:last-child {
  float: right;
  box-shadow: var(--shadow-1);
}

.title,
.description {
  text-align: center;
}

.description {
  font-size: 0.9em;
}

@media only screen and (max-width: 790px) {
  .modal-container {
    width: 100vw;
  }
  .modal-card {
    grid-template-columns: 1fr;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
  }

  .content-cont {
    width: 100vw;
  }

  .images {
    width: 100vw;
    height: 450px;
    overflow: hidden;
  }

  .buttons-container {
    position: fixed;
    width: 100vw;
    bottom: 0px;
    z-index: 100 !important;
  }

  .xmark {
    position: fixed;
    top: 20px;
    left: 20px;
  }
}

@media only screen and (min-width: 790px) {
  .modal-card {
    grid-template-columns: 1fr 1fr;
    width: var(--modal-width-lg);
    margin: 15px;
    left: -8px;

    overflow: hidden;
  }

  .images {
    width: calc(var(--modal-width-lg) / 2);
  }

  .modal-container {
    width: 100vw;
    height: 100vh;
  }

  .content-cont {
    overflow-y: scroll;
    height: var(--modal-height-lg);
  }
  .images {
    overflow: hidden;
  }

  .buttons-container {
    position: absolute;
    width: var(--modal-width-lg-half);
    right: 0px;
    bottom: 0px;
  }

  .xmark {
    position: absolute;
    top: 5px;
    left: 5px;
  }
}

/* choice-section styles*/

.choice-section-subtitle {
  font-weight: 600;
  padding-left: 25px;
  margin-top: 30px;
}
.choice-section ul {
  padding: 0px;
}
.choice-section li {
  padding: 8px 25px 8px 25px;
  font-size: 0.9em;
  list-style-type: none;
  border-top: 1px solid var(--color-border-neutral);

  position: relative;
}

.choice-section li > *:first-child {
  width: 80%;
}

.choice-section li > *:last-child {
  border-bottom: 1px solid var(--color-border-neutral);
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  right: 5%;
}

label,
input,
.choice-section.options {
  cursor: pointer;
}

input[type="radio"],
input[type="checkbox"] {
  border: 0px;
  width: 15px;
}

.choice-price {
  font-weight: 500;
}

.extra-quantity-button {
  right: 4% !important;
}

.xmark {
  width: 22px;
  z-index: 100;
  background-color: var(--color-neutral);
  padding: 3px 7px 3px 6px;
  border-radius: 99px;
  cursor: pointer;
  opacity: 0.7;
}

.xmark:hover {
  opacity: 0.8;
}

.xmark img {
  display: block;
}

.tag {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
}

.comment-box {
  width: 92%;
  margin: 2% 4% 2% 4%;
}

.red {
  color: red;
}
</style>

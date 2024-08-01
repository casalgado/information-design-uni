<template>
  <section>
    <SectionTitle title="Carrito de Compra" />

    <ul class="cart-item-container">
      <CartItem
        v-for="(cartItem, i) in store.allCartItemsArray"
        :key="i"
        :product="getProductById(cartItem.productId)"
        :cartItem="cartItem"
        :directToCart="getCollectionByProductId(cartItem.productId)"
        @showModal="showModal"
      />
      <TheButton
        v-if="store.allCartItemsArray.length > 0"
        text="Vaciar Carrito"
        theme="primary"
        id="emptyCart"
        @btnClick="handleClearCart"
      />
    </ul>
    <div class="cart-action">
      <div>Total de tu pedido: {{ toCurrency(store.getCartTotal) }}</div>
    </div>

    <div class="client-form-cont">
      <ClientForm @submitted="handleSubmit" />
    </div>
  </section>
  <ModalProduct
    v-if="modalActive"
    @hideModal="hideModal"
    :product="activeProduct"
    :cartItem="activeCartItem"
    :allProducts="allProducts"
    :allCollections="allCollections"
  />
</template>

<script setup>
import { ref } from "vue";
import { onBeforeMount } from "vue";
import { getAll } from "@/helpers/db.js";
import { toCurrency } from "@/helpers/currency.js";
import ModalProduct from "@/components/menu/ModalProduct.vue";
import CartItem from "@/components/cart/CartItem.vue";
import ClientForm from "@/components/cart/ClientForm.vue";
import { useCartStore } from "@/stores/cartStore";
import SectionTitle from "../../components/SectionTitle.vue";
import TheButton from "@/components/TheButton.vue";
import { createOneCartItem } from "../../helpers/db";

const store = useCartStore();

// fetch data
const allProducts = ref([]);
const allCollections = ref([]);

onBeforeMount(() => {
  getAll("products").then((res) => (allProducts.value = res.data));
  getAll("collections").then((res) => {
    allCollections.value = res.data;
  });
});

// modal functionality
const modalActive = ref(false);
const activeProduct = ref({});
const activeCartItem = ref({});

function showModal(content) {
  activeProduct.value = content.product;
  activeCartItem.value = content.cartItem;
  modalActive.value = true;
}

function hideModal() {
  modalActive.value = false;
}

function handleSubmit(values) {
  const cartItems = store.allCartItemsArray;
  sendMessage(values, cartItems);
  createCartItem(values);
}

function createCartItem(values) {
  console.log({
    client_info: values,
    order_info: store.allCartItemsArray,
  });
  createOneCartItem({
    client_info: values,
    order_info: store.allCartItemsArray,
  }).then((res) => {
    console.log(res);
  });
}

function handleClearCart() {
  let confirmation = confirm("Deseas vaciar el carrito?");
  if (confirmation === true) {
    store.emptyCart();
  }
}

function getProductById(id) {
  return allProducts.value.find((e) => e.id == id);
}

function getCollectionByProductId(id) {
  if (getProductById(id)) {
    const collectionId = getProductById(id).collection;
    const collection = allCollections.value.find((e) => e.id == collectionId);
    if (collection) {
      console.log(collection.canBeAddedToCartItem);
      return collection.canBeAddedToCartItem;
    }
  }
  return null;
}

// send whatsapp message
function sendMessage(values, cartItems) {
  let message = "";
  message += `Nombre: ${values.client}\n`;
  message += `Dirección: ${
    values.delivery == "En Sitio" ? "En Sitio" : values.address
  }\n`;
  message += `# Casa o Apto: ${values.houseNumber || "-"}\n`;
  message += `Barrio: ${values.locality || "-"}\n`;
  message += `Telefono: ${values.phone}\n`;
  message += `Método: ${values.payment}\n`;
  message += `Envio: ${values.delivery}\n`;
  message += `\n`;

  cartItems.forEach((ci) => {
    let p = allProducts.value.find((p) => p.id == ci.productId);
    message += `${ci.quantity} - ${p.title}\n`;
    if (ci.selectedOption.optionId) {
      message += `guarnición: ${ci.selectedOption.name}\n`;
    }

    if (ci.selectedSecondOptions.length > 0) {
      message += `opciones: \n`;
      for (let i = 0; i < ci.selectedSecondOptions.length; i++) {
        const element = ci.selectedSecondOptions[i].name;
        message += `  ${element} \n`;
      }
    }
    if (p.combo && ci.comboDrink.value) {
      message += `con: ${ci.comboDrink.value}\n`;
    }
    Object.values(ci.selectedExtras).forEach((e) => {
      message += `  +${e.quantity} - ${e.title}\n`;
    });
    if (ci.comment) {
      message += `"${ci.comment}"\n`;
    }
    if (p.spicy) {
      message += `picante: ${ci.spiceLevel.value}\n`;
    }
    if (ci.cutlery.value == "Si") {
      message += `cubiertos: ${ci.cutlery.value}\n`;
    }
    message += `\n`;
  });

  message += `subtotal: ${toCurrency(store.getCartTotal)}`;
  message += `\n`;
  message += `\n`;
  message += `Envia este mensaje para continuar. `;

  localStorage.setItem(
    "clientInfo",
    JSON.stringify({
      client: values.client,
      address: values.address,
      houseNumber: values.houseNumber,
      locality: values.locality,
      phone: values.phone,
      payment: values.payment,
      delivery: values.delivery,
    })
  );
  console.log(message);
  window.open(
    `https://wa.me/${3046675581}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}
</script>

<style scoped>
.title {
  font-family: poppins;
  text-align: center;
  color: var(--color-accent);
}

img {
  width: 200px;
  position: relative;
  left: 50%;
  margin-left: -100px;
}
.cart-item-container {
  max-width: 980px;
  padding: 10px;
  margin: 0 auto;
}

.cart-action {
  width: 400px;
  background-color: var(--vt-c-white);
  box-shadow: var(--shadow-1);

  margin: 0 auto;
  margin-bottom: 20px;
  overflow: hidden;
}

.cart-action > * {
  text-align: center;
  width: 100%;
  border-radius: 0px;
}

#emptyCart {
  position: absolute;
  right: 10px;
}

@media only screen and (max-width: 600px) {
  .cart-action {
    margin-top: 25px;
    width: 96%;
  }

  #emptyCart {
    padding-top: 5px;
    padding-bottom: 5px;
  }
}
</style>

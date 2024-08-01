<template>
  <li
    class="product-wrapper card"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div class="images rspan4">
      <img :src="path()" alt="" />
    </div>
    <div class="span2">
      <h4>{{ product.title }}</h4>
    </div>

    <div class="span3">
      <h4>Descripcion</h4>
      <div>{{ product.description }}</div>
    </div>

    <div>
      <h4>Precio</h4>
      <div>{{ toCurrency(product.price) }}</div>
    </div>

    <div>
      <h4>Categoria</h4>
      <div>{{ collection }}</div>
    </div>

    <div class="span3">
      <h4>Guarnición</h4>
      <ul class="options">
        <li v-for="(o, i) in product.productOptions" :key="i" class="options">
          {{ o.name }} +{{ toCurrency(o.addedPrice) }}
        </li>
        <li
          v-if="!product.productOptions || product.productOptions.length == 0"
        >
          no
        </li>
      </ul>
    </div>

    <div class="productBooleans">
      <h4>Disponible:</h4>
      <p>{{ product.inStock ? "Si" : "No" }}</p>
      <br />
      <h4>Nuevo:</h4>
      <p>{{ product.justAdded ? "Si" : "No" }}</p>
      <br />
      <h4>Combo:</h4>
      <p>{{ product.combo ? "Si" : "No" }}</p>
    </div>

    <div class="productBooleans">
      <h4>Picante:</h4>
      <p>{{ product.spicy ? "Si" : "No" }}</p>
      <br />
      <h4>Vegetariano:</h4>
      <p>{{ product.veggie ? "Si" : "No" }}</p>
    </div>

    <div class="span3">
      <h4>Opciones</h4>
      <ul class="options">
        <li v-for="(o, i) in product.secondOptions" :key="i" class="options">
          {{ o.name }}
        </li>
        <li v-if="!product.secondOptions || product.secondOptions.length == 0">
          no
        </li>
      </ul>
    </div>

    <div class="button-card" :class="hover ? 'show' : 'hide'">
      <TheButton theme="danger" text="eliminar" @btnClick="destroy" />
      <TheButton theme="warning" text="editar" @btnClick="edit" />
    </div>
  </li>
</template>

<script setup>
import { ref } from "vue";
import { toCurrency } from "@/helpers/currency.js";
import TheButton from "@/components/TheButton.vue";

const props = defineProps({
  product: Object,
  collection: String,
});

const emit = defineEmits(["destroy", "edit"]);

const hover = ref(false);

function destroy() {
  emit("destroy", props.product);
}
function edit() {
  emit("edit", props.product);
}
function path() {
  let fullPath =
    props.product.images[0].small || props.product.images[0].original;
  return `${fullPath}`;
}
</script>

<style scoped>
.product-wrapper {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  position: relative;
  font-size: 85%;
}

ul.options {
  padding-left: 10px;
}

ul.options li {
  list-style-type: "- ";
}

.images {
  width: 140px;
  height: 140px;
  overflow: hidden;
}

.images img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: block;
}

.productBooleans > * {
  display: inline-block;
}

.productBooleans > p {
  margin-left: 5px;
}

.show {
  display: block;
}

.hide {
  display: none;
}

.button-card {
  position: absolute;
  right: 20px;
  bottom: 10px;
}

button {
  padding: 5px;
  font-size: 0.8em;
  margin-left: 10px;
}
</style>

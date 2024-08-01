<template>
  <div
    class="product-wrapper"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div class="product-section">
      <div class="key">Nombre</div>
      <div class="value">{{ collection.title }}</div>
    </div>
    <div class="product-section description">
      <div class="key">Descripcion</div>
      <div class="value">{{ collection.description }}</div>
    </div>
    <div class="product-section description">
      <div class="key">Acompañante?</div>
      <div class="value">
        {{ collection.canBeAddedToCartItem ? "Si" : "No" }}
      </div>
    </div>
    <div class="button-card" :class="hover ? 'show' : 'hide'">
      <TheButton theme="danger" text="eliminar" @btnClick="remove" />
      <TheButton theme="warning" text="editar" @btnClick="edit" />
    </div>
  </div>
</template>

<script>
import TheButton from "@/components//TheButton.vue";
export default {
  name: "ProductSnippet",
  props: {
    collection: Object,
  },
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    remove: function () {
      this.$emit("remove", this.collection);
    },
    edit: function () {
      this.$emit("edit", this.collection);
    },
    path: function () {
      return `https://storage.googleapis.com/koftafusion-images/${this.collection.images[0].original}`;
    },
  },
  components: { TheButton },
};
</script>

<style scoped>
.product-wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: var(--vt-c-white);
  border-radius: var(--border-radius);
  gap: 50px;
  margin: 20px;
  padding-left: 20px;
  box-shadow: var(--shadow-1);
  position: relative;
  overflow: hidden;
}

.images {
  align-self: center;
  justify-self: center;
  width: 80px;
  overflow: hidden;
  position: relative;
}

.images img {
  left: 50%;
  display: block;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  height: 80px;
  background-color: var(--color-theme-neutral);
}

.description {
  grid-column: span 2;
}

.key {
  font-weight: 500;
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

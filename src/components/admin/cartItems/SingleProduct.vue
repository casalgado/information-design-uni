<template>
  <div class="wrapper card">
    <p>
      {{
        `${product.quantity} - ${
          allProducts.find((p) => p.id == product.productId).title
        }`
      }}
    </p>
    <p v-if="product.selectedOption">
      {{ `${product.selectedOption.name}` }}
    </p>
    <p v-if="product.comboDrink">
      {{ `con: ${product.comboDrink}` }}
    </p>
    <div v-if="product.selectedExtras">
      <p v-for="extra in Object.values(product.selectedExtras)">
        {{ `+${extra.quantity} ${extra.title}` }}
      </p>
    </div>
    <p>{{ `cubiertos: ${product.cutlery}` }}</p>
    <p v-if="allProducts.find((p) => p.id == product.productId).spicy">
      {{ `nivel de picante: ${product.spiceLevel}` }}
    </p>
    <p v-if="product.comment">
      {{ `"${product.comment}"` }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  allProducts: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.wrapper {
  margin: 5px;
  border: 1px solid var(--color-border-neutral);
  width: 250px;
}
</style>

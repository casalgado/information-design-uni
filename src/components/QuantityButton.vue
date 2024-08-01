<template>
  <button id="quantity-button" :class="quantity > 0 ? 'open' : 'closed'">
    <div
      v-if="quantity > 0"
      :class="quantity > 0 ? 'showItem' : 'hideItem'"
      class="decrease"
      @click="$emit('decrease')"
    >
      <img :src="path" alt="" />
    </div>

    <div
      v-if="quantity > 0"
      :class="quantity > 0 ? 'showItem' : 'hideItem'"
      class="quantity"
    >
      {{ quantity }}
    </div>

    <div class="increase" @click="$emit('increase')">
      <img src="/icons/plus-centered.svg" alt="" />
    </div>
  </button>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  quantity: {
    type: Number,
    default: () => 1,
  },
  collapsible: {
    type: Boolean,
    default: () => false,
  },
});

const path = computed(() => {
  return `/icons/${
    props.quantity == 1 ? "trash-centered.svg" : "minus-centered.svg"
  }`;
});
</script>

<style scoped>
button {
  border-radius: 99px;
  cursor: pointer;
  border: none;
  box-shadow: var(--shadow-1);
  outline: none !important;
  background-color: var(--vt-c-white);
  color: var(--vt-c-black);
  height: 26px;
  width: 26px;
  transition: width 0.25s;
  position: relative;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
}

button > * {
  position: absolute;
  top: 0px;
  display: block;
  font-family: nexa-bold;
  font-size: 1.1em;
  border: 1px solid transparent;
  height: 26px;
}

button > * > * {
  border: 1px solid transparent;
}

.quantity {
  width: 50px;
  left: 20px;
  line-height: 26px;
  vertical-align: middle;
}

img {
  top: 5px;
  left: 0px;
  display: block;
  width: 13px;
  height: 13px;
}

.increase {
  width: 13px;
  height: 13px;
  right: 7px;
}

.decrease {
  position: absolute;
  left: 7px;
}

.open {
  width: 90px;
}
</style>

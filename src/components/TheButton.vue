<script setup>
import { computed } from "vue";
const props = defineProps({
  payload: {
    type: String,
    default: () => "default",
  },
  text: {
    type: String,
    default: () => "undefined",
  },
  theme: {
    type: String,
    default: () => "primary",
  },
  active: {
    type: Boolean,
    default: () => true,
  },
  iconPath: {
    type: String,
    default: () => null,
  },
});

const computedClass = computed(() => {
  return `
  ${props.theme} 
  ${props.active ? "" : "inactive"} 
  ${props.iconPath ? "withIcon" : ""}`;
});
</script>

<template>
  <button
    v-on="active ? { click: () => $emit('btnClick', payload) } : {}"
    class="the-button"
    :class="computedClass"
  >
    <img v-if="iconPath" :src="iconPath" alt="" />
    {{ text }}
  </button>
</template>

<style scoped>
button {
  padding: 12px 18px 12px 18px;
  border-radius: 15px;
  cursor: pointer;
  transition: border-radius 0.2s;
  border: none;
  outline: none !important;
  color: var(--color-neutral);
  text-transform: uppercase;
  font-family: poppins;
}

img {
  position: absolute;
  right: 13px;
  top: 9px;
  height: 20px;
}
.withIcon {
  padding-right: 43px;
}

button.primary {
  background-color: var(--button-primary);
}

button.primary:hover {
  background: var(--button-primary-hover);
}

button.danger {
  background-color: var(--button-danger);
}

button.danger:hover {
  background: var(--button-danger-hover);
}

button.warning {
  background-color: var(--button-warning);
}

button.warning:hover {
  background: var(--button-warning-hover);
}

button.theme {
  background-color: var(--color-theme);
}

button.theme:hover {
  background: var(--color-theme-hover);
}

.inactive,
.inactive:hover {
  background-color: var(--button-inactive) !important;
  cursor: default;
}
</style>

<template>
  <div class="tag">
    <img :src="imgPath" alt="" @mouseenter="showText" @mouseleave="hideText" />
    <p class="hoverText" :class="active ? 'showText' : 'hideText'">
      {{ hoverText }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  hoverText: {
    type: String,
    default: () => "",
  },
});

const active = ref(false);

const imgPath = computed(() => {
  let path = "/images/" + props.image;
  return path;
});

function showText() {
  active.value = true;
}

function hideText() {
  active.value = false;
}
</script>

<style scoped>
.tag {
  width: 50px;
  height: 50px;
  background-color: var(--color-complement);
  border-radius: 99px;
}

img {
  margin: 5%;
  width: 90%;
  height: 90%;
}

.hoverText {
  position: absolute;
  height: 30px;
  line-height: 24px;
  border-radius: 10px;
  padding: 3px 12px 3px 12px;
  font-size: 12px;
  top: 10px;
  right: 60px;
  background-color: rgba(0, 0, 0, 0.7);
  transition: opacity 0.4s;
}

.showText {
  opacity: 1;
}

.hideText {
  opacity: 0;
}
</style>

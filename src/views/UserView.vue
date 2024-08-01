<template>
  <div>
    <TheNavUser />
    <div id="main-content">
      <RouterView />
    </div>
  </div>
</template>

<script>
import TheNavUser from "@/components/TheNavUser.vue";
export default {
  name: "UserView",
  components: { TheNavUser },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
#main-content {
  padding-top: 30px;
}

nav {
  position: absolute;
  height: 30px;
  width: 100%;
  z-index: 99 !important;
}
</style>

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
</style>

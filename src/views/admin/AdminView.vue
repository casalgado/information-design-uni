<template>
  <main>
    <header>
      <TheNavAdmin />
    </header>
    <p v-if="!store.userSignedIn" class="user-alert">usuario no conectado</p>
    <div id="admin-content" v-if="store.userSignedIn">
      <TheSidebarAdmin />
      <div>
        <RouterView />
      </div>
    </div>
  </main>
</template>

<script setup>
import { useCartStore } from "../../stores/cartStore";
import { useRouter } from "vue-router";
import { watch } from "vue";
import TheNavAdmin from "@/components/admin/TheNavAdmin.vue";
import TheSidebarAdmin from "@/components/admin/TheSidebarAdmin.vue";

const router = useRouter();
const store = useCartStore();

watch(
  () => store.userSignedIn,
  () => {
    if (store.userSignedIn) {
      //router.push({ name: "showDashboard" });
    }
  }
);
</script>

<style scoped>
.user-alert {
  text-align: center;
  width: 100%;
}
#admin-content {
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100%;
}
</style>

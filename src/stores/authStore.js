import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    signedIn: false,
    idToken: "",
  }),
  getters: {
    getIdToken: (state) => state.idToken,
    isSignedIn: (state) => state.signedIn,
  },
  actions: {
    updateUserAuth(boolean, id) {
      this.signedIn = boolean;
      this.idToken = id;
    },
  },
});

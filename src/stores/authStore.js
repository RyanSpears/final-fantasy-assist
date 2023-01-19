import { defineStore } from "pinia"

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({ session: {} }),
  getters: {
    getSession: (state) => state.session,
    getIsAuthenticated: (state) => state.session != null && state.session?.user?.aud == "authenticated",
  },
  actions: {
    setSession(_session) {
      this.session = _session
    },
  },
})
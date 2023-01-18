import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { supabase } from "../supabase";

export const useAuthStore = defineStore("AuthStore", () => {
  // state
  var session = ref({});
  var isAuthenticated = ref(Boolean);

  // getters
  const getSession = computed(() => session);
  const getIsAuthenticated = computed(() => isAuthenticated);

  // actions
  async function setSession(s) {
    console.log(`session set to ${s}`);
    session = s;
  }

  function setIsAuthenticated(a) {
    console.log(`isAuthenticated set to ${a}`);
    isAuthenticated = a;
  }

  async function setUsername() {
    try {
      const { user } = session.value;

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        username.value = data.username;
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return {
    session,
    getSession,
    getIsAuthenticated,
    setSession,
    setIsAuthenticated,
  };
});

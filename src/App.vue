<script setup>
import { onMounted } from "vue"
import Navbar from "./components/Navbar.vue"
import { supabase } from "./supabase"
import { useAuthStore } from "./stores/authStore"
import { useCharacterStore } from "./stores/characterStore"

const authStore = useAuthStore()
const characterStore = useCharacterStore()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    authStore.setSession(data.session)
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    authStore.$patch({
      session: _session
    })
  })
})
</script>

<template>
  <Navbar />
  <div style="padding: 50px 0 100px 0">
    <router-view></router-view>
  </div>
</template>

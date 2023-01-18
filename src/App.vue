<script setup>
import { onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import { supabase } from "./supabase";
import { useAuthStore } from "./stores/authStore";

const store = useAuthStore();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    store.setSession(data.session)
    console.log(`App.vue: session set ` + data.session)
    store.setIsAuthenticated(data.session?.user?.aud == 'authenticated')
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    store.setSession(_session)
    console.log(`App.vue: session changed ` + _session)
    store.setIsAuthenticated(_session?.user?.aud == 'authenticated')
  });
});
</script>

<template>
  <Navbar />
  <div class="container" style="padding: 50px 0 100px 0">
    <router-view></router-view>
  </div>
</template>

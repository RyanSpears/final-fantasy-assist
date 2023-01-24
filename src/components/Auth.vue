<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";

const loading = ref(false);
const email = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    });
    if (error) throw error;
    alert("Check your email for the login link!");
  } catch (error) {
    if (error instanceof Error) {
      alert(`handleLogin: ${error.message}`);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img
          class="mx-auto h-20 w-auto"
          src="../assets/viking.jpg"
          alt="Final Fantasy Assist"
        />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in via magic link with your email below
        </h2>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST" @submit.prevent="handleLogin">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              v-model="email"
              required
              placeholder="Email address"
            />
          </div>
        </div>

        <div>
          <button type="submit" class="button primary block" :disabled="loading">
            Send magic link
          </button>
        </div>
      </form>     
    </div>
  </div>
</template>

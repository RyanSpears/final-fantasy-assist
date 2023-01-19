<script setup>
import { supabase } from "../supabase"
import { onMounted, ref } from "vue"
import { useAuthStore } from "../stores/authStore"
import router from "../router"

const authStore = useAuthStore()
const loading = ref(true)

let username = ref("")
let user = ref({})

onMounted(() => {
    try {
        user.value = authStore.getSession.user
        getProfile()
    } catch (error) {
        authStore.$patch({ session: null })
        router.push("/login")
    }
})

async function getProfile() {
    try {
        loading.value = true

        let { data, error, status } = await supabase
            .from("profiles")
            .select(`username`)
            .eq("id", user.value.id)
            .single()

        if (error && status !== 406) throw error

        if (data) {
            username.value = data.username
        }
    } catch (error) {
        alert(`getProfile: ${error.message}`)
    } finally {
        loading.value = false
    }
}

async function updateProfile() {
    try {
        loading.value = true

        const updates = {
            id: user.value.id,
            username: username.value,
            updated_at: new Date(),
        }

        let { error } = await supabase.from("profiles").upsert(updates)

        if (error) throw error
    } catch (error) {
        alert(`updateProfile: ${error.message}`)
    } finally {
        loading.value = false
    }
}

async function signOut() {
    try {
        loading.value = true
        let { error } = await supabase.auth.signOut().then(() => {
            authStore.$patch({
                session: null,
            })
        })
        if (error) throw error
    } catch (error) {
        alert(`signOut: ${error.message}`)
    } finally {
        loading.value = false
        router.push("/login")
    }
}
</script>

<template>
    <div v-if="!loading && user" class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <form class="mt-8 space-y-6" @submit.prevent="updateProfile">
                <div class="-space-y-px rounded-md shadow-sm w-full">
                    <div>
                        <label for="email-address">Email address</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" :value="user.email"
                               disabled />
                    </div>
                </div>
                <div class="-space-y-px rounded-md shadow-sm w-full">
                    <div>
                        <label for="username">Name</label>
                        <input id="username" name="username" type="text" v-model="username" />
                    </div>
                </div>

                <div>
                    <input type="submit" class="button primary block" :value="loading ? 'Loading ...' : 'Update'"
                           :disabled="loading" />
                </div>

                <div>
                    <button class="button block" @click="signOut" :disabled="loading">
                        Sign Out
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

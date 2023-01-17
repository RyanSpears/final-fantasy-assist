<script setup>
import { supabase } from '../supabase'
import { onMounted, ref, toRefs } from 'vue'

const props = defineProps(['session'])
const { session } = toRefs(props)

const loading = ref(true)
const username = ref('')

onMounted(() => {
    getProfile()
})

async function getProfile() {
    try {
        loading.value = true
        const { user } = session.value

        let { data, error, status } = await supabase
            .from('profiles')
            .select(`username`)
            .eq('id', user.id)
            .single()

        if (error && status !== 406) throw error

        if (data) {
            username.value = data.username
        }
    } catch (error) {
        alert(error.message)
    } finally {
        loading.value = false
    }
}

async function updateProfile() {
    try {
        loading.value = true
        const { user } = session.value

        const updates = {
            id: user.id,
            username: username.value,
            updated_at: new Date(),
        }

        let { error } = await supabase.from('profiles').upsert(updates)

        if (error) throw error
    } catch (error) {
        alert(error.message)
    } finally {
        loading.value = false
    }
}

async function signOut() {
    try {
        loading.value = true
        let { error } = await supabase.auth.signOut()
        if (error) throw error
    } catch (error) {
        alert(error.message)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <form class="mt-8 space-y-6" @submit.prevent="updateProfile">
                <div class="-space-y-px rounded-md shadow-sm w-full">
                    <div>
                        <label for="email-address">Email address</label>
                        <input id="email-address" name="email" type="email" autocomplete="email"
                               :value="session.user.email" disabled>
                    </div>
                </div>
                <div class="-space-y-px rounded-md shadow-sm w-full">
                    <div>
                        <label for="username">Name</label>
                        <input id="username" name="username" type="text" v-model="username">
                    </div>
                </div>

                <div>
                    <input type="submit" class="button primary block" :value="loading ? 'Loading ...' : 'Update'"
                           :disabled="loading" />
                </div>

                <div>
                    <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
                </div>
            </form>
        </div>
    </div>
</template>
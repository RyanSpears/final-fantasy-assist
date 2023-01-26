<script setup>
import { supabase } from "../supabase";
import router from "../router";
import { species } from "fantastical";
import { useAuthStore } from "../stores/authStore";
import { onMounted, ref } from "vue";

const authStore = useAuthStore();
const loading = ref(true);

let newCharacter = null;

onMounted(() => {
    console.log("onMounted()");
    randomizeUser();
});

function randomizeUser() {
    loading.value = true;

    newCharacter = {
        name: species.dwarf("male"),
        user_id: authStore.getSession.user.id,
        skill: 6 + getDiceRoll(6),
        stamina: 12 + getDiceRoll(12),
        luck: 6 + getDiceRoll(6),
        updated_at: new Date(),
    };

    loading.value = false;
}

function getDiceRoll(number) {
    return Math.floor(Math.random() * number) + 1;
}

async function createCharacter() {
    try {
        loading.value = true;

        console.log(newCharacter);

        const { data, error } = await supabase
            .from("characters")
            .upsert(newCharacter)
            .select();

        if (error) throw error;

        router.push("/characters");
    } catch (error) {
        alert(`createCharacter: ${error.message}`);
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div v-if="loading">
        <p>Loading...</p>
    </div>
    <div v-if="!loading && newCharacter"
         class="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <h1>New Character</h1>
        <div class="w-full max-w-md space-y-8">
            <form class="mt-8 space-y-6" @submit.prevent="createCharacter">
                <div class="-space-y-px rounded-md shadow-sm w-full">
                    <div>
                        <label for="name">Name</label>
                        <input id="name" name="name" type="text" autocomplete="email" :value="newCharacter.name" />
                    </div>
                </div>
                <div class="-space-y-px rounded-md shadow-sm w-full">
                    <div>
                        <label for="skill">Skill</label>
                        <input id="skill" name="skill" type="number" :max="12" :min="0" v-model="newCharacter.skill" />
                    </div>
                </div>
                <div class="-space-y-px rounded-md shadow-sm w-full">
                    <div>
                        <label for="stamina">Stamina</label>
                        <input id="stamina" name="stamina" type="number" :max="24" :min="0"
                               v-model="newCharacter.stamina" />
                    </div>
                </div>
                <div class="-space-y-px rounded-md shadow-sm w-full">
                    <div>
                        <label for="luck">Luck</label>
                        <input id="luck" name="luck" type="number" :max="12" :min="0" v-model="newCharacter.luck" />
                    </div>
                </div>
                <div>
                    <input type="submit" class="button primary block" :value="loading ? 'Loading ...' : 'Create'"
                           :disabled="loading" />
                </div>
            </form>
            <div>
                <button type="button" class="button primary block" :disabled="loading" @click="randomizeUser()">
                    Randomize
                </button>
            </div>
        </div>
    </div>
</template>
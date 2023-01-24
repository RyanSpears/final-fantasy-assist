<script setup>
import { storeToRefs } from 'pinia'
import { useCharacterStore } from "../stores/characterStore"
import { useRoute } from 'vue-router'
import { watch, onMounted } from 'vue'
import { supabase } from "../supabase"
import router from "../router"

const route = useRoute()

const { character, loading, error } = storeToRefs(useCharacterStore())
const { fetchCharacter } = useCharacterStore()

onMounted(() => {
    if (character.value == null) {
        fetchCharacter(route.params.characterId)
    }
});

watch(() => route.params.characterId, (selection, prevSelection) => {
    alert(selection)
})

async function updateCharacter() {
    try {
        loading.value = true

        const update = {
            name: character.value.name,
            user_id: character.value.user_id,
            skill: character.value.skill,
            stamina: character.value.stamina,
            luck: character.value.luck,
            updated_at: new Date(),
        }

        console.log(update)

        const { error } = await supabase
            .from("characters")
            .update(update)
            .eq('id', character.value.id)

        if (error) throw error

        router.push("/characters")
    } catch (error) {
        alert(`updateCharacter: ${error.message}`)
    } finally {
        loading.value = false
    }
}

</script>

<template>
    <div v-if="loading">
        <p>Loading...</p>
    </div>
    <div v-if="!loading && character"
         class="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <h1>Edit Character</h1>
        <div class="w-full max-w-md space-y-8">
            <form class="mt-8 space-y-6" @submit.prevent="updateCharacter">
                <div class="-space-y-px rounded-md shadow-sm w-full">
                    <div>
                        <label for="name">Name</label>
                        <input id="name" name="name" type="text" autocomplete="email" :value="character.name" />
                    </div>
                </div>
                <div class="-space-y-px rounded-md shadow-sm w-full">
                    <div>
                        <label for="skill">Skill</label>
                        <input id="skill" name="skill" type="number" :max="12" :min="0" v-model="character.skill" />
                    </div>
                </div>
                <div class="-space-y-px rounded-md shadow-sm w-full">
                    <div>
                        <label for="stamina">Stamina</label>
                        <input id="stamina" name="stamina" type="number" :max="24" :min="0"
                               v-model="character.stamina" />
                    </div>
                </div>
                <div class="-space-y-px rounded-md shadow-sm w-full">
                    <div>
                        <label for="luck">Luck</label>
                        <input id="luck" name="luck" type="number" :max="12" :min="0" v-model="character.luck" />
                    </div>
                </div>
                <div>
                    <input type="submit" class="button primary block" :value="loading ? 'Loading ...' : 'Update'"
                           :disabled="loading" />
                </div>
            </form>
        </div>
    </div>
</template>

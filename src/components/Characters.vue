<script setup>
import { onMounted, ref } from "vue"
import { useCharacterStore } from "../stores/characterStore"

const characterStore = useCharacterStore()
const characters = ref([])
const loading = ref(true)



onMounted(() => {
    characterStore.fetchCharacters().then(() => {
        characters.value = characterStore.getAllCharacters
    })
})
</script>

<template>
    <div class="flex flex-col min-h-full items-center justify-center">
        <h1>Your Characters</h1>

        <table class="md:min-w-[80%] text-center content-center">
            <thead class="border-b bg-gray-800">
                <tr>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">No.</th>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">Name</th>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">Skill</th>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">Stamina</th>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">Luck</th>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-4"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(character, index) in characters" class="bg-white border-b">
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
                    <td>{{ character.name }}</td>
                    <td>{{ character.skill }}</td>
                    <td>{{ character.stamina }}</td>
                    <td>{{ character.luck }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from 'pinia'
import { useCharacterStore } from "../stores/characterStore";

const { characters, loading, error } = storeToRefs(useCharacterStore())
const { fetchCharacters, deleteCharacter, setCharacters } = useCharacterStore()

onMounted(() => {
  if (!characters.length) {
    fetchCharacters()
  }
});

async function del(characterId) {
  await deleteCharacter(characterId)
  setCharacters(characters.value.filter((c) => c.id != characterId))
}

</script>

<template>
  <p v-if="loading">Loading characters...</p>
  <p v-if="error">Error {{ error.message }}</p>
  <div v-if="characters" class="flex flex-col min-h-full items-center justify-center">
    <h1>
      Your Characters
      <span>
        <a :href="'/characters/new'"
           class="bg-blue-100 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-white"
           :disabled="loading">
          New
        </a>
      </span>
    </h1>
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
          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {{ index + 1 }}
          </td>
          <td>{{ character.name }}</td>
          <td>{{ character.skill }}</td>
          <td>{{ character.stamina }}</td>
          <td>{{ character.luck }}</td>
          <td>
            <a :href="'/characters/' + character.id"
               class="bg-blue-100 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-white">Edit</a>
            <button @click="del(character.id)"
                    class="bg-blue-100 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-500 hover:cursor-pointer dark:text-white">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

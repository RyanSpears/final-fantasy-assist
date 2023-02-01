<script setup>
import { onMounted } from "vue";
import { storeToRefs } from 'pinia'
import { useMonsterStore } from "../stores/monsterStore";

const { monsters, loading, error } = storeToRefs(useMonsterStore())
const { fetchMonsters } = useMonsterStore()

onMounted(() => {
  if (!monsters.length) {
    fetchMonsters()
  }
});

</script>

<template>
  <p v-if="loading">Loading monsters...</p>
  <p v-if="error">Error {{ error.message }}</p>
  <div v-if="monsters" class="flex flex-col min-h-full items-center justify-center">
    <h1>
      Monsters
    </h1>
    <table class="md:min-w-[80%] text-center content-center">
      <thead class="border-b bg-gray-800">
        <tr>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">No.</th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">Name</th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">Skill</th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">Stamina</th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">Book</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(monster, index) in monsters" class="bg-white border-b">
          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {{ index + 1 }}
          </td>
          <td>{{ monster.name }}</td>
          <td>{{ monster.skill }}</td>
          <td>{{ monster.stamina }}</td>
          <td>{{ monster.books.title }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

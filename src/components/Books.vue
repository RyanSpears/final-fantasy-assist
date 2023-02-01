<script setup>
import { onMounted } from "vue";
import { storeToRefs } from 'pinia'
import { useBookStore } from "../stores/bookStore";

const { books, loading, error } = storeToRefs(useBookStore())
const { fetchBooks } = useBookStore()

onMounted(() => {
  if (!books.length) {
    fetchBooks()
  }
});

</script>

<template>
  <p v-if="loading">Loading books...</p>
  <p v-if="error">Error {{ error.message }}</p>
  <div v-if="books" class="flex flex-col min-h-full items-center justify-center">
    <h1>
      Books
      <span>
        <a :href="'/books/new'"
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
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">Title</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" class="bg-white border-b">
          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {{ index + 1 }}
          </td>
          <td>{{ book.title }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

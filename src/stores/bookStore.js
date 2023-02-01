import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useBookStore = defineStore('BookStore', {
  state: () => {
    return {
      loading: false,
      error: null,
      books: [],
    };
  },
  getters: {
    getAllBooks: (state) => {
      console.log(`monsterStore.getAllBooks() => ${state.books.length}`);
      return state.books;
    },
  },
  actions: {
    async fetchBooks() {
      this.loading = true;
      try {
        let { data: books, error } = await supabase
          .from('books')
          .select('*')
          .order('id');

        console.log(`books count ${books.length}`);

        if (error) {
          this.error = error;
          return;
        }

        if (books === null) {
          this.books = [];
          return;
        }

        this.setBooks(books);
      } catch (err) {
        this.error = err;
        console.error('Error retrieving data from db', err);
      } finally {
        this.loading = false;
      }
    },
    setBooks(_books) {
      this.books = _books;
    },
  },
});

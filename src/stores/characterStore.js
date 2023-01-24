import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useCharacterStore = defineStore("CharacterStore", {
  state: () => {
    return {
      loading: false,
      error: null,
      characters: [],
      character: null,
    };
  },
  getters: {
    getAllCharacters: (state) => {
      console.log(
        `characterStore.getAllCharacters() => ${state.characters.length}`
      );
      return state.characters;
    },
    getCharacter: (state) => {
      console.log(`characterStore.getCharacter() => ${state.character}`);
      return state.character;
    },
  },
  actions: {
    async fetchCharacters() {
      this.loading = true;
      try {
        const { data: characters, error } = await supabase
          .from("characters")
          .select("*")
          .order("name");

        if (error) {
          this.error = error;
          return;
        }

        if (characters === null) {
          this.characters = [];
          return;
        }

        this.setCharacters(characters);

      } catch (err) {
        this.error = err;
        console.error("Error retrieving data from db", err);
      } finally {
        this.loading = false;
      }
    },
    async fetchCharacter(id) {
      this.loading = true;
      try {
        const { data: characters, error } = await supabase
          .from("characters")
          .select("*")
          .order("id", id);

        if (error) {
          this.error = error;
          return;
        }

        if (characters === null) {
          this.character = null;
          return;
        }

        this.setCharacter(characters[0]);

      } catch (err) {
        this.error = err;
        console.error("Error retrieving data from db", err);
      } finally {
        this.loading = false;
      }
    },
    setCharacters(_characters) {
      this.characters = _characters;
    },
    setCharacter(_character) {
      this.character = _character;;
    },
    setSession(_session) {
      this.session = _session;
    },
  },
});

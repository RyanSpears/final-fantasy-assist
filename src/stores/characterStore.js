import { defineStore } from "pinia";
import { supabase } from "../supabase"

export const useCharacterStore = defineStore("CharacterStore", {
  state: () => ({
    characters: [],
  }),
  getters: {
    getAllCharacters: (state) => state.characters,
    getIsAuthenticated: (state) =>
      state.session != null && state.session?.user?.aud == "authenticated",
  },
  actions: {
    async fetchCharacters() {
      try {
        const { data: characters, error } = await supabase
          .from("characters")
          .select("*")
          .order("name");

        if (error) {
          console.log("error", error);
          return;
        }

        if (characters === null) {
          this.characters = [];
          return;
        }

        this.setCharacters(characters);

        console.log("got characters!", this.characters);
      } catch (err) {
        console.error("Error retrieving data from db", err);
      }
    },
    setCharacters(_characters) {
      this.characters = _characters;
    },
    setSession(_session) {
      this.session = _session;
    },
  },
});

import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useMonsterStore = defineStore('MonsterStore', {
  state: () => {
    return {
      loading: false,
      error: null,
      monsters: [],
    };
  },
  getters: {
    getAllMonsters: (state) => {
      console.log(`monsterStore.getAllMonsters() => ${state.monsters.length}`);
      return state.monsters;
    },
  },
  actions: {
    async fetchMonsters() {
      this.loading = true;
      try {
        let { data: monsters, error } = await supabase
          .from('monsters')
          .select('*')
          .order('id');

        console.log(`monsters count ${monsters.length}`);

        if (error) {
          this.error = error;
          return;
        }

        if (monsters === null) {
          this.monsters = [];
          return;
        }

        this.setMonsters(monsters);
      } catch (err) {
        this.error = err;
        console.error('Error retrieving data from db', err);
      } finally {
        this.loading = false;
      }
    },
    setMonsters(_monsters) {
      this.monsters = _monsters;
    },
  },
});

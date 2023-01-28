import { supabase } from "../supabase";
import { ref } from "vue";

const allCharacters = ref([]);

/**
 * Retrieve all todo for the signed in user
 */
async function fetchCharacters() {
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
      allCharacters.value = [];
      return;

    }
    allCharacters.value = characters;
    console.log("got characters!", allCharacters.value);
  } catch (err) {
    console.error("Error retrieving data from db", err);
  }
}

/**
 *  Add a new character to supabase
 */
async function addCharacter(character) {
  try {
    const { data, error } = await supabase.from("characters").insert(character).single();

    if (error) {
      alert(error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new character");
    return data;
  } catch (err) {
    alert("Error");
    console.error("Unknown problem inserting to db", err);
    return null;
  }
}

/**
 *  Deletes a todo via its id
 */
async function deleteCharacter(character) {
  try {
    await supabase.from("characters").delete().eq("id", character.id);
    console.log("deleted character", character.id);
  } catch (error) {
    console.error("error", error);
  }
}

export { allCharacters, fetchCharacters, addCharacter, deleteCharacter };

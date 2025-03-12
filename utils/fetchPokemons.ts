import axios from "axios";

const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

export const fetchPokemons = async () => {
  try {
    const response = await axios.get(POKE_API_URL);
    return response.data.results;
  } catch (error) {
    console.error("Erorr:", error);
    return [];
  }
};
export const fetchPokemonSprite = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

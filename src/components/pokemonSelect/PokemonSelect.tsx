import React, { useState, useEffect } from "react";
import { fetchPokemons } from "../../../utils/fetchPokemons";

const PokemonSelect = () => {
  const [selectedPokemons, setSelectedPokemons] = useState<{ name: string }[]>(
    []
  );
  const [pokemons, setPokemons] = useState<{ name: string }[]>([]);
  const [search, setSearch] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState<{ name: string }[]>(
    []
  );
  const [error, setError] = useState("");
  useEffect(() => {
    const loadPokemons = async () => {
      const data = await fetchPokemons();
      setPokemons(data);
    };
    loadPokemons();
  }, []);

  useEffect(() => {
    setFilteredPokemons(
      search
        ? pokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
          )
        : pokemons
    );
  }, [pokemons, search]);

  const handleSelectPokemon = (pokemonName: string) => {
    if (
      selectedPokemons.length < 4 &&
      !selectedPokemons.some((pokemon) => pokemon.name === pokemonName)
    ) {
      setSelectedPokemons((prevPokemon) => [
        ...prevPokemon,
        { name: pokemonName },
      ]);
      setError("");
    } else {
      setError("You cant pick more than 4 pokemons");
    }
  };

  return (
    <div className="p-4 ">
      <label className="block text-gray-700">Select pokemon:</label>
      <div className="flex flex-col">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search for pokemons..."
        />
        <select
          className="border p-2 rounded "
          onChange={(e) => handleSelectPokemon(e.target.value)}
        >
          <option value="">Select...</option>
          {filteredPokemons.map((pokemon, key) => (
            <option value={pokemon.name} key={key}>
              {pokemon.name}
            </option>
          ))}
        </select>
      </div>
      <ul className="flex justify-center list-none gap-[10px]">
        {selectedPokemons.map((pokemon, index) => (
          <li className="p-5 bg-red-500 text-white">{pokemon.name}</li>
        ))}
      </ul>
      <p>{error}</p>
    </div>
  );
};

export default PokemonSelect;

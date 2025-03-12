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

  const onHandleDelete = (pokemonName: string) => {
    setSelectedPokemons(
      selectedPokemons.filter((pokemon) => pokemon.name !== pokemonName)
    );
    setError("");
  };

  return (
    <div className="p-4 ">
      <div className="flex flex-col gap-[10px]">
        <div className="mx-auto w-[400px]">
          <label className="block text-gray-700 text-left mb-2" htmlFor="input">
            Select pokemon:
          </label>
          <input
            className="border py-3 px-4 rounded w-full"
            id="input"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search for pokemons..."
          />
        </div>
        <select
          className="border py-2 px-3 rounded w-[400px] rounded-[4px] mx-auto"
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
      <ul className="flex justify-center list-none gap-[10px] mt-[20px]">
        {selectedPokemons.map((pokemon, index) => (
          <li
            key={index}
            className="px-2.5 py-0.5 bg-green-500 text-white border-1 rounded-[20px]"
          >
            {pokemon.name}

            <span
              className="ml-[5px] cursor-pointer"
              onClick={() => onHandleDelete(pokemon.name)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
      <p className="text-red-500 ">{error}</p>
    </div>
  );
};

export default PokemonSelect;

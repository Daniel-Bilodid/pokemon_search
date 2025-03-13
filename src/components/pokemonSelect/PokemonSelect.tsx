// PokemonSelect.tsx
import React, { useState, useEffect } from "react";
import { fetchPokemons } from "../../../utils/fetchPokemons";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { Trainer } from "../../interface/Trainer";

interface PokemonSelectProps {
  register: UseFormRegister<Trainer>;
  errors: FieldErrors<Trainer>;
  setValue: UseFormSetValue<Trainer>;
  isSubmitted: boolean;
}

const PokemonSelect: React.FC<PokemonSelectProps> = ({
  register,
  errors,
  setValue,
  isSubmitted,
}) => {
  const [selectedPokemons, setSelectedPokemons] = useState<
    { name: string; url: string }[]
  >([]);
  const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);
  const [search, setSearch] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState<{ name: string }[]>(
    []
  );

  const getPokemonId = (url: string) => url.split("/").slice(-2, -1)[0];

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

  useEffect(() => {
    setValue("selectedPokemons", selectedPokemons, { shouldValidate: true });
  }, [selectedPokemons, setValue]);

  const handleSelectPokemon = (pokemonName: string) => {
    if (
      selectedPokemons.length < 4 &&
      !selectedPokemons.some((pokemon) => pokemon.name === pokemonName)
    ) {
      const pokemon = pokemons.find((p) => p.name === pokemonName);
      if (pokemon) {
        const id = getPokemonId(pokemon.url);

        const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        console.log(spriteUrl);
        setSelectedPokemons((prev) => [
          ...prev,
          { name: pokemon.name, url: spriteUrl },
        ]);
      }
    }
  };

  const onHandleDelete = (pokemonName: string) => {
    setSelectedPokemons(
      selectedPokemons.filter((pokemon) => pokemon.name !== pokemonName)
    );
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-[10px]">
        <div className="mx-auto w-full sm:w-96 lg:w-1/2">
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
          className="border py-2 px-3 rounded w-full sm:w-96 lg:w-1/2 mx-auto"
          onChange={(e) => handleSelectPokemon(e.target.value)}
        >
          <option value="">Select...</option>
          {filteredPokemons.map((pokemon, index) => (
            <option value={pokemon.name} key={index}>
              {pokemon.name}
            </option>
          ))}
        </select>

        {isSubmitted && errors.selectedPokemons && (
          <span className="text-red-500">
            {errors.selectedPokemons.message as string}
          </span>
        )}
      </div>
      <ul className="flex flex-wrap justify-center list-none gap-[10px] mt-[20px]">
        {selectedPokemons.map((pokemon, index) => (
          <li
            key={index}
            className="px-2.5 py-0.5  text-black border rounded-[20px]"
          >
            {pokemon.name}
            <img src={pokemon.url} alt={pokemon.name} />
            <span
              className="ml-[5px] cursor-pointer"
              onClick={() => onHandleDelete(pokemon.name)}
            >
              x
            </span>
          </li>
        ))}
      </ul>

      <input
        type="hidden"
        {...register("selectedPokemons", {
          required: "Pokemons are required",
          validate: (value: { name: string }[]) =>
            value.length === 4 || "A complete team requires exactly 4 Pokémon",
        })}
      />
    </div>
  );
};

export default PokemonSelect;

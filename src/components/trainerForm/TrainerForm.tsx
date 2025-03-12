import React from "react";
import PokemonSelect from "../pokemonSelect/PokemonSelect";

const TrainerForm = () => {
  return (
    <form>
      TrainerForm
      <div className="flex justify-center">
        <div className="flex flex-col">
          <label htmlFor="">Name:</label>
          <input type="text" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Surname:</label>
          <input type="text" />
        </div>
      </div>
      <PokemonSelect />
      <button>Show Team</button>
    </form>
  );
};

export default TrainerForm;

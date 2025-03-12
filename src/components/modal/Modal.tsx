import React from "react";
import { Trainer } from "../../interface/Trainer";

const Modal: React.FC<{ isOpen: boolean; data: Trainer | null }> = ({
  isOpen,
  data,
}) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-2">Trainer Info</h2>
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Surname:</strong> {data.surName}
        </p>
        <p>
          <strong>Pokemons:</strong>
        </p>
        <ul className="list-disc pl-5">
          {data.selectedPokemons?.map((pokemon, index) => (
            <li key={index}>
              {pokemon.name}
              <img src={pokemon.url} alt={pokemon.name} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;

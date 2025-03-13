import React from "react";
import { Trainer } from "../../interface/Trainer";

const Modal: React.FC<{
  isOpen: boolean;
  data: Trainer | null;
  onClose: () => void;
}> = ({ isOpen, data, onClose }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-40 backdrop-blur-sm z-50">
      <div className="bg-white w-full max-w-[500px] sm:w-[80%] md:w-[500px] h-auto p-8 rounded-xl shadow-2xl relative">
        <div className="flex justify-between items-center">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-lg font-semibold mb-4">Battle Formation</h2>
        </div>

        <div className="flex flex-wrap justify-between gap-4 mb-4">
          <p className="w-full sm:w-auto">
            <strong>Name:</strong> {data.name}
          </p>
          <p className="w-full sm:w-auto">
            <strong>Surname:</strong> {data.surName}
          </p>
        </div>

        <p className="font-semibold">Pokemons:</p>

        <ul className="list-none flex flex-wrap gap-4 mt-4 justify-center">
          {data.selectedPokemons?.map((pokemon, index) => (
            <li
              key={index}
              className="flex flex-col items-center justify-center gap-4"
            >
              <span>{pokemon.name}</span>
              <img
                className="border rounded-[20px] shadow-md border-[#caf4fe] w-16 h-16 sm:w-20 sm:h-20"
                src={pokemon.url}
                alt={pokemon.name}
              />
            </li>
          ))}
        </ul>

        <button
          className="w-full sm:w-[300px] py-3 rounded-[20px] bg-[#a6dfb8] text-white font-semibold shadow-md hover:bg-[#8ed9a4] active:scale-95 transition-all cursor-pointer mt-6 uppercase"
          onClick={onClose}
        >
          Use This Party
        </button>
      </div>
    </div>
  );
};

export default Modal;

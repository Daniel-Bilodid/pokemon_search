import React from "react";
import { Trainer } from "../../interface/Trainer";

const Modal: React.FC<{
  isOpen: boolean;
  data: Trainer | null;
  onClose: () => void;
}> = ({ isOpen, data, onClose }) => {
  if (!isOpen || !data) return null;

  const handleCloseModal = () => {
    isOpen = !isOpen;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-40 backdrop-blur-sm z-50">
      <div className="bg-white max-w-[500px] h-[410px] p-8 rounded-xl shadow-2xl relative">
        <div className="flex ">
          <button
            className="absolute top-8 right-8 text-gray-500 hover:text-gray-800 cursor-pointer"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-lg font-semibold mb-2">Battle Formation</h2>
        </div>
        <div className="flex justify-center gap-[10px] mb-[20px] mt-[10px]">
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Surname:</strong> {data.surName}
          </p>
        </div>
        <p>
          <strong>Pokemons:</strong>
        </p>
        <ul className="list-none flex flex-wrap gap-[10px] mt-[10px]">
          {data.selectedPokemons?.map((pokemon, index) => (
            <li
              key={index}
              className="flex flex-col-reverse items-center justify-center gap-[20px]"
            >
              {pokemon.name}
              <img
                className="border rounded-[20px] shadow-md border-[#caf4fe]"
                src={pokemon.url}
                alt={pokemon.name}
              />
            </li>
          ))}
        </ul>

        <button
          className="w-[300px] py-3 rounded-[20px] bg-[#a6dfb8] text-white font-semibold shadow-md hover:bg-[#8ed9a4] active:scale-95 transition-all cursor-pointer mt-[20px] uppercase"
          onClick={onClose}
        >
          Use This Party
        </button>
      </div>
    </div>
  );
};

export default Modal;

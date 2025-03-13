import { useState } from "react";
import PokemonSelect from "../pokemonSelect/PokemonSelect";
import { useForm, SubmitHandler } from "react-hook-form";
import { Trainer } from "../../interface/Trainer";
import Modal from "../modal/Modal";

const TrainerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setValue,
  } = useForm<Trainer>({
    mode: "onSubmit",
    defaultValues: {
      selectedPokemons: [],
    },
  });

  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [data, setData] = useState<Trainer | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const onSubmit: SubmitHandler<Trainer> = (data) => {
    setData(data);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen((prevState) => !prevState);
  };
  console.log("data", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl mb-6 text-center">TrainerForm</h1>
      <div className="flex flex-col items-center">
        <div className="w-full sm:w-96 lg:w-1/2">
          <label className="block text-gray-700 text-left mb-2" htmlFor="input">
            Name:
          </label>
          <input
            className="border py-3 px-4 rounded w-full"
            id="input"
            type="text"
            placeholder="Enter your name..."
            value={name}
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
              maxLength: {
                value: 12,
                message: "Name must be at most 12 characters",
              },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Name can only contain letters",
              },
            })}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="w-full sm:w-96 lg:w-1/2 mt-4">
          <label className="block text-gray-700 text-left mb-2" htmlFor="input">
            Surname:
          </label>
          <input
            className="border py-3 px-4 rounded w-full"
            id="input"
            type="text"
            placeholder="Enter your surname..."
            value={surName}
            {...register("surName", {
              required: "SurName is required",
              minLength: {
                value: 2,
                message: "SurName must be at least 2 characters",
              },
              maxLength: {
                value: 12,
                message: "SurName must be at most 12 characters",
              },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "SurName can only contain letters",
              },
            })}
            onChange={(e) => setSurName(e.target.value)}
          />
          {errors.surName && (
            <span className="text-red-500">{errors.surName.message}</span>
          )}
        </div>
      </div>

      <PokemonSelect
        register={register}
        errors={errors}
        setValue={setValue}
        isSubmitted={isSubmitted}
      />

      <Modal data={data} isOpen={isOpen} onClose={onClose} />

      <div className="flex justify-center mt-6">
        <button className="bg-[#4724c8] w-full sm:w-auto p-4 rounded-[20px] text-white cursor-pointer text-center">
          Show Team
        </button>
      </div>
    </form>
  );
};

export default TrainerForm;

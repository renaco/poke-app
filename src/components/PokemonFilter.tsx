import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetPokemonByIdOrNameQuery } from "../services/pokemon";

type FormValues = {
  search: string;
};

const PokemonFilter = () => {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const [query, setQuery] = useState("");
  const searchValue = watch("search", ""); // Watch the search input field
  const { data, error, isLoading } = useGetPokemonByIdOrNameQuery(query, {
    skip: !query,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setQuery(data.search); // Trigger the query with the form value
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter Pokémon ID or Name"
          {...register("search", { required: true })}
        />
        <button type="submit" disabled={!searchValue}>
          Search
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.toString()}</p>}
      {data && (
        <div>
          <h3>{data.name}</h3>
          <img src={data.sprites.front_default} alt={data.name} />
        </div>
      )}
    </div>
  );
};

export default PokemonFilter;

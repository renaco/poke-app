import React, { useState } from "react";
import { useGetPokemonByIdOrNameQuery } from "../services/pokemon";

const PokemonFilter: React.FC = () => {
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = useGetPokemonByIdOrNameQuery(search, {
    skip: !search,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Pokémon ID or Name"
        value={search}
        onChange={handleChange}
      />
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

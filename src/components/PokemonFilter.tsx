import React, { useState } from "react";
import { useGetPokemonByIdOrNameQuery } from "../services/pokemon";

const PokemonFilter: React.FC = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useGetPokemonByIdOrNameQuery(query, {
    skip: !query,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(search); // Trigger the query with the current search value
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Pokémon ID or Name"
          value={search}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
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

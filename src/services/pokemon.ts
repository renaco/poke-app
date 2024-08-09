import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByIdOrName: builder.query({
      query: (search: string) => `pokemon/${search}`,
    }),
  }),
});

export const { useGetPokemonByIdOrNameQuery } = pokemonApi;

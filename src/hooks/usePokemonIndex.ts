import { useEffect, useState } from "react";
import type { PokemonOverview } from "../interfaces/Pokemon";
import type { AsyncFetchingHookResult, AsyncResourceStatus } from "../interfaces/api";

/**
 * Get all PokemonOverviews for all available pokemon.
 * @returns an array of PokemonOverviews for all available pokemon
 */
export function usePokemonIndex(): AsyncFetchingHookResult<PokemonOverview[]> {
    const [pokemons, setPokemons] = useState<PokemonOverview[] | null>(null);
    const [status, setStatus] = useState<AsyncResourceStatus>("pending");

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=5000`);
                if (res.ok) {
                    const allPokemon: { results: { name: string }[] } = await res.json();
                    setPokemons(allPokemon.results);
                    setStatus("success");
                }
                else {
                    setStatus("error");
                }
            }
            catch (e) {
                console.error(e);
                setStatus("error");
            }
        }
        fetchPokemon()
    }, [])

    return { data: pokemons, status }
}
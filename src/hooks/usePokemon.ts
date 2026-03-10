import { useEffect, useState } from "react";
import type { AsyncFetchingHookResult, AsyncResourceStatus } from "../interfaces/api";
import type { Pokemon } from "../interfaces/Pokemon";

export function usePokemon(pokemonName: string): AsyncFetchingHookResult<Pokemon> {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [failureReason, setFailureReason] = useState<AsyncResourceStatus & ("pending" | "error")>("pending");

    useEffect(() => {
        async function FetchPokemonByName(pokemonName: (string)) {
            if (pokemonName === "") { //a blank string result in a call to the index endpoint, returns OK but with a different type
                return null;
            }
            else {
                try {
                    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
                        async (res) => {
                            if (res.ok) {
                                const newPokemon = await res.json();
                                if (newPokemon != null) {
                                    setPokemon(newPokemon);
                                }
                            }
                            else {
                                setFailureReason("error");
                            }
                        }
                    );
                }
                catch (e) {
                    console.error(e);
                    setFailureReason("error");
                }
            }
        }
        FetchPokemonByName(pokemonName);
    }, [pokemonName]);
    useEffect(() => {

    }, [pokemonName, pokemon]);

    return pokemon !== null ? { data: pokemon, status: "success" } : { data: pokemon, status: failureReason };
}
import { useMemo } from "react";
import type { PokemonOverview } from "../interfaces/Pokemon";
import { usePokemonIndex } from "./usePokemonIndex";

function buildAutocomplete(pokemons: PokemonOverview[]) {
    const autoCompletions = new Map<string, Set<string>>();
    //iterate every substring of every pokemon name, and build up a dictionary of autocompletions
    //O(n)
    const subStrings: string[] = [];
    for (const pokemon of pokemons) {
        const nMinOne = pokemon.name.length - 1;
        for (let i = 1; i < nMinOne; i++) {
            subStrings.push(pokemon.name.substring(0, i));

            //initialize the list if one does not already exists
            if (autoCompletions.get(subStrings[subStrings.length - 1]) === undefined) {
                autoCompletions.set(subStrings[subStrings.length - 1], new Set<string>());
            }
            const suggestions = autoCompletions.get(subStrings[subStrings.length - 1]);
            if (suggestions !== undefined) {
                suggestions.add(pokemon.name)
            }
        }
        subStrings.length = 0; //clear the array
    }

    return autoCompletions;
}

/**
 * Get all of the search auto-completions for a given pokemon name.
 * @param query the text to get autocompletions for
 * @returns list of valid pokemon names that query could lead to 
 */
export function usePokemonAutocompletions(query: string): string[] {
    const { data: allPokemon, status: pokemonStatus } = usePokemonIndex();

    const allAutocompletions = useMemo(() => pokemonStatus === 'success' ? buildAutocomplete(allPokemon) : null, [allPokemon, pokemonStatus]);
    const theseAutocompletions = useMemo(() => {
        const asSet = allAutocompletions?.get(query);
        return asSet === undefined ? [] : Array.from(asSet.values());
    }, [allAutocompletions, query])

    return theseAutocompletions;
}
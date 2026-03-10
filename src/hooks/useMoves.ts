import { useEffect, useState } from "react";
import type { AsyncFetchingHookResult, AsyncResourceStatus } from "../interfaces/api";
import type { PokemonMove, PokemonMoveProvider } from "../interfaces/PokemonMove";
import type { PokemonType } from "../interfaces/PokemonType";

type MovesAPIResponse = {
    name: string;
    type: { name: PokemonType; };
    damage_class: {
        name: PokemonMove['damageClass'];
    };
    power: number;
    pp: number;
    effect_entries: {
        effect: string;
        language: {
            name: string;
        };
    }[]
};

function mapAPIResponseToMove(apiMove: MovesAPIResponse): PokemonMove {
    const localisedEffect = apiMove.effect_entries.find(entry => navigator.language.includes(entry.language.name)); // should prob use languages by priority
    const effectFormatted = localisedEffect === undefined ? "" : (localisedEffect.language.name.startsWith("en") ? localisedEffect.effect.replace("Inflicts regular damage.", "").trim() : localisedEffect.effect.trim());
    return {
        name: apiMove.name,
        type: apiMove.type.name,
        damageClass: apiMove.damage_class.name,
        power: apiMove.power,
        pp: apiMove.pp,
        effect: effectFormatted
    }
}

export function useMoves(moveProviders: PokemonMoveProvider[]): AsyncFetchingHookResult<PokemonMove[]> {
    const [moves, setMoves] = useState<PokemonMove[]>([]);
    const [failureReason, setFailureReason] = useState<AsyncResourceStatus & ("pending" | "error")>("pending");


    useEffect(() => {
        //get the list of moves for the pokemon
        async function fetchMoves() {
            try {
                //get all the move names & data sources
                //get the data for each move, and transform it into our format
                const moves = await Promise.all(moveProviders.map(async (moveProvider: PokemonMoveProvider) => {
                    const response = await fetch(moveProvider.move.url);
                    if (response.ok) {
                        //parse move data from API
                        const data = await response.json() as MovesAPIResponse;
                        return mapAPIResponseToMove(data);
                    }
                    else {
                        throw new Error('failed to get move');
                    }
                }));

                setMoves(moves); //remove any moves we failed to get
            }
            catch (e) {
                console.error(e);
                setMoves([]);
                setFailureReason("error");
            }
        }
        fetchMoves();
    }, [moveProviders]);

    return moves !== null ? { data: moves, status: "success" } : { data: moves, status: failureReason };
}
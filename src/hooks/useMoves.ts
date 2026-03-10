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
    effect_entries: { effect: string }[]
};

function mapAPIResponseToMove(apiMove: MovesAPIResponse): PokemonMove {
    return {
        name: apiMove.name,
        type: apiMove.type.name,
        damageClass: apiMove.damage_class.name,
        power: apiMove.power,
        pp: apiMove.pp,
        effect: (apiMove.effect_entries.length > 0 ? apiMove.effect_entries[0].effect.replace("Inflicts regular damage.", "").trim() : "")
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
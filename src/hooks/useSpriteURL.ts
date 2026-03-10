import { useEffect, useState } from "react";
import type { SpriteDisplayProps } from "../components/SpriteDisplay";
import type { AsyncFetchingHookResult, AsyncResourceStatus } from "../interfaces/api";
import type { PokeAPIPokemonSpriteURL } from "../interfaces/PokeAPIURLs";


export function useSpriteURL(pokemon: SpriteDisplayProps['pokemon'], sprite: SpriteDisplayProps['sprite']): AsyncFetchingHookResult<PokeAPIPokemonSpriteURL> {
    const [spriteURL, setSpriteURL] = useState<PokeAPIPokemonSpriteURL | null>(null);
    const [failureReason, setFailureReason] = useState<AsyncResourceStatus & ("pending" | "error")>("pending");


    useEffect(() => {
        //get the list of moves for the pokemon
        async function fetchMoves(): Promise<void> {
            // clear prev state
            setFailureReason("pending");

            // if the default form was requested, we already have it, so return that
            if (sprite === null) {
                if (pokemon !== null) {
                    setSpriteURL(pokemon.sprites.front_default);
                }
                // else the pokemn hasn't loaded yet, the effect will trigger again once it is
            }
            // otherwise we need to make an API request to get the image
            else {
                const targetForm = pokemon?.forms[sprite];
                if (targetForm === undefined) {
                    setFailureReason("error");
                }
                else {
                    try {
                        const res = await fetch(targetForm.url);
                        if (res.ok) { // TODO check that the queryKey is still valid before continuing
                            const json: { sprites: { front_default: PokeAPIPokemonSpriteURL } } = await res.json();
                            if (json !== null) {
                                setSpriteURL(json.sprites.front_default);
                            }
                            else {
                                setFailureReason("error");
                            }
                        }
                        else {
                            setFailureReason("error");
                        }
                    }
                    catch (e) {
                        console.error(e);
                        setFailureReason("error");
                    }
                }
            }
        }
        fetchMoves();
    }, [pokemon, pokemon?.forms, pokemon?.sprites.front_default, sprite]);

    return spriteURL !== null ? { data: spriteURL, status: "success" } : { data: spriteURL, status: failureReason };
}
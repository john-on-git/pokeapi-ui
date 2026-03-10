import type { PokeAPICryLatestURL, PokeAPIFormURL, PokeAPIPokemonSpriteURL } from "./PokeAPIURLs";
import type { PokemonMoveProvider } from "./PokemonMove";

export type PokemonOverview = {
    name: string;
}

export type Pokemon = PokemonOverview & {
    moves: PokemonMoveProvider[];
    sprites: {
        front_default: PokeAPIPokemonSpriteURL;
        //and more
    };
    stats: {
        base_stat: number,
        effort: number,
        stat: {
            name: string,
            url: string
        }
    }[];
    forms: {
        name: string;
        url: PokeAPIFormURL;
    }[];
    cries: {
        latest: PokeAPICryLatestURL;
    };
}
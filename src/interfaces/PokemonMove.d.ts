import type { PokeAPIMoveURL } from "./PokeAPIURLs";
import type { PokemonType } from "./PokemonType";

export interface PokemonMove {
    name: string;

    type: PokemonType;
    damageClass: ("status" | "physical" | "special");
    power: (number | null);
    pp: number;
    effect: string;
}

export interface PokemonMoveProvider { //from API data, provides URL needed to get full move data
    move: {
        name: string; 
        url: PokeAPIMoveURL;
    };
}
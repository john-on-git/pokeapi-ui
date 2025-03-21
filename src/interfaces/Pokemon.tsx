import { PokeAPIPokemonSpriteURL } from "./PokeAPIURLs";
import { PokemonMoveProvider } from "./PokemonMove";

export interface Pokemon { //is a subset of the API data structure and should remain that way
    name: string;
    moves: PokemonMoveProvider[];
    sprites: {
        front_default: PokeAPIPokemonSpriteURL;
        //and more
    };
    stats: {
        base_stat:number, 
        effort:number, 
        stat: {
            name: string,
            url:string
        }
    }[];
}
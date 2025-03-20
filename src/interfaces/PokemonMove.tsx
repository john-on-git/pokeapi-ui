import { PokemonType } from "./PokemonType";

export interface PokemonMove {
    name: string;

    type: PokemonType;
    damageClass: ("status" | "physical" | "special");
    power: number;
    pp: number;
}
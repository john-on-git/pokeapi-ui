import { createContext } from "react";
import { PokemonMove } from "../interfaces/PokemonMove";

export const MovesContext = createContext<PokemonMove[]>([]);
import type { PokemonType } from "../interfaces/PokemonType";


export default function getColorForType(type: PokemonType): { noHover: `#${string}`; onHover: `#${string}`; } {
    switch (type) {
        case "normal":
            return { noHover: "#B7B8A8", onHover: "#9c9e87" };
        case "fire":
            return { noHover: "#EA9447", onHover: "#d17d34" };
        case "fighting":
            return { noHover: "#E67974", onHover: "#cc615b" };
        case "water":
            return { noHover: "#7594CA", onHover: "#5d7baf" };
        case "flying":
            return { noHover: "#77C5EB", onHover: "#60abd1" };
        case "grass":
            return { noHover: "#AACF89", onHover: "#8fb56e" };
        case "poison":
            return { noHover: "#BE97C4", onHover: "#a47baa" };
        case "electric":
            return { noHover: "#E1E14D", onHover: "#c6c639" };
        case "ground":
            return { noHover: "#C19F57", onHover: "#a88843" };
        case "psychic":
            return { noHover: "#D85299", onHover: "#bf3f83" };
        case "rock":
            return { noHover: "#C19F57", onHover: "#a88843" };
        case "ice":
            return { noHover: "#77C7C6", onHover: "#5fadac" };
        case "bug":
            return { noHover: "#A8C78C", onHover: "#8dad70" };
        case "dragon":
            return { noHover: "#7594CA", onHover: "#5d7baf" };
        case "ghost":
            return { noHover: "#8474B3", onHover: "#6b5b99" };
        case "dark":
            return { noHover: "#8E8888", onHover: "#756a6a" };
        case "steel":
            return { noHover: "#B7B8A8", onHover: "#9c9e87" };
        case "fairy":
            return { noHover: "#B8B9CE", onHover: "#9899b5" };
        case "stellar":
            return { noHover: "#DAB0D4", onHover: "#bf91b8" };
        case "???":
            return { noHover: "#A3C3B8", onHover: "#84a89b" };
    }
}

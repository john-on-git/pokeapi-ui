export type PokemonType = (
    "normal" |
    "fire" |
    "fighting" |
    "water" |
    "flying" |
    "grass" |
    "poison" |
    "electric" |
    "ground" |
    "psychic" |
    "rock" |
    "ice" |
    "bug" |
    "dragon" |
    "ghost" |
    "dark" |
    "steel" |
    "fairy" |
    "stellar" |
    "???"
);

export default function colorFor(type: PokemonType): `#${string}` {
    switch(type)
    {
        case "normal":
            return "#B7B8A8";
        case "fire":
            return "#EA9447";
        case "fighting":
            return "#E67974";
        case "water":
            return "#7594CA";
        case "flying":
            return "#77C5EB";
        case "grass":
            return "#AACF89";
        case "poison":
            return "#BE97C4";
        case "electric":
            return "#E1E14D";
        case "ground":
            return "#C19F57";
        case "psychic":
            return "#D85299";
        case "rock":
            return "#C19F57";
        case "ice":
            return "#77C7C6";
        case "bug":
            return "#A8C78C";
        case "dragon":
            return "#7594CA";
        case "ghost":
            return "#8474B3";
        case "dark":
            return "#8E8888";
        case "steel":
            return "#B8B9CE";
        case "fairy":
            return "#B7B8A8";
        case "stellar":
            return "#DAB0D4";
        case "???":
            return "#A3C3B8";
    }
}
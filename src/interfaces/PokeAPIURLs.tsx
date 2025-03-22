export type PokeAPIGenericURL = `https://pokeapi.co/api/v2${string}`;
export type PokeAPIPokemonSpriteURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${("" | "back/")}${("" | "shiny/")}${number}.png`;
export type PokeAPIMoveURL = `https://pokeapi.co/api/v2/move/${number}${(""|"/")}`;
export type PokeAPIFormURL = `https://pokeapi.co/api/v2/pokemon-form/${number}${(""|"/")}`;
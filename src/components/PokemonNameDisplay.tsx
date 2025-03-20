
interface Props {
    pokemonName: string;
}

export default function PokemonNameDisplay({pokemonName: name}: Props) {
    return (
        <div className="pokemon-name-display">
            <h1>{name.substring(0,1).toLocaleUpperCase() + name.substring(1,name.length)}</h1>
        </div>
    )
}
import { useState } from 'react';
import MoveList from '../components/MoveList';
import { usePokemon } from '../hooks/usePokemon';
import BaseStatsDisplay from './BaseStatsDisplay';
import FormSelector from './FormSelector';
import PokemonNameSearch from './PokemonNameSearch';
import './PokemonViewer.css';
import { SpriteDisplay, type SpriteDisplayProps } from './SpriteDisplay';



export default function PokemonViewer() {
    const [pokemonName, setPokemonName] = useState<string>("pikachu"); // use mew for movelist testing because it can learn moves of every type
    const { data: pokemon, status: pokemonStatus } = usePokemon(pokemonName);

    const [activeSprite, setActiveSprite] = useState<SpriteDisplayProps | { pokemon: null, sprite: null }>({ pokemon: null, sprite: null });

    // reset the sprite whenever the pokemon changes
    if (pokemonStatus === "success" && activeSprite?.pokemon !== pokemon && pokemon !== null) {
        setActiveSprite({
            pokemon: pokemon,
            sprite: null,
        });
    }

    return (
        <div className="pokemon-viewer">
            <MoveList pokemon={pokemon} />
            <div className="pokemon-viewer-mid-col">
                <PokemonNameSearch
                    pokemonName={pokemonName}
                    setPokemonName={setPokemonName}
                />
                <SpriteDisplay {...activeSprite} />
                <FormSelector
                    forms={pokemon?.forms ?? []}
                    setActiveSprite={setActiveSprite} />
            </div>
            <BaseStatsDisplay stats={pokemon === null ? null : pokemon.stats} />
        </div>
    );
}
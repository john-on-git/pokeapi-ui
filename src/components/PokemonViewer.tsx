import { useEffect, useState } from 'react';
import MoveList from '../components/MoveList';
import PokemonNameDisplay from './PokemonNameDisplay';
import { Pokemon } from '../interfaces/Pokemon';

export default function PokemonViewer() {
    
    /*
        <SpriteDisplay/>
        <CryPlayer/>
        <MoveList/>
        <StatList/>
    </>
    */

    const [pokemonName, setPokemonName] = useState<string>("mew"); //use mew for movelist testing because it can learn moves of every type
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    useEffect(() => {
        async function FetchPokemon() {
            await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
                async (response) => {
                    if(response.ok) {                    
                        setPokemon(await response.json());
                    }
                }
            );
        }
        FetchPokemon();
    });

    return (
        <div className="pokemon-viewer">
            <PokemonNameDisplay pokemonName={pokemonName}/>
            {pokemon && <MoveList pokemon={pokemon}/>}
        </div>
    );
}
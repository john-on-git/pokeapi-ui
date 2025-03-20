import { useEffect, useState } from 'react';
import MoveList from '../components/MoveList';
import PokemonNameDisplay from './PokemonNameDisplay';
import { Pokemon } from '../interfaces/Pokemon';
import { SpriteDisplay } from './SpriteDisplay';
import { PokeAPIPokemonSpriteURL } from '../interfaces/PokeAPIURLs';
import './PokemonViewer.css';

export default function PokemonViewer() {
    
    /*
        <CryPlayer/>
        <MoveList/>
        <StatList/>
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
    }, [pokemonName]);

    const sprite: (PokeAPIPokemonSpriteURL | null) = pokemon===null ? null : pokemon.sprites.front_default; //temporary, just use the default front sprite
    return (
        <div className="pokemon-viewer">
            {pokemon && <>
                <MoveList moveProviders={pokemon.moves}/>
                <div className="pokemon-viewer-mid-col">
                    <PokemonNameDisplay pokemonName={pokemonName}/>
                    {sprite && <SpriteDisplay imageURL={sprite}/>}
                    <div className="placeholder-form-select">
                        Placeholder Form Select
                    </div>
                </div>
                <div className="placeholder-stat-col"> {/*stats list will go here*/}
                    <p>Placeholder Stats</p>
                </div>
            </>}
        </div>
    );
}
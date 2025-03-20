import { useState } from 'react';
import MoveList from '../components/MoveList';
import PokemonNameDisplay from './PokemonNameDisplay';

export default function PokemonViewer() {
    
    /*
        <SpriteDisplay/>
        <CryPlayer/>
        <MoveList/>
        <StatList/>
    </>
    */

    const [pokemonName, setPokemonName] = useState<string>("spiritomb");

    return (
        <div className="pokemon-viewer">
            <PokemonNameDisplay pokemonName={pokemonName}/>
            <MoveList pokemonName={pokemonName}/>
        </div>
    );
}
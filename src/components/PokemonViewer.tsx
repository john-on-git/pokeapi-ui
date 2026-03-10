import { useState } from 'react';
import MoveList from '../components/MoveList';
import { usePokemon } from '../hooks/usePokemon';
import type { PokeAPIPokemonSpriteURL } from '../interfaces/PokeAPIURLs';
import type { Pokemon } from '../interfaces/Pokemon';
import BaseStatsDisplay from './BaseStatsDisplay';
import FormSelector from './FormSelector';
import PokemonNameSearch from './PokemonNameSearch';
import './PokemonViewer.css';
import { SpriteDisplay } from './SpriteDisplay';


export default function PokemonViewer() {
    const [pokemonName, setPokemonName] = useState<string>("pikachu"); // use mew for movelist testing because it can learn moves of every type
    const { data: pokemon, status: pokemonStatus } = usePokemon(pokemonName);

    const [spriteFor, setSpriteFor] = useState<Pokemon | null>(null);
    const [spriteURL, setSpriteURL] = useState<PokeAPIPokemonSpriteURL | null>(null);

    // reset the sprite whenever the pokemon changes
    if (pokemonStatus === "success" && spriteFor !== pokemon && pokemon !== null) {
        setSpriteFor(pokemon);
        setSpriteURL(pokemon.sprites.front_default); //also set the initial sprite to the default form
    }

    return (
        <div className="pokemon-viewer">
            <MoveList pokemon={pokemon} />
            <div className="pokemon-viewer-mid-col">
                <PokemonNameSearch
                    pokemonName={pokemonName}
                    setPokemonName={setPokemonName}
                />
                <SpriteDisplay
                    imageURL={spriteURL}
                    onSpriteClick={(event) => {
                        const mainCssClass = "sprite-bounce";
                        if (pokemon !== null && !event.currentTarget.classList.contains(mainCssClass)) {
                            const cssClasses = [mainCssClass, (((Math.round(Math.random() * 2) % 2) === 0) ? "sprite-twist-left" : "sprite-twist-right")];
                            // play the cry audio
                            const cry = new Audio(pokemon.cries.latest);
                            cry.volume = 0.1; // reduce the volume because the default is really loud on my machine 
                            cry.addEventListener("ended", (function (this: Element) { this.classList.remove(...cssClasses); }).bind(event.currentTarget)); //listener to remove the visual effect class when the cry is finsihed
                            cry.play();

                            //do visual effect
                            event.currentTarget.classList.add(...cssClasses);
                        }
                    }}
                />
                <FormSelector
                    forms={pokemon === null ? [] : pokemon.forms /*extract just the url from the wrapper object*/}
                    setSpriteCallbackFn={setSpriteURL}
                />
            </div>
            <BaseStatsDisplay stats={pokemon === null ? null : pokemon.stats} />
        </div>
    );
}
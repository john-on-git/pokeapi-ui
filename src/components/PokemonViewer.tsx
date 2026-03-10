import { useEffect, useState } from 'react';
import MoveList from '../components/MoveList';
import type { PokeAPIPokemonSpriteURL } from '../interfaces/PokeAPIURLs';
import type { Pokemon } from '../interfaces/Pokemon';
import BaseStatsDisplay from './BaseStatsDisplay';
import FormSelector from './FormSelector';
import PokemonNameSearch from './PokemonNameSearch';
import './PokemonViewer.css';
import { SpriteDisplay } from './SpriteDisplay';


export default function PokemonViewer() {
    const [pokemonName, setPokemonName] = useState<string>("pikachu"); // use mew for movelist testing because it can learn moves of every type
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [sprite, setSprite] = useState<PokeAPIPokemonSpriteURL | null>(null);


    useEffect(() => {
        async function FetchPokemonByName(pokemonName: (string)) {
            if (pokemonName === "") { //a blank string result in a call to the index endpoint, returns OK but with a different type
                return null;
            }
            else {
                await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
                    async (res) => {
                        if (res.ok) {
                            const newPokemon = await res.json();
                            if (newPokemon != null) {
                                setPokemon(newPokemon);
                                setSprite(newPokemon.sprites.front_default); //also set the initial sprite to the default form
                            }
                        }
                    }
                );
            }
        }
        FetchPokemonByName(pokemonName);
    }, [pokemonName]);
    useEffect(() => {

    }, [pokemonName, pokemon]);

    return (
        <div className="pokemon-viewer">
            <MoveList moveProviders={pokemon === null ? [] : pokemon.moves} />
            <div className="pokemon-viewer-mid-col">
                <PokemonNameSearch
                    pokemonName={pokemonName}
                    setPokemonName={setPokemonName}
                />
                <SpriteDisplay
                    imageURL={sprite}
                    onSpriteClick={(event) => {
                        const mainCssClass = "sprite-bounce";
                        if (pokemon !== null && !event.currentTarget.classList.contains(mainCssClass)) {
                            const cssClasses = [mainCssClass, (((Math.round(Math.random() * 2) % 2) === 0) ? "sprite-twist-left" : "sprite-twist-right")];
                            //play the cry audio
                            const cry = new Audio(pokemon.cries.latest);
                            cry.addEventListener("ended", (function (this: Element) { this.classList.remove(...cssClasses); }).bind(event.currentTarget)); //listener to remove the visual effect class when the cry is finsihed
                            cry.play();

                            //do visual effect
                            event.currentTarget.classList.add(...cssClasses);
                        }
                    }}
                />
                <FormSelector
                    forms={pokemon === null ? [] : pokemon.forms /*extract just the url from the wrapper object*/}
                    setSpriteCallbackFn={setSprite}
                />
            </div>
            <BaseStatsDisplay stats={pokemon === null ? null : pokemon.stats} />
        </div>
    );
}
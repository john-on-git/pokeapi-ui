import { useEffect, useState } from 'react';
import MoveList from '../components/MoveList';
import { Pokemon } from '../interfaces/Pokemon';
import { SpriteDisplay } from './SpriteDisplay';
import './PokemonViewer.css';
import PokemonNameSearch from './PokemonNameSearch';
import BaseStatsDisplay from './BaseStatsDisplay';
import { PokeAPIPokemonSpriteURL } from '../interfaces/PokeAPIURLs';
import FormSelector from './FormSelector';

export default function PokemonViewer() {
    
    /*
        <CryPlayer/>
        <MoveList/>
        <StatList/>
    */

    const [searchAutocomplete, setSearchAutocomplete] = useState<Map<string,Set<string>>>(new Map<string,Set<string>>()); //contains substrings of all pokemon names, and the corresponding autocomplete possibilites. Map is faster than Object for n≈1000 according to the data in this article https://www.zhenghao.io/posts/object-vs-map
    const [pokemonName, setPokemonName] = useState<string>("pikachu"); //use mew for movelist testing because it can learn moves of every type
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [sprite, setSprite] = useState<PokeAPIPokemonSpriteURL | null>(null);

    useEffect(() => {
        async function BuildAutocomplete() {
            await fetch(`https://pokeapi.co/api/v2/pokemon?limit=5000`).then(
                async (res) => {
                    if(res.ok) {
                        const allPokemon: {results: {name: string}[]} = await res.json();
                        //iterate every substring of every pokemon name, and build up a dictionary of autocompletions
                        //O(n)
                        const subStrings: string[] = [];
                        for(const {name} of allPokemon.results) {
                            const nMinOne = name.length-1;
                            for(let i=1; i<nMinOne; i++) {
                                subStrings.push(name.substring(0,i));
                                
                                //initialize the list if one does not already exists
                                if(searchAutocomplete.get(subStrings[subStrings.length-1])===undefined) {
                                    searchAutocomplete.set(subStrings[subStrings.length-1], new Set<string>());
                                }
                                searchAutocomplete.get(subStrings[subStrings.length-1])!.add(name); //bang operator suppresses a typescript warning here (possible === undefined), pretty sure this is a static analysis bug but might not be  
                            }
                            subStrings.length = 0; //clear the array
                        }
                    }
                }
            );
        }
        BuildAutocomplete();
    }, []);

    useEffect(() => {
        async function FetchPokemonByName(pokemonName:(string)) {
            if(pokemonName==="") { //a blank string result in a call to the index endpoint, returns OK but with a different type
                return null;
            }
            else {
                await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
                    async (res) => {
                        if(res.ok) {
                            const newPokemon = await res.json();                 
                            if(newPokemon!=null) {
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
            <MoveList moveProviders={pokemon===null ? [] : pokemon.moves}/>
            <div className="pokemon-viewer-mid-col">
                <PokemonNameSearch
                    pokemonName={pokemonName}
                    setPokemonNameCallbackFn={setPokemonName}
                    allAutocompletions={searchAutocomplete}
                />
                <SpriteDisplay
                    imageURL={sprite}
                    onSpriteClick={(event) => {
                        const mainCssClass = "sprite-bounce";
                        if(pokemon!==null && !event.currentTarget.classList.contains(mainCssClass)) {
                            const cssClasses = [mainCssClass, (((Math.round(Math.random()*2)%2)===0) ? "sprite-twist-left" : "sprite-twist-right")];
                            //play the cry audio
                            const cry = new Audio(pokemon.cries.latest);
                            cry.addEventListener("ended", (function (this: Element) { this.classList.remove(... cssClasses); } ).bind(event.currentTarget)); //listener to remove the visual effect class when the cry is finsihed
                            cry.play();

                            //do visual effect
                            event.currentTarget.classList.add(... cssClasses);
                        }
                    }}
                />
                <FormSelector
                    forms={pokemon===null ? [] : pokemon.forms /*extract just the url from the wrapper object*/ }
                    setSpriteCallbackFn={setSprite}
                />
            </div>
            <BaseStatsDisplay stats={pokemon===null ? null : pokemon.stats}/>
        </div>
    );
}
import { ReactNode, useRef, useState } from "react";
import "./PokemonNameSearch.css";

interface Props {
    pokemonName: string;
    setPokemonNameCallbackFn: ((pokemonName:string) => void);
    allAutocompletions: Map<string, Set<string>>;
}
export default function PokemonNameSearch({pokemonName, setPokemonNameCallbackFn, allAutocompletions}: Props) {
    const [isFocused, setIsFocused] = useState(false);

    const asList: ReactNode[] = [];
    
    //get the autocompletions for the current pokemonName
    const autoCompletions = allAutocompletions.get(pokemonName);
    if(autoCompletions!==undefined) {
        autoCompletions.forEach((autocompletion) => asList.push(
            <button 
                className="autocompletion poke-button" 
                type="button" 
                key={autocompletion} 
                onClick={() => {

                    setPokemonNameCallbackFn(autocompletion)
                }}
            >
                {autocompletion}
            </button>
        ));
    }

    return (
        <>
            <div className="bubble-container pokemon-search-container">
                <h1 className="pokemon-search">Pokémon Search</h1>
                <div className="name-input-container">
                    <input
                        className="name-search bold"
                        type="text"
                        value = {pokemonName}
                        onChange={(e) => {
                            setPokemonNameCallbackFn(e.target.value);
                        }}
                        onFocus={()=>setIsFocused(true)}
                        onBlur={()=>setTimeout(()=>setIsFocused(false), 100)}
                    >
                    </input>
                    {
                        isFocused ?
                        <div className="autocompletions" style={{display:((asList.length===0) ? "none" : "")}}>
                            {asList}
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </>
    );
}
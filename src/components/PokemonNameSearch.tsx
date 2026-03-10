import { useState, type Dispatch, type SetStateAction } from "react";
import { usePokemonAutocompletions } from "../hooks/useAutocompletions";
import "./PokemonNameSearch.css";


interface Props {
    pokemonName: string;
    setPokemonName: Dispatch<SetStateAction<string>>;
}

export default function PokemonNameSearch(props: Props) {
    const [isFocused, setIsFocused] = useState(false);

    const autoCompletions = usePokemonAutocompletions(props.pokemonName);

    //get the autocompletions for the current pokemonName

    return (
        <>
            <div className="bubble-container pokemon-search-container">
                <h1 className="pokemon-search">Pokémon Search</h1>
                <div className="name-input-container">
                    <input
                        className="name-search bold"
                        type="text"
                        value={props.pokemonName}
                        onChange={(e) => {
                            props.setPokemonName(e.target.value);
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
                    >
                    </input>
                    {
                        isFocused ?
                            <div className="autocompletions" style={{ display: ((autoCompletions.length === 0) ? "none" : "") }}>
                                {autoCompletions.map((autoCompletion) => (
                                    <button
                                        className="autocompletion poke-button"
                                        type="button"
                                        key={autoCompletion}
                                        onClick={() => props.setPokemonName(autoCompletion)}
                                    >
                                        {autoCompletion}
                                    </button>
                                ))}
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        </>
    );
}
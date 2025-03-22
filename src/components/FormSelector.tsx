import { PokeAPIPokemonSpriteURL } from "../interfaces/PokeAPIURLs";
import "./FormSelector.css";
import { PokemonForm } from "../interfaces/PokemonForm";

interface Props {
    forms: PokemonForm[];
    setSpriteCallbackFn: ((sprite: PokeAPIPokemonSpriteURL) => void)
}

export default function FormSelector({forms, setSpriteCallbackFn}: Props) {
    return (
        <div className="bubble-container pokemon-form-selectors">
            <h2 className="pokemon-form-selectors-header">forms</h2>
            <div className="pokemon-form-selectors-body">
                <div className="pokemon-form-selectors-button-scroller">
                    {
                        forms.map((form) => {
                            return (
                                <button
                                    key={form.name}
                                    type="button"
                                    className="pokemon-form-selector poke-button" 
                                    onClick={async () => {
                                        fetch(form.url).then(async (res) => {
                                            if(res.ok)
                                            {
                                                const json: {sprites: {front_default: PokeAPIPokemonSpriteURL} } = await res.json();
                                                if(json!==null) {
                                                    setSpriteCallbackFn(json.sprites.front_default);
                                                }
                                            }
                                        })
                                    }}
                                >
                                    {form.name}
                                </button>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
import type { Dispatch, SetStateAction } from "react";
import type { PokemonForm } from "../interfaces/PokemonForm";
import "./FormSelector.css";
import type { SpriteDisplayProps } from "./SpriteDisplay";

export interface Props {
    forms: PokemonForm[];
    setActiveSprite: Dispatch<SetStateAction<SpriteDisplayProps>>;
}

export default function FormSelector(props: Props) {
    return (
        <div className="bubble-container pokemon-form-selectors">
            <h2 className="pokemon-form-selectors-header">forms</h2>
            <div className="pokemon-form-selectors-body">
                <div className="pokemon-form-selectors-button-scroller">
                    {
                        props.forms.map((form, iForm) => {
                            return (
                                <button
                                    key={form.name}
                                    type="button"
                                    className="pokemon-form-selector poke-button"
                                    onClick={
                                        () => props.setActiveSprite((prev) => ({
                                            ...prev,
                                            sprite: iForm,
                                        }))
                                    }
                                >
                                    {form.name}
                                </button>
                            );
                        })
                    }
                </div>
            </div>
        </div >
    );
}
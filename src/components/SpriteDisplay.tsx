import { SyntheticEvent } from "react";
import { PokeAPIPokemonSpriteURL } from "../interfaces/PokeAPIURLs";
import './SpriteDisplay.css';

interface Props {
    imageURL: PokeAPIPokemonSpriteURL | null;
    onSpriteClick: ((event: SyntheticEvent) => void);
}

export function SpriteDisplay({imageURL, onSpriteClick}: Props) {
    return (
        imageURL===null ?
        <div className="sprite-display">
            <div className="noimg"></div>
        </div>
        :
        <div className="sprite-display">
            <img src={imageURL} onClick={onSpriteClick}/>
        </div>
    );
}
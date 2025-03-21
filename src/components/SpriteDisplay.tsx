import { PokeAPIPokemonSpriteURL } from "../interfaces/PokeAPIURLs";
import './SpriteDisplay.css';

interface Props {
    imageURL: PokeAPIPokemonSpriteURL | null;
}

export function SpriteDisplay({imageURL}: Props) {
    return (
        imageURL===null ?
        <div className="sprite-display">
            <div className="noimg"></div>
        </div>
        :
        <div className="sprite-display">
            <img src={imageURL}/>
        </div>
    );
}
import { PokeAPIPokemonSpriteURL } from "../interfaces/PokeAPIURLs";
import './SpriteDisplay.css';

interface Props {
    imageURL: PokeAPIPokemonSpriteURL;
}

export function SpriteDisplay({imageURL: imageURL}: Props) {
    return (
        <div className="sprite-display">
            <img src={imageURL}/>
        </div>
    );
}
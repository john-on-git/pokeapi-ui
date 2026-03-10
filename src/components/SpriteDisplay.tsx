import { useSpriteURL as useSprite } from "../hooks/useSpriteURL";
import type { Pokemon } from "../interfaces/Pokemon";
import './SpriteDisplay.css';

export type SpriteDisplayProps = {
    /**
     * Pokemon that this form is for.
     */
    pokemon: Pick<Pokemon, 'cries' | 'forms' | 'sprites'> | null;
    /**
     * If number, the index of a form to use the sprite for in this.pokemon.forms. If null, the sprite is this.pokemon.sprites.front_default.
     */
    sprite: number | null;
}

export function SpriteDisplay(props: SpriteDisplayProps) {
    const { data: spriteURL, status: spriteStatus } = useSprite(props.pokemon, props.sprite);
    return (
        spriteStatus === "success" ?
            (<div className="sprite-display">
                <img src={spriteURL} onClick={(event) => {
                    const mainCssClass = "sprite-bounce";
                    if (props.pokemon !== null && !event.currentTarget.classList.contains(mainCssClass)) {
                        const cssClasses = [mainCssClass, (((Math.round(Math.random() * 2) % 2) === 0) ? "sprite-twist-left" : "sprite-twist-right")];
                        // play the cry audio
                        const cry = new Audio(props.pokemon.cries.latest);
                        cry.volume = 0.1; // reduce the volume because the default is really loud on my machine 
                        cry.addEventListener("ended", (function (this: Element) { this.classList.remove(...cssClasses); }).bind(event.currentTarget)); //listener to remove the visual effect class when the cry is finsihed
                        cry.play();

                        //do visual effect
                        event.currentTarget.classList.add(...cssClasses);
                    }
                }} />
            </div>) : (
                <div className="sprite-display">
                    <p className="noimg"></p>
                </div>
            )
    );
}
import { useEffect, useState } from "react";
import type { PokemonMove, PokemonMoveProvider } from "../interfaces/PokemonMove";
import getColorForType from "../utils/pokemonUtils";
import Accordion from "./Accordion";
import './MoveList.css';

interface Props {
    moveProviders: PokemonMoveProvider[];
}

export default function MoveList({ moveProviders }: Props) {
    const [moves, setMoves] = useState<PokemonMove[]>([]);
    useEffect(() => {
        //get the list of moves for the pokemon
        async function FetchMoves() {
            //get all the move names & data sources
            //get the data for each move, and transform it into our format
            const moveData: PokemonMove[] = [];
            await Promise.all(moveProviders.map((moveProvider: PokemonMoveProvider) => fetch(moveProvider.move.url))).then(
                async (responses) => {
                    for (const response of responses) {
                        if (response.ok) {
                            //parse move data from API
                            const data = await response.json();

                            //transform into our model
                            moveData.push({
                                name: data.name,
                                type: data.type.name,
                                damageClass: data.damage_class.name,
                                power: data.power,
                                pp: data.pp,
                                effect: (data.effect_entries.length > 0 ? data.effect_entries[0].effect.replace("Inflicts regular damage.", "").trim() : "")
                            });
                        }
                        else {
                            return null;
                        }
                    }
                    return moveData;
                }
            );
            setMoves(moveData); //remove any moves we failed to get
        }
        FetchMoves();
    }, [moveProviders]);

    return (
        <div className="bubble-container move-list">
            <h2>moves</h2>
            <div className="move-list-panel">
                {moves.map((move, index) => {
                    return <Accordion
                        key={index}
                        title={move.name}
                        overrideColors={getColorForType(move.type)}
                        content={ //convert the object into an HTML table
                            <>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="bold">Type</td>
                                            <td>{move.type}</td>
                                        </tr>
                                        <tr>
                                            <td className="bold">Category</td>
                                            <td>{move.damageClass}</td>
                                        </tr>
                                        {
                                            move.power === null ?
                                                null
                                                :
                                                <tr>
                                                    <td className="bold">Power</td>
                                                    <td>{move.power}</td>
                                                </tr>
                                        }
                                        <tr>
                                            <td className="bold">PP</td>
                                            <td>{move.pp}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                {
                                    move.effect.length > 0 ?
                                        <p>{move.effect}</p>
                                        :
                                        null
                                }
                            </>
                        }
                    />
                })}
            </div>
        </div>
    );
}
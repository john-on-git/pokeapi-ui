import Accordion from "./Accordion";
import { PokemonMove, PokemonMoveProvider } from "../interfaces/PokemonMove";
import './MoveList.css'
import colorFor from "../interfaces/PokemonType";
import { useState, useEffect } from "react";

interface Props {
    moveProviders: PokemonMoveProvider[];
}

export default function MoveList({moveProviders}:Props) {
    const [moves, setMoves] = useState<PokemonMove[]>([]);
    useEffect(() => {
        //get the list of moves for the pokemon
        async function FetchMoves() {
            //get all the move names & data sources
            //get the data for each move, and transform it into our format
            const moveData = await Promise.all(moveProviders.map((moveProvider: PokemonMoveProvider) => fetch(moveProvider.move.url))).then(
                async (responses) => {
                    let moveData: PokemonMove[] = []
                    for(const response of responses)
                    {   
                        if(response.ok)
                        {
                            //parse move data from API
                            const data = await response.json();
                            
                            //transform into our model
                            moveData.push({
                                name: data.name,
                                type: data.type.name,
                                damageClass: data.damage_class.name,
                                power: data.power,
                                pp: data.pp
                            });
                        }
                        else {
                            return null;
                        }
                    }
                    return moveData;
                }
            );
            if(moveData!==null) {
                setMoves(moveData); //remove any moves we failed to get
            }
        }
        FetchMoves();
    }, [moveProviders]);

    return (
        <>
            <div className="move-list">
                <h2>Moves</h2>
                    {moves.map((move, index) => {
                        return <Accordion
                            key={index}
                            title={move.name}
                            overrideColors = {colorFor(move.type)}
                            content={ //convert the object into an HTML table
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
                                        <tr>
                                            <td className="bold">Power</td>
                                            <td>{move.power}</td>
                                        </tr>
                                        <tr>
                                            <td className="bold">PP</td>
                                            <td>{move.pp}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            }
                        />
                    }
                    )}
            </div>
        </>
    );
}
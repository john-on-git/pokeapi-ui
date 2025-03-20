import { useContext } from "react";
import Accordion from "./Accordion";
import { MovesContext } from "./Contexts";
import { PokemonMove } from "../interfaces/PokemonMove";
import './MoveList.css'
import colorFor from "../interfaces/PokemonType";


export default function MoveList() {
    const moves: PokemonMove[] = useContext(MovesContext);
    return (
        <>
            <div className="move-list">
                {moves.map((move, index) => {
                    console.log("callbackfn", move);
                    return <Accordion
                        key={index}
                        title={move.name}
                        colorOverride = {colorFor(move.type)}
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
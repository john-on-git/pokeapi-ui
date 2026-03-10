import { useMoves } from "../hooks/useMoves";
import type { Pokemon } from "../interfaces/Pokemon";
import getColorForType from "../utils/pokemonUtils";
import Accordion from "./Accordion";
import './MoveList.css';

interface Props {
    pokemon: Pick<Pokemon, 'moves'> | null;
}

export default function MoveList(props: Props) {
    const { data: moves, status: movesStatus } = useMoves(props.pokemon?.moves ?? []);

    return (
        <div className="bubble-container move-list">
            <h2>moves</h2>
            <div className="move-list-panel">
                {movesStatus !== "success" ? <></> : moves.map((move, index) => {
                    return <Accordion
                        key={index}
                        title={move.name}
                        overrideColors={getColorForType(move.type)}
                        content={
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
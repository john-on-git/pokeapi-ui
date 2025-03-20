import { useEffect, useState } from 'react';
import { MovesContext } from '../components/Contexts';
import MoveList from '../components/MoveList';
import { PokemonMove } from '../interfaces/PokemonMove';
import PokemonNameDisplay from './PokemonNameDisplay';

export default function PokemonViewer() {
    
    /*
        <SpriteDisplay/>
        <CryPlayer/>
        <MoveList/>
        <StatList/>
    </>
    */

    const [pokemonName, setPokemonName] = useState<string>("spiritomb");
    const [moves, setMoves] = useState<PokemonMove[]>([]);
    
    useEffect(() => {
        //get the list of moves for the pokemon
        async function FetchMoves() {
            //get all the move names & data sources
            const moveURLs: string[] = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
                async (res)=>{
                    if(res.ok)
                    {
                        const pokemon = await res.json();
                        console.log(pokemon);
                        return pokemon.moves.map((move: {move: {name:string, url:string}, version_group_details:any[]}) => move.move.url);
                    }
                    else  {
                        return [];
                    }
                },
                (_) => {
                    return [];
                }
                );
            //get the data for each move, and transform it into our format
            const moveData = await Promise.all(moveURLs.map(moveURL => fetch(moveURL))).then(
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
                },
                (_) => {
                    return null;
                }
            );
            if(moveData!==null) {
                setMoves(moveData); //remove any moves we failed to get
            }
        }
        FetchMoves();
    }, [pokemonName]);

    return (
        <div className="pokemon-viewer">
            <PokemonNameDisplay name={pokemonName}/>
            <MovesContext value={moves}>
                <MoveList/>
            </MovesContext>
        </div>
    );
}
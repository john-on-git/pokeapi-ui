import "./BaseStatsDisplay.css"

interface Props {
    stats: null | {
        base_stat:number, 
        effort:number, 
        stat: {
            name: string,
            url:string
        }
    }[];
}
export default function BaseStatsDisplay({stats}:Props) {
    return (
        <div className="bubble-container stats-display">
            <h2>stats</h2>
            <table>
                <tbody>
                    {
                        stats && stats.map((stat) => {
                            return (
                                <tr className="stats-row">
                                    <td className="bold">{stat.stat.name.replace("-", " ")}</td>
                                    <td>{stat.base_stat}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
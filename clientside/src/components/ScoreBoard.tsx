import { Player } from "./types"

const getScoreBoard=(players:Player[])=>{
    const scoreboard=players.filter(player=>player.wpm!==-1)
    return scoreboard.sort((a,b)=>a.wpm>b.wpm ?-1:b.wpm>a.wpm?1:0)
}

const ScoreBoard=({players}:{players:Player[]})=>{
    const scores=getScoreBoard(players)

    if(scores.length>0){
        return (
            <div className="w-[96%] mx-auto flex flex-col mt-5">
                <div className="flex justify-between text-lg bg-gray-200 py-1">
                    <div>
                        <p className="pl-2">Number</p>
                    </div>
                    <div>
                        <p>Name</p>
                    </div>
                    <div>
                        <p className="pr-2">WPM</p>
                    </div>
                </div>
                {scores.map((score,index)=>{
                    return (
                        <div key={index} className={`${index%2==1?'bg-gray-200 flex justify-between py-1':'bg-gray-100 flex justify-between py-1'}`}>
                            <div>
                                <p className="pl-2">{index+1}</p>
                            </div>
                            <div>
                                <p>{score.name}</p>
                                </div>
                            <div>
                                <p className="pr-2">{score.wpm}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    return null

}

export default ScoreBoard
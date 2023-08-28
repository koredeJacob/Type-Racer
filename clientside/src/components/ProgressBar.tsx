import { Player } from './types'

interface Proptype{
    player:Player
    players:Player[]
    wordsLength:number
}

const calculatePercentage=(player:Player,wordslength:number):string=>{
    if (player.currentWordIndex!==0){
        return ((player.currentWordIndex/wordslength)*100).toFixed(2)+'%'
    }
    return '0%'
}

const ProgressBar=({player,players,wordsLength}:Proptype)=>{
    const percentage:string=calculatePercentage(player,wordsLength)
    
    return(
        <div className='flex flex-col gap-2 w-[96%] mx-auto'>
            <div className='w-full flex flex-col gap-1'>
                <h5>{player.name}</h5>
                <div className='w-full h-[20px] bg-gray-100 rounded-lg'>
                    <div style={{width:`${percentage}`}} className={`h-[100%] bg-green-500 rounded-lg`}>
                        
                    </div>
                </div>
            </div>
            {players.map((playerObj:Player,index:number)=>{
                const percentage=calculatePercentage(playerObj,wordsLength)
                if (playerObj.id!==player.id){
                    return (<div key={index} className='w-full flex flex-col gap-1'>
                                <h5>{playerObj.name}</h5>
                                <div className='w-full h-[20px] bg-gray-100 rounded-lg'>
                                    <div style={{width:`${percentage}`}} className={`h-[100%] bg-green-500 rounded-lg`}>

                                    </div>
                                </div>
                            </div>)
                }
            })}
        </div>
    )

}

export default ProgressBar
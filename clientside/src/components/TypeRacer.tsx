import { redirect } from 'react-router-dom'

import CountDown from './CountDown'
import StartButton from './StartButton'
import DisplayWords from './DisplayWords'
import ProgressBar from './ProgressBar'
import ScoreBoard from './ScoreBoard'
import Form from './Form'
import socket from '../socket'
import { Player ,GameState} from './types'

const findPlayer=(players:Player[])=>{
    return players.find((player:Player)=>player.SocketID===socket.id)
}

const TypeRacer=({gameState}:{gameState:GameState})=>{
    const {id,players,Words,isOpen,isOver}=gameState
    const player=findPlayer(players)

    if(id===-1){
        redirect('/')
    }

    return(
        <>  {player && 
            <div className='max-w-[640px] mx-auto mt-6'>
                <ProgressBar players={players} player={player} wordsLength={Words.length}/>
                <DisplayWords words={Words} player={player}/>
                <Form isOpen={isOpen} isOver={isOver} gameId={id}/>
                <CountDown/>
                <StartButton player={player} gameID={id}/>
                <ScoreBoard players={players}/>
            </div>}
        </>
    )
}

export default TypeRacer
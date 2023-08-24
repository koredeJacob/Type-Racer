import React from 'react'
import { redirect } from 'react-router-dom'

import CountDown from './CountDown'
import StartButton from './StartButton'
import DisplayWords from './DisplayWords'
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
            <>
                <DisplayWords words={Words} player={player}/>
                <Form isOpen={isOpen} isOver={isOver} gameId={id}/>
                <CountDown/>
                <StartButton player={player} gameID={id}/>
            </>}
        </>
    )
}

export default TypeRacer
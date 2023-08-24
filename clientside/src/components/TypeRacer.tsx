import React from 'react'
import { redirect } from 'react-router-dom'

import CountDown from './CountDown'
import StartButton from './StartButton'
import socket from '../socket'
import { Player ,GameState} from './types'

const findPlayer=(players:Player[])=>{
    return players.find((player:Player)=>player.SocketID===socket.id)
}

const TypeRacer=({gameState}:{gameState:GameState})=>{
    const {id,players}=gameState
    const player=findPlayer(players)

    if(id===-1){
        redirect('/')
    }

    return(
        <>
            <CountDown/>
            <StartButton player={player} gameID={id}/>
        </>
    )
}

export default TypeRacer
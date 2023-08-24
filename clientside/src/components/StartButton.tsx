import React, { useState } from 'react'
import socket from '../socket'

import { Player } from './types'

const StartButton=({player,gameID}:{player:Player,gameID:number})=>{
    const [showButton,setShowButton]=useState(true)
    const {isReferee}=player

    const handleClick=()=>{
        socket.emit('timer',{playerID:player.id,gameID})
        setShowButton(false)
    }

    return(
        (isReferee && showButton) && <button onClick={handleClick}>Start Game</button>
    )
}

export default StartButton
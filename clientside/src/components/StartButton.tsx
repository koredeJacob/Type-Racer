import { useState } from 'react'
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
        (isReferee && showButton) && 
            <div className='w-[96%] mx-auto'>
                <button onClick={handleClick} className='bg-green-500 hover:bg-green-600 pt-1 pb-1.5 px-2 lg:px-2.5 
                        mt-3 shadow shadow-gray-400 text-white rounded-lg md:w-full'>Start Game</button>
                <p className='mt-1 font-medium'>Your Gameid is {gameID}. Send it to your friends to race them.</p>
            </div>
    )
}

export default StartButton
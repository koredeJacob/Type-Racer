import React,{useState,FormEvent} from 'react'
import socket from '../socket'

const JoinGame=()=>{
    const [nickName,setnickName]=useState('')
    const [gameId,setGameId]=useState('')

    const handleSubmit=(e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()
        socket.emit('join_game',{nickName,gameId})
    }

    return (
        <div>
            <div>
                <h1>
                    Join Game
                </h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="GameId">Enter Game ID</label>
                    <input type='text' name='gameId' placeholder='Enter Game ID' value={gameId}
                    onChange={(e):void=>setGameId(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="nickname">Nick Name</label>
                    <input type='text' name='nickname' placeholder='Enter your nick name' value={nickName}
                    onChange={(e):void=>setnickName(e.target.value)}/>
                </div>
                <input type='submit' value='Submit'/>
            </form>
        </div>
    )

}

export default JoinGame
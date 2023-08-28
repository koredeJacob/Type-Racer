import {useState,FormEvent} from 'react'
import socket from '../socket'

const JoinGame=()=>{
    const [nickName,setnickName]=useState('')
    const [gameId,setGameId]=useState('')

    const handleSubmit=(e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()
        socket.emit('join_game',{nickName,gameId})
    }

    return (
        <div className="mt-24 space-y-4">
            <div>
                <h1 className="text-2xl text-gray-900 text-center md:text-[34px] lg:text-4xl">
                    Join Game
                </h1>
            </div>
            <div className="flex pl-4 md:justify-center">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="GameId" className="text-lg text-gray-900">Enter Game ID</label>
                        <input type='text' name='gameId' className="border-2 border-gray-400 rounded pl-2 py-1.5 outline-0" 
                        placeholder='Get  GameId From Your Friend' value={gameId}
                        onChange={(e):void=>setGameId(e.target.value)}/>
                    </div>
                    <div className="flex flex-col mt-2">
                        <label htmlFor="nickname" className="text-lg text-gray-900">Nickname</label>
                        <input type='text' name='nickname' className="border-2 border-gray-400 rounded pl-2 py-1.5 outline-0"
                         placeholder='Enter your nickname' value={nickName}
                        onChange={(e):void=>setnickName(e.target.value)}/>
                    </div>
                    <div>
                        <input type='submit' value='Join Game' className="bg-green-500 hover:bg-green-600 pt-1 pb-1.5 px-2 lg:px-2.5 
                            mt-3 shadow shadow-gray-400 text-white rounded-lg md:w-full"/>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default JoinGame
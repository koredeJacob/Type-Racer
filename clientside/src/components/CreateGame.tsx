import {useState,FormEvent} from "react"
import socket from "../socket"

const CreateGame=()=>{
    const [nickName,setnickName]=useState('')

    const handleSubmit=(e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()
        socket.emit('create_game',nickName)
    }

    return (
        <div className="mt-24 space-y-4">
            <div>
                <h1 className="text-2xl text-gray-900 text-center md:text-[34px] lg:text-4xl">
                    Create Game
                </h1>
            </div>
            <div className="flex pl-4 md:justify-center">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="nickname" className="text-lg text-gray-900">Nickname</label>
                        <input className="border-2 border-gray-400 rounded pl-2 py-1.5 outline-0" type='text' name='nickname' placeholder='Enter your nickname' value={nickName}
                        onChange={(e):void=>setnickName(e.target.value)}/>
                    </div>
                    <div>
                        <input type='submit' value='Create'className="bg-green-500 hover:bg-green-600 pt-1 pb-1.5 px-2 lg:px-2.5 
                        mt-3 shadow shadow-gray-400 text-white rounded-lg md:w-full"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateGame
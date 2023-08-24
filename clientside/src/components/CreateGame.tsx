import React,{useState,FormEvent} from "react"
import socket from "../socket"

const CreateGame=()=>{
    const [nickName,setnickName]=useState('')

    const handleSubmit=(e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()
        socket.emit('create_game',nickName)
    }

    return (
        <div>
            <div>
                <h1>
                    Create Game
                </h1>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nickname">Nick Name</label>
                <input type='text' name='nickname' placeholder='Enter your nick name' value={nickName}
                onChange={(e):void=>setnickName(e.target.value)}/>
                <input type='submit' value='Submit'/>
            </form>
        </div>
    )
}

export default CreateGame
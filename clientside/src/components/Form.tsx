import {useState,useRef,useEffect,ChangeEvent}from 'react'
import socket from '../socket'

const Form=({isOpen,isOver,gameId}:{isOpen:boolean,isOver:boolean,gameId:number})=>{
    const [userinput,setuserInput]=useState('')
    const textInput=useRef<HTMLInputElement>(null)

    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const val:string=e.target.value
        const lastchar:string=val.charAt(val.length-1)
        
        if (lastchar===' '){
            socket.emit('userInput',{userinput,gameId})
            setuserInput('')
        }
        else{
            setuserInput(e.target.value)
        }
    }

    useEffect(()=>{
        if(!isOpen)
            textInput.current?.focus()
    },[isOpen])

    return (
        <div className='w-[96%] mx-auto mt-5'>
            <form>
                <input className="w-full mx-auto border-2 border-gray-400 rounded pl-2 py-1.5 outline-0" type='text' readOnly={isOpen || isOver} 
                onChange={handleChange} value={userinput} ref={textInput}/>
            </form>
        </div>
    )

}

export default Form
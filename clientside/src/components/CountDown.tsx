import { useEffect, useState } from 'react'
import socket from '../socket'

const CountDown=()=>{
    const [timer,setTimer]=useState({countDown:'',msg:''})

    useEffect(()=>{
        socket.on('timer',(data)=>{
            setTimer(data)
        })
        socket.on('done',()=>{
            socket.removeListener('timer')
        })
    },[])
    const {countDown,msg}=timer
    return(
        <div className='text-center mt-5'>
            <h1 className='text-3xl font-medium'>{countDown}</h1>
            <h3 className='text-xl'>{msg}</h3>
        </div>
    )
}

export default CountDown
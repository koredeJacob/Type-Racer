import React, { useEffect, useState } from 'react'
import socket from '../socket'

const CountDown=()=>{
    const [timer,setTimer]=useState({countDown:'',msg:''})

    useEffect(()=>{
        socket.on('timer',(data)=>{
            setTimer(data)
        })
    },[])
    const {countDown,msg}=timer
    return(
        <>
            <h1>{countDown}</h1>
            <h3>{msg}</h3>
        </>
    )
}

export default CountDown
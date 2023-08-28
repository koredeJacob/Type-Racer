import React,{ useEffect } from "react"
import {Link} from 'react-router-dom'

import socket from "../socket"

const Home=()=>{

    useEffect(()=>{
        socket.on('connect',():void=>{
            console.log(`connected as... ${socket.id}`)
        })
    },[])
    return (
        <div className="mt-24 space-y-5">
            <div className="w-[90%] mx-auto">
                <h1 className="text-3xl text-gray-900 text-center md:text-[34px] lg:text-4xl font-medium">Welcome To Typing Racer</h1>
            </div>
            <div className="flex gap-2 justify-center md:gap-3">
                <div>
                    <div>
                        <Link to='/game/create'>
                            <button className="bg-green-500 hover:bg-green-600 pt-1 pb-1.5 px-2  shadow shadow-gray-400 text-white rounded-lg">
                                Create Game
                            </button>
                        </Link>
                    </div>
                </div>
                <div>
                    <div>
                        <Link to='/game/join'>
                            <button className="bg-green-500 hover:bg-green-600 pt-1 pb-1.5 px-2 lg:px-2.5 shadow shadow-gray-400 text-white rounded-lg">
                                Join Game
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-gray-900 text-center text-4">have fun racing your friends.</p>
            </div>
            <div className="w-fit mx-auto">
                <Link to='/leaderboard'>
                    <button className="bg-black pt-1 pb-1.5 px-2 lg:px-2.5 shadow shadow-gray-400 text-white rounded-lg">
                        Leaderboard
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Home
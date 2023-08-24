import React, { useEffect } from "react"
import {Link} from 'react-router-dom'

import socket from "../socket"

const Home=()=>{

    useEffect(()=>{
        socket.on('connect',():void=>{
            console.log(`connected as... ${socket.id}`)
        })
    },[])
    return (
        <div>
            <div>
                <div>
                    <Link to='/game/create'>
                        <button>
                            Create Game
                        </button>
                    </Link>
                </div>
            </div>
            <div>
                <div>
                    <Link to='/game/join'>
                        <button>
                            Join Game
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
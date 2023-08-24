import React, { useEffect, useState } from "react"
import {Routes,Route,useNavigate} from "react-router-dom"

import Home from "./pages/Homepage"
import CreateGame from "./components/CreateGame"
import JoinGame from "./components/JoinGame"
import TypeRacer from "./components/TypeRacer"
import { GameState } from "./components/types"
import socket from "./socket"

function App() {
  const [gameState,setgameState]=useState<GameState>({id:-1,Words:[],isOpen:false,players:[],isOver:false,StartTime:null})
  const navigate=useNavigate()
  
  useEffect(()=>{
    socket.on('updateGame',(game:GameState)=>{
      console.log(game)
      setgameState(game)
    })
    return ()=>{
      socket.removeAllListeners()
    }
  },[])

  useEffect(()=>{
    if(gameState.id!==-1){
      navigate(`/game/${gameState.id}`)
    }
  },[gameState.id])

  return(
      <div>
				<Routes>
					<Route path='/' element={<Home />} />
          <Route path="/game/create" element={<CreateGame/>}/>
          <Route path="game/join" element={<JoinGame/>}/>
          <Route path="game/:gameID" element={<TypeRacer gameState={gameState}/>}/>
				</Routes>
      </div>
  )

}

export default App

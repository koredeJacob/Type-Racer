import express,{Express,Request,Response} from "express"
import { Server } from "socket.io"
import path from "path"

import prisma from "./db/prisma"
import { getQuotes } from './requests/quotesrequests'

const app:Express=express()

const PORT=process.env.PORT || 3000

const server=app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})


const io = new Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } })

app.use((req:Request, res:Response, next) => {
	res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
	next()
})

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/leaderboard',async (req:Request,res:Response)=>{
    
    const players=await prisma.player.findMany({
        select:{
            name:true,
            wpm:true
        },
        orderBy:{
            wpm:'desc'
        }
    })
    if(!players){
        return res.status(404).json({error:'user not found'})
    }
    return res.status(200).json(players)
})

app.get('/*', (req:Request, res:Response) => {
	return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

io.on('connection',(socket:any)=>{
    console.log('user connected...',socket.id)
    socket.on('userInput',async({userinput,gameId}:{userinput:string,gameId:number})=>{
        try {
            const game=await prisma.game.findUnique({
                where:{
                    id:gameId
                },
                include:{
                    players:true
                }
            })

            if(game && !game.isOpen && !game.isOver){
                const player=game.players.find(player=>player.SocketID===socket.id)
            
                if (player){
                    const word=game.Words[player.currentWordIndex]
                    if (word===userinput){
                        const updatedplayer= await prisma.player.update({
                            where:{
                                id:player.id
                            },
                            data:{
                                currentWordIndex:{
                                    increment:1
                                }
                            }
                        })
                        
                        if (updatedplayer && updatedplayer.currentWordIndex===game.Words.length){
                            const endTime=new Date().getTime()
                            const {StartTime}=game
                            if (StartTime){
                                const wpm:number=calculatewpm(StartTime.getTime(),endTime,updatedplayer.currentWordIndex)
                            
                                const updateplayer=await prisma.player.update({
                                    where:{
                                        id:player.id
                                    },
                                    data:{
                                        wpm:wpm
                                    }
                                })
                            }
                            socket.emit('done')
                        }
                        const gamelatest=await prisma.game.findUnique({
                            where:{
                                id:gameId
                            },
                            include:{
                                players:true
                            }
                        })
                        io.to(gameId.toString()).emit('updateGame',gamelatest)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    })

    socket.on('create_game',async (nickname:string):Promise<void>=>{
        try{
            const quote:string[]|string=await getQuotes('https://api.quotable.io/quotes/random?maxLength=300&minLength=200')
            const player ={
                    SocketID:socket.id,
                    isReferee:true,
                    name:nickname
            }

            if (typeof quote!=='string'){
                const game=await prisma.game.create({
                    data:{
                        Words:quote,
                        players:{
                            create:
                                [player]
                        }
                    },
                    include:{
                        players:true
                    }
                })
                const gameID=game.id.toString()
                socket.join(gameID)
                io.to(gameID).emit('updateGame',game)
        }
        }catch(error){
        console.log(error)
    }
    })

    socket.on('join_game',async({nickName,gameId}:{nickName:string,gameId:string}):Promise<void>=>{
        try {
            const game=await prisma.game.findUnique({
                where:{
                    id:parseInt(gameId)
                },
                include:{
                    players:true
                }
            })

            if(game?.isOpen){
                const player={
                    SocketID:socket.id,
                    name:nickName
                }
                const updateGame = await prisma.game.update({
                    where:{
                        id:parseInt(gameId)
                    },
                    data:{
                        players:{
                            create:[player]
                        }
                    },
                    include:{
                        players:true
                    }
                })
                const gameID=updateGame.id.toString()
                socket.join(gameID)
                io.to(gameID).emit('updateGame',updateGame)
            }
        } catch (error) {
            console.log(error)
        }
    })

    socket.on('timer',async({playerID,gameID}:{playerID:number,gameID:number})=>{
        let countDown=10

        const player=await prisma.player.findUnique({
            where:{
                id:playerID
            }
        })

        if(player?.isReferee){
            const timerID=setInterval(async()=>{
                if (countDown>=0){
                    io.to(gameID.toString()).emit('timer',{countDown,msg:'starting game'})
                    countDown--
                }
                else{
                    clearInterval(timerID)   
                    const updateGame=await prisma.game.update({
                        where:{
                            id:gameID
                        },    
                        data:{
                            isOpen:false
                        },
                        include:{
                            players:true
                        }
                    })
                    io.to(gameID.toString()).emit('updateGame',updateGame) 
                    startGameClock(gameID)

                }
            },1000)
        }
    })

})

const calculatewpm=(start:number,end:number,currentWordIndex:number):number=>{
    const diff=(end-start)/1000
    const minutes=diff/60
    return Math.floor(currentWordIndex/minutes)
}

const startGameClock= async(gameId:number)=>{
   
    const game=await prisma.game.update({
        where:{
            id:gameId
        },
        data:{
            StartTime:new Date()
        },
        include:{
            players:true
        }
    })
    let time=150
    
    const timerID=setInterval(async()=>{
        if(time>=0){
            const formatTime=calculateTime(time)
            io.to(gameId.toString()).emit('timer',{countDown:formatTime,msg:'time remaining'})
            time--
        }
        else{
            clearInterval(timerID) 
            const endTime=new Date().getTime()
            const starttime=game.StartTime
            const findPlayers=await prisma.player.findMany({
                where:{
                    GameId:gameId
                }
            })
            const newplayers=findPlayers.map(({id,GameId,...player},index)=>{
                if(player.wpm===-1 && starttime){
                    player.wpm=calculatewpm(starttime.getTime(),endTime,player.currentWordIndex)
                }
        
                return player
            })
            const deleteplayers=await prisma.player.deleteMany({
                where:{
                    GameId:gameId
                }
            })
        
            const updateGame=await prisma.game.update({
                where:{
                    id:gameId
                },
                data:{
                    isOver:true,
                    players:{
                        create:newplayers
                    }
                },
                include:{
                    players:true
                }
            })
           
            io.to(gameId.toString()).emit('updateGame',updateGame)
                
        }},1000)
}

 const calculateTime=(time:number):string=>{
    const minutes:number=Math.floor(time/60)
    const seconds:number=time%60
    return `${minutes}:${seconds<10 ? '0'+seconds:seconds}`
}


module.exports=app
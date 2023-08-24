import express,{ Express} from "express"
import { Server } from "socket.io"

import prisma from "./db/prisma"
import { getQuotes } from './requests/quotesrequests'

const app:Express=express()

const server=app.listen(3000,()=>{
    console.log("listening on port 3000")
})


const io = new Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } })

io.on('connection',(socket:any)=>{
    console.log('user connected...',socket.id)

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
        const game=await prisma.game.findUnique({
            where:{
                id:gameID
            }
        })

        const player=await prisma.player.findUnique({
            where:{
                id:playerID
            }
        })

        if(player?.id){
            const timerID=setInterval(async()=>{
                if (countDown>=0){
                    io.to(gameID.toString()).emit('timer',{countDown,msg:'starting game'})
                    countDown-=1
                }
                else{
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
                    clearInterval(timerID)
                    io.to(gameID.toString()).emit('updateGame',updateGame)
                    startGameClock(gameID)
                }
            },1000)
        }
    })

})

const startGameClock= async(gameId:number)=>{
    const start=new Date()
    const game=await prisma.game.update({
        where:{
            id:gameId
        },
        data:{
            StartTime:start
        },
        include:{
            players:true
        }
    })
    let time=12
    
    const timerID=setInterval(async()=>{
        if(time>=0){
            const formatTime=calculateTime(time)
            io.to(gameId.toString()).emit('timer',{countDOwn:formatTime,msg:'time remaining'})
            time-=1
        }
        else{
            const endTime=new Date().getTime()
            const starttime=game.StartTime
            const findPlayers=await prisma.player.findMany({
                where:{
                    GameId:gameId
                }
            })
            const newplayers=findPlayers.map((player,index)=>{
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
            clearInterval(timerID)
        }
    })
    
    const calculateTime=(time:number):string=>{
        const minutes:number=Math.floor(time/60)
        const seconds:number=time%60
        return `${minutes}:${seconds<10 ? '0'+seconds:seconds}`
    }

    const calculatewpm=(start:number,end:number,currentWordIndex:number):number=>{
        const diff=(end-start)/1000
        const minutes=diff/60
        return Math.floor(minutes/currentWordIndex)
    }
}


module.exports=app
import {useState,useEffect} from 'react'
import { Player } from './types'

const LeaderBoard=()=>{
    const [table,setTable]=useState<Player[]>([])

    useEffect(()=>{
        const Scores=async()=>{
            try{
                const response=await fetch('http://localhost:3000/leaderboard')
                const scores=await response.json()
                setTable(scores)
            }
            catch(error){
                console.log(error)
            }
        }
        Scores()

    },[])

    if(table && table.length>0){
        return(
            <div className="w-[96%] max-w-[620px] mx-auto flex flex-col mt-6">
                <div className="flex justify-between text-lg bg-gray-200 py-1">
                    <div>
                        <p className='pl-2'>Number</p>
                    </div>
                    <div>
                        <p>Name</p>
                    </div>
                    <div>
                        <p className='pr-2'>WPM</p>
                    </div>
                </div>
                {table.map((row,index)=>{
                    return(<div key={index} className={`${index%2==1?'bg-gray-200 flex justify-between py-1':'bg-gray-100 flex justify-between py-1'}`}>
                            <div>
                                <p className='pl-2'>{index+1}</p>
                            </div>
                            <div>
                                <p>{row.name}</p>
                                </div>
                            <div className='pr-2'>
                                <p>{row.wpm}</p>
                            </div>
                        </div>)
                })}
            </div>
        )
    }
    return <div className='w-fit mt-[180px] mx-auto'>Loading...</div>
}

export default LeaderBoard
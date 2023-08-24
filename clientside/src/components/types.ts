interface GameState{
    id:number
    Words:string[]
    isOpen:boolean
    players:Player[]
    isOver:boolean
    StartTime:Date|null
}

interface Player{
    id:number
    currentWordIndex:number
    isReferee:boolean
    SocketID:string
    wpm:number
    name:string
    GameId:number
}

export type {GameState,Player}
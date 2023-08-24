import React from 'react'
import { Player } from './types'

const getTypedWords=(words:string[],player:Player)=>{
    const typedwords:string[]=words.slice(0,player.currentWordIndex)
    const typedwordsstr:string=typedwords.join(' ')
    return <span>{typedwordsstr} </span>
}

const getCurrentWord=(words:string[],player:Player)=>{
    return <span style={{textDecoration:'underline'}}>{words[player.currentWordIndex]} </span>
}

const getWordsToBeTyped=(words:string[],player:Player)=>{
    const tobetyped:string[]=words.slice(player.currentWordIndex+1,words.length)
    const tobetypedstr:string=tobetyped.join(' ')
    return <span>{tobetypedstr}</span>
}

const DisplayWords=({words,player}:{words:string[],player:Player})=>{
    return(
        <div>
            {getTypedWords(words,player)}
            {getCurrentWord(words,player)}
            {getWordsToBeTyped(words,player)}
        </div>)
}

export default DisplayWords
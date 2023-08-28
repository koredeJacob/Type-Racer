import { Player } from './types'

const getTypedWords=(words:string[],player:Player)=>{
    const typedwords:string[]=words.slice(0,player.currentWordIndex)
    const typedwordsstr:string=typedwords.join(' ')
    return <span className='text-green-600'>{typedwordsstr} </span>
}

const getCurrentWord=(words:string[],player:Player)=>{
    return <span className='underline underline-offset-4'>{words[player.currentWordIndex]} </span>
}

const getWordsToBeTyped=(words:string[],player:Player)=>{
    const tobetyped:string[]=words.slice(player.currentWordIndex+1,words.length)
    const tobetypedstr:string=tobetyped.join(' ')
    return <span>{tobetypedstr}</span>
}

const DisplayWords=({words,player}:{words:string[],player:Player})=>{
    return(
        <div className='w-[96%] mt-7 mx-auto rounded-md p-4 text-gray-900 text-lg font-normal bg-gray-50'>
            {getTypedWords(words,player)}
            {getCurrentWord(words,player)}
            {getWordsToBeTyped(words,player)}
        </div>)
}

export default DisplayWords
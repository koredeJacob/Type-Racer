import axios from 'axios'

interface Error{
    ok:boolean
}

const getQuotes=async (url:string):Promise<string[]|string>=>{
    try{
        const response:string[]=await axios.get(url).then((response):string[]=>response.data[0].content.split(" "))
        return response
    }
    catch(error){
        return 'error occured' 
    }
}

export {getQuotes}
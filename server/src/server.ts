const server=require('http').createServer()
const io=require('socket.io')(server)

const PORT=3000

server.listen(PORT)
console.log(`listening on port ${PORT}...`)

io.on('connection',()=>{
    console.log('user connected')
})
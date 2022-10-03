const app = require('express')()
const server = require('http').createServer(app)
const PORT=process.env.PORT || 7000;
const io = require('socket.io')(server,{
    cors:{
        origin:'*',
    }
})

io.on('connection', socket =>{
    console.log('connection made successfully')
    socket.on('message',({username,message,time}) => {
        console.log('Message received on server: ')
        io.emit('message',({username,message,time}))
    })
})

server.listen(PORT,()=>{
    console.log('I am listening at port)');
})
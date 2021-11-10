const http = require('http');
const io = require('socket.io')(50001);
const Message = require('../models/message_model.js');
const chat_utils = require('../utils/chat_utils')

io.on('connection', (socket) => {
  console.log("one user connected");

  socket.on('join', data => {
    console.log(data)
    socket.join(data.room)
    io.in(data.room).clients((err, clients) => {
      console.log('data on room',clients); // an array containing socket ids in 'room3'
    });
  })
  io.of('/').adapter.clients((err, clients) => {
    console.log(clients); // an array containing all connected socket ids
  });
  socket.on('load_messages',(data)=>{
    console.log('load request')
    Message.find({ room: data.room })
      .populate('sender', { "userName": 1, "image": 1, "_id": 1 })
      .then(messages => {
         console.log(messages);
        socket.to(data.room).emit('messages', { messages: messages })
      })
      .catch(error => socket.to(data.room).emit('messages',{ messages: [], error: error.message }))
  })
  socket.on('new_message', async (data) => {
    //socket.to('test').emit('new_message',{
    socket.in(data.room).emit('message', {
      content: data.message,
      from: data.sender,
      room:data.room
    })
    console.log(data)
    const message = Message({
      ...data,body:data.message
    })
    message.save()
      .then(message => {
        console.log('saved message success', message)
        socket.emit('sent_confirm', { sent: true, status: "message sent successfully" })
      })
      .catch(error => {
        console.log(error)
      })
  })
  socket.on("disconnect", () => {
    console.log('one user disconnected')
  })
})
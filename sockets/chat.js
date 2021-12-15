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
    Message.find({ room: data.room })
      .populate('sender', { "messages": 1, "image": 1, "_id": 1 })
      .then(messages => {
         console.log(messages);
        socket.of(`/${data.room}`).emit('messages', { messages: messages })
      })
      .catch(error => socket.of(`/${data.room}`).emit('messages',{ messages: [], error: error.message }))
  })
  io.of('/').adapter.clients((err, clients) => {
    console.log(clients); // an array containing all connected socket ids
  });
    
  
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
/*
const io = require('socket.io')(50001);

io.on('connection', socket => {
    //Get the chatID of the user and join in a room of the same chatID
    chatID = socket.handshake.query.room
    socket.join(chatID)

    //Leave the room if the user closes the socket
    socket.on('disconnect', () => {
        socket.leave(chatID)
    })

    //Send message to only a particular user
    socket.on('send_message', message => {
        room = message.room
        sender = message.sender
        body = message.body

        //Send message to only that particular room
        socket.in(chatID).emit('receive_message', {
            'body': body,
            'sender': sender,
            'room':room,
        })
    })
});
*/
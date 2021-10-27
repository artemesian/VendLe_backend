const http = require('http');
const { populate } = require('../models/message_model.js');
const io = require('socket.io')(50001);
const Message=require('../models/message_model.js');
const chat_utils=require('../utils/chat_utils')
/*
io.use((socket,next)=>{
    const username=socket.handshake.auth.username
    if(!username){
        return next(new Error('No username found or Invalid username !'))
    }
    socket.username = username;
    next();
})
*/
io.on('connection',(socket)=>{
  console.log("one user connected");
  console.log(socket.handshake.query)
  socket.on('join',data=>{
    console.log(data)
    socket.join(data.seller)
  })
  socket.on('chat_id',(data)=>{
      console.log(data)
    Message.find({discussionID:data.chat_id})
    .populate('sender',{"username":1,"image":1,"_id":1})
	.then(messages=>{
       // console.log(messages);
        socket.emit('load_message',{messages:messages})
    })
	.catch(error=>res.status(404).json({message:'No message for this discussion',error:error.message}))
  })


  socket.on('new_message',async (data) =>{
   //socket.to('test').emit('new_message',{
     socket.broadcast.emit('new_message',{
      content:data,
      from:data.userID
    })
    console.log(data)
    const message = Message({
      ...data
    })
    message.save()
    .then(message=>{
      console.log('saved message success',message)
      socket.emit('sent_confirm',{sent:true,status:"message sent successfully"})
    })
    .catch(error=>{
      console.log(error)
    })
  })
  socket.on("disconnect",()=>{
      console.log('one user disconnected')
  })
})
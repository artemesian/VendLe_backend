const express=require('express');
const Router=express.Router();
const chat=require('../controllers/chat_controller.js');
const auth=require('../middlewares/auth.js')


Router.post('/chat/create',auth,chat.createChat)
Router.post('/checkdiscussion',auth,chat.checkDiscussion)
Router.get('/chats',auth,chat.getAllChats)
Router.get('/chat/:id',auth,chat.getOneChat)
Router.get('/chats/user/:id',chat.getUserChat)
Router.put('/chat/update',auth,chat.updateChat)
Router.delete('/chat/delete',auth,chat.deleteOneChat)
Router.delete('/chats/delete',auth,chat.getProductDiscussion)//delete All discussion Messages

module.exports=Router;
const moment = require('moment');
const Message=require('../models/message_model')
const Chat =require('../models/chat_model')


module.exports.createChat=(req,res,next)=>{
	const chat = new Chat({
		...req.body
	})
	chat.save()
	.then(result=>{
		res.status(200).json({result:result})
	})
	.catch(error=>res.status(500).json(error.message))
}
module.exports.getAllChats=(req,res,next)=>{
	Chat.find()
	.then(chats=>res.status(200).json({chatsList:chats}))
	.catch(error=>res.status(404).json(error.message))
}

module.exports.getOneChat=(req,res,nex)=>{
	Chat.findOne({name:req.body.name})
	.then(chat=>res.status(200).json({chat:chat}))
	.catch(error=>res.status(404).json(error.message))
}

module.exports.updateChat=(req,res,next)=>{
	Chat.updateOne({name:req.body.name},{...req.body})
	.then(result=>res.status(200).json('Chat discussion was updated sucessfully'))
	.catch(error=>res.status(500).json({error:error.message,message:'An error occur'}))
}
module.exports.deleteOneChat=(req,res,next)=>{
deleteOne({name:req.body.name})
.then(result=>res.status(200).json('Message was deleted sucessfully'))
.catch(error=>res.status(404).json({error:error.message,message:'An error occur'}))
}
module.exports.getProductDiscussion=(req,res,next)=>{
    Message.find({sender:{id:req.params.id}})
    .populate('product')
    .then(async messages=>{
        let allMessage;
        let groupedProduct;
       groupedProduct=groupBy(messages,product)
       allMessage=groupBy(groupedProduct,discussionID)
       res.status(200).json({messages:allMessage})
    })
    .catch(error=>res.status(500).json(error.json))
}

function groupBy(table,id){
    table.reduce(function (r, a) {
        r[a.id] = r[a.id] || [];
        r[a.id].push(a);
        return r;
    })
}
module.exports.getUserChat=(req,res,next)=>{
    Chat.find({$or:[{buyer:req.body.id},{seller:req.body.id}]})
    .populate('buyer',{"_id":1,"username":1,"image":1})
    .populate('seller',{"_id":1,"username":1,"image":1})
    .populate('product')
    .populate('message')
    .exec()
    .then(chats=>res.status(200).json({Chats:chats}))
    .catch(error=>{
        console.log(error)
        res.status.json({error})
    })
}
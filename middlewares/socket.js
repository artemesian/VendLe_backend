const Messages =require('../models/message_model');

module.exports= (app,io,db)=>{
    io.on("connection", socket=>{
     console.log('one user connected !')   
    })
}
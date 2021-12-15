const redis =require('redis');

const redis_client=redis.createClient(6379);

redis_client.on('error',(error)=>{
    console.log(error);
})

module.exports=redis_client;
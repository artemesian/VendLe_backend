const express =require('express');
const app=express();
const cors=require('cors');
const dbConnect = require('./db_connect.js');
const Profile=require('./routes/profile_route.js');
const Authentication=require('./routes/authentication_route.js');
const Favoris=require('./routes/favoris_route.js');
const Plan = require('./routes/plan_route.js');
const Product = require('./routes/product_route.js');
const Category= require('./routes/category_route.js');
const Alert= require('./routes/alert_route.js')
const Chat= require('./routes/chat_route.js')
const Catalog=require ('./routes/catalog_route.js');
const Payment =require('./routes/payment_route.js');
const Message =require('./routes/message_route.js');
const forgotPassword = require('./routes/forgot_password_route.js');
const http = require('http').createServer(app)
const io = require('socket.io')(http);

const productsHome = require('./routes/product_home_route')
const serviceHome = require('./routes/service_home_route')

/*****cors error protection and data parsing*****/
/*app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
/*******endpoints******/


app.use('/', Plan)
app.use('/', Category)
app.use('/', Alert)
app.use('/',Product)
app.use('/',Authentication)
app.use('/',Favoris)

app.get('/',(req,res,next)=>{
	res.json('Hello world !')
})
app.use('/',Profile);
app.use('/',Catalog);
app.use ('/',Payment);
app.use ('/',forgotPassword);
app.use ('/',Message);
app.use ('/',Chat);


app.use('/',productsHome)
app.use('/', serviceHome)
module.exports=app
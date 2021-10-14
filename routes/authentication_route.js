const express =require('express');
const Router=express.Router();

const Register=require('../controllers/register_controller.js');
const Login=require('../controllers/login_controller.js');

Router.post('/register',Register.register);
Router.post('/login',Login.login);
Router.post('/verifyusername',Register.verifyUsername)
module.exports=Router
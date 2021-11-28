const express = require('express');
const { articleHome , articleFavorites , topArticles, productCategoryPerUser, productPerUser} = require('../controllers/article_home_controller');
const Router =express.Router();

Router.get('/home/bycategory', articleHome)
Router.get('/home/toparticle', topArticles)
Router.get('/home/product/:id', productPerUser )
Router.get('/home/category/article/:id', productCategoryPerUser)

module.exports = Router
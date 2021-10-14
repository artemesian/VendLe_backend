const express = require('express');
const { articleHome , articleFavorites , topArticles, productCategoryPeerUser, productPeerUser} = require('../controllers/article_home_controller');
const Router =express.Router();

Router.get('/home/bycategory', articleHome)
Router.get('/home/toparticle', topArticles)
Router.get('/home/product/:id', productPeerUser )
Router.get('/home/category/article/:id', productCategoryPeerUser)

module.exports = Router
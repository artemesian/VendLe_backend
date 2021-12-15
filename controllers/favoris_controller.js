const mongoose = require("mongoose")
const User = require("../models/user_model")




module.exports.addFavoris=(req, res, next)=>{
	console.log(req.body)
	console.log(req.params.id)
	User.findOneAndUpdate({_id:req.params.id},{$addToSet:{favoris:req.body.productId}},{new:1})
	.then(Favoris=>{
		res.status(200).json({
			message:'Favoris added succeffully',
			Favoris:Favoris.favoris
		})
	})
	.catch(error=>{
		res.status(400).json({error})
		console.log(error)
	})
}
module.exports.removeFavoris=(req, res, next)=>{
	console.log("c'est moi",req.body)
	console.log(req.params.id)
	User.findOneAndUpdate({_id:req.params.id},{$pull:{favoris:req.body.productId }},{new:1})
	.then(Favoris=>{
		res.status(200).json({
			message:'Favoris removed succeffully',
			Favoris:Favoris.favoris
		})
	})
	.catch(error=>{
		res.status(400).json({error})
		console.log(error)
	})
}

module.exports.getAllFavoris=(req,res,next)=>{
	User.findOne({_id:req.params.id},{favoris:1,_id:0})
	.populate("favoris",{
		"_id": 1,
		"name":1,
		"mainUrl.url": 1,
		"price": 1,
		"type": 1})
	.then(favoris=>res.status(200).json({Favoris:favoris}))
	.catch(error=>res.status(500).json(error.message))
}
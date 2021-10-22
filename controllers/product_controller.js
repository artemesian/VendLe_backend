const Product= require('../models/product_model')
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const path=require('path')
const fs=require('fs');
const cloudinary=require('../cloudinary_config')

module.exports.createProduct=async (req, res, next)=>{

	let urls=[];
	let result;
	const uploader=async (path)=>await cloudinary.uploads(path,'VendLe_Image')
	for(const file of req.files){
		const {path}=file
		const newPath=await uploader(path)
		urls.push(newPath)
		fs.unlinkSync(path)
		console.log(newPath)
	}
	console.log('urls',urls)
	const product= new Product({
		...req.body,photosUrls:urls
	})
	product.save()
	.then(Product=>{
		res.status(200).json({
			status:true,
			message:'product succesfully created',
			Product:Product
	})
	})
	.catch(error=>{
		res.status(500).json({error:error,status:false})
		console.log({error:error,status:false})
	}) 
	

}


module.exports.getAllProduct=(req, res, next)=>{
   Product.find()
   .then(Product=>{
   	 res.status(200).json({Product:Product})
   })

   .catch(error=>{
   	res.status(400).json({error})
   	console.log(error)
   })

}

module.exports.getOneProduct=(req, res, next)=>{
	console.log(req.body)
	Product.findOne({_id: req.headers.id})

	.then(Product=>{
		res.status(200).json({Product:Product})
	})

	.catch(error=>{
		res.status(400).json({error})
	})
}

module.exports.updateOneProduct=(req, res, next)=>{
	console.log(req.body)
	Product.findOneAndUpdate({_id: req.headers.id},
         {...req.body}
    )

    .then(Product=>{
    	res.status(200).json({
             message:'category succesfully saved',
    		Product:Product
    	})
    })

    .catch(error=>{
    	res.status(400).json({error})
    })
}


module.exports.deleteProduct=(req, res, next)=>{
     Product.findOneAndDelete({_id: req.headers.id})

     .then(Category=>{
     	res.status(200).json({
     		message:'product succesfully deleted'
     	})
     })
      
      .catch(error=>{
      	res.status(400).json({error})
      })
}

module.exports.updateProductImage=async (req,res,next)=>{
	let id=req.params.id
	let results=[];
	let result;
	let num=req.files.length
	await req.files.map(async(file)=>{
		result=await cloudinary.uploader.upload(file.path)
		results.push(result)
		return results
	//	console.log(results)
	})
		await Product.updateOne({_id:id},{
			$push:{
				photosUrls:{
					$each:results.map(product=>
						{
							return product.url
						}
					)
				}
			}
		})
		.then(product=>{
			console.log("resultats",results)
			res.status(200).json({message:`service Image of ${product.name} was updated`})})
		.catch(error=>res.status(404).json({message:'service does not exist',error:error.message}))
	
}
module.exports.getProductImage=async (req,res,next)=>{
	let productID=getID(req.params.id)
	gfs.files.findOne({metadata:productID},(err,file)=>{
		console.log(file)
		// check if image exist
		if (!file || file.length ===0) {
			return res.status(404).json({message:'this profile image does not exist'})
		}
		const readstream = gfs.createReadStream(file.filename);
      	return readstream.pipe(res);
	})
}
//regroupe par categorie avec le authorID
module.exports.getProductCategory=(req,res,next)=>{
//authorID:req.body.authorID

    Product.find()
    .then(products=>{
        console.log(products)
        res.json(groupBy(products,function(item) {
            return [item.category, item.authorID]
        }))
        
    })
    .catch(error=>console.log(error.message));
}

function arrayFromObject(obj) {
    var arr = [];
    for (var i in obj) {
        arr.push(obj[i]);
    }
    return arr;
}

function groupBy(list, fn) {
    var groups = {};
    for (var i = 0; i < list.length; i++) {
        var group = JSON.stringify(fn(list[i]));
        if (group in groups) {
            groups[group].push(list[i]);
        } else {
            groups[group] = [list[i]];
        }
    }
    return arrayFromObject(groups);
}
function getID(id){
    return id;
}
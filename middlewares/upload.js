/*
const mongoose=require('mongoose');
const gridStorage=require('multer-gridfs-storage');
const grid=require('gridfs-stream');
const multer=require('multer');
require('dotenv').config();

const connexion =mongoose.createConnection(process.env.MONGO_URI,{useUnifiedTopology:true,useNewUrlParser:true});
let gfs;
connexion.once('open',()=>{
	gfs=grid(connexion.db, mongoose.mongo);
	gfs.collection('Images');
})

const storage=new gridStorage({
	url:process.env.MONGO_URI,
	file:(req,file)=>{
		return new Promise((resolve,reject)=>{
			const filename=file.originalname;
			const id=req.params.id;
			const fileInfo={
				filename:`${Date.now()}-${id}-${filename}`,
				//metadata:userID,
				bucketName:'Images',
			};
			resolve(fileInfo);
		})
	}
})

const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);

    }

};

const upload=multer({storage: storage, fileFilter: fileFilter}).fields([{name:'profile'},{name:'products'}]);

module.exports={upload};
*/


// Multer config


const multer = require("multer");
const cloudinary = require("cloudinary");
const path = require("path");

module.exports = multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, cb) => {
		let ext = path.extname(file.originalname);  
		if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".PNG"  && ext !== ".jfif") {
		cb(new Error("File type is not supported"), false);
		return;
		}
		cb(null, true);
	},
});
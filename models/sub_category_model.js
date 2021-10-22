const mongoose=require('mongoose');
const { Schema } = mongoose;
//const subCategory =require('./sub_category_model.js')
const subCategorySchema = {
	name:{
		type:String,
		required:true
	},
	iconsUrl:[String],
	dateUpdated:{
		type:Date
	},
	type:String,
	subCategory:[],
	isSubCategory:Boolean,
	parameters:[{
		name:String,
		type:String
	}],
	history:[{
	    oldrecord:[String],
	    newrecord:[String],
	    Datecreated:{
	        type:Date
	    }
	}]
}

module.exports=subCategorySchema;
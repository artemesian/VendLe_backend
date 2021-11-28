const mongoose=require('mongoose');
const diffHistory = require('mongoose-diff-history/diffHistory')
const { Schema } = mongoose;
const subCategory =require('./sub_category_model.js')

const categorySchema = new Schema({
	name:{
		type:String,
		required:true
	},
	typeOfCategory:{
		type:String,
		required:true
	},
	iconsUrl:{},
	parent:{
		type:Schema.Types.ObjectId,
		ref:"Category"
	},
	parameters:[{
		name:String,
		type:String
	}],
	type:String,
	dateUpdated:{
		type:Date
	},
	history:[{
	    oldrecord:[String],
	    newrecord:[String],
	    Datecreated:{
	        type:Date
	    }
	}]
},{timestamps:true})

categorySchema.plugin(diffHistory.plugin)
module.exports= mongoose.model('Category', categorySchema);

/*Required
-Name
*/
const mongoose=require('mongoose');
const { Schema } = mongoose;

  const ProductSchema = new Schema({
	name:{
		type:String,
		required:true
	},
	description:{
		type:String
	},
	contact:{
		type:Number,
	},
	photosUrls:[],
	category:{
		type:String,
		//required:true
	},
	sub_cayegory:String,
	city:{
		type:String
	},
	country:{
		type:String
	},
	quarter:{
		type:String
	},
    price:{
    	type:String,
    	required:true
    },
    view:{
    	type:Number,
		default : 0
    },
    authorID:{
    	type:Schema.Types.ObjectId,
		ref:"User"
    },
	 interested:[String]
    ,
    dateCreated:{
    	type:Date,
        default:Date.now()
    },
    dateUpdated:{
    	type:Date
    },
   like:{
   	type:Number
    },
    signal:{
    	value:Boolean,
    	reason:[String]
    },
	quality:String,
    promotionStatus:{
    	value:Boolean,
    	planID:String
    },
    status:{
        //status du produit (s'il est vendu ou non)
        type:String
    },
	caracteristics:[],
	type:{type:String,required:true},//product or sevice
    history:[{
        oldrecord:[String],
        newrecord:[String],
        Datecreated:{
            type:Date
        }
    }]
})

module.exports=mongoose.model('Product',ProductSchema);
/*recommended
-Name
-Description
-Category
*/
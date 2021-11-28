const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	contact: {
		type: Number,
	},
	photosUrls: [],
	mainUrl: {},
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category",
		required: true
	},
	subCategory: String,
	city: {
		type: String
	},
	country: {
		type: String
	},
	quarter: {
		type: String
	},
	price: {
		type: String,
		//required: true
	},
	views: {
		type: Number,
		default: 0
	},
	authorID: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	interested: [{
		type: Schema.Types.ObjectId,
		ref: "User"
	}]//repertorier tous ceux qui ont liké un produit 
	,
	dateCreated: {
		type: Date,
		default: Date.now()
	},
	dateUpdated: {
		type: Date
	},
	like: {
		type: Number
	},
	signal: {
		value: Boolean,
		reason: [String]
	},
	quality: String,
	promotionStatus: {
		value: Boolean,
		planID: String
	},
	status: {
		//status du produit (s'il est vendu ou non)
		type: String
	},
	caracteristics: [],
	contact: {
		type: Number,
		//required: true
	},
	evaluation: {
		type: Number
	},
	viewers: [],
	type: { type: String, 
		required: true
	 },//product or sevice
	history: [{
		oldrecord: [String],
		newrecord: [String],
		Datecreated: {
			type: Date
		}
	}]
})

module.exports = mongoose.model('Product', ProductSchema);
/*recommended
-Name
-Description
-Category
*/

/*recommended
-Name
-Description
-Category
-contact
*/
const Category = require('../models/category_model')


module.exports.createCategory = (req, res, next) => {

	console.log(req.body)
	const category = new Category({
		...req.body
	})
	category.save()
		.then(Category => {
			res.status(200).json({
				message: 'category succesfully created',
				Category: Category
			})
		})

		.catch(error => {
			res.status(400).json({ error })
			console.log(error)
		})

}

var groupBy = function(subCategory, key) {
	return 
  };

module.exports.getAllCategory = (req, res, next) => {
	Category.find()//{ parent: null }
		//.populate('parent')
		.then(result => {
			let category=[];
			let subCategory=[];
			result.map(e => {
				if (e.parent == null) { category.push(e) } else { subCategory.push(e) }
			})
			resultat=subCategory.reduce(function(r, a) {
				(r[a.parent] = r[a.parent] || []).push(a);
				return r;
			  }, {});
			  
			res.status(200).json({
				Category:category,
				SubCategory:resultat
			})
		})

		.catch(error => {
			res.status(400).json({ error })
			console.log(error)
		})

}
module.exports.getSubCategory = (req, res, next) => {
	Category.find({ parent: req.params.id })
		.then(subCategory => {
			console.log(subCategory)
			res.status(200).json({ subCategory: subCategory })
		})

		.catch(error => {
			res.status(400).json({ error })
			console.log(error)
		})

}
module.exports.getOneCategory = (req, res, next) => {
	console.log(req.body)
	Category.findOne({ _id: req.headers.id })

		.then(Category => {
			res.status(200).json({ Category: Category })
		})

		.catch(error => {
			res.status(400).json({ error })
		})
}

module.exports.updateOneCategory = (req, res, next) => {
	console.log(req.body)
	Category.findOneAndUpdate({ _id: req.headers.id },
		{ ...req.body }
	)

		.then(Category => {
			res.status(200).json({
				message: 'category succesfully saved',
				Category: Category
			})
		})

		.catch(error => {
			res.status(400).json({ error })
		})
}

module.exports.deleteCategory = (req, res, next) => {
	Category.findOneAndDelete({ _id: req.headers.id })

		.then(Category => {
			res.status(200).json({
				message: 'category succesfully deleted'
			})
		})

		.catch(error => {
			res.status(400).json({ error })
		})
}

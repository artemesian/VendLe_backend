const Product = require("../models/product_model");
const categorySchema = require("../models/category_model");
const UserModel = require("../models/user_model");

module.exports.articleHome = (req, res, next) => {
  Product.find()
    .populate("authorID")
    .populate("category")
    .then((products) => {
      console.log(products);
      result = products.reduce(function (r, a) {
        r[a.category._id] = r[a.category] || {
          name: "",
          _id: "",
          articles: [],
          typeOfCategory: "",
        };
        r[a.category._id].articles.push({
          _id: a._id,
          name: a.name,
          mainImage: a.mainUrl.url,
          price: a.price,
          author: {
            _id: a.authorID._id,
            image: a.authorID.image,
            fullName: a.authorID.fullName,
            userName: a.authorID.userName,
          },
          type: a.type,
        });
        r[a.category._id].typeOfCategory = a.category.typeOfCategory;
        r[a.category._id].name = a.category.name;
        r[a.category._id]._id = a.category._id;
        return r;
      }, {});

      res.status(200).json({ result: Object.values(result) });
    })
    .catch((error) => res.status(404).json({ result: error }));
};

module.exports.topArticles = (req, res, next) => {
  Product.find({},{_id:1,name:1,"mainUrl.url":1,price:1,authorID:1,type:1,views:1}).sort({"views":-1}).limit(20)
  .populate('authorID',{_id:1,fullName:1,userName:1,"image.url":1})
    .then(result => res.status(200).json(result))
    .catch((error) => {
      res.status(500).json(error.message)
      console.log(error)
    });
};

module.exports.productPerUser = (req, res, next) => {
  let id = req.params.id;
  Product.find({ authorID: id })
    .then((test) => res.status(200).json({ test: test }))
    .catch((error) => res.status(404).json(error));
};

module.exports.productCategoryPerUser = (req, res, next) => {
  let id = req.params.id;
  Product.find({ authorID: id })
    .then((products) => {
      const category = products.category;
      result = products.reduce(function (r, a) {
        r[a.category] = r[a.category] || [];
        r[a.category].push(a);
        return r;
      }, Object.create(null));
      console.log(result);
      res.status(200).json({ result: result });
    })
    .catch((error) => res.status(404).json({ result: error }));
};

const Product = require("../models/product_model");
const categorySchema = require("../models/category_model");
const UserModel = require("../models/user_model");
const { ObjectID } = require("mongodb");

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
  Product.aggregate([
    {
      $project: {
        name: {
          $max: "$name",
        },
        description: {
          $max: "$description",
        },
        contact: {
          $max: "$contact",
        },
        photosUrls: [
          {
            $max: "$photosUrls",
          },
        ],
        category: {
          $max: "$category",
        },
        city: {
          $max: "$city",
        },
        country: {
          $max: "$country",
        },
        quarter: {
          $max: "$quarter",
        },
        price: {
          $max: "$price",
        },
        view: {
          $max: "$view",
        },
        dateCreated: {
          $max: "dateCreated",
        },
        dateUpdated: {
          $max: "$dateUpdated",
        },
        like: {
          $max: "$like",
        },
        signal: {
          $max: "$signal",
        },
        promotionStatus: {
          $max: "$promotionStatus",
        },
        status: {
          $max: "$status",
        },
        history: {
          $max: "$history",
        },
      },
    },
    {
      $limit: 10,
    },
    {
      $sort: {
        view: -1,
      },
    },
    {
      $limit: 10,
    },
  ])
    .then((topproduct) => res.status(200).json(topproduct))
    .catch((error) => res.status(404).json(error));
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

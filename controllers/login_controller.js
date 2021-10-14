const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user_model.js");
require("dotenv").config();

module.exports.login = (req, res, next) => {
  const { phone, password } = req.body;
  console.log(req.body);
  User.findOne({ phone })
    .then((user) => {
      try {
        if (!user) return res.status(404).json({ message: "user not found" });
        let verify = bcrypt.compareSync(password, user.password);
        if (verify == false)
          res
            .status(500)
            .json({ message: "authentication failed or incorrect password" });
        let token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
        res.status(200).json({
          message: `${user.username} authenticated successfully`,
          user: {
            token: token,
            id: user._id,
            email: user.email,
            username: user.username,
            phone: user.phone,
            follower_count: user.followers.length,
            following_count: user.followings.length,
            name: user.fullName,
            profile_image: "",
            discussion_count: user.discussions.length,
            country: user.country,
            age: user.birthday,
            favoris_count: user.favoris.length,
          },
        });
      } catch (error) {
        console.log(error.message);
      }
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
};

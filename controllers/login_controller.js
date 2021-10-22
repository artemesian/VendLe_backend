const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user_model.js");
require("dotenv").config();

module.exports.login = (req, res, next) => {
  const { password, identifier, byEmail } = req.body;
  console.log("Login", req.body);

  User().populate("country");
  if (!byEmail) {
    User.findOne({ identifier })
      .then((user) => {
        try {
          if (!user) return res.status(404).json({ message: "user not found" });
          let verify = bcrypt.compareSync(password, user.password);
          console.log("verify", verify);
          if (verify == false)
            res
              .status(500)
              .json({ message: "authentication failed or incorrect password" });
          let token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
          res.status(200).json({
            message: `${user.username} authenticated successfully`,
            user: {
              id: user._id,
              email: user.email,
              userName: user.userName,
              phone: user.phone,
              follower_count: user.followers.length,
              following_count: user.followings.length,
              fullName: user.fullName,
              profile_image: user.profileImage ?? "",
              discussion_count: user.discussions.length,
              country: {
                id: user.country._id,
                name: user.country.name,
                unicodeFlag: user.country.unicodeFlag,
                dialCode: user.country.dialCode,
                flag: user.country.flag,
              },
              town: user.town,
              dateOfBirth: user.dateOfBirth,
              token: token,
            },
          });
        } catch (error) {
          console.log(error.message);
        }
      })
      .catch((error) => {
        res.status(500).json(error.message);
      });
  } else {
    User.findOne({ email: identifier })
      .then((user) => {
        try {
          if (!user) return res.status(404).json({ message: "user not found" });
          let verify = bcrypt.compareSync(password, user.password);
          console.log("verify", verify);
          if (verify == false)
            res
              .status(500)
              .json({ message: "authentication failed or incorrect password" });
          let token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
          res.status(200).json({
            message: `${user.username} authenticated successfully`,
            user: {
              id: user._id,
              email: user.email,
              userName: user.userName,
              phone: user.phone,
              follower_count: user.followers.length,
              following_count: user.followings.length,
              fullName: user.fullName,
              profile_image: user.profile_image,
              discussion_count: user.discussions.length,
              country: {
                id: user.country._id,
                name: user.country.name,
                unicodeFlag: user.country.unicodeFlag,
                dialCode: user.country.dialCode,
                flag: user.country.flag,
              },
              town: user.town,
              dateOfBirth: user.dateOfBirth,
              token: token,
            },
          });
        } catch (error) {
          console.log(error.message);
        }
      })
      .catch((error) => {
        res.status(500).json(error.message);
      });
  }
};

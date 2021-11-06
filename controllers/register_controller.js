const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user_model.js");
require("dotenv").config();

module.exports.verifyUsername = (req, res, next) => {
  console.log(req.body.userName);
  User.findOne({ userName: req.body.userName }, { userName: 1 })
    .then((user) => {
      console.log(user);
      user != null
        ? res.status(200).json({ exist: true })
        : res.status(200).json({ exist: false });
    })
    .catch(console.log);
};

module.exports.register = (req, res, next) => {
  const {
    email,
    number,
    gender,
    dateOfBirth,
    password,
    userName,
    fullName,
    town,
    countryID,
  } = req.body;
  console.log(req.body);
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User({
        fullName: fullName,
        email: email,
        phone: number,
        userName: userName,
        gender: gender,
        town: town,
        country: countryID,
        dateOfBirth: dateOfBirth,
        password: hash,
        role: "user",
      });
      user.populate("country");
      user
        .save()
        .then((user) => {
          console.log(user)
          if (!user)
            return res.status(400).json({ error: "user are not created" });
          let token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
          res.status(200).json({
            message: "account created",
            user: {
              id: user._id,
              email: user.email,
              userName: user.userName,
              phone: user.phone,
              follower_count: user.followers.length,
              following_count: user.followings.length,
              fullName: user.fullName,
              profile_image: "",
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
          console.log(user);
        })
        .catch((error) => {
          res.status(500).json({ message: "error: account not created" });
          console.log("account", error);
        });
    })
    .catch((error) => console.log("bcrypt", error));
};

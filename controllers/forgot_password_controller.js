
const User = require('../models/user_model');
const Token = require('../models/forgot_password_model');
const crypto = require('crypto');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { error } = require('console');


const getAllToken = (req, res, next) => {

    Token.find()
        .then(token => res.json(token))
        .catch(error => res.json(error.message))
}


const resetPassword = async (req, res, next) => {
    console.log(req.body.email)
    if (!req.body.email) {
        return res
            .status(500)
            .json({ message: "Email is required" });
    }
    const user = await User.findOne({
        email: req.body.email
    });
    console.log('user', user);
    if (!user) {
        return res
            .status(500)
            .json({ message: "Email does not exist" });
    }
    var token = new Token({ userId: user.id, resettoken: crypto.randomBytes(3).toString('hex').toUpperCase() })
    token.save(function (err) {
        try {
            var Transporter = nodemailer.createTransport
                ({
                    service: 'gmail',
                    auth: {
                        user: process.env.user,
                        pass: process.env.pass
                    }
                });
            var mailOption =
            { 
                to: user.email,
                from: process.env.user,
                subject: 'Vendle Reset Password',
                text: `Code de reinitialisation de mot de passe : ${token.resettoken}`
            }
            Transporter.sendMail(mailOption, function (err, data) {
                if (err) {
                    console.log('Error Occurs', err);
                    res
                        .status(500)
                        .send({ msg: err.message });
                } else {
                    console.log('Email sent successfully');
                    res
                        .status(200)
                        .json({ message: "Password Reset  succesfuly !" });
                }
            })
        } catch (err) {
            console.log(err)
            return res
                .status(500)
                .send({ msg: err.message });
        }
    })
}
const validPasswordToken = async (req, res) => {
    console.log(req.body.code)
    if (!req.body.code) {
        return res
            .status(500)
            .json({ message: "token is required" });
    }
    const user = await Token.findOne({
        resettoken: req.body.code

    });

    if (!user) {
        return res
            .status(409)
            .json({ message: 'Code invalide' });
    }
    User.findOneAndUpdate({ id: user.userId })
        .then(() => {
            res
                .status(200)
                .json({ message: 'Token verified succesfully.' });
        })
        .catch((err) => {
            return res
                .status(500)
                .send({ msg: err.message });

        });
}

const newPassword = async (req, res) => {
    Token.findOne({ resettoken: req.body.code }, function (err, userToken, next) {
        if (!userToken) {
            return res
                .status(409)
                .json({ message: 'Token has expired' });
        }
        User.findOne({
            _id: userToken.userId
        }, function (err, user, next) {
            if (!user) {
                return res
                    .status(409)
                    .json({ message: 'User does not exist' });
            }
            return bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    console.log(err)
                    return res
                        .status(400)
                        .json({ message: 'Error hashing password' });
                }
                user.password = hash;
                user.save(function (err) {
                    if (err) {
                        return res
                            .status(400)
                            .json({ message: 'Password can not reset.' });
                    } else {
                        userToken.remove();
                        return res
                            .status(201)
                            .json({ message: 'Password reset successfully' });
                    }
                });
            });
        });
    })
}
module.exports = {
    resetPassword: resetPassword,
    validPasswordToken: validPasswordToken,
    newPassword: newPassword,
    getAllToken: getAllToken,

}

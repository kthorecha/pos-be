const User = require('../models/Users.model');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { loginValidation }  = require('../config/validation');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (req, res, next) => {
        // log
        // passport.authenticate('local', {
        //     successRedirect: '/users/',
        //     failureRedirect: '/users/login',
        //     failureFlash: true
        // })(req, res, next);
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        // validate user
        const user = await User.findOne({ username: req.body.username });
        // we give status as username or password is wrong, to avoid user enumeration
        if (!user) return res.status(400).send('username or password is wrong');
        // validate pass
        const validPass = await bcrypt.compare(req.body.password, user.password);

        if (!validPass) return res.status(400).send('Invalid password');

        // res.send('Logged In!');
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send({status: "success", result: token});
    },
    logout: async (req, res, next) => {
        req.logout();
    },
    create: async (req, res) => {
        const userData = req.body;
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(userData.password, salt, function(err, hash) {
                if (err) throw err;
                userData.password = hash;
                const UserModel = new User(userData);
                UserModel.save().then(data => {
                    res.status(200).json({ status: "success", result: data });
                }).catch(e => {
                    res.status(400).send({ status: "error", error: e});
                });
            });
        });
    },
    getAll: async (req, res) => {
        await User.find().exec()
        .then((data) => {
            if (data == null) {
                res.send('data not found');
            }
            res.status(200).send({ status: "success", result: data});
        }).catch(e => {
            res.status(400).send({ status: "error", error: e});
        });
    },
    update: async (req, res) => {
        let updateId = req.params.id;
        if (updateId) {
            await User.findByIdAndUpdate(updateId, req.body, { new: true}).exec()
            .then(data => {
                res.status(200).send({ status: "success", result: data});
            }).catch(e => {
                res.status(400).send({ status: "error", error: e});
            });
        } else {
            res.status(400).send({ status: "error", result: "Provide an Id to update!"});
        }
    },
    delete: async (req, res) => {
        let deleteId = req.params.id;
        if (deleteId) {
            await User.findOneAndDelete({
                _id: deleteId
            }).exec()
            .then(data => {
                res.status(200).send({ status: "success", result: data});
            }).catch(e => {
                res.status(400).send({ status: "error", error: e});
            })
        }
    }
}
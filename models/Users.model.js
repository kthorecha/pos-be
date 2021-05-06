'use strict';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let Users = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    userrole: {
        type: String
    },
    createdOn:{
        type: Date,
        default: Date.now()
    }
})

module.exports = Mongoose.model('Users', Users);
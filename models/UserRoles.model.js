'use strict';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let UserRoles = new Schema({
    name: {
        type: String
    },
    permissions: {
        type: Object
    },
    createdOn:{
        type: Date,
        default: Date.now()
    }
})

module.exports = Mongoose.model('UserRoles', UserRoles);
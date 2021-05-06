'use strict';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let ProductCategory = new Schema({
    categoryName: {
        type: String
    },
    description: {
        type: String
    },
    createdOn:{
        type: Date,
        default: Date.now()
    }
})

module.exports = Mongoose.model('ProductCategory', ProductCategory);
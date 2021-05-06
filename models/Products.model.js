'use strict';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let Products = new Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    unit_price: {
        type: Number
    },
    available_qty: {
        type: Number
    },
    image: {
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

module.exports = Mongoose.model('Products', Products);
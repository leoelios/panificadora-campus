const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    imgOriginalName: {
        type: String,
    },
    imgUrl: {
        type: String,
    },
    imgPublic_id: {
        type: String,
    }
})


module.exports = mongoose.model('products', Product);
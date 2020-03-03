const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
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
    imgName: {
        type: String,
    }
})


module.exports = mongoose.model('products', Product);
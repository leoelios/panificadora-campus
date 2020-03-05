const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    nameProduct: {
        type: String,
    },
    quantProduct: {
        type: Number,
    },
});

module.exports = ListSchema;
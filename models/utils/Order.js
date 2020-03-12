const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ListSchema = require('./ListOrder');

const OrderSchema = new Schema({
    state: {
        type: String,
        required: true,
        default: 'Pendente'
    },
    list: {
        type: [ListSchema],
    },
    statePayment: {
        type: String,
    },
});

module.exports = OrderSchema;
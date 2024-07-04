const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const orderSchema = Schema({
    or_pd_id: {
        type: Schema.Types.ObjectId,
        ref: 'Products'
    },
    or_amount: {
        type: Number,
        default: 0
    },
    or_qty: {
        type: Number,
        default: 0
    },
}, {timestamps: true})

module.exports = model('Orders', orderSchema)
const mongoose = require('mongoose');
const {model, Schema } = mongoose;

const productSchema = Schema({
    pd_code:{
        type: String,
        minLength: [3, 'Panjang code product minimal 3 karakter'],
        required: [true, 'Code product harus diisi']
    },
    pd_ct_id: {
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    },
    pd_name:{
        type: String,
        maxLength: [5000, 'Panjang maksimal nama 5000 karakter']
    },

    pd_price:{
        type: Number,
        default: 0 
    },
}, {timestamps: true }
);

module.exports = model('Products', productSchema);
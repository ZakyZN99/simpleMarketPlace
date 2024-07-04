const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const categorySchema = new Schema({
    ct_code: {
        type: String,
        required: [true, 'Kode kategori harus diisi']
    },
    ct_name: {
        type: String,
        minLength: [3, 'Panjang nama kategori minimal 3 karakter'],
        maxLength: [20, 'Panjang nama kategori maksimal 20 karakter'],
        required: [true, 'Nama kategori harus diisi']
    }
},{timestamps: true});

module.exports = model('Categories', categorySchema);

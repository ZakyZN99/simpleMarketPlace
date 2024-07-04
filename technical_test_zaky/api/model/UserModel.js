const mongoose = require('mongoose')
const {Schema, model} = mongoose;
const bcrypt = require('bcrypt');

let userSchema = new Schema({
    us_name: {
        type: String,
        require: [true, 'Nama Lengkap harus diisi'],
        minlength: [3, 'Panjang minimal karakter minimal 3 karakter'],
        maxlength: [255, 'Panjang maksimal karakter maksimal 255 karakter']
    },
    us_password:{
        type: String,
        require: [true, 'Password harus diisi'],
        maxlength: [255, 'Panjang maksimal karakter maksimal 255 karakter']
    },
    us_email:{
        type: String,
        require: [true, 'Email harus diisi'],
        maxlength: [255, 'Panjang maksimal karakter maksimal 255 karakter'],
        validate: {
            validator: async function (value) {
                const count = await this.constructor.countDocuments({ us_email: value });
                return count === 0; // Returns true if email is unique
            },
            message: attr => `${attr.value} sudah terdaftar`
        }
    },
    us_phone_number:{
        type: String,
    },
    us_address : {
        type: String,
        require: [true, 'Nama Lengkap harus diisi'],
        minlength: [3, 'Panjang minimal karakter minimal 3 karakter'],
        maxlength: [255, 'Panjang maksimal karakter maksimal 255 karakter']
    },
    
    token: [String]

},   {timestamps: true});

userSchema.path('us_email').validate(function(value){
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
}, attr => `${attr.value} harus merupakan email yang valid!`);

const HASH_ROUND = 10;
userSchema.pre('save', function (next) {
        this.us_password = bcrypt.hashSync(this.us_password, HASH_ROUND),
        next();
});

module.exports = model('Users', userSchema);
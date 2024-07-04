const db = require("../config/connect");

const registerUser = async(req, res, next) => {
    try {
        const dummyUser = {
            us_name: "Jane Doe",
            us_password: "password456",
            us_email: "janedoe@example.com",
            us_phone_number: "+0987654321",
            us_address: "456 Elm St, Anytown, USA",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v : 0,
        }

        db.collection('users').insertOne(dummyUser, (err, result) => {
            if (err) throw err;
            res.send('User added');
        });

    } catch (err) {
        if(err & err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const addProduct = async(req, res, next) => {
    try {
        const dummyProduct = {
            _id: '02product',
            pd_code: "P002",
            pd_ct_id: "02category",
            pd_name: "Product 2",
            pd_price: 150,
            createdAt: new Date(),
            updatedAt: new Date(),
            __v : 0,
        };

        db.collection('products').insertOne(dummyProduct, (err, result) => {
            if (err) throw err;
            res.send('Products added');
        });
    } catch (err) {
        if(err & err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const addCategory = async(req, res, next) =>{
    try {
        const dummyCategory = {
            _id: '02category',
            ct_code: "C002",
            ct_name: "Category 2",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v : 0,
        };
        db.collection('categories').insertOne(dummyCategory, (err, result) => {
            if (err) throw err;
            res.send('Category added');
        });
    } catch (err) {
        if(err & err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const addOrder = async(req, res, next) => {
    try {
        const dummyOrder = {
            _id: "2Order",
            or_pd_id: "02product",
            or_amount: 15,
            createdAt: new Date(),
            updatedAt: new Date(),
            __v : 0,
        };
        db.collection('orders').insertOne(dummyOrder, (err, result) => {
            if (err) throw err;
            res.send('Order added');
        });
    } catch (err) {
        if(err & err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}
module.exports = {
    registerUser,
    addProduct,
    addCategory,
    addOrder
}
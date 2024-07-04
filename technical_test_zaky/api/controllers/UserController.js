const UserModel = require('../model/UserModel');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {getToken} = require('../../utils')
const config = require('../config/config')

const regisUser = async(req, res, next) => {
    try {
        const payload = req.body;
        let userModel = new UserModel(payload);

        await userModel.save();
        return res.json(userModel);
        
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

const localStrategy = async (us_email, us_password, done) => {
    try {
        let user = await UserModel.findOne({us_email}).select('+us_password +token');   
        if (!user) return done();
        if (bcrypt.compareSync(us_password, user.us_password)) {
            ({ us_password, ...userWithoutPassword } = user.toJSON());
            return done(null, userWithoutPassword);
        }
    } catch (err) {
        done(err, null);
    }
    done();
}


const login = async (req, res, next) => {
        passport.authenticate('local', async function(err, user){

            if(err) return next(err);
            if(!user) return res.status(401).json({
                error: 1,
                message: 'Email or Password incorrect'
            })
        try {
            const signed = jwt.sign(user, config.secretkey);
            await UserModel.findByIdAndUpdate(user._id, {$push: {token: signed}})

            res.json({
                message: 'Login Berhasil',
                user,
                token: signed
            })   
        } catch (err) {
            next(err)
        }
})(req, res, next)
}

const logout = async (req, res, next) => {
    let token = getToken(req);
    let user = await UserModel.findOneAndUpdate({token: {$in: [token]}}, {$pull: {token: token}}, {useFindAndModify: false});

    if(!token || !user) {
        return res.status(404).json({
            error: 1,
            message: 'User not found or already logged out'
        });
    }

    return res.json({
        error: 0,
        message: 'Logout Berhasil'
    })
}


module.exports = {
    regisUser,
    login,
    localStrategy,
    logout
}
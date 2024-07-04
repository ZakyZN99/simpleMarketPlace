const jwt = require('jsonwebtoken');
const UserModel = require('../api/model/UserModel');
const config = require('../api/config/config');
const { getToken } = require('../utils');

function decodeToken(){
    return async function(req, res, next){
        try {
            let token  = getToken(req);
            if(!token) return next();
            req.user = jwt.verify(token, config.secretkey);
    
            let user = await UserModel.findOne({token: {$in: [token]}})
            if(!user){
                res.json({
                    error: 1,
                    message: 'Token Expired'
                });
            }
        } catch (err) {
            if(err && err.name === 'JsonWebTokenError'){
                return res.json({
                    error: 1,
                    message: err.message,
                });
            }
            next(err);
        }
        return next()
    }
}
module.exports = {
    decodeToken
}
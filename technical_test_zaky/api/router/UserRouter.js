const router = require('express').Router();
const userController = require('../controllers/UserController');
const password = require('passport');
const LocalStrategy = require('passport-local').Strategy;

password.use(new LocalStrategy({usernameField: 'us_email',  passwordField: 'us_password'}, userController.localStrategy));
router.post('/register', userController.regisUser);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = router
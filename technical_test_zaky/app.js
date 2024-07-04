var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');

const dummy = require('./api/router/DummyRouter');
const userRoute = require('./api/router/UserRouter');
const productRoute = require('./api/router/ProductRouter');
const orderRoute = require('./api/router/OrderRouter');
const categoryRoute = require('./api/router/CategoryRouter');
const {decodeToken} = require('./middleware')

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(decodeToken());
app.use('/api', dummy);
app.use('/api', userRoute);
app.use('/api', productRoute);
app.use('/api', orderRoute);
app.use('/api', categoryRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
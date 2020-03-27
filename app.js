var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// add mongoose for db connection
var mongoose = require('mongoose')

const paginate = require('express-paginate');

var app = express();
app.use(paginate.middleware(2, 50));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// db connection
var globals = require('./config/globals')

mongoose.connect(globals.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    (res) => {
        console.log('Connected to MongoDB')
    }
).catch(() => {
    console.log('Connection to MongoDB failed')
})


var indexController = require('./controllers/index');
app.use('/', indexController);


// helper method to select the proper country in the foods/edit view
var hbs = require('hbs')
// configured from here.
hbs.registerPartials(__dirname + '/views');
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

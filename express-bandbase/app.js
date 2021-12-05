var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var introRouter = require('./routes/introScreen');
var newsRouter = require('./routes/news');
var discoverRouter = require('./routes/discover');
var aboutRouter = require('./routes/about');
var myBandsRouter = require('./routes/myBands');
var cookieRouter = require('./routes/cookiePolicy');

var app = express();

//Favicon
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public', 'images', 'LogoResized.ico')));


//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = "mongodb+srv://dbUserBB:0j1fkrOPakUKniye@cluster0.amopb.mongodb.net/band_base?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/introScreen', introRouter);
app.use('/news', newsRouter);
app.use('/discover', discoverRouter);
app.use('/about', aboutRouter);
app.use('/mybands',myBandsRouter);
app.use('/cookiePolicy', cookieRouter);


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

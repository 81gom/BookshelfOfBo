var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//import mongoose
var mongoose = require('mongoose');
//import config file
var config = require('./config/globals');
var hbs = require('hbs');
//import passport & express session
var passport = require('passport');
var session = require('express-session');
var User = require('./models/user');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
var genresRouter = require('./routes/genres');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport is configured
app.use(session({
  secret: 'BookshelfOfBo',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//configure local strategy (username, password)
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/genres', genresRouter);

//After route declarations, connect to mongoose
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((message) => console.log('Connection is successful.')) 
  .catch((error) => console.log(error)); // connection failed

  //Add helper methods for formatting genre selecting
  hbs.registerHelper('createOption', (currentValue, selectedValue)=>{
    // initialize selected property
    var selectedProperty = '';
    // if values are equal, set the selected property
    if (currentValue.toUpperCase() == selectedValue.toUpperCase()) {
      selectedProperty ='selected';
    }
    // generate html code for the option element with the selected property
    var option = '<option ' + selectedProperty + '>' + currentValue + '</option>';
    return new hbs.SafeString(option); // <option>VALUE</option>

  });
  
  //Add helper methods for formatting dates
  hbs.registerHelper('toShortDate', (longDateValue)=>{
    return new hbs.SafeString(longDateValue.toLocaleDateString('en-CA'));
  });


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

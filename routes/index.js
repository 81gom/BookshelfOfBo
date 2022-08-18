var express = require('express');
var router = express.Router();
const User = require('../models/user');
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Bookself of Bo', user: req.user });
});

// GET handler for /login
router.get('/login', (req, res, next) => {
  let messages = req.session.messages || [];
  //console.log(messages);
  req.session.messages = [];

  res.render('login', { title: 'Login to your account', messages: messages });
});

// POST handler for /login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/login',
  failureMessage: 'Invalid crendentials'
}));

// GET handler for /register
router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Create a new account' });
});

// POST handler for /register
router.post('/register', (req, res, next) => {
  User.register(
    new User({
      username: req.body.username
    }),
    req.body.password,
    (err, newUser) => {
      if (err) {
        console.log(err);
        res.redirect('/register');
      }
      else {
        req.login(newUser, (err) => {
          res.redirect('/books');
        });
      }
    }
  );
});

//GET handler for /logout 
router.get('/logout', (req, res, next) => {
  req.session.destroy(function (err) {    
    res.redirect('/login');
  });
});

module.exports = router;

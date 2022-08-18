const express = require('express');
const router = express.Router();
const Genre = require('../models/genre');

function loggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

//GET handlers for /Genres/
router.get('/', loggedIn, (req, res, next) => {
    Genre.find((err, genres) => {
        if (err) { console.log(err); }
        else {
            res.render('genres/index', { title: 'Bo\'s Genres', dataset: genres, user: req.user });
        }
    });
});

//GET handler for /Genres/Add
router.get('/add', loggedIn, (req, res, next) => {
    res.render('genres/add', { title: 'Create a New Genre', user: req.user });
});

//POST handler for /Genres/Add
router.post('/add', loggedIn, (req, res, next) => {
    Genre.create(
        {
            name: req.body.name
        },
        (err, newGenre) => {
            if (err) { console.log(err); }
            else {
                res.redirect('/genres');
            }
        }
    );
});

module.exports = router;
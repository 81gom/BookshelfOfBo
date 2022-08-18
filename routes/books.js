//1. Import express and create a router object
const express = require('express');
const router = express.Router();
//import my model
const Book = require('../models/book');
const Genre = require('../models/genre');

function loggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

//2. Configure the router object by adding request handlers
// GET handler for '/Books/' << remember routes are relative to the path declared in app.js
router.get('/', (req, res, next) => {
    Book.find((err, books) => {
        if (err) { console.log(err); }
        else {
            res.render('books/index', {
                title: 'Bo\'s Book List',
                dataset: books,
                user: req.user
            })
        }
    });
});

//4. GET handler for /Books/Add
router.get('/add', loggedIn, (req, res, next) => {
    Genre.find((err, genres) => {
        if (err) { console.log(err); }
        else {
            res.render('books/add', { title: "Add a New Book", genres: genres, user: req.user });
        }
    }).sort({ name: 1 });
});

//5. POST handler for /Books/Add
// recieved when user clicks SAVE button inside the form
router.post('/add', loggedIn, (req, res, next) => {
    Book.create(
        {
            booktitle: req.body.booktitle,
            author: req.body.author,
            genre: req.body.genre,
            readingday: req.body.readingday,
            review: req.body.review
        },
        (err, newBook) => {
            if (err) { console.log(err); } // error
            else { res.redirect('/books'); } // success
        });
});

//6. GET handler for /books/delete/_id
router.get('/delete/:_id', loggedIn, (req, res, next) => {
    Book.remove({
        _id: req.params._id
    },
        (err) => {
            if (err) { console.log(err); }
            else {
                res.redirect('/books');
            }
        })
});

//7. GET handler for /books/edit/_id
router.get('/edit/:_id', loggedIn, (req, res, next) => {
    Book.findById(req.params._id, (err, book) => {
        if (err) { console.log(err); }
        else {
            Genre.find((err, genres) => {
                if (err) { console.log(err); }
                else {
                    res.render('books/edit',
                        {
                            title: 'Edit a Book',
                            book: book,
                            genres: genres, 
                            user: req.user
                        });
                }
            }).sort({ name: 1 });
        }
    });
});

//8. POST handler for /books/edit/:_id
router.post('/edit/:_id', loggedIn, (req, res, next) => {
    Book.findOneAndUpdate(
        {
            _id: req.params._id
        },
        {
            booktitle: req.body.booktitle,
            author: req.body.author,
            genre: req.body.genre,
            readingday: req.body.readingday,
            review: req.body.review
        },
        (err, updatedBook) => {
            if (err) { console.log(err); }
            else {
                res.redirect('/books');
            }
        }
    );
});

//3. Export the router object
module.exports = router;
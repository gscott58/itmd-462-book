var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Book = require('../models/book');

// Get request display all books . . .
router.get('/', function(req, res, next) {
    Book.find(function (err, books) {
    if (err) return console.error(err);
        res.json(books);
    })
});

// Post request create new book . . .
router.post('/', function(req, res, next) {
    let bookToCreate = new Book(req.body);
    bookToCreate.save(function(err, book){
        res.send(book);
    });
});

// Get request specific book . . .
router.get('/:id', function(req, res, next) {
    Book.findOne({_id: req.params["id"]}, function(err, book) {
       if (err) return next(err);
       res.render('book_details', { title: 'Chicago Public Library', error: err, book });
//       res.send(book);

    });
});

// Put request update specific book . . .
router.put('/:id', function(req, res, next) {
    Book.findOneAndUpdate({_id: req.params["id"]}, req.body, function(err, book) {
        if (err) return next(err);
        res.status(204).send();
    });
});

// Delete request remove specific book . . . 
router.delete('/:id', function(req, res, next) {
    Book.deleteOne({_id: req.params["id"]}, function(err, book) {
        if (err) return next(err);
        res.status(204).send();
    });
});

module.exports = router;

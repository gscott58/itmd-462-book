var express = require('express');
var Book    = require('../models/book');
var router  = express.Router();
var async   = require('async');

/* GET Home Page. */
router.get('/', function(req, res, next) {   
    async.parallel({
        book_count: function(callback) {
            Book.count(callback);
        },
    }, function(err, results) {
        res.render('index', { title: 'Chicago Public Library', error: err, data: results });
    });
});

module.exports = router;











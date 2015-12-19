var DB = require('../model/DB.js');

var express = require('express');
var router = express.Router();


var chapter = require('./catalog/chapterController.js');
var page = require('./catalog/pageController.js');

router.get('/', function(req, res, next) {
    console.log(req.params);


    var dict = {};

    if (req.param('title')) {
        dict.title = {
            '$regex': req.param('title')
        };
    };

    if (req.param()) {};

    DB.Catalog.find(
        dict
    ).limit(30).exec(function(err, data) {
        if (err) return res.badRequest(err);
        res.send(data);
    });
});

router.get('/:id', function(req, res, next) {
    DB.Catalog.find({
        where: {},
        limit: req.params.limit
    }, function(err, data) {
        if (err) return res.badRequest(err);
        res.send(data);
    });
});


router.get('/category', function(req, res, next) {
    DB.Catalog.find(function(err, data) {
        if (err) return res.badRequest(err);
        res.send(data);
    });
});










module.exports = router;

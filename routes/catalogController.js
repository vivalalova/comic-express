var DB = require('../model/DB.js');

var express = require('express');
var router = express.Router();


var chapter = require('./catalog/chapterController.js');
var page = require('./catalog/pageController.js');


function parseParams(req) {
    var dict = {};

    if (req.param('title')) {
        dict.title = {
            '$regex': req.param('title')
        };
    };

    if (req.param('category')) {
        dict.category = {
            '$regex': req.param('category')
        };
    }

    return dict;
}

function parseLimit(req) {
    var limit = req.param('limit') ? req.param('limit') : 30;
    return limit > 100 ? 100 : limit;
}

function parseSkip(req) {
    return req.param('skip') ? req.param('skip') : 0;
}

router.get('/', function(req, res, next) {

    var limit = req.param('limit') ? req.param('limit') : 30;
    limit = limit > 100 ? 100 : limit;


    DB.Catalog.find(
        parseParams(req)
    ).
    skip(parseSkip(req)).
    limit(parseLimit(req)).
    exec(function(err, data) {
        if (err) return res.send(err);
        res.send(data);
    });
});

router.get('/:id', function(req, res, next) {
    console.log(req.param('id'));
    DB.Catalog.find({
        "_id": req.param('id')
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

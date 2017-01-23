var DB = require('../model/DB.js');

var express = require('express');
var router = express.Router();

//繁體 to 簡體
var OpenCC = require('opencc');
var opencc = new OpenCC('t2s.json');

/////pre
router.use('*', function(req, res, next) {

    req.query.find = {};

    //title
    if (req.query.title) {
        var CHT_title = opencc.convertSync(req.query.title);

        req.query.find.title = {
            '$regex': CHT_title
        };
    };

    //category
    if (req.query.category) {
        req.query.find.category = {
            '$regex': req.query.category
        };
    }

    //limit
    var limit = Number(req.query.limit) || 30;
    req.query.limit = limit > 100 ? 100 : limit;

    //skip
    req.query.skip = Number(req.query.skip) || 0;

    //sort
    switch (req.query.sort) {
        case 'hot':
            req.query.sort = {
                hot: -1
            };
            break;
        case 'update':
            req.query.sort = {
                _updated_at: -1
            };
            break;
        default:

            break;
    }
    
    next();
});


////chapter
var chapterController = require('./chapterController.js');
router.use('/:id/chapter', function(req, res, next) {
    req.query.catalogID = req.params.id;
    next();
});
router.use('/:id/chapter', chapterController);

/////
router.get('/', function(req, res, next) {

    DB.Catalog.find(
        req.query.find
    ).
    skip(req.query.skip).
    limit(req.query.limit).
    sort(req.query.sort).
    exec(function(err, data) {
        if (err) return res.send(err);
        res.send(data);
    });
});

router.get('/:id', function(req, res, next) {

    DB.Catalog.find({
        "ID": req.params.id
    }, function(err, data) {
        if (err) return res.send(err);
        res.send(data);
    });
});


//detect body if a array
router.use('/', function(req, res, next) {
    if (req.body instanceof Array && req.body.length) {
        next();
    } else {
        return res.send(404, {
            RM: 'body requires array with catalog'
        });
    }
})

module.exports = router;

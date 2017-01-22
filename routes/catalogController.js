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
    if (req.params.title) {
        var CHT_title = opencc.convertSync(req.params.title);

        req.query.find.title = {
            '$regex': CHT_title
        };
    };


    //category
    if (req.params.category) {
        req.query.find.category = {
            '$regex': req.params.category
        };
    }

    //limit
    var limit = Number(req.params.limit) ? Number(req.params.limit) : 30;
    req.query.limit = limit > 100 ? 100 : limit;

    //skip
    req.query.skip = Number(req.params.skip) || 0;

    //sort
    switch (req.params.sort) {
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

router.post('/', function(req, res, next) {
    var catalogs = req.body;

    var responseBody = [];

    for (var i = catalogs.length - 1; i >= 0; i--) {
        createOrUpdate(responseBody, i, catalogs, res);
    };

});


module.exports = router;

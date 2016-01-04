var DB = require('../model/DB.js');

var express = require('express');
var router = express.Router();


//繁體 to 簡體
var OpenCC = require('opencc');
var opencc = new OpenCC('t2s.json');

//url decode
// var urlencode = require('urlencode');


/////pre 
router.use('*', function(req, res, next) {

    req.query.find = {};

    if (req.param('title')) {
        var CHT_title = opencc.convertSync(req.param('title'));

        req.query.find.title = {
            '$regex': CHT_title
        };
    };

    if (req.param('category')) {
        req.query.find.category = {
            '$regex': req.param('category')
        };
    }

    var limit = req.param('limit') ? req.param('limit') : 30;
    req.query.limit = limit > 100 ? 100 : limit;

    req.query.skip = req.param('skip') ? req.param('skip') : 0;

    req.query.hot = req.param('hot') ? {hot:-1} : null;

    next();
});


////chapter
var chapterController = require('./chapterController.js');
router.get('/:id/chapter', function(req, res, next) {
    req.query.catalogID = req.param('id');
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
    sort(req.query.hot).
    exec(function(err, data) {
        if (err) return res.send(err);
        res.send(data);
    });
});

router.get('/:id', function(req, res, next) {

    DB.Catalog.find({
        "_id": req.param('id')
    }, function(err, data) {
        if (err) return res.badRequest(err);
        res.send(data);
    });
});


module.exports = router;

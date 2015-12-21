var DB = require('../model/DB.js');

var express = require('express');
var router = express.Router();

var Params = require('./params.js');


/////////////////////////////////////////////////////

var pageController = require('./pageController.js');
router.get('/:id/page', function(req, res, next) {
    req.query.chapterID = req.param('id');
    next();
});
router.use('/:id/page', pageController);

/////////////////////////////////////////////////////////////

router.get('/', function(req, res, next) {

    DB.Chapter.find({
        catalog: req.query.catalogID
    }).
    limit(req.query.limit).
    skip(req.query.skip).
    sort([
        ['title', 'descending']
    ]).
    exec(function(err, data) {
        if (err) return res.send(err);
        res.send(data);
    });
});


module.exports = router;

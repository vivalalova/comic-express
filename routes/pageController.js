var DB = require('../model/DB.js');

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

    DB.Page.find(req.query.chapterID).
    limit(req.query.limit).
    skip(req.query.skip).
    sort([
        ['url', 'descending']
    ]).
    exec(function(err, data) {
        if (err) return res.send(err);
        res.send(data);
    });
});


module.exports = router;

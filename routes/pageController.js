var DB = require('../model/DB.js');
var ObjectId = require('mongoose').Types.ObjectId;

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

    var query = {
        chapter: new ObjectId(req.query.chapterID)
    };


    DB.Page.find(query).
    limit(1000).
    skip(req.query.skip).
    sort([
        ['url', 'ascending']
    ]).
    exec(function(err, data) {
        if (err) return res.send(err);
        res.send(data);
    });
});

module.exports = router;

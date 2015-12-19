var DB = require('../model/DB.js');

var express = require('express');
var router = express.Router();

var Params = require('./params.js');

router.get('/', function(req, res, next) {

    DB.Chapter.find().
    limit(15).
    sort([
        ['title', 'descending']
    ]).
    exec(function(err, data) {
        if (err) return res.send(err);
        res.send(data);
    });
});



module.exports = router;

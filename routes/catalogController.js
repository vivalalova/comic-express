var DB = require('../model/DB.js');

var express = require('express');
var router = express.Router();


var chapter = require('./catalog/chapterController.js');
var page = require('./catalog/pageController.js');


router.get('/', function(req, res, next) {

    DB.Catalog.find({}, function(err, data) {
        if (err) return res.badRequest(err);
        res.send(data);
    });
});


module.exports = router;

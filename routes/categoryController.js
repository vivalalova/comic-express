var DB = require('../model/DB.js');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    DB.Catalog.find().distinct('category', function(err, data) {
        if (err) return res.badRequest(err);
        res.send(data);
    });
});


module.exports = router;

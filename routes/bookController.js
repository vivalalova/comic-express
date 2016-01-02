var DB = require('../model/DB.js');

var express = require('express');
var router = express.Router();

/////pre 
router.use('*', function(req, res, next) {
    next();
});

/////
router.get('/', function(req, res, next) {

});

router.get('/add/:id', function(req, res, next) {

});

router.get('/remove/:id', function(req, res, next) {


});


module.exports = router;

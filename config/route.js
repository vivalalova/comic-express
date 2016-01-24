var express = require('express');
var router = express.Router();

var Category = require('../controller/CategoryController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.use('/category', Category);



module.exports = router;

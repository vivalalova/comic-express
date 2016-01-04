var DB = require('../model/DB.js');

var express = require('express');
var router = express.Router();

// var Params = require('./params.js');


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
    limit(2000).
    skip(req.query.skip).
    sort([
        ['title', 'descending']
    ]).
    exec(function(err, data) {
        if (err) return res.send(err);
        res.send(data);
    });

    updateHitWithCatalogID(req.query.catalogID);
});


function updateHitWithCatalogID (catalogID) {
    DB.Catalog.update({
        '_id':catalogID
    },{
        $inc: { hot: 1 }
    },function (err,numAffected) {
        if (err) return console.log(err);
        console.log(numAffected);
    })
}



module.exports = router;

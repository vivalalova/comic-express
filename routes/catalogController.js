var DB = require('../model/DB.js');

var express = require('express');
var app = express();

var router = express.Router();

var Params = require('./params.js');

// app.use('/:id/chapter', chapter);
// var app = express();
// var chapter = require('./chapterController.js');
// app.use('/chapter', chapter);


router.get('/', function(req, res, next) {

    DB.Catalog.find(
        Params.parseParams(req)
    ).
    skip(Params.parseSkip(req)).
    limit(Params.parseLimit(req)).
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

// router.get('/:id/chapter', function(req, res, next) {

//     DB.Catalog.find({
//         "_id": req.param('id')
//     }, function(err, data) {
//         if (err) return res.badRequest(err);
//         res.send(data);
//     });
// });



var chapterController = require('./chapterController.js');
app.use('/:id/chapter', chapterController);







module.exports = router;

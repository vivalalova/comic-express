var DB = require('../model/DB.js');

var express = require('express');
var router = express.Router();


//繁體 to 簡體
var OpenCC = require('opencc');
var opencc = new OpenCC('t2s.json');

//url decode
// var urlencode = require('urlencode');


/////pre 
router.use('*', function(req, res, next) {

    req.query.find = {};


    //title
    if (req.param('title')) {
        var CHT_title = opencc.convertSync(req.param('title'));

        req.query.find.title = {
            '$regex': CHT_title
        };
    };


    //category
    if (req.param('category')) {
        req.query.find.category = {
            '$regex': req.param('category')
        };
    }

    //limit
    var limit = req.param('limit') ? req.param('limit') : 30;
    req.query.limit = limit > 100 ? 100 : limit;

    //skip
    req.query.skip = req.param('skip') ? req.param('skip') : 0;

    //sort
    switch (req.param('sort')) {
        case 'hot':
            req.query.sort = {
                hot: -1
            };
            break;
        case 'update':
            req.query.sort = {
                updatedAt: -1
            };
            break;
        default:

            break;
    }




    next();
});


////chapter
var chapterController = require('./chapterController.js');
router.get('/:id/chapter', function(req, res, next) {
    req.query.catalogID = req.param('id');
    next();
});
router.use('/:id/chapter', chapterController);

/////
router.get('/', function(req, res, next) {

    DB.Catalog.find(
        req.query.find
    ).
    skip(req.query.skip).
    limit(req.query.limit).
    sort(req.query.sort).
    exec(function(err, data) {
        if (err) return res.send(err);
        res.send(data);
    });
});

router.get('/:id', function(req, res, next) {

    DB.Catalog.find({
        "_id": req.param('id')
    }, function(err, data) {
        if (err) return res.send(err);
        res.send(data);
    });
});



//detect body if a array
router.use('/', function(req, res, next) {
    if (req.body instanceof Array && req.body.length) {
        next();
    } else {
        return res.send(404, {
            RM: 'body requires array with catalog'
        });
    }
})

router.post('/', function(req, res, next) {
    var catalogs = req.body;

    var responseBody = [];

    for (var i = catalogs.length - 1; i >= 0; i--) {
        // var catalog = catalogs[i];
        createOrUpdate(responseBody, i, catalogs, res);
    };

});

function createOrUpdate(responseBody, i, catalogs, res) {
    var catalog = catalogs[i];

    DB.Catalog.findById(
        catalog.id,
        function(err, data) {
            if (err) return res.send(err);
            if (data) {
                //update
                console.log('update ' + catalog.id);
                DB.Catalog.findByIdAndUpdate(
                    catalog.id, catalog,
                    function(err, data) {
                        if (err) return res.send(err);
                        data.id = catalog.id;
                        responseBody.push(data);
                        createOrUpdateDidEnd(catalogs.length, responseBody, res);
                    });
            } else {
                console.log('create ' + catalog.id);
                DB.Catalog.create({
                    '_id': catalog.id
                }, function(err, data) {
                    if (err) return res.send(err);
                    data.id = catalog.id;
                    responseBody.push(data);
                    createOrUpdateDidEnd(catalogs.length, responseBody, res);
                });
            }
        });
}

function createOrUpdateDidEnd(count, responseBody, res) {
    if (responseBody.length === count) {
        console.log(responseBody);
        return res.send(responseBody);
    };
}


module.exports = router;

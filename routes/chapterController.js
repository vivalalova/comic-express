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
    find(req, res, function(data) {
        res.send(data);
    });
});


router.get('/:id', function(req, res, next) {
    find(req, res, function(chapters) {

        for (var index = chapters.length - 1; index >= 0; index--) {
            if (chapters[index].id === req.params.id) {

                var chapter = chapters[index].toObject();

                if (index > 0) {
                    chapter['next'] = chapters[index - 1];
                };

                if (index < chapters.length - 1) {
                    chapter['prev'] = chapters[index + 1];
                };

                res.send(chapter);

                updateHotWithChapter(req.params.id);

                return;
            }
        };
    });
});


function find(req, res, callback) {

    DB.Chapter.find({
        catalog: req.query.catalogID
    }).
    limit(2000).
    sort([
        ['title', 'descending']
    ]).
    exec(function(err, data) {
        if (err) return res.send(err);

        callback(data);
    });

    updateHitWithCatalogID(req.query.catalogID);
}


function updateHotWithChapter(chapterID) {
    DB.Chapter.update({
        '_id': chapterID
    }, {
        $inc: {
            hot: 1
        }
    }, function(err, numAffected) {
        if (err) return console.log(err);

    })
}


function updateHitWithCatalogID(catalogID) {
    DB.Catalog.update({
        '_id': catalogID
    }, {
        $inc: {
            hot: 1
        }
    }, function(err, numAffected) {
        if (err) return console.log(err);

    })
}



module.exports = router;

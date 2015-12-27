var DB = require('../model/DB.js');

var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var crypto = require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('hi');
});


router.use('*', function(req, res, next) {

    if (!req.body.passwd) {
        return res.status(400).send({
            RM: 'passwd required'
        });
    };

    next();
});

router.post('/sign', function(req, res, next) {
    console.log(req.body.id);
    DB.User.findOne({
        '_id': req.body.id
    }, function(err, user) {
        if (err) return res.status(400).send(err);

        if (user) { //exists

            if (bcrypt.compareSync(req.body.passwd, user.passwd)) {
                res.send(user);
            } else {
                res.status(400).send({
                    RM: 'user avaiable'
                });
            }

        } else { //sign up

            var salt = bcrypt.genSaltSync(10);
            var hashedPassword = bcrypt.hashSync(req.body.passwd, salt);

            DB.User.create({
                '_id': req.body.id,
                passwd: hashedPassword,
                thumbnailurl: req.body.thumbnailurl,
                userName: req.body.userName,
                token: createToken()
            }, function(err, user) {
                if (err) res.status(400).send({
                    RM: 'error creating user',
                    err: err
                });

                return res.send(user);
            });
        }
    });
});

function createToken() {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    return crypto.createHash('sha1').update(current_date + random).digest('hex');
}

module.exports = router;

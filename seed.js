var DB = require('./model/DB.js');

var bcrypt = require('bcrypt');
var crypto = require('crypto');


var userID = 'karo';
var userName = 'karo';
var passwd = 'kerker';





DB.User.remove({
    '_id': 'karo'
}, function(err, user) {
    if (err) return console.log(err);
    create(function() {
        process.exit();
    });
});

function create(callback) {
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(passwd, salt);


    var thumbnail = 'http://api.randomuser.me/portraits/thumb/men/' + parseInt(Math.random() * 50) + '.jpg';

    DB.User.create({
        '_id': userID,
        passwd: hashedPassword,
        thumbnailurl: thumbnail,
        userName: userName,
        token: createToken(),
        isAdmin: true
    }, function(err, user) {
        if (err) return console.log(err);
        console.log(user);

        callback();
    });
}

function createToken() {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    return crypto.createHash('sha1').update(current_date + random).digest('hex');
}

var env = require('../config/env.js');

var mongoose = require('mongoose');
mongoose.connect(env.db.url);


var catalogSchema = mongoose.Schema(require('./catalog.js'));
var Catalog = mongoose.model('catalog', catalogSchema,'catalog');

var chapterSchema = mongoose.Schema(require('./chapter.js'));
var Chapter = mongoose.model('chapter', chapterSchema,'chapter');

var pageSchema = mongoose.Schema(require('./page.js'));
var Page = mongoose.model('page', pageSchema);

var userSchema = mongoose.Schema(require('./user.js'));
var User = mongoose.model('user', userSchema);


module.exports.Catalog = Catalog;
module.exports.Chapter = Chapter;
module.exports.Page = Page;
module.exports.User = User;

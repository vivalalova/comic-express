var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comic');


var catalogSchema = mongoose.Schema(require('./catalog.js'));
var Catalog = mongoose.model('catalog', catalogSchema);

var chapterSchema = mongoose.Schema(require('./chapter.js'));
var Chapter = mongoose.model('chapter', chapterSchema);

var pageSchema = mongoose.Schema(require('./page.js'));
var Page = mongoose.model('page', pageSchema);


module.exports.Catalog = Catalog;
module.exports.Chapter = Chapter;
module.exports.Page = Page;



Page.find(function(err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
})

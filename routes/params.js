exports.parseParams = function(req) {
    var dict = {};

    if (req.param('title')) {
        dict.title = {
            '$regex': req.param('title')
        };
    };

    if (req.param('category')) {
        dict.category = {
            '$regex': req.param('category')
        };
    }

    return dict;
}

exports.parseLimit = function(req) {
    var limit = req.param('limit') ? req.param('limit') : 30;
    return limit > 100 ? 100 : limit;
}

exports.parseSkip = function(req) {
    return req.param('skip') ? req.param('skip') : 0;
}

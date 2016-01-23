var session = require('express-session')

module.exports = session({
    resave: true,
    saveUninitialized: true,
    secret: 'SOMERANDOMSECRETHERE',
    cookie: {
        maxAge: 15 * 60 * 1000
    }
});

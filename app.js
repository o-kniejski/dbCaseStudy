/** Main app
 *
 * Note: environment variables in package.json
 * NODE_ENV=development
 *
 * @author Oliver Kniejski
 * @licence CC BY-SA 4.0
 */
"use strict";

// ********************** modules **********************
var express = require('express');
var requestLogger = require('morgan');

// routes
//var route1 = require('./routes/route1');

// ********************** App Creation **********************
var app = express();

// ************************* Logging ************************
app.use(requestLogger('dev'));

// ********************** Routes **********************
//app.use('/path1', route1);

// ********************** Errorhandling and requests without proper URLs **********************
// 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('404 Not Found');
    err.status = 404;
    next(err);
});

// final error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
            error: {},
            code: err.status || 500
        }
    });
});

// ********************** Start Server **********************
const server = app.listen(63535, function(err) {
    if (err !== undefined) {
        console.log('Error on startup, ',err);
    }
});
/** This module defines the route for trainstations
 *
 * @author Oliver Kniejski
 * @licence CC BY-SA 4.0
 *
 * @module routes/distance
 * @type {Router}
 */

// ********************** modules **********************

var express = require('express');

var distance = express.Router();

// ********************** routes **********************
distance.route('/:ds1/:ds2')
    .get(function (req, res, next) {

        //TODO: get station data
        //TODO: calculate distance

        var stationDistance = new distanceInfo("Frankfurt", "Berlin", 123);
        res.json(stationDistance);
    });

distance.use(function (req, res, next) {
    if (res.locals.items) {
        res.json(res.locals.items);
        delete res.locals.items;
    } else {
        res.set('Content-Type', 'application/json');
        res.status(204).end(); // no content
    }
});

module.exports = distance;

// ********************** helpers **********************

//object for return info formatting
function distanceInfo(from, to, distance) {
    this.from = from;
    this.to = to;
    this.distance = distance;
    this.unit = "km";
}
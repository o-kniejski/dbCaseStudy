/** This module defines the route for trainstations
 *
 * @author Oliver Kniejski
 * @licence CC BY-SA 4.0
 *
 * @module routes/distance
 * @type {Router}
 */

// ********************** modules **********************

var databox = require('../databox.js'); // datastorage
var express = require('express');

var distance = express.Router();

// ********************** routes **********************
distance.route('/:ds1/:ds2')
    .get(function (req, res, next) {

        var stationData1 = databox.getStation(req.params.ds1);
        var stationData2 = databox.getStation(req.params.ds2);

        var distance = getDistanceInKm(stationData1.breite, stationData1.laenge, stationData2.breite, stationData2.laenge)

        var stationDistance = new distanceInfo(stationData1.name, stationData2.name, Math.round(distance));
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

//haversine formula
//source: https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
function getDistanceInKm(lat1, lon1, lat2, lon2) {
    var earthRadius = 6371; // in km
    var dLat = deg2rad(lat2-lat1);
    var dLon = deg2rad(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var distanceInKm = earthRadius * c; // Distance in km
    return distanceInKm;
}
  
function deg2rad(deg) {
    return deg * (Math.PI/180);
}

//object for return info formatting
function distanceInfo(from, to, distance) {
    this.from = from;
    this.to = to;
    this.distance = distance;
    this.unit = "km";
}
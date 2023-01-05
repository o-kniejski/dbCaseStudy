/** simple data import and storage module (only in memory)
 * 
 *  @description
 *  public method:
 *  - getStation (String ds100) [@returns one element containing station information]
 * 
 * @author Oliver Kniejski
 * @licence  CC BY-SA 4.0
 *
 * @throws Error in method if station does not exist
 * @module databox
 * @type {Object}
 */
"use strict";

const fs = require('fs');

// ********************** module **********************

var databox = {
    getStation: function(ds100) {
        if (stationMap[ds100] === undefined) {
            throw {status: 400, message: 'station with ds100 '+ds100+' does not exist.'};
        }

        return stationMap[ds100];
    }
  };

module.exports = databox;


// ********************** data structure **********************

// object for station information
function stationObject(evaNr, ds100, ifopt, name, verkehr, laenge, breite, betreiberName, betreiberNr, status) {
    this.evaNr= evaNr;
    this.ds100 = ds100;
    this.ifopt = ifopt;
    this.name = name;
    this.verkehr = verkehr;
    this.laenge = laenge;
    this.breite = breite;
    this.betreiberName = betreiberName;
    this.betreiberNr = betreiberNr;
    this.status = status;
}

//Hashmap for station objects
var stationMap={};

//read csv and fill map
fs.readFile('stationlist.csv', 'utf8', function (err, data) {
    var lines = data.split("\n");

    for (var i = 1; i < lines.length; i++) {
        var words = lines[i].split(";");
        
        //only fernverkehr trainstations
        if (words[4] == "FV"){

            //each ds100 for same station gets own entry
            var ds100s = words[1].split(",");

            for (var j=0; j<ds100s.length; j++){
                var station = new stationObject(parseInt(words[0]), words[1], words[2], words[3], words[4], parseFloat(words[5].replace(",", ".")), parseFloat(words[6].replace(",", ".")), words[7], words[8] , words[9]);
        
                stationMap[ds100s[j]] = station;
            }
        }
    }
});
/*
 * Read data from analog pins on an Intel IoT development board
 * and display the results via a browser running on a client device.
 * This app demonstrates the use of http.createServer and fs.
 *
 * Supported Intel IoT development boards are identified in the code.
 *
 * See LICENSE.md for license terms and conditions.
 *
 * https://software.intel.com/en-us/xdk/docs/using-templates-nodejs-iot
 */

/* spec jslint and jshint lines for desired JavaScript linting */
/* see http://www.jslint.com/help.html and http://jshint.com/docs */
/* jslint node:true */
/* jshint unused:true */

"use strict" ;


var ipAddress = '192.168.2.15' ;    // Set to IP address of your board (not 127.0.0.1)

var mraa = require("mraa") ;        // get mraa objecat and write version to the console
console.log('MRAA Version: ' + mraa.getVersion()) ;

var fs = require('fs') ;            // start by loading in some data
var lightSensorPage = fs.readFileSync('/node_app_slot/index.html') ;

// Insert the ip address in the code in the page
lightSensorPage = String(lightSensorPage).replace(/<<ipAddress>>/, ipAddress);

var analogPin0 = new mraa.Aio(0);

/**
 * Given a value, convert it to Lux
 *
 * This uses the table given in the documentation for the
 * Grove Starter Kit Plus. We have not sought to verify these
 * values with our device. That would be worth doing if you
 * intend to rely on these values. In that case, it could also
 * be worthwhile to improve the interpolation formula
 * @param {Number} - the raw reading from the device
 */
function getLux(analogValue) {
  // Values taken from Grove Starter Kit for Arduino table
  var lux;
  var calib = [{reading:0, lux:0},
               {reading:100, lux:0.2},  // guess - not from published table
               {reading:200, lux:1},
               {reading:300, lux:3},
               {reading:400, lux:6},
               {reading:500, lux:10},
               {reading:600, lux:15},
               {reading:700, lux:35},
               {reading:800, lux:80},
               {reading:900, lux:100}];
  var i = 0;
  while (i < calib.length && calib[i].reading < analogValue) {
    i ++;
  }
  if (i > 0) {
    i = i - 1;
  }
  // simple linear interpolation
  lux =  (calib[i].lux *(calib[i + 1].reading - analogValue) + calib[i + 1].lux * (analogValue - calib[i].reading))/(calib[i + 1].reading - calib[i].reading);
  return lux;
}

var http = require('http');
http.createServer(function (req, res) {
    var value;
    // This is a very quick and dirty way of detecting a request for the page
    // versus a request for light values
    if (req.url.indexOf('index') != -1) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(lightSensorPage);
    }
    else {
        value = analogPin0.read();
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(JSON.stringify({lightLevel:getLux(value), rawValue:value}));
    }
}).listen(1337, ipAddress);

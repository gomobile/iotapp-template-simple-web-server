/**
 * @file
 * This app uses the Node.js http node module to host a very simple web data
 * server on your IoT device. This IoT web data server displays data
 * collected by your IoT device, in the form of a JSON object. See the
 * included README.md file for more information.
 *
 * <https://software.intel.com/en-us/xdk/docs/using-templates-nodejs-iot>
 *
 * @author Paul Fischer, Intel Corporation
 * @author Elroy Ashtian, Intel Corporation
 * @author Dan Yocom, Intel Corporation
 *
 * @copyright (c) 2016-2017, Intel Corporation
 * @license BSD-3-Clause
 * See LICENSE.md for complete license terms and conditions.
 */

/* spec jslint and jshint lines for desired JavaScript linting */
/* see http://www.jslint.com/help.html and http://jshint.com/docs */
/* jslint node:true */
/* jshint unused:true */

"use strict" ;


var APP_NAME = "IoT Simple Web Data Server" ;

console.log("\n\n\n\n\n\n") ;                           // poor man's clear console
console.log("Initializing " + APP_NAME) ;
sysIdentify() ;                                         // useful system debug info

process.on("exit", function(code) {                     // define up front, due to no "hoisting"
    clearInterval(intervalID) ;
    console.log(" ") ;
    console.log("Exiting " + APP_NAME + ", with code:", code) ;
    console.log(" ") ;
}) ;


// The following will auto-configure the ipAddress of the simple IoT web data
// server. You can override this auto-configuration by setting ipAddress to
// something other than "0.0.0.0" -- otherwise it will attempt to
// automatically determine the board's ipAddress. If there is more than one
// ipAddress available, the first ipAddress found will be used. All network
// addresses that are found will be reported in the console.log window.

var ipAddress = "0.0.0.0" ;     // "0.0.0.0" means monitor all network interfaces
var ipPort = 1337 ;             // the IP port to be used by the web data server

var path = require("path") ;
var ipv4 = require(path.join(__dirname, "utl/get-ipv4-addresses.js")).getIPv4Addresses() ;
console.log("\n" + ipv4[0] + " IPv4 network interface(s) found.") ;

if( ipv4[0] > 0 ) {
    console.log("Direct your browser to any of the following URLs:") ;
    for( var i=ipv4[0]; i; i-- ) {
        console.log("  http://" + ipv4[i][1] + ":" + ipPort) ;
    }
    console.log(" ") ;
}
else {
    console.log("No network interfaces found, unable to start " + APP_NAME + ".") ;
    console.log("This should not happen if you login to your IoT device with the Intel XDK.") ;
    process.exit(1) ;
}


// Now start the IoT web server and wait for page requests. Any page address
// works, the result will always be a data response. You could implement
// something more sophisticated (but still simple) by using something like
// <https://www.npmjs.com/package/httpdispatcher> to implement specific
// responses for unique URL paths (queries), which would allow you to then
// provide a variety of data responses to specific query URLs.

var http = require("http") ;
var server = http.createServer(requestServer) ;

var serverReqCount = 0 ;
function requestServer(req, res) {
    var dataRead = getSensorData() ;

    res.writeHead(200, { "Content-Type":"text/json" }) ;
    res.write(JSON.stringify(dataRead)) ;
    res.end() ;
    console.log(JSON.stringify(dataRead)) ;

    serverReqCount++ ;
}

// this callback is triggered when the server is listening

server.listen(ipPort, ipAddress, function() {
    console.log("Server listening on: " + JSON.stringify(server.address())) ;
    console.log(" ") ;
}) ;



/**
 * Collect sensor data to be reported by the IoT web server.
 *
 * In order to make this app work on a wide range of IoT Node.js platforms, it
 * does not collect real sensor data. Instead, it reports a random number and
 * the current time as a substitute for real measured data. In a real app you
 * would replace this "fake" data with data read from a real sensor.
 *
 * @return {Object} - our "fake" sensor data
 */

function getSensorData() {

    var randomNum = Math.random() * 1000 ;
    var currTime = Date.now() ;

    return { randomNumber:randomNum.toFixed(3), currentTime:currTime } ;
}



/**
 * Using standard node modules, identify platform details.
 * Such as OS, processor, etc.
 *
 * Just prints info to the console...
 *
 * @function
 * @return {Void}
 */

function sysIdentify() {

    console.log("node version: " + process.versions.node) ;

    var os = require('os') ;
    console.log("os type: " + os.type()) ;
    console.log("os platform: " + os.platform()) ;
    console.log("os architecture: " + os.arch()) ;
    console.log("os release: " + os.release()) ;
    console.log("os hostname: " + os.hostname()) ;

}



// this is mostly just a "keep alive" so our web server does not terminate

var periodicActivity = function() {
    console.log("Server request count: " + serverReqCount) ;
} ;
var intervalID = setInterval(periodicActivity, 10000) ; // start the periodic activity

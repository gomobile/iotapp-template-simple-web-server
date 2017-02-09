Intel® XDK IoT Node.js\* Web Server App
=======================================
See [LICENSE.md](LICENSE.md) for license terms and conditions.

This sample application is distributed as part of the
[Intel® XDK](http://xdk.intel.com). It can also be downloaded
or cloned directly from its git repo on the
[public Intel XDK GitHub\* site](https://github.com/gomobile).

For help getting started developing applications with the
Intel XDK, please start with
[the Intel XDK documentation](https://software.intel.com/en-us/xdk/docs).

App Overview
------------
Demonstrates using the IoT board to serve data via a web page. The app reads the
light sensor and provides it as JSON to a web page, that is served by the IoT app.

To run the app:

1. Set the IP address of your board via the `ipAddress` variable. Use the IP address
   you use to connect to your board from the Intel XDK.

2. Start the app on your IoT device.

3. Point the browser on your development system, or a mobile device, to
   http://`ipAddress`:1337/xdk-iot-web-server (where `ipAddress` is the value you
   used in step one. A simple and somewhat ugly thermometer will be displayed.

The app's web page was tested in Chrome, but should work with any modern browser.

This code has been deliberately kept simple. Obvious improvements are:

1. Change the way the thermometer is displayed. HTML5 has other ways to do this.
   There are also graphing packages that will produce a nicer graphical display.

2. Improve the interpolation formula. The sample uses linear interpolation.
   A higher order interpolation may be worthwhile.

3. There are packages that support more sophisticated web server development.
   You could replace the very crude code in the example with such a package.

4. The IP address could be automatically detected instead of being hard-coded.

Important App Files
-------------------
* main.js
* package.json

Important Project Files
-----------------------
* README.md
* LICENSE.md
* <project-name>.xdk

Tested IoT Node.js Platforms
----------------------------
* [Intel® Galileo Board](http://intel.com/galileo)
* [Intel® Edison Development Platform](http://intel.com/edison)

This sample can run on other IoT [Node.js](http://nodejs.org) development
platforms, that include the appropriate sensor hardware, but may require
changes to the I/O initialization and configuration code in order to work on
those other platforms.

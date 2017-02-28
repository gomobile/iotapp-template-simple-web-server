Intel® XDK IoT Node.js\* Web Data Server App
============================================

See [LICENSE.md](LICENSE.md) for license terms and conditions.

This sample application is distributed as part of the
[Intel® XDK](http://xdk.intel.com). It can also be downloaded
or cloned directly from its git repo on the
[public Intel XDK GitHub\* site](https://github.com/gomobile).

For help getting started developing applications with the
Intel XDK, please start with
[the Intel XDK documentation](https://software.intel.com/en-us/xdk/docs).

See also, the
[mraa library documentation](https://iotdk.intel.com/docs/master/mraa/index.html)
for details regarding supported boards and the mraa library API and the
[upm library documentation](https://iotdk.intel.com/docs/master/upm/) for
information regarding the upm sensor and actuator library APIs.

App Overview
------------

This app uses the Node.js http node module to host a very simple web data
server on your IoT device. This IoT web data server displays data "collected"
by your IoT device, in the form of a JSON object.

> NOTE: in order to keep this app simple and make it work on a wide range of
> IoT Node.js platforms, it does not collect real sensor data, thus it does
> not use use the MRAA and UPM sensor libraries. Instead, it reports a random
> number and the current time as a substitute for measured data. In a real app
> you would replace this "fake" data with real data retrieved from a real
> sensor.

Using the browser on your phone, tablet or laptop; point to your IoT device.
When you run the IoT app it will print a URL at the Node.js console to use for
connecting to the IoT web data server.

> IMPORTANT: not all IoT devices are configured to have open ports available.
> For example, the default case for an Intel Joule board running the
> "reference Linux" has nearly all ports configured as "closed" and must be
> "opened" to access the board remotely over the network.

In order for this sample to work, the port used by the sample must be open and
available. If it fails to work, check the board-specific documentation for
details on how to open a port or ports for use by the sample. See the sample
code for information regarding which port is required by the sample.

Running the App
---------------

1. The app is set to configure the host IP address of  the web data server by
   setting the value of `ipAddress` to "0.0.0.0". Using this address will allow
   the web data server to respond to any available (and active) network interface
   on your IoT device. If you want to override this behavior, for example, to
   limit response to a specific network interface, you can set `ipAddress` to the
   specific IP address you want to use to connect to the web data server on your
   board.

2. Start the app on your IoT device.

3. Point the browser on your development system, or a mobile device, to
   one of the IP addresses printed in the Node.js console when the app starts
   running.

When you connect to the web data server, with your browser, it will respond
with a data sample in JSON format; data that is sampled by the IoT device each
time you refresh your browser. The results are also printed simultaneously to
the Node.js console. Don't be alarmed if you see more data samples printed to
the Node.js console, this is caused by some browsers that generate multiple
requests. The response function does not attempt to filter out these excess
browser requests, and they happen so quickly you are not able to see them in
the browser window.

This code has been deliberately kept simple. Obvious improvements are:

1. Filter for specific URL requests so you can provide directed data responses.

2. There are packages that support more sophisticated web server development.
   You could replace the very crude code in the example with such a package.

Important App Files
-------------------

* main.js
* package.json

Important Project Files
-----------------------

* README.md
* LICENSE.md
* \<project-name\>.xdk

Tested IoT Node.js Platforms
----------------------------

* [Intel® Galileo Board for Arduino](http://intel.com/galileo)
* [Intel® Edison Board for Arduino](http://intel.com/edison)
* [Intel® Joule™ 570x Developer Kit](http://intel.com/joule)
* [Intel® NUC DE3815](http://www.intel.com/nucsupport) + [Arduino 101](http://intel.com/arduino)

This sample should run on any IoT [Node.js](http://nodejs.org) development
platform, because it does not require any sensor hardware (the collected data
is "fake" data used for illustration), see the notes above regarding network
port requirements.

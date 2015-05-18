A Web Server App
============================
A simple node.js application to demonstrate some of the possibilities of using the board to serve data to a web page.

The sample app reads the value of the light sensor and serves it as JSON to a web page, that is also served by the app.

To run the app:

1/ Check the ip address at line 23 of main.js and set it the the ip address of your board if neccessary. It is the ip address
   you used to connect to your board.
2/ Start the program, then start a browser on your host. We used Chrome, but the code should work with any browser.
3/ Enter the URL http:/<ip address>:1337/lightsensor. A simple, and somewhat ugly thermometer will be displayed. 

This code has been deliberately kept simple. Obvious improvements would be:

1/ Change the way the thermometer is displayed. HTML5 has other ways to do this. There are also graphing packages that will no
  doubt produce a prettier graphical display.

2/ Improve the interpolation formula. The sample uses linear interpolation,  A higher order interpolation may be worthwhile.

3/ There are packages that support more sophisticated web server development. You could replace the very crude code in the
   example with such a package.

4/ The ip address could be automatically detected instead of being hard coded.

Intel(R) XDK 
-------------------------------------------
This template is part of the Intel(R) XDK IoT Edition. 
Download the Intel(R) XDK at http://software.intel.com/en-us/html5. To see the technical details of the sample, 
please visit the sample article page at https://software.intel.com/en-us/xdk-sample-creating-a-web-server


Important App Files
---------------------------
* main.js
* lightsensor.html
* package.json
* README.md

License Information Follows
---------------------------
Copyright (c) 2014, Intel Corporation. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, 
are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice, 
  this list of conditions and the following disclaimer.

- Redistributions in binary form must reproduce the above copyright notice, 
  this list of conditions and the following disclaimer in the documentation 
  and/or other materials provided with the distribution.

- Neither the name of Intel Corporation nor the names of its contributors 
  may be used to endorse or promote products derived from this software 
  without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, 
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE 
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE 
GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT 
LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT 
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

mraa
--------------------------------------------
* Included on the IoTDevkit Linux Image 

* source:  https://github.com/intel-iot-devkit/mraa
* license:  https://github.com/intel-iot-devkit/mraa/blob/9d488c8e869e59e1dff2c68218a8f38e9b959cd7/cmake/modules/LICENSE_1_0.txt

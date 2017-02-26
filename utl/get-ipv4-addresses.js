/*
 * Get local IPv4 address(es) for device on which this node module is running.
 *
 * Derived from <http://stackoverflow.com/a/8440736/2914328> by "nodyou"
 * Licensed under <https://creativecommons.org/licenses/by-sa/3.0/>
 * Attribution to <http://stackoverflow.com/users/1088990/nodyou>
 */

/*
 * Copyright (c) 2017, Paul Fischer, Intel Corporation
 *
 * This is a “BSD-3” license. <http://www.tldrlegal.com/l/bsd3>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of Intel Corporation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER
 * OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* spec jslint and jshint lines for desired JavaScript linting */
/* see http://www.jslint.com/help.html and http://jshint.com/docs */
/* jslint node:true */
/* jshint unused:true */

"use strict" ;



/**
 * Get an array of network interfaces from the built-in os object and search
 * that array for all external IPv4 addresses. Return an array of strings
 * containing all the IPv4 addresses found (in std IPv4 address dot format).
 *
 * Returns:
 *
 * Element 0 in the array contains the number of external IPv4 interfaces
 * found. It is followed by two-item arrays containing a string with the name
 * of the interface (which may be device and/or OS-specific) and the IPv4
 * address (as a string) associated with that interface. It is possible to see
 * multiple IPv4 addresses associated with a named interface.
 *
 * @function
 * @return {Array} - array of string arrays!
 */

exports.getIPv4Addresses = function() {

    var total = 0 ;         // track how many external IPv4 interfaces we find
    var ipArray = [0] ;     // start with no external interfaces found
    var interfaces = require("os").networkInterfaces() ;

    Object.keys(interfaces).forEach(function(interfaceName) {
        interfaces[interfaceName].forEach(function(arrIface) {
            if( (arrIface.family !== "IPv4") || (arrIface.internal !== false) ) {
                // skip non-IPv4 addresses
                // skip internal (i.e. 127.0.0.1) addresses
                return ;
            }
            else {
                total++ ;       // found an external interface
                ipArray.push([interfaceName,arrIface.address]) ;
            }
        }) ;
    }) ;

    ipArray[0] = total ;
    return ipArray ;
} ;

(function(factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['forge', 'uuid'], factory);
    } else if (typeof exports === 'object') {
        var forge = typeof window !== 'undefined' && window.forge ? window.forge : require('node-forge');
        var nodeCrypto = typeof window !== 'undefined' ? undefined : require('crypto');
        module.exports = factory(forge, require('node-uuid'), nodeCrypto);
    }
})(function(forge, uuid, nodeCrypto) {
    'use strict';

    /**
     * Various utitity methods for crypto, encoding & decoding
     */
    var Util = function() {};

    /**
     * Generates a new RFC 4122 version 4 compliant random UUID
     */
    Util.prototype.UUID = function() {
        return uuid.v4();
    };

    /**
     * Generates a cryptographically secure random base64-encoded key or IV
     * @param keySize [Number] The size of the key in bits (e.g. 128, 256)
     * @return [String] The base64 encoded key/IV
     */
    Util.prototype.random = function(keySize) {
        var keyBase64, keyBuf;

        if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
            // browser if secure rng exists
            keyBuf = new Uint8Array(keySize / 8);
            window.crypto.getRandomValues(keyBuf);
            keyBase64 = window.btoa(this.uint8Arr2BinStr(keyBuf));
        } else if (nodeCrypto) {
            // node.js
            keyBuf = nodeCrypto.randomBytes(keySize / 8);
            keyBase64 = new Buffer(keyBuf).toString('base64');
        } else {
            // generate random bytes with fortuna algorithm from forge
            keyBase64 = window.btoa(forge.random.getBytesSync(keySize / 8));
        }

        return keyBase64;
    };

    /**
     * Generates a cryptographically secure random string
     * @param length [Number] The string length
     * @param chars [String] (optional) The base charset to pick from, defaults to uppercase alphanumeric
     * @return [String] The random string
     */
    Util.prototype.randomString = function(length, chars) {
        var result = '',
            binaryString;

        chars = chars || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
            // browser if secure rng exists
            var buf = new Uint8Array(length);
            window.crypto.getRandomValues(buf);
            binaryString = this.uint8Arr2BinStr(buf);
        } else if (nodeCrypto) {
            // node.js
            binaryString = new Buffer(nodeCrypto.randomBytes(length)).toString('binary');
        } else {
            // generate random bytes with fortuna algorithm from forge
            binaryString = forge.random.getBytesSync(length);
        }

        for (var i = 0; i < binaryString.length; i++) {
            result += chars[Math.floor(binaryString.charCodeAt(i) / 256 * chars.length)];
        }

        return result;
    };



    /**
     * Converts a binary String (e.g. from the FileReader Api) to an ArrayBuffer
     * @param str [String] a binary string with integer values (0..255) per character
     * @return [ArrayBuffer]
     */
    Util.prototype.binStr2ArrBuf = function(str) {
        var b = new ArrayBuffer(str.length);
        var buf = new Uint8Array(b);

        for (var i = 0, len = b.byteLength; i < len; i++) {
            buf[i] = str.charCodeAt(i);
        }

        return b;
    };

    /**
     * Converts an ArrayBuffer to a binary String. This is a slower alternative to
     * conversion with arrBuf2Blob -> blob2BinStr, since these use native apis,
     * but it can be used on browsers without the BlodBuilder Api
     * @param buf [ArrayBuffer]
     * @return [String] a binary string with integer values (0..255) per character
     */
    Util.prototype.arrBuf2BinStr = function(buf) {
        var b = new Uint8Array(buf);
        var str = '';

        for (var i = 0, len = b.length; i < len; i++) {
            str += String.fromCharCode(b[i]);
        }

        return str;
    };

    /**
     * Converts a UInt8Array to a binary String.
     * @param buf [UInt8Array]
     * @return [String] a binary string with integer values (0..255) per character
     */
    Util.prototype.uint8Arr2BinStr = function(buf) {
        var str = '';

        for (var i = 0, len = buf.length; i < len; i++) {
            str += String.fromCharCode(buf[i]);
        }

        return str;
    };

    /**
     * Converts a binary String (e.g. from the FileReader Api) to a UInt8Array
     * @param str [String] a binary string with integer values (0..255) per character
     * @return [UInt8Array]
     */
    Util.prototype.binStr2Uint8Arr = function(str) {
        var c, buf = new Uint8Array(str.length);

        for (var i = 0, len = buf.length; i < len; i++) {
            c = str.charCodeAt(i);
            buf[i] = (c & 0xff);
        }

        return buf;
    };

    /**
     * Convert a str to base64 in a browser and in node.js
     */
    Util.prototype.str2Base64 = function(str) {
        if (typeof window !== 'undefined' && window.btoa) {
            return window.btoa(str);
        } else if (typeof module !== 'undefined' && module.exports) {
            return new Buffer(str, 'binary').toString('base64');
        } else {
            return forge.util.encode64(str);
        }
    };

    /**
     * Convert a base64 encoded string in a browser and in node.js
     */
    Util.prototype.base642Str = function(str) {
        if (typeof window !== 'undefined' && window.atob) {
            return window.atob(str);
        } else if (typeof module !== 'undefined' && module.exports) {
            return new Buffer(str, 'base64').toString('binary');
        } else {
            return forge.util.decode64(str);
        }
    };

    /**
     * Convert a UTF-16 encoded string to UTF8
     * @param str [String] a UTF-16 encoded string
     */
    Util.prototype.encodeUtf8 = function(str) {
        return forge.util.encodeUtf8(str);
    };

    /**
     * Convert a UTF-8 encoded string to UTF-16
     * @param str [String] a UTF-8 encoded string
     */
    Util.prototype.decodeUtf8 = function(str) {
        return forge.util.decodeUtf8(str);
    };

    /**
     * Validate an email address. This regex is taken from:
     * http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
     */
    Util.prototype.validateEmailAddress = function(emailAddress) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(emailAddress);
    };

    return new Util();
});
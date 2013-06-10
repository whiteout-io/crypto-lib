/**
 * Node.js module for common crypto.
 *
 * Copyright 2013 Whiteout Networks GmbH.
 */

(function() {
	'use strict';

	function initModule(util, aes, rsa, cryptoBatch) {
		// export public api
		var cryptoLib = {};

		cryptoLib.util = util;
		cryptoLib.aes = aes;
		cryptoLib.rsa = rsa;
		cryptoLib.cryptoBatch = cryptoBatch;

		return cryptoLib;
	}

	if (typeof define !== 'undefined' && define.amd) {
		// AMD
		define(['cryptoLib/util', 'cryptoLib/aes-cbc', 'cryptoLib/rsa', 'cryptoLib/crypto-batch'], function(util, aes, rsa, cryptoBatch) {
			return initModule(util, aes, rsa, cryptoBatch);
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		// node.js
		var rsa = require('./src/rsa'),
			util = require('./src/util'),
			aes = require('./src/aes-cbc'),
			cryptoBatch = require('./src/crypto-batch');

		// export public api
		module.exports = initModule(util, aes, rsa, cryptoBatch);
	}

})();
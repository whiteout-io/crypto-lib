/**
 * Node.js module for common crypto.
 *
 * Copyright 2013 Whiteout Networks GmbH.
 */
(function() {
	'use strict';

	function initModule(exports, window, crypt, uuid, forge, Util, AesCBC, RSA, CryptoBatch) {
		// create and inject dependecies
		util = new Util(window, uuid, crypt),
		rsa = new RSA(forge, util),
		aes = new AesCBC(forge),
		cryptoBatch = new CryptoBatch(aes, rsa, util);

		// export public api
		exports.util = util;
		exports.aes = aes;
		exports.rsa = rsa;
		exports.cryptoBatch = cryptoBatch;
	}

	if (typeof module !== 'undefined' && module.exports) {
		// define node.js module
		var crypt = require('crypto'),
			node_uuid = require('node-uuid'),
			node_forge = require('node-forge'),
			RSA = require('./src/rsa'),
			Util = require('./src/util'),
			AesCBC = require('./src/aes-cbc'),
			CryptoBatch = require('./src/crypto-batch');

		// export public api
		initModule(module.exports, undefined, crypt, node_uuid, node_forge, Util, AesCBC, RSA, CryptoBatch);

	} else if (typeof window !== 'undefined') {
		// define browser module
		var lib = window.cryptoLib;
		initModule(lib, window, undefined, uuid, forge, lib.Util, lib.AesCBC, lib.RSA, lib.CryptoBatch);
	}

})();
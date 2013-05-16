/**
 * Node.js module for common crypto.
 *
 * Copyright 2013 Whiteout Networks GmbH.
 */
(function() {
	'use strict';

	// import dependecies
	var crypt = require('crypto'),
		uuid = require('node-uuid'),
		forge = require('node-forge'),
		RSA = require('./src/rsa'),
		Util = require('./src/util'),
		AesCBC = require('./src/aes-cbc'),
		CryptoBatch = require('./src/crypto-batch');

	// create and inject dependecies
	var util = new Util(undefined, uuid, crypt),
		rsa = new RSA(forge, util),
		aes = new AesCBC(forge),
		cryptoBatch = new CryptoBatch(aes, rsa, util);

	// export public api
	module.exports.util = util;
	module.exports.aes = aes;
	module.exports.rsa = rsa;
	module.exports.cryptoBatch = cryptoBatch;

})();
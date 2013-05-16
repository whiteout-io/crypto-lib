crypto-lib
==========

Common crypto module for node.js and the browser.

## Usage:

	var lib = require('crypto-lib');

	// generate RSA keypair
	lib.rsa.generateKeypair(1024);

	// package objects into batchable envelope format
	var envelopes = [{
		id: lib.util.UUID(),
		plaintext: 'Hello, World!',
		key: lib.util.random(128),
		iv: lib.util.random(128)
	}];

	// encrypt and sign using AES and RSA
	var encryptedList = lib.cryptoBatch.encryptListForUser(envelopes);

	// decrypt and verify using AES and RSA
	var decryptedList = lib.cryptoBatch.decryptListForUser(encryptedList);
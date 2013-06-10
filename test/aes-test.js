'use strict';

function doTests(assert, aes, util) {

	var aesTest = {
		keySize: 128,
		testMessage: 'Hello, World!'
	};

	describe("AES Crypto", function() {

		describe("CBC mode", function() {
			it('should work', function() {
				var plaintext = aesTest.testMessage;
				var key = util.random(aesTest.keySize);
				var iv = util.random(aesTest.keySize);
				assert.ok(key, 'Key: ' + key);
				assert.equal(util.base642Str(key).length * 8, aesTest.keySize, 'Keysize ' + aesTest.keySize);

				var ciphertext = aes.encrypt(plaintext, key, iv);
				assert.ok(ciphertext, 'Ciphertext lenght: ' + ciphertext.length);

				var decrypted = aes.decrypt(ciphertext, key, iv);
				assert.equal(decrypted, plaintext, 'Decryption correct' + decrypted);
			});
		});

	});
}

if (typeof define !== 'undefined' && define.amd) {
	define(['chai', 'cryptoLib/aes-cbc', 'cryptoLib/util'], function(chai, aes, util) {
		doTests(chai.assert, aes, util);
	});

} else if (typeof module !== 'undefined' && module.exports) {
	var aes = require('../src/aes-cbc');
	var util = require('../src/util');
	doTests(require('chai').assert, aes, util);
}
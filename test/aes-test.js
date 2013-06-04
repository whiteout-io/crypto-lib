'use strict';

var assert = (typeof chai !== 'undefined') ? chai.assert : require('chai').assert,
	lib = (typeof cryptoLib !== 'undefined') ? cryptoLib : require('../crypto-lib');

var aesTest = {
	keySize: 128,
	testMessage: 'Hello, World!'
};

describe("AES Crypto", function() {

	describe("CBC mode", function() {
		it('should work', function() {
			var plaintext = aesTest.testMessage;
			var key = lib.util.random(aesTest.keySize);
			var iv = lib.util.random(aesTest.keySize);
			assert.ok(key, 'Key: ' + key);
			assert.equal(lib.util.base642Str(key).length * 8, aesTest.keySize, 'Keysize ' + aesTest.keySize);

			var ciphertext = lib.aes.encrypt(plaintext, key, iv);
			assert.ok(ciphertext, 'Ciphertext lenght: ' + ciphertext.length);

			var decrypted = lib.aes.decrypt(ciphertext, key, iv);
			assert.equal(decrypted, plaintext, 'Decryption correct' + decrypted);
		});
	});

});
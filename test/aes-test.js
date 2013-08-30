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

		describe("HMAC using SHA-256", function() {
			it('1 KB part should work', function() {
				var input = util.random(1024 * 8);
				var key = util.random(aesTest.keySize);
				assert.ok(input, 'Input: ' + input);
				assert.ok(key, 'Key: ' + key);
				assert.equal(util.base642Str(key).length * 8, aesTest.keySize, 'Keysize ' + aesTest.keySize);

				var hmac1 = aes.hmac([input], key);
				var hmac2 = aes.hmac([input], key);
				assert.ok(hmac1, 'Hmac: ' + hmac1);
				assert.ok(hmac2, 'Hmac: ' + hmac2);
				assert.equal(hmac1, hmac2);
			});

			it('10 * 1 KB part should work', function() {
				var parts1 = [],
					parts2 = [],
					input;
				for (var i = 0; i < 10; i++) {
					input = util.random(1024 * 8);
					parts1.push(input);
					parts2.push(input);
				}
				var key = util.random(aesTest.keySize);
				assert.ok(parts1[0], 'Input: ' + parts1[0]);
				assert.ok(parts2[0], 'Input: ' + parts2[0]);
				assert.ok(key, 'Key: ' + key);
				assert.equal(util.base642Str(key).length * 8, aesTest.keySize, 'Keysize ' + aesTest.keySize);

				var hmac1 = aes.hmac(parts1, key);
				var hmac2 = aes.hmac(parts2, key);
				assert.ok(hmac1, 'Hmac: ' + hmac1);
				assert.ok(hmac2, 'Hmac: ' + hmac2);
				assert.equal(hmac1, hmac2);
			});

			it('10 * 1 KB part should fail', function() {
				var parts1 = [],
					parts2 = [];
				for (var i = 0; i < 10; i++) {
					parts1.push(util.random(1024 * 8));
					parts2.push(util.random(1024 * 8));
				}
				var key = util.random(aesTest.keySize);
				assert.ok(parts1[0], 'Input: ' + parts1[0]);
				assert.ok(parts2[0], 'Input: ' + parts2[0]);
				assert.ok(key, 'Key: ' + key);
				assert.equal(util.base642Str(key).length * 8, aesTest.keySize, 'Keysize ' + aesTest.keySize);

				var hmac1 = aes.hmac(parts1, key);
				var hmac2 = aes.hmac(parts2, key);
				assert.ok(hmac1, 'Hmac: ' + hmac1);
				assert.ok(hmac2, 'Hmac: ' + hmac2);
				assert.ok(hmac1 !== hmac2);
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
var assert = require('assert'),
	lib = require('../index');

var aes_test = {
	keySize: 128,
	test_message: 'Hello, World!'
};

describe("AES Crypto", function() {

	describe("CBC mode", function() {
		it('should work', function() {
			var plaintext = aes_test.test_message;
			var key = lib.util.random(aes_test.keySize);
			var iv = lib.util.random(aes_test.keySize);
			assert.ok(key, 'Key: ' + key);
			assert.equal(lib.util.base642Str(key).length * 8, aes_test.keySize, 'Keysize ' + aes_test.keySize);

			var ciphertext = lib.aes.encrypt(plaintext, key, iv);
			assert.ok(ciphertext, 'Ciphertext lenght: ' + ciphertext.length);

			var decrypted = lib.aes.decrypt(ciphertext, key, iv);
			assert.equal(decrypted, plaintext, 'Decryption correct' + decrypted);
		});
	});

});
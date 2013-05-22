var assert = (typeof chai !== 'undefined') ? chai.assert : require('chai').assert,
	lib = (typeof cryptoLib !== 'undefined') ? cryptoLib : require('../crypto-lib');

var lib_test = {
	aesKeysize: 128,
	rsaKeysize: 512
};

describe('Crypto Lib Api Test', function() {
	this.timeout(20000);

	describe("Generate RSA Keypair", function() {
		it('return return a valid keypair', function(done) {
			lib.rsa.generateKeypair(lib_test.rsaKeysize, function(err) {
				assert.ok(!err);
				assert.ok(lib.rsa.exportKeys().pubkeyPem);
				done();
			});
		});
	});

	describe("En/Decrypt for User", function() {
		it('return decrypt the given plaintext', function() {

			var envelopes = [],
				msg = 'Hello, World!';

			// package objects into batchable envelope format
			var envelope = {
				id: lib.util.UUID(),
				plaintext: msg,
				key: lib.util.random(lib_test.aesKeysize),
				iv: lib.util.random(lib_test.aesKeysize)
			};
			envelopes.push(envelope);

			// encrypt
			var encryptedList = lib.cryptoBatch.encryptListForUser(envelopes);
			assert.ok(encryptedList);
			assert.equal(encryptedList.length, 1);

			// decrypt
			var decryptedList = lib.cryptoBatch.decryptListForUser(encryptedList);
			assert.equal(msg, decryptedList[0]);

		});
	});

});
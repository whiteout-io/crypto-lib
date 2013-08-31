'use strict';

function doTests(assert, lib) {

	var libTest = {
		aesKeysize: 128,
		rsaKeysize: 512
	};

	describe('Crypto Lib Api Test', function() {
		this.timeout(20000);

		describe("Generate RSA Keypair", function() {
			it('should return a valid keypair', function(done) {
				lib.rsa.generateKeypair(libTest.rsaKeysize, function(err, keypair) {
					assert.ok(!err);
					assert.ok(keypair.pubkeyPem);
					done();
				});
			});
		});

		describe("En/Decrypt list for User", function() {
			it('should decrypt the given plaintext', function() {

				var msg = 'Hello, World!',
					exported = lib.rsa.exportKeys(),
					publicKey = {
						_id: exported._id,
						publicKey: exported.pubkeyPem
					},
					privateKey = {
						_id: exported._id,
						privateKey: exported.privkeyPem
					};

				// package into batchable envelope for encryption
				var envelopes = [{
					id: lib.util.UUID(),
					plaintext: msg,
					key: lib.util.random(libTest.aesKeysize),
					iv: lib.util.random(libTest.aesKeysize),
					receiverPk: publicKey._id
				}];

				// encrypt
				var encryptedList = lib.cryptoBatch.encryptListForUser(envelopes, [publicKey], privateKey);
				assert.equal(encryptedList.length, 1);
				var encryptedItem = encryptedList[0];
				assert.ok(encryptedItem);
				assert.ok(encryptedItem.id);
				assert.ok(encryptedItem.ciphertext);
				assert.ok(encryptedItem.iv);
				assert.ok(encryptedItem.encryptedKey);
				assert.ok(encryptedItem.senderPk);
				assert.ok(encryptedItem.signature);
				assert.ok(!encryptedItem.plaintext);
				assert.ok(!encryptedItem.key);
				assert.ok(!encryptedItem.receiverPk);

				// decrypt
				var decryptedList = lib.cryptoBatch.decryptListForUser(encryptedList, [publicKey], privateKey);
				assert.equal(msg, decryptedList[0]);

			});
		});

		describe("En/Decrypt list symmetrically", function() {
			it('should decrypt the given plaintext', function() {

				var msg = 'Hello, World!';

				// package into batchable envelope for encryption
				var envelopes = [{
					id: lib.util.UUID(),
					plaintext: msg,
					key: lib.util.random(libTest.aesKeysize),
					iv: lib.util.random(libTest.aesKeysize)
				}];

				var secretKey = envelopes[0].key;

				// encrypt
				var encryptedList = lib.cryptoBatch.authEncryptList(envelopes);
				assert.equal(encryptedList.length, 1);
				var encryptedItem = encryptedList[0];
				assert.ok(encryptedItem);
				assert.ok(encryptedItem.id);
				assert.ok(encryptedItem.ciphertext);
				assert.ok(encryptedItem.iv);
				assert.ok(encryptedItem.hmac);
				assert.ok(!encryptedItem.plaintext);
				assert.ok(!encryptedItem.key);

				// decrypt
				assert.ok(secretKey);
				var decryptedList = lib.cryptoBatch.authDecryptList(encryptedList, [secretKey]);
				assert.equal(msg, decryptedList[0]);

			});
		});

		describe("En/Decrypt keys and items seperately for User", function() {
			it('should decrypt the given plaintext', function() {

				var msg = 'Hello, World!',
					exported = lib.rsa.exportKeys(),
					publicKey = {
						_id: exported._id,
						publicKey: exported.pubkeyPem
					},
					privateKey = {
						_id: exported._id,
						privateKey: exported.privkeyPem
					},
					aesKey = lib.util.random(libTest.aesKeysize);

				// package into batchable envelope for encryption
				var envelopes = [{
					id: lib.util.UUID(),
					plaintext: msg,
					key: lib.util.random(libTest.aesKeysize),
					iv: lib.util.random(libTest.aesKeysize),
					receiverPk: publicKey._id
				}];

				// encrypt
				var encryptedList = lib.cryptoBatch.encryptListForUser(envelopes, [publicKey], privateKey);
				assert.ok(encryptedList);
				assert.equal(encryptedList.length, 1);

				// re-encrypt item keys
				var encryptedKeyList = lib.cryptoBatch.reencryptListKeysForUser(encryptedList, [publicKey], privateKey, aesKey);
				// decryp keys and items symmetrically
				var decryptedList = lib.cryptoBatch.decryptKeysAndList(encryptedKeyList, aesKey);
				assert.equal(msg, decryptedList[0]);

			});
		});

	});
}

if (typeof define !== 'undefined' && define.amd) {
	define(['chai', 'cryptoLib/../crypto-lib'], function(chai, cryptoLib) {
		doTests(chai.assert, cryptoLib);
	});
} else if (typeof module !== 'undefined' && module.exports) {
	var lib = require('../crypto-lib');
	doTests(require('chai').assert, lib);
}
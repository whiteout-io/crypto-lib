'use strict';

function doTests(assert, rsa, util) {

	var rsaTest = {
		keySize: 512,
		rsa: rsa,
		testMessage: '06a9214036b8a15b512e03d534120006'
	};

	describe("RSA Crypto", function() {
		this.timeout(20000);

		describe("Generate keypair", function() {
			it('should work', function(done) {
				rsa.generateKeypair(rsaTest.keySize, function(err, keypair) {
					assert.ok(!err);
					assert.ok(keypair._id);
					assert.ok(keypair.pubkeyPem.indexOf('-----BEGIN PUBLIC KEY-----') === 0, keypair.pubkeyPem);
					assert.ok(keypair.privkeyPem.indexOf('-----BEGIN RSA PRIVATE KEY-----') === 0, keypair.privkeyPem);

					rsaTest.keypair = keypair;

					done();
				});
			});
		});

		describe("Export keys", function() {
			it('should return the generated keypair', function() {
				var exported = rsa.exportKeys();
				assert.deepEqual(exported, rsaTest.keypair);
			});
		});

		describe("Init", function() {
			it('should be able to set public key', function() {
				rsa.init(rsaTest.keypair.pubkeyPem);
				var exported = rsa.exportKeys();
				assert.deepEqual(exported, rsaTest.keypair);
			});
			it('should be able to set private key', function() {
				rsa.init(null, rsaTest.keypair.privkeyPem);
				var exported = rsa.exportKeys();
				assert.deepEqual(exported, rsaTest.keypair);
			});
		});

		describe("Encrypt", function() {
			it('should work', function() {
				rsaTest.ct = rsa.encrypt(rsaTest.testMessage);
				assert.ok(rsaTest.ct);
			});
		});

		describe("Decrypt", function() {
			it('should work', function() {
				var pt = rsa.decrypt(rsaTest.ct);
				assert.equal(pt, rsaTest.testMessage);
			});
		});

		describe("Sign", function() {
			it('should work', function() {
				rsaTest.sig = rsa.sign([util.str2Base64('iv'), util.str2Base64(rsaTest.testMessage)]);
				assert.ok(rsaTest.sig);
			});
		});

		describe("Verify", function() {
			it('should work', function() {
				var res = rsa.verify([util.str2Base64('iv'), util.str2Base64(rsaTest.testMessage)], rsaTest.sig);
				assert.ok(res);
			});
		});

	});
}

if (typeof define !== 'undefined' && define.amd) {
	define(['chai', 'cryptoLib/rsa', 'cryptoLib/util'], function(chai, rsa, util) {
		doTests(chai.assert, rsa, util);
	});

} else if (typeof module !== 'undefined' && module.exports) {
	var rsa = require('../src/rsa');
	var util = require('../src/util');
	doTests(require('chai').assert, rsa, util);
}
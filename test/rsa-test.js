'use strict';

var assert = (typeof chai !== 'undefined') ? chai.assert : require('chai').assert,
	lib = (typeof cryptoLib !== 'undefined') ? cryptoLib : require('../crypto-lib');

var rsaTest = {
	keySize: 512,
	rsa: lib.rsa,
	testMessage: '06a9214036b8a15b512e03d534120006'
};

describe("RSA Crypto", function() {
	this.timeout(20000);

	describe("Generate keypair", function() {
		it('should work', function(done) {
			rsaTest.rsa.generateKeypair(rsaTest.keySize, function(err, keypair) {
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
			var exported = rsaTest.rsa.exportKeys();
			assert.deepEqual(exported, rsaTest.keypair);
		});
	});

	describe("Init", function() {
		it('should be able to set public key', function() {
			rsaTest.rsa.init(rsaTest.keypair.pubkeyPem);
			var exported = rsaTest.rsa.exportKeys();
			assert.deepEqual(exported, rsaTest.keypair);
		});
		it('should be able to set private key', function() {
			rsaTest.rsa.init(null, rsaTest.keypair.privkeyPem);
			var exported = rsaTest.rsa.exportKeys();
			assert.deepEqual(exported, rsaTest.keypair);
		});
	});

	describe("Encrypt", function() {
		it('should work', function() {
			rsaTest.ct = rsaTest.rsa.encrypt(rsaTest.testMessage);
			assert.ok(rsaTest.ct);
		});
	});

	describe("Decrypt", function() {
		it('should work', function() {
			var pt = rsaTest.rsa.decrypt(rsaTest.ct);
			assert.equal(pt, rsaTest.testMessage);
		});
	});

	describe("Sign", function() {
		it('should work', function() {
			rsaTest.sig = rsaTest.rsa.sign([lib.util.str2Base64('iv'), lib.util.str2Base64(rsaTest.testMessage)]);
			assert.ok(rsaTest.sig);
		});
	});

	describe("Verify", function() {
		it('should work', function() {
			var res = rsaTest.rsa.verify([lib.util.str2Base64('iv'), lib.util.str2Base64(rsaTest.testMessage)], rsaTest.sig);
			assert.ok(res);
		});
	});

});
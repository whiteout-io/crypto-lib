var assert = (typeof chai !== 'undefined') ? chai.assert : require('chai').assert,
	lib = (typeof cryptoLib !== 'undefined') ? cryptoLib : require('../crypto-lib');

var rsa_test = {
	keySize: 512,
	rsa: lib.rsa,
	test_message: '06a9214036b8a15b512e03d534120006'
};

describe("RSA Crypto", function() {
	this.timeout(20000);

	describe("Generate keypair", function() {
		it('should work', function(done) {
			rsa_test.rsa.generateKeypair(rsa_test.keySize, function(err, keypair) {
				assert.ok(!err);
				assert.ok(keypair._id);
				assert.ok(keypair.pubkeyPem.indexOf('-----BEGIN PUBLIC KEY-----') === 0, keypair.pubkeyPem);
				assert.ok(keypair.privkeyPem.indexOf('-----BEGIN RSA PRIVATE KEY-----') === 0, keypair.privkeyPem);

				rsa_test.keypair = keypair;

				done();
			});
		});
	});

	describe("Export keys", function() {
		it('should return the generated keypair', function() {
			var exported = rsa_test.rsa.exportKeys();
			assert.deepEqual(exported, rsa_test.keypair);
		});
	});

	describe("Init", function() {
		it('should be able to set public key', function() {
			rsa_test.rsa.init(rsa_test.keypair.pubkeyPem);
			var exported = rsa_test.rsa.exportKeys();
			assert.deepEqual(exported, rsa_test.keypair);
		});
		it('should be able to set private key', function() {
			rsa_test.rsa.init(null, rsa_test.keypair.privkeyPem);
			var exported = rsa_test.rsa.exportKeys();
			assert.deepEqual(exported, rsa_test.keypair);
		});
	});

	describe("Encrypt", function() {
		it('should work', function() {
			rsa_test.ct = rsa_test.rsa.encrypt(rsa_test.test_message);
			assert.ok(rsa_test.ct);
		});
	});

	describe("Decrypt", function() {
		it('should work', function() {
			var pt = rsa_test.rsa.decrypt(rsa_test.ct);
			assert.equal(pt, rsa_test.test_message);
		});
	});

	describe("Sign", function() {
		it('should work', function() {
			rsa_test.sig = rsa_test.rsa.sign([lib.util.str2Base64('iv'), lib.util.str2Base64(rsa_test.test_message)]);
			assert.ok(rsa_test.sig);
		});
	});

	describe("Verify", function() {
		it('should work', function() {
			var res = rsa_test.rsa.verify([lib.util.str2Base64('iv'), lib.util.str2Base64(rsa_test.test_message)], rsa_test.sig);
			assert.ok(res);
		});
	});

});
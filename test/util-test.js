'use strict';

function doTests(assert, util) {

	describe('Util', function() {

		describe("Generate UUID", function() {
			it('should work', function() {
				var id = util.UUID();
				assert.ok(id, "UUID: " + id);
				assert.ok(id.length === 36, "UUID length");
			});
		});

		describe("Generate Random Value", function() {
			it('should work', function() {
				var base64 = util.random(128);
				var str = util.base642Str(base64);
				assert.ok(base64, "Random base64: " + base64);
				assert.ok(str, "Random binary string: " + str);
				assert.ok(str.length === 16, "Random length");
			});
		});

		describe("Generate Random String", function() {
			it('should work with default charset', function() {
				var charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
				var rnd = util.randomString(2000);
				var i = 2000;
				while(i--) {
					assert.ok(charset.indexOf(rnd.charAt(i)) > -1, "charset invalid");
				}
				assert.ok(rnd.length === 2000, "Random length");
			});

			it('should work with custom charset', function() {
				var charset = 'asdWBN123@#$%&0!{}~/';
				var rnd = util.randomString(2000, charset);
				var i = 2000;
				while(i--) {
					assert.ok(charset.indexOf(rnd.charAt(i)) > -1, "charset invalid");
				}
				assert.ok(rnd.length === 2000, "Random length");
			});
		});

		describe("String -> Uint8Array -> String", function() {
			it('should work', function() {
				var input = "asdf";
				var buf = util.binStr2Uint8Arr(input);
				assert.ok(buf);

				// test slow conversion in js
				var binStr = util.uint8Arr2BinStr(buf);
				assert.ok(binStr);
				assert.equal(binStr, input);
			});
		});

		describe("validateEmailAddress", function() {
			it('should work', function() {
				var input = "test@example.com";
				var res = util.validateEmailAddress(input);
				assert.ok(res);
			});

			it('should fail', function() {
				var input = "testexample.com";
				var res = util.validateEmailAddress(input);
				assert.ok(!res);
			});

			it('should fail', function() {
				var input = "test@examplecom";
				var res = util.validateEmailAddress(input);
				assert.ok(!res);
			});

			it('should fail', function() {
				var input = "testexamplecom";
				var res = util.validateEmailAddress(input);
				assert.ok(!res);
			});
		});

		describe("Base64 conversion", function() {
			it('should work', function() {
				var input = "asdf";
				var outout = util.str2Base64(input);
				assert.equal(outout, 'YXNkZg==');

				var back = util.base642Str(outout);
				assert.equal(input, back);
			});
		});

		describe("UTF-8/UTF-16 conversion", function() {
			it('should work', function() {
				var input = '✓ à la mode';
				var outout = util.encodeUtf8(input);
				assert.ok(outout);

				var back = util.decodeUtf8(outout);
				assert.equal(input, back);
			});
		});

	});
}

if (typeof define !== 'undefined' && define.amd) {
	define(['chai', 'cryptoLib/util'], function(chai, util) {
		return doTests(chai.assert, util);
	});

} else if (typeof module !== 'undefined' && module.exports) {
	var util = require('../index').util;
	doTests(require('chai').assert, util);
}
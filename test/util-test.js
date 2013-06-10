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

		describe("Parse Date", function() {
			it('should work', function() {
				var str = '1900-01-31 18:17:53';
				var date = util.parseDate(str);
				var formated = util.formatDate(date);
				assert.equal(formated, str, "Date: " + date);
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
	});
}

if (typeof define !== 'undefined' && define.amd) {
	define(['chai', 'cryptoLib/util'], function(chai, util) {
		return doTests(chai.assert, util);
	});

} else if (typeof module !== 'undefined' && module.exports) {
	var util = require('../src/util');
	doTests(require('chai').assert, util);
}
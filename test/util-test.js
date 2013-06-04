'use strict';

var assert = (typeof chai !== 'undefined') ? chai.assert : require('chai').assert,
	lib = (typeof cryptoLib !== 'undefined') ? cryptoLib : require('../crypto-lib');

describe('Util', function() {

	describe("Generate UUID", function() {
		it('should work', function() {
			var id = lib.util.UUID();
			assert.ok(id, "UUID: " + id);
			assert.ok(id.length === 36, "UUID length");
		});
	});

	describe("Generate Random Value", function() {
		it('should work', function() {
			var base64 = lib.util.random(128);
			var str = lib.util.base642Str(base64);
			assert.ok(base64, "Random base64: " + base64);
			assert.ok(str, "Random binary string: " + str);
			assert.ok(str.length === 16, "Random length");
		});
	});

	describe("Parse Date", function() {
		it('should work', function() {
			var str = '1900-01-31 18:17:53';
			var date = lib.util.parseDate(str);
			var formated = lib.util.formatDate(date);
			assert.equal(formated, str, "Date: " + date);
		});
	});

	describe("String -> Uint8Array -> String", function() {
		it('should work', function() {
			var input = "asdf";
			var buf = lib.util.binStr2Uint8Arr(input);
			assert.ok(buf);

			// test slow conversion in js
			var binStr = lib.util.uint8Arr2BinStr(buf);
			assert.ok(binStr);
			assert.equal(binStr, input);
		});
	});

});
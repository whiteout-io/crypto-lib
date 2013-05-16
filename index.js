/**
 * Node.js module for common crypto.
 * Copyright 2013 Whiteout Networks GmbH.
 *
 * Based on the Node.js module for Forge.
 * https://github.com/digitalbazaar/forge
 * Copyright 2011-2013 Digital Bazaar, Inc.
 */
(function() {
	'use strict';

	var deps = [
		'./src/aes-cbc',
		'./src/rsa',
		'./src/util',
		'./src/crypto-batch'];

	var cjsDefine = null;
	if (typeof define !== 'function') {
		// CommonJS -> AMD
		if (typeof module === 'object' && module.exports) {
			cjsDefine = function(ids, factory) {
				module.exports = factory.apply(null, ids.map(function(id) {
					return require(id);
				}));
			};
		}
		// <script>
		else {
			if (typeof whiteout === 'undefined') {
				whiteout = {};
			}
			initModule(whiteout);
		}
	}
	// AMD
	if (cjsDefine || typeof define === 'function') {
		// define module AMD style
		(cjsDefine || define)(deps, function() {
			var whiteout = {};
			var mods = Array.prototype.slice.call(arguments);
			for (var i = 0; i < mods.length; ++i) {
				mods[i](whiteout);
			}
			return whiteout;
		});
	}

})();
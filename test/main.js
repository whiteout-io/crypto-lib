'use strict';

// get require.js deps
require.config({
	baseUrl: 'lib',
	paths: {
		cryptoLib: '../../src',
		js: '../',
		test: '../',
		underscore: 'underscore-min',
		forge: 'forge.min'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		forge: {
			exports: 'forge'
		}
	}
});

require(['require'], function(require) {

	mocha.setup('bdd');

	require(['test/aes-test'], function() {
		require(['test/util-test'], function() {
			mocha.run();
		});
	});
});
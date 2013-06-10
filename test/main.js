'use strict';

window.app = {
	config: {
		workerPath: '/'
	}
};
// disable web worker
window.Worker = undefined;

// get require.js deps
require.config({
	baseUrl: 'lib',
	paths: {
		cryptoLib: '../../src',
		test: '../',
		underscore: 'underscore-min'
	}
});

require(['require'], function(require) {

	mocha.setup('bdd');

	require(['test/rsa-test'], function() {
		require(['test/aes-test'], function() {
			require(['test/util-test'], function() {
				require(['test/lib-test'], function() {
					mocha.run();
				});
			});
		});
	});
});
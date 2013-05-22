module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		connect: {
			test: {
				options: {
					port: 8780,
					base: '.'
				}
			}
		},

		jshint: {
			all: ['Gruntfile.js', 'src/*.js']
		},

		mocha: {
			all: {
				src: ['test/index.html'],
				options: {
					// Select a Mocha reporter - http://visionmedia.github.com/mocha/#reporters
					reporter: 'Spec'
				}
			}
		}
	});

	// Load the plugin(s)
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha');

	// Default task(s).
	grunt.registerTask('dev', ['connect:test:keepalive']);
	grunt.registerTask('test', ['jshint', 'mocha']);

};
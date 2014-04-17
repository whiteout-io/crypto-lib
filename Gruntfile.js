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
			all: ['Gruntfile.js', 'crypto-lib.js', 'src/**/*.js', 'test/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		mocha: {
			all: {
				src: ['test/index.html'],
				options: {
					reporter: 'Spec'
				}
			}
		},

		mochaTest: {
			all: {
				options: {
					reporter: 'spec'
				},
				src: ['test/*-test.js']
			}
		},
	});

	// Load the plugin(s)
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-mocha-test');

	// Default task(s).
	grunt.registerTask('dev', ['connect:test:keepalive']);
	grunt.registerTask('test', ['jshint', 'mocha', 'mochaTest']);

};
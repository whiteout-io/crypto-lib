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
		}
	});

	// Load the plugin(s)
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Default task(s).
	grunt.registerTask('dev', ['connect:test:keepalive']);
	grunt.registerTask('test', ['jshint', 'connect:test']);

};
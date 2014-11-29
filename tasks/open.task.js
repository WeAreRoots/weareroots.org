/**
 * @fileOverview The open task operation.
 */
module.exports = function(grunt) {
  // Define the webserver port during development.
  var develPort = '3006';

  grunt.config('open', {
    server: {
      path: 'http://localhost:' + develPort
    }
  });
};

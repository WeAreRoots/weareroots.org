/**
 * @fileOverview The watch task operation.
 */
module.exports = function(grunt) {
  grunt.config('watch', {
    frontend: {
      options: {
        livereload: true
      },
      files: [
        // triggering livereload when the .css file is updated
        // (compared to triggering when sass completes)
        // allows livereload to not do a full page refresh
        'front/static/styles/*.css',
        'front/templates/**/*.jade',
        'front/static/scripts/*.js',
        'front/static/*.js',
        'front/static/img/**/*'
      ]
    },
    browserify: {
      files: [
        'front/js-city/**/*.js'
      ],
      tasks: [
        'browserify:city',
      ],
    },
    stylesMain: {
      files: [
        'front/styles/**/*.scss'
      ],
      tasks: [
        'sass:main',
        'cssmin:main'
      ]
    },
    stylesCity: {
      files: [
        'front/styles-city/**/*.scss'
      ],
      tasks: [
        'sass:cities',
        'cssmin:cities'
      ]
    },
    web: {
      files: [
        'backend/**/*.js',
        'config/*',
        'test/**/*.js',
      ],
      tasks: [
        'express:web'
      ],
      options: {
        nospawn: true, // Without this option specified express won't be reloaded
      }
    },
  });
};

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    babel: {
        options: {
            sourceMap: false,
            presets: ['es2015']
        },
        dist: {
            files: [{
              expand: true,
              cwd: 'js/src',
              src: ['*.js'],
              dest: 'js/dist',
              ext: '.js',
              extDot: 'first'
            }]
        }
    },
    watch: {
    babel: {
      // We watch and compile sass files as normal but don't live reload here
      files: ['js/src/*.js'],
      tasks: ['babel'],
    }
  }
});

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['babel']);
};

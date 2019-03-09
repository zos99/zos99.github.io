module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      dist:
        {
          src: ['styles/variables.scss','styles/fonts.scss','styles/mixins.scss','styles/variables.scss','styles/style.scss', 'styles/mediaquares.scss'],
          dest: 'styles/main.scss'
        }
      },
    uglify: {
    dist: {
      src: ['js/src/*.js'],
      dest: 'js/dist/script.min.js'
    }
  },

  watch: {
    sass: {
      files: ['styles/*.scss'],
      tasks: ['concat','sass'],
    }
  }
});

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat','uglify','sass']);
};

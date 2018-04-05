module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
     dist:
      {
        src: ['fonts.scss','styles/mixins.scss','styles/reset.scss', 'styles/style.scss','styles/mediaquares.scss'],
        dest: 'styles/main.scss'
      },
    },
    uglify: {
      options: {
        separator: ';',
        stripBanners: true
      },
      my_target: {
        files: {
          'js/dest/script.min.js': ['js/src/script.js']
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'styles',
          src: ['main.scss'],
          dest: 'css',
          ext: '.css'
        },
        {
        expand: true,
        cwd: 'styles',
        src: ['style_ie_8.scss'],
        dest: 'css',
        ext: '.css'
      }
    ]
  }
},
watch: {
  sass: {
    files: ['styles/*.scss'],
    tasks: ['concat','sass']
  }
 }
});
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('default', ['concat','uglify','sass']);
};

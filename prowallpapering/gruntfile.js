module.exports = function(grunt) {

   grunt.initConfig({
         concat: {
            dist: {
               src: ['styles/variables.scss', 'styles/fonts.scss', 'styles/mixins.scss', 'styles/reset.scss', 'styles/style.scss', 'styles/header.scss', 'styles/index-hero.scss'],
               dest: 'styles/main.scss'
            }
         },
         uglify: {
            dist: {
               src: ['js/src/*.js'],
               dest: 'js/dist/script.min.js'
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
               tasks: ['concat', 'sass'],
            }
         },
         autoprefixer: {
            options: {
               browsers: ["last 2 versions", "Firefox ESR", "Opera 12.1"],
            },
            files: {
               "css/main.css": ["css/main.css"]
            }
         },

         uglify: {
            dist: {
               files: {
                  'js/script.min.js': ['js/script.js']
               }
            }
         },
         critical: {
            dist: {
               options: {
                  base: './'
               },
               // The source file
               src: 'index.html',
               // The destination file
               dest: 'result.html'
            }
         },
         px_to_rem: {
            dist: {
               options: {
                  base: 16,
                  fallback: false,
                  fallback_existing_rem: false,
                  ignore: [],
                  map: false
               },
               files: {
                  'dest/style.css': ['src/style.css']
               }
            }
         }
      }),

      grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-sass');
   grunt.loadNpmTasks('grunt-autoprefixer');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-critical');
   grunt.registerTask('default', ['concat', 'uglify', 'sass', 'grunt-autoprefixer', 'critical']);
};

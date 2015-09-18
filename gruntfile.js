// Обязательная обёртка
module.exports = function(grunt) {


    // Задачи
    grunt.initConfig({

        serve: {
            options: {
                port: 9000
            }
        },

        // проверка кода javascript с помощью утилиты jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'app/static/js/{,*/}*.js'
              ]
        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.


        // Склеиваем
        concat: {
            main: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'app/static/js/**/**/***.js',
                    'app/static/js/{,*/}*.js'
                ],
                dest: '.tmp/js/scripts.js'
            }
        },

        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/js/',
                    src: '*.js',
                    dest: 'static/js/'
                }]
            }
        },


        // Сжимаем
        uglify: {
            options: {
                mangle: false
            },
            main: {
                files: {
                    // Результат задачи concat
                    'static/js/scripts.min.js': '<%= concat.main.dest %>'
                }
            }
        },

        // copy files from .tmp/ to static/
        sync: {
            main: {
                files: [{
                    cwd: '.tmp/js/',
                    src: [
                        '*.js'
                        //'**', /* Include everything */
                        //'!**/*.txt' /* but exclude txt files */
                    ],
                    dest: 'static/js/'
                }],
                //pretend: true, // Don't do any IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much.
                verbose: true // Display log messages when copying files
            }
        },

        //sass: {
        //    dist: {
        //        options: {
        //            // loadPath: require('node-bourbon').with('other/path', 'another/path')
        //            // - or -
        //            loadPath: require('node-bourbon').includePaths
        //        },
        //        files: {
        //            '.tmp/css/template.css': 'app/static/sass/importer.sass'
        //        }
        //    }
        //},

        sass: {
            options: {
                //sourceMap: true,
                includePaths: require('node-bourbon').includePaths
            },
            dist: {
                files: {
                    '.tmp/css/template.css': 'app/static/sass/importer.sass'
                }
            }
        },


        // Склеиваем css
        concat_css: {
            options: {
              // Task-specific options go here.
            },
            all: {
              src: [
                  "bower_components/geekon/dist/geekon.min.css",
                  ".tmp/css/*.css"

              ],
              dest: "static/css/template.css"
            }
          },

        cssmin: {
          minify: {
            expand: true,
            cwd: 'static/css',
            src: ['*.css', '!*.min.css'],
            dest: 'static/css',
            ext: '.min.css'
          }
        },

        includereplace: {
          your_target: {
            options: {
              // Task-specific options go here.
                //includesDir: ''
            },
            // Files to perform replacements and includes with
            //src: 'app/templates/*.html',
            // Destination directory to copy files to
            files: [
                {src: '{,*/}*.html', dest: 'templates/', expand: true, cwd: 'app/templates/'},
                {src: '{,*/}*.html', dest: 'ng-templates/', expand: true, cwd: 'app/ng-templates/'}
            ]
          }
        },

        watch: {
            scripts: {
                files: [
                    'app/static/js/{,*/}*.js',
                    'app/static/js/**/**/*.js'
                ],
                tasks: ['jshint', 'concat', 'sync'],
                options: {
                    spawn: false
                }
            },
            sass: {
                files: ['app/static/sass/{,*/}*.sass', 'app/static/sass/{,*/}{,*/}*.sass'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['.tmp/css/*.css'],
                tasks: ['concat_css', 'cssmin'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: [
                    'app/templates/{,*/}*.html',
                    'app/include/{,*/}*.html',
                    'app/ng-templates/{,*/}*.html'
                ],
                tasks: ['includereplace'],
                options: {
                    spawn: false
                }
            }
//            ,
//            css: {
//                files: ['stylesheet/css/*.css'],
//                tasks: ['cssmin'],
//                options: {
//                    spawn: false
//                }
//            }
        }
    });

    // Загрузка плагинов, установленных с помощью npm install
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-serve');
    //grunt.loadNpmTasks('grunt-contrib-compass');
    //grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.loadNpmTasks('load-grunt-tasks');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-ngmin');

    // Задача по умолчанию
    grunt.registerTask('default', ['concat', 'ngmin', 'uglify', 'jshint', 'sass', 'concat_css', 'cssmin', 'includereplace', 'sync', 'watch']);
};

'use strict';

module.exports = function (grunt) {
    var watchFiles = {
        serverViews: ['app/views/**/*.*'],
        serverJS: ['Gruntfile.js', 'app.js', 'routes/**/*.js', 'controllers/**/*.js',
            'brokers/**/*.js', 'middleware/**/*.js', 'db/**/*.js'],
        clientViews: ['public/views/**/*.html'],
        clientJS: ['public/js/*.js', 'public/js/calls/**/*.js'],
        clientCSS: ['public/*.css']
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            serverViews: {
                files: watchFiles.serverViews,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: watchFiles.serverJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: watchFiles.clientViews,
                options: {
                    livereload: true
                }
            },
            clientJS: {
                files: watchFiles.clientJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientCSS: {
                files: watchFiles.clientCSS,
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            }
        },
        copy: {
            js: {
                files: [
                    {
                        expand: true, flatten: true, cwd: 'bower_components', dest: 'public/lib/js', src: [
                        'angularjs/angular.js',
                        'jquery/dist/jquery.js',
                        'lodash/lodash.js',
                        'jplayer/dist/jplayer/jquery.jplayer.js',
                        'socket.io-client/socket.io.js',
                        'angular-socket-io/socket.js',
                        'angular-resource/angular-resource.js',
                        'angular-ui-router/release/angular-ui-router.js',
                        'bootstrap/dist/js/bootstrap.min.js'
                    ]
                    }
                ]
            },
            css: {
                files: [
                    {
                        expand: true, flatten: true, cwd: 'bower_components', dest: 'public/lib/css', src: [
                        'bootstrap/dist/css/bootstrap.css',
                        'font-awesome/css/font-awesome.css',
                        'jplayer/dist/skin/blue.monday/css/jplayer.blue.monday.css'
                    ]
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true, flatten: true, cwd: 'bower_components', dest: 'public/lib/image', src: [
                        'jplayer/dist/skin/blue.monday/image/jplayer.blue.monday.jpg',
                        'jplayer/dist/skin/blue.monday/image/jplayer.blue.monday.seeking.gif',
                        'jplayer/dist/skin/blue.monday/image/jplayer.blue.monday.video.play.png'
                    ]
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true, flatten: true, cwd: 'bower_components', dest: 'public/lib/fonts', src: [
                        'bootstrap/fonts/glyphicons-halflings-regular.eot',
                        'bootstrap/fonts/glyphicons-halflings-regular.svg',
                        'bootstrap/fonts/glyphicons-halflings-regular.ttf',
                        'bootstrap/fonts/glyphicons-halflings-regular.woff',
                        'bootstrap/fonts/glyphicons-halflings-regular.woff2',
                        'font-awesome/fonts/fontawesome-webfont.eot',
                        'font-awesome/fonts/fontawesome-webfont.svg',
                        'font-awesome/fonts/fontawesome-webfont.ttf',
                        'font-awesome/fonts/fontawesome-webfont.woff',
                        'font-awesome/fonts/fontawesome-webfont.woff2'
                    ]
                    }
                ]
            }
        },
        jshint: {
            all: {
                src: watchFiles.clientJS.concat(watchFiles.serverJS),
                options: {
                    jshintrc: true
                }
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: watchFiles.clientCSS
            }
        },
        uglify: {
            production: {
                options: {
                    mangle: false
                },
                files: {
                    'public/dist/application.min.js': 'public/dist/application.js'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'public/dist/application.min.css': '<%= applicationCSSFiles %>'
                }
            }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: watchFiles.serverViews.concat(watchFiles.serverJS)
                }
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 1337,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 50,
                    'hidden': []
                }
            }
        },
        ngAnnotate: {
            production: {
                files: {
                    'public/dist/application.js': '<%= applicationJavaScriptFiles %>'
                }
            }
        },
        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true,
                limit: 10
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.option('force', true);

    var seed = require('./tasks/seed');
    grunt.task.registerTask('seed', 'Seeds default data', seed);

    grunt.registerTask('default', ['copy', 'lint', 'concurrent:default']);
    grunt.registerTask('debug', ['lint', 'concurrent:debug']);
    grunt.registerTask('lint', ['jshint', 'csslint']);
    grunt.registerTask('build', ['lint', 'ngAnnotate', 'uglify', 'cssmin']);
};
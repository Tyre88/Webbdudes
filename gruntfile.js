'use strict';

module.exports = function (grunt)
{
	//load grunt modules
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	
	grunt.registerTask("server",
	[
	  "build",
	  "open:chrome",
	  "connect",
	  "watch"
	]);

	grunt.registerTask("build",
	[
	  "clean:all",
	  "copy",
	  "sass"
	  //"htmlmin",
	  //"uglify"
	]);

	grunt.registerTask("default",
	[
		"server"
	]);

	grunt.initConfig(
	{
        options:
        {
            src: "src",
            srcFile: "*.*",
            dist: "dist"
        },
		config:
		{
			src: "src",
			dist: "dist"
		},
		open:
		{
			chrome:
			{
				path: "http://localhost:9000",
				app: "Chrome"
			},
			firefox:
			{
				path: "http://localhost:9000",
				app: "Firefox"
			}
		},
		connect:
		{
			options:
			{
				port: 9000,
				livereload: 35729,
				hostname: '*'
			},
			livereload:
			{
				options:
				{
					base:
						[
							'<%= config.dist %>'
						]
				}
			}
		},
		watch:
		{
			options:
			{
				livereload: true
			},
			css:
			{
				files: ["<%= config.src %>/**/*.css"],
				tasks: ["newer:copy:css"]
			},
			sass:
			{
				files: ["<%= config.src %>/**/*.scss"],
				tasks: ["newer:sass"]
			},
			images:
			{
				files: ["<%= config.src %>/**/*.{png,jpg}"],
				tasks: ["newer:copy:images"]
			},
			markup:
			{
				files: ["<%= config.src %>/**/*.html"],
				tasks: ["newer:copy:markup"]
			},
			scripts:
			{
                options:
                {
                    nospawn: true
                },
				files: ["<%= config.src %>/**/*.js"],
				tasks: ["copy:changedFiles"]
			}
		},
		htmlmin:
		{
			dist:
			{
				options:
				{
					removeComments: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
					minifyCSS: true,
					caseSensitive: true
				},
				files: 
				[
					{
						expand: true,
						cwd: "<%= config.dist %>",
						src: "**/*.html",
						dest: "<%= config.dist %>"
					}
				]
			}
		},
		uglify:
		{
			options:
			{
				mangle:
				{
					except: ["jQuery", "*.min.js"]
				}
			},
			all:
			{
				files:
				[
					{
						expand: true,
						cwd: "<%= config.dist %>",
						src: "**/*.js",
						dest: "<%= config.dist %>"
					}
				]
			}
		},
		sass:
		{
			dist:
			{
				options:
				{
					includePaths: require("node-neat").includePaths,
					outputStyle: "compressed"
				},
				files:
				[
					{
						expand: true,
						cwd: "<%= config.src %>",
						src: "**/*.scss",
						dest: "<%= config.dist %>",
						ext: ".css"
					}
				]
			}
		},
		copy:
		{
            changedFiles:
            {
                expand: true,
                dot: true,
                cwd: "<%= options.src %>",
                src: "<%= options.srcFile %>",
                dest: "<%= options.dist %>"
            },
			fonts:
			{
				files:
				[
					{
						expand: true,
						cwd: "<%= config.src %>",
						src: "**/*.{svg,ttf,woff,eot}",
						dest: "<%= config.dist %>"
					}
				]
			},
			css:
			{
				files:
				[
					{
						expand: true,
						cwd: "<%= config.src %>",
						src: "**/*.css",
						dest: "<%= config.dist %>"
					}
				]
			},
			images:
			{
				files:
				[
					{
						expand: true,
						cwd: "<%= config.src %>",
						src: "**/*.{jpg,png}",
						dest: "<%= config.dist %>"
					}
				]
			},
			scripts:
			{
				files:
				[
					{
						expand: true,
						cwd: "<%= config.src %>",
						src: "**/*.js",
						dest: "<%= config.dist %>",
                        rename: function(dest, fileName)
                        {
                            return "<%= config.dist %>" + "/" + fileName;
                        }
					}
				]
			},
			markup:
			{
				files:
					[
						{
							expand: true,
							cwd: "<%= config.src %>",
							src: "**/*.html",
							dest: "<%= config.dist %>"
						}
					]
			},
			map:
			{
				files:
					[
						{
							expand: true,
							cwd: "<%= config.src %>",
							src: "**/*.map",
							dest: "<%= config.dist %>"
						}
					]
			}
		},
		jshint:
		{
			all: ['<%= config.src %>/**/*.js']
		},
		clean:
		{
			binaries: ["<%= config.dist %>/bin/**/*"],
			all: ["<%= config.dist %>/**/*"]
		}
	});

    grunt.event.on('watch', function(action, filepath, target){

        var path = require('path');
        grunt.log.writeln(target + ': ' + filepath + ' might have ' + action);
        var siteDirectory = filepath.replace("src", "dist").replace(/(\w*.(js|css|ascx))/g, "");
        siteDirectory = siteDirectory.substr(0, siteDirectory.length - 1);

        //changes changed file source to that of the changed file
        var option = 'options.src';
        var srcPath = filepath.replace(/(\w*.(js|css|ascx))/g, "");
        grunt.log.writeln(option + ' changed to ' + srcPath);
        grunt.config(option, srcPath);

        var srcFile = filepath.match(/(\w*.(js|css|ascx))/g, "")[0];
        option = "options.srcFile";
        grunt.config(option, srcFile);

        //customizes output directory so that file goes to correct place
        option = 'options.dist';
        grunt.log.writeln(option + ' changed to ' + siteDirectory);
        grunt.config(option, siteDirectory);
    });
};
(function () {
    'use strict';
    module.exports = function (grunt) {

        grunt.initConfig({
        	 bower: grunt.file.readJSON('bower.json'),
        	clean: {
                dist: {
                    src: ['app/dist', 'app/styles/nxStyle.min.css', 'app/styles/nxStyle.min.css.map']
                },
                tempVendorJS: {
                    src: ['app/dist/vendor', 'app/dist/HTML5Framework.js']
                }
            }, bump: {
                options: {
                    files: ['bower.json'],
                    updateConfigs: ['bower'],
                    commit: true,
                    commitMessage: 'Release v<%=bower.version%>',
                    commitFiles: ['bower.json'],
                    createTag: false,
                    push: true,
                    pushTo: 'origin',
                    globalReplace: false,
                    prereleaseName: false,
                    regExp:false
                }
            },
        	 mavenPrepare: {
        		    options: {
        		      resources: ['**']
        		    },
        		    prepare: {}
        		  },

        		  mavenDist: {
        		    options: {
        		      warName: 'grunt-maven-project',
        		      deliverables: ['app/**/*.min.*','bower.json'],
        		      gruntDistDir: 'dist'
        		    },
        		    dist: {}
        		  },

            concat: {
                options: {
                	 stripBanners: true,
                     separator: ';',
                     banner: '/* SunGard Next Generation Framework  \n version:  <%=bower.version%>  */\n'
                },
                test:{
                	src:['webapp/app/nxComponents/main.js','webapp/app/nxComponents/Copy of main.js'],
                	dest:'app/dist/main.min.js'
                }
                
            }
        });
        	grunt.registerTask('readFromFile', function(key, value){
        		var target = grunt.option('buildnumber');
        		if(target=== undefined && target===""){
        			target="1"
        		}
        	        var projectFile='webapp/app/app.min.js';
        	var file=grunt.file.read(projectFile);
        	        if(!file){
        	            grunt.fail.warn('file'+projectFile+'not found');
        	        }
        	        else{
        	            grunt.log.writeln(file);
        	           // var jsonval=grunt.file.readJSON(projectFile);
        	            //grunt.log.writeln(JSON.stringify(jsonval.version));
        	            //jsonval.version='build# '+target;
        	           // grunt.file.write(projectFile, JSON.stringify(jsonval));
        	        }
        	    });

        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-maven');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-bump');
        /*Default task to Run*/
        grunt.registerTask('default', ['bump-only:prerelease','mavenPrepare','concat','mavenDist']);
    };

})();

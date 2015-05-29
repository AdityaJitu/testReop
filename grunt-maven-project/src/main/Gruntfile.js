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
                    commit: false,
                    createTag: false,
                    push: false,
                    globalReplace: false,
                    prereleaseName: false,
                    regExp: "\"version\" : \"\d\.\d.\d\""
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
        		      deliverables: ['app/**/*.min.*'],
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
        	        var projectFile='bower.json';
        	        if(!grunt.file.exists(projectFile)){
        	            grunt.fail.warn('file'+projectFile+'not found');
        	        }
        	        else{
        	            grunt.log.ok('the file exists');
        	            var jsonval=grunt.file.readJSON(projectFile);
        	            //grunt.log.writeln(JSON.stringify(jsonval.version));
        	            jsonval.version='build# '+target;
        	            grunt.file.write(projectFile, JSON.stringify(jsonval));
        	        }
        	    });

        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-maven');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-bump');
        /*Default task to Run*/
        grunt.registerTask('default', ['mavenPrepare','readFromFile','concat','mavenDist']);
    };

})();

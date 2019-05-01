module.exports = ->

  @initConfig
    pkg: @file.readJSON 'package.json'

    jshint:
      all: [ 'Gruntfile.coffe', 'src/*.js' ]
      options:
        jshintrc: '.jshintrc'

    uglify:
      options:
        report: 'gzip'
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> License | github.com/frqnck/apt-js */'
        mangle: { reserved: ['a', 'p', 't', '$'], toplevel: true }

      core:
        files:
          'dist/apt.min.js': ['src/apt-core.js', 'src/apt-event.js', 'src/apt-dom.js', 'src/apt-src.js', 'src/apt-ajax.js']

      shims:
        options:
          banner: '/*! apt-shims.js v<%= pkg.version %> | <%= pkg.license %> License | github.com/frqnck/apt-js */'
        files:
          'dist/apt-shims.min.js': ['src/extra/apt-shims.js']

      utils:
        options:
          banner: '/*! apt-utils.js v<%= pkg.version %> | <%= pkg.license %> License | github.com/frqnck/apt-js */'
        files:
          'dist/apt-utils.min.js': ['src/extra/apt-utils.js']

    connect:
      rootServer:
        options:
          port: 9000,
          base: '.'

    qunit:
      all:
        options:
          urls: [
            'http://localhost:9000/test/suites.html'
          ]

  @loadNpmTasks 'grunt-contrib-jshint'
  @loadNpmTasks 'grunt-contrib-uglify'
  @loadNpmTasks 'grunt-contrib-qunit'
  @loadNpmTasks 'grunt-contrib-connect'

  @registerTask 'build-core', ['uglify:core']
  @registerTask 'build-utils', ['uglify:utils']
  @registerTask 'build-shims', ['uglify:shims']
  @registerTask 'build', ['uglify:core', 'uglify:utils', 'uglify:shims']

  @registerTask 'test', ['connect', 'qunit']
  @registerTask 'lint', ['jshint']

  @registerTask('default', ['lint', 'test']);

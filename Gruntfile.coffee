module.exports = ->

  @initConfig
    pkg: @file.readJSON 'package.json'
    
    jshint:
      all: [ 'Gruntfile.coffe', 'src/*.js', 'test/suites/*.js' ]
      options:
        jshintrc: '.jshintrc'

    uglify:
      options:
        report: 'gzip'
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> License | github.com/frqnck/apt.js */'
        mangle: { reserved: ['a', 'p', 't', '$'], toplevel: true }

      # core:
      #   files:
      #     'dist/apt.min.js': ['src/apt-core.js', 'src/apt-event.js', 'src/apt-dom.js', 'src/apt-src.js', 'src/apt-ajax.js']

      shims:
        options:
          banner: '/*! apt-shims.js v<%= pkg.version %> | <%= pkg.license %> License | github.com/frqnck/apt.js */'
        files:
          'dist/apt-shims.min.js': ['src/extra/apt-shims.js']

      utils:
        options:
          banner: '/*! apt-utils.js v<%= pkg.version %> | <%= pkg.license %> License | github.com/frqnck/apt.js */'
        files:
          'dist/apt-utils.min.js': ['src/extra/apt-utils.js']

      dist:
        files:
          'dist/apt.min.js': ['dist/apt.js']

    compress:
      main:
        options:
          mode: 'gzip'
        files: [
          expand: true,
          src: ['dist/*.min.js'],
          dest: '.',
          ext: '.min.js.gz'
        ]

    connect:
      rootServer:
        options:
          port: 9000,
          base: '.'

    qunit:
      all:
        options:
          '--web-security': 'no',
          urls: [
            'http://localhost:9000/test/index-src.html'
          ]
          coverage:
            disposeCollector: true,
            src: ['src/*.js'],
            instrumentedFiles: 'tmp/',
            htmlReport: 'report/coverage',
            coberturaReport: 'report/',
            linesThresholdPct: 85
          all: ['test/*.html']
      
    shell:
      dist:
        command: './build-dist.sh'

    comments: 
      dist:
        options:
          singleline: true,
          multiline: true,
          keepSpecialComments: false
        src: [ 'dist/apt.js' ]

  @loadNpmTasks 'grunt-contrib-jshint'
  @loadNpmTasks 'grunt-contrib-uglify'
  @loadNpmTasks 'grunt-contrib-connect'
  @loadNpmTasks 'grunt-contrib-compress'
  @loadNpmTasks 'grunt-shell'
  @loadNpmTasks 'grunt-contrib-qunit'
  @loadNpmTasks 'grunt-stripcomments'
  # @loadNpmTasks 'grunt-qunit-istanbul'

  @registerTask 'lint', ['jshint']
  @registerTask 'test', ['connect', 'qunit']

  # @registerTask 'build-core', ['uglify:core']
  @registerTask 'build-utils', ['uglify:utils']
  @registerTask 'build-shims', ['uglify:shims']

  @registerTask 'build-apt.js', ['shell:dist', 'comments:dist', 'uglify:dist']
  @registerTask 'build', ['build-apt.js', 'uglify:utils', 'uglify:shims']

  @registerTask 'default', ['lint', 'test']

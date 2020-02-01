gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
#exec = require('gulp-exec')
sourcemaps = require 'gulp-sourcemaps'
del = require 'del'

paths =
  scripts:  'src/**/*.coffee'
  tests:    'test/src/**/*.coffee'
  grammars: 'src/**/*.jison'

onError = (err) ->
  gutil.log err
  gutil.beep()
  @emit 'end'

onCoffeeError = (err) ->
  message = err?.stack or "#{err}"
  onError.call(this, message)

gulp.task 'clean', ->
  return del(['lib'])

gulp.task 'scripts', ->
  gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(coffee({coffee: require 'coffeescript'}).on('error', onCoffeeError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('lib'))

gulp.task 'tests', ->
  gulp.src(paths.tests)
    .pipe(sourcemaps.init())
    .pipe(coffee({coffee: require 'coffeescript'}).on('error', onError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('test/lib'))
###
gulp.task 'grammars', ->
  gulp.src(paths.grammars)
    .pipe(jison({ moduleType: 'commonjs' }).on('error', onError))
    .pipe(gulp.dest('lib'));
###
gulp.task 'watch', ->
  gulp.watch paths.scripts, ['scripts']
  gulp.watch paths.tests, ['tests']
  #gulp.watch paths.grammars, ['grammars']

#gulp.task 'default', ['watch', 'scripts', 'tests', 'grammars']
gulp.task 'default', ['watch', 'scripts', 'tests']

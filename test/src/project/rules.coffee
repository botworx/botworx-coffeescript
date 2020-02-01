minimatch = require("minimatch")
mm = (pattern, options) ->
  minimatch.makeRe(pattern, options)

{runtime, $$, unit_} = require './common'
$$ = unit_ module
{task_, def, $_, __, $, $_, Runner, Task, Variable, Rule, Achieve, onAttempt, attempt_} = runtime
{ReadFile, ConsoleWriter} = runtime.streamer
{project_, workspace_, sourcer_, build} = runtime.project

_make = $_ 'make'

t1 = workspace_
  tasks: [
    project_
      files: '*.txt'
      rules: [
        def onAttempt(Achieve, __, _make, 'test.js'), ->
          $$.h2 "onAttempt(Achieve, __, _make, 'test.js')"
        def onAttempt(Achieve, __, _make, 'notatest.js'), ->
          $$.h2 "onAttempt(Achieve, __, _make, 'notatest.js')"
        def onAttempt(Achieve, __, _make, $('x')), ->
          $$.h2 "onAttempt(Achieve, __, _make, $('x'))"
          $$._ @msg.$x
        def onAttempt(Achieve, __, _make, mm('*.js')), ->
          $$.h2 "onAttempt(Achieve, __, _make, mm('*.js'))"
        def onAttempt(Achieve, __, _make, mm('*.txt')), ->
          $$.h2 "onAttempt(Achieve, __, _make, mm('*.txt'))"
        def onAttempt(Achieve, __, _make, $('x', mm('*.js'))), ->
          $$.h2 "onAttempt(Achieve, __, _make, $('x', mm('*.js')))"
          $$._ @msg.$x
      ]
  ]

t = t1
m = attempt_ Achieve, __, _make, 'test.js'
#$$._ m
t.broadcast m
t.run()
#$$._ t

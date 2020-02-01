minimatch = require("minimatch")
mm = (pattern, options) ->
  minimatch.makeRe(pattern, options)

{runtime} = require './common'
{task_, def, $_, __, $$, $, $_, Runner, Task, Variable, Rule, onAttempt, attempt_} = runtime
{ReadFile, ConsoleWriter} = runtime.streamer
{project_, workspace_, sourcer_, build} = runtime.project

_make = $_ 'make'

t1 = workspace_
  location: './out'
  tasks: [
    require './project'
  ]

t = t1
#m = attempt_ __, _make, 'test.js'
#console.log m
#t.broadcast m
t.run()
#console.log t

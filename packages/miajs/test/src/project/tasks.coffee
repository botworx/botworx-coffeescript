{runtime} = require './common'
{task_, chain_, Runner, Task} = runtime
{ReadFile, ConsoleWriter} = runtime.streamer
{project_, workspace_, sourcer_, build} = runtime.project

t1 = workspace_
  tasks: [
    project_
      files: '*.txt'
      tasks: [
        task_ ->
          $$.h2 'hello'
      ]
  ]

t2 = workspace_
  tasks: [
    project_
      files: '*.txt'
      tasks: [
        sourcer_ (src) ->
          $$.h2 src
      ]
  ]

t3 = workspace_
  tasks: [
    project_
      files: '*.txt'
      tasks: [
        sourcer_ (src) ->
          $$.h2 src
          @spawn ->
            console.log 'hello'
      ]
  ]

t4 = workspace_
  tasks: [
    project_
      files: '*.txt'
      tasks: [
        sourcer_ (src) ->
          $$.h2 src
          @spawn chain_ ->
            @chain new ReadFile src
            .chain new ConsoleWriter
      ]
  ]

#rnr = new Runner()
#rnr.run(t1)
t = t4
console.log t
t.run()

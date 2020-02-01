{runtime} = require '../common'
{task_, chain_, Runner, Task} = runtime
{ReadFile, ConsoleWriter} = runtime.streamer
{project_, workspace_, sourcer_, build} = runtime.project

module.exports =
  project_
    files: '*.txt'
    tasks: [
      sourcer_ (src) ->
        h2 src
        @spawn chain_ ->
          @chain new ReadFile src
          .chain new ConsoleWriter
    ]

assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{task_, chain_, runner_, Task} = runtime
{ReadFile, ConsoleWriter} = runtime.streamer

describe 'Streamer', ->
  describe '@chain', ->
    it 'should work', ->
      t1 = chain_ ->
        @chain new ReadFile $$.dataPath('test.txt')
        .chain new ConsoleWriter

      runner_().run t1

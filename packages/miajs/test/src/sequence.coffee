assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{runner_, sequence_} = runtime

describe 'Sequence', ->
  describe 'In Parallel', ->
    it 'should work', ->
      t1 = sequence_ ->
        @task ->
          $$._ 'A'
        @task ->
          $$._ 'B'
        @task ->
          $$._ 'C'

      t2 = sequence_ ->
        @task ->
          $$._ 'D'
        @task ->
          $$._ 'E'
          @fail()
        @task ->
          $$._ 'F'

      runner_().run t1, t2

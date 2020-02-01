assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{runner_, task_, parallel_, counter_} = runtime

describe 'Parallel', ->
  describe '@action', ->
    it 'should work', ->
      t1 = parallel_ ->
        @counter 1, 5, ->
          counter1 = this
          @task ->
            $$.log "Counter 1:  #{counter1.value}"
        @counter 1, 10, ->
          counter2 = this
          @task ->
            $$.log "Counter 2:  #{counter2.value}"

      runner_().run t1

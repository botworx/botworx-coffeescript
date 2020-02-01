assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{method_, runner_} = runtime

t1 = method_ ->
  @counter 1, 10, ->
    counter1 = this
    @task ->
      $$._ "Count = #{counter1.value}"

describe 'Method', ->
  describe '@counter', ->
    it 'should work', ->
      runner_().run t1

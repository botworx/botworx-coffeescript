assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{task_, sequence_, runner_} = runtime

t1 = task_ ->
  $$._ 'hello'
  @add task_ ->
    $$._ 'world'

s1 = sequence_ ->
  @add task_ ->
    $$._ 'Hey'
  .add task_ ->
    $$._ 'Dude'

describe 'Sequence', ->
  describe '@action', ->
    it 'should work', ->
      runner_().run s1

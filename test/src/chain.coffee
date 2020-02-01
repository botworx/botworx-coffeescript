assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{task_, chain_, runner_} = runtime

t1 = chain_ ->
  @chain task_ ->
    $$._ 'What\'s'
  .chain task_ ->
    $$._ 'Up'
  .chain task_ ->
    $$._ 'Doc'

describe 'Task', ->
  describe '@chain', ->
    it 'should work', ->
      runner_().run t1

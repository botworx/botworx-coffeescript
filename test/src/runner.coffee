assert = require('chai').assert
{$$, unit_, runtime} = require('./common')
$$ = unit_ module
{Term, Context, Assert, Retract, Believe, Attempt, Achieve} = runtime
{$_, __, runner_, module_, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime

{ _hello, _say } = $_ [ 'hello', 'say' ]

__main = ->

  @def new OnAttempt(Achieve, null, _say, __), ->
    $t = @msg.data.obj
    $$._ $t

  @def new OnAttempt(Achieve, null, _hello, null), ->
    yield @call(null, _say, "Hello World")
    yield @call(null, _say, "Goodbye World")

  @perform(null, _hello, null)

describe 'Runner', ->
  $$.tap()
  describe '@run', ->
    it 'should work', ->
      runner_(__main).run()

assert = require('chai').assert
{$$, unit_, runtime} = require('./common')
$$ = unit_ module
{Term, Context, Assert, Retract, Believe, Attempt, Achieve} = runtime
{$_, __, runner_, module_, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime

{ _hello, _say } = $_ [ 'hello', 'say' ]

t1 = module_ ->

  @def new OnAttempt(Achieve, null, _say, __), ->
    $t = @msg.data.obj
    $$._ $t

  @def new OnAttempt(Achieve, null, _hello, null), ->
    await @call(null, _say, "Hello World")
    await @call(null, _say, "Goodbye World")

  @perform(null, _hello, null)

describe 'Async', ->
  $$.tap()
  describe '@call', ->
    it 'should work', ->
      runner_().run t1

assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{Term, Context, Assert, Retract, Believe, Attempt, Achieve} = runtime
{$_, __, runner_, module_, Message, Policy, Rule, Trigger, OnAssert, OnRetract, onAttempt, Runner, Method} = runtime

{_hello, _say} = $_ ['hello', 'say']

describe 'Task', ->
  describe '@perform', ->
    it 'should work', ->
      action = ->
        @def onAttempt(Achieve, null, _hello, null), ->
          @def onAttempt(Achieve, null, _say, __), ->
            $t = @msg.data.obj
            $$.log($t)
          @perform(null, _say, "Hello World")
          @perform(null, _say, "Goodbye World")
        @perform(null, _hello, null)

      runner_().run module_(action)

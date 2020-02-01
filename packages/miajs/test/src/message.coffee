assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{Term, Context, Assert, Retract, Believe, believe_, Attempt, Achieve} = runtime
{__, module_, $$self, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime
{_Bob, _Joe, _likes, _Fish, _Peas, _get} = require('./common')

describe 'Message', ->
  describe '@match', ->
    it 'should work', ->
      ctx = new Context()
      c1 = believe_ _Bob, _likes, _Fish
      ctx.add(c1)
      c2 = believe_ _Joe, _likes, _Peas
      ctx.add(c2)

      $$.h2 "All Clauses"
      $$._ String(ctx)
      $$._ ctx

      $$.h2 'Message Matching'
      m = new Assert(c1)
      $$._ m.match(Assert, Believe, _Bob, _likes, _Fish)
      $$._ m.match(Retract, Believe, _Bob, _likes, _Fish)
      $$._ m.match(Assert, Believe, _Joe, _likes, _Fish)
      $$._ m.match(Assert, Achieve, _Joe, _likes, _Fish)

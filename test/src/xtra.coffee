assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{Term, Context, context_, Assert, Retract, Believe, believe_, Attempt, Achieve} = runtime
{__, $, _$, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, runner_, Method} = runtime

{_Bob, _Joe, _likes, _Fish, _Tuna, _Cheese, _Peas, _get} = require('./common')

describe 'Clause', ->
  describe '@xtra', ->
    it 'should work',  ->
      ctx = context_()
      c1 = believe_ _Bob, _likes, _Tuna, {with: _Cheese}
      ctx.add c1
      c2 = believe_ _Joe, _likes, _Peas
      ctx.add c2

      $$.h2 "All Clauses"
      for c in ctx.clauses
        $$._ c.toString()

      $$.h2 "Find in Context"
      r = ctx.find Believe, _Bob, _likes, _Tuna
      $$.$ "< Bob likes Tuna >"
      $$._ r.toString()

      r = ctx.find Believe, __, _likes, _Tuna
      $$.$ "< __ likes Tuna >"
      $$._ r.toString()

      r = ctx.find Believe, __, _likes, __
      $$.$ "< __ likes __ >"
      $$._ r.toString()

      $$.h2 "Message Matches"
      m = new Assert(c1)
      $$._ m.match Assert, Believe, __, _likes, _Tuna
      $$._ m.match Assert, Believe, _Bob, _likes, _Tuna
      $$._ m.match Assert, Believe, _Bob, _likes, _Fish
      $$._ m.match Retract, Believe, _Bob, _likes, _Fish
      $$._ m.match Assert, Believe, _Joe, _likes, _Fish

      rnr = runner_()

      rnr.def new OnAssert(Believe, __, _likes, _Tuna), ->
        $x = @msg.data.subj
        @task ->
          $$._ 'A'
          @perform($x, _get, _Fish)
        .task ->
          $$._ 'B'

      rnr.def new OnAttempt(Achieve, __, _get, _Fish),  ->
        $x = @msg.data.subj
        $$._ "#{$x} is getting Fish."

      rnr.post m
      rnr.run()

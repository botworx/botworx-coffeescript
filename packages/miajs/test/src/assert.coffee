assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{Term, Context, Assert, Retract, Believe, Attempt, Achieve} = runtime
{_, __, _$, module_, _$self, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime
{_Bob, _Joe, _likes, _Fish, _Peas, _get} = require('./common')

describe 'Rule', ->
  describe '@fire', ->
    it 'should work', ->
      ctx = new Context()
      c1 = new Believe(_Bob, _likes, _Fish)
      ctx.add(c1)
      c2 = new Believe(_Joe, _likes, _Peas)
      ctx.add(c2)

      $$.$ "All Clauses"
      for c in ctx.clauses
        $$._ c.toString()

      m = new Assert(c1)

      $$.$ 'Begin Task Execution'
      rnr = new Runner()

      rnr.def new Trigger(Assert, Believe, __, _likes, _Fish), ->
        $x = @msg.data.subj
        $$._ "#{$x} likes Fish"

      rnr.post(m)
      rnr.run()

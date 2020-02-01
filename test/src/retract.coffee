assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{Term, Context, Assert, Retract, Believe, Attempt, Achieve} = runtime
{_, __, _$, module_, _$self, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime
{_Bob, _Joe, _likes, _Fish, _Peas, _get} = require('./common')

describe 'Retract', ->
  it 'should work', ->
    rnr = new Runner()
    ctx = rnr.ctx
    c1 = new Believe(_Bob, _likes, _Fish)
    ctx.add(c1)
    c2 = new Believe(_Joe, _likes, _Peas)
    ctx.add(c2)

    $$.$ "Context Before"
    for c in ctx.clauses
      $$._ c.toString()

    m = new Retract(c1)

    $$.$ 'Begin Task Execution'

    rnr.def new Trigger(Retract, Believe, __, _likes, _Fish), ->
      $x = @msg.data.subj
      $$._ "#{$x} doesn't like Fish"

    rnr.post(m)
    rnr.run().then ->
      $$.$ "Context After"
      for c in ctx.clauses
        $$._ c.toString()

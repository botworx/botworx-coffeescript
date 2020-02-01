assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{Term, Context, Propose, Attempt, Assert, Retract, Believe, Achieve} = runtime
{__, _$, module_, _impasse, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime
{_Bob, _Joe, _likes, _Fish, _Peas, _get, _catch, _buy, _eat} = require('./common')

describe 'Propose', ->
  it 'should work', ->
    ctx = new Context()
    c1 = new Believe(_Bob, _likes, _Fish)
    ctx.add(c1)
    c2 = new Believe(_Joe, _likes, _Peas)
    ctx.add(c2)

    $$.$ "All Clauses"
    $$._ String(ctx)

    m = new Propose(new Achieve(_Bob, _eat, _Fish))

    $$.$ 'Begin Task Execution'
    rnr = new Runner()

    rnr.def new Trigger(Attempt, Achieve, __, _eat, _Fish), ->
      $x = @msg.data.subj
      $$._ "#{$x} buying Fish"

    rnr.def new Trigger(Attempt, Achieve, __, _eat, _Fish), ->
      $x = @msg.data.subj
      $$._ "#{$x} catching Fish"

    rnr.def new Trigger(Attempt, Achieve, null, _impasse, null), ->
      #$$._ String(@rnr.ctx)
      $$._ 'Impassed'

    rnr.post(m)
    rnr.run()

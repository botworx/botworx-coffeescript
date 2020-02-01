assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{Term, Context, context_, Assert, Retract, Believe, believe_, Attempt, Achieve} = runtime
{__, _impasse, _$, runner_, module_, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime
{_Bob, _Joe, _likes, _Fish, _Peas, _get} = require('./common')

describe 'Module', ->
  describe '@action', ->
    it 'should work', ->
      ctx = context_()
      c1 = believe_ _Bob, _likes, _Fish
      ctx.add c1
      c2 = believe_ _Joe, _likes, _Peas
      ctx.add c2

      $$.$ "All Clauses"
      for c in ctx.clauses
        $$._ c.toString()

      m = new Assert(c1)

      $$.$ 'Begin Task Execution'
      exports = module_ ->

        @def new Trigger(Assert, Believe, __, _likes, _Fish), ->
          self = this
          @task ->
            $$._('Task Fire 1:')
            @perform(self.msg.data.subj, _get, _Fish)
          .task ->
            $$._('Task Fire 2:')

        @def new Trigger(Attempt, Achieve, __, _get, _Fish), ->
          self = this
          @task ->
            $$._ _$(self.msg.data.subj) + ' is getting Fish.'

        @defg new Trigger(Attempt, Achieve, null, _impasse, null), ->
          #$$._ String(@rnr.ctx)
          $$._ 'Impassed'

        @post(m)


      runner_().run(exports)

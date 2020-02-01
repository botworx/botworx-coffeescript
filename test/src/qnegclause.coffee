assert = require('chai').assert
{unit_, runtime, _exists, _likes, _Fish, _Chips} = require('./common')
$$ = unit_ module
{__, $_, _$, context_, yamlcontext_, Variable, Believe} = runtime

describe 'Query', ->
  describe 'NegClause', ->
    it 'should work', ->
      ctx = yamlcontext_().load $$.dataPath('bob.yml')

      $$.h2 "All Clauses"
      $$._ ctx.toString()

      $$.h2 'Binders'
      _$x = new Variable '$x'
      _$y = new Variable '$y'
      _$z = new Variable '$z'

      $$.$ """
      ctx.query Believe, _$x, _likes, _$y
      .not Believe, _$x, _likes, _Chips
      """
      ctx.query Believe, _$x, _likes, _Fish
      .not Believe, _$x, _likes, _Chips
      .exec (binder) ->
        $$._ binder

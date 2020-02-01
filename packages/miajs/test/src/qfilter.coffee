assert = require('chai').assert
{unit_, runtime, _exists, _likes} = require('./common')
$$ = unit_ module
{__, $_, _$, context_, yamlcontext_, Variable, Believe} = runtime

describe 'Query', ->
  describe 'Filter', ->
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
      .and Believe, _$z, _likes, _$y
      """
      ctx.query Believe, _$x, _likes, _$y
      .and Believe, _$z, _likes, _$y
      .exec (binder) ->
        $$._ binder

      $$.$ """
      ctx.query Believe, _$x, _likes, _$y
      .and Believe, _$z, _likes, _$y
      .filter (binder) -> binder.$x != binder.$z
      """
      ctx.query Believe, _$x, _likes, _$y
      .and Believe, _$z, _likes, _$y
      .filter (binder) -> {$x, $z} = binder; $x != $z
      .exec (binder) ->
        $$._ binder

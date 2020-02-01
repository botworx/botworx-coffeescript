assert = require('chai').assert
{unit_, runtime, _exists, _dad, _mom, _brother, _wife} = require('./common')
$$ = unit_ module
{__, $_, _$, context_, yamlcontext_, Variable, Believe} = runtime

describe 'Query', ->
  describe 'Basic', ->
    it 'should work', ->
      ctx = yamlcontext_().load $$.dataPath('cleavers.yml')

      $$.h2 "All Clauses"
      $$._ ctx.toString()

      $$.h2 'Binders'
      _$x = new Variable '$x'
      _$d = new Variable '$d'
      _$w = new Variable '$w'

      $$.$ "ctx.query Believe, _$x, _dad, _$d"
      ctx.query Believe, _$x, _dad, _$d
      .exec (binder) ->
        $$._ binder

      $$.$ """
      ctx.query Believe, _$x, _dad, _$d
      .and Believe, _$d, _wife, _$w
      """
      ctx.query Believe, _$x, _dad, _$d
      .and Believe, _$d, _wife, _$w
      .exec (binder) ->
        $$._ binder

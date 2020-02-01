assert = require('chai').assert
{unit_, runtime, _exists, _on} = require('./common')
$$ = unit_ module
{__, $_, _$, context_, yamlcontext_, Variable, Believe} = runtime

describe 'Query', ->
  describe 'Typed', ->
    it 'should work', ->
      ctx = yamlcontext_().load $$.dataPath('blocks.yml')

      $$.h2 "All Clauses"
      $$._ ctx.toString()

      $$.h2 'Binders'
      $x = new Variable '$x', (v) -> v instanceof Block
      $y = new Variable '$y'

      $$.$ "ctx.query Believe, $x, _on, $y"
      ctx.query Believe, $x, _on, $y
      .exec (binder) ->
        $$._ binder

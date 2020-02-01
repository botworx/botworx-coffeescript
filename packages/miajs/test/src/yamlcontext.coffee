assert = require('chai').assert

{$$, unit_, $_, _$, Context, YamlContext} = require('./common')
$$ = unit_ module, $$

describe 'YamlContext', ->
  it 'should work', ->
    ctx = new YamlContext().load $$.dataPath('cleavers.yml')
    $$._ ctx
    for c in ctx.clauses
      $$._ _$ c

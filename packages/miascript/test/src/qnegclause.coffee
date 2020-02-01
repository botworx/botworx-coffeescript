{unit_, lex, parse, transpile, compile, evaluate} = require('./common')
$$ = unit_ module

data =
"""
Bob
  likes Fish
  likes Chips
Joe
  likes Fish

defg (start)
  | @rnr.ctx
  where
    $x likes Fish
    !$x likes Chips
  -->
    | _.$x

defg (impasse)
  | String(@rnr.ctx)
"""

describe 'Query', ->
  it 'should work', ->
    #evaluate data
    #compile data
    $$._ JSON.stringify (parse data), null, 2
    #$$._ JSON.stringify (lex data), null, 2
    #$$._ transpile data
    code = compile data
    $$._ code
    evaluate data

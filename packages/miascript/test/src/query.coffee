{unit_, lex, parse, transpile, compile, evaluate} = require('./common')
$$ = unit_ module

data =
"""
+ Bob likes Fish
+ Joe likes Fish

def (hello)
  | @rnr.ctx
  where
    $x likes $y
    $z likes $y
    $x != $z
  -->
    | _
    + $x likes $z

def (goodbye)
  | String(@rnr.ctx)

hello
goodbye
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

{unit_, lex, parse, transform, analyze, transpile, compile, evaluate} = require('./common')
$$ = unit_ module

data =
'''
def (stack $x on: $y -> $g)
    | $g

stack Block1 on: Block2
'''

describe 'BoundClause', ->
  it 'should work', ->
    #$$._ lex data
    $$._ JSON.stringify (parse data), null, 2
    #$$._ JSON.stringify (transform data), null, 2
    #$$._ JSON.stringify (analyze data), null, 2
    #$$._ transpile data
    #$$._ compile data
    evaluate data

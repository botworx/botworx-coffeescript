{unit_, lex, parse, transform, analyze, transpile, compile, evaluate} = require('./common')
$$ = unit_ module

data =
'''
defg (impasse)
  | 'Impassed'

def (goodbye)
  | String(@rnr.ctx)

goodbye
'''

describe 'Impasse', ->
  it 'should work', ->
    #$$._ lex data
    #$$._ JSON.stringify (parse data), null, 2
    $$._ JSON.stringify (transform data), null, 2
    #$$._ JSON.stringify (analyze data), null, 2
    $$._ transpile data
    #$$._ compile data
    evaluate data

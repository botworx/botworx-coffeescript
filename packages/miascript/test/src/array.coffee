{unit_, lex, parse, analyze, transpile, compile, evaluate} = require('./common')
$$ = unit_ module

data =
'''
+ Bob likes A, B, C
'''

describe 'Array', ->
  describe '@evaluate', ->
    it 'should work', ->
      #$$._ lex data
      #$$._ JSON.stringify (parse data), null, 2
      $$._ JSON.stringify (analyze data), null, 2
      #$$._ transpile data
      $$._ compile data
      evaluate data

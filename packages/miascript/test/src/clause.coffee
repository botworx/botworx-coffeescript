{unit_, parse, analyze, transpile, compile, evaluate} = require('./common')
$$ = unit_ module

data =
'''
Block1
Block1 on Block2
'''

describe 'Clause', ->
  describe '@evaluate', ->
    it 'should work', ->
      #$$._ JSON.stringify (parse data), null, 2
      $$._ JSON.stringify (analyze data), null, 2
      $$._ transpile data
      $$._ compile data
      #evaluate data

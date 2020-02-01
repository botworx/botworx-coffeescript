{unit_, parse, transpile, compile, evaluate} = require('./common')
$$ = unit_ module

data =
'''
def ($x likes $y with: $z)
  | "#{$x} likes #{$y} with #{$z}"

+ Bob likes Tuna with: Cheese
'''

describe 'Xtra', ->
  describe '@evaluate', ->
    it 'should work', ->
      #evaluate data
      #compile data
      $$._ JSON.stringify (parse data), null, 2
      $$._ transpile data
      code = compile data
      $$._ code
      evaluate data

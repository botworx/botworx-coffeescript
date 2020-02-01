{unit_, parse, transform, transpile, compile, evaluate} = require('./common')
$$ = unit_ module

data =
"""
Table: Table1
Block: Block1
Block: Block2
Block3 :Block
Block1 on Block2
Achieve: Block1 on Block2
+ put Block1 on: Block2
+ Achieve: Block1 on Block2
Block3 ^Block

def (hello)
  where
    (Block: $x) exists
    #$x on $y
  -->
    | _.$x

def (goodbye)
  | String(@rnr.ctx)

hello
goodbye
"""

describe 'Typed', ->
  describe '@evaluate', ->
    it 'should work', ->
      #$$._ JSON.stringify (parse data), null, 2
      $$._ JSON.stringify (transform data), null, 2
      $$._ transpile data
      $$._ compile data
      evaluate data

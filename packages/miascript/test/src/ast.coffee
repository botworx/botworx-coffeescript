{unit_, parse, compile, evaluate} = require('./common')
$$ = unit_ module

data =
"""
def (hello)

  def (say $t)
    | $t

  say "Hello World"
  say "Goodbye World"

hello
"""

describe 'AST', ->
  describe '@evaluate', ->
    it 'should work', ->
      ast = parse data
      $$._ $$.stringify ast, null, 2

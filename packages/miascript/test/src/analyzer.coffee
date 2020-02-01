{unit_, parse, analyze, compile, evaluate} = require('./common')
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

describe 'Analyzer', ->
  describe '@analyze', ->
    it 'should work', ->
      ast = analyze data
      $$._ $$.stringify ast, null, 2

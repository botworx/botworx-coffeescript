{unit_, parse, transform, compile, evaluate} = require('./common')
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

describe 'MiaScript', ->
  $$.h2 'Data'
  $$._ data

  describe '@parse', ->
    it 'should work', ->
      $$.h2 'Parse'
      $$._ JSON.stringify (parse data), null, 2

  describe '@transform', ->
    it 'should work', ->
      $$.h2 'Transform'
      $$._ JSON.stringify (transform data), null, 2

  describe '@compile', ->
    it 'should work', ->
      $$.h2 'Code'
      code = compile data
      $$._ code

  describe '@evaluate', ->
    it 'should work', ->
      $$.h2 'Evaluation'
      evaluate data

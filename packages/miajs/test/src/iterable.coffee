{$$, unit_} = require('./common')
$$ = unit_ module, $$

describe 'TIterable', ->
  it 'should work', ->
    class A
      @iterator ->
        yield 'a'
        yield 'b'
    class B extends A
      @TIterable()
      iterator: ->
        yield from super()
        yield 'c'

    b = new B()
    for l from b
      $$._ l

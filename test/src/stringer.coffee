assert = require('chai').assert

{$$, unit_, _$, Stringer} = require('./common')
$$ = unit_ module, $$

describe 'Stringer', ->
  it 'should work', ->
    stringer = new Stringer()
    stringer.write 'Hello'
    stringer.write 'World'
    $$._ stringer
    $$._ stringer.toString()
    $$._ String(stringer)

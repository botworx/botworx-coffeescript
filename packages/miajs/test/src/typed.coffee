assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{$_, Term} = runtime

describe 'Term', ->
  describe 'typed', ->
    it 'should work', ->
      #t = $_ 'Block1', 'Block'
      class Table extends Term
      t1 = $_ 'Table1', Table
      $$._ t1

      t2 = $_ 'Block1', 'Block'
      $$._ t2

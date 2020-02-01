process = require 'process'
{$$, unit_, config} = require('./common')
$$ = unit_ module, $$

describe 'Config', ->
  it 'should work', ->
    $$.$ 'Config Results'
    $$._ config()
    $$.$ 'Environment'
    $$._ process.env

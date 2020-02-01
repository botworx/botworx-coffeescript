assert = require('chai').assert

yaml = require 'js-yaml'
fs   = require 'fs'

{$$, unit_} = require('./common')
$$ = unit_ module, $$

describe 'Yaml', ->
  it 'should work', ->
    # Get document, or throw exception on error
    try
      doc = yaml.safeLoad(fs.readFileSync($$.dataPath('cleavers.yml'), 'utf8'))
      console.log(doc)
    catch e
      console.log(e)

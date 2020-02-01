yaml = require 'js-yaml'
fs   = require 'fs'

{Context} = require './context'
{$_, _$} = require('../main')


class YamlContext extends Context
  constructor: ->
    super()
  load: (filename) ->
    try
      doc = yaml.safeLoad(fs.readFileSync(filename), 'utf8')
    catch e
      console.log(e)
    @fromJSON doc
    return this

exports.YamlContext = YamlContext
exports.yamlcontext_ = (cfg) -> new YamlContext().config cfg

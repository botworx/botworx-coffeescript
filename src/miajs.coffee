yaml = require 'js-yaml'
fs   = require 'fs'
path = require 'path'
process = require 'process'

class MiaJs
  constructor: ->
    @env = 'development'
  config: (folder) ->
    folder = folder || __dirname
    try
      doc = yaml.safeLoad(fs.readFileSync(path.join(folder, '../config/config.yml'), 'utf8'))
    catch e
      console.log(e)

    cfg = doc[@env]
    for k, v of cfg
      process.env[k] = v

exports.mia = mia = new MiaJs()
exports.config = (folder) -> mia.config folder

path = require 'path'
glob = require 'glob'
winston = require 'winston'
{Module} = require 'module'
###
This has a lot of commonality with Project.  Merge?
###
class Unit
  constructor: (@parent) ->
    @exports = null
    @units = []
    @logger = console
    @loggers = []
    ###
    @logger = new winston.Logger
      level: 'silly',
      transports: [
        new winston.transports.Console()
      ]
    ###
  toJSON: ->
    filename: @filename
  inject: (k, v) ->
    switch k
      when 'module'
        @module = v
        @filename = @module.filename
        @dirname = path.dirname(@filename)
        @basename = path.basename(@filename)
      else
        this[k] = v
  config: (cfg) ->
    if cfg instanceof Module then cfg = {module: cfg}
    for k, v of cfg
      @inject k, v
    return this
  add: (child) ->
    @units.push child
  pushLogger: (logger) ->
    @loggers.push @logger
    @logger = logger
  popLogger: ->
    @logger = @loggers.pop()
  log: (txt) ->
    @logInfo(txt)
  _: (txt) ->
    @logInfo(txt)
  logInfo: (txt) ->
    @logger.info txt
  #
  stringify: require 'json-stringify-safe'
  debug: require('debug')('miajs')
  $: (text) -> @debug text

exports.Unit = Unit
exports.unit_ = unit_ = (cfg, parent) -> return new Unit(parent).config(cfg)

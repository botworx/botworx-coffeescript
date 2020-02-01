path = require 'path'
exports.assert = assert = require('chai').assert
exports.mocha = mocha = require 'mocha'
exports.winston = winston = require 'winston'
exports.chalk = chalk = require 'chalk'

{Unit} = require './unit'
###
exports.unitize = unitize = (_module) ->
  fileName = mmpackage.logDir + path.basename(_module.filename, '.js') + '.json'
  logger = new winston.Logger
    level: 'silly',
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: fileName })
    ]
  #hf _module
  return exports
###

header = (text, chr, length) ->
  count = Math.round(length/2 - text.length/2)
  mod = length % 2
  [
    Array(count).join(chr)
    text
    Array(count).join(chr)
  ].join ' '

hlength = 80

class TestUnit extends Unit
  constructor: (parent) ->
    super parent
  tap: ->
    beforeEach =>
      @pushLogger()
      @$ 'Baba'
    afterEach =>
      @$ 'Yaga'
      @popLogger()

  pushLogger: ->
    fileName = @logPath(path.basename(@filename, '.js') + '.json')
    logger = new winston.Logger
      level: 'silly',
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: fileName })
      ]
    super logger

  dataPath: (filename) ->
    path.join(@dirname, '../data/', filename)
  logPath: (filename) ->
    path.join(@dirname, '../report/log/', filename)
  h1: (text) ->
    @log header(text, '*', hlength)
  h2: (text) ->
    @log header(text, '-', hlength)
    #@log chalk.red('\t' + text)
  h3: (text) ->
    @log header(text, '-', hlength)
  h4: (text) ->
    @log header(text, '-', hlength)
  $: (text) ->
    @log chalk.red(text)
  hf: ->
    @h1 @basename

exports.TestUnit = TestUnit

path = require 'path'
exports.assert = assert = require('chai').assert
exports.mocha = mocha = require 'mocha'
exports.winston = winston = require 'winston'
exports.chalk = chalk = require 'chalk'

miascript = require('../../lib')
Object.assign exports, miascript

exports.$$ = $$ = miascript.package_ module
exports.unit_ = unit_ = (cfg, parent = $$) ->
  return new miascript.TestUnit(parent).config(cfg)

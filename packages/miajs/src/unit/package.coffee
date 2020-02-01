path = require 'path'
glob = require 'glob'
winston = require 'winston'
stringify = require 'json-stringify-safe'
#
{unit_, Unit} = require './unit'
###
This has a lot of commonality with Project.  Merge?
###
class Package extends Unit
  constructor: (parent)->
    super(parent)
  inject: (k, v) ->
    switch k
      when 'blah'
        @log 'blah'
      else
        super(k, v)

exports.Package = Package
exports.package_ = package_ = (cfg, parent) -> return new Package(parent).config(cfg)

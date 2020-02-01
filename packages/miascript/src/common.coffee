miajs = require 'miajs'
Object.assign exports, miajs

exports.$$ = $$ = miajs.package_ module
exports.unit_ = unit_ = (cfg, parent = $$) ->
  return new miajs.Unit(parent).config(cfg)

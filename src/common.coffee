require('./miajs').config()
exports.unit = unit = require('./unit')
{Unit} = unit
Object.assign exports, unit

require './node'
###
This is the ROOT module of everything
###
__ = undefined
exports.__ = __

`var GeneratorFunction = Object.getPrototypeOf(function*(){}).constructor`
exports.GeneratorFunction = GeneratorFunction
`var AsyncFunction = Object.getPrototypeOf(async function(){}).constructor`
exports.AsyncFunction = AsyncFunction

Function::property = (prop, desc) ->
  Object.defineProperty @prototype, prop, desc

Function::iterator = (generator) ->
  @prototype[Symbol.iterator] = @prototype.iterator = generator

Function::TIterable = ->
  @prototype[Symbol.iterator] = -> @iterator()

exports.clone = clone = (obj, xtra) ->
  return obj  if obj is null or typeof (obj) isnt "object"
  temp = new obj.constructor()
  for k, v of obj
    temp[k] = v
  if xtra && 'object' == typeof xtra
    for k, v of xtra
      temp[k] = v
  return temp


exports.$$ = $$ = unit.package_ module
exports.unit_ = unit_ = (cfg, parent = $$) -> return new Unit(parent).config(cfg)

grammar = require('./grammar')

class MiaParser extends grammar.Parser
  constructor: (@lexer, @yy) ->
    super()
  parse: (code, options) ->
    super(code)
  parseError: (str, hash) ->
    console.log str
    console.log hash
    throw new Error 'Parse Error'

exports.MiaParser = MiaParser

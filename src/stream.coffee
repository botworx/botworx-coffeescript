stream = require 'stream'

class Stringer extends stream.Writable
  constructor: ->
    super()
    @chunks = []
  toString: ->
    return @chunks.join('')
  _write: (chunk, encoding, done) ->
    @chunks.push chunk
    done()

exports.Stringer = Stringer

fs = require 'fs'
{Task} = require './task'

class Streamer extends Task
  constructor: (action) ->
    super(action)

class Source extends Streamer
  constructor: (action) ->
    super(action)

class File extends Source
  constructor: (@path, action) ->
    super(action)

class ReadFile extends File
  constructor: (path, action) ->
    super(path, action)
  init: ->
    @stream = fs.createReadStream(@path)

exports.ReadFile = ReadFile

class Writer extends Streamer
  constructor: ->
    super()

class ConsoleWriter extends Writer
  constructor: ->
    super()
  init: ->
    @src.stream.pipe(process.stdout)

exports.ConsoleWriter = ConsoleWriter

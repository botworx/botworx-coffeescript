glob = require 'glob'

{Task, TS_FAILURE} = require './task'
{Runner} = require './runner'

class Project extends Runner
  constructor: (action) ->
    super(action)
  add: (child) ->
    super(child)
    #child.project = this

  config: (cfg) ->
    for k, v of cfg
      switch k
        when 'tasks'
          for t in v
            @add t
        when 'rules'
          for r in v
            @addRule r
        else
          this[k] = v
    return this

  init: ->
    super()
    for child in @tasks
      @schedule(child)
    return @status

  strategy: (child) ->
    @remove child
    if(child.status == TS_FAILURE)
      return @fail()
    #else
    @resume()

exports.project_ = (cfg, action) -> return new Project(action).config(cfg)

class Workspace extends Project
  constructor: (action) ->
    super(action)
  add: (child) ->
    super(child)
    #child.workspace = this

exports.workspace_ = (cfg, action) -> return new Workspace(action).config(cfg)

class Sourcer extends Task
  constructor: (@fn) ->
    super()
  init: ->
    options = {}
    pattern = @rnr.files
    glob pattern, options, (er, sources) =>
      for src in sources
        @fn(src)

exports.sourcer_ = (fn) -> return new Sourcer fn

buildWorkspace = (builders, cfg) ->
  product = new Workspace
  for k, v of cfg
    product[k] = build(builders, v)
  return product

buildProject = (builders, cfg) ->
  product = new Project
  for k, v of cfg
    product[k] = build(builders, v)
  return product

buildTasks = (builders, arr) ->
  product = []
  for v in arr
    if v instanceof Task
      product.push v
    else
      product.push(build(builders, v))
  return product

builders =
  workspace: buildWorkspace
  project: buildProject
  tasks: buildTasks

build = (builders, cfg) ->
  product = {}
  for k, v of cfg
    builder = builders[k]
    if builder
      product[k] = builder(builders, v)
    else
      product[k] = v
  return product

exports.build = build

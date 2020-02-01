{$$, unit_, clone} = require('./common')
$$ = unit_ module, $$

{Task, Module, TS_INIT, TS_RUNNING} = require("./task")
{_start, _impasse, Message, Propose, Attempt, Assert, Retract, Achieve} = require("../main")
{Context} = require '../context'

class Runner extends Task
  constructor: (init) ->
    super(init)
    @ctx = new Context()
    @posts = []
    @queue = []
    @scheduled = false
    @impassed = false
    @post new Attempt(new Achieve(null, _start, null))

  schedule: (t) ->
    if t == this then return super t

    if t instanceof Runner
      t.run()
      @schedule(this)
      return t
    #Else ...
    t.rnr = this
    @queue.push(t)
    @schedule(this)
    return t

  broadcast: (msg) ->
    m = clone msg
    $$.$ "Broadcast:\t#{m}"
    m.from = this
    @post m
    for t in @tasks
      t.broadcast m

  post: (msg) ->
    if !msg.from
      msg.from = this
    $$.$ "Post:\t#{msg}"
    @posts.push msg

  fork: (t) ->
    $$.$("Fork:\t#{t.msg}")
    child = new Runner()
    child.policy = @policy
    child.ctx = @ctx
    child.run t

  eval: (msg) ->
    switch msg.constructor
      when Propose
        $$.$("* \t#{msg}")
        pmsg = new Attempt()
        Object.assign pmsg, msg
        for m from msg.from.matchRules(pmsg)
          @fork(m.to)
      when Assert
        $$.$("+ \t#{msg}")
        @ctx.add msg.data
        @dispatch msg
      when Retract
        $$.$("- \t#{msg}")
        @ctx.remove msg.data
        @dispatch msg
      else
        $$.$ "Eval:\t#{msg}"
        @dispatch msg

  dispatch: (msg) ->
    for m from msg.from.matchRules(msg)
      $$.$("Fire:\t#{m}")
      @schedule(m.to)

  main: ->
    $$.$ '@main'
    while t = @queue.shift()
      $$.$ 'eval tasks'
      $$.$ "Tick:\t(#{t.constructor.name}) #{t.msg}"
      status = t.action()
      if status == TS_RUNNING
        @queue.push(t)
      else if t.parent
        pStatus = t.parent.strategy(t)
        if pStatus == TS_RUNNING
          @queue.push(t.parent)
      else if t.caller
        t.caller.resume()
        @queue.push(t.caller)

    while post = @posts.shift()
      $$.$ 'eval posts'
      @eval post

    if @idle() && @impasse() && !@scheduled then @resolve()
    return @status

  idle: ->
    @posts.length == 0 && @queue.length == 0 && @tasks.length == 0

  impasse: ->
    $$.$ "@impasse"
    if @impassed then return true
    @impassed = true
    @post new Attempt(new Achieve(null, _impasse, null))
    @schedule this
    return false

  run: (queue...) ->
    for task in queue
      @schedule(task)
    return this

exports.Runner = Runner
exports.runner_ = (before) ->
  new Runner before

#
#Agent
#
class Agent extends Runner
  constructor: ->
    super()

exports.Agent = Agent
exports.agent_ = (init) ->
  new Agent init

nextTick = require('process').nextTick
{unit_, __, clone, GeneratorFunction, AsyncFunction} = require './common'
$$ = unit_ module

{ EventEmitter } = require('events')
{ Policy } = require('./policy')
{ $_, Term, Message, Propose, Attempt, Assert, Retract, Achieve } = require '../main'

class TaskStatus
  constructor: (@name) ->
  toString: -> @name
  #toJSON: -> { type: @constructor.name, name: @name }
TS = (name) -> new TaskStatus name

TS_INIT = TS 'Init'
exports.TS_RUNNING = TS_RUNNING = TS 'Running'
exports.end = exports.TS_SUCCESS = TS_SUCCESS = TS 'Success'
TS_FAILURE = TS 'Failure'
TS_SUSPENDED = TS 'Suspended'

toStatus = (status) ->
  if !(status instanceof TaskStatus)
    status = TS_SUCCESS
  return status

class Task extends EventEmitter
  constructor: (init) ->
    super()
    @init = init || @init
    @rnr = null
    @_msg = null
    @_parent = null
    @tasks = []
    @result = null
    @status = TS_INIT
    @policy = null

  @property 'parent',
    get: -> @_parent
    set: (parent) ->
      @_parent = parent
      if @policy
        @policy.parent = parent.policy
      else
        @policy = parent.policy

  @property 'msg',
    get: -> @_msg
    set: (msg) ->
      @_msg = msg
      @policy = msg.from.policy

  toJSON: ->
    {
      type: @constructor.name
      msg: @msg
    }

  def: (trigger, action) ->
    @addRule new Rule(trigger, action)

  defg: (trigger, action) ->
    @defn @rnr, trigger, action

  defn: (n, trigger, action) ->
    n.addRule new Rule(trigger, action)

  addRule: (r) ->
    if @policy == null
      @policy = new Policy(this)
    @policy.add r

  findRule: (m) ->
    return @findRules(m).pop()

  findRules: (m) ->
    if @policy then return @policy.find(m)
    return []

  matchRule: (m) ->
    return @matchRules(m).pop()

  matchRules: (m) ->
    if @policy then return @policy.match(m)
    return []

  strategy: (child) ->
    switch child.status
      when TS_FAILURE
        @remove(child)
        @fail()
      when TS_SUCCESS
        @remove(child)
        if tasks.length == 0 then @succeed()

  add: (child) ->
    child.parent = this
    @tasks.push(child)
    return this

  remove: (child) ->
    index = @tasks.indexOf(child)
    if (index > -1)
      @tasks.splice(index, 1);
    return this

  ###
  EXECUTION
  ###

  init: ->
    if(@main)
      @action = @main
      @status = @action()
    return @status

  action: ->
    if @init instanceof GeneratorFunction
      iter = @init()
      @action = ->
        result = iter.next()
        @status = toStatus(result.value)
        return @status
      @status = toStatus(@action())
    #else if @init instanceof AsyncFunction then @status = (await @init()) || TS_SUCCESS
    else
      @status = toStatus(@init())
      if(@main)
        @action = @main
        @status = toStatus(@action())
      return @status

  schedule: (t) ->
    if t.scheduled then return t
    t.scheduled = true
    #setImmediate ->
    nextTick ->
      t.scheduled = false
      try
        t.status = toStatus(t.action())
      catch err
        t.reject err
    return t

  #Promise Support
  then: (@resolve, @reject) ->
    console.log 'Then'
    @status = toStatus(@action())
    return this
  resolve: ->
    console.log 'Promise Resolved'
  reject: (err) ->
    console.log 'Promise Rejected'
    throw err

  #TODO:  What if init is a generator???
  import: (requirer, path) ->
    requirer(path).init.call(this)
  ###
  DSL
  ###
  chain: (b) ->
    a = @tasks[@tasks.length - 1]
    if a
      a.dst = b
      b.src = a
    @add b
    return this

  task: (action) ->
    child = new Task(action)
    @add(child)
    return this

  loop: (action) ->
    child = new Loop(action)
    @add(child)
    return this

  counter: (from, to, action) ->
    child = new Counter(from, to, action)
    @add(child)
    return this

  sequence: (action) ->
    child = new Sequence(action)
    @add(child)
    return this

  suspend: ->
    @status = TS_SUSPENDED

  resume: ->
    @status = TS_RUNNING

  succeed: ->
    @status = TS_SUCCESS

  fail: ->
    @status = TS_FAILURE

  broadcast: (msg) ->

  post: (msg) ->
    msg.from = this
    @rnr.post(msg)

  spawn: (o, wait = false) ->
    if typeof o == 'function'
      task = new Task(o)
    else if o instanceof Task
      task = o
    else throw new Error 'Expecting Function or Task'
    if wait
      task.caller = this
    @rnr.schedule(task)

  call: (s, p, o, x) ->
    c = new Achieve(s, p, o, x)
    m = new Attempt(c, this)
    m.caller = this
    @post(m)
    return @suspend()

  callSync: (s, p, o, x) ->
    c = new Achieve(s, p, o, x)
    m = new Attempt(c, this)
    m.caller = this
    @post(m)
    return @suspend()

  perform: (s, p, o, x) ->
    c = new Achieve(s, p, o, x)
    m = new Attempt(c, this)
    @post(m)

  propose: (c) ->
    @post new Propose(c, this)

  attempt: (c) ->
    @post new Attempt(c, this)

  assert: (c) ->
    @post new Assert(c, this)

  retract: (c) ->
    @post new Retract(c, this)

exports.Task = Task
exports.task_ = (action) ->
  return new Task(action)
#
class Impostor extends Task
  constructor: (@identity, action) ->
    super(action)
  def: (trigger, action) -> @identity.def trigger, action
exports.Impostor = Impostor
#
class Chain extends Task
  constructor: (action) ->
    super(action)

  main: ->
    child = @tasks[0]
    @rnr.schedule(child)
    @suspend()

  strategy: (child) ->
    @remove child
    if(child.status == TS_FAILURE)
      return @fail()
    if child.dst
      @rnr.schedule(child.dst)

    #@resume()

exports.Chain = Chain
exports.chain_ = (action) -> new Chain action

class Parallel extends Task
  constructor: (action) ->
    super(action)

  main: ->
    for child in @tasks
      @rnr.schedule(child)
    @suspend()

  strategy: (child) ->
    @remove child
    if(child.status == TS_FAILURE)
      return @fail()
    #else
    @resume()

exports.Parallel = Parallel

#
#Loop
#
class Loop extends Task
  constructor: (action) ->
    super(action)

  main: ->
    child = @tasks.shift()
    @tasks.push(child)
    #else
    @rnr.schedule(child)
    @suspend()

  strategy: (child) ->
    if(child.status == TS_FAILURE)
      return @fail()
    #else
    @resume()

exports.Loop = Loop
#
#Counter
#
class Counter extends Task
  constructor: (from, to, action) ->
    super(action)
    @value = from
    @to = to
    @index = 0

  main: ->
    child = @tasks[@index]
    if(child == undefined)
      child = @tasks[@index = 0]
    #else
    @rnr.schedule(child)
    @suspend()

  strategy: (child) ->
    @index++
    if(child.status == TS_FAILURE)
      return @fail()
    #else
    if(@value++ == @to)
      return @succeed()
    #else
    @resume()

exports.Counter = Counter
#
#Sequence
#
class Sequence extends Task
  constructor: (action) ->
    super(action)

  main: ->
    child = @tasks.shift()
    if(child == undefined)
      return @succeed()
    #else
    @rnr.schedule(child)
    @suspend()

  strategy: (child) ->
    if(child.status == TS_FAILURE)
      return @fail()
    #else
    if(@tasks.length > 0)
      return @resume()
    #else
    @succeed()

exports.Sequence = Sequence
#
#
#
class Method extends Sequence
  constructor: (action) ->
    super(action)

exports.Method = Method
exports.method_ = (action) -> new Method action
#
#Module
#
class Module extends Method
  constructor: (action) ->
    super(action)

exports.Module = Module
exports.module_ = (action) ->
  return new Module(action)
#
#Rule
#
class Rule
  constructor: (t, a) ->
    @trigger = t
    @action = a

  match: (msg) ->
    result = @trigger.match(msg)
    if !result then return false
    t = new Method(@action)
    m = clone(msg, result)
    m.rule = this
    m.to = t
    t.msg = m
    t.caller = m.caller
    return m
  ###
  fire: (rnr, msg) ->
    t = new Method(@action)
    t.msg = msg
    t.caller = msg.caller
    rnr.schedule(t)
  ###
exports.Rule = Rule
exports.def = (t, a) -> new Rule t, a

exports.sequence_ = (action) ->
  return new Sequence(action)

exports.counter_ = (from, to, action) ->
  return new Counter(from, to, action)

exports.parallel_ = (action) ->
  return new Parallel(action)

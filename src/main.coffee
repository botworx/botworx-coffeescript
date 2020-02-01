{unit_, __, clone} = require './common'
$$ = unit_ module
#
#The Main Classes
#

class Variable
  constructor: (@name, @pattern) ->

exports.Variable = Variable
exports.$ = $ = exports.variable_ = variable_ = (n, p) -> new Variable("$#{n}", p)

exports.match = match = (p, v, b = true) ->
  if !b then return false
  if p == __ || p == v then return b
  if typeof p == 'function' && p(v) then return b
  if (p instanceof RegExp && p.test(v)) then return b
  if p instanceof Variable
    if p.pattern && !match(p.pattern, v) then return false
    if 'object' == typeof b
      b[p.name] = v
      return b
    return {"#{p.name}": v}
  return false

class Term
  constructor: (@name) ->
  toString: -> @name
  toJSON: -> { type: @constructor.name, name: @name }
exports.Term = Term

class Subject extends Term
  constructor: (n) -> super n

class Verb extends Term
  constructor: (n) -> super n

###
Object to Term
###
exports.terms = terms = {}
exports.$_ = $_ = (arg, type) ->
  switch typeof arg
    when 'string'
      term = terms[arg]
      if !term
        if !type
          char = arg[0]
          if char == char.toUpperCase() then type = Subject
          else
            type = Verb
        else if typeof type is 'string'
          type = eval "#{type} = class #{type} extends Term {};"
        terms[arg] = term = new type arg
      return term
    when 'object'
      obj = {}
      for e in arg
        n = '_' + e
        obj[n] = $_ e
      return obj

exports._I = _I = $_ 'I'
exports._start = _start = $_ 'start'
exports._impasse = _impasse = $_ 'impasse'
###
Object to String
###
exports._$ = _$ = (obj) ->
  if obj == __ then return '__'
  switch typeof obj
    when 'symbol'
      return Symbol.keyFor(obj)
    when 'string'
      return obj
    else
      if obj instanceof Clause
        return "(#{obj})"
      else
        return String(obj)

class Clause
  constructor: (@subj, @verb, @obj, xtra) ->
    for k, v of xtra
      this[k] = v

  toString: ->
    xtra = []
    for k, v of this
      if k != 'subj' && k!= 'verb' && k != 'obj'
        xtra.push "#{k}: #{v}"

    [
      @constructor.name
      _$(@subj)
      _$(@verb)
      _$(@obj)
      xtra
    ].join(' ')

  toJSON: ->
    type: @constructor.name
    subj: @subj && JSON.stringify(@subj)
    verb: @verb && JSON.stringify(@verb)
    obj:  @obj && JSON.stringify(@obj)

  match: (t, s, v, o, x) ->
    return this instanceof t && match(s, @subj, match(v, @verb, match(o, @obj) ) )

exports.Clause = Clause
exports.clause_ = (t, s, v, o, x) -> new t(s, v, o, x)
#
class Believe extends Clause
  constructor: (s, v, o, x) ->
    super(s, v, o, x)

exports.Believe = Believe
exports.believe_ = (s, v, o, x) -> new Believe s, v, o, x
#
class Goal extends Clause
  constructor: (s, v, o, x) ->
    super(s, v, o, x)
exports.Goal = Goal
#
class Achieve extends Goal
  constructor: (s, v, o, x) ->
    super(s, v, o, x)

exports.Achieve = Achieve

class Message
  constructor: (@data, @from, @to) ->

  toString: ->
    [
      @constructor.name,
      @data
    ].join(' ')

  toJSON: ->
    {
      type: @constructor.name,
      data: @data.toJSON(),
      to: @to && @to.toJSON(),
      from: @from && @from.toJSON()
    }

  match: (f, t, s, v, o, x) ->
    return this instanceof f && @data.match(t, s, v, o, x)

exports.Message = Message

class Propose extends Message
  constructor: (data, from) ->
    super(data, from)

exports.Propose = Propose
exports.propose_ = (t, s, v, o, x) -> new Propose(new t(s, v, o, x))

class Attempt extends Message
  constructor: (data, from) ->
    super(data, from)

exports.Attempt = Attempt
exports.attempt_ = (t, s, v, o, x) -> new Attempt(new t(s, v, o, x))

class Assert extends Message
  constructor: (data, from) ->
    super(data, from)

exports.Assert = Assert
exports.assert_ = (t, s, v, o, x) -> new Assert(new t(s, v, o, x))

class Retract extends Message
  constructor: (data, from) ->
    super(data, from)

exports.Retract = Retract
exports.retract_ = (t, s, v, o, x) -> new Retract(new t(s, v, o, x))
#
class Trigger
  constructor: (@flavor, @type, @subj, @verb, @obj, @xtra) ->

  match: (m) ->
    m.match(@flavor, @type, @subj, @verb, @obj, @xtra)

exports.Trigger = Trigger
#
class OnAssert extends Trigger
  constructor: (t, s, v, o, x) ->
    super(Assert, t, s, v, o, x)
exports.OnAssert = OnAssert
exports.onAssert = (t, s, v, o, x) -> return new OnAssert(t, s, v, o, x)
#
class OnRetract extends Trigger
  constructor: (t, s, v, o, x) ->
    super(Retract, t, s, v, o, x)
exports.OnRetract = OnRetract
exports.onRetract = (t, s, v, o, x) -> return new OnRetract(t, s, v, o, x)

class OnAttempt extends Trigger
  constructor: (t, s, v, o, x) ->
    super(Attempt, t, s, v, o, x || Achieve)
exports.OnAttempt = OnAttempt
exports.onAttempt = (t, s, v, o, x) -> return new OnAttempt(t, s, v, o, x)

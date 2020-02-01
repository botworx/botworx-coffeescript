{Variable, Believe} = require '../main'

class Query
  constructor: (@ctx)->
    @conds = []

  add: (c) ->
    c.query = this
    c.ctx = @ctx
    @conds.push c

  and: (t, s, v, o, x) ->
    cond = new QClause(t, s, v, o, x)
    src = @conds[@conds.length - 1]
    if src
      cond.src = src
    @add cond
    return this

  not: (t, s, v, o, x) ->
    cond = new QNegClause(t, s, v, o, x)
    src = @conds[@conds.length - 1]
    if src
      cond.src = src
    @add cond
    return this

  filter: (fn) ->
    cond = new QFilter fn
    src = @conds[@conds.length - 1]
    if src
      cond.src = src
    @add cond
    return this

  binders: ->
    yield from @conds[@conds.length - 1].binders()

  exec: (onSuccess) ->
    for binder from @binders()
      onSuccess binder

exports.Query = Query
exports.query_ = query_ = (ctx) -> new Query ctx

class Condition
  constructor: ->
  blank: ->
    yield {}
  bound: (b, v) ->
    if b[v.name] then true else false
  binding: (b, v) ->
    if v
      return b[v.name]
    else
      return undefined

class QFilter extends Condition
  constructor: (@fn) ->
    super()
  binders: ->
    if @src
      source = @src.binders()
    else
      source = @blank()
    for binder from source
      if @fn binder
        yield binder

class QClause extends Condition
  constructor: (@t, @s, @v, @o, @x) ->
    super()
  binders: ->
    if @src
      source = @src.binders()
    else
      source = @blank()
    for binder from source
      s = @binding(binder, @s) || @s
      o = @binding(binder, @o) || @o
      if s instanceof Variable
        if o instanceof Variable
          for c from @ctx.match(@t, s, @v, o, @x)
            yield Object.assign {"#{s.name}": c.subj, "#{o.name}": c.obj}, binder
        else
          for c from @ctx.match(@t, s, @v, o, @x)
            yield Object.assign {"#{s.name}": c.subj}, binder
      else
        if o instanceof Variable
          for c from @ctx.match(@t, s, @v, o, @x)
            yield Object.assign {"#{o.name}": c.obj}, binder
        else
          for c from @ctx.match(@t, s, @v, o, @x)
            yield binder

exports.QClause = QClause

class QNegClause extends Condition
  constructor: (@t, @s, @v, @o, @x) ->
    super()
  binders: ->
    if @src
      source = @src.binders()
    else
      source = @blank()
    for binder from source
      s = @binding(binder, @s) || @s
      o = @binding(binder, @o) || @o
      if s instanceof Variable
        if o instanceof Variable
          for c from @ctx.match(@t, s, @v, o, @x)
            yield Object.assign {"#{s.name}": c.subj, "#{o.name}": c.obj}, binder
        else
          for c from @ctx.match(@t, s, @v, o, @x)
            yield Object.assign {"#{s.name}": c.subj}, binder
      else
        if o instanceof Variable
          for c from @ctx.match(@t, s, @v, o, @x)
            yield Object.assign {"#{o.name}": c.obj}, binder
        else
          if !@ctx.exists(@t, s, @v, o, @x)
            yield binder

exports.QNegClause = QNegClause

{$_, _$, Believe, clause_} = require('../main')
{Query} = require './query'

class Context
  constructor: ->
    @clauses = []
  @iterator ->
    yield from @clauses
  load: (loader) ->
    loader.load this
  config: (cfg) ->
    if !cfg then return this
    for k, v of cfg
      switch k
        when 'clauses'
          for c in v
            @add c
        else
          this[k] = v
    return this

  add: (c) ->
    if Array.isArray c
      @clauses = @clauses.concat c
    else
      @clauses.push(c)

  remove: (clause) ->
    index = @clauses.indexOf(clause)
    if (index > -1)
      @clauses.splice(index, 1);
    return this

  believe: (s, v, o, x) ->
    @add new Believe(s, v, o, x)
    return this

  exists: (t, s, v, o, x) ->
    for c in @clauses
      if c.match(t, s, v, o, x)
        return true
    return false

  find: (t, s, v, o, x) ->
    result = []
    for c from @match(t, s, v, o, x)
      result.push c
    return result

  match: (t, s, v, o, x) ->
    for c in @clauses
      if c.match(t, s, v, o, x)
        yield c

  query: (t, s, v, o, x) ->
    return new Query(this).and t, s, v, o, x

  toString: ->
    result = ''
    for c in @clauses
      result += c.toString() + '\n'
    return result

  fromJSON: (json) ->
    for k, v of json
      t = v.type
      subj = $_ k, t
      for vk, vv of v
        verb = $_ vk
        if Array.isArray vv
          for obj in vv
            @believe subj, verb, $_ obj
        else
          @believe subj, verb, $_ vv
  ###
  fromJSON: (json) ->
    for k, v of json
      subj = $_ k
      for vk, vv of v
        verb = $_ vk
        if Array.isArray vv
          for obj in vv
            @add clause_ subj, verb, obj
        else
          @add clause_ subj, verb, vv
  ###
exports.Context = Context
exports.context_ = (cfg) -> new Context().config cfg

###
class ContextFactory
class ContextImporter extends ContextFactory
class YamlContextImporter extends ContextImporter
  constructor:
###

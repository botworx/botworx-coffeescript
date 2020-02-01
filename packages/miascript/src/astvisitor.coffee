{Visitor} = require './visitor'

class Scope
  constructor: (@parent) ->
    @vars = {}

  add: (v) ->
    k = v.name
    if !@vars[k]
      @vars[k] = v
    return @vars[k]

  var_: (v, r)->
    {name, type} = v
    v.info = @add {name: name, value: r, type: type}

  qvar_: (v, r)->
    {name, type} = v
    v.info = @add {name: name, value: r, type: type, qvar: true}

  find: (k) ->
    v = @vars[k]
    if v then return v
    if @parent then return @parent.find k

#exports.Scope = Scope

class AstVisitor extends Visitor
  constructor: ->
    super()
    @states = []
    #State members
    @scope = null
    @block = null
    @stmt = null
    @subj = null
    @value = null

  scope_: (node) ->
    if node.scope
      @scope = node.scope
    else
      @scope = new Scope(@scope)
      node.scope = @scope
    return node

  var_: (k, v)->
    @scope.add k, {key: k, value: v}

  qvar_: (k, v)->
    @scope.add k, {key: k, value: v, qvar: true}

  save: ->
    @states.push
      delegator: @delegator
      scope: @scope
      block: @block
      stmt: @stmt
      subj: @subj
      value: @value

  restore: ->
    {@delegator, @scope, @block, @stmt, @subj, @value} = @states.pop()

  visitNode: (node) ->
    if node.scope
      #@save()
      @scope = node.scope
      result = super(node)
      #@restore()
    else
      result = super(node)
    return result

exports.AstVisitor = AstVisitor

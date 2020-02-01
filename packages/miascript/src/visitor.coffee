class Delegator
  constructor: (@parent, @delegates) ->

  find: (kind) ->
    delegate = @delegates[kind]
    if delegate then return delegate
    if @parent then return @parent.find kind

class Visitor
  constructor: ->
    @delegator = null
    @stack = []
  top: (ndx = 0) ->
    return @stack[@stack.length + (ndx-1)]
  delegator_: (delegates) ->
    @delegator = new Delegator(@delegator, delegates)

  visitNode: (node) ->
    if !node then return
    if Array.isArray node
      for child in node
        @visit child
      return
    if !node._TNode then throw new Error JSON.stringify(node)
    for child in node.nodes
      @visit child

  visit: (node) ->
    #if !node then throw new Error(node)
    if !node then return
    @save()
    @stack.push node
    delegate = @delegator.find(node.kind)
    if !delegate
      result = @visitNode node
    else
      result = delegate.call(this, node)
    @stack.pop()
    @restore()
    return result

exports.Visitor = Visitor
